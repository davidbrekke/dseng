import axios from 'axios'
import { getSession, useSession, signOut } from 'next-auth/react'

export default function App({ message }) {
  const { data: session } = useSession()
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center space-y-5">
      <h1>
        hello <span className="text-red-800">{session?.user.name}</span>!
      </h1>
      <h2>{message}</h2>
      <button
        className="py-2 px-4 rounded-lg bg-red-800 text-gray-50"
        onClick={signOut}
      >
        signout
      </button>
    </div>
  )
}

export async function getServerSideProps({ params, req, res }) {
  const session = await getSession({ req })

  const {
    data: { message },
  } = await axios.get(`${process.env.api}/hi`)

  if (!session) {
    return {
      redirect: {
        destination: '/landing',
        permanent: false,
      },
    }
  }
  return {
    props: {
      message,
    },
  }
}
