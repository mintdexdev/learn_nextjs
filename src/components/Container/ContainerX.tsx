import React from 'react'

const ContainerX = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative max-w-[1920px] mx-auto px-[clamp(24px,20.3077px+1.0256vw,40px)]'>
      {children}
    </div>
  )
}

export default ContainerX