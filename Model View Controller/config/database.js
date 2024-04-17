// Using Promises
import mongoose from 'mongoose'

function connectDB(url) {
  mongoose
    .connect(url)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('Mongo Error', err))
}

export default connectDB

// Using await/async
// import mongoose from 'mongoose'

// const connectDB = async (url) => {
//   try {
//     await mongoose.connect(url, {
//       useNewUrlParser: true, // while using newer MongoDB driver
//       useUnifiedTopology: true, // handling topology events and discovery
//       useCreateIndex: true // default index build to avoid deprecation warnings
//     })
//     console.log('MongoDB connected')
//   } catch (err) {
//     console.error('Mongo Error', err)
//   }
// }

// export default connectDB ;
