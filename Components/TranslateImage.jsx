"use client"
import Image from 'next/image';
import transImage from '@/public/translate.png'

export default function TranslateImage(){

  return(
    <div className='w-1/2 h-full'>
      <Image className='p-20 h-fit w-fit' src={transImage} />
    </div>
  )
}
