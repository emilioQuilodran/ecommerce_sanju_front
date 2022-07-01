import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { get, post } from '../api'
import Navbar from '../components/Navbar';
import { cartContext } from '../Context/Cart'

const Home = () => {
  const {setItems} = useContext(cartContext)
  const [products,setProducts] = useState([])
  useEffect(()=>{
    get("/api/products")
    .then(({data})=>{
      console.log(data);
      setProducts(data)
    })
    .catch(console.log)
  },[])

  const addToCart = (id) =>{
    post("/api/cart/add",{
      idProduct:id,
      amount:1
    }).then(data=>{
      setItems({
        type:"UPDATE",
        payload:data
      })

    })
  }

  return (
    <>
      <header>
        <Navbar />
        <div className="text-center bg-gray-50 text-gray-800 py-20 px-6">
          <h1 className="text-5xl font-bold mt-0 mb-6">SJecommerce</h1>
          <h3 className="text-3xl font-bold mb-8">Encontra los mejores productos de ropa sobre anime</h3>
          <Link 
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" 
            to="/signup">
              Get started
          </Link>
        </div>
      </header>
      
      <section className='grid grid-cols-3 gap-5 w-3/4 mx-auto'>
        {products.map(product=>(
          <article className='bg-gray-200 shadow-sm' key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <img src={product.image[0]} alt={product.name} />
            <button onClick={()=>{
              addToCart(product._id)
            }}>Add to cart</button>
          </article>
        ))}
      </section>
    </>
  )
}
export default Home;