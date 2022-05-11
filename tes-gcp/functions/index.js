/* eslint-disable */
// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original

exports.addEvent = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const description = req.query.description;
  const category = req.query.category;
  const title = req.query.title;
  const schedule = req.query.schedule;
  const location  = req.query.location;
  

  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await admin.firestore().collection('events').add({description: description, category: category, title: title, schedule: schedule, location: location});
  // Send back a message that we've successfully written the message
  res.json({result: `Message with ID: ${writeResult.id} added.`});

});

/*
exports.getData = functions.https.onCall((data,context) =>{
  
  return new Promise((resolve, reject) => {
  
    var users = {};

    var db = admin.firestore();
    db.collection("users").get().then(snapshot => {

      snapshot.forEach(doc => {

        var key = doc.id;
        var user =  doc.data();
        user['key'] = key;

        users[key] = user;

      })

      var usersStr = JSON.stringify(users, null, '\t');
      console.log('users callback result : ' + usersStr);

      resolve(users);

    })
    .catch(reason => {
        console.log('db.collection("users").get gets err, reason: ' + reason);
        reject(reason);
    });
  });
});
*/

exports.getEvents = functions.https.onRequest((req, res) => {

  //const user = req.query.user;
  //const pswd = req.query.pswd;

  var stuff = [];
  var db = admin.firestore();
  db.collection('events').get().then(snapshot => {

      snapshot.forEach(doc => {
          var newelement = {
              "id": doc.id,
              "Data": doc.data()
          }
          
          stuff = stuff.concat(newelement);
         
      });
      res.send(stuff)
      return "";
  }).catch(reason => {
      res.send(reason)
  })
});

exports.addUser = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const description = req.query.description;
  const name = req.query.name;
  const lastname = req.query.lastname;
  const interests = req.query.interests;
  const age  = req.query.age;

  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await admin.firestore().collection('events').add({description: description, name: name, lastname: lastname, interests: interests, age: age});
  // Send back a message that we've successfully written the message
  res.json({result: `Message with ID: ${writeResult.id} added.`});

});

exports.getUsers = functions.https.onRequest((req, res) => {

  //const user = req.query.user;
  //const pswd = req.query.pswd;

  var stuff = [];
  var db = admin.firestore();
  db.collection('users').get().then(snapshot => {

      snapshot.forEach(doc => {
          var newelement = {
              "id": doc.id,
              "Data": doc.data()
          }
          
          stuff = stuff.concat(newelement);
         
      });
      res.send(stuff)
      return "";
  }).catch(reason => {
      res.send(reason)
  })
});

// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase}
