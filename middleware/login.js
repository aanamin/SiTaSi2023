// middleware untuk cek waktu Login

const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');

const SECRET_TOKEN = process.env.SECRET_TOKEN;
const verifyToken = (req, res, next) => {
    
  const token = req.headers.authorization.split(" ")[1];
    if (token) {
        jwt.verify(token, SECRET_TOKEN, (err, user) => {
          if (err) {
            return res.sendStatus(403);
          }
          console.log("okei, berhasil ", token)
          req.user = user;
          console.log(req.user);
          next();
        });
    } else {
      console.log("ada masalah, token tidak ditemukan")
      
    }
  };
   


module.exports = verifyToken