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
mongoose.connect('mongodb://localhost/movie-api');
mongoose.connection.on('connected', () => console.log('connected to MongoDB'));
mongoose.Promise = global.Promise;
const { Schema } = mongoose;
const movieSchema = new Schema({
  title: {
    type: String,
    minlength: [3, "Title must be at least 3 characters"],
    trim: true,
    required: [true, "Title is required"],
    unique: true
  },
  review: [{
    name: {
      type: String,
      minlength: [3, "Reviewer name must be at least 3 characters"],
      trim: true,
      required: [true, "Reviewer name is required"],
    },
    star: {
      type: String,
      trim: true,
      required: [true, "Rating is required"],
    },
    message: {
      type: String,
      minlength: [3, "Review must be at least 3 characters"],
      trim: true,
      required: [true, "Review is required"],
    }
  }]
}, { timestamps: true});

movieSchema.plugin(uniqueValidator, { message: '{PATH} must be unique.' });
const Movie = mongoose.model('Movie', movieSchema);


// - - - - = = = = Controller = = = = - - - -
const movieController = {
  index: (request, response) => {

    Movie.find({})
      .then(movies => response.json(movies))
      .catch(error => console.log(error));

  },
  show: (request, response) => {
    Movie.findById(request.params.id)
      .then(movie => response.json(movie))
      .catch(error => console.log(error));
  },
  create: (request, response) => {

    Movie.create(request.body)
      .then(movie => response.json(movie))
      .catch(error => console.log(error));

  },
  addReview: (request, response) => {
    // var query = {'_id': request.params._id}
    var newReview = request.body
    // Movie.findById(request.params.id, function (err, movie) {
    //   console.log(movie);
    //   movie.review.push(newReview);
    //   movie.save(function(err) {
    //     if(err) console.log(err);
    //   })
    //   console.log(movie);
    //   response.json(movie)
    // })

    Movie.findById(request.params.id)
      .then((movie) => {
        movie.review.push(newReview);
        movie.save(function(err) {
          if(err) console.log(err);
        })
        response.json(movie)
      })
      .catch(error => console.log(error));

  },
  destroy: (request, response) => {
    Movie.findByIdAndRemove(request.params.id)
      .then(movie => response.json(movie))
      .catch(error => console.log(error));
  },
  deleteReview: (request, response) => {
    Movie.findById(request.params.movId)
    .then((movie) => {
      for ( let i = 0; i < movie.review.length; i++ ) {
        if ( movie.review[i]._id == request.params.revId) {
          movie.review.splice(i, 1);
          movie.save(function(err) {
            if(err) console.log(err);
          })
        }
      }

      console.log(movie)
      response.json(movie)
    })
    .catch(error => console.log(error));
  }
};

// - - - - = = = = Routes = = = = - - - -
app
.get('/movies', movieController.index)
.post('/movies/new', movieController.create)
.get('/movies/:id', movieController.show)
.delete('/movies/:id', movieController.destroy)
.get('/movies/:movId/:revId', movieController.deleteReview)
.post('/movies/review/:id', movieController.addReview)
.all("*", (req,res,next) => {
  res.sendFile(path.resolve("dist/index.html"))
});

// - - - - = = = = Server Listener = = = = - - - -
const port = 8000;
app.listen(port, ()=> console.log(`Express server listening on port ${port}`));
