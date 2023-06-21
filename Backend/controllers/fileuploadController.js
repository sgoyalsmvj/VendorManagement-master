const fs = require('fs');

exports.fileupload = function (req, res) {
  try {
    const filedata = fs.readFileSync(req.file.path);
    const path = req.file.path;
    return res.status(200).json({
      success: true,
      result: {
        name: req.file.filename,
        path: path,
        data: filedata,
      },
      message: 'File Upload Successfull!',
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      result: error.message,
      message: 'File Not Supported!',
    });
  }
};
