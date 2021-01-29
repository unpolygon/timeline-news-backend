const router = require('express').Router();
let eventCard = require('../models/eventCard.model');

router.route('/').get((req, res) => {
  eventCard.find().sort({'publish_date':1})
    .then(event => res.json(event))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const topic = req.body.topic;
  const title = req.body.title;
  const publish_date = req.body.publish_date;
  const url = req.body.url;
  const ners = req.body.ners;

  const newEventCard = new eventCard({
      topic,
      title,
      publish_date,
      url,
      ners
  });

  newEventCard.save()
    .then(() => res.json(topic))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;