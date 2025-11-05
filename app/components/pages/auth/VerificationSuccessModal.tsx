'use client'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import Button from '../../general/Button'
import { useRouter } from 'next/navigation'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}
export default function VerificationSuccessModal ({
  onOpenChange,
  open
}: Props) {
  const router = useRouter()
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className='py-12 max-w-md'
        onInteractOutside={e => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className='flex flex-col items-center text-center'>
            <Image
              src='/success.png'
              alt='success image'
              width={250}
              height={250}
              className='object-contain'
            />
          </DialogTitle>
          <DialogDescription className='flex flex-col items-center gap-4'>
            <div className='flex flex-col items-center'>
              <span className='font-bold text-[22px] text-[var(--heading-color)] text-center'>
                Email Verified!
              </span>
              <p className='text-[13px] text-[var(--foundation-neutral)] text-center'>
                Your email has been successfully verified. Welcome to
                Crown-Haven let’s get started!
              </p>
            </div>
            <Button
              event={() => {
                onOpenChange(false)
                router.replace('/auth/login')
              }}
              styles='bg-[var(--primary-color)] cursor-pointer text-white font-semibold px-6 py-2 rounded-md'
              title='Continue'
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
