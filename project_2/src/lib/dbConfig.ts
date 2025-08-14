import mongoose from 'mongoose'

const connection: { isConnected?: number } = {};

export default async function dbConnect() {

  // if already connected, skip
  if (connection.isConnected) {
    // console.log('---DB already Connected---')
    return;
  }

  // make new db connection
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!)
    connection.isConnected = db.connections[0].readyState
    // console.log('---DB Connection Success---');

  } catch (error: any) {
    console.error("---Error during DB Connection---", error)
    throw new Error(error.message)
  }
}