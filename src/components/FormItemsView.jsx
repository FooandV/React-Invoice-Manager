import { useEffect, useState } from "react";


/**
FormItemsView es un componente funcional de React que maneja un formulario para 
agregar nuevos ítems a una factura. Utiliza hooks de estado para gestionar los 
valores de los campos del formulario y un manejador de eventos para procesar 
el envío del formulario.
 */
export const FormItemsView = ({ handler }) => {
  /* 
  Estos hooks permiten que el componente InvoiceApp mantenga y actualice los valores de los campos del formulario
       de manera reactiva. Cuando el usuario ingresa datos en los campos de texto, 
       las funciones setProductValue, setPriceValue y setQuantityValue se llaman para actualizar 
       los valores correspondientes en el estado del componente.
       */
  /* v1
      //* V1:
      //* const [productValue, setProductValue] = useState("");
      //* const [priceValue, setPriceValue] = useState("");
      //*const [quantityValue, setQuantityValue] = useState("");
      */

  /*V2*/
  /** NOTES:
   * se maneja un solo estado para el formulario "formItemsState"
   * Los valores estan mapeados al formulario con el campo: value={} y mantienen el mismo
   *  nombre que el nombre del campo: name={} para que podamos despues invocar el método
   * onChange=onInputChange a medida que escribamos
   */
  const [formItemsState, SetFormItemsState] = useState({
    product: "",
    price: "",
    quantity: "",
  });
  //desestructuramos para obtener los valores de cada campo:
  const { product, price, quantity } = formItemsState;

  useEffect(() => {
    // console.log("El precio y el formulario cambio!");
  }, [price]);

  useEffect(() => {
    // console.log("El formulario cambio!");
  }, [formItemsState]);

  /**
   * La función onImputChange maneja los cambios en los campos de entrada del formulario.
   * @param {Object} event - El objeto de evento del campo de entrada.
   * @param {Object} event.target - El elemento de entrada que disparó el evento.
   * @param {string} event.target.name - El nombre del campo de entrada.
   * @param {string} event.target.value - El valor actual del campo de entrada.
   *
   * La función actualiza el estado del formulario (formItemsState) para reflejar los cambios
   * en los campos de entrada de manera reactiva. Utiliza el operador spread (...) para mantener
   * los valores actuales de los otros campos del formulario que no están siendo modificados.
   * SetFormItemsState: tenemos que mantener con el operador spread (...) el valor de los datos que teniamos de cada campo
   * porque vamos a modificar uno por uno, el resto de los campos que no estemos modificando se mantienen
   * modificamos el campo en cuestion con la variable computada del objeto del input:
   * [name]: value
   */
  const onImputChange = ({ target: { name, value } }) => {
    SetFormItemsState({
      ...formItemsState,
      //
      [name]: value,
    });
  };

  const onInvoiceItemsSubmit = (event) => {
    event.preventDefault(); //permite que el formulario NO se envie o actualice
    //estos if es para validar que si se ingresen datos a los campos:
    if (product.trim().length <= 1) return;
    if (price.trim().length <= 1) return;
    if (isNaN(price.trim())) {
      alert("Error el precio no es un numero");
      return;
    }
    if (quantity.trim().length < 1) {
      alert("Error la cantidad tiene que ser mayor a 0");
      return;
    }
    if (isNaN(quantity.trim())) {
      alert("Error la cantidad no es un numero");
      return;
    }

    handler(formItemsState);

    //tenemos que hacer un Set de cada imput con un string vacio:
    SetFormItemsState({
      product: "",
      price: "",
      quantity: "",
    });
  };

  return (
    <>
      <form className="w-50" onSubmit={(event) => onInvoiceItemsSubmit(event)}>
        <input
          type="text"
          name="product"
          value={product} //para que se reinicie el valor del campo
          className="form-control m-3"
          //onChange: nos permite ejecutar una funcion cuando cambia el valor
          //!🛑 onChange={(event) => onProductChange(event)}
          // 🤓se puede reescribir de una manera mas simplificada: lo que se recibe como argumento en la funcion lambda,
          //  se pasa también como argumento en la funcionse onProductChangepasa
          onChange={onImputChange}
          placeholder="Producto"
        />
        <input
          type="text"
          name="price"
          value={price} //para que se reinicie el valor del campo
          className="form-control m-3"
          // onChange={(event) => onPriceChange(event)}
          onChange={onImputChange}
          placeholder="Precio"
        />
        <input
          type="text"
          name="quantity"
          value={quantity} //para que se reinicie el valor del campo
          className="form-control m-3"
          // onChange={(event) => onQuantityChange}
          onChange={onImputChange}
          placeholder="Cantidad"
        />
        <button type="submit" className="btn btn-primary m-3">
          Nuevo Item
        </button>
      </form>
    </>
  );
};
