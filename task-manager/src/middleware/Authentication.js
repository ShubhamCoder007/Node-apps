const jwt = require('jsonwebtoken')
const User = require('../db/models/user')

const auth = async (req, res, next) => {
    try {

        //filtering out the bearer token
        const token = req.header('Authorization').replace('Bearer ', '')
        //decoding the profile with the token and the secret sign provided, it has id encrypted
        const decodedProfile = jwt.verify(token, 'developedbyshubhambanerjee')
        //finding the user by the id where the token is still valid
        const user = await User.findOne({_id: decodedProfile._id, 'tokens.token': token})
        
        if (!user) {
            throw new Error()
        }

        //storing or caching the user in req field for faster and efficient access
        //next function resumes the normal router execution flow
        req.user = user
        next()

    } catch (e) {
        res.status(401).send({error: 'Please authenticate correctly!'})
    }
}

module.exports = auth