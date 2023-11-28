import React from 'react'
import Running from '../assets/running.png';

const Prueba = () => {
  return (
    <>
    
    <div className='w-full h-full'>
        <div className='container justify-center flex items-center mx-auto'>
            <img src={Running} alt="Running" className='w-[15%]'/>
            <h1 className='text-6xl font-bold italic text-white'>Resultados prueba de running</h1>
        </div>
    </div>
    </>
  )
}

export default Prueba