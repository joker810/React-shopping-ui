
import { Fragment } from 'react';
import './App.css';
import { Routes , Route } from 'react-router-dom';
import ProductDetailsPage from './pages/productDetails';
import ProductListPage from './pages/productList';
import CartListPage from './pages/cartList';

function App() {

  return (
    <Fragment>
      <Routes>
        <Route path="/product-details/:id" element={<ProductDetailsPage/>} />
        <Route path="/products" element={<ProductListPage/>} />
        <Route path="/cart-list" element={<CartListPage/>}/>
      </Routes>
    </Fragment>
  )
}

export default App
