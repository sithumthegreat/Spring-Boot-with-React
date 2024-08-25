import CategoryType from "./CategoryType"

interface ProductType{
    id:number
    name:string
    Description:string
    price:number
    category?:CategoryType

}
export default ProductType;