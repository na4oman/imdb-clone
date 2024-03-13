import Image from 'next/image'
import Link from 'next/link'

function Footer() {
  return (
    <footer className='sm:px-16 mt-12 py-4 px-8 text-slate-700 dark:text-slate-200'>
      <div className='flex flex-col sm:flex-row justify-between items-center gap-2 flex-wrap'>
        <p className='text-base font-bold'>@2024 IMDB Clone</p>
        <div className='link'>
          <Link href='/' className='flex items-center gap-1'>
            <span className='text-[#FFAD49] font-bold text-xl'>IMDB</span> Clone
          </Link>
        </div>
        <div className='flex items-center gap-6'>
          <Image
            src='/tiktok.svg'
            alt='logo'
            width={19}
            height={19}
            className='object-contain'
          />
          <Image
            src='/instagram.svg'
            alt='logo'
            width={19}
            height={19}
            className='object-contain'
          />
          <Image
            src='/twitter.svg'
            alt='logo'
            width={19}
            height={19}
            className='object-contain'
          />
        </div>
      </div>
      <p className='text-center text-sm mt-6 sm:mt-0'>
        Created by &copy; <span className='text-[#FFAD49]'>Atanas Irikev</span>
      </p>
    </footer>
  )
}

export default Footer
