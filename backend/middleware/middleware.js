const jwt = require('jsonwebtoken');
const key = "customersAuthentication";

exports.authenticateUser = (req, res, next) => {
    const authToken = req.headers['authorization'];
    // console.log(req.headers,authToken);
    if (!authToken) return res.status(401).json({ message: 'Authorization token required' });

    try {
        const decoded = jwt.verify(authToken, key);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

exports.generateToken = (user) => {
    const payload = {
        username: user.username
    };

    const token = jwt.sign(payload, key, { expiresIn: '1h' });
    return token;
}