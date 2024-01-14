// import logo from "./logo.svg";
import { useEffect, useState } from "react";
// import "./App.css";
// import { login } from "./api/api";
import Login from "./pages/login";
import { useDispatch, useSelector } from "react-redux";
import NavBAr from "./components/navbar";
import Table from "./components/table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setSelectedDate } from "./redux/commonSlice";
import { API_BASE_URL } from "./data/data";
import dayjs from "dayjs";
import axios from "axios";

let App = () => {
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.access_token);
  const currentFocus = useSelector((state) => state.focus.currentFocus);
  // if (token === null) {
  //   return <Login></Login>;
  // } else
  const handleClick = () => {
    let d = dayjs(startDate);
    const date = `${d.year()}-${d.month() < 10 ? "0" : ""}${d.month() + 1}-${
      d.date() < 10 ? "0" : ""
    }${d.date()}`;
    axios.get(`${API_BASE_URL}/buy/month/${date}/nifty500`);
  };
  useEffect(() => {
    dispatch(setSelectedDate(startDate.toISOString()));
  }, [startDate, dispatch]);

  return (
    <div className="App">
      <NavBAr></NavBAr>
      {/* <header className="App-header"></header> */}
      {/* <DatePicker
        dateFormat="yyyy-MM-dd"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
      <button onClick={handleClick} type="button">
        Build Watchlist
      </button>

      <Table></Table> */}
    </div>
  );
};

export default App;
