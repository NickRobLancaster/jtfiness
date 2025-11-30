export function scrub_s3_key(key) {
  // 1) Replace disallowed characters with underscore
  // 2) Convert consecutive underscores to a single underscore
  // 3) Trim leading or trailing underscores
  return key
    .replace(/[^a-zA-Z0-9._-]/g, "_") // Step 1
    .replace(/_+/g, "_") // Step 2
    .replace(/^_+|_+$/g, ""); // Step 3
}

// Example usage:
// console.log(scrubS3Key("my/file*name?.txt"));
// Output: "my_file_name.txt"
