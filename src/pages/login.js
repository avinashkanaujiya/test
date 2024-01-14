import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../redux/authSlice";
import "./login.css";
import { login } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import NavBAr from "../components/navbar";
let Login = () => {
  const { token } = useParams();

  const TOKEN_VALIDITY_DEADLINE =
    "" +
    new Date().getFullYear() +
    "-" +
    new Date().getMonth() +
    "-" +
    new Date().getDate() +
    " 05:30:00";
  const validityCheck = (token) => {
    let token_date = localStorage.getItem("token_date");
    let d1 = new Date(TOKEN_VALIDITY_DEADLINE).getTime();
    let d2 = new Date(token_date).getTime();
    console.log(token_date, TOKEN_VALIDITY_DEADLINE);
    console.log("Token time is older than deadline ", d2 > d1);
    console.log("Token time is older than deadline ", d2, d1);

    return d2 < d1;
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleLoginClick() {
    let lt = localStorage.getItem("token");
    console.log("Token pulled from localstorage ", lt);
    // if (lt && validityCheck(lt)) {
    //   dispatch(setAccessToken(lt));
    // } else {
    lt = await login();
    localStorage.setItem("token", lt);
    localStorage.setItem(
      "token_date",
      "" +
        new Date().getFullYear() +
        "-" +
        new Date().getMonth() +
        "-" +
        new Date().getDate() +
        " " +
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getMinutes()
    );
    dispatch(setAccessToken(lt));
    console.log(lt, "handle token");

    // navigate("/home");
    // }
  }
  useEffect(() => {
    if (token) {
      dispatch(setAccessToken(token));
      console.log(token, "useefect token");
      navigate("/home");
    }
  }, []);
  return (
    <div className="login h-full">
      <NavBAr></NavBAr>
      <div className=" flex h-full justify-center items-center">
        <button
          className="h-12 w-48 m-12 bg-orange-400"
          onClick={handleLoginClick}
        >
          Login with Kite
        </button>
      </div>
    </div>
  );
};

export default Login;
