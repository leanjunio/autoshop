import { Vehicle } from "@prisma/client";
import Link from "next/link";
import { FiEdit2 } from "react-icons/fi";
import { HiOutlineDocument } from "react-icons/hi"

type VehicleRowProps = {
  vehicle: Vehicle;
};

export default function VehicleRow({ vehicle }: VehicleRowProps) {
  return (
    <div
      className="flex items-center justify-between my-5 p-5 border rounded-md"
    >
      <div>
        <h1 className="font-semibold">
          {vehicle.manufacture_year} {vehicle.manufacturer} {vehicle.model} - {vehicle.plate_number}
        </h1>
        <p>{vehicle.vin}</p>
      </div>
      <div className="flex flex-row items-center gap-x-5">
        <Link title="Edit Vehicle" href={`/vehicles/${vehicle.id}/edit`} className="btn-link">
          <FiEdit2 className="text-accent" size={18} />
        </Link>
        <Link title="View Vehicle Report" href={`/vehicles/${vehicle.id}/report`} className="btn-link">
          <HiOutlineDocument className="text-accent" size={18} />
        </Link>
      </div>
    </div>
  );
}
