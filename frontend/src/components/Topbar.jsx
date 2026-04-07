import React from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Topbar() {
  const { user } = useAuth();
  return (
    <div
      style={{
        height: 56,
        background: "white",
        borderBottom: "1px solid #e6e6e6",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
      }}
    >
      {/* <div style={{ fontWeight: 600 }}>ScholarConnect</div> */}
      <div style={{ fontSize: 14, opacity: 0.75 }}>
        {/* {user?.name} • {user?.role} */}
      </div>
    </div>
  );
}