interface ButtonProps {
  title: string
  styles: string
  event?: () => void | (() => Promise<void>)
}
export default function Button ({ event, styles, title }: ButtonProps) {
  return (
    <button className={`${styles}`} onClick={event}>
      {title}
    </button>
  )
}
