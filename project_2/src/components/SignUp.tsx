"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios, { AxiosError } from 'axios'

import toast from 'react-hot-toast'

function SignUp() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const onSubmit = async () => {
    try {
      setLoading(true)
      const response = await axios.post(`/api/users/signup`, user)
      console.log(response, response.data)
      toast.success("Sign Up Success")
      toast.success("Verification Email sent")
      router.push('/signin')
    } catch (error) {
      const axiosError = error as AxiosError
      toast.error("Sign Up Failed")
      toast.error(`${axiosError.message}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className=" h-fit min-w-full sm:min-w-[20rem] p-4 rounded-2xl flex flex-col  bg-neutral-100 text-black">
      <h1 className='text-3xl font-semibold text-center mb-4'>Sign Up</h1>
      <label htmlFor="username">Username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="username"
        type="text"
        value={user.username}
        placeholder="username"
        autoComplete='username'
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={user.email}
        placeholder="email"
        autoComplete='email'
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        placeholder="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={onSubmit}
        disabled={loading || buttonDisabled}
      >
        {buttonDisabled ? "Fill Details" : loading ? "Signing Up" : "Sign Up"}</button>
      <p>Already have an account? 
        <Link className='text-blue-600 ' href="/signin">Sign In</Link>
      </p>
    </div>
  )
}

export default SignUp