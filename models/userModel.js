const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db.sqlite');

db.serialize(() => {
db.run(`
CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
firstName TEXT,
lastName TEXT,
middleName TEXT,
city TEXT,
role TEXT
)
`);
});


const userModel = {
createUser(firstName, lastName, middleName, city, role) {
return new Promise((resolve, reject) => {
db.run('INSERT INTO users (firstName, lastName, middleName, city, role) VALUES (?, ?, ?, ?, ?)',
[firstName, lastName, middleName, city, role],
function (err) {
if (err) {
reject(err);
} else {
resolve({ id: this.lastID });
}
});
});
},

findByRole(role) {
return new Promise((resolve, reject) => {
db.all('SELECT * FROM users WHERE role = ?', [role], (err, rows) => {
if (err) {
reject(err);
} else {
resolve(rows);
}
});
});
},

};

module.exports = userModel;