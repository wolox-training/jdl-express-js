const validEmail = email => {
  const emailRexEx = new RegExp('^w+@wolox+?.[a-zA-Z]{2,3}$');
  return !!emailRexEx.test(email);
};
const validPassword = password => {
  return password.lengh() === 8;
};
const hasErrors = user => {
  return !(validEmail(user.email) && validPassword(user.password));
};
