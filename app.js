const express = require('express');
const moment = require('moment');
const app = express();

app.get('/:time', (req, res) => {
  const input = req.params.time;
  const validDate = moment(input).isValid();
  let [unix, natural] = [null, null];
  if(validDate) {
    unix = moment.utc(input).unix();
    natural = moment.utc(input).format("MMMM DD, YYYY");
  }
  res.json({
    unix,
    natural
  });
});

module.exports = app;
