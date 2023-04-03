import prisma from "@/lib/prisma";
import { Invoice } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

// * /api/invoices/:id
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string, invoice: Invoice }>
) {
  switch (req.method) {
    case "PUT": {
      const updated = await prisma.invoice.update({
        where: {
          id: req.query.id as string
        },
        data: req.body.invoice
      });

      return res.status(200).json({ message: 'Successfully updated invoice', invoice: updated })
    }
  }
}
