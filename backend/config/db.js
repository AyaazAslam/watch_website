import mongoose from 'mongoose';

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error('MONGO_URI is missing in environment variables');
  }

  console.log('Connecting to database...');

  let lastError;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 20000,
        connectTimeoutMS: 20000,
        socketTimeoutMS: 45000,
        family: 4,
      });
      console.log('Database connected');
      return;
    } catch (error) {
      lastError = error;
      console.error(
        `Database connect attempt ${attempt}/${MAX_RETRIES} failed: ${error.message}`,
      );
      if (attempt < MAX_RETRIES) {
        await sleep(RETRY_DELAY_MS * attempt);
      }
    }
  }

  throw lastError;
}
