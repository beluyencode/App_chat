var jwt = require('jsonwebtoken');



const verifyToken = (req, res, next) => {
    const authHeaders = req.header('Authorization');
    const token = authHeaders && authHeaders.split(" ")[1];
    try {
        var user= jwt.verify(token, 'long');
        delete user["iat"];
        req.user = user;
        next();
    } catch (error) {
        return res.json({message: 'error'});
    }

}
module.exports = verifyToken;
