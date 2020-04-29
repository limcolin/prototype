if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const mongoose = require("mongoose");
const express = require("express");
const path = require('path')
const bodyParser = require("body-parser");
const logger = require("morgan");
const Request = require("./request");
const Booking = require("./booking");
const Delivery = require("./delivery");
const Anchorage = require("./anchorage");
const Arrival = require("./arrival");
const User = require("./user");
const Role = require("./role");
const seedData = require("./data/seedData");
const seedAnchorages = require("./data/seedAnchorages");
const https = require('https');
const axios = require('axios');

const PORT = process.env.PORT || 3001
const app = express();
const router = express.Router();

const verifySignUp = require("./middleware/verifySignUp")
const authController = require("./controllers/auth");
const authJwt = require("./middleware/authJwt");
const userController = require("./controllers/user");

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
let db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(logger("dev"));

app.use(express.static(path.join(__dirname, '../client/build')));

app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
router.post(
  "/auth/signup",
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
  ],
  authController.signup
);
router.post("/auth/signin", authController.signin);
router.get("/user/test/all", userController.allAccess);

router.get("/user/test/user", [authJwt.verifyToken], userController.userBoard);

router.get(
  "/user/test/mod",
  [authJwt.verifyToken, authJwt.isModerator],
  userController.moderatorBoard
);

router.get(
  "/user/test/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  userController.adminBoard
);

router.get(
  "/user/bookings",
  [authJwt.verifyToken],
  (req, res) => {
    console.log(res.locals.userId)
    Booking.find({ user: res.locals.userId }, (err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  }
);

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname+'../client/build/index.html'));
});

router.get("/getDeliveries", (req, res) => {
  Delivery.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get("/getArrivals", (req, res) => {
    axios.all([getMswArrivals(), getPltArrivals()])
    .then(axios.spread((mswArrivals, pltArrivals) => {
      const mswArrivalsData = mswArrivals.data.map(mswArrival => {
        return {
          ...mswArrival,
          terminalName: "Marina South Wharves"
        }
      })
      const pltArrivalsData = pltArrivals.data.map(pltArrival => {
        return {
          ...pltArrival,
          terminalName: "Penjuru Lighter Terminal"
        }
      })
      const arrivalsData = mswArrivalsData.concat(pltArrivalsData)

      return res.json({ success: true, data: arrivalsData });
    })).catch(error => {
      return res.json({ success: false, error: error });
    });
});
router.get("/getAllArrivals", (req, res) => {
  Arrival.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get("/getBookings", (req, res) => {
  Booking.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});
router.post("/updateBooking", (req, res) => {
  const { id, update } = req.body;
  Booking.findByIdAndUpdate(id, update, (err, result) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.get("/getAnchorages", (req, res) => {
  Anchorage.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.post("/updateRequest", (req, res) => {
  const { id, update } = req.body;
  Request.findByIdAndUpdate(id, update, (err, result) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.delete("/deleteBooking", (req, res) => {
  const { id } = req.body;
  Booking.findByIdAndRemove(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

router.post("/postBooking", (req, res) => {
  let booking = new Booking();

  const { id, user, price, terminalName, craneNumber, lighterName, lighterId, lighterCompany, arrivedDate, arrivedTime, anchorage, totalPallets, loadTime, completed, completedTime, destinations } = req.body;

  // TODO: VALIDATION
  /*if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }*/
  booking.id = id;
  booking.user = user;
  booking.price = price;
  booking.terminalName = terminalName;
  booking.craneNumber = craneNumber;
  booking.lighterName = lighterName;
  booking.lighterId = lighterId;
  booking.lighterCompany = lighterCompany;
  booking.arrivedDate = arrivedDate;
  booking.arrivedTime = arrivedTime;
  booking.totalPallets = totalPallets;
  booking.loadTime = loadTime;
  booking.completed = completed;
  booking.completedTime = completedTime;
  booking.destinations = destinations;
  booking.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, booking: booking });
  });
});

router.get("/getVessels", (req, res) => {
  const path = encodeURI('/v1/vessel/duetodepart/date/2020-03-31 10:46:00/hours/1');
  const options = {
    host: 'sg-mdh-api.mpa.gov.sg',
    path: path,
    headers: {
      apikey: process.env.MPA_API_KEY
    }
  }

  https.get(options, (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      console.log(chunk);
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log("###########DATA############")
      console.log(data)
      console.log("###########PARSED DATA############")
      console.log(JSON.parse(data));
      console.log("###########RESP.DATA############")
      console.log(resp.data)
      console.log("###########END############")
      return res.json({ success: true, data: data });
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
    return JSON.parse(err);
  });
});

function getVesselParticulars(name) {
  const url = encodeURI(`/v1/vessel/particulars/vesselname/${name}`);
  const options = {
    method: 'get',
    baseURL: process.env.MPA_API_HOST_URI,
    url: url,
    headers: {
      apikey: process.env.MPA_API_KEY
    }
  }
  return axios(options);
}
function getVesselPosition(name) {
  const url = encodeURI(`/v1/vessel/positions/vesselname/${name}`);
  const options = {
    method: 'get',
    baseURL: process.env.MPA_API_HOST_URI,
    url: url,
    headers: {
      apikey: process.env.MPA_API_KEY
    }
  }
  return axios(options);
}
function getVesselMovements(name) {
  const url = encodeURI(`/v1/vessel/movements/vesselname/${name}`);
  const options = {
    method: 'get',
    baseURL: process.env.MPA_API_HOST_URI,
    url: url,
    headers: {
      apikey: process.env.MPA_API_KEY
    }
  }
  return axios(options);
}
router.get("/searchVessel/:name", (req, res) => {
  const { name } = req.params;
  getVesselParticulars(name).then(response => {
    return res.json({ success: true, data: response.data })
  }).catch(error => {
    return res.json({ success: false, error: error })
  })
  /*axios.all([getVesselParticulars(name), getVesselPosition(name), getVesselMovements(name)])
  .then(axios.spread((particulars, position, movements) => {
    const data = [particulars.data, position.data, movements.data];

    return res.json({ success: true, data: data });
  })).catch(error => {
    return res.json({ success: false, error: error  });
  });*/

});

// ADMIN ROUTES
router.get("/dropArrivals", (req, res) => {
  Arrival.deleteMany({}, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});
// NOT NEEDED AND SEEDING INCORRECT DATA ANYWAY
router.get("/dropBookings", (req, res) => {
  Booking.deleteMany({}, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});
router.get("/seedBookings", (req, res) => {
  Booking.insertMany(seedData, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  })
});
router.get("/dropDeliveries", (req, res) => {
  Delivery.deleteMany({}, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});
router.get("/seedDeliveries", (req, res) => {
  Delivery.insertMany(seedData, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  })
});
router.get("/dropAnchorages", (req, res) => {
  Anchorage.deleteMany({}, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});
router.get("/seedAnchorages", (req, res) => {
  Anchorage.insertMany(seedAnchorages, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  })
});
function getMswArrivals() {
  const url = encodeURI(`/lt/get_lighter_arrival/N`);
  const options = {
    method: 'get',
    baseURL: process.env.JP_ONLINE_HOST_URI,
    url: url
  }
  return axios(options)
}
function getPltArrivals() {
  const url = encodeURI(`/lt/get_lighter_arrival/P`);
  const options = {
    method: 'get',
    baseURL: process.env.JP_ONLINE_HOST_URI,
    url: url
  }
  return axios(options)
}
if (process.env.NODE_ENV == 'production') {
  setInterval(() => {
    axios.all([getMswArrivals(), getPltArrivals()])
    .then(axios.spread((mswArrivals, pltArrivals) => {
      const mswArrivalsData = mswArrivals.data.map(mswArrival => {
        return {
          ...mswArrival,
          terminalName: "Marina South Wharves"
        }
      })
      const pltArrivalsData = pltArrivals.data.map(pltArrival => {
        return {
          ...pltArrival,
          terminalName: "Penjuru Lighter Terminal"
        }
      })
      const arrivalsData = mswArrivalsData.concat(pltArrivalsData)

      arrivalsData.forEach(item => {
        let terminalName = item.terminalName === null ? '' : item.terminalName
        let lighterName = item.lighterName === null ? '' : item.lighterName
        let lighterCompany = item.lighterCompany === null ? '' : item.lighterCompany
        let craneNumber = item.craneNumber === null ? '' : item.craneNumber
        let arrivedTime = item.arrivedTime === null ? '' : item.arrivedTime
        let id = item.id === null ? '' : item.id

        Arrival.exists({
          terminalName: terminalName,
          lighterName: lighterName,
          lighterCompany: lighterCompany,
          craneNumber: craneNumber,
          arrivedTime: arrivedTime,
          id: id
        }, (err, result) => {
          if(result === false) {
            let arrival = new Arrival();
            arrival.terminalName = terminalName
            arrival.lighterName = lighterName
            arrival.lighterCompany = lighterCompany
            arrival.craneNumber = craneNumber
            arrival.arrivedTime = arrivedTime
            arrival.id = id
            arrival.save(err => {
              console.log("ADDED")
              console.log(arrival)
              if (err) {
                console.log("ERROR")
                console.log(err)
              }
            });
          }
        })
      });
    })).catch(error => {
      console.log(error)
    });
  }, 30000);
}

app.use("/api", router);

app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));
