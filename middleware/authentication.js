// middleware/authentication.js
const { verifyToken } = require('../server/auth');

function checkforAuthCookie(req,res,next) {//this is not a function it is middleware

    try {
        const tokencookie = req.cookies?.token;
        if (!tokencookie) {
            return next(); // No tokencookie, proceed without user
        }

        const payload = verifyToken(tokencookie); // Verify and decode
        req.user = payload; // Attach user info to request
    } catch (e) {
        // If token is invalid or verification fails, continue without user
    }
   return next(); // Always call next at the end
}

module.exports = {
    checkforAuthCookie
};
