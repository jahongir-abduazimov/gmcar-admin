import React, { useState } from "react";
import { Button, ConfigProvider, Space, Table } from "antd";
import { EditOutlined, EnterOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import DeleteCar from "./DeleteCar";

const CarsTable = ({ data, isLoading, onDeleteCallback }) => {
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
    // {
    //   title: "Фото",
    //   dataIndex: "image",
    //   key: "image",
    //   render: (image, record) => (
    //     <div className="w-[50px] h-[50px] bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
    //       <img width={35} src={image} alt={record.name} />
    //     </div>
    //   ),
    //   width: "15%",
    // },
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
      render: (name, record) => <Link to={`/car/${record.id}`}>{name}</Link>,
      width: "25%",
    },
    {
      title: "Бренд",
      dataIndex: "brand",
      key: "brand",
      render: (brand) => brand.name,
      width: "20%",
    },
    {
      title: "Год",
      dataIndex: "year",
      key: "year",
      render: (year) => year,
      width: "20%",
    },
    {
      title: "Цена",
      dataIndex: "price",
      key: "price",
      render: (price) => price.toLocaleString() + " ₽",
      width: "20%",
    },
    {
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <DeleteCar id={record.id} onDeleteCallback={onDeleteCallback} />
        </Space>
      ),
    },
  ];
  return (
    <>
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
          pagination={typeof pagination !== "undefined" ? pagination : false}
          loading={isLoading}
          // onRow={(record) => ({
          //   onClick: () => navigate(`/car/${record.id}`),
          //   style: { cursor: "pointer" },
          // })}
        />
      </ConfigProvider>
    </>
  );
};

export default CarsTable;
