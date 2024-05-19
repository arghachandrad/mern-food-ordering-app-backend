import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import myUserRoute from './routes/myUserRoute';
import myRestaurantRoute from './routes/myRestaurantRoute';
import restaurantRoute from './routes/restaurantRoute';
import orderRoute from './routes/orderRoute';
import { v2 as cloudinary } from 'cloudinary';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => console.log("Connected to database!"))

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express();

app.use(cors())

app.use('/api/order/checkout/webhook', express.raw({ type: '*/*' }))

app.use(express.json())


app.get('/health', async (_req: Request, res: Response) => {
  res.send({ message: 'health OK!' })
})

app.use('/api/my/user', myUserRoute)
app.use('/api/my/restaurant', myRestaurantRoute)
app.use('/api/restaurant', restaurantRoute)
app.use('/api/order', orderRoute)

app.listen(9000, () => {
  console.log('Server started on port: 9000')
})