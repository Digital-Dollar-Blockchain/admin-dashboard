import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useMetaMask } from "metamask-react";

import Button from "../../components/Button";
import { SERVER_URL } from "../../config";

import CoinIcon from "../../assets/logo.png";

import "./style.css";

const Login = () => {
  const navigate = useNavigate();
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  const [state, setState] = useState({ error: null, loading: false });

  useEffect(() => {
    console.log("status", status);
    if (status === "connected") {
      console.log("account", account);
      login(account);
    }
  }, [status])

  const login = async (address) => {
    setState({ error: null, loading: true });

    axios({
      baseURL: SERVER_URL,
      method: "post",
      headers: { "Content-Type": "application/json" },
      url: `/user/login`,
      data: {
        address: address
      },
    }).then(res => {
      localStorage.setItem("user", JSON.stringify(res.data.token));
      setState({ error: null, loading: false });
      navigate("/accounts");
    }).catch(err => {
      setState({ error: err.response.data.message, loading: false });
    });
  };

  return (
    <div className="login-container">
      <div className="center-box w-full h-full">
        <img src={CoinIcon} alt="" />
        <div className="form-box login-box">
          <h1 className="title">Digital Dollar</h1>
            <Button type="submit" label={state.loading ? status : "Login with Wallet"} disabled={(state.loading)} onClick={connect}/>
            <div className="server-error">{state.error && state.error}</div>
        </div>
      </div></div>
  );
};

export default Login;
