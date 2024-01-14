import React, { useEffect, useRef, useState } from "react";
// import "./login.css";
// import { echarts } from "../echarts";
import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";
import {
  getNifty50PEData,
  getNifty50PBData,
  getNifty50DivData,
} from "../api/api";
import NavBAr from "../components/navbar";
let Analysis = () => {
  const seriesEL = {
    data: [932, 901, 934, 1290, 1330, 1320, 100, 1022, 343, 3333],
    type: "line",
    smooth: false,
  };
  const optionsG = {
    title: {
      text: "Nifty 50 PB",
      left: "center",
    },
    xAxis: {
      // type: "time",
      data: [],
    },
    tooltip: {
      trigger: "axis",
    },
    dataZoom: [
      {
        type: "slider",
        show: true,
        xAxisIndex: [0],
        start: "2 Jan 2013",
        end: "12 Jan 2023",
      },
    ],
    yAxis: {
      type: "value",
      min: "dataMin",
      max: "dataMax",
    },
    series: [],
  };
  const [optsPE, setOptsPE] = useState({});
  const [optsPBDiv, setOptsPBDiv] = useState({});
  const echarts_react_1 = useRef(null);
  const echarts_react_2 = useRef(null);

  useEffect(() => {
    let optionsBD = structuredClone(optionsG);

    getNifty50DivData().then((res) => {
      let data = res.data;
      optionsBD.title.text = "Nifty 50 Div (%) & PB";
      optionsBD.xAxis.data = [];
      data.dates = data.dates.reverse();
      data.div_yield = data.div_yield.reverse();
      optionsBD.xAxis.data.push(...data.dates);
      let seriesELD = structuredClone(seriesEL);

      seriesELD.data = [];
      seriesELD.data.push(...data.div_yield);

      optionsBD.series.push(seriesELD);

      console.log(data);
      setOptsPBDiv(optionsBD);
      getNifty50PBData().then((res) => {
        let data = res.data;
        // optionsBD.xAxis.data = [];
        // data.dates = data.dates.reverse();
        data.pb = data.pb.reverse();
        // optionsBD.xAxis.data.push(...data.dates);
        let seriesELB = structuredClone(seriesEL);
        seriesELB.data = [];
        seriesELB.data.push(...data.pb);

        optionsBD.series.push(seriesELB);

        console.log(data);
        setOptsPBDiv(optionsBD);
      });
    });

    getNifty50PEData().then((res) => {
      let data = res.data;
      let options = structuredClone(optionsG);

      options.title.text = "Nifty 50 PE";
      options.xAxis.data = [];
      data.dates = data.dates.reverse();
      data.pe = data.pe.reverse();
      options.xAxis.data.push(...data.dates);
      let seriesELE = structuredClone(seriesEL);

      seriesELE.data = [];
      seriesELE.data.push(...data.pe);
      options.series.push(seriesELE);

      console.log(data);
      setOptsPE(options);
    });
    // let echarts_instance_1 = this.refs.echarts_react_1.getEchartsInstance();
    // let echarts_instance_2 = this.refs.echarts_react_2.getEchartsInstance();
    echarts_react_1.current.group = "group1";
    echarts_react_2.current.group = "group1";

    // the echarts instance should require from echarts: import echarts from 'echarts';
    echarts.connect("group1");
    // or connect the charts array like this
    // echarts.connect([chart1, chart2]);
  }, []);

  return (
    <div className="analysis flex flex-col h-full w-full">
      <NavBAr></NavBAr>
      <div>
        {true && (
          <ReactEcharts
            ref={echarts_react_1}
            style={{ height: "70rem" }}
            // className="h-72"
            option={optsPE}
          />
        )}
      </div>

      <div className="py-16">
        {true && (
          <ReactEcharts
            ref={echarts_react_2}
            style={{ height: "70rem" }}
            // className="h-72"
            option={optsPBDiv}
          />
        )}
      </div>
      {/* <div className="py-16">
        {optsDiv && (
          <ReactEcharts
            style={{ height: "70rem" }}
            // className="h-72"
            option={optsDiv}
          />
        )}
      </div> */}
    </div>
  );
};

export default Analysis;
