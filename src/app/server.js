var express = require("express");
var bodyparser = require("body-parser");
var app = express();
app.use(bodyparser.json());

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});
//all db things are here
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/coworking", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});

var reqvisitschema = new mongoose.Schema({
  name: String,
  email: String,
  mn: Number
}); // {collection : 'user'});
var reqvisit = mongoose.model("reqvisit", reqvisitschema);
//var user=require('./schemas/users')

var bookareaschema = new mongoose.Schema({
  areaname: String,
  email: String,
  seat: Number,
  bookdate: Date,
  price: Number,
  duration: Number
}); // {collection : 'user'});
var bookarea = mongoose.model("bookarea", bookareaschema);

app.post("/bookarea", async (req, res) => {
  const data = req.body.data;
  const email = req.body.uid;
  const reqSeat = req.body.reqSeat;
  console.log("data---" + JSON.stringify(data));
  const newSeat = Number(data.reserved) + Number(reqSeat);
  const reqMonth = req.body.reqMonth;
  var today = new Date();
  console.log(
    "new price:" +
      Number(reqMonth) +
      "---" +
      Number(reqSeat) +
      "---" +
      Number(data.amount)
  );

  const totPrice = Number(reqMonth) * Number(reqSeat) * Number(data.amount);
  console.log("id:", data._id);
  console.log("new price:", totPrice);
  const resChange = await area.updateOne(
    { _id: data._id },
    { $set: { reserved: newSeat } }
  );
  if (resChange) {
    console.log(resChange);
  } else {
    console.log("Not updated");
  }
  const resArea = new bookarea({
    areaname: data.name,
    email: email,
    seat: reqSeat,
    bookdate: today,
    price: totPrice,
    duration: reqMonth
  }).save(function(err, data) {
    if (err) {
      console.log("Area data error" + err);
      res.status(500).json({
        isSucceed: false
      });
    } else {
      console.log(data);
      console.log("Data Areaa successfully");
      res.status(200).json({
        isSucceed: true
      });
    }
  });
  return { update: resChange, insert: resArea };
});
app.post("/requestvisit", async (req, res) => {
  const email = req.body.email;
  const resp = await reqvisit.findOne({ email });
  var emailregister = false;
  console.log("In server");
  if (resp) {
    console.log("oh no");
    res.status(200).json({
      emailregister: true
    });
  } else {
    new reqvisit({
      name: req.body.name,

      email: req.body.email,
      mn: req.body.mn
    }).save(function(err, data) {
      if (err) {
        console.log("oh no");
        res.status(500).json({
          isSucceed: false
        });
      } else {
        console.log(data);
        console.log("data inserted");
        res.status(200).json({
          isSucceed: true
        });
      }
    });
  }
});
var signupschema = new mongoose.Schema({
  name: String,
  email: String,
  mn: Number,
  password: String
}); // {collection : 'user'});
var signup = mongoose.model("signup", signupschema);

var areaschema = new mongoose.Schema({
  name: String,
  description: String,
  total: String,
  reserved: String,
  amount: String
}); // {collection : 'user'});
var area = mongoose.model("area", areaschema);

app.post("/findarea", async (req, res) => {
  // console.log("email from node"+req.body.email)

  console.log("Inside Server findArea");
  console.log(req.body);
  const { areaName } = req.body;
  const resp = await area.findOne({ name: "abcd" });

  console.log("Area Passed :" + areaName);
  console.log("response" + JSON.stringify(resp));

  if (!resp) {
    console.log("No data Found in Area Table");
    res.status(200).json({
      isFetch: false
    });
  } else {
    res.status(200).json({
      isFetch: true,
      fatchData: resp
    });
  }
});

app.post("/login", async (req, res) => {
  // console.log("email from node"+req.body.email)

  // console.log("in sign ins")
  console.log(req.body);
  const { email, password } = req.body;
  const resp = await signup.findOne({ email, password });
  console.log("email and pass by user:" + email + " " + password);
  console.log("response" + resp);

  if (!resp) {
    console.log("oh no");
    res.status(200).json({
      isLogin: false
    });
  } else {
    res.status(200).json({
      isLogin: true,
      userd: resp
    });
  }
});

app.post("/signupdata", async (req, res) => {
  const email = req.body.email;
  const resp = await signup.findOne({ email });
  var emailregister = false;
  console.log("In server");
  if (resp) {
    console.log("oh no");
    res.status(200).json({
      emailregister: true
    });
  } else {
    new signup({
      name: req.body.name,
      password: req.body.pass,
      email: req.body.email,
      mn: req.body.mn
    }).save(function(err, data) {
      if (err) {
        console.log("Sign up error" + err);
        res.status(500).json({
          isSucceed: false
        });
      } else {
        console.log(data);
        console.log("Sign up data successfully");
        res.status(200).json({
          isSucceed: true
        });
      }
    });
  }
});

app.listen(8000, () => console.log("server is listening at 8000"));
