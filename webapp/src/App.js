import logo from './logo.svg';
import './App.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import {Route, Router, Routes} from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ProductsList from "./components/Products/ProductsList";
import ProductDetails from "./components/Products/ProductDetails";
import CreateProduct from "./components/Products/CreateProduct";
import UpdateProduct from "./components/Products/UpdateProduct";

function App() {
  return (
   <React.Fragment>
       <Navbar/>
         <Routes>
             <Route exact path="/" element={<Home/>}/>
             <Route exact path="/products" element={<ProductsList/>}/>
             <Route exact path="/admin" element={<ProductDetails/>}/>
             <Route exact path="/create-product" element={<CreateProduct/>}/>
             <Route exact path="/update-product/:id" element={<UpdateProduct/>}/>
         </Routes>
   </React.Fragment>

  );
}

export default App;
