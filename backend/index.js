import express from 'express'
const app = express()
import dotenv  from 'dotenv'
import connectDB   from './config/db.js'
import colors  from 'colors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import orderRoutes from './routes/orderRoutes.js'
import { authUser } from './middleware/authMiddleware.js'
import uploadRoutes from './routes/uploadRoutes.js'
import path from 'path'
import morgan from 'morgan'

dotenv.config();

connectDB()

if (process.env.PROCESS_MODE === "development"){
  app.use(morgan('dev'))
}
  //body parser
  app.use(express.json())

//product routes router
app.use('/api/products',productRoutes)

//user routes
app.use('/api/user',userRoutes)

//orders routes
app.use('/api/orders',orderRoutes)

//config routes
app.get('/api/config/paypalID',(req,res)=>res.send(process.env.PAYPAL_CLIENT_ID))

//upload route
app.use('/api/upload',uploadRoutes)

//make uplaod folder static
const __dirname = path.resolve()
app.use(
  '/uploads',
  express.static(path.join(__dirname, '/uploads'), { dotfiles: 'allow' })
)

if(process.env.PROCESS_MODE === 'production'){
  app.use(
    express.static(path.join(__dirname, '/frontend/build'), )
  )
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
}
else{
  app.get('/',(req,res)=>{
    res.send("API is running...")
  })
}

//error middleware
app.use(notFound)
app.use(errorHandler)


const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Running in ${process.env.PROCESS_MODE} mode on port ${port}`.yellow.bold)
})
