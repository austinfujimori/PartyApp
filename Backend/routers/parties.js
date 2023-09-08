const { Party } = require("../models/party");
const express = require("express");
// const { Category } = require("../models/category");
const router = require("express").Router();
const mongoose = require("mongoose");
const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");

    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

const uploadOptions = multer({ storage: storage });

//featured
router.get(`/featured/:count`, async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  const parties = await Party.find({ isFeatured: true }).populate("host").limit(count);

  if (!parties) {
    res.status(500).json({ success: false });
  }
  res.send(parties);
});

router.get(`/`, async (req, res) => {
  const partyList = await Party.find().populate("host");

  if (!partyList) {
    res.status(500).json({ success: false });
  }

  const userLat = parseFloat(req.query.userLat); // User's latitude
  const userLon = parseFloat(req.query.userLon); // User's longitude

  // Calculate distances and add them to party objects
  partyList.forEach((party) => {
    const partyLat = parseFloat(party.latitude);
    const partyLon = parseFloat(party.longitude);
    const distance = calculateDistance(userLat, userLon, partyLat, partyLon);
    party.distance = distance; // Add distance to party object
  });

  // Sort parties based on distance
  partyList.sort((a, b) => a.distance - b.distance);

  res.send(partyList);
});

router.get(`/:id`, async (req, res) => {
  const party = await Party.findById(req.params.id).populate("host");

  if (!party) {
    res.status(500).json({ success: false });
  }
  res.send(party);
});

router.post(`/`, uploadOptions.single("image"), async (req, res) => {
  // const category = await Category.findById(req.body.category);
  // if (!category) return res.status(400).send("invalid categry");

  // const fileName = req.file.fileName
  // const basePath = `${req.protocol}://${req.get("host")}/public/upload/`

  const file = req.file;
  if (!file) return res.status(400).send("No image in the request");

  const fileName = file.filename;
  const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

  const party = new Party({
    host: req.body.host,
    image: `${basePath}${fileName}`,
    description: req.body.description,
    address: req.body.address,
    price: req.body.price,
    // category: req.body.category,
    capacity: req.body.capacity,
    isFeatured: req.body.isFeatured,
    dateCreated: req.body.dateCreated,
    dateOf: req.body.dateOf,
    memberCount: req.body.memberCount,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
  });

  _party = await party.save();
  //or replace _party with party
  if (!_party) return res.status(500).send("party cannot be created");

  res.send(_party);
});

router.delete("/:id", (req, res) => {
  Party.findByIdAndRemove(req.params.id)
    .then((party) => {
      if (party) {
        return res
          .status(200)
          .json({ success: true, message: "the party is deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "party not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

//gets total number of parties
router.get(`/get/count`, async (req, res) => {
  const partyCount = await Party.countDocuments((count) => count).clone();

  if (!partyCount) {
    res.status(500).json({ success: false });
  }
  res.send({
    pcount: partyCount,
  });
});


router.put(
  "/gallery-images/:id",
  uploadOptions.array("images", 20),
  async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid Party Id");
    }
    const files = req.files;
    let imagesPaths = [];
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

    if (files) {
      files.map((file) => {
        imagesPaths.push(`${basePath}${file.filename}`);
      });
    }

    const party = await Party.findByIdAndUpdate(
      req.params.id,
      {
        images: imagesPaths,
      },
      { new: true }
    );

    if (!party) return res.status(500).send("the gallery cannot be updated!");

    res.send(party);
  }
);

//new
router.put("/:id", uploadOptions.single("image"), async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product Id");
  }

  const party = await Party.findById(req.params.id);
  if (!party) return res.status(400).send("Invalid party!");

  const file = req.file;
  let imagepath;

  if (file) {
    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    imagepath = `${basePath}${fileName}`;
  } else {
    imagepath = party.image;
  }

  const updatedParty = await Party.findByIdAndUpdate(
    req.params.id,
    {
      host: req.body.host,
      image: imagepath,
      description: req.body.description,
      address: req.body.address,
      price: req.body.price,
      capacity: req.body.capacity,
      isFeatured: req.body.isFeatured,
      dateCreated: req.body.dateCreated,
      dateOf: req.body.dateOf,
      memberCount: req.body.memberCount,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
    },
    { new: true }
  );

  if (!updatedParty)
    return res.status(500).send("the party cannot be updated!").end();

  res.send(updatedParty).end();
});

// router.put("/:id", uploadOptions.single("image"), async (req, res) => {
//   if (!mongoose.isValidObjectId(req.params.id)) {
//     return res.status(400).send("Invalid Party Id");
//   }
//   // const category = await Category.findById(req.body.category);
//   // if (!category) return res.status(400).send("Invalid Category");
//   const file = req.file;

//   const party = await Party.findById(req.params.id);
//   if (!party) return res.status(400).send("Invalid Party!");

//   let imagepath;

//   if (file) {
//     const fileName = file.filename;
//     const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
//     imagepath = `${basePath}${fileName}`;
//   } else {
//     imagepath = party.image;
//   }

//   const updatedParty = await Party.findByIdAndUpdate(
//     req.params.id,
//     {
//       host: req.body.host,
//       image: imagepath,
//       description: req.body.description,
//       address: req.body.address,
//       price: req.body.price,
//       // category: req.body.category,
//       capacity: req.body.capacity,
//       isFeatured: req.body.isFeatured,
//       dateCreated: req.body.dateCreated,
//       dateOf: req.body.dateOf,
//       memberCount: req.body.memberCount
//     },
//     { new: true }
//   );

//   if (!updatedParty)
//     return res.status(500).send("the party cannot be updated!");

//   res.send(updatedParty);
// });

// get the party given party host
router.get(`/party/:userid`, async (req, res) => {
  const userParty = await Party.find({ host: req.params.userid }).populate(
    "host"
  );

  if (!userParty) {
    res.status(500).json({ success: false });
  }
  res.send(userParty);
});

// increase member count given party id
router.put("/memberCount/:id", async (req, res) => {
  const party = await Party.findById(req.params.id);
  party.memberCount++;
  party.save();
});

// decrease member count given party id
router.put("/decreaseMemberCount/:id", async (req, res) => {
  const party = await Party.findById(req.params.id);
  party.memberCount--;
  party.save();
});

module.exports = router;
