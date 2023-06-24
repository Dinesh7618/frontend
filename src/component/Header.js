import React, { useState } from 'react';
import logo from '../assest/logo.png';
import { Link } from 'react-router-dom';
import { BiSolidUser } from 'react-icons/bi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from "../redux/userSlice";
import { toast } from 'react-hot-toast';


const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const userData = useSelector((state) => state.user)
    console.log(userData)
    const dispatch = useDispatch()

    const handleShowMenu = () => {
        setShowMenu(prev => !prev)
    }
    const handleLogOut = () => {
        dispatch(logoutRedux())
        toast("Logout successfully")
    }
    const cartItemNumber = useSelector((state) => state.product.cartItem)
    return (
        <header className='fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white'>
            {/* desktop */}
            <div className='flex items-center h-full justify-between'>
                <Link to={""}>
                    <div className='h-10'>
                        <img src={logo} className='h-full' />
                    </div>
                </Link>
                <div className='flex items-center gap-4 md:gap-7'>
                    <nav className='gap-4 md:gap-6 text-base md:text-lg hidden md:flex'>
                        <Link to={""}>Home</Link>
                        <Link to={"menu/6496a02f770065aea9b9f652"}>Menu</Link>
                        <Link to={"About"}>About</Link>
                        <Link to={"contact"}>Contact</Link>

                    </nav>
                    <div className='text-3xl text-slate-600 relative'>
                        <Link to={"cart"}>
                        <AiOutlineShoppingCart />
                        <div className='absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center'>
                                {cartItemNumber.length}
                            </div>
                        </Link>
                    </div>


                    <div className=' text-slate-600' onClick={handleShowMenu}>
                        <div className='text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md' >
                            {userData.image ? <img src={userData.image} className='w-full h-full' /> : <BiSolidUser />}

                        </div>

                        {showMenu && (
                            <div className='absolute top-19 right-2 bg-white py-1 shadow drop-shadow-md flex flex-col min-w-[120px] text-center'>
                                {
                                    (userData.email === process.env.REACT_APP_ADMIN_EMAIL) && <Link to={"newproduct"} className='whitespace-nowrap cursor-pointer text-base px-1'>New product</Link>
                                }

                                {
                                    userData._id ? <p className="cursor-pointer hover:bg-red-700 text-white bg-red-500 px-1" onClick={handleLogOut}>Logout ({userData.firstName})</p> : <Link to={"login"} className='whitespace-nowrap cursor-pointer text-base px-1'>Login</Link>
                                }
                                <nav className='text-base md:text-lg flex flex-col md:hidden '>
                                    <Link to={""} className="px-1 py-1">Home</Link>
                                    <Link to={"menu/6496a02f770065aea9b9f652"} className="px-1 py-1">Menu</Link>
                                    <Link to={"About"} className="px-1 py-1">About</Link>
                                    <Link to={"contact"} className="px-1 py-1">Contact</Link>
                                </nav>

                            </div>
                        )}

                    </div>
                </div>
            </div>



            {/* mobile */}
        </header>
    )
}

export default Header;
