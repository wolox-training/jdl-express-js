const logger = require('./../logger'),
  signUp = require('./../controllers/signUp');

exports.autentication = (req, res, err) => {
  const usermail = req.body.email;
  if (err) logger.log(`there has been an error: ${err}`);

  if (signUp.valid) {
    const validation = signUp.giveToken(usermail);
    res.status(200);
    res.cookie('valid-token', validation);
    res.end();
  }
};
