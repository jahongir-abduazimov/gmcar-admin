import React, { useEffect, useState } from "react";
import CarsTable from "./CarsTable";
import { Button, Pagination } from "antd";
import request from "../../components/config";
import { useNavigate, useSearchParams } from "react-router-dom";

const CarsList = () => {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const current = Number(searchParams.get("page")) || 1;

  const getData = async (e) => {
    if (e) {
      setIsLoading(true);
    }
    try {
      const response = await request.get("/admin/car/list/", {
        params: {
          page: current,
          page_size: pageSize,
        },
      });
      setData(response.data.results);
      setTotal(response.data.total || 0);
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
  }, [current, pageSize]);
  return (
    <>
      <div className="flex items-start justify-between mb-4">
        <p className="text-[26px] font-bold">Автомобили</p>
        <Button
          size="large"
          type="primary"
          htmlType="button"
          onClick={() => navigate("/add-car")}
        >
          Добавить автомобиль
        </Button>
      </div>
      <CarsTable
        data={data}
        isLoading={isLoading}
        onDeleteCallback={handleAdd}
        onAddCallback={handleAdd}
        pagination={false}
      />
      <div className="flex justify-center mt-6">
        <Pagination
          current={current}
          pageSize={pageSize}
          total={total}
          showSizeChanger
          onChange={(page, size) => {
            setSearchParams({ page: page.toString() });
            setPageSize(size);
          }}
        />
      </div>
    </>
  );
};

export default CarsList;
