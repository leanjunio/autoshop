import { hash } from "../../src/utils/hash";

export const users = [
  {
    id: "c5c4dd15-0701-47e9-b606-8a67e234fb07",
    email: "tom@autoshop.com",
    name: "Tom Roberts",
    passwordHash: hash("passwordHash"),
  },
  {
    id: "87597ae1-7241-41ba-bafb-7f82acc1905f",
    email: "adam@autoshop.com",
    name: "Adam Page",
    passwordHash: hash("passwordHash"),
  },
  {
    id: "bf0ecb27-bc7c-467a-b26c-ab286117b593",
    email: "mark@autoshop.com",
    name: "Mark Stevens",
    passwordHash: hash("passwordHash"),
  },
];
