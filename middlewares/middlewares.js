
const config = require('../config/config');

module.exports = {
  isValidDomain: (req, res, next) => {
    if (config.WHITE_LIST_DOMAINS.includes(req.headers.origin || req.headers.host)) {
      return next();
    }
    return res.status(401).send({ error: 'err-invalid-origin-domain', origin: req.headers.origin || req.headers.host });
  }
};