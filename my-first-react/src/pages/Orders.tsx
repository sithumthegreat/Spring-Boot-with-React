import { useEffect, useState } from "react";
import OrderType from "../types/OrderType";
import axios from "axios";
import ProductType from "../types/ProductType";
import { useAuth } from "../context/AuthContext";

function Orders(){
    const[orders,setOrders]=useState<OrderType[]>([]);
    const{isAuthenticated,jwtToken}=useAuth();
    const config={
        headers:{
            Authorization:`Bearer ${jwtToken}`

        }
    }
   
    async function loadOrders(){
        try {
           const apiResponse=await axios.get("http://localhost:8081/order",config) ;
           setOrders(apiResponse.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(function (){
        loadOrders();
    },[])
    return(
        <div  className="container mx-auto pt-5 pb-5">
        <h1 className="text-3xl font-semibold mb-5 text-slate-800">Orders</h1>

        <table className="table-auto w-full">
           <thead >
           <tr className="bg-slate-200">
            <th className="p-2 w-[50px] text-left" >#</th>
            <th className="p-2 w-[200px] text-left">Date Time</th>
            <th className="p-2 w-[200px] text-left">Total Price</th>   
            <th className="p-2 w-[200px] text-left">Action</th>   


            </tr>
            </thead>  
            <tbody>
                {orders.map(function (order){
                    return (
                        <tr>
                            <td className="p-2 text-slate-600 border-b border-slate-200">{order.orderId}</td>
                            <td className="p-2 text-slate-600 border-b border-slate-200">{order.orderDateTime}</td>
                            <td className="p-2 text-slate-600 border-b border-slate-200">{order.total_price}</td>
                            
                    
                            <td className="text-sm text-bermuda"><button type="button" className="py-3 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm mr-5"  onClick={()=>handelEdit(order)}>EDIT</button>
                            <button  className="py-3 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm" onClick={()=>handelDelete(ordert)}>Delete</button></td>

                        </tr>
                    )
                })}
                </tbody>  
            </table>
        </div>

    )

}
export default Orders;