import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
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
