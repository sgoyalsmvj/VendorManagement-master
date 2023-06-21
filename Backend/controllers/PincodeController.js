var axios = require("axios");

exports.getPicodeData = async (req, res) => {
  var config = {
    method: "get",
    url: `http://www.postalpincode.in/api/pincode/${req.query.pincode}`,
  };

  await axios(config)
    .then((response) => {
      return res.status(200).json({
        data: response.data,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        error: error.message,
      });
    });
};