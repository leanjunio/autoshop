import { Vehicle } from "@prisma/client";
import router from "next/router";

type VehicleRowProps = {
  vehicle: Vehicle;
};

export default function VehicleRow({ vehicle }: VehicleRowProps) {
  function goToVehiclePage(id: string) {
    router.push(`/vehicles/${id}/edit`);
  }

  return (
    <div
      onClick={() => goToVehiclePage(vehicle.id)}
      className="my-5 p-5 border rounded-md hover:cursor-pointer hover:bg-accent duration-700"
    >
      <h1 className="font-semibold">
        {vehicle.manufacture_year} {vehicle.manufacturer} {vehicle.model} - {vehicle.plate_number}
      </h1>
      <p>{vehicle.vin}</p>
    </div>
  );
}
