const Sequalize = require("sequelize");

const sequelize = require("../utils/database");

const Product = sequelize.define("product", {
  id: {
    type: Sequalize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequalize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequalize.DOUBLE,
    allowNull: false,
  },
  description: {
    type: Sequalize.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: Sequalize.STRING,
    allowNull: false,
  },
});

module.exports = Product;

// * OLD IMPLEMENTATION
// const db = require("../utils/database");
// const Cart = require("./cart");

// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     console.log(this.title, this.price, this.description, this.imageUrl);
//     return db.execute(
//       "INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)",
//       [this.title, this.price, this.description, this.imageUrl]
//     );
//   }

//   update() {
//     fs.readFile(p, (err, fileData) => {
//       let products = [];
//       if (!err) {
//         products = JSON.parse(fileData);
//       }

//       // Now find the data with the id we want to update
//       const productIndex = products.findIndex((prod) => prod.id === this.id);
//       products[productIndex] = this;

//       fs.writeFile(p, JSON.stringify(products), (err) => {
//         console.log(err);
//       });
//     });
//   }

//   static fetchAll() {
//     return db.execute("SELECT * FROM products");
//   }

//   static findById(id) {
//     return db.execute("SELECT * FROM products WHERE id = ?", [id]);
//   }

//   static deleteProduct(id, cb) {
//     fs.readFile(p, (err, data) => {
//       let products = [];

//       if (!err) {
//         products = JSON.parse(data);
//       }

//       const product = products.find((prod) => prod.id === id);
//       const updatedProducts = products.filter((prod) => prod.id !== id);
//       fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
//         if (!err) {
//           // delete from cart
//           Cart.deleteProduct(id, product.price);
//         }
//         cb(updatedProducts);
//       });
//       // return updatedProducts;
//     });
//   }
// };
