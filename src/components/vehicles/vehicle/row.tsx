import { Vehicle } from "@prisma/client";

type VehicleRowProps = {
  vehicle: Vehicle;
};

export default function VehicleRow({ vehicle }: VehicleRowProps) {
  return (
    <div className="m-5 p-5 border rounded-md hover:cursor-pointer hover:bg-accent duration-700">
      <h1 className="font-semibold">{vehicle.model}</h1>
      <p>{vehicle.vin}</p>
    </div>
  );
}
