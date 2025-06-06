import Image from 'next/image'
import React from 'react'
import { Button } from "@/components/ui/button"

export const Header = () => {
  return (
    <div className=' flex items-center justify-between p-4'>    <div className=' flex items-center gap-3'>
        <Image src={"/Ai-short.png"} height={50} width={50} alt="log"/>
        <h2 className='text-xl font-bold'>Video Gen</h2>
    </div>
    <Button>Get Start</Button>
    </div>

  )
}
