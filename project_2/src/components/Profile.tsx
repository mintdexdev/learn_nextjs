"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function Profile() {
  const router = useRouter();

  const [data, setData] = useState("empty");
  const [loading, setLoading] = useState(false);

  const getUserDetails = async () => {
    try {
      setLoading(true)
      const res = await axios.get("/api/users/profile")
      setData(res.data.data._id)
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.error(axiosError.message)
      toast.error(axiosError.message)
    } finally {
      setLoading(false)
    }
  }

  const onSignout = async () => {
    try {
      const res = await axios.get("/api/users/signout")
      toast.success("Signout success")
      router.push("/")
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.error(axiosError.message)
    }
  }
  return (

    <div className=" h-fit min-w-full sm:min-w-[20rem] p-4 rounded-2xl flex flex-col  bg-neutral-100 text-black">
      <h1 className='text-3xl font-semibold text-center '>Profile</h1>
      <h2 className="my-2 px-4 py-2 rounded bg-blue-300">{data === 'empty' ? "Empty" : <Link href={`/profile/${data}`}>{data}
      </Link>}</h2>

      <button
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
        onClick={getUserDetails}
      // disabled={loading || buttonDisabled}
      >
        {loading ? "Getting Details" : "Get Profile Details"}
      </button>

      <button
        onClick={onSignout}
        className="bg-red-700 mt-8 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >Sign Out</button>

    </div>

  )
}
