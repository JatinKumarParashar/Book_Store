const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const customer = require('../models/customer');
const book = require('../models/book');
const purchase = require('../models/purchase');



exports.postSignup = (req, res, next) => {
    console.log('Routes is working well');
    console.log('request >>>', req.body);
    const username = req.body.username;
    const email = req.body.email;
   
    const password = req.body.password;
    console.log('123', username, password, email);
    bcrypt.hash(password, 10, async (err, hash) => {
        customer.create({
            username: username,
            email: email,
           
            password: hash
        }).then((data) => {
            res.status(201).json(data);
        })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
                console.log('Or you have entered existing email');
            })
    })

}


exports.getCustomer=(req,res,next)=>{
    customer.findAll()
    .then(result=>{
        res.status(200).json(result);
    })
    .catch(err=>{
        res.status(500).json(err);
    })
}

exports.deleteCustomer=(req,res,next)=>{
    const id=req.params.id;
    console.log('id >>>>>',id)
    customer.destroy({where:{id:id}})
   
    .then(result=>{
        res.status(200).json(result);
    })
    .catch(err=>{
        res.status(500).json(err);
    })
}

exports.editCustomer=(req,res,next)=>{
    const username=req.body.username;
    const email=req.body.email;
    const id=req.body.id;
    customer.update({username:username,email:email},{where:{id:id}})
    .then(result=>{
        res.status(200).json(result);
    })
    .catch(err=>{
        res.status(500).json(err);
    })
}


exports.addOrder = (req, res, next) => {
    const bookId = req.body.id;
    const customerId = req.body.customerId;
    console.log('bookID and customerId',bookId,customerId)
    book.findByPk(bookId)
        .then(books => {
            console.log(books)
            purchase.create({
                bookId:books.id,
                customerId:customerId,
                sellerId:books.sellerId
            })
            .then(result=>{
                res.status(201).json(result);
            })
        })
        // .catch(err=>{
        //     res.status(500).json(err);
        // })
}


exports.getOrder=(req,res,next)=>{
    const customerId=req.params.customerId;
    console.log('customerId >>>>>>>',customerId);
    purchase.findAll({where:{customerId:customerId}})
    .then(async books=>{
       console.log('books in geting order of customers ',books[0].dataValues);
        let arr=[];
        for(let i=0;i<books.length;i++){
           await book.findByPk(books[i].dataValues.bookId)
            .then(async book=>{
               // console.log('book finding for order',book.dataValues);
                 arr.push(book.dataValues);
            })
        }
        //console.log('arr of order ',arr);
        res.status(200).json(arr);
        
    })
    .catch(err=>{
        res.status(500).json(err);
    })
}
