var express = require("express");
var path = require("path");
//var notesArray = require("./public/assets/js/notes");

var fs = require("fs");
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  fs.readFile("db/db.json", "utf8", function(error, data) {

      if (error) {
        return console.log(error);
      }
    
      return res.json(JSON.parse(data))
    
    });
 
});

app.post("/api/notes", function(req, res) {
  
  var newnotes = req.body;

    fs.readFile("db/db.json", "utf8", function(error, data) {

      if (error) {
        return console.log(error);
      }
    
      var previousdata = JSON.parse(data);

       previousdata.push(newnotes);
       const convert = JSON.stringify(newnotes);
       const jsonString = JSON.stringify(previousdata)
       fs.writeFile("db/db.json",jsonString, err => {
         if (err){
           console.log('error writing file', err)
         }
         else{
          return res.json(JSON.parse(convert))

         }
       })



    
    });
  



//  const jsonString = JSON.stringify(newnotes)
//  fs.appendFile("db/db.json", jsonString, err =>{
//    if(err){
//      console.log('Error writing File', err)
//    }
//    else{
//      return res.json(JSON.parse(jsonString))
//    }
//  })

});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});





app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});