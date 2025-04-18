import bcrypt from "bcrypt";

/**
 * Hashes a password using bcrypt
 * @param password - The password to hash
 * @return Password hash - can be stored in the database
 */
export async function hashPassword(password: string) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
}

/**
 * Compares a plaintext password with a hashed password stored in the database
 * @param password - The plaintext password to compare
 * @param hash - The hashed password from the database to compare against
 * @return True if the passwords match, false otherwise
 */
export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
