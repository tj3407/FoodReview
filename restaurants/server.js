// Express
const express = require('express');
const app = express();

// Path
const path = require('path');

// Static Directory
app.use(express.static(path.join(__dirname,'/dist')));

// Body Parser
const parser = require('body-parser');
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

// - - - - = = = = Model = = = = - - - -
const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restaurant-api');
mongoose.connection.on('connected', () => console.log('connected to MongoDB'));
mongoose.Promise = global.Promise;
const { Schema } = mongoose;
const reviewSchema = new Schema({
  name: {
    type: String,
    minlength: [3, "Reviewer name must be at least 3 characters"],
    trim: true,
    required: [true, "Reviewer name is required"],
  },
  star: {
    type: Number,
    min: 1,
    max: 5,
    trim: true,
    required: [true, "Rating is required"],
  },
  message: {
    type: String,
    minlength: [3, "Review must be at least 3 characters"],
    trim: true,
    required: [true, "Review is required"],
  }

}, { timestamps: true})

const restaurantSchema = new Schema({
  name: {
    type: String,
    minlength: [3, "Restaurant name must be at least 3 characters"],
    trim: true,
    unique: true,
    required: [true, "Restaurant name is required"],
  },
  cuisine: {
    type: String,
    minlength: [3, "Cuisine type must be at least 3 characters"],
    trim: true,
    required: [true, "Cuisine type is required"],
  },
  reviews: [reviewSchema]
}, { timestamps: true})

restaurantSchema.plugin(uniqueValidator, { message: '{PATH} must be unique.' });
const Restaurant = mongoose.model('Restaurant', restaurantSchema);
const Review = mongoose.model('Review', reviewSchema);

// - - - - = = = = Controller = = = = - - - -
const restaurantController = {
  index: (request, response) => {
    Restaurant.find({})
    .then(restaurants => response.json(restaurants))
    .catch(error => console.log(error));
  },
  show: (request, response) => {
    Restaurant.findById(request.params.id)
    .then(restaurant => response.json(restaurant))
    .catch(error => console.log(error));
  },
  create: (request, response) => {
    Restaurant.create(request.body)
    .then(restaurant => response.json(restaurant))
    .catch(error => response.json(error));
  },
  update: (request, response) => {
    Restaurant.findByIdAndUpdate(request.params.id, request.body, { new: true })
    .then(restaurant => response.json(restaurant))
    .catch(error => console.log(error));
  },
  addReview: (request, response) => {
    Review.create(request.body, function(err, data){
      if(err){
        console.log(err)
        response.json(err)
      }
      else {
        Restaurant.findOneAndUpdate({_id: request.params.id}, {$push: {reviews: request.body}})
          .then(restaurant => response.json(restaurant))
          .catch(error => response.json(error))
      }
    })
  },
  destroy: (request, response) => {
    Restaurant.findByIdAndRemove(request.params.id)
    .then(restaurant => response.json(restaurant))
    .catch(error => console.log(error));
  }
};
// - - - - = = = = Routes = = = = - - - -
app
.get('/restaurants', restaurantController.index)
.post('/restaurants/new', restaurantController.create)
.get('/restaurants/:id', restaurantController.show)
.post('/restaurants/review/:id', restaurantController.addReview)
.delete('/restaurants/:id', restaurantController.destroy)
.put('/restaurants/:id', restaurantController.update)
.all("*", (req,res,next) => {
  res.sendFile(path.resolve("dist/index.html"))
});



// - - - - = = = = Server Listener = = = = - - - -
const port = 8000;
app.listen(port, ()=> console.log(`Express server listening on port ${port}`));
