const hi = (req, res) => {
  res.status(200).json({ message: 'Hello from the server side !' })
}

export default hi
