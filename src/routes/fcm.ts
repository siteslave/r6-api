import * as express from 'express';
const gcm = require('node-gcm');

const router = express.Router();

const serverKey = process.env.FCM_SERVER_KEY;
const sender = new gcm.Sender(serverKey);

router.get('/gcm', (req, res, next) => {
  let tokenDevice = "ckN66NQqOXE:APA91bFB5T6VZz89eG4Tqh0QRV9olcmjiJsZhovRbde4h-dBoAeELfwku858GKTpr58AHLYH57E_VD2-H4U9DF9ByqthHD3JcFeRPWPB5RkHa3AA_qj2Le6VdBgWj4uxDoklre3T2B-9"
  var message = new gcm.Message({
    priority: 'high',
    contentAvailable: true,
    delayWhileIdle: true,
    timeToLive: 3,
    dryRun: true,
    data: {
      key1: 'message1',
      key2: 'message2'
    },
    notification: {
      title: "Hello, World",
      icon: "ic_launcher",
      body: "This is a notification that will be displayed if your app is in the background."
    }
  });

  var registrationTokens = [];
  registrationTokens.push(tokenDevice);

  sender.send(message, { registrationTokens: registrationTokens }, function (err, response) {
    if (err) console.error(err);
    else console.log(response);
  });
});

export default router;