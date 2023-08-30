require("dotenv").config();
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

//Routers
const userRouter = require('./routes/users')

//DB Related imports
const { sequelize } = require('./models')

const PORT = 8000

const app = express();

//middleware for cookies

app.use(express.json())

const corsOptions = {
    origin: 'http://localhost:3000',
    preflightContinue: true,
    credentials: true, // Allow cookies and other credentials
};
app.use(cookieParser())
  
app.use(cors(corsOptions));

app.listen(PORT, async () => {
    console.log(`Server running on ${PORT}`)
    await sequelize.authenticate()
    console.log('DB Connected')
})

// routes
app.use('/users', userRouter)
