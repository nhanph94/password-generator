const LETTERS = "abcdefghijklmnopqrstuvwxyz";
const NUMERIC = "0123456789";
const SYMBOL =
  "~,`,!,@,#,$,%,^,&,*,(,),-,_,+,=,{,},[,],|,,;,:,\",<,>,,,.,/,?,'";

export const passwordGenerator = (settings: {
  length: number;
  lowercase: boolean;
  uppercase: boolean;
  numeric: boolean;
  symbol: boolean;
}) => {
  let password = "";

  while (password.length < settings.length) {
    const entryLetter = Math.ceil(
      LETTERS.length * Math.random() * Math.random()
    );

    let letter = LETTERS.charAt(entryLetter);

    // Handle rule requirement uppercase letter
    letter =
      password.length % 2 == 0 && settings.lowercase
        ? letter.toUpperCase()
        : letter;

    password += letter;

    if (settings.numeric) {
      const entryNumeric = Math.ceil(
        NUMERIC.length * Math.random() * Math.random()
      );

      password += NUMERIC.charAt(entryNumeric);
    }

    if (settings.symbol) {
      const entrySymbol = Math.ceil(
        SYMBOL.length * Math.random() * Math.random()
      );

      password += NUMERIC.charAt(entrySymbol);
    }
  }

  password = password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");

  return password.substring(0, settings.length);
};
