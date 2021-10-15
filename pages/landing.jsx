import Head from 'next/head'
import { signIn, getSession } from 'next-auth/react'
import { motion } from 'framer-motion'

export default function Landing() {
  return (
    <>
      <Head>
        <title>dunwoody software engineering</title>
      </Head>
      <div className="w-screen h-screen flex flex-col items-center justify-center space-y-5 bg-red-800">
        <motion.div initial="hidden" animate="visible" variants={h1Variant}>
          <h1 className="text-6xl text-gray-800 flex flex-col justify-center items-center font-bold">
            dunwoody
            <span className="text-gray-50">software</span>
            engineering
          </h1>
        </motion.div>
        <motion.div initial="hidden" animate="visible" variants={buttonVariant}>
          <button
            className="py-2 px-4 rounded-lg bg-gray-50 text-gray-800 hover:text-red-800 hover:shadow-white transition font-bold"
            onClick={() => signIn('azure-ad')}
          >
            signin
          </button>
        </motion.div>
      </div>
    </>
  )
}

const h1Variant = {
  hidden: {
    scale: 0.8,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.4,
    },
  },
}
const buttonVariant = {
  hidden: {
    scale: 0.8,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.8,
    },
  },
}

export async function getServerSideProps({ params, req, res }) {
  const session = await getSession({ req })

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {},
  }
}
