import prisma from "@/lib/prisma";
import { Vehicle } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

// * /api/vehicles/[id]
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string, vehicle: Vehicle }>
) {
  switch (req.method) {
    case "PUT": {
      const updated = await prisma.vehicle.update({
        where: {
          id: req.query.id as string
        },
        data: req.body.updates
      });

      return res.status(200).json({ message: 'Successfully updated vehicle', vehicle: updated })
    }

    case "DELETE": {
      const deleted = await prisma.vehicle.delete({
        where: {
          id: req.query.id as string
        }
      });

      return res.status(200).json({ message: 'Successfully deleted vehicle', vehicle: deleted })
    }
  }
}
