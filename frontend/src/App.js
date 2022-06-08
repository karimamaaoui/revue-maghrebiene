import './App.css';
import RoutesList from './Routes';
 import {io}  from "socket.io-client";
 import {useEffect,useState} from 'react'
 import { Suspense } from "react";
import './i18n'
//  var socket;
import { useSelector } from 'react-redux';

const App=()=> {
  // const [socketConnected, setSocketConnected] = useState(false)

   //const [socket,setSocket]=useState(null)

  //  useEffect(()=>{
  //  socket=( io("http://localhost:4000"))
  //    console.log("fdfdfds",socket.on('firstevent',(msg)=>{
  //       console.log(msg)
  //     }))
  //  })


  return (

    <div className="App" id="home">

      <RoutesList/>

    </div>
    );
}

export default App;
