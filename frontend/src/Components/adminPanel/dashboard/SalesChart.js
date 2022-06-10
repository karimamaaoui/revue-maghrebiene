import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
//import Chart from "react-apexcharts";
import React ,{useState,useEffect,useMemo} from "react";
import axios from "axios";
import Chart from "./chart";


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
  
    const data = [
      {name: 'Geeksforgeeks', students: 400},
      {name: 'Technical scripter', students: 700},
      {name: 'Geek-i-knack', students: 200},
      {name: 'Geek-o-mania', students: 1000}
    ];

  useEffect(() => {
    const getStats = async () => {
      try {

    axios.get("http://localhost:5000/api/file/stats").then(
            response=>{
             console.log("response",response.data) ;
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
  console.log("setArticleStat",articleStat)


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

// import React from "react";
// import Chart from "react-apexcharts";

// export default function SalesChart(props) {
//   const [price, setPrice] = React.useState([]);

//   React.useEffect(() => {
//     fetch(
//       "https://eodhistoricaldata.com/api/intraday/AAPL.US?api_token=OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX&fmt=json&interval=1h"
//     )
//       .then((res) => res.json())
//       .then((price) => setPrice(price));
//   }, []);

//   const time = [];
//   const o = [];
//   const h = [];
//   const l = [];
//   const c = [];

//   price.map((p) => {
//     time.push(p.createdAt);
//     o.push(p._id);
//     h.push(p.bio);
//     l.push(p.title);

//   });

//   // Chart Options
//   const series = [
//     {
//       data: [time, o, h, l ],
//     },
//   ];
  
//   const options = {
//     chart: {
//       id: "candlestick",
//     },
//     xaxis: {
//       categories: time,
//     },
//   };

//   return (
//     <div>
//       <Chart options={options} series={series} type="candlestick" width="50%" />
//     </div>
//   );
// }