import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {get} from '../api/index'
import {authContext} from '../Context/AuthContext';
import { MdOutlineShoppingCart } from "react-icons/md"
import { FaUserCircle } from "react-icons/fa"

const Navbar = () => {
    const {user, logged, setUser} = useContext(authContext);
    const navigate = useNavigate()
    const logout = () => {
      get('/api/auth/logout')
      .then(result=>{
        console.log(result)
        setUser({
            type:'LOGOUT'
        })
        navigate('/')
      })
    }
  return (
    <div>
        <nav className="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between">
          <div className="px-6 w-full flex flex-wrap items-center justify-between">
            <div className="flex items-center">
              <button
                className="navbar-toggler border-0 py-3 lg:hidden leading-none text-xl bg-transparent text-gray-600 hover:text-gray-700 focus:text-gray-700 transition-shadow duration-150 ease-in-out mr-2"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContentY"
                aria-controls="navbarSupportedContentY"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  className="w-5"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="navbar-collapse collapse grow items-center" id="navbarSupportedContentY">
              <ul className="navbar-nav mr-auto lg:flex lg:flex-row">
                <li className="nav-item">
                  <Link className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out" to="/">Home</Link>
                </li>
                <li className="nav-item mb-2 lg:mb-0">
                  <Link className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out" to="/dashboard">Dashboard</Link>
                </li>
                {
                  !logged?<>
                      <li className="nav-item">
                        <Link className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out" to="/login">Login</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out" to="/signup">Signup</Link>
                      </li>
                  </>:
                  <>
                      <li className="nav-item">
                        <p className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out">
                          <FaUserCircle className='inline-block' /> {user.name}
                        </p>
                      </li>
                      <li className="nav-item">
                        <button
                          className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out" 
                          onClick={logout}>
                          Log out
                        </button>
                      </li>
                  </>
                }
              </ul>
              {
                logged ? <>
                  <Link to="/shopping-cart" ><MdOutlineShoppingCart style={{fontSize: '20px'}} /></Link>
                </>: <></>
              }
            </div>
          </div>
          <div>
            <img className='w-28' src='/logo.jpg' alt="sanju store"></img>
          </div>
        </nav>
        
    </div>
  )
}

export default Navbar;