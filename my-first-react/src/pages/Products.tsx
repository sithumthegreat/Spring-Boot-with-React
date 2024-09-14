import { useEffect, useState } from "react";
import CategoryType from "../types/CategoryType";
import axios from "axios";
import ProductType from "../types/ProductType";

function Products(){
    const[products,setProducts]=useState<ProductType[]>([]);
    const[productName,setProductName]=useState<string>("");
    const[productDesc,setProductDesc]=useState<string>("");
    const[price,setPrice]=useState<number>(0.0);
    const[categoryId,setCategoryId]=useState<number>();
    const [categories,setCategories]=useState<CategoryType[]>([]);
    const[editMode,setEditMode]=useState<boolean>(false);
    const[editProductId,setEditProductId]=useState<number| null>(null) //need documentation
    const[deleteMode,setDeletMode]=useState<boolean>(false);

    function handelProductName(event:any){
        setProductName(event.target.value);
    }
    function handelProductDesc(event:any){
        setProductDesc(event.target.value);
    }
    function handelPrice(event:any){
        setPrice(event.target.value);
    }
    function handelCatID(event:any){
        setCategoryId(event.target.value);
    }

    async function loadProducts(){
        const apiResponse=await axios.get("http://localhost:8081/product");
        setProducts(apiResponse.data);

    }
  
    useEffect(function(){
        loadProducts();
        loadCategories();
    },[])
    
    async function loadCategories(){
        const apiResponse=await axios.get("http://localhost:8081/category");
        //console.log(apiResponse);
        setCategories(apiResponse.data);

    }

    function handelEdit(product:ProductType){
        setProductName(product.name);
        setProductDesc(product.description);
        setPrice(product.price);
        setCategoryId(product.category?.id);
        setEditProductId(product.id);
        setEditMode(true);
    }
    function handelDelete(product:ProductType){
        setProductName(product.name);
        setProductDesc(product.description);
        setPrice(product.price);
        setCategoryId(product.category?.id);
        setEditProductId(product.id);
        setDeletMode(true);
        

    }
    async function handelSubmit(){
       const data={
        name:productName,
        description:productDesc,
        price:price,
        categoryId:categoryId
       }
       try {
        
        if(editMode && editProductId!==null){
            await axios.put(`http://localhost:8081/product/${editProductId}`, data);
            window.location.reload;
            setEditMode(false);
            setEditProductId(null);

        }if(deleteMode){
            await axios.delete(`http://localhost:8081/product/${editProductId}`);
            loadProducts();
            window.location.reload;
            setDeletMode(false);
            setEditProductId(null);
        }
        else{
            await axios.post("http://localhost:8081/product",data);
        }
        
        loadProducts();
        setProductName("");
        setProductDesc("");
        setPrice(0.0);
        setCategoryId(undefined);//need to know why

        
       } catch (error:any) {
            console.log(error);
        
       }

    }
    return(
        <div className="container mx-auto pt-5 pb-5">
        <h1 className="text-3xl font-semibold mb-5 text-slate-800">Products</h1>
        {/* <ul>
            {products.map(product=>(
                <li>{product.name}</li>
            ))}
        </ul> */}

        <table className="table-auto w-full">
           <thead >
           <tr className="bg-slate-200">
            <th className="p-2 w-[50px] text-left" >#</th>
            <th className="p-2 w-[200px] text-left">Product Name</th>
            <th className="p-2 w-[200px] text-left">Desciption</th>
            <th className="p-2 w-[100px] text-left">Product Price</th>
            <th className="p-2 w-[200px] text-left">Category</th>
            <th className="p-2 w-[200px] text-left">Action</th>
            </tr>
            </thead>  
            <tbody>
                {products.map(function (product){
                    return (
                        <tr>
                            <td className="p-2 text-slate-600 border-b border-slate-200">{product.id}</td>
                            <td className="p-2 text-slate-600 border-b border-slate-200">{product.name}</td>
                            <td className="p-2 text-slate-600 border-b border-slate-200">{product.description}</td>
                            <td className="p-2 text-slate-600 border-b border-slate-200">{product.price}</td>
                            { <td className="p-2 text-slate-600 border-b border-slate-200">{product.category?.name}</td> }
                            <td className="p-2 border-b border-slate-200"><button type="button" className="py-3 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm mr-5"  onClick={()=>handelEdit(product)}>EDIT</button>
                            <button  className="py-3 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm" onClick={()=>handelDelete(product)}>Delete</button></td>

                        </tr>
                    )
                })}
                </tbody>          
        </table>
        <div className="border border-slate-200 py-3 px-4 rounded-lg max-w-[350px] mt-5">
            <form action="">
                <div className="text-slate-800 text-xl">
                    {editMode?'Edit Product':'Add Product'}
                </div>
                <div>
                    <label htmlFor="" className="text-slate-600 font-sm block mb-2">Product Name</label>
                    <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-200 rounded-lg" value={productName}  onChange={handelProductName} required/>
                </div>

                <div>
                    <label htmlFor="" className="text-slate-600 font-sm block mb-2">Product Description</label>
                    <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-200 rounded-lg"  value={productDesc} onChange={handelProductDesc} required />
                </div>

                <div>
                    <label htmlFor="" className="text-slate-600 font-sm block mb-2">Product Price</label>
                    <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-200 rounded-lg"  value={price}   onChange={handelPrice} required />
                </div>

                <div>
                    <label htmlFor="" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg">Category</label>
                    <select value={categoryId} name="" id="" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg" onChange={handelCatID} required>
                        <option value="">Please Select Category</option>
                        {categories.map(function (category){
                            return(
                                <option value={category.id}>{category.name}</option>
                            )
                        })}


                    </select>
                </div>

                <button className="py-3 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm" onClick={handelSubmit}>{editMode?'UPDATE':'SUBMIT'}</button>

            </form>


        </div>

        </div>
    )

}
export default Products;