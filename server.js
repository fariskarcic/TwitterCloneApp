var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
var db = mongoose.connection;
var bodyParser = require('body-parser');
var moment = require('moment');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('Successfully connected to db');
    
});
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

var userSchema = mongoose.Schema({
    username: String,
    img: String
});
var tweetSchema = mongoose.Schema({
    message: String,
    datetime: Date
})
var User = mongoose.model('User', userSchema);
var Tweet = mongoose.model('Tweet', tweetSchema);

app.get('/user', function(req, res){
    console.log("I received user request");
    var faris = new User({username: 'Faris Karcic', img: 'img/user.png'});
    User.find(function(err, docs){
        console.log(faris);
    })
    res.json(faris);
});

app.get('/tweets', function(req,res){
    console.log("I received tweets request");
    Tweet.find(function(err, docs){
        console.log(docs);
        res.json(docs);
    });
    
    
});

app.post('/tweets', function(req, res){
     req.body._id=0;
     var tweet = new Tweet({message: req.body.message, datetime: Date()});
     tweet.save(function(err,doc){
         if (err) return console.error(err);
         res.json(doc);
     })
});

app.delete('/tweets/:id', function(req,res){
    var id = req.params.id;
    console.log(id);
    Tweet.findByIdAndRemove(id, function(err, doc){
        res.json(doc);
    });
    
});


app.listen(4000);
console.log("Server running on port 4000");