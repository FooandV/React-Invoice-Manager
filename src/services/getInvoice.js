import { invoice } from "../data/Invoice"

export const getInvoice = () => {

//* si quiero calcular el total de otra forma con .reduce():
const total = calculateTotal(invoice.items);

return {...invoice, total: total }; 

}

export const calculateTotal = (items=[] )=>{
    return items
    .map(item => item.price * item.quantity)
    .reduce( (accumulator, currentValue) => accumulator + currentValue, 0);

}