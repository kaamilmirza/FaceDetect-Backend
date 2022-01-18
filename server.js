const express = require('express');
const app     = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'JACKaBOY',
      database : "'face-detect'"
    }
  });
 
db.select('*').from('users').then(data =>
        console.log(data)
    );
 

 const database = {
    users :[
        {
            id: '1',
            name: 'Kaamil',
            email: 'Kaamil@xyz.com',
            password:'something',
            entries : 0,
            joined: new Date(),
        },
        {   id: '2',
            name: 'Priya',
            email: 'Priya@xyz.com',
            password: 'monsoon',
            entries : 0,
            joined: new Date(),
        }
    ],
    login: [
        {
            id:'123',
            has: '',
            email: 'someone@gmail.com'
        }

    ]
}


app.use(cors());
app.use(bodyParser.json());
app.get('/', (req,res) =>{
    res.database.users;
})

app.post('/signin', (req,res) =>{
    if(req.body.email === database.users[0].email
        && req.body.password === database.users[0].password)
        {
        res.json(database.users[0]);
        }
    
    else{
        res.status(400).json('Error logging in');
        
    }
})

app.post('/register', (req,res) =>{
    const{email,name,password} = req.body;
    db('users')
    .returning('*')
    .insert({
        email : email,
        name  : name,
        joined: new Date(),
    }).then(user => {
        res.json(user[0]);
    })
    .catch(err => res.status(400).json(err))
})

app.get('/profile/:id' , (req,res) =>{
    const {id} = req.params;
    
    db.select('*').from('users').where({id}).then(user => {
        if(user.length){
            res.json(user[0])
        }
        else{
            res.status(400).json('Not Found')
        }
        
    })
    
    .catch(err => res.status(400).json('Error getting user') )
})

app.put('/image', (req,res) =>{
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            user.entries++
           return res.json(user.entries);
        } 
    })
    if(!found){
        console.log(id);
        res.status(400).json('Not found....');
        }
    });

app.listen(3000,()=>{
    console.log('App is running on port 3000')
                    });