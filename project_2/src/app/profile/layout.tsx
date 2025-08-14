import React from 'react'
import { Toaster } from 'react-hot-toast'

function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen flex justify-center sm:items-center '>
      <Toaster />
      {children}
    </div>
  )
}

export default ProfileLayout