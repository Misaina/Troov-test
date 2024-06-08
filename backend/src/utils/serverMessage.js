/**
 * @param {Object} res
 * @param {Error} error
 */
const handleServerError = (res, error) => {
    console.error(error.message);
    res.status(500).json({status: 500, msg: `Server error: ${error.message}`});
};

const sendSuccessResponse = (res, msg, data) => res.status(200).json({status: 200, msg, data });

const sendErrorResponse = (res, status, msg) => res.status(status).json({status, msg });

module.exports = {
    handleServerError,
    sendSuccessResponse,
    sendErrorResponse
}