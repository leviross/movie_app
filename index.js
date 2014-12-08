var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var request = require('request');
var db = require('./models/index.js');


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

var movies = [];

var request = require('request');


app.get("/", function (req, res) {
	res.render("index");
	// res.send("this worked");
})

app.get("/search", function (req, res) {
	var title = req.query.title;
	
	request('http://omdbapi.com/?s=' + title, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var stuff = JSON.parse(body);
			res.render("search", stuff);
		}
	})


});

app.get("/show/:id", function (req, res) {
	var imdbid = req.params.id;
	
	request('http://omdbapi.com/?i=' + imdbid, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var stuff = JSON.parse(body);
			res.render("show", stuff);
		}
	})


});
app.post("/added", function (req, res) {
	//var dbAdd = req.body;
	db.Movie.create(req.body).done(function (err, data) {
		if(err) throw err;

			console.log(data.values);
			res.render("added", req.body);

		
	})
});

app.get("/watch_list", function (req, res) {
	db.Movie.findAll().done( function (error, data) {

		// res.send(data);
		res.render("watch_list", {'Movie':data});
	}) 
});

app.listen(3000);