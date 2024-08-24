import { Link } from "react-router-dom";
import Student from "../components/Student";
import { useState } from "react";
function Home() { //parent component

    const [counter,setCounter]=useState<number>(0);
    const[userName,setUsername]=useState<String>("");
    function increase(){
      const newCount=counter+1;
      setCounter(newCount)
    }
    function decrease(){
      const newCount=counter-1;
      setCounter(newCount)
    }
    function handelUsername(event:any){
      setUsername(event.target.value);
    }
    return (
        <>
         <Link to="/Profile">Profile</Link>
        <h1>WelCome {userName}</h1>
        <input type="text"  onChange={handelUsername}/>
        <h1>{counter}</h1>
        <button onClick={increase}>Increase Number</button>
        <button onClick={decrease}>Decrease Number</button>
        <Student name="Sithum" age={20}/>
        <Student name="Thaveesha" age={21}/>
        {/* <Product name="Bag" category="fashion"/> */}
        
      </>
    )
  }

  export default Home;