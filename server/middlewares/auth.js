const jwt = require('jsonwebtoken');

// middleware to authenticate JWT token
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    });
}
//middleware to authorize admin users
function authorizeAdmin(req, res, next) {
    if (req.user && req.user.isAdmin) {
        next(); // User is admin, proceed to the next middleware or route handler
    } else {
        res.status(403).json({ message: 'Access denied. Admins only.' });
    }
}   
//export the middlewares
module.exports = {
    authenticateToken,
    authorizeAdmin
};