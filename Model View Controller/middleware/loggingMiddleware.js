import fs from 'fs'

const logReqRes = (filename) => {
  return async (req, res, next) => {
    const logText = `${new Date().toISOString()} - ${req.ip} - ${
      req.method
    } - ${req.originalUrl}\n`

    try {
      await fs.promises.appendFile(filename, logText) // handle asynchronous file operations
    } catch (error) {
      console.error('Error writing to file', error)
    }

    next()
  }
}

export default logReqRes 
