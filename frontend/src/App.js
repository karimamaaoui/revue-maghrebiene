import './App.css';
import RoutesList from './Routes';
 import {io}  from "socket.io-client";
 import {useEffect,useState} from 'react'

//  var socket;

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