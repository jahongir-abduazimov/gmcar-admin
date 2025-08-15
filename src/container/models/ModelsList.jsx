import React, { useEffect, useState } from "react";
import ModelsTable from "./ModelsTable";
import { Button } from "antd";
import request from "../../components/config";
import AddModel from "./AddModel";
import { useLocation, useParams } from "react-router-dom";

const ModelsList = () => {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const brand = searchParams.get("brand");

  const getData = async (e) => {
    if (e) {
      setIsLoading(true);
    }
    try {
      const response = await request.get(`/admin/model/${id}/list/`);
      setData(response.data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  const handleAdd = () => {
    getData();
  };
  useEffect(() => {
    getData(true);
  }, []);
  return (
    <>
      <AddModel
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        onAddCallback={handleAdd}
      />
      <div className="flex items-start justify-between mb-4">
        <p className="text-[26px] font-bold">Модели {brand}</p>
        <Button
          size="large"
          type="primary"
          htmlType="button"
          onClick={() => setIsOpen(true)}
        >
          Добавить модель
        </Button>
      </div>
      <ModelsTable
        brand={brand}
        data={data}
        isLoading={isLoading}
        onDeleteCallback={handleAdd}
        onAddCallback={handleAdd}
      />
    </>
  );
};

export default ModelsList;
