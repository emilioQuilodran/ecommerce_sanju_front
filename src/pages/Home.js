import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { get, post } from '../api'
import Navbar from '../components/Navbar';
import { cartContext } from '../Context/Cart'

const categories = ["conjuntos","buzos","joggings","remeras","accesorios"]

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
          <h1 className="text-5xl font-bold mt-0 mb-6">SanjuStore</h1>
          <h3 className="text-3xl font-bold mb-8">Encontra los mejores productos de anime </h3>
          <ul className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4 justify-center" id="tabs-tab"
            role="tablist">
              {categories.map((category, index) => (
                <li key={index} className="nav-item" role="presentation">
                  <a href="#tabs-home" className="
                    nav-link
                    block
                    font-medium
                    text-xs
                    leading-tight
                    uppercase
                    border-x-0 border-t-0 border-b-2 border-transparent
                    px-6
                    py-3
                    my-2
                    hover:border-transparent hover:bg-gray-100
                    focus:border-transparent
                  " id="tabs-home-tab" data-bs-toggle="pill" data-bs-target="#tabs-home" role="tab" aria-controls="tabs-home"
                    aria-selected="true">{category}</a>
                </li>
              ))}
          </ul>
          <Link 
            className="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out" 
            to="/signup">
              Unete
          </Link>
        </div>    
      </header>
      
      <section className='grid grid-cols-3 gap-5 w-3/4 mx-auto py-16'>
        {products.map(product=>(
          <article className="flex justify-center"  key={product._id}>
            <div className="rounded-lg shadow-lg bg-white max-w-sm">
              <Link to={`/products/${product._id}`} data-mdb-ripple="true" data-mdb-ripple-color="light">
                <img 
                  className='max-w-xs rounded-t-lg'
                  src={product.image[0]}
                  alt={product.name} />
              </Link>
              <div className="p-6">
                <h5 className="text-gray-900 text-xl font-medium mb-2">{product.name}</h5>
                <p className="text-gray-700 text-base mb-4">
                  Some quick example text to build on the card title and make up the bulk of the card's
                  content.
                </p>
                <p>${product.price}</p>
                <button 
                  onClick={()=>{
                    addToCart(product._id)
                  }}
                  type="button" 
                  className="inline-block px-6 py-2 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                    Añadir al carrito
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
      <footer className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
                <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
            </li>
            <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
            </li>
            <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">Licensing</a>
            </li>
            <li>
                <a href="#" className="hover:underline">Contact</a>
            </li>
        </ul>
    </footer>
    </>
  )
}
export default Home;