import { Suspense } from 'react'
import ResetPasswordComponent from './ResetPasswordComponent'
import Loader from '@/app/components/general/Loader'

export default function ResetPasswordPage () {
  return (
    <Suspense fallback={<Loader />}>
      <ResetPasswordComponent />
    </Suspense>
  )
}
