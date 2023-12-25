const jwtUtils = require('../utils/jwtUtils');
const userModel = require('../models/userModel');

const authController = {
async register(req, res) {
const { firstName, lastName, middleName, city, role } = req.body;

try {
const result = await userModel.createUser(firstName, lastName, middleName, city, role);
res.json({ id: result.id, message: 'User created successfully' });
} catch (error) {
res.status(500).json({ error: error.message });
}
},

async login(req, res) {
const { firstName, lastName } = req.body;

try {
const user = await userModel.findUserByName(firstName, lastName); // Поиск пользователя по имени

if (!user) {
return res.status(404).json({ error: 'User not found' });
}

const token = jwtUtils.generateToken({ id: user.id, firstName: user.firstName, lastName: user.lastName });

res.json({ token });
} catch (error) {
res.status(500).json({ error: error.message });
}
},
};

module.exports = authController;