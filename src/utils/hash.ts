import * as bcrypt from "bcrypt";

export function hash(password: string) {
  return bcrypt.hashSync(password, 10);
}

export function compare(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
