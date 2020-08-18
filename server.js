require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { authenticate } = require('./middleware')

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('build'));


let port = process.env.PORT;
let secret = process.env.SECRET;

const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DB,
  password: process.env.DBPASS,
  port: process.env.DBPORT,
});

function getTweets() {
  return pool.query(`
    SELECT
      tweets.id,
      tweets.message,
      tweets.created_at,
      users.name,
      users.handle,
      tweets.user_id
    FROM
      tweets
    INNER JOIN users ON
      tweets.user_id = users.id
    ORDER BY tweets.created_at DESC
  `)
  .then(({ rows }) => rows);
}

function createTweet(message, userId) {
  return pool.query(`
    INSERT INTO tweets
      (message, user_id)
    VALUES
      ($1, $2)
    RETURNING
      *
  `, [message, userId])
  .then(({ rows }) => rows[0]);
}

function deleteTweet(id, userId) {
  return pool.query(`
  DELETE FROM tweets
  WHERE tweets.id = $1
    AND user_id = $2`, [id, userId])
}

function createUser(name, handle, password) {
  console.log(name, handle, password)
  return pool.query(`
    INSERT INTO users
    (name, handle, password)
      VALUES ($1, $2, $3)
      `, [name, handle, password])
}

function getUserByHandle(handle) {
  return pool.query(`
    SELECT * FROM users WHERE handle = $1
  `, [handle])
  .then(({ rows }) => rows[0]);
}

const api = express();


api.get('/session', authenticate, function (req, res) {
 res.send({ 
   message: 'You are authenticated'
 });
});

api.post('/session', async function (req, res) {
  const { handle, password } = req.body;
  const user = await getUserByHandle(handle);
  console.log("user info: " + handle, password)
  if (!user) {
    return res.status(401).send({ error: 'Unknown user' });
  }

  if (user.password !== password) {
    return res.status(401).send({ error: 'Wrong password' });
  }

  const token = jwt.sign({
    id: user.id,
    handle: user.handle,
    name: user.name
  }, new Buffer.from(secret, 'base64'));
  res.status(200).send({token})
});

api.post('/tweets', authenticate, async function(req, res) {
  const { id } = req.user;
  const { message } = req.body;

  const newTweet = await createTweet(message, id);
  res.send(newTweet);
});

api.post('/signup', async function (req, res) {
  const { name, handle, password } = req.body;
  const newUser = await createUser(name, handle, password);
  res.send(newUser);
})

api.get('/tweets', async function (req, res) {
  const tweets = await getTweets();
  res.send(tweets);
});

api.delete('/tweets/:tweetid', authenticate, async function (req, res) {
  const { tweetid } = req.params;
  const { id } = req.user;

  await deleteTweet(tweetid, id);
  res.send()
})

app.use('/api', api);

//Listening to port
if (port == null || port === "") {
  port = 8000;
}

app.listen(port)
console.log(`Running on port ${port}`);

