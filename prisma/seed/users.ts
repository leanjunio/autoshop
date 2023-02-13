import { hash } from "../../src/utils/hash";
import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";

type FakedUser = Omit<User, "id" | "createdAt" | "updatedAt" | "passwordHash">;

function createUser(): FakedUser {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const name = `${firstName} ${lastName}`;

  const email = faker.internet
    .email(firstName, lastName, "autoshop.com")
    .toLowerCase();
  const phoneNumber = faker.phone.number();
  const yearJoined = faker.datatype.number({
    max: 2023,
    min: 1995,
  });
  const street = faker.address.streetAddress();
  const city = faker.address.cityName();
  const province = faker.address.state();
  const postal_code = faker.address.zipCode();

  return {
    name,
    email,
    phone_number: phoneNumber,
    year_joined: yearJoined,
    street,
    city,
    province,
    postal_code,
  };
}

type SeedUser = FakedUser & { passwordHash: string };

export const users: SeedUser[] = [
  {
    ...createUser(),
    passwordHash: hash("password"),
  },
  {
    ...createUser(),
    passwordHash: hash("password"),
  },
  {
    ...createUser(),
    passwordHash: hash("password"),
  },
  {
    name: "Tom Smith",
    email: "tom@autoshop.com",
    phone_number: "(647) 213-3434",
    year_joined: 2022,
    street: "100 Bremner Ave",
    city: "Toronto",
    province: "Ontario",
    postal_code: "M3H 2H3",
    passwordHash: hash("password"),
  },
];
