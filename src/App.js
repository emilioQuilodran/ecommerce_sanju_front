import { useRoutes } from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductsDetail from './pages/ProductsDetail';
import NotFound from './pages/NotFound'
import Login from "./pages/Login";

function App() {
  let routes = useRoutes([
    { path: '/', element: <Home />},
    { 
      path: '/auth',
      element: <Register />
    },
    { 
      path: '/login',
      element: <Login />
    },
    { 
      path: 'products',
      element: <Products />,
      children: [
        { path: 'products/:id', element: <ProductsDetail /> }
      ]
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
