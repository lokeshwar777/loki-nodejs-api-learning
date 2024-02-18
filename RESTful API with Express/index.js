const express = require('express')
let users = require('./MOCK_DATA.json')
const fs = require('fs')

const PORT = 8000
const app = express()

// Middleware Plugin
app.use(express.urlencoded({ extended: false }))
app.use(express.json()) //required for sending PATCH request

app.get('/', (req, res) => {
  return res.send('This is Home Page')
})

app.get('/api/users', (req, res) => {
  // res.setHeader("X-Thor" , "God of Thunder")
  console.log(req.headers)
  return res.json(users)
})

//Routes
app
  .route('/api/users/:id')

  .get((req, res) => {
    const userId = Number(req.params.id)
    const user = users.find((user) => user.id === userId)
    if (!user) return res.status(404).json({ Error: 'User not found' })
    return res.json(user)
  })

  //includes logging and extra space for array
  // .patch((req, res) => {
  //   // Edit user with id
  //   const userId = parseInt(req.params.id)
  //   console.log('userId : ', userId)
  //   const user = users.find(user => user.id === userId)
  //   console.log('user : ', user)
  //   if (!user) return res.status(404).json({ Error: 'User not found' })
  //   const updatedUser = req.body
  //   console.log('updatedUser : ', updatedUser)
  //   users = users.map((user) =>
  //     user.id === userId ? { ...user, ...updatedUser } : user
  //   )
  //   // res.json({ status: 'success' })
  //   res.json({ message: 'User updated successfully', user: updatedUser })
  // })

  //more efficient and production friendly
  .patch((req, res) => {
    // Edit user with id
    const userId = parseInt(req.params.id)
    const userIndex = users.findIndex((user) => user.id === userId)
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' })
    }
    const updatedUser = req.body
    users[userIndex] = { ...users[userIndex], ...updatedUser }
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ error: 'Error updating user data' })
      }
      res.json({ message: 'User updated successfully', user: updatedUser })
    })
  })

  .delete((req, res) => {
    // Delete user with id
    const userId = parseInt(req.params.id)
    const userIndex = users.findIndex((user) => user.id === userId)
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Create a new array without the deleted user
    const updatedUsers = users.filter((user) => user.id !== userId)

    // Update the original array
    users = updatedUsers
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ error: 'Error updating user data' })
      }
      res.json({ message: 'User deletion successful' })
    })
  })

app.post('/api/users', (req, res) => {
  const body = req.body
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.city
  ) {
    return res.status(400).json({ msg: 'All fields are required!' })
  }
  users.push({ id: users.length + 1, ...body })
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: 'success', id: users.length })
  })
})

app.listen(PORT, () => console.log('Its play time!'))

// POST - postman - req - body - x-www-form-urlencoded
// PATCH - postman - req - body - x-www-form-urlencoded or body - raw - JSON

// Displaying only email id's of all users
// app.get('/users', (req, res) => {
//   const html = `
//     <html>
//       <head>
//         <style>
//           body {
//             background-color: black;
//             color: white;
//           }
//         </style>
//       </head>
//       <body>
//         <ul>
//           ${users.map((user) => `<li>${user.email}</li>`).join('')}
//         </ul>
//       </body>
//     </html>
//     `
//   res.send(html)
// })

/* // Understanding Middleware
app.use(
  '/users:id',
  (req, res, next) => {
    console.log('This is first use block')
    // res.send('Response')
    next()
  },
  (req, res, next) => {
    console.log('This is second use block')
    //next()
    res.send('Response from use')
  }
)

app.get('/users:id', (req, res, next) => {
  console.log('This is get block')
  res.send('Response from get')
})
*/

// app.use((req, res, next) => {
//   console.log('Hello from middleware')
// })

// We use routes instead of this
// app.get('/api/users/:userId', (req, res) => {
//   const id = Number(req.params.userId)
//   const user = users.find((user) => (user.id = id))
//   return res.json(user.first_name)
// })
