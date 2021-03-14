const router = require('express').Router();
let graphEvent = require('../models/graphEvent.model');

router.route('/').get((req, res) => {
  graphEvent.find().sort({'date':1})
    .then(events => res.json(events))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const topic = req.body.topic;
  const title = req.body.title;
  const date = req.body.date;
  const event = req.body.event;
  const id = req.body.id;
  const sentence = req.body.sentence;
  const clause = req.body.clause;
  const dateText = req.body.dateText;
  const exactDate = req.body.exactDate;
  const paragraphNo = req.body.paragraphNo;
  const realDate = req.body.realDate;
  const endDate = req.body.endDate;
  const url = req.body.url;
  const nodeId = req.body.nodeId;

  const newgraphEvent = new graphEvent({
      topic,
      title,
      date,
      event,
      id,
      sentence,
      clause,
      dateText,
      exactDate,
      paragraphNo,
      realDate,
      endDate,
      url,
      nodeId
  });

  newgraphEvent.save()
    .then(() => res.json({topic,title}))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;