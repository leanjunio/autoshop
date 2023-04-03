import prisma from "@/lib/prisma";
import { Invoice } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

// * /api/invoices
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string, invoice: Invoice }>
) {
  switch (req.method) {
    case "POST": {
      const invoice = await prisma.invoice.create({ data: req.body.invoice });
      await prisma.vehicle.update({
        where: {
          id: req.body.vehicleId
        },
        data: {
          invoices: {
            connect: {
              id: invoice.id
            }
          }
        }
      });

      res.status(200).json({ message: 'Successfully created invoice', invoice })
    }
  }
}
