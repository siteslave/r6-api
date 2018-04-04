'use strict';

import { Jwt } from '../models/jwt';

import * as crypto from 'crypto';

import * as express from 'express';

const router = express.Router();
const jwt = new Jwt();

router.get('/', (req,res,next) => {
  res.render('index', {title: 'Express'});
});

router.get('/hello',(req,res,next) => {
  res.send({ ok: true, message: 'Hello' });
});

router.get('/hello/world',(req,res,next) => {
  res.send({ ok: true, message: 'Hello world!!!' });
});

router.get('/test', (req, res, next) => {
  let name = req.query.name;
  let version = req.query.version;

  res.send({ ok: true, name: name, version: version });
});
//   Express/1.0.0
router.get('/test/:name/:version', (req, res, next) => {
  let name = req.params.name;
  let version = req.params.version;

  res.send({ ok: true, name: name, version: version });
});

// RESTful

router.get('/members/:id', (req, res, next) => {
  res.send({ ok: true, action: 'LIST' });
});
// /member
router.post('/members', (req, res, next) => {
  let name = req.body.name;
  let version = req.body.version;

  res.send({ ok: true, action: 'SAVE', name: name, version: version });
});

router.put('/members/:id', (req, res, next) => {
  let id = req.params.id;

  let name = req.body.name;
  let version = req.body.version;

  res.send({ ok: true, action: 'UPDATE', name: name, version: version, id: id });
});
// ?id=100
router.delete('/members', (req, res, next) => {
  let id = req.query.id;
  res.send({ ok: true, action: 'DELETE', id: id });
});

router.post('/login', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  let db = req.db;

  let encPassword = crypto.createHash('md5').update(password).digest('hex')

  db('users')
    .select('id', 'username', 'fullname')
    .where('username', username)
    .where('password', encPassword)
    .then((result: any) => {
      console.log(result)
      if (result.length) {
        let playload = result[0];
        let token = jwt.sign(playload);

        res.send({ ok: true, token: token });
        
      } else {
        res.send({ ok: false, message: 'Access denied!' });
      }
    })
    .catch(error => {
      res.send({ ok: false, message: error.message });
    })

  // if (username === 'admin' && password === 'admin') {
  //   res.send({ ok: true });
  // } else {
  //   res.send({ ok: false, message: 'Access denied!' });
  // }
});

export default router;