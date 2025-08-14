"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function VerifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token })
      setVerified(true);
      setError(false);
    } catch (error: any) {
      setError(true);
      console.error(error.response.data)
    }
  }

  // preferred
  // const searchParams = useSearchParams();
  // useEffect(() => {
  //   setError(false);
  //   const urlToken = searchParams.get("token") || "";
  //   setToken(urlToken);
  // }, [searchParams])

  // not preferred
  useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split("=")[1] || "";
    setToken(urlToken);
  }, [])


  useEffect(() => {
    setError(false);
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token])

  return (
    <div className="flex flex-col items-center my-6">

      <h1 className="text-4xl my-4">Verify Email</h1>
      <h2 className="break-all px-4 py-2 bg-blue-300 text-black rounded-xl">{token ? `${token}` : "no token"}</h2>

      {verified && (
        <div className="bg-neutral-800 p-4 my-4 rounded-2xl">
          <h2 className="text-2xl">Email Verified</h2>
          <p>Click here to&nbsp;
            <Link className="text-blue-500 underline" href="/signin">
               Sign In
            </Link>
          </p>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Error</h2>

        </div>
      )}
    </div>
  )
}
