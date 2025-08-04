// server/auth.js
const jwt = require('jsonwebtoken')
const secret = "superman@123"

function createTokenForUser(user){
    payload={
        _id:user._id,
        FullName:user.FullName,
        email:user.email,
        profileImgURL:user.profileImgURL,
        role:user.role
    }
    const token = jwt.sign(payload,secret);
    return token;
}
function verifyToken(token){
    return jwt.verify(token,secret);
}
module.exports={
    createTokenForUser,verifyToken
}
