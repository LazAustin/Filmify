const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const port = /*process.env.PORT ||*/ 5000;

//connect to MongoDB. function brought in from config/db.js
connectDB()

//initialize express
const app = express();

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/purchases', require('./routes/purchaseRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

//added from GitHub
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('Please set to production');
    });
}

//Middleware for overriding express default error handler
app.use(errorHandler)

//Minimum Express
app.listen(port, () => console.log(`Server started on port ${port}`));
