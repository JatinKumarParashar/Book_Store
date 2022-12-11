const express = require('express');
const bodyParsed = require('body-parser');
const cors = require('cors');
const dotenv=require('dotenv');


dotenv.config();

const sequelize = require('./util/database');

const app = express();
app.use(cors());

//body-paraser
app.use(bodyParsed.json());
app.use(bodyParsed.urlencoded({ extended: true }));

//routes
const sellersRoutes=require('./routes/sellers');
const customerRoutes=require('./routes/customer');


//models
const Seller=require('./models/sellers');
const Book=require('./models/book');
const Customer=require('./models/customer');
const { use } = require('./routes/sellers');

app.use('/sellers',sellersRoutes);
app.use('/customer',customerRoutes);


//assosiation
Seller.hasMany(Book);
Book.belongsTo(Seller);


sequelize//.sync({force:true})
    .sync()
    .then(()=>{
    app.listen(8000, () => {
        console.log(`Server started on 8000`);
    });

})

