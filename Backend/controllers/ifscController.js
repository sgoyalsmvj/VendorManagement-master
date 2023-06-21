var axios = require('axios');

exports.getifscData = async (req, res) => {
    var config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://ifsc.razorpay.com/${req.query.ifsc}`,
    };

    await axios(config)
        .then((response) => {
            return res.status(200).json({
                ifscCode: response.data,
            });
        })
        .catch((error) => {
            return res.status(500).json({
                error: error.message,
            });
        });
}
