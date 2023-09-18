import ListCollection from '@/components/collections/listCollection'
import Content from '@/components/content.component'
import Heading from '@/components/heading.compoenent'
import React from 'react'

export default function Dashboard() {
  return (
    <>
        <Heading>Dashboard</Heading>
      <Content>
        <ListCollection />
      </Content>
     
    </>
  )
}
