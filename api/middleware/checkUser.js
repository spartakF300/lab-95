const User = require('../models/User');
const checkUser = async (req, res, next) => {
    const header = req.get('Authorization');
    if (!header) {
        req.user ={role:'user'};
        return next();
    }
    const [type, token] = header.split(' ');
    if (type !== 'Token' || !token) {
        req.user ={role:'user'};
        return next()
    }
    const user = await User.findOne({token});
    if (!user) {
        req.user ={role:'user'};
        return next();
    }

    req.user = user;
    next();
};
module.exports = checkUser;