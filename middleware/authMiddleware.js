
const jwtUtils = require('../utils/jwtUtils');

function checkAdmin(req, res, next) {
const token = req.headers.authorization;

if (!token) {
return res.status(401).json({ error: 'No token provided' });
}

try {
const decoded = jwtUtils.verifyToken(token);
if (decoded.role !== 'admin') {
return res.status(403).json({ error: 'Access denied' });
}
next();
} catch (error) {
return res.status(401).json({ error: 'Invalid token' });
}
}

module.exports = { checkAdmin };