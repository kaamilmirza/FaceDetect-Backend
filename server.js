const express = require('express');
const app     = express();
const bodyParser = require('body-parser');
app.get('/' , (req,res)=>{
    res.send('This is working.....');
})
app.use(bodyParser.json());
const database = {
    users :[
        {
            id: '1',
            name: 'Kaamil',
            email: 'Kaamil@xyz.com',
            password: 'cookies',
            enteries : 0,
            joined: new Date(),
        },
        {
            id: '2',
            name: 'Priya',
            email: 'Priya@xyz.com',
            password: 'monsoon',
            enteries : 0,
            joined: new Date(),
        }
    ]
}
app.post('/signin', (req,res) =>{
    if(req.body.email === database.users[0].email
        && req.body.password === database.users[0].password)
        {
        res.json('successfull');
            }
    
    else{
        res.status(400).json('Error logging in');
    }
})

app.post('/register', (req,res) =>{
    const{email,name,password} = req.body;
    database.users.push({ 
        id: '1',
        name: name,
        email: email,
        password: password,
        enteries : 0,
        joined: new Date(),
     })
     res.json(database.users[database.users.length-1]);
});

app.listen(3000,()=>{
    console.log('App is running on port 3000')
                    });

