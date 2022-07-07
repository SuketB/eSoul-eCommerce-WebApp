import connectDB from "./config/db.js";
import dotenv from 'dotenv'
import colors from 'colors'
import products from './data/products.js'
import users from './data/users.js'
import Product from './models/productModel.js'
import User from './models/userModel.js'
import Order from './models/orderModel.js'

dotenv.config()
connectDB()

const seedData = async () => {
    try {
        await Product.deleteMany()
        await User.deleteMany()
        await Order.deleteMany()

        const insertedUsers = await User.insertMany(users)

        const admin = insertedUsers[0]._id

        const newProducts = products.map((product) => {
            return {...product, user:admin}
        })
        await Product.insertMany(newProducts)
        
        console.log("Data inserted!!".green);
        process.exit()
    } catch (error) {
        console.log(`${error}`.red);
        process.exit(1)
    }
}

const destroyData = async() => {
     try {
        await Product.deleteMany()
        await User.deleteMany()
        await Order.deleteMany()
    
        
        console.log("Data destroyed!!".red);
    } catch (error) {
        console.log(`${error}`.red)
                process.exit(1)

    }
}

if(process.argv[2] === '-d'){
    destroyData()
}
else{
    seedData()
}
