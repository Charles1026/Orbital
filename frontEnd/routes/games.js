const express = require("express");
const router = express.Router();
const session = require('../session');
const path = require("path");
const dbConnection = require("../database");
const bodyParser = require('body-parser');
const { userInfo } = require("os");

router.use(bodyParser.urlencoded({ extended: true }))

router
  .route("/")
    .get((req, res) => {
      res.render("games")
    })

router
  .route("/create")
    .get((req, res) => {
      console.log("Incoming Create Game Get Request");
      if (!req.cookies) {
        res.redirect('/login');
        return;
      }
      const sessionToken = req.cookies[session.sessionName];
      if(!sessionToken || !session.validateSession(sessionToken)) {
        res.redirect('/login');
        return;
      }

    })

module.exports = router