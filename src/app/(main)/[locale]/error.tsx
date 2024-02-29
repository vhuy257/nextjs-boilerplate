'use client' // Error components must be Client Components
import { CrossCircledIcon } from "@radix-ui/react-icons"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {  
  return (
    <div className='flex flex-col w-screen h-screen items-center justify-center'>
      <CrossCircledIcon className="text-red-400 w-14 h-14"/>
      <h2>Something went wrong!</h2>      
    </div>
  )
}