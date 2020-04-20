const straits = require("./seeds/straits");

let data = [];

straits.map((strait, index) => {
  strait.anchorages.map(anchorage => {
    data.push({
      "name": Object.values(anchorage)[0].name,
      "code": Object.keys(anchorage)[0],
      "description": Object.values(anchorage)[0].description,
      "coordinates": Object.values(anchorage)[0].coordinates
    })
  })
})

const seedAnchorages = data;
module.exports = seedAnchorages;
