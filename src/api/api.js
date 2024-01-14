import axios from "axios";
import { API_BASE_URL } from "../data/data";
import dayjs from "dayjs";
export let fetchKey = async () => {
  let api_key = await axios
    .get(`${API_BASE_URL}/kite/key`)
    .then((res) => {
      console.log(res);
      //   setKey(res.data);
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return api_key;
};
export let fetchWatchlist = async (date) => {
  if (date) {
    let d = dayjs(date);
    const endDate = `${d.year()}-${d.month() < 10 ? "0" : ""}${d.month() + 1}-${
      d.date() < 10 ? "0" : ""
    }${d.date()}`;
    let list = await axios
      .get(`${API_BASE_URL}/watchlist/${endDate}`)
      .then((res) => {
        console.log(res);
        //   setKey(res.data);
        console.log(res.data);

        return res.data.map((el) => {
          let nel = el;
          nel.historical_data = /*JSON.parse*/ el.historical_data;
          return nel;
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // for (let x in list) {
    //   list[x].index
    // }
    return list;
  }
};
export const login = async () => {
  let token = null;
  token = await axios
    .get(`${API_BASE_URL}/kite/login`)
    .then(async (resp) => {
      console.log(resp, "login first");
      console.log(resp.data);
      window.open(resp.data, "_self");
      let localToken = null;
      let counter = 0;
      while (!localToken && counter < 5) {
        counter++;
        localToken = await axios
          .get(`${API_BASE_URL}/kite/token`)
          .then((res) => {
            console.log(res.data);
            return res.data;
          })
          .catch((err) => {
            console.log(err);
          });
        console.log(localToken, "interval");
      }
      console.log(localToken, "interval out internal");
      return localToken;
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(token, "login");
  return token;
};

export const getNifty50PEData = async () => {
  let data = await axios
    .get(`${API_BASE_URL}/data/historical/nifty/50/pe`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};
export const getNifty50PBData = async () => {
  let data = await axios
    .get(`${API_BASE_URL}/data/historical/nifty/50/pb`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};

export const getNifty50DivData = async () => {
  let data = await axios
    .get(`${API_BASE_URL}/data/historical/nifty/50/div`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};
