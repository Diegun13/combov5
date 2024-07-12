'use client'
import { useCallback, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Combo } from 'next/font/google'
import ComboCard from './ComboCard'

export default function ProModal({ children, }: { children: React.ReactNode}) {
  const overlay = useRef(null)
  const wrapper = useRef(null)
  const router = useRouter()


  

  const onDismiss = useCallback(() => {
    router.refresh()
  }, [router])

  const onClick = useCallback(
    (e:React.MouseEvent) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss()
      }
    },
    [onDismiss, overlay, wrapper]
  )

  const onKeyDown = useCallback(
    (e:KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss()
    },
    [onDismiss]
  )

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  return (
    <div
      ref={overlay}
      className=" flex flex-col fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        // className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-10/12 md:w-8/12 lg:w-1/2 p-6 text-black"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {children}
      </div>
    </div>
  )
}