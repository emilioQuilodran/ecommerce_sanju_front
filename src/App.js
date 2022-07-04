import { useContext, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductsDetail from './pages/ProductsDetail';
import NotFound from './pages/NotFound'
import Dashboard from './pages/Dashboard'
import AddProduct from './pages/AddProduct'
import Login from "./pages/Login";
import ShoppingCart from './pages/ShoppingCart'
import { authContext } from "./Context/AuthContext";
import { cartContext } from './Context/Cart';
import { get } from './api';

function App() {
  const {setUser} = useContext(authContext)
  const {setItems} = useContext(cartContext)

  useEffect(()=>{
    get("/api/auth/validate")
    .then(result=>{
      setUser({type:'LOGIN',payload:result.user})
      get("/api/cart")
      .then(data=>{
        setItems({
          type:"UPDATE",
          payload:data
        })
      })
      .catch(console.log)
    })
    .catch(error=>console.log(error))
  },[setUser,setItems])

  let routes = useRoutes([
    { path: '/', element: <Home />},
    { 
      path: '/signup',
      element: <Register />
    },
    
    { 
      path: '/login',
      element: <Login />
    },
    { 
      path: 'products/:id',
      element: <ProductsDetail />
    },
    {
      path: 'dashboard',
      element: <Dashboard />
    },
    {
      path: 'dashboard/add-product',
      element: <AddProduct />
    },
    {
      path: '/shopping-cart',
      element: <ShoppingCart />
    },
    {
      path: '*',
      element: <NotFound />
    },
  ])

  return (
    <>
      {routes}
    </>
  );
}

export default App;
