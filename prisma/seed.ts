import { randEmail, randFullName, randVehicle } from "@ngneat/falso";
import { PrismaClient } from "@prisma/client";
import vinGenerator from "vin-generator";

const prisma = new PrismaClient();

async function main() {
  const NUM_SEED_USERS = 10;

  for (let i = 0; i < NUM_SEED_USERS; ++i) {
    const email = randEmail();
    const name = randFullName();
    const vehicleModel = randVehicle();
    const vin = vinGenerator.generateVin();

    await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name,
        vehicles: {
          create: {
            model: vehicleModel,
            vin,
          },
        },
      },
    });
  }
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
