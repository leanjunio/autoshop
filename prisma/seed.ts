import { PrismaClient } from "@prisma/client";
import { users } from "./seed/users";
import { vehicles } from "./seed/vehicles";

const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    users.map(async (user, i) => {
      await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          ...user,
          vehicles: {
            create: vehicles[i],
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
