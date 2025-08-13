import mongoose from 'mongoose'

// const connection: { isConnected?: number } = {};

export default async function dbConnect() {

  // if (connection.isConnected) {
  //   // console.log('---Database Connection is already estabilished---')
  //   return;
  // }

  try {
    mongoose.connect(process.env.MONGODB_URI!)
    const db = mongoose.connection

    db.on('connected', () => {
      console.log("Database Connected")
    })

    db.on('error', (error) => {
      console.error("Database Connection Error", error)
    })

    process.exit(1);

  } catch (error: any) {
    console.error("__Internal Server Error__ \n during: Database Connection")
    throw new Error(error.message)
  }
}