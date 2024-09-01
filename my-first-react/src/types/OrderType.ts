import ProductType from "./ProductType";

interface OrderType{
    orderId:number,
    orderDateTime:Date,
    total_price:number,
    orderedProducts:ProductType[]

}
export default OrderType;