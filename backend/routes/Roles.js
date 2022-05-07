const mongoose = require('mongoose');

const db = {};
db.mongoose = mongoose;
db.ROLES = ["user", "author", "reader"];
db.role=require('../model/role')
module.exports = db;
