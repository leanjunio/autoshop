import { PrismaClient, Vehicle } from "@prisma/client";
import { users } from "./seed/users";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

type RandomVehicle = Omit<Vehicle, "userId" | "id">;

function createRandomVehicle(): RandomVehicle {
  return {
    plate_number: faker.random.alphaNumeric(7, {
      casing: "upper",
    }),
    manufacturer: faker.vehicle.manufacturer(),
    model: faker.vehicle.model(),
    ac: faker.datatype.boolean(),
    vin: faker.vehicle.vin(),
    body: faker.vehicle.type(),
    driver_name: faker.name.fullName(),
    purchase_year: faker.datatype.number({
      max: 2023,
      min: 1995,
    }),
    initial_cost: faker.finance.amount(20000, 70000),
    avg_yearly_cost: faker.finance.amount(1000, 4000),
    transmission_type: "Automatic",
    manufacture_year: faker.datatype.number({
      max: 2023,
      min: 1995,
    }),
    engine_size: 8,
  };
}

async function main() {
  await Promise.all(
    users.map(async (user) => {
      await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          ...user,
          vehicles: {
            create: createRandomVehicle(),
          },
        },
      });
    })
  );
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
