import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  HomeIcon,
  PuzzleIcon,
  LogoutIcon,
  AcademicCapIcon,
} from '@heroicons/react/solid'
import { signOut } from 'next-auth/react'

const Layout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>dseng{title && ` | ${title}`}</title>
        <meta description="dunwoody software engineering" />
        <meta author="david magnuson" />
      </Head>

      <main className="w-screen h-screen overflow-scroll flex flex-col-reverse md:flex-row">
        <Nav />
        {children}
      </main>
    </>
  )
}

export default Layout

const Nav = () => {
  const router = useRouter()
  const currentPath = router.pathname

  const handleSignout = () => {
    confirm('Are you sure you want to signout') && signOut()
  }

  return (
    <nav className="bg-red-800 flex flex-row items-center justify-around py-3 px-0 md:py-0 md:px-3 md:flex-col text-gray-50">
      <Link href="/" passHref>
        <HomeIcon
          width={50}
          className={
            currentPath === '/' ? classes.navIconSelected : classes.navIcon
          }
        />
      </Link>
      <Link href="/" passHref>
        <PuzzleIcon
          width={50}
          className={
            currentPath === '/courses'
              ? classes.navIconSelected
              : classes.navIcon
          }
        />
      </Link>
      <Link href="/" passHref>
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
