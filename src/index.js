const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

onst monngodb_url="mongodb+srv://naveen-developer:rash47rash2021@naveen-developer.eja8d.mongodb.net/project-blog";

mongoose.connect(monngodb_url, {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
    console.log("MongoDB is connected");
}).catch((error)=>{
    console.log("Sorry! MongoDB is not connected");
    console.log(error);
});



app.use('/', route);




app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
