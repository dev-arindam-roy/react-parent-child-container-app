export const getRandomString = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const randomLength = Math.floor(Math.random() * 3) + 4; // Random length between 4 and 6
  let result = "";
  for (let i = 0; i < randomLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return capitalizeFirstChar(result);
};

export const capitalizeFirstChar = (str) => {
  if (!str) return ""; // Handle empty strings
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getRandomPhoneNumber = () => {
  const firstDigit = Math.floor(Math.random() * 9) + 1; // Ensures the first digit is between 1 and 9
  const remainingDigits = Math.floor(Math.random() * 1_000_000_000)
    .toString()
    .padStart(9, "0"); // Generates a 9-digit string
  return `${firstDigit}${remainingDigits}`;
};

export const maskString = (str) => {
  if (str.length <= 8) {
    return str;
  }
  const firstPart = str.slice(0, 4);
  const lastPart = str.slice(-4);
  const masked = `${firstPart}-****-${lastPart}`;
  return masked;
};
