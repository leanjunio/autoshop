import { PrismaClient } from "@prisma/client";
import { users } from "./seed/users";
import { vehicles } from "./seed/vehicles";

const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    users.map(async (user) => {
      prisma.user.upsert({
        where: { id: user.id },
        update: {},
        create: user,
      });
    })
  );

  await Promise.all(
    vehicles.map(async (vehicle) => {
      prisma.vehicle.upsert({
        where: { id: vehicle.id },
        update: {},
        create: vehicle,
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
