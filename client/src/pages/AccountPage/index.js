import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Table from "../../components/Table";
import Header from "../Header";

import "./style.css";
import { SERVER_URL } from "../../config";

const AccountPage = () => {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAccounts = useCallback(() => {
    if (!loading) {
      setLoading(true);
      axios({
        baseURL: SERVER_URL,
        method: "get",
        headers: { "Content-Type": "application/json" },
        url: "/account/get_all"
      }).then(res => {
        const results = res.data.data.sort((a, b) => a.id - b.id).map((row, index) => ({
          key: row.id,
          index: index + 1,
          ...row
        }))

        setData(results);
        setLoading(false);
        results.filter(r => r.fee !== "-" && r.type === "0").map(d => {
          axios({
            baseURL: SERVER_URL,
            method: "post",
            url: `/account/sendfee/${d.id}`
          }).then(res => console.log(res.message))
          return true;
        })
      }).catch(err => {
        setLoading(false);
      })
    }
  }, [loading]);

  const onSearch = (keyword) => {
    setKeyword(keyword);
  }

  // useEffect(() => {
  //   fetchAccounts();
  // }, [])

  useEffect(() => {
    const intervalId = setInterval(fetchAccounts, 5000)

    return () => {
      clearInterval(intervalId);
    }
  }, [fetchAccounts]);

  return (
    <div className="form-container account-page-container">
      <Header active="accounts" onSearch={onSearch} />
      <main>
        <Table
          data={data.filter(d => keyword ? d.address.includes(keyword) : true)}
          fetchData={fetchAccounts}
          fetching={loading}
        />
      </main>
    </div>
  );
};

export default AccountPage;
