import { hash } from "../../src/utils/hash";

export const users = [
  {
    email: "tom@autoshop.com",
    name: "Tom Roberts",
    passwordHash: hash("password"),
  },
  {
    email: "adam@autoshop.com",
    name: "Adam Page",
    passwordHash: hash("password"),
  },
  {
    email: "mark@autoshop.com",
    name: "Mark Stevens",
    passwordHash: hash("password"),
  },
];
