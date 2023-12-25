const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db.sqlite');




// Модель для управления продуктами в базе данных SQLite
const productModel = {
    
    init() {
        db.serialize(() => {
        db.run(`
        CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        price REAL
        )
        `);
        });
        },
        
getAllProducts() {
return new Promise((resolve, reject) => {
db.all('SELECT * FROM products', (err, rows) => {
if (err) {
reject(err);
return;
}
resolve(rows);
});
});
},

getProductById(id) {
return new Promise((resolve, reject) => {
db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
if (err) {
reject(err);
return;
}
resolve(row);
});
});
},

createProduct(product) {
return new Promise((resolve, reject) => {
const { name, description, price } = product;
db.run('INSERT INTO products (name, description, price) VALUES (?, ?, ?)', [name, description, price], function (err) {
if (err) {
reject(err);
return;
}
resolve({ id: this.lastID, ...product });
});
});
},

updateProduct(id, product) {
return new Promise((resolve, reject) => {
const { name, description, price } = product;
db.run('UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?', [name, description, price, id], function (err) {
if (err) {
reject(err);
return;
}
resolve({ id: id, ...product });
});
});
},

deleteProduct(id) {
return new Promise((resolve, reject) => {
db.run('DELETE FROM products WHERE id = ?', [id], err => {
if (err) {
reject(err);
return;
}
resolve();
});
});
}
};
productModel.init();
module.exports = productModel;