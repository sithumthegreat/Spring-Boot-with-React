import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login(){
    const[username,setUsername]=useState<string>("");
    const[password,setPassword]=useState<string>("");
    const[error,setError]=useState<string>("");
    const{login}=useAuth();
    const navigate=useNavigate();

    async function handelLogin(){
        if(username=="" || password==""){
            setError("Please enter a valid username and password");
        }
        try {
            const data={
                username:username,
                password:password
            }
             const response=await axios.post("http://localhost:8081/auth/login",data);
             console.log(response);
             login(response.data);
             navigate("/");
            
        } catch (error) {
            setError("your username and password cannot be validated");
            
        }
    }
    return(
        <div className="py-10 px-5">
            <div className="max-w-[600px] mx-auto p-8 shadow-xl rounded-lg">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-red-600">Login</h1>
                </div>

                <form action="">
                <div className="mb-3">
                    <label htmlFor="" className="mb-1 block">Username</label>
                    <input type="text" className="w-full p-2 border border-gray-200 rounded-lg" placeholder="Enter your username" onChange={function(event){
                        setUsername(event.target.value);
                        setError("");
                    }} />
                </div>

                <div className="mb-3">
                    <label htmlFor="" className="mb-1 block">Password</label>
                    <input type="password" className="w-full p-2 border border-gray-200 rounded-lg" placeholder="Enter password" onChange={function (event){
                        setPassword(event.target.value);
                        setError("");
                    }}/>
                </div>

               {error && <div className="text-sm text-red-500">{error}</div>} 

                <div className="mt-5">
                    <button type="button" className="w-full rounded-lg px-4 py-2 bg-red-600 text-white hover:bg-gray-950" onClick={handelLogin}>Login</button>
                </div>

                <div  className="mt-5">
                    <button className="w-full rounded-lg px-4 py-2 bg-red-600 text-white hover:bg-gray-950">Register</button>
                </div>
            </form>
            </div>

            
            

        </div>
    )
}
export default Login;