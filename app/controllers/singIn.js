function validEmail(email) {
  const emailRexEx = new RegExp('^w+@wolox+?.[a-zA-Z]{2,3}$');
  return !!emailRexEx.test(email);
}
function validPassword(password) {
  if (password.lengh() === 8) return true;
  return false;
}
function hasErrors(user) {
  if (!(validEmail(user.email) && validPassword(user.password))) {
    return true;
  }
  return false;
}
