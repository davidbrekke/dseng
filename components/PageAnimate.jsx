import { motion } from 'framer-motion'

const PageAnimate = ({ children, classes }) => {
  return (
    <motion.div
      initial="pageInitial"
      animate="pageAnimate"
      variants={pageVariant}
      className={
        classes
          ? classes
          : 'w-full h-full flex flex-col font-bold bg-gray-50 text-gray-800 items-center justify-center space-y-5'
      }
    >
      {children}
    </motion.div>
  )
}

const pageVariant = {
  pageInitial: {
    opacity: 0,
  },
  pageAnimate: {
    opacity: 1,
  },
}

export default PageAnimate
