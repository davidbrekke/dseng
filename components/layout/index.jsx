import Head from 'next/head'
import Nav from './Nav'

const Layout = ({ children, title, user }) => {
  return (
    <>
      <Head>
        <title>dseng{title && ` | ${title}`}</title>
        <meta description="dunwoody software engineering" />
        <meta author="david magnuson" />
      </Head>

      <main className="w-screen h-screen flex flex-col-reverse md:flex-row">
        <Nav user={user} />
        {children}
      </main>
    </>
  )
}

export default Layout
