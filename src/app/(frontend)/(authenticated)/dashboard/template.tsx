import { redirect } from 'next/navigation'
import React, { FC, ReactNode } from 'react'
import { getUser } from '../_actions/getUser'
import Navbar from '../_components/Navbar'

interface TemplateProps {
  children: ReactNode
}

const Template: FC<TemplateProps> = async ({ children }) => {
  const user = await getUser()
  if (!user) {
    redirect('/login')
  }
  return (
    <div>
      <Navbar></Navbar>
      {children}
    </div>
  )
}

export default Template
