var express = require("express");
var bodyparser = require("body-parser");
var app = express();
var rn = require("random-number");
const nodemailer = require("nodemailer");

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
  const resp = await area.findOne({ name: areaName });

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
  // console.log("email and pass by user:" + email + " " + password);
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
  console.log(email);
  const resp = await signup.findOne({ email });
  var emailregister = false;
  //console.log("In server");
  if (resp) {
    console.log("oh no");
    res.status(200).json({
      emailregister: true
    });
  } else {
    /* new signup({
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
                }*/

    var options = {
      min: 1000,
      max: 9999,
      integer: true
    };
    var num = rn(options);

    console.log(num);

    let transporter = nodemailer.createTransport({
      service: "gmail",
      //secure: false, // true for 465, false for other ports
      auth: {
        user: "danineel2352@gmail.com", // generated ethereal user
        pass: "google22042000npd" // generated ethereal password
      }
    });

    let info = {
      from: "danineel2352@gmail.com",
      to: email,
      subject: "otp verification",
      text: "Your Otp is:" + num
    };
    transporter.sendMail(info, function(error, data) {
      if (error) {
        console.log("Mail failed");
        res.status(200).json({
          isSucceed: false
        });
      } else {
        console.log("mail success.");
        res.status(200).json({
          isSucceed: true,
          emailregister: false,
          otp: num
        });
      }
    });
  }
});

app.post("/registerdata", async (req, res) => {
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
});

app.post("/remove", async (req, res) => {
  var id = req.body.id;
  var g = await bookarea.findOne({ _id: id });
  // , { seat: 1, areaname: 1, _id: 0 }
  console.log("jjjjjjjjjjjj" + id);
  console.log(g);
  var s = g.seat;
  var juniresseat;
  if (g) {
    console.log("resp found in remove");
    const data = await area.findOne({ name: g.areaname });
    // , { reserved: 1, _id: 0 }
    console.log("data--->." + data);
    var juniresseat = data.reserved;
    console.log("My seats====" + s + "Total res seat====" + juniresseat);
    console.log(juniresseat);
    var naviresseat = juniresseat - s;
    console.log(naviresseat);
    const update = await area.updateOne(
      { name: g.areaname },
      { $set: { reserved: naviresseat } }
    );
    if (update) {
      console.log("at a time of remove succesfully updated reserved");
    } else {
      console.log("at a time of remove not updated reserved");
    }
  } else {
    console.log("resp not found in remove");
  }

  console.log("inside server delete");
  bookarea.remove({ _id: id }, function(err) {
    if (err) {
      console.log("booking not deleted");
      res.status(500).json({
        removebook: false
      });
    } else {
      console.log("booking deleted");

      res.status(200).json({
        removebook: true
      });
    }
  });

  // //console.log("In server");
  // console.log(resp);
  // if (resp) {
  //   res.status(200).json({
  //     removbook: true
  //   });
  // } else {
  //   res.status(200).json({
  //     removbook: false
  //   });
  // }
});

app.get("/getallreq", async (req, res) => {
  console.log("inside server getallreq");
  reqvisit.find(function(err, viewlist) {
    if (err) {
      console.log("Error : getallreq");
      res.send(400);
    } else {
      console.log(viewlist);
      res.send(viewlist);
    }
  });
});

app.post("/finddetail", async (req, res) => {
  const email = req.body.email;
  console.log("inside server viewdetail");
  bookarea.find({ email }, function(err, viewlist) {
    if (err) {
      console.log("Error : finddetail");
      res.send(400);
    } else {
      console.log(viewlist);
      res.send(viewlist);
    }
  });
  var emailregister = false;
});

app.post("/editarea", async (req, res) => {
  const areaName = req.body.areaName;
  const reqSeat = req.body.reqSeat;
  const reqAmount = req.body.reqAmount;
  const reqDescr = req.body.reqDescr;

  console.log("inside server editarea");
  area.updateOne(
    { name: areaName },
    { $set: { total: reqSeat, description: reqAmount, amount: reqDescr } },
    async function(err) {
      if (err) {
        console.log("editarea not updated");
        res.status(500).json({
          updatebooking: false
        });
      } else {
        console.log("editarea updated");
        res.json({ update: true });
      }
    }
  );
});

app.post("/finddetailbyarea", async (req, res) => {
  const area = req.body.area;
  console.log("inside server finddetailbyarea");
  bookarea.find({ areaname: area }, function(err, viewlist) {
    if (err) {
      console.log("Error : finddetailbyarea");
      res.send(400);
    } else {
      console.log("My area list" + viewlist);
      res.json({ myView: viewlist });
    }
  });
  var emailregister = false;
  //console.log("In server");
  // if (resp) {
  //   console.log("oh no");
  //   res.status(200).json({
  //     datafind: true,
  //     data: resp
  //   });
  // } else {
  //   res.status(200).json({
  //     datafind: false
  //   });
  // }
});

app.post("/editdetail", async (req, res) => {
  const email = req.body.editemail;
  const id = req.body.editid;
  const seat = req.body.editseat;
  const month = req.body.editmonth;
  const oldSeat = req.body.oldSeat;
  const areaName = req.body.areaName;
  console.log("inside server editdetail");
  var l = await bookarea.findOne({ _id: id });
  var k = l.areaname;

  var areadetail = await area.findOne({ name: k });
  var oprice = areadetail.amount;
  const nprice = Number(month) * Number(seat) * Number(oprice);

  await bookarea.updateOne(
    { _id: id, email: email },
    { $set: { seat: seat, duration: month, price: nprice } },
    async function(err) {
      if (err) {
        console.log("booking not updated");
        res.status(500).json({
          updatebooking: false
        });
      } else {
        console.log("booking updated");
        var g = await bookarea.findOne({ _id: id });
        var a = g.areaname;
        console.log(a);
        var datadetail = await area.findOne({ name: a });
        oseat = datadetail.reserved;
        if (oldSeat > seat) {
          var nseat = Number(oseat) + Number(seat);
        } else {
          var nseat = oseat - seat;
        }
        const up = await area.updateOne(
          { name: a },
          { $set: { reserved: nseat } }
        );
        if (up) {
          console.log("in edit detail successfully update reserved");
        } else {
          console.log("in edit detail not update reserved");
        }
        // // , { reserved: 1, _id: 0 }
        // console.log("data--->." + data);
        // var newSeat = data.reserved;
        // newSeat = Number(newSeat) + Number(seat) - Number(oldSeat);
        // console.log("New Seat-->" + newSeat + "  id:" + id);
        // const resChange = await area.updateOne(
        //   { _id: id },
        //   { $set: { reserved: newSeat } }
        // );
        // if (resChange) {
        //   console.log(resChange);
        // } else {
        //   console.log("Not updated");
        // }
        res.status(200).json({
          updatebooking: true
        });
      }
    }
  );
});

app.listen(8000, () => console.log("server is listening at 8000"));
