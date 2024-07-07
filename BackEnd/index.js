const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('process.env.MONGO').then(()=>{
    console.log('Connected to MongoDB');
});

// API Creation
app.get('/', (req, res) => {
    res.send('Express App is running')
} )

// Image Storage Engine

const storage = multer.diskStorage({
    destination: './upload/images', 
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

// Schema for creating User model

const Users = mongoose.model('Users', {
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

// Create Endpoint for Registering User
app.post('/signup', async (req, res) => {

    let check = await Users.findOne({email: req.body.email});

    if (check) {
        return res.status(400).json({
            message: "Email Already Exists",
            error: "Existing User Account with this email"
        } )
    }
    let cart = {};
    for(let i = 0; i < 300; i++) {
        cart[i] = 0;
    }   
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart, 
    })

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({
        success: true,
        token: token,
    })
})

// Creating EndPoint for Login
app.post('/login', async (req, res) => {
    let user = await Users.findOne({email:req.body.email});

    if(user) {
        const passCompare = (req.body.password === user.password);
        if(passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }

            const token = jwt.sign(data, 'secret_ecom');
            res.json({
                success: true,
                token: token
            })
        }
        else {
            res.json({
                success: false,
                message: "Invalid Password"
            })
        }
    }
    else {
        res.json({
            success: false,
            message: "Wrong Email Address"
        })
    }
})

// Create Endpoint for New Collection Data
app.get('/newcollection', async (req, res) => {
    let products = await Product.find({});
    let new_collection = products.slice(1).slice(-8);
    console.log("New Collection Feteched");
    res.send(new_collection);
})

// Creating Endpoint for Popular Data
app.get('/popularinwomen', async(req, res) => {
    let products = await Product.find({category: "women"});
    let popular_in_women = products.slice(0,4);
    console.log("Popular in women Fetched");

    res.send(popular_in_women);
})

// Creating middleware to fetch user data
    const fetchUser = async(req, res, next) =>{
        const token = req.header('auth-token');

        if (!token) {
            res.status(401).send({errors: "Please authenticate using valid token"})
        }
        else {
            try{
                const data =jwt.verify(token, 'secret_ecom');
                req.user = data.user;
                next();
            }catch(error){
                res.status(401).send({errors: "Please authenticate using valid token"})
            }
        }
    }

// Creating Endpoint for adding product in carts
app.post('/addtocart', fetchUser, async (req, res) => {
    console.log("Added " + req.body.itemId);
    let userData = await Users.findOne({_id: req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
    res.send("Added to Cart");
})

// Creating Endpoint for removing product from cart

app.post('/removefromcart', fetchUser, async(req, res) => {
    console.log("Removed " + req.body.itemId);
    let userData = await Users.findOne({_id: req.user.id});
    if(userData.cartData[req.body.itemId] > 0) {
        userData.cartData[req.body.itemId] -= 1;
    }
    await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
    res.send("Removed from Cart");
})

// Creating Endpoint for getting cart data

app.post('/getcart', fetchUser, async(req, res) => {
    console.log("Get Cart Data");
    let userData = await Users.findOne({_id: req.user.id});
    res.json(userData.cartData);
})

const upload = multer({storage:storage})

// Creating upload Endpoint for images

app.use('/images', express.static(path.join(__dirname,'/upload/images')))

app.post('/upload', upload.single('product'), (req, res) => {
    
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// schema for Creating product
const Product = mongoose.model('Product', {
    id:{
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        req: true,
    },
    category:{
        type: String,
        required: true,
    },
    new_price:{
        type: Number,
        required: true,
    },
    old_price:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    available:{
        type: Boolean,
        default: true,
    },
})

app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;

    if(products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1; 
    }
    else {
        id = 1;
    }
    
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });

    console.log(product);
    await product.save();
    console.log('SAVED');
    res.json({
        success: true, 
        name: req.body.name,
    })
})

// Create API for deleting Product

app.post('/deleteproduct', async (req, res) => {
   await Product.findOneAndDelete({id:req.body.id});
   console.log("Deleted");
    res.json({
         success: true,
         name: req.body.name,
    })
})

// Create API for getting all products
app.get('/allproducts', async(req, res) => {
    let products = await Product.find({});

    console.log("All Products: ", products);
    res.send(products);
}) 

app.listen(port, (error) => {
    if(!error) {
        console.log('Server is running on port: ', port);
    }
    else {
        console.log('Error found: ', error)
    }
})
