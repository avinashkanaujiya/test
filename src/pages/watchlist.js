import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import NavBAr from "../components/navbar";
import Table from "../components/table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setSelectedDate } from "../redux/commonSlice";
import { API_BASE_URL } from "../data/data";
import dayjs from "dayjs";
import axios from "axios";

let App = () => {
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();
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
      <div className="flex justify-center p-4 bg-orange-100">
        <DatePicker
          className="p-8 bg-zinc-300"
          dateFormat="yyyy-MM-dd"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <button
          onClick={handleClick}
          type="button "
          className="bg-zinc-800 p-8 text-zinc-300"
        >
          Build
        </button>
      </div>
      <div className="flex justify-center">
        <Table></Table>
      </div>
    </div>
  );
};

export default App;
