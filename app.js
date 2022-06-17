const express = require('express');
const mongodb = require('mongodb');
const dbConnect = require('./database_connect');
const app = express();
const port = 5000
app.use(express.json());

//--------------------------------------------- All users data here ?
app.get('/readallusers',async (req, res) => {
    let data = await dbConnect();
    let d = await data.find().toArray();
    console.log("All_users_data_here :",d); // show all data on vs terminal 
    res.send(d);    // show all data on postman
});

// ------------------------------------------------ here user logn email & password ?
app.get('/login_single',async (req, res) => {
    let data = await dbConnect();
    let d = await data.find((req.body)).toArray();
    res.send({result:`login successfully...`});
    // res.send(d)  // show user's data on postman

    console.log("logn_user_data :",d);  // single user show data on terminal 
    // console.log(`login user email id :- ${req.body.email}\nlogin user password :- ${req.body.password}`);
});

//--------------------------------------------- signup here ?
app.post('/signup',async(req,res)=>{
    let data = await dbConnect();
    let r = await data.insertOne(req.body)
    console.log(req.body);  // signup data postman and output on terminal

    res.send(req.body)  // signup data show on postman .
    // res.send(r) // {"acknowledged":true,"insertedId":"genereted new ID 24 character here"} on postman .
    // res.send({result:"data inserted..."});
})

// ********************************************* update user data ?
// ------------------------------------------------ update user data with id ?
app.put('/update/:id',async(req,res)=>{
    let data = await dbConnect();
    let result = await data.updateOne({ _id: new mongodb.ObjectId(req.params.id)},{$set:req.body})
    console.log("updated user data here :",req.body);  // update data postman and output on terminal
    res.send({result:"update user data successfully..."});
})

// ---------------------------------------- update user date with user email id ?
app.put('/update/:email',async(req,res)=>{
    let data = await dbConnect();
    let result = await data.updateOne({email:req.params.email},{$set:req.body})
    console.log(req.body);  // update data postman and output on terminal

    // console.log(result);
    res.send({result:"update user data with Email..."});
})

// ************************************************* delete user data from database ?
//  -------------------------- delete user date from email input in body on postman ?
app.delete('/delete/:email',async(req,res)=>{
    let data = await dbConnect();
    let d = await data.deleteOne({email:req.params.email})
    // console.log(req.body);  // delete data postman and output on terminal

    // console.log(result);
    // res.send({result:"delete user data with Email..."});
    res.send({result:`deleted email id :- ${req.params.email}`});
    console.log(`deleted email id :- ${req.params.email}`);

})

// ------------------------------------------------ delete user data from user id ?
app.delete('/delete/:id',async(req,res)=>{
    let data = await dbConnect();
    let result = await data.deleteOne({ _id: new mongodb.ObjectId(req.params.id)})
    console.log(req.body);  // delete data postman and output on terminal

    // console.log(result);
    res.send({result:`deleted id :- ${req.params.id}`});
    console.log(`deleted id :- ${req.params.id}`);

})

// ********************************************************** listen here ?
app.listen(port, () => {
    console.log("connected");
});