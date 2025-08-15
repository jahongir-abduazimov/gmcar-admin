import React, { useState } from "react";
import { Button, ConfigProvider, Space, Table } from "antd";
import { EditOutlined, EnterOutlined } from "@ant-design/icons";
import EditBrand from "./EditBrand";
// import AddCar from "./AddCar";
import { Link, useNavigate } from "react-router-dom";
import DeleteBrand from "./DeleteBrand";

const BrandsTable = ({ data, isLoading, onDeleteCallback, onAddCallback }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const navigate = useNavigate();
  const columns = [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => `${index + 1}.`,
      width: "5%",
      align: "center",
    },
    {
      title: "Икона",
      dataIndex: "icon",
      key: "icon",
      render: (icon, record) => (
        <div className="w-[50px] h-[50px] bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
          <img
            width={45}
            src={`https://gmcar-backend.best-change-grozniy.ru${icon}`}
            alt={record.name}
          />
        </div>
      ),
      width: "15%",
    },
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
      render: (name, record) => (
        <Link to={`/models/${record.id}?brand=${name}`}>{name}</Link>
      ),
      width: "25%",
    },
    {
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditBrand data={record} onAddCallback={onDeleteCallback} />
          <DeleteBrand id={record.id} onDeleteCallback={onDeleteCallback} />
        </Space>
      ),
    },
  ];
  return (
    <>
      {/* <AddCar
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        data={editData}
        onAddCallback={onAddCallback}
      /> */}
      <ConfigProvider
        theme={{
          token: {
            fontSize: 16,
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          loading={isLoading}
        />
      </ConfigProvider>
    </>
  );
};

export default BrandsTable;
