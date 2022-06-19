import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from 'react-google-charts'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {Line} from 'react-chartjs-2';
export default function ChartRespo() {
  const LineChartOptions = {
    hAxis: {
      title: 'Time',
    },
    vAxis: {
      title: 'Popularity',
    },
    series: {
      1: { curveType: 'function' },
    },
  }
  const [chartData,setChartData]=useState({});
  const dispatch = useDispatch();
  const history = useNavigate();
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  
  useEffect(() => {
  
  if (!userInfo) {
      history("/");
  }
  }, [
  dispatch,
  history,
  userInfo,
  ]);
  
  
useEffect(() => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,

    },
  };

  axios.get(`http://localhost:5000/api/file/getallfiles`,config).then((res) => {
    
         console.log("res",res.data) ;
          //.then((price) => setPrice(price))
            var labels = res.data.map(function(e) {
              return e.title;
          });
          var datasets = res.data.map(function(e) {
              return e.view.map((v)=>{
                return v.count
              });
          });



          var myMap = new Map().set(1,"hey").set(2,"you"),
          mapData = JSON.stringify([...labels]),
           values = JSON.parse(mapData).map(d => d);


           var myMap2 = new Map().set(1,"hey").set(2,"you"),           
          dataset = JSON.stringify([...datasets]),
           col = JSON.parse(dataset).map(c => c);


           console.log('dataset',dataset)
           console.log('col',col)
           

   setChartData([
    [values],
    [dataset],  
   
 ]);
  });
  }); 

  return (
    <div>

<div className="container mt-5">
        <h2>React Google Line Chart Example</h2>
        <Chart
          width={'700px'}
          height={'410px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={chartData}
          options={LineChartOptions}
          rootProps={{ 'data-testid': '2' }}
        />
      </div></div>
  );
}