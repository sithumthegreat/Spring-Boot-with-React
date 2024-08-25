import axios from "axios";
import CategoryType from "../types/CategoryType";
import { useEffect, useState } from "react";
function Categories(){
    const [categories,setCategories]=useState<CategoryType[]>([]);
    const [username,setUsername]=useState<string>("");
    async function loadCategories(){
        const apiResponse=await axios.get("http://localhost:8081/category");
        //console.log(apiResponse);
        setCategories(apiResponse.data);

    }
    function handelUsername(event:any){
        setUsername(event.target.value);

    }
    async function addCategory(){
        const data={
            name:username
        }
        const response=await axios.post("http://localhost:8081/category",data);
        console.log(response);
        loadCategories();

    }
    useEffect(function(){
        //action to take
        loadCategories();
    },[])//dependancy array, if blank runs at the component load
    return(
        <div className="container mx-auto pt-5 pb-5">
        
            <h1  className="font-semibold text-slate-400">Categories</h1>
            
            <button onClick={loadCategories}>Load Category</button>
            <ul>
                {categories.map(category=>(
                    <li className="inline-block px-3 py-2 me-3 mb-3 border border-slate-200 rounded-lg shadow">{category.name}</li>
                ))}
            </ul>

            <div className="mt-10 w-[650px] border border-slate-200 rounded-lg px-5 py-5 p-5" >
                <label className="text-sm text-slate-600  ">Enter Category Name</label>
                <input type="text" className="block w-full" onChange={handelUsername} />
                <button  className="border px-3 py-3 bg-slate-800 text-white mt-4 text-sm hover:bg-slate-950"    onClick={addCategory}>Add Category</button>
            </div>
        </div>
    )
}
export default Categories;