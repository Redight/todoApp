const express = require('express')
const router = express.Router()
const {User} = require('../models/')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//Get All Users
router.get('/', verifyToken, async (req, res) =>{
    try {
        const users = await User.findAll()
        return res.json(users)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

//Get Specific User
router.get('/:uuid', async (req, res) =>{
    const uuid = req.params.uuid

    try {
        const user = await User.findOne({ where: { uuid: uuid } })
        if(user != null){
            return res.json(user)
        }
        else{
            return res.status(400).json({ message: "Unable to find user"})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

//Create User
router.post('/', async (req, res) =>{
    const { firstname, lastname, gender, email, role, } = req.body
    let password = req.body.password
    
    const salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password, salt)

    try {
        const user = await User.create({ firstname, lastname, password, gender, email, role})
        
        return res.json(user)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/login', async (req, res) => {
    const { email, password} = req.body
    const user = await User.findOne({ where: {email: email} });
    const role = user.role

    
    const match = await bcrypt.compare(password, user.password)

    if(match){
        const accessToken = jwt.sign({email: user.email, role: role}, process.env.JWT_SECRET, {expiresIn: '5m'});
        // const refreshToken = jwt.sign( {email: user.email}, process.env.JWT_SECRET, {expiresIn: '1h'});
        console.log(accessToken)
        res.cookie('jwtToken', accessToken, {httpOnly: true, maxAge: 3600000, withCredentials: true});
        res.status(200).json({accessToken, role})
    }

})

//Update User
router.patch('/:uuid', async (req, res) =>{
    const uuid = req.params.uuid
    const {firstname, lastname, role, email, gender} = req.body
    try {
        await User.update({firstname: firstname, lastname: lastname, gender: gender, role: role, email: email}, {
            where: {
                uuid: uuid
            }
        })
        return res.status(201).json({ message: "Successfully Updated" })
        
    } catch (err) {
        return res.status(500).json(err.message)
    }
})



//Delete User
router.delete('/:uuid', async (req, res) =>{
    const uuid = req.params.uuid;
    try {
        await User.destroy({
            where: {
                uuid: uuid
            }
        })
        return res.json('User Deleted')
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

function verifyToken(req, res, next) {
    const token = req.cookies.jwtToken
    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded user information to the request object
        next(); // Move to the next middleware or route handler
    } catch (err) {
        res.status(403).json({ message: 'Invalid token' });
    }
}


module.exports = router