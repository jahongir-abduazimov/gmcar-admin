import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import request from "../../components/config";
import { useNotification } from "../../components/ui/Notification";

const DeleteGeneration = ({ id, onDeleteCallback, isSubcategory }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const { openNotification } = useNotification();

  useEffect(() => {
    let timer;
    if (isModalOpen) {
      setButtonDisabled(true);
      setCountdown(5);
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setButtonDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isModalOpen]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await request.delete(`/admin/generation/${id}/delete/`);
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
            Вы уверены, что хотите удалить этот поколение?
          </span>
        }
        closeIcon={false}
        style={{ maxWidth: 560 }}
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}
        centered
      >
        <div>
          <p className="text-[16px]">
            <span className="text-red-500 font-medium">Внимание!</span> Если вы
            удалите это поколение, все машины, принадлежащие ему, могут быть
            удалены!
          </p>
        </div>
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
            disabled={buttonDisabled}
          >
            Да {buttonDisabled && `(${countdown})`}
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default DeleteGeneration;
