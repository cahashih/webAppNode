

const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key'; 

const jwtUtils = {
generateToken(payload) {
return jwt.sign(payload, secretKey, { expiresIn: '24h' }); // Генерация токена с истечением через 24 часа
},

verifyToken(token) {
try {
return jwt.verify(token, secretKey);
} catch (error) {
throw new Error('Invalid token');
}
}
};

module.exports = jwtUtils;