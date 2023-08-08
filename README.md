<p align="center">
  <img width="80" src="https://res.cloudinary.com/dd5a8yar0/image/upload/v1657272635/ghost-g9fc98e6d0_1280_byheet.png" alt="Material Bread logo">
</p>

<h3 align="center">eSoul</h3>
<p align = "center">eCommerce platform built with the MERN stack &amp; Redux.
<p align="center">Visit <a href="https://esoulapp.herokuapp.com/">eSoul</a></p>

</p>

---

## Features
* Full featured shopping cart
* Product reviews and ratings
* Top products carousel
* Product pagination
* Product search feature
* User profile with orders
* Admin product management
* Admin user management
* Admin Order details page
* Mark orders as delivered option
* Checkout process (shipping, payment method, etc)
* PayPal / credit card integration
* Database seeder (products & users)



## Usage

### ES Modules In Node

I have used ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error.

### Env Variables

Create a .env file in then root and add the following

```text
NODE_ENV = development
PORT = 8000
MONGO_URI = your mongodb uri
JWT_SECRET = 'aSECRET'
PAYPAL_CLIENT_ID = your paypal client id
```

### Install Dependencies

```text
npm install
cd frontend
npm install
```

### Run

```text
* Run frontend (:3000) & backend (:8000)
npm run dev

* Run backend only
npm run server
```

## Build & Deploy

```text
* Create frontend prod build
cd frontend
npm run build
```

There is a Heroku postbuild script, so there's no need to manually build react frontend.

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```text
* Import data
node seed.js

* Destroy data
node seed.js -d
```

---

<h4 align="center">Made with ❤️ By Suket Bhola</h4> 
