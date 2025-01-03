import { Outlet } from "react-router-dom";
import ModalForm from "./ModalForm";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import Login from "./Login";

const Admin = () => {
  const [openModal, setOpenModal] = useState(false); // Manage modal state
  const [refresh, setRefresh] = useState(false); // Trigger news refresh
  const [newToken, setNewToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setNewToken(token);
  }, [refresh]);

  const refreshNews = () => {
    setRefresh((prev) => !prev); // Trigger refresh
  };

  return (
    <>
      {newToken ? (
        <div className="flex h-screen text-black bg-white">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Navbar />
            <div className="flex-1 p-4 overflow-auto">
              <Outlet context={{ setOpenModal, refreshNews }} />
            </div>
          </div>
          {openModal && (
            <ModalForm setOpenModal={setOpenModal} refreshNews={refreshNews} />
          )}
        </div>
      ) : (
        <Login
          setNewToken={(token) => {
            setNewToken(token);
            setRefresh((prev) => !prev);
          }}
        />
      )}
    </>
  );
};

export default Admin;
