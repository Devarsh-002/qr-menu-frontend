import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastManager = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark" // ✅ Dark theme for consistency
      toastClassName="bg-white/10 backdrop-blur-md text-white border border-white/10 rounded-lg shadow-lg px-4 py-3"
      bodyClassName="text-sm font-medium"
      progressClassName="bg-gradient-to-r from-indigo-500 to-purple-500"
    />
  );
};

export default ToastManager;
