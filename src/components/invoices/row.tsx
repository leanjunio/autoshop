import { Invoice } from "@prisma/client";
import router from "next/router";

type InvoiceRowProps = {
  invoice: Invoice;
};

export default function InvoiceRow({ invoice }: InvoiceRowProps) {
  function goToInvoicePage(id: string) {
    router.push(`/invoices/${id}/edit`);
  }

  return (
    <div
      onClick={() => goToInvoicePage(invoice.id)}
      className="my-5 p-5 border rounded-md hover:cursor-pointer hover:bg-accent duration-700"
    >
      <h1 className="font-semibold">
        Invoice # {invoice.vehicleId}
      </h1>
      <p>$ {invoice.total_cost}</p>
    </div>
  );
}
