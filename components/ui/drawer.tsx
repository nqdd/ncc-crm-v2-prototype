
import React from "react";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function Drawer({ open, onClose, children }: DrawerProps) {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.5)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }} onClick={onClose}>
      <div style={{
        background: "#fff",
        borderRadius: 8,
        minWidth: 300,
        minHeight: 200,
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        position: "relative",
        padding: 24
      }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{
          position: "absolute",
          top: 8,
          right: 8,
          background: "none",
          border: "none",
          fontSize: 20,
          cursor: "pointer"
        }}>×</button>
        {children}
      </div>
    </div>
  );
}
