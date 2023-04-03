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
      console.log("reached api")
      // const vehicle = await prisma.vehicle.create({ data: req.body.vehicle });
      // await prisma.user.update({
      //   where: {
      //     id: req.body.userId
      //   },
      //   data: {
      //     vehicles: {
      //       connect: {
      //         id: vehicle.id
      //       }
      //     }
      //   }
      // });

      // res.status(200).json({ message: 'Successfully added vehicle', vehicle })
    }
  }
}
