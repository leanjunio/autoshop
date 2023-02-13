import prisma from "@/lib/prisma";
import { Vehicle } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Vehicle>
) {
  switch (req.method) {
    case "POST":
      const { vehicle } = req.body;
      const result = await prisma.vehicle.create({
        data: vehicle,
      });

      res.json(result);
  }
}
