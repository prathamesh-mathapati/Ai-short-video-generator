import { Button } from '@/components/ui/button'
import { ArrowLeft, DownloadIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const VideoInfo = ({videoData}) => {
  console.log(videoData,"videoDatavideoDatavideoData");
  
  
  return (
    <div className='p-5 border rounded-xl'>

      <Link href={"dashboard"}>
      <h2><ArrowLeft/> Back to Dashboard</h2>
      </Link>
      <div className='flex flex-col gap-3'>
        <h2 className='mt-5'>Project Name: {videoData?.title}</h2>
        <p className='text-gray-500'>Vide Style: {videoData?.script}</p>
        <h2>Vide Style: {videoData?.title}</h2>
        <Button><DownloadIcon/>Export & DOwnload</Button>
      </div>
    </div>
  )
}

export default VideoInfo