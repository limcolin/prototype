const lighters = require("./seeds/lighters");
const vessels = require("./seeds/vessels");
const terminals = require("./seeds/terminals");

const seedData = lighters.map((lighter, index) => {
  return {
    "id": index,
    "lighterName": lighter.name,
    "lighterId": lighter.id,
    "terminalName": terminals[index % 2].name,
    "terminalAddress": terminals[index % 2].address,
    "terminalPhone": terminals[index % 2].phone,
    "terminalFax": terminals[index % 2].fax,
    "terminalEmail": terminals[index % 2].email,
    "terminalLat": terminals[index % 2].coordinates.latitudeDegrees,
    "terminalLng": terminals[index % 2].coordinates.longitudeDegrees,
    "berth": (index % 2) + 1,
    "mothership": vessels[index]['vesselParticulars'].vesselName,
    "anchorage": Math.ceil(Math.random() * 34),
    "timeslot": (((index - (index % 2)) / 2) * 100) + 1200,
    "pallets": Math.ceil(Math.random() * 20)
  }
});

/*[
  {
    "id": 0,
    "name": "test",
    "berth": 1,
    "mothership": "mothership",
    "timeslot": 1200,
    "pellets": 5,
    "message": "test message"
  },
  {
    "id": 1,
    "name": "test",
    "berth": 1,
    "mothership": "mothership",
    "timeslot": 1300,
    "pellets": 5,
    "message": "test message"
  },
  {
    "id": 2,
    "name": "test",
    "berth": 1,
    "mothership": "mothership",
    "timeslot": 1400,
    "pellets": 5,
    "message": "test message"
  },
  {
    "id": 3,
    "name": "test",
    "berth": 1,
    "mothership": "mothership",
    "timeslot": 1500,
    "pellets": 5,
    "message": "test message"
  },
  {
    "id": 4,
    "name": "test",
    "berth": 1,
    "mothership": "mothership",
    "timeslot": 1600,
    "pellets": 5,
    "message": "test message"
  },
  {
      "id": 5,
      "name": "test",
      "berth": 1,
      "mothership": "mothership",
      "timeslot": 1700,
      "pellets": 5,
      "message": "test message"
  },
  {
      "id": 6,
      "name": "test",
      "berth": 1,
      "mothership": "mothership",
      "timeslot": 1800,
      "pellets": 5,
      "message": "test message"
  },
  {
    "id": 7,
    "name": "test",
    "berth": 1,
    "mothership": "mothership",
    "timeslot": 1200,
    "pellets": 5,
    "message": "test message"
  },
  {
    "id": 8,
    "name": "test",
    "berth": 1,
    "mothership": "mothership",
    "timeslot": 1300,
    "pellets": 5,
    "message": "test message"
  },
  {
    "id": 9,
    "name": "test",
    "berth": 1,
    "mothership": "mothership",
    "timeslot": 1400,
    "pellets": 5,
    "message": "test message"
  },
  {
    "id": 10,
    "name": "test",
    "berth": 1,
    "mothership": "mothership",
    "timeslot": 1500,
    "pellets": 5,
    "message": "test message"
  },
  {
    "id": 11,
    "name": "test",
    "berth": 1,
    "mothership": "mothership",
    "timeslot": 1600,
    "pellets": 5,
    "message": "test message"
  },
  {
      "id": 12,
      "name": "test",
      "berth": 1,
      "mothership": "mothership",
      "timeslot": 1700,
      "pellets": 5,
      "message": "test message"
  },
  {
      "id": 13,
      "name": "test",
      "berth": 1,
      "mothership": "mothership",
      "timeslot": 1800,
      "pellets": 5,
      "message": "test message"
  }
]*/

module.exports = seedData;
