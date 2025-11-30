/**
 * Generate a 9-character alphanumeric code in the format "xxx-xxx-xxx"
 * Each 'x' is randomly chosen from [0-9A-Za-z].
 */
export function generate_sample_id() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const length = 9;

  // Create an array of 9 random alphanumeric characters
  const randomChars = Array.from({ length }, () => {
    return chars.charAt(Math.floor(Math.random() * chars.length));
  });

  // Split into 3 groups of 3 characters each
  const part1 = randomChars.slice(0, 3).join("");
  const part2 = randomChars.slice(3, 6).join("");
  const part3 = randomChars.slice(6, 9).join("");

  // Join with dashes
  return `${part1}-${part2}-${part3}`;
}

// Example usage:
// console.log(generate_sample_id()); // e.g. "A1b-Z9K-cG7"
