import AdminNavbar from "../components/AdminNavbar";

const AdminHome = () => {
  return (
    <>
      <AdminNavbar />
      <div className="p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome Admin</h1>
        <p className="text-gray-600">Use the navigation to manage restaurants and view customers.</p>
      </div>
    </>
  );
};

export default AdminHome;
