import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import ReactDOM  from 'react-dom/client';
import { InvoiceApp } from './InvoiceApp';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    < InvoiceApp/>
  </StrictMode>,
);



// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <InvoiceApp />
//   </React.StrictMode>
// );
