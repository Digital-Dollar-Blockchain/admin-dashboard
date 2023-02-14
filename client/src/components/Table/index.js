import { Segmented, Divider, Table, Tag } from 'antd';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCode } from '@fortawesome/free-solid-svg-icons'

import { RPC_URL, SERVER_URL, CONTRACT_ADDRESS } from '../../config';
import { abi } from '../../abi';
import Button from '../Button';

import "./style.css";

const TableList = ({ data, fetchData, fetching }) => {
    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Type',
            key: 'type',
            dataIndex: 'type',
            render: (_, { type }) => (
                <FontAwesomeIcon style={{ opacity: "0.5" }} icon={type === "0" ? faUser : faCode} />
            ),
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (_, { status }) => (
                <Tag color={status === 1 ? "#5bad38bb" : status === -1 ? "#ff5500bb" : ""}>
                    {status === 1 && "Accepted"}
                    {status === 0 && "Pending"}
                    {status === -1 && "Rejected"}
                </Tag>
            ),
        },
        {
            title: 'Created at',
            key: 'status',
            dataIndex: 'status',
            render: (_, { created_at }) => (
                <div>
                    {formatTime(created_at)}
                </div>
            ),
        },
        {
            title: 'Updated at',
            key: 'status',
            dataIndex: 'status',
            render: (_, { updated_at }) => (
                <div>
                    {formatTime(updated_at)}
                </div>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, { id }) => (
                <div className='d-flex align-items-center'>
                    <Button className="btn btn-accept" label="ACCEPT" onClick={() => onAccept(id)} />
                    <span className='divider'>|</span>
                    <Button className="btn btn-reject" label="REJECT" onClick={() => onReject(id)} />
                    {/* <span className='divider'>|</span>
                    <Button className="btn btn-reject" label="CALL" onClick={() => onCallWeb3()} /> */}
                </div>
            ),
        },
    ];

    const [loading, setLoading] = useState(false);
    const [filterOption, setFilterOption] = useState('All');
    const [filterViewOption, setFilterViewOption] = useState('Both');
    const [selected, setSelected] = useState([]);

    const formatTime = (time) => {
        if (Date.parse(time) < 0) return "";

        const date = new Date(Date.parse(time))
        return date.toLocaleString();
    }

    const onAccept = id => {
        setLoading(true);
        axios({
            baseURL: SERVER_URL,
            method: "post",
            data: {
                status: 1
            },
            url: `/account/update/${id}`
        }).then(res => {
            fetchData();
            setLoading(false);
        }).catch(err => {
            toast(`Connection Error.`);
            setLoading(false);
        })
    };

    const onReject = id => {
        setLoading(true);
        axios({
            baseURL: SERVER_URL,
            method: "post",
            data: {
                status: -1
            },
            url: `/account/update/${id}`
        }).then(res => {
            fetchData();
            setLoading(false);
        }).catch(err => {
            setLoading(false);
        })
    };

    const onCallWeb3 = async () => {
        // Connect to Ethereum network
        const Web3 = require('web3');
        const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));

        // Instantiate the contract
        const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

        try {
            await contract.methods.store(150).call();
            toast.success("Sucess");
        } catch (err) {
            toast.error(err.message);
            console.log(err);
        }
    }

    const onItemSelected = (selectedRowKeys, selectedRows) => {
        setSelected(selectedRowKeys);
    }

    const onAcceptAll = () => {
        selected.map(id => onAccept(id));
    }

    const onRejectAll = () => {
        selected.map(id => onReject(id));
    }

    return (
        <div className='table-container'>
            <div className='d-flex align-items-center justify-content-between'>
                <div>
                    <span>Filter: </span>
                    <Segmented
                        options={['All', 'Accepted', 'Rejected', 'Pending']}
                        value={filterOption}
                        onChange={setFilterOption}
                    />
                    <div style={{ paddingTop: "10px" }}>
                        <span>View: </span>
                        <Segmented
                            options={['Both', 'Contract Only', 'Account Only']}
                            value={filterViewOption}
                            onChange={setFilterViewOption}
                        />
                    </div>
                </div>
                <TailSpin
                    height="30"
                    width="30"
                    color="#0077ff"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    visible={loading || fetching}
                />
                <div>
                    <span>{selected.length} items selected</span>
                    <span className='divider'>|</span>
                    <Button className="btn btn-accept" label="ACCEPT SELECTED" onClick={onAcceptAll} />
                    <span className='divider'>|</span>
                    <Button className="btn btn-reject" label="REJECT SELECTED" onClick={onRejectAll} />
                </div>
            </div>
            <Divider />
            <Table
                rowSelection={{
                    type: "checkbox",
                    onChange: onItemSelected
                }}
                columns={columns}
                dataSource={data.filter(d => {
                    let result = false;
                    switch (filterOption) {
                        case "Accepted":
                            result = d.status === 1;
                            break;
                        case "Rejected":
                            result = d.status === -1;
                            break;
                        case "Pending":
                            result = d.status === 0;
                            break;
                        default:
                            result = true;
                            break;
                    }
                    if (result) {
                        switch (filterViewOption) {
                            case "Both":
                                return true;
                            case "Account Only":
                                return d.type === "0";
                            case "Contract Only":
                                return d.type === "1";
                            default:
                                return false;
                        }
                    }

                    return false;

                })}
            />
            <ToastContainer />
        </div>
    )
};
export default TableList;