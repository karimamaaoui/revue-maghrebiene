const mongoose = require('mongoose');

const db = {};
db.mongoose = mongoose;
db.ROLES = ["admin", "author", "reader","corrector"];
db.role=require('../model/role')
module.exports = db;

