import { Invoice, Vehicle } from "@prisma/client";
import router from "next/router";

type InvoiceRowProps = {
  invoice: Invoice;
  vehicle: Vehicle;
};

export default function InvoiceRow({ invoice, vehicle }: InvoiceRowProps) {
  function goToInvoicePage(id: string) {
    router.push(`/invoices/${id}/edit`);
  }

  return (
    <div
      onClick={() => goToInvoicePage(invoice.id)}
      className="my-5 p-5 border rounded-md hover:cursor-pointer hover:bg-accent duration-700"
    >
      <h1 className="font-semibold">
        Invoice # {invoice.id}
      </h1>
      <div className="flex gap-x-5">
        <p><b>Vehicle:</b> {vehicle.manufacture_year} {vehicle.manufacturer} {vehicle.model} - {vehicle.plate_number}</p>
        <p><b>Total Cost:</b> ${invoice.total_cost}</p>
      </div>
    </div>
  );
}
