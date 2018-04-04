const FCM = require('fcm-node');

import * as express from 'express';

const router = express.Router();

const serverKey = process.env.FCM_SERVER_KEY;
const fcm = new FCM(serverKey);

router.get('/fcm', (req, res, next) => {
  var message = {
    to: 'registration_token',
    // collapse_key: 'your_collapse_key',

    notification: {
      title: 'Title of your push notification',
      body: 'Body of your push notification'
    },

    // data: {
    //   my_key: 'my value',
    //   my_another_key: 'my another value'
    // }

  };

  fcm.send(message, function (err, response) {
    if (err) {
      console.log("Something has gone wrong!");
    } else {
      console.log("Successfully sent with response: ", response);
    }
  });
  
});

export default router;