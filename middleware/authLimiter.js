const { rateLimit } = require('express-rate-limit');

const authLimiter = rateLimit({
    windowMs: 20 * 1000,
    limit:4,
    message:'Too many request, please try again later',
    standardHeaders:'draft-7',
    legacyHeaders:false
})
module.exports = authLimiter;