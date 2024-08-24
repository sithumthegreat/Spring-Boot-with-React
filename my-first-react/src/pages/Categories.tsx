import axios from "axios";
import CategoryType from "../types/CategoryType";
import { useState } from "react";
function Categories(){
    const [categories,setCategories]=useState<CategoryType[]>([]);
    const [username,setUsername]=useState<String>("");
    async function loadCategories(){
        const apiResponse=await axios.get("http://localhost:8081/category");
        //console.log(apiResponse);
        setCategories(apiResponse.data);

    }
    function handelUsername(event:any){
        setUsername(event.target.value);

    }
    async function addCategory(){
        await axios.post("http://localhost:8081/category",{
            name:username
        });
        loadCategories();

    }
    return(
        <div>
        
            < h1>Profile</h1>
            
            <button onClick={loadCategories}>Load Category</button>
            <ul>
                {categories.map(category=>(
                    <li>{category.name}</li>
                ))}
            </ul>

            <div>
                <label >Enter Category Name</label>
                <input type="text" onChange={handelUsername} />
                <button onClick={addCategory}>Add Category</button>
            </div>
        </div>
    )
}
export default Categories;