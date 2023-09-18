import React from 'react'

export default function NotFound({title}:any) {
  return (
    <div className='flex justify-center items-center'>{title ? title : "Not Found"}</div>
  )
}
