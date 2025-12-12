import Rating from "@/app/components/general/Rating"
import Image from "next/image"

interface Props {
    pageTitle: string
}
export default function Header({ pageTitle }: Props) {
    return (
        <section className='flex flex-col bg-white w-full border-l border-[#F5F5F5]'>
            <div className='bg-white shadow-sm px-6 py-4 w-full'>
                {/* Top bar */}
                <div className='flex justify-between items-center'>
                    <h2 className='font-semibold text-[18px]'>{pageTitle}</h2>

                    {/* Icons */}
                    <div className='flex flex-row-reverse items-center gap-4'>
                        <Rating rate={5} />

                        <div className='shadow-md rounded-full'>
                            <Image
                                src='/user.png'
                                alt='vendor profile avatar'
                                className='object-contain cursor-pointer'
                                height={40}
                                width={40}
                            />
                        </div>
                        <div className='shadow-md rounded-full'>
                            <Image
                                src='/notify.png'
                                alt='notification icon'
                                className='object-contain cursor-pointer'
                                height={40}
                                width={40}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
