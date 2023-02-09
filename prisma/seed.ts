import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = "aaron@autoshop.com";

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "Aaron Mist",
      vehicles: {
        create: {
          model: "Corolla",
          vin: "JH4DC4330RS802540",
        },
      },
    },
  });
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
