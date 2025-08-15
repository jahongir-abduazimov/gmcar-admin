import React from "react";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
const LogOutModal = ({ isOpen, handleClose }) => {
  const navigate = useNavigate();
  const LogOut = () => {
    localStorage.removeItem("auth");
    handleClose();
    navigate("/login");
    window.location.reload();
  };
  return (
    <>
      <Modal
        title={
          <span className="text-lg font-medium">
            Вы хотите выйти из системы?
          </span>
        }
        closeIcon={false}
        style={{ maxWidth: 360 }}
        open={isOpen}
        footer={false}
        onCancel={handleClose}
        centered
      >
        <div className="flex items-center justify-end mt-7 gap-3">
          <Button size="large" onClick={handleClose}>
            Нет
          </Button>
          <Button size="large" type="primary" onClick={LogOut}>
            Да
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default LogOutModal;
