import { BasicUser } from "@/utils/types/users";
import Link from "next/link";

type UsersTableProps = {
  users: BasicUser[];
}

export default function UsersTable({ users }: UsersTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email Address</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <th>{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.phone_number}</td>
              <td>{user.email}</td>
              <td>{user.status.toLocaleLowerCase()}</td>
              <td><Link className="link" href={`/admin/user/${user.id}/edit`}>Edit User</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}