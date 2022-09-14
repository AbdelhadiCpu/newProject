const express = require('express');

// First Task 




//const Cryptr = require('cryptr');
//const cryptr = new Cryptr('ReallySecretKey');

//const encryptedString = cryptr.encrypt('Popcorn');
//const decryptedString = cryptr.decrypt(encryptedString);

//console.log(encryptedString)

//const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser');
//const session = require('express-session');
let school='';
let last= '';
let first = ''


const jwt = require('jsonwebtoken');
const emailvalidator = require('email-validator')


const app = express(); 
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer')
var userid = 27 ;
const saltRounds = 10;

if (typeof localStorage === 'undefined' || localStorage === null) {
    var LocalStorage = require('node-localStorage').LocalStorage
    localStorage = new LocalStorage('./scratch')
}


const StoredToken = localStorage.getItem('token')
const room = '/board/' + StoredToken.substring(20, 30)
console.log(room)




const verifyToken=(req,res,next)=>{
    const token = req.headers["x-access-token"];
    if(!token){
        return res.status(403).json('a token is required for Auth')
    }

    try{
        const decode= jwt.verify(token,'SUBSCRIBESOFTWARE12');
        req.user=decode;


    }catch(error){
        return res.status(401).json('Invalid token')
    }
    

    return next()


}


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'bakhtiazerreza2000@gmail.com',
        pass: 'waoccuqttvtghzwm'
    },
})



//app.use(cookieParser());
//app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());


/*app.use(
    session({
        key: "userId",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);*/



app.use(
    cors({
        origin: ['http://localhost:3000'],
         methods: ['GET', 'POST'],
        credentials: true,
 })
);


const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password:'mysql@2000',
    database: 'loginsystem',
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
   
});



app.post('/register', async(req, res)=> {

    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const establishment = req.body.establishment;
    const confirmation = req.body.confirmation;
    const encryptedPassword = await bcrypt.hash(password, saltRounds)
    const encryptedConfirmation = await bcrypt.hash(confirmation,saltRounds)
    console.log(encryptedPassword)

    if(email && password && firstname && lastname && establishment && confirmation && confirmation == password){

        if(emailvalidator.validate(email)){
            db.query('SELECT COUNT(*) AS cnt FROM users WHERE email=?', [email],
                (err, result) => {
                    if (err) {
                        res.send({ err: err })
                        console.log(err)
                    }
                    else {
                        if (result[0].cnt > 0) {
                            res.send({ message: 'email already exist, Failed registration' })
                        }
                        else {
                            db.execute(
                                'INSERT INTO users(firstname,lastname,email,establishment,password,confirmation,ischecked) VALUES(?,?,?,?,?,?,?)',
                                [firstname, lastname, email, establishment, encryptedPassword, encryptedConfirmation, false],
                                (err, result) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    if (result.affectedRows > 0) {
                                        res.status(200).send({ message: 'registred succesfully' })
                                    }
                                    else {
                                        res.send({ message: "can't register" })
                                    }

                                }
                            );

                            db.execute('SELECT id FROM users WHERE email= ? ',
                                [email], (err, rows) => {

                                    if (err) {
                                        res.send({ err: err })
                                    }
                                    else {
                                        userid = rows[0].id


                                    }
                                    console.log(userid)
                                    transporter.sendMail({
                                        to: email,
                                        subject: 'verify Account',
                                        html: '<p>copy this link to your browser *-* localhost:3001/verify/' + userid + '<a href="localhost:3001/verify/' + userid + '">*-*</a></p> to confirm your email'
                                    })

                                }

                            )

                        }
                    }

                }
            )    
        }else{
            res.send({message:'invalid email!'})
        }

    }else{
        res.send({message: ':(,invalid informations'})
    }
    
    
   
        
        
});









app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

   
    
    

    db.query('SELECT * FROM users WHERE email = ? ',
        [email],
         async(err,result)=>{

            if(err){
                res.send({err: err})
            }
            
            if(result.length>0){
                const comparison = await bcrypt.compare(password,result[0].password)
                
                if(comparison){
                    identificator = result[0].id
                    school = result[0].establishment
                    first = result[0].firstname
                    last = result[0].lastname
                    console.log(userid, first, last, school)

                    const token = jwt.sign({ id: identificator, school: school, firstname: first, lastname: last }, 'SUBSCRIBESOFTWARE12', { expiresIn: '50s' })
                   
   
                    res.send({token:token,message: 'success'})
                   // console.log(result)
    
                    console.log('successs')
                }
                else {
                    res.send({ message: "Wrong username/password combination!" })
                };

            } 
            else{
                res.send({ message: "user do not exist" })
            };
        })

       
});




/*app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});*/




  



app.post('/reset', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmation =req.body.confirmation
    const encryptedPassword = await bcrypt.hash(password,saltRounds)
    const encryptedConfirmation = await bcrypt.hash(confirmation,saltRounds)


   if(confirmation == password){
           db.execute('UPDATE users SET password = ?, confirmation = ? WHERE email = ?',
           [encryptedPassword,encryptedConfirmation,email],
           (err, result) => {

               if (err) {
                   res.send({ err: err })
               }
               if (result.affectedRows > 0) {
                   res.send(result)
                   //res.redirect()
                   console.log('password had been reset')

               }
               else {
                   res.send({ message: "Wrong email!" })
               };
           })
    

   }else{
    res.send({message: 'please make sure you confirm password rightfully'})
    console.log('pass and confirm are not matched')
   }
});







app.get(`/verify/:verifyID`,
(req,res)=>{
    const {verifyID} = req.params
    console.log(verifyID)
    db.query('UPDATE users SET ischecked = ? WHERE id = ? ',
    [true,Number(verifyID)],(err,result)=>{
        
        if(err){
            res.send({err: err})
        }
       if(result.affectedRows>0){
        res.send({message: 'your email had been verified succesfully'})
        console.log('yessss')
       }  
       else{
        res.send({message: 'Oops!, we faced a problem during the process'})
       }
    })
})


app.get('/firstpage',verifyToken  ,(req,res)=>{
    res.status(200).json('welcome to home page')
    console.log(88888888)
})




app.get('/',(req,res)=>{
    res.send('hello world')
})




app.post('/home/search', (req,res)=>{

    db.execute('SELECT * FROM users ',(err,result)=>{
        if(err){
            res.send({err: err})
        }
        else{
            if(result.length>0){
               
                res.send({usersdata: result})
            
            }
        }
    })
})

app.post(room, (req, res) => {
    const account = req.body.account
    console.log(account)
    if (emailvalidator.validate(account)) {
        transporter.sendMail({
            to: account,
            subject: 'You have been invited to a board room',
            html: '<p>Click This <a href="http://localhost:3000' + room + '">Link</a> to join The board room</p>'
        })
        res.send({ message: 'Invitation Sent' })
        console.log('sent')
    } else {
        res.send({ message: 'Email Not Valid' })
    }

})


app.listen(3001, (req,res) => {
    

    console.log('server is running');

});




// Seconfd Task

