import { randEmail, randFullName, randVehicle } from "@ngneat/falso";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const NUM_SEED_USERS = 10;

  for (let i = 0; i < NUM_SEED_USERS; ++i) {
    const email = randEmail();
    const name = randFullName();
    const vehicleModel = randVehicle();

    const vins = [
      "JH4KA3269HC010561",
      "JS3TX92V364102160",
      "JH4DB1560PS003184",
      "1C4RJFAG8DC537142",
      "WBSPM9C52BE202514",
      "JH4KA4576KC031014",
      "JF1SF63501H759113",
      "JH4DA9470NS002903",
      "JT6HF10U3Y0133607",
      "1G8AN15F07Z174255",
      "JH4DB1540NS801082",
    ];

    await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name,
        vehicles: {
          create: {
            model: vehicleModel,
            vin: vins[i],
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
