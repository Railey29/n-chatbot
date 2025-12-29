import bcrypt from "bcryptjs";

export async function hashPassword(
  password: string,
  saltRound: number
): Promise<string> {
  const hashed = await bcrypt.hash(password, saltRound);
  return hashed;
}

export async function comparePassword(
  password: string,
  hashed: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashed);
}
