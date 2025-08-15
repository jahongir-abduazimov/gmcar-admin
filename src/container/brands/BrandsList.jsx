import React, { useEffect, useState } from "react";
import BrandsTable from "./BrandsTable";
import { Button } from "antd";
import request from "../../components/config";
import AddBrand from "./AddBrand";

const BrandsList = () => {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getData = async (e) => {
    if (e) {
      setIsLoading(true);
    }
    try {
      const response = await request.get("/admin/brand/list/");
      setData(response.data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  const handleAdd = () => {
    getData()
  }
  useEffect(() => {
    getData(true);
  }, []);
  return (
    <>
      <AddBrand isOpen={isOpen} handleClose={() => setIsOpen(false)} onAddCallback={handleAdd}/>
      <div className="flex items-start justify-between mb-4">
        <p className="text-[26px] font-bold">Бренды</p>
        <Button
          size="large"
          type="primary"
          htmlType="button"
          onClick={() => setIsOpen(true)}
        >
          Добавить бренд
        </Button>
      </div>
      <BrandsTable data={data} isLoading={isLoading} onDeleteCallback={handleAdd} onAddCallback={handleAdd}/>
    </>
  );
};

export default BrandsList;
