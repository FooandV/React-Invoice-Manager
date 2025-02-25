import { useEffect, useState } from "react";
import { getInvoice, calculateTotal } from "./services/getInvoice";
import { ClientView } from "./components/ClientView";
import { CompanyView } from "./components/CompanyView";
import { InvoiceView } from "./components/invoiceView";
import { ListItemsView } from "./components/ListItemsView";
import { TotalView } from "./components/TotalView";
import { FormItemsView } from "./components/FormItemsView";

const invoiceInitial = {
  id: 0,
  name: "",
  client: {
    name: "",
    lastname: "",
    address: {
      country: "",
      city: "",
      street: "",
      number: 0,
    },
  },
  company: {
    name: "",
    fiscalNumber: 0,
  },
  items: [],
};

export const InvoiceApp = () => {

  const [activeForm, setActiveForm] = useState(false);

  const [total, setTotal] = useState(0);

  //este UseState es para controlar la asignación de items de la factura
  const [counter, setCounter] = useState(4);

  const [invoice, setInvoice] = useState(invoiceInitial); //estado de la factura

  const [items, setItems] = useState([]); //estado de los items de la factura

  const { id, name, client, company } = invoice;//desestructuramos la factura

  /**useEffect(): es una funcion de flecha, como segundo argumento
   * se pone [], se refiere a un arreglo que contiene una lista de dependencias
   * cuando el arreglo esta vacio sin ninguna dependencia significa que se va ejecutar este efecto
   * secundario del ciclo de vida cuando se crea el componente, puede tener varias dependencias
   * pueden ser variables, {}, que puedan cambiar
   */
  useEffect(() => {
    const data = getInvoice();
    console.log(data);
    //despues de que se busca la información la guardamos en el estado de nuestra factura:
    setInvoice(data);
    setItems(data.items);
  }, []);

  useEffect(() => {
    setTotal(calculateTotal(items));
    // console.log("los items cambiaron!");
  }, [items]);

  /**
   * Esta funcion recibe los datos del hijo que esta en "FormItemsView"
   * y luego los asignamos
   */
  const handlerAddItems = ({product,price, quantity}) => {
   
    setItems([
      ...items,
      {
        // id: 4,
        id: counter,
        product: product.trim(),
        price: +price.trim(), //el (+) es el unario para convertir a entero
        quantity: parseInt(quantity.trim(), 10), //el parseInt para convertir un String a Integer
      },
    ]);
    
    setCounter(counter + 1);
  };

  const handlerDeleteItem = (id) =>{
    /**
     * el operador filter nos permite devolver un nuevo arreglo filtrado, filtramos por el id
     * el id que estamos pasando vamos a decir que NO se incluya en este nuevo arreglo el items que contenga ese id
     */
    setItems(items.filter(item => item.id != id));
  }

  const onActiveForm = ()=>{
    setActiveForm(!activeForm);
  }


  return (
    <>
      <div className="container">
        <div className="card my-3">
          <div className="card-header">Ejemplo Factura</div>

          <div className="card-body">
            <InvoiceView id={id} name={name} />

            <div className="row my-3">
              <div className="col">
                <ClientView title="Datos del cliente" client={client} />
              </div>

              <div className="col">
                <CompanyView title="Datos de la empresa" company={company} />
              </div>
            </div>

            <ListItemsView
              title="Productos de la factura"
              items={items}
              handlerDeleteItem={ id => handlerDeleteItem(id)}
            />
            <TotalView total={total} />
            <button className="btn btn-secondary" onClick={onActiveForm}>
              {!activeForm ? "Agregar Item" : "Cerar Formulario"}
            </button>
            {!activeForm ? (
              ""
            ) : (
              <FormItemsView
                handler={(newItem) => {
                  handlerAddItems(newItem);
                }}
              />
            )}
            {/* el event del  */}
          </div>
        </div>
      </div>
    </>
  );
};
