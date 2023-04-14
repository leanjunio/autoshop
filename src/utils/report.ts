import { Invoice } from "@prisma/client";

export function prepareReport(invoices: Invoice[]) {
  const years = [...new Set(invoices.map((invoice) => Number(invoice.date.substring(0, 4))))];

  const report = years.map((year) => {
    const yearInvoices = invoices.filter((invoice) => Number(invoice.date.substring(0, 4)) === year);
    const total = yearInvoices.reduce((acc, invoice) => acc + invoice.total_cost, 0);

    return { year, total };
  });
  
  return report;
}