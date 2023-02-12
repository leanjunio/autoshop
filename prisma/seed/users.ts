import { hash } from "../../src/utils/hash";
import { faker } from "@faker-js/faker";

function createUser() {
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

export const users = [
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
];
