import { useNavigate } from "react-router";
import axios from "axios";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Logo from "../../assets/logo.png";

import "./style.css";
import { SERVER_URL } from "../../config";

const AccountPage = ({ active, onSearch }) => {
    const navigate = useNavigate();

    const logout = () => {
        axios({
            baseURL: SERVER_URL,
            method: "post",
            headers: { "Content-Type": "application/json" },
            url: `/user/logout`
        }).then(() => {
            localStorage.removeItem("user");
            navigate("/login");
        })
    };

    return (
        <div className="header-container">
            <header className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <div className="logo d-flex align-items-center">
                        <img src={Logo} alt="logo" />
                        <div>Digital Dollar</div>
                    </div>
                    {/* <nav>
                        <Link to="/accounts" className={`${active === "accounts" ? "active" : ""}`}>Accounts</Link>
                        <Link to="/contracts" className={`${active === "contracts" ? "active" : ""}`}>Smart Contracts</Link>
                    </nav> */}
                </div>
                <div className="d-flex align-items-center">
                    <Input
                        className="w-100 mr-10px search-box"
                        type="text"
                        name="keyword"
                        maxLength="50"
                        placeholder="Search address"
                        icon={<img alt="Search icon" src="https://img.icons8.com/ios-filled/256/search.png" />}
                        onChange={e => onSearch(e.target.value)}
                    />
                    {/* <Button className="btn-change-pwd mr-10px" label="Change Password" onClick={showModal} /> */}
                    <Button className="btn-logout" onClick={logout} label="Disconnect" />
                </div>
            </header>
        </div>
    );
};

export default AccountPage;
