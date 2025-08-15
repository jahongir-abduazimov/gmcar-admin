import React, { useState } from "react";
import { Upload, Button, Popconfirm } from "antd";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import request from "../../components/config";
import { useNotification } from "../../components/ui/Notification";

const CarImagesSection = ({ carImages, setCarImages }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { openNotification } = useNotification();

  const handleRemove = async (file) => {
    try {
      // Agar bu rasm serverdan kelgan bo'lsa, backenddan ham o‘chir
      if (file.uid && !file.originFileObj) {
        await request.delete(`/admin/car_media/${file.uid}/delete/`);
        openNotification("success", "Изображение удалено!");
      }
      // Frontend state’dan olib tashlash
      setCarImages((prev) => prev.filter((img) => img.uid !== file.uid));
    } catch (err) {
      console.error(err);
      openNotification("error", "Ошибка при удалении изображения");
    }
    return true;
  };

  return (
    <div className="mt-5 w-[60%] border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border rounded-lg flex items-center justify-between p-3"
      >
        <span className="text-lg font-medium">Изображения автомобилей</span>
        <DownOutlined className="text-lg" />
      </button>
      {isOpen && (
        <div className="px-5 py-3">
          <Upload
            multiple
            listType="picture-card"
            beforeUpload={() => false}
            fileList={carImages}
            onChange={({ fileList }) => setCarImages(fileList)}
            onRemove={handleRemove}
          >
            <PlusOutlined />
          </Upload>
        </div>
      )}
    </div>
  );
};

export default CarImagesSection;
