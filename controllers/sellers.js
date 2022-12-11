const sellers=require('../models/sellers');
const book=require('../models/book');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const purchase = require('../models/purchase');




exports.postSignUp = (req, res, next) => {
    console.log('Routes is working well');
    console.log('request >>>',req.body);
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    console.log('123', username, password, email);
    bcrypt.hash(password, 10, async (err, hash) => {
        sellers.create({
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

exports.getSellers=(req,res,next)=>{
    sellers.findAll()
    .then(result=>{
        res.status(200).json(result);
    })
    .catch(err=>{
        res.status(500).json(err);
    })
}


exports.deleteSeller=(req,res,next)=>{
    const id=req.params.id;
    console.log('id >>>>>',id)
    sellers.destroy({where:{id:id}})
   
    .then(result=>{
        res.status(200).json(result);
    })
    .catch(err=>{
        res.status(500).json(err);
    })
}

exports.editSeller=(req,res,next)=>{
    const username=req.body.username;
    const email=req.body.email;
    const id=req.body.id;
    sellers.update({username:username,email:email},{where:{id:id}})
    .then(result=>{
        res.status(200).json(result);
    })
    .catch(err=>{
        res.status(500).json(err);
    })
}


exports.postBook=(req,res,next)=>{
    const title=req.body.title;
    const image=req.body.image;
    const price=req.body.price;
    const sellerId=req.body.sellerId||null;
    book.create({
        title:title,
        image:image,
        price:price,
        sellerId:sellerId
    })
    .then(response=>{
        res.status(201).json(response);
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
}


exports.getBook=(req,res,next)=>{
    book.findAll()
    .then(books=>{
        res.status(200).json(books);
    })
    .catch(err=>{
        res.status(500).json(err);
    })
}


exports.deleteBook=(req,res,next)=>{
    const id=req.body.id;
    console.log('id >>>>>',id)
    book.destroy({where:{id:id}})
   
    .then(result=>{
        res.status(200).json(result);
    })
    .catch(err=>{
        res.status(500).json(err);
    })
}


exports.postEdit=(req,res,next)=>{
    const title=req.body.title;
    const image=req.body.image;
    const price=req.body.price;
    const id=req.body.id;
    book.update({title:title,image:image,price:price},{where:{id:id}})
    .then(result=>{
        res.status(200).json(result);
    })
    .catch(err=>{
        res.status(500).json(err);
    })
    
}


exports.getOrder=(req,res,next)=>{
    const sellerId=req.params.sellerId;
    console.log('sellerId >>>>>>>',sellerId);
    purchase.findAll({where:{sellerId:sellerId}})
    .then(async books=>{
       //console.log('books in geting order of customers ',books[0].dataValues.bookId);
        let arr=[];
       
	for(let i=0;i<books.length;i++){
	           await book.findByPk(books[i].dataValues.bookId)
	            .then(async book=>{
	              // console.log('book finding for order',book);
	                arr.push(book);
	            })
	        }
	       // console.log('arr of order ',arr);
	        res.status(200).json(arr);

        
    })
    // .catch(err=>{
    //     res.status(500).json(err);
    // })

}



exports.getorder=(req,res,next)=>{
    purchase.findAll()
    .then(async books=>{
       // console.log('books in geting order of customers ',books[0].dataValues);
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