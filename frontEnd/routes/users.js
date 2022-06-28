const express = require("express");
const router = express.Router();

router
    .route("/:userId/particulars")
    //Getting the personal particulars
    .get((req, res) => {
        console.log("Incoming Request to Access User " + req.params.userId + "'s Personal Particulars");
        res.send("testing");
    })
    //Posting new personal particulars
    .post((req, res) => {
        console.log("Incoming Request to Post User " + req.params.userId + "'s Personal Particulars");
        res.send("testing");
    })
    //Updating personal particulars
    .put((req, res) => {
        console.log("Incoming Request to Update User " + req.params.userId + "'s Personal Particulars");
        res.send("testing");
    })
    //Deleting personal particulars
    .delete((req, res) => {
        console.log("Incoming Request to Delete User " + req.params.userId + "'s Personal Particulars");
        res.send("testing");
    })

module.exports = router;