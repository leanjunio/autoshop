import prisma from "@/lib/prisma";
import { Invoice, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

// * /api/admin/user/:id
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string, user: User }>
) {
  switch (req.method) {
    case "PUT": {
      const updated = await prisma.user.update({
        where: {
          id: req.query.id as string
        },
        data: req.body.updates
      });

      return res.status(200).json({ message: 'Successfully updated user', user: updated })
    }
  }
}
