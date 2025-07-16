import { useEffect, useState } from "react";
import API_BASE_URL from "../api/api.config";
import AdminNavbar from "../components/AdminNavbar";

const ManageCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCustomers = async () => {
      const res = await fetch(`${API_BASE_URL}/admin/customers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers(await res.json());
    };

    fetchCustomers();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="p-4 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">All Customers</h1>
        <ul className="space-y-2">
          {customers.map((c) => (
            <li key={c._id} className="border-b p-2">
              {c.name} — {c.phone}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ManageCustomers;
