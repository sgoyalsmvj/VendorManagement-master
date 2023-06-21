const express = require("express");
const { catchErrors } = require("../handlers/errorHandlers");

const router = express.Router();

const multer = require("multer");
const path = require("path");
const { authMiddleware, authPerm } = require("./authMiddleware");

const setFilePathToBody = require("../middleware/setFilePathToBody");

const adminController = require("../controllers/adminController");
const clientController = require("../controllers/clientController");

// const leadController = require("../controllers/leadController");
const productController = require("../controllers/productController");
// const rolecontroller = require("../controllers/rolecontroller");
const vendorController = require("../controllers/vendorController");
const jobController = require("../controllers/jobController");
const fileuploadController = require("../controllers/fileuploadController");
// const pincodeController = require("../controllers/pincodeController");
const ifscController = require("../controllers/ifscController");

//__________CHECK IF REQUEST IS AUTHORIZED______________
router.use(authMiddleware);

//___________ Admin management___________

router.route("/admin/create").post((req, res, next) => authPerm('admin', 'create')(req, res, next), catchErrors(adminController.create));
router.route("/admin/read/:id").get((req, res, next) => authPerm('admin', 'view')(req, res, next), catchErrors(adminController.read));
router.route("/admin/update/:id").patch((req, res, next) => authPerm('admin', 'update')(req, res, next), catchErrors(adminController.update));
router.route("/admin/delete/:id").delete((req, res, next) => authPerm('admin', 'delete')(req, res, next), catchErrors(adminController.delete));
router.route("/admin/search").get((req, res, next) => authPerm('admin', 'view')(req, res, next), catchErrors(adminController.search));
router.route("/admin/list").get((req, res, next) => authPerm('admin', 'view')(req, res, next), catchErrors(adminController.list));

router
  .route("/admin/password-update/:id")
  .patch(catchErrors(adminController.updatePassword));
//list of admins ends here

// Get Pincode
// router.route("/pincode/").get(catchErrors(pincodeController.getPicodeData));
// router.route("/ifsc/").get(catchErrors(ifscController.getifscData));

//_____________ API for Vendors __________
router.route("/vendor/create").post((req, res, next) => authPerm('vendor', 'create')(req, res, next), catchErrors(vendorController.create));
router.route("/vendor/read/:id").get((req, res, next) => authPerm('vendor', 'view')(req, res, next), catchErrors(vendorController.read));
router.route("/vendor/update/:id").patch((req, res, next) => authPerm('vendor', 'update')(req, res, next), catchErrors(vendorController.update));
router.route("/vendor/delete/:id").delete((req, res, next) => authPerm('vendor', 'delete')(req, res, next), catchErrors(vendorController.delete));
router.route("/vendor/search").get((req, res, next) => authPerm('vendor', 'view')(req, res, next), catchErrors(vendorController.search));
router.route("/vendor/list").get((req, res, next) => authPerm('vendor', 'view')(req, res, next), catchErrors(vendorController.list));

//_____________ API for clients __________
router.route("/client/create").post((req, res, next) => authPerm('client', 'create')(req, res, next), catchErrors(clientController.create));
router.route("/client/read/:id").get((req, res, next) => authPerm('client', 'view')(req, res, next), catchErrors(clientController.read));
router.route("/client/update/:id").patch((req, res, next) => authPerm('client', 'update')(req, res, next), catchErrors(clientController.update));
router.route("/client/delete/:id").delete((req, res, next) => authPerm('client', 'delete')(req, res, next), catchErrors(clientController.delete));
router.route("/client/search").get((req, res, next) => authPerm('client', 'view')(req, res, next), catchErrors(clientController.search));
router.route("/client/list").get((req, res, next) => authPerm('client', 'view')(req, res, next), catchErrors(clientController.list));

var PhotoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/proofs/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "__Proof" + path.extname(file.originalname));
  },
});

const PhotoUpload = multer({
  storage: PhotoStorage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    //var size = parseInt(file.size);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".pdf" && ext !== ".jpeg") {
      return callback(new Error("Only PNG,JPG,JPEG,PDF are allowed"));
    }
    if (file.size > 1048576) {
      return callback(
        new Error("File is Too Big!!! Only upto 10mb Files are allowed")
      );
    }
    callback(null, true);
  },
  // limits: {
  //   fileSize: 1024 * 1024,
  // },
});

router
  .route("/files/upload")
  .post(
    [PhotoUpload.single("file"), setFilePathToBody],
    catchErrors(fileuploadController.fileupload)
  );

//_____________ API for roles __________
// router.route("/role/create").post((req, res, next) => authPerm('role', 'create')(req, res, next), catchErrors(rolecontroller.create));
// router.route("/role/read/:id").get((req, res, next) => authPerm('role', 'view')(req, res, next), catchErrors(rolecontroller.read));
// router.route("/role/update/:id").patch((req, res, next) => authPerm('role', 'update')(req, res, next), catchErrors(rolecontroller.update));
// router.route("/role/delete/:id").delete((req, res, next) => authPerm('role', 'delete')(req, res, next), catchErrors(rolecontroller.delete));
// router.route("/role/search").get((req, res, next) => authPerm('role', 'view')(req, res, next), catchErrors(rolecontroller.search));
// router.route("/role/list").get((req, res, next) => authPerm('role', 'view')(req, res, next), catchErrors(rolecontroller.list));

//_____________ API for jobs _________
router.route("/job/create").post((req, res, next) => authPerm('job', 'create')(req, res, next), catchErrors(jobController.create));
router.route("/job/read/:id").get((req, res, next) => authPerm('job', 'view')(req, res, next), catchErrors(jobController.read));
router.route("/job/update/:id").patch((req, res, next) => authPerm('job', 'update')(req, res, next), catchErrors(jobController.update));
router.route("/job/delete/:id").delete((req, res, next) => authPerm('job', 'delete')(req, res, next), catchErrors(jobController.delete));
router.route("/job/search").get((req, res, next) => authPerm('job', 'view')(req, res, next), catchErrors(jobController.search));
router.route("/job/list").get((req, res, next) => authPerm('job', 'view')(req, res, next), catchErrors(jobController.list));

//_____________ API for products _________
router.route("/product/create").post((req, res, next) => authPerm('service', 'create')(req, res, next), catchErrors(productController.create));
router.route("/product/read/:id").get((req, res, next) => authPerm('service', 'view')(req, res, next), catchErrors(productController.read));
router
  .route("/product/update/:id")
  .patch((req, res, next) => authPerm('service', 'update')(req, res, next), catchErrors(productController.update));
router
  .route("/product/delete/:id")
  .delete((req, res, next) => authPerm('service', 'delete')(req, res, next), catchErrors(productController.delete));
router.route("/product/search").get((req, res, next) => authPerm('service', 'view')(req, res, next), catchErrors(productController.search));
router.route("/product/list").get((req, res, next) => authPerm('service', 'view')(req, res, next), catchErrors(productController.list));

module.exports = router;