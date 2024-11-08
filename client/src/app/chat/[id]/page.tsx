import ChatBase from '@/components/chat/ChatBase'
import React from 'react'

export default async function chat({params} : {params : {id : string}}) {
  // const {id} = await params
  // console.log("the group id is ", params.id)
  return (
    <div>
        hello i am chat page
        <ChatBase />
    </div>
  )
}
