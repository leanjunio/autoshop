import { Report } from "@/utils/types/report";

type ReportTableProps = {
  reports: Report[];
};

export default function ReportTable({ reports }: ReportTableProps) {
  return (
    <div className="w-full my-10">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Year</th>
            <th>Service Total</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{report.year}</td>
              <td>${report.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}