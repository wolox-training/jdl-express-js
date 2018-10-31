const crypt = require('bcryptjs'),
  _user = require('./../models').user;

const validEmail = email => {
  const emailRexEx = new RegExp('[a-zA-Z]+@wolox+?.[a-zA-Z]{2,3}$');
  return emailRexEx.test(email);
};
const validPassword = password => {
  return password.length === 8;
};
const hasNoErrors = user => {
  return validEmail(user.email) && validPassword(user.password);
};

const hashPassword = password => {
  return crypt.hash(password, 10);
};
const validateReq = request => {
  const { name, lastName, email, password } = request;

  request.checkBody('name', 'field Name is required').notEmpty();
  request.checkBody('lastName', 'field lastName is required').notEmpty();
  request.checkBody('email', 'field email is required').notEmpty();
  request.checkBody('password', 'field password is required').notEmpty();
};
const exist = req => {
  const usermail = req.body.email;
  const user = _user.findAll({ where: { email: usermail } });
  return user == null;
};

const sesion = req => {
  const usermail = req.body.email;
  return _user.findAll({ attributes: ['sesion'] }, { where: { email: usermail } });
};

const admUser = (req, res, err) => {};

exports.signUp = async (req, res) => {
  // validateReq(req);
  const user = req.body;
  if (hasNoErrors(user)) {
    const encryptpw = await hashPassword(user.password);
    return _user
      .create({
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        password: encryptpw,
        role: user.role,
        sesion: false
      })
      .then(created => {
        res.json(created).end();
      })
      .catch(err => {
        res.status(503);
        res.send(err);
      });
  } else
    res.send('error, Invalid data, this could either be a problem with your email or your password.').end();
};
