import axios from "axios";
import { useEffect, useState } from "react";
import ProductType from "../types/ProductType";
import { useNavigate } from "react-router-dom";

function CreateOrder(){
    const[products,setProducts]=useState<ProductType[]>([]);//only stores products is just an array
    const[orderedProducts,setOrderedProducts]=useState<ProductType[]>([]);
    const[totalPrice,setTotalPrice]=useState<number>(0);
    const navigate=useNavigate();
    function addProductsToOrders(product:ProductType){
        const newArray=[...orderedProducts,product];
        setOrderedProducts(newArray);
        console.log(orderedProducts);

    }
    async function saveOrder(){
        try {
            const productIds:any=[];
            orderedProducts.map(function(product){
                productIds.push(product.id);
            });
            await axios.post("http://localhost:8081/order",{
                productIds:productIds
            })
            navigate("/Orders");

        } catch (error) {
            
        }
    } 

    async function loadProducts(){
        try {

            const apiResponse=await axios.get("http://localhost:8081/product");
            console.log("successfully get request");
            setProducts(apiResponse.data);

        } catch (error) {
            console.log(error);
            
        }

    }
    useEffect(function(){
        orderedProducts.map(function(product){
            const total=totalPrice+product.price;
            setTotalPrice(total);
        })


    },[orderedProducts])

    useEffect(function(){
        loadProducts();
    },[])
    return(
        <div className="flex">
            <div className="p-2 w-[400px] ">
                <div className="text-xl text-slate-600 font-semibold">
                    Products
                </div>
                <div  className="mt-5">
                    {/* display product list here */}
                    {products.map(function (product){
                        return(
                            <div className="p-3 mb-3 border border-slate-200 rounded-lg" onClick={()=>addProductsToOrders(product)}>
                                <div className="text-lg font-semibold text-slate-800">{product.name}</div>
                                <div className="text-sm  text-slate-600">{product.category?.name}</div>
                                <div className="text-lg  text-right text-green-500">{product.price}</div>

                            </div>
                        )
                    })}

                </div>
            </div>
            <div className="w-full p-2">
                <div className="text-xl text-slate-800 font-semibold mb-3">
                    New Order
                </div>
                <table className="table-auto w-full">
                    <thead >
                        <tr className="bg-slate-200">
                        <th className="p-2 w-[50px] text-left" >#</th>
                        <th className="p-2 w-[200px] text-left">Product</th>
                        <th className="p-2 w-[200px] text-left">Total</th>   
                        {/* <th className="p-2 w-[200px] text-left">Action</th>    */}


                        </tr>
                    </thead> 
                    <tbody>
                       {orderedProducts.map(function(orderedProduct){
                        return(
                            <tr>
                            <td className="p-2 text-slate-600 border-b border-slate-200">{orderedProduct.id}</td>
                            <td className="p-2 text-slate-600 border-b border-slate-200">{orderedProduct.name}</td>
                            <td className="p-2 text-slate-600 border-b border-slate-200">{orderedProduct.price}</td>
                            
                    
                            {/* <td className="text-sm text-bermuda"><button type="button" className="py-3 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm mr-5"  onClick={()=>handelEdit(order)}>EDIT</button>
                            <button  className="py-3 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm" onClick={()=>handelDelete(ordert)}>Delete</button></td> */}

                        </tr>
                        )
                       })}
                       <tr>
                        <td colSpan={2} className="font-semibold">Grand Total</td>
                        <td>{totalPrice}</td>
                        </tr> 
                    </tbody>
                </table> 
                <button onClick={saveOrder} className="py-3 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm mt-4">Save Order</button>
            </div>

        </div>
    )
}
export default CreateOrder;