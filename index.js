require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000
 
  //  For home page
 app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
  });
  app.get('/sign', (req, res) => {
    res.send('<h3>You must be authenticated to access this route </h3>');
  });
  app.get('/about', (req, res) => {
    
    res.send('<h1>This lab is a deliverable</h1><h3>Build 10 Routes and a view engine, say anything you want</h3>');
  });
    // For contact routes
  app.get('/contact', (req, res) => {
    res.send('for more details contact US ')
  });
  app.get('/profile', (req,res) => {
    res.send("Hello World, This is profile router");
  });
  //calculate two numbers using form
  app.use(bodyParser.urlencoded({extended: true}))
app.get('/calculator', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})
app.post('/calculator', (req, res) => {
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);
    var result = num1 + num2;
    
    res.send('the result of two numbers is ' + result)
})

// templates
const fs = require('fs') // fs = file system
app.engine('hypatia', (filePath, options, callback) => { 
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err)
    
    const rendered = content.toString()
      .replace('#title#', '<title>' + options.title + '</title>')
      .replace('#message#', '<h1>' + options.message + '</h1>').replace('#content#','<div>'+ options.content + '</div>' )
    return callback(null, rendered)
  })
})
app.set('views', './views') // specify the views directory
app.set('view engine', 'hypatia')

app.get('/tpm', (req, res) => {
  res.render('template', { title: 'sign-in', message: 'user name and password', content: 'Hi user, welcome in our website' })
})

app.get('/help', (req, res) => {
  res.render('template', { title: 'we can help you', message: 'what is express?', content: ' <ol><li>Fast</li><li>Unopinionated</li><li>Minimalist</li><li>Web application framework</li></ol>' })
})
app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Taieb OUBERKA', message: 'this is my address 288 walnut Newark', content: ' this is a contact page' })
})

//end template
  
 // invalid URL

app.listen(port, () => {
    console.log("The server is running on port", port);
});