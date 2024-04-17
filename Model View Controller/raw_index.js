const mongoose = require('mongoose')
const express = require('express')
const fs = require('fs')

const PORT = 8000
const app = express()

// Middleware Plugin
// app.use(express.urlencoded({ extended: false }))
app.use(express.json()) //Middleware to parse JSON data

//Connection
mongoose
  .connect('mongodb://127.0.0.1:27017/userData')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Mongo Error', err))

//Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    gender: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

//Routes
app.get('/users', async (req, res) => {
  const allDBUsers = User.find({})
  const html = `
  <ul>
    ${(await allDBUsers)
      .map(
        (user) =>
          `<li>
        {' '}
        ${user.firstName} ${user.lastName} - ${user.email}
      </li>`
      )
      .join('')}
  </ul>`
  return res.send(html)
})

app.post('/users', async (req, res) => {
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
})

app
  .route('/users/:id')

  .get(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ Error: 'User not found' })
    return res.json(user)

    //Production level
    // try {
    //   // Validate if the ID is a valid MongoDB ObjectId
    //   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    //     return res.status(400).json({ error: 'Invalid user ID' })
    //   }

    //   // Find user by ID
    //   const user = await User.findById(req.params.id)

    //   // Check if the user exists
    //   if (!user) {
    //     return res.status(404).json({ error: 'User not found' })
    //   }

    //   // Return the user data
    //   return res.json(user)
    // } catch (error) {
    //   console.error(error)
    //   return res.status(500).json({ error: 'Internal Server Error' })
    // }
  })

  .patch(async (req, res) => {
    // await User.findByIdAndUpdate(req.params.id, { lastName: 'Reddy' })
    // return res.json({ message: 'Updation successful' })

    // Production level
    try {
      // // Check if the ID entered is valid
      // if (!mongoose.Schema.Types.ObjectId(req.params.id)) { // mistake - used Schema !used isValid
      //   res.json({ message: 'Invalid User Id' })
      // }

      // Validate if the ID is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid user ID' })
      }

      // Find user by ID
      const user = await User.findById(req.params.id)

      // Check if user exists
      // if (!user) {
      //   res.status(404).json({ message: 'User not found' }) // mistake - !used return
      // }

      // Check if the user exists
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      // // Update the user
      // User.findByIdAndUpdate(req.params.id, { lastName: 'Reddy' }) // mistake - !used await

      // Update the user
      await User.findByIdAndUpdate(req.params.id, { lastName: 'Reddy' })

      // res.status(200).json({ message: 'Updation successful' }) // mistake - !used return

      // Return a success message
      return res.status(200).json({ message: 'Updation successful' })
    } catch (error) {
      // Log the error for debugging purposes
      console.error(error)

      // Return an internal server error response
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  })

  .delete(async (req, res) => {
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
  })

app.listen(PORT, () => console.log('Its play time!'))
