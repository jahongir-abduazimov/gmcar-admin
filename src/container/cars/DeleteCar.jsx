import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import request from "../../components/config";
import { useNotification } from "../../components/ui/Notification";

const DeleteCar = ({ id, onDeleteCallback }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { openNotification } = useNotification();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await request.delete(`/admin/car/${id}/delete/`);
      onDeleteCallback();
      setIsModalOpen(false);
      openNotification("success", "Удален успешно!");
    } catch (error) {
      openNotification("error", "Произошла ошибка!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        type="text"
        size="large"
        icon={<DeleteOutlined style={{ fontSize: 20 }} />}
        onClick={showModal}
      />
      <Modal
        title={
          <span className="text-lg font-medium">
            Вы хотите удалить эту машину?
          </span>
        }
        closeIcon={false}
        style={{ maxWidth: 350 }}
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}
        centered
      >
        <div className="flex items-center justify-end mt-7 gap-3">
          <Button size="large" onClick={handleCancel}>
            Нет
          </Button>
          <Button
            onClick={handleDelete}
            iconPosition="end"
            loading={isLoading}
            size="large"
            type="primary"
          >
            Да
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default DeleteCar;
