/**
 * Generates error response.
 *
 * @param String message
 * @return Object
 */
const generateErrMsg = function(message = "") {
    return {
        success: false,
        data: {
            message
        }
    };
};

module.exports = generateErrMsg;
