const axios = require('axios');


class mainController{
  static async getAll (req, res) {
    axios.get('http://localhost:3001/movies')
      .then( (allMovie) => {
        axios.get('http://localhost:3002/tvSeries')
        .then( (tvSeries) => {
          res.status(200).json({movies: allMovie.data, tvSeries: tvSeries.data})
        })
        .catch( (error) => {
          console.log(error);
        })
      })
      .catch( (error) => {
        console.log(error);
      })
  }
}

module.exports = mainController