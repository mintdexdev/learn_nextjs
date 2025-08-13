import React from 'react'

const ContainerY = ({ children }: { children: React.ReactNode; }) => {
  return (
    <div className='pt-20 relative overflow-clip'>
      {children}
    </div>
  )
}

export default ContainerY