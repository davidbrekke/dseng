import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  HomeIcon,
  PuzzleIcon,
  LogoutIcon,
  AcademicCapIcon,
} from '@heroicons/react/solid'
import { signOut } from 'next-auth/react'

const Nav = () => {
  const router = useRouter()
  const currentPath = router.pathname

  const handleSignout = () => {
    confirm('Are you sure you want to signout') && signOut()
  }

  return (
    <nav className="bg-red-800 flex flex-row items-center justify-around py-3 px-0 md:py-0 md:px-3 md:flex-col text-gray-50">
      <Link href="/">
        <HomeIcon
          width={50}
          className={
            currentPath === '/' ? classes.navIconSelected : classes.navIcon
          }
        />
      </Link>
      <Link href="/">
        <PuzzleIcon
          width={50}
          className={
            currentPath === '/courses'
              ? classes.navIconSelected
              : classes.navIcon
          }
        />
      </Link>
      <Link href="/">
        <AcademicCapIcon
          width={50}
          className={
            currentPath === '/plan' ? classes.navIconSelected : classes.navIcon
          }
        />
      </Link>
      <LogoutIcon
        onClick={handleSignout}
        width={40}
        className="cursor-pointer p-2 rounded-lg transition hover:bg-gray-50 hover:text-gray-800"
      />
    </nav>
  )
}

const classes = {
  navIcon:
    'cursor-pointer p-2 rounded-lg transition hover:bg-gray-50 hover:text-red-800',
  navIconSelected:
    'cursor-pointer p-2 rounded-lg transition bg-gray-50 text-red-800',
}

export default Nav
