import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI || '';
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGO_URI) {
  throw new Error('Please add your MONGO_URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getMongoDb(dbName = 'Products') {
  const client = await clientPromise;
  return client.db(dbName);
}

export default clientPromise;
