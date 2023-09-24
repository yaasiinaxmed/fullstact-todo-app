import React, { useEffect, useState } from "react";

//images
import GoogleIcon from '../assets/Google__G__logo.png'

// hooks
import { useFirebase } from "../context/firebase";
import { Link, useNavigate } from "react-router-dom";

// react toastify
import { toast} from 'react-toastify'

function SignIn() {
  const firebase = useFirebase()
  const navigate = useNavigate()

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault()

    firebase.signinWithEmailAndPass(email, password).then(() => {
      toast.success("Sign in was SuccessFully")
      navigate('/home')
    }).catch((error) => {
      console.log(error.message)
      if(error.message === 'Firebase: Error (auth/missing-email).') {
        toast.error('Please Enter Email')
      } else if(error.message === "Firebase: Error (auth/missing-password).") {
        toast.error('Please Enter Password')
      } else if(error.message === 'Firebase: Error (auth/invalid-email).') {
        toast.error('Please Enter Email Correct')
      } else if(error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
        toast.error('Password should be at least 6 characters')
      } else if(error.message === 'Firebase: Error (auth/email-already-in-use).') {
        toast.error('Email Already in use')
      } else if(error.message === 'Firebase: Error (auth/admin-restricted-operation).') {
        toast.error('Please Enter Email & Password')
      }
    })

  }

  const handleSigninWithGoogle = () => {
    firebase.signinWithGoogle().then(() => {
      toast.success("Sign in was SuccessFully")
      navigate('/home')
    })
  }

  useEffect(() => {
    if(firebase.user) {
      navigate('/home')
    }
  }, [firebase, navigate])

  return (
    <div className="h-screen container p-8 mx-auto flex flex-col gap-8 items-center justify-center ">
       <h1 className="text-3xl font-bold text-center text-[#cf4358]">
          Todo <span className="text-[#222c3a]">App</span>
       </h1>
      <form onSubmit={handleSubmit} className="w-full md:w-4/2 lg:w-1/3 flex flex-col gap-5 p-8 shadow-xl border-t-[3px] border-t-[#cf4358] rounded ">
        <h3 className="text-3xl font-medium text-center text-[#cf4358]">
          Sign In
        </h3>
        <div className="w-full flex flex-col gap-3">
          <label htmlFor="" className="">
            Email <span className="text-[#cf4358]">*</span>
          </label>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="p-3 border rounded outline-none focus:border-[#cf4358]"
          />
        </div>
        <div className="w-full flex flex-col gap-3">
          <label htmlFor="" className="">
            Password <span className="text-[#cf4358]">*</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="p-3 border rounded outline-none focus:border-[#cf4358] "
          />
        </div>
        <button type='submit' className="p-3 bg-[#cf4358] bg-opacity-90 text-white rounded-lg transition-all duration-300 hover:bg-opacity-100">
          Sign In
        </button>
        <button type="button" onClick={handleSigninWithGoogle} className="flex items-center justify-center gap-3 p-3 border bg-[#ffff] text-[#222C3A] font-medium rounded-lg">
          <img src={GoogleIcon} alt="" className="w-[24px] h-[24px]"/>
          Sign In With Google
        </button>
        <p className="text-center">Don’t have account? <Link to='/Sign-up' className="text-[#cf4358]">Sign Up</Link></p>
      </form>
    </div>
  );
}

export default SignIn;
