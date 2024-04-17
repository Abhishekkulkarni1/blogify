import React from 'react'
import {Container, LogoutBtn} from '../Index'
import {Link} from "react-router-dom"
import {useSelector} from 'react-redux'
import {useNavigate} from "react-router-dom"


function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const navItems = [
    {
      name: 'Home', 
      slug: "/",
      active: true
    }, 
    {
      name:"Login",
      slug: "/login",
      active: !authStatus
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus
    },
    {
      name: "All Posts",
      slug: "/allposts",
      active: authStatus
    },
    {
      name: "Add Post",
      slug: "/addpost",
      active: authStatus
    }
  ]


  return (
    <header className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">BLOGIFY</h1>
        <nav>
          <ul className="flex space-x-4">
            {navItems.map((item) => 
            item.active ? (
              <li key = {item.name}>
                <button onClick={ () => navitage(item.slug)}
                className='inline-block px-6 py-2 duration-200 hover:bg-[blue-100] rounded-full'
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}

          {authStatus && (
            <li>
              <LogoutBtn/>
            </li>
          )}

          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header