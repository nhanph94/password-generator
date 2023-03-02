const strengthPointRegex = {
  strong: new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  ),
  medium: new RegExp(
    "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
  ),
};

export const passwordStrengthChecker = (pwd: string) => {
  let strength = 0;

  // check password langth
  if (pwd.length > 7) strength += 1;

  // Check medium password
  if (strengthPointRegex.medium.test(pwd)) strength += 1;

  // check strong password
  if (strengthPointRegex.strong.test(pwd)) strength += 1;

  return strength;
};
