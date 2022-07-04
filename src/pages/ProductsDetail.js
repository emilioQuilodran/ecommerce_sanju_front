import React , { useEffect, useState } from 'react'
import { get, post } from '../api'
import Navbar from '../components/Navbar';
import { useParams } from "react-router-dom";

const ProductsDetail = () => {
  const [product,setProduct] = useState({})
  const { id } = useParams();
  useEffect(()=>{
    get(`/api/products/one/${id}`)
    .then((data)=>{
      setProduct(data);
    })
    .catch(console.log)
  },[id])
  return (
    <div>
      <Navbar />
      <div className='h-screen py-20 flex justify-center'>
        <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
          {
            (Object.keys(product).length !== 0) && <img src={product.image[0]} alt={product.name}></img>              
          }
          {
            console.log(Object.keys(product))
          }
          <div className="p-6 flex flex-col justify-start">
            <h5 className="text-gray-900 text-xl font-medium mb-2">{product.name}</h5>
            <p className="text-gray-700 text-base mb-4">
              {product.description}
            </p>
            <p className="text-gray-700 text-base mb-4">
              ${product.price}
            </p>
            <button type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button>
          </div>
        </div>
      </div>

      <footer className="p-4 bg-white shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
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
    </div>
  )
}

export default ProductsDetail;
