import React, { useState } from 'react';
import loginSignupImage from '../assest/login-animation.gif';
import { BiHide, BiShow } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginRedux } from '../redux/userSlice';

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    })
    const navigate =useNavigate()
    
    const userData = useSelector((state)=>state)


    const dispatch = useDispatch() 


    const handleOnChange=(e)=>{
         const {name,value}=e.target
         setData((preve)=>{
            return {
                ...preve,
                [name]:value
            }
         })
    }
    const handleSubmit= async (e)=>{
         e.preventDefault()
         const {email,password}=data
         if(email && password){
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/login`,{
                method : "POST",
                headers : {
                    "content-type" : "application/json"
                },
                body : JSON.stringify(data)
            })
            const dataRes = await fetchData.json()
            console.log(dataRes);
           
            toast(dataRes.message);
            if(dataRes.alert){
                dispatch(loginRedux(dataRes))
                setTimeout(()=>{
                    navigate("/")
                },1000);
                console.log(userData)
         }else{
            alert("please enter required field")
         }
    }
    console.log(userData)
}
    return (
        <div className='p-3 md:p-4'>
            <div className='w-full max-w-sm bg-white m-auto flex flex-col p-4'>
                <div className='w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto'>
                    <img src={loginSignupImage} className='w-full h-full' />
                </div>
                <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
                    
                    <label htmlFor='email'>Email</label>
                    <input type={"email"} id='email' name='email' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' 
                    value={data.email}
                    onChange={handleOnChange}
                    />

                    <label htmlFor='password'>Password</label>
                    <input type={"password"} id='password' name='password' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' 
                    value={data.password}
                    onChange={handleOnChange}
                    />

                    <button className='max-w-[150px] w-full m-auto bg-blue-500 hover:bg-blue-600 cursor-pointer text-xl font-medium text-white text-center py-1 rounded-full mt-4'>Login</button>

                </form>
                <p className='text-left text-sm'>Don't have account ? <Link to={"/Signup"} className='cursor-pointer px-1 text-base text-blue-500 underline hover:text-blue-800'>Signup</Link></p>
            </div>

        </div>
    )
}

export default Login

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-hot-toast';
// import { loginRedux } from '../redux/userSlice';
// import loginSignupImage from '../assets/login-animation.gif';

// const Login = () => {
//   const [data, setData] = useState({
//     email: '',
//     password: '',
//   });
//   const navigate = useNavigate();
//   const userData = useSelector((state) => state);
//   const dispatch = useDispatch();

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { email, password } = data;
//     if (email && password) {
//       const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });
//       const dataRes = await fetchData.json();
//       console.log(dataRes);

//       toast(dataRes.message);
//       if (dataRes.alert) {
//         dispatch(loginRedux(dataRes));
//         setTimeout(() => {
//           navigate('/');
//         }, 1000);
//         console.log(userData);
//       } else {
//         alert('Please enter required fields');
//       }
//     }
//   };

//   return (
//     <div className="p-3 md:p-4">
//       <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
//         <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
//           <img src={loginSignupImage} className="w-full h-full"  />
//         </div>
//         <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
//             value={data.email}
//             onChange={handleOnChange}
//           />

//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
//             value={data.password}
//             onChange={handleOnChange}
//           />

//           <button className="max-w-[150px] w-full m-auto bg-blue-500 hover:bg-blue-600 cursor-pointer text-xl font-medium text-white text-center py-1 rounded-full mt-4">
//             Login
//           </button>
//         </form>
//         <p className="text-left text-sm">
//           Don't have an account?{' '}
//           <Link to="/Signup" className="cursor-pointer px-1 text-base text-blue-500 underline hover:text-blue-800">
//             Signup
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
