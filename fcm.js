const gcm = require('node-gcm');
const sender = new gcm.Sender('AAAAaD3EX0Q:APA91bHZ0nnhhkq8GsUG_-BiTnNBVRUxR6G_Fz4830zIQ557_Lkx-mrcB1ViPZkLfVIPuY3zjXvZFh3sO6fS9sQUJuZW4Au_Ddgn87_WwmrYyz87rBQb5Cf8wNObIeJa7h6anxX44bLh');

let tokenDevice = "cHPj2_HZ8Mk:APA91bHolB2RhQ1UNdQ1cKZelQDtK0-mUgCDjbxmpSGbilgETMJxA6k62tCsIWJqOYRyxgi3fMYdTuD0LMFJZcRQKwH6b3qKsos0ycvZ3-rks4mRn2tnwuOF-uPU-ArnGQ6eiaG8OK_z";
var message = new gcm.Message({
  contentAvailable: true,
  notification: {
    title: "ทดสอบ Push notification",
    body: "ทดสอบส่ง Message."
  }
});

var registrationTokens = [];
registrationTokens.push(tokenDevice);

sender.send(message, { registrationTokens: registrationTokens }, function (err, response) {
  if (err) console.error(err);
  else console.log(response);
});