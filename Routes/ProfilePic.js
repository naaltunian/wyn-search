const express = require('express');
const router = express.Router();
const formidable = require('formidable');
var AWS = require('aws-sdk');
const fs = require('fs');
const User = require('../Models/User');
require('dotenv').config();

async function uploadPhoto(photo, user) {
    let photoBuffer = fs.readFileSync(photo.path)
    const s3 = new AWS.S3({
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    });
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: user.name + photo.name,
        Body: photoBuffer
    };
    await s3.upload(params, function(err, data) {
        if(err) throw err;
        user.photoUrl = data.Location;
        user.save();
    });
}

router.post("/upload/profile-pic/:id", async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) throw new Error("User not found");
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
          return res.status(400).json({
            error: "Photo could not be uploaded"
          })
        }
        if(files.photo) {
            uploadPhoto(files.photo, user);
        }
      })
})

module.exports = router;