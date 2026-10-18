const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3030;

app.use(cors());
app.use(require('body-parser').urlencoded({ extended: false }));
app.use(express.json());

const path = require('path');
const reviewsPath = fs.existsSync(path.join(__dirname, "reviews.json"))
  ? path.join(__dirname, "reviews.json")
  : path.join(__dirname, "data", "reviews.json");
const dealershipsPath = fs.existsSync(path.join(__dirname, "dealerships.json"))
  ? path.join(__dirname, "dealerships.json")
  : path.join(__dirname, "data", "dealerships.json");

const reviews_data = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
const dealerships_data = JSON.parse(fs.readFileSync(dealershipsPath, 'utf8'));

let isMongoConnected = false;
const mongoUrl = process.env.MONGO_URL || "mongodb://mongo_db:27017/";

const Reviews = require('./review');
const Dealerships = require('./dealership');

mongoose.connect(mongoUrl, {
  dbName: 'dealershipsDB',
  serverSelectionTimeoutMS: 2000
}).then(() => {
  isMongoConnected = true;
  console.log("Connected to MongoDB");
  Reviews.deleteMany({}).then(() => {
    Reviews.insertMany(reviews_data['reviews']);
  }).catch(e => console.log(e.message));
  Dealerships.deleteMany({}).then(() => {
    Dealerships.insertMany(dealerships_data['dealerships']);
  }).catch(e => console.log(e.message));
}).catch(err => {
  console.log("MongoDB offline or unreachable, running with in-memory JSON data:", err.message);
  isMongoConnected = false;
});

// Express route to home
app.get('/', async (req, res) => {
  res.send("Welcome to the Mongoose API");
});

// Express route to fetch all reviews
app.get('/fetchReviews', async (req, res) => {
  try {
    if (isMongoConnected) {
      const documents = await Reviews.find();
      return res.json(documents);
    }
    return res.json(reviews_data['reviews']);
  } catch (error) {
    return res.json(reviews_data['reviews']);
  }
});

// Express route to fetch reviews by a particular dealer
app.get('/fetchReviews/dealer/:id', async (req, res) => {
  try {
    const dealerId = parseInt(req.params.id);
    if (isMongoConnected) {
      const documents = await Reviews.find({ dealership: req.params.id });
      if (documents && documents.length > 0) return res.json(documents);
    }
    const filtered = reviews_data['reviews'].filter(r => r.dealership === dealerId || r.dealership === req.params.id || String(r.dealership) === String(req.params.id));
    return res.json(filtered);
  } catch (error) {
    const dealerId = parseInt(req.params.id);
    const filtered = reviews_data['reviews'].filter(r => r.dealership === dealerId || r.dealership === req.params.id || String(r.dealership) === String(req.params.id));
    return res.json(filtered);
  }
});

// Express route to fetch all dealerships
app.get('/fetchDealers', async (req, res) => {
  try {
    if (isMongoConnected) {
      const documents = await Dealerships.find();
      return res.json(documents);
    }
    return res.json(dealerships_data['dealerships']);
  } catch (error) {
    return res.json(dealerships_data['dealerships']);
  }
});

// Express route to fetch Dealers by a particular state
app.get('/fetchDealers/:state', async (req, res) => {
  try {
    const stateParam = req.params.state;
    if (isMongoConnected) {
      const documents = await Dealerships.find({
        $or: [
          { state: { $regex: new RegExp(`^${stateParam}$`, 'i') } },
          { st: { $regex: new RegExp(`^${stateParam}$`, 'i') } }
        ]
      });
      if (documents && documents.length > 0) return res.json(documents);
    }
    const filtered = dealerships_data['dealerships'].filter(d =>
      d.state.toLowerCase() === stateParam.toLowerCase() ||
      d.st.toLowerCase() === stateParam.toLowerCase()
    );
    return res.json(filtered);
  } catch (error) {
    const stateParam = req.params.state;
    const filtered = dealerships_data['dealerships'].filter(d =>
      d.state.toLowerCase() === stateParam.toLowerCase() ||
      d.st.toLowerCase() === stateParam.toLowerCase()
    );
    return res.json(filtered);
  }
});

// Express route to fetch dealer by a particular id
app.get('/fetchDealer/:id', async (req, res) => {
  try {
    const dealerId = parseInt(req.params.id);
    if (isMongoConnected) {
      const documents = await Dealerships.find({ id: dealerId });
      if (documents && documents.length > 0) return res.json(documents);
    }
    const filtered = dealerships_data['dealerships'].filter(d => d.id === dealerId);
    return res.json(filtered);
  } catch (error) {
    const dealerId = parseInt(req.params.id);
    const filtered = dealerships_data['dealerships'].filter(d => d.id === dealerId);
    return res.json(filtered);
  }
});

// Express route to insert review
app.post('/insert_review', express.raw({ type: '*/*' }), async (req, res) => {
  try {
    let data = req.body;
    if (typeof data === 'string' || Buffer.isBuffer(data)) {
      data = JSON.parse(data.toString());
    }
    let new_id = reviews_data['reviews'].length > 0
      ? Math.max(...reviews_data['reviews'].map(r => r.id || 0)) + 1
      : 1;

    const reviewObj = {
      "id": new_id,
      "name": data['name'],
      "dealership": parseInt(data['dealership']),
      "review": data['review'],
      "purchase": data['purchase'],
      "purchase_date": data['purchase_date'],
      "car_make": data['car_make'],
      "car_model": data['car_model'],
      "car_year": data['car_year'],
    };

    reviews_data['reviews'].push(reviewObj);
    try {
      fs.writeFileSync("reviews.json", JSON.stringify(reviews_data, null, 2));
    } catch (e) {
      // Local write non-critical
    }

    if (isMongoConnected) {
      try {
        const review = new Reviews(reviewObj);
        const savedReview = await review.save();
        return res.json(savedReview);
      } catch (e) {
        console.log("MongoDB save error fallback:", e.message);
      }
    }
    return res.json(reviewObj);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error inserting review' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
