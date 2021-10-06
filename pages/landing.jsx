import { signIn, getSession } from 'next-auth/react'

export default function Landing() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center space-y-5 bg-red-800">
      <h1 className="text-3xl text-gray-800 flex flex-col justify-center items-center">
        dunwoody
        <span className="text-gray-50">software</span>
        engineering
      </h1>
      <button
        className="py-2 px-4 rounded-lg bg-gray-50 text-gray-800 hover:text-red-800 hover:shadow-white transition"
        onClick={() => signIn('azure-ad')}
      >
        signin
      </button>
    </div>
  )
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
