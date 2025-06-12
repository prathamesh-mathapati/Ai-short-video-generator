import React from 'react'
import DashboardProvider from './provider'

const Dashboardlayout = ({children }) => {
  return (
    <div><DashboardProvider>{ children }</DashboardProvider></div>
  )
}
export default Dashboardlayout