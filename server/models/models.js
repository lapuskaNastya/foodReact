
const sequelize = require('../db');
const {DataTypes} = require('sequelize');


const User = sequelize.define ('user', {
id : {type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true},
email :{type : DataTypes.STRING, unique: true},
password : {type: DataTypes.STRING},
role : {type : DataTypes.STRING, defaultValue : 'USER'},
name: {type : DataTypes.STRING, allowNull : false},
numbering : {type : DataTypes.STRING, allowNull : false},
lastName: {type : DataTypes.STRING, allowNull : false},
adress :{type : DataTypes.STRING, allowNull : false},


});

const Basket = sequelize.define ('basket', {
    id : {type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true},
});

const Basket_Product = sequelize.define ('basket_product', {
    id : {type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true},
});

const Product = sequelize.define ('product', {
    id : {type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true},
    name : {type : DataTypes.STRING, unique : true, allowNull : false},
    price : {type : DataTypes.INTEGER, allowNull : false},
    img : {type : DataTypes.STRING, allowNull : false},
 });

 const Type = sequelize.define ('type', {
    id : {type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true},
    name: {type : DataTypes.STRING, unique : true, allowNull : false},
    img : {type : DataTypes.STRING, allowNull : false},
});

const Product_Info = sequelize.define ('product_info', {
    id : {type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true},
    tittle: {type : DataTypes.STRING, allowNull : false},
    description: {type : DataTypes.STRING, allowNull : false},
   
    
});

User.hasOne(Basket);
Basket.belongsTo(User);

Basket.hasMany(Basket_Product);
Basket_Product.belongsTo(Basket);

Type.hasMany(Product);
Product.belongsTo(Type);

Product.hasMany(Basket_Product);
Basket_Product.belongsTo(Product);

Product.hasMany(Product_Info, {foreignKey: 'productId', as: 'info'});
Product_Info.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
    User, Basket, Basket_Product, Product, Product_Info, Type
}

