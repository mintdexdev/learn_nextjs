import React from 'react'
import { Toaster } from 'react-hot-toast'

function Auth({ children }: { children: React.ReactNode }) {
  return (
    <div className=''>
      <Toaster />
      {children}
    </div>
  )
}

export default Auth