"use client"
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { Button } from './ui/button'
 
export default function ButtonAction({title}:{title?:string}) {
    const { pending } = useFormStatus()
  return (
    <Button  disabled={pending}>{pending ? 'Submitting...' : title? title : 'Submit'}</Button>
  )
}
