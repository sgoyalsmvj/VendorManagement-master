// require("dotenv").config({ path: __dirname + "/../.variables.env" });
// const fs = require("fs");

// const mongoose = require("mongoose");
// mongoose.connect(process.env.DATABASE);
// mongoose.Promise = global.Promise;
// async function createAdmin() {
//   try {
//     // const Admin = require("../models/Admin");
//     var newAdmin = new Admin();
//     const passwordHash = newAdmin.generateHash("15adminvm_72");

//     await new Admin({
//       email: "admin@admin.com",
//       password: passwordHash,
//       name: "super",
//       surname: "admin",
//       rolename: "superadmin",
//       departments: ["all"]
//     }).save();
//     console.log("👍👍👍👍👍👍👍👍 Admin created : Done!");
//     process.exit();
//   } catch (e) {
//     console.log("\n👎👎👎👎👎👎👎👎 Error! The Error info is below");
//     console.log(e);
//     process.exit();
//   }
// }
// createAdmin();

