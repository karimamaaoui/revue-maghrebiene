import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
//import Chart from "react-apexcharts";
import React ,{useState,useEffect,useMemo} from "react";
import axios from "axios";
import Chart from "./chart";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ResponsiveBar } from "@nivo/bar";
import ChartRespo from "./chartRespo";
import { Line } from "react-chartjs-2";

// import {
//   Chart as ChartJS,

//   BarElement,

// } from 'chart.js';

// import { Bar } from 'react-chartjs-2';

// ChartJS.register(
//   BarElement,
// );


const SalesChart = () => {
  const [price, setPrice] = useState([]);
  const [articleStat, setArticleStat] = useState([]);
  
  const monthsArray=useMemo(()=>
  [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
  
    ],[])
  
  useEffect(() => {
    const getStats = async () => {
      try {

    axios.get("http://localhost:5000/api/file/stats").then(
            response=>{
          //   console.log("response",response.data) ;
              //.then((price) => setPrice(price))
            const statsList = response.data.sort(function (a, b) {
              return a._id - b._id;
            });
            statsList.map((item) =>
                setArticleStat(
                prev=>[...prev,{
                  name:monthsArray[item._id-1],
                   "New Article" :item.total},
                  ])
                )
            })
        
        } catch (err) {
          console.log(err);
        }
  };
  getStats();
}, [monthsArray]);
  //console.log("price",price)
 // console.log("setArticleStat",articleStat)


//   const artciles = [];
//   const _id = [];
//   const createdAt = [];
//   const title = [];
//   const today=new Date();
//   const latYear =today.setFullYear(today.setFullYear()-1);
//  const number=[]

//   price.map((p) => {
//    // artciles.push(p.bio);
//    // _id.push(p._id);
//    // createdAt.push(p.createdAt);
//    /// title.push(p.title);
//     _id.push(p._id);
//     number.push(p.total)

//   });
//  // console.log(createdAt)
//  // console.log("articles",artciles)

//   const chartoptions = {
//     series: [
//       {
//         name:'createdAt',
//         data: number ,
//       },
      
      
//     ],
  
    
  
//    options : {
//     chart: {
//       id: "candlestick",
//     },
//     xaxis: {
//       categories: _id
//     },
  

//   }} 
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




  return (
    <>
    <Card style={{height:"500px"}}>
      <CardBody style={{height:"100%"}}>
            <Chart data={articleStat}  title="Article Analytics" grid dataKey="New Article"  />

      
      </CardBody>

    </Card>
    
    </>
  );
};

export default SalesChart;

