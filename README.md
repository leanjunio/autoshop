# Autoshop

## Getting Started

### Pre-requisites

You must first create a local postgres database of `autoshop` with a user of `autoshop` and a password of `password`.

### Seeding

`npx prisma db seed`

### Changes to Prisma Schema

If you create changes to the prisma schema, make sure to run `npx prisma db push` to sync your changes to prisma
