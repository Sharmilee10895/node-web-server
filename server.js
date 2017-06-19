const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('veiw engine','hbs');


app.use((req,res,next)=>{
  var now = new Date().toString();
var log = `${now}: ${req.method} ${req.url}`;
 console.log(log);
fs.appendFile('server.log',log + '\n' ,(err)=>{
  if(err){
    console.log("unable to connect ");
  }
});
console.log();
next();
});

app.use((req,res,next)=>{
  res.render('maintainance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
});

hbs.registerHelper('scream',(text)=>{
  return text.toUpperCase();
});

app.get('/' , (req,res) =>{
  res.render('home.hbs',{
    welcomeMessage: 'WelcomePage'
  });
});

app.get('/about',(req,res) =>{
  res.render('about.hbs',{
    pageTitle: 'About Page'
  });
});

app.get('/bad',(req,res) => {
  res.send({
    errorMessage: 'Unable to handle the request'
  });
});

app.listen(port,()=>{
  console.log(`server is on port ${port}`);
});
