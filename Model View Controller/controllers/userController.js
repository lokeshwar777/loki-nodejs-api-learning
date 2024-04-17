import User from '../models/userModel.js'

const handleGetAllUsers = async (req, res) => {
  try {
    const user = await User.find()

    // No user entries available
    if (!user.length) {
      return res.status(404).json({ error: 'No users found' })
    }

    return res.json({ message: 'Success', users })
  } catch (err) {
    // Logging and debugging the error
    console.error(err)

    // Check for specific Mongoose Error
    if (err.name === 'Validation Error') {
      return res
        .status(400)
        .json({ error: 'Validation Error', details: err.errors })
    }

    // Handle other types of errors
    return res.send(500).json({ error: 'Internal Server Error' })
  }
}

const getUserById = async (req, res) => {
  try {
    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid user ID' })
    }

    // Find user by ID
    const user = await User.findById(req.params.id)

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Return the user data
    return res.json(user)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

const updateUser = async (req, res) => {
  try {
    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid user ID' })
    }

    // Find user by ID
    const user = await User.findById(req.params.id)

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Update the user
    await User.findByIdAndUpdate(req.params.id, { lastName: 'Reddy' })

    // Return a success message
    return res.status(200).json({ message: 'Updation successful' })
  } catch (error) {
    // Log the error for debugging purposes
    console.error(error)

    // Return an internal server error response
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

const deleteUser = async (req, res) => {
  try {
    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid User ID' })
    }

    // Find user by ID
    const user = await User.findById(req.params.id)

    // Checking if the user exits
    if (!user) {
      return res.json(404).json({ error: 'User Not Found' })
    }

    // Delete the user
    await User.findByIdAndDelete(req.params.id)

    // Return a success message
    return res.status(200).json({ message: 'User deletion successful' })

    // Simulating Internal Server Error
    // await Promise.reject(new Error('Simulated Internal Server Error'))
  } catch (err) {
    // Log the error for debugging process
    console.log(err)

    // Return an Internal Server Error
    return res.status(500).json({ Error: 'Internal Server Error' })
  }
}

const createUser = async (req, res) => {
  const body = req.body
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.city
  ) {
    console.log(body)
    return res.status(400).json({ msg: 'All fields are required!' })
  }
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    city: body.city
  })

  console.log(result)

  return res.status(201).json({ message: 'User created' })
}

export { getUserById, updateUser, deleteUser, createUser, handleGetAllUsers }
