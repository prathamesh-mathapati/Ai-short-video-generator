import React from 'react'
import { VideoList } from './_component/VideoList'

const Dashboard = () => {
  return (
    <div className=' p-10'>
      <h2 className='font-bold text-3xl'>My Video</h2>
      <VideoList />
    </div>
  )
}
export default Dashboard