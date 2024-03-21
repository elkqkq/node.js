const jwt = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = {
    signAccessToken: (UserId, userRole) => {
        return new Promise((resolve, reject) => {
            const payload = { UserId, role: userRole };
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: '10m',
                issuer: 'abdinasir.com',
                audience: UserId.toString(),
            }
            jwt.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message);
                    reject(createError.InternalServerError());
                }
                resolve(token);
            })
        })
    },

 verifyAccessToken:(req,res,next)=>{
    if(!req.headers['authorization']) return next(createError())
    const authHeader = req.headers['authorization']
    const bearerToken =  authHeader.split(" ")
    const token = bearerToken[1]

    JWT.verify(token,process.env.ACCESS_TOKEN_SECRET, (err, payload)=>{
        if(err){
            if(err.name ==='JsonWebTokenError'){
                return next(createError.Unauthorized())
            }else{
                return next(createError.Unauthorized(err.message))
            }
        }
        req.payload = payload
        next()
    })
 },

 signRefreshToken:(UserId)=>{
    return new Promise((resolve,reject)=>{
        const payload ={}
        const secret = process.env.REFRESH_TOKEN_SECRET;
        const options = {
            expiresIn: '1y',
            issuer:'abdirashid',
            audience: UserId.toString(),
        }
        JWT.sign(payload,secret,options,(error,Token)=>{
            if(error) {
                console.log(error.message)
                reject(createError.InternalServerError());
            }
            resolve(token);
        })
    })
 },


 verifyRefreshToken:(refreshToken)=>{
    return new Promise((resolve,reject)=>{
        JWT.verify(refreshToken,process.env.ACCESS_TOKEN_SECRET,(err,payload)=>{
            if(err) return reject(createError.Unauthorized())
            const UserId = payload.aud

            resolve(UserId.toString())
        })
    })
 },
}