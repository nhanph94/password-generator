import { PasswordSetting } from "src/app/types";

const LETTERS = "abcdefghijklmnopqrstuvwxyz";
const NUMERIC = "0123456789";
const SYMBOL = `!@#$%^&*()_+-=`;
const AMBIGUOUS_CHARACTERS = `{}[]()/\'"\`~,;:.<>`;

export const passwordGenerator = (settings: PasswordSetting) => {
  const password = [];

  while (password.length < settings.length) {
    const entryLetter = Math.floor(LETTERS.length * Math.random());

    let letter = LETTERS.charAt(entryLetter);

    // Handle rule requirement uppercase letter
    letter =
      password.length % 2 == 0 && settings.uppercase
        ? letter.toUpperCase()
        : letter.toLowerCase();

    password.push(letter);

    if (settings.numeric) {
      const entryNumeric = Math.floor(NUMERIC.length * Math.random());

      password.push(NUMERIC.charAt(entryNumeric));
    }

    if (settings.symbol) {
      const specialCharacters = `${SYMBOL}${
        !settings.excludeAmbiguous ? AMBIGUOUS_CHARACTERS : ""
      }`;
      const entrySpecialCharacters = Math.floor(
        specialCharacters.length * Math.random()
      );

      password.push(specialCharacters.charAt(entrySpecialCharacters));
    }
  }

  return password.sort(() => 0.5 - Math.random()).join("");
};
