import React from 'react'
import ContainerX from './Container/ContainerX'
import { Spotlight } from './ui/spotlight-new'
import Link from 'next/link'
import { Button } from './ui/moving-border'
import ContainerY from './Container/ContainerY'

const HeroSection = () => {
  return (
    <section id='hero-section'>
      <ContainerY>
        <div className='absolute inset-0 max-w-[1920px] mx-auto'>
          <Spotlight />
        </div>
        <ContainerX>

          <div className='h-[clamp(40rem,100vh-10rem,80rem)] flex flex-col justify-center'>
            <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
              Master the art of music
            </h1>
            <p className="max-w-[50ch] mt-4 font-normal text-base text-neutral-300 text-center mx-auto">
              Dive into our comprehensive music courses and transform your musical journey today. Whether you're a beginner or looking to refine your skills, join us to unlock your true potential.
            </p>
            <div className="mt-10 flex justify-center">
              <Link href={"/courses"}>
                <Button
                  borderRadius="1rem"
                  className="duration-300 hover:brightness-200 active:scale-[0.98] bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
                >
                  Explore courses
                </Button>
              </Link>
            </div>
          </div>

        </ContainerX>
      </ContainerY>
    </section >
  )
}

export default HeroSection