const userService = require('../services/userService')
const getUserInfo = async (req, res) => {
    return userService.getUserInfo(req, res)
};
module.exports = {getUserInfo}
