import { Button, Form, Input, Select } from "antd";
import { useNotification } from "../../components/ui/Notification";
import { DownOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import request from "../../components/config";
import InteriorExterior from "./InteriorExterior";
import SeatsSection from "./SeatsSection";
import SafetySection from "./SafetySection";
import ComfortMultimediaSection from "./ComfortMultimediaSection";
import CarImagesSection from "./CarImagesSection";
import PriceCalculationSection from "./PriceCalculationSection";

import { useNavigate } from "react-router-dom";

const AddCar = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [generation, setGeneration] = useState([]);
  const [fuelType, setFuelType] = useState([]);
  const [bodyType, setBodyType] = useState([]);
  const [transmission, setTransmission] = useState([]);
  const [color, setColor] = useState([]);
  const [interiorExteriorValues, setInteriorExteriorValues] = useState({});
  const [seatsValues, setSeatsValues] = useState({});
  const [safetyValues, setSafetyValues] = useState({});
  const [comfortMultimediaValues, setComfortMultimediaValues] = useState({});
  const [priceCalculationValues, setPriceCalculationValues] = useState({});
  const [carId, setCarId] = useState(null);
  const [carImages, setCarImages] = useState([]);

  const { openNotification } = useNotification();
  const navigate = useNavigate();

  const fetchDropdownData = async () => {
    try {
      const [brandsRes, fuelRes, bodyRes, transRes, colorRes] =
        await Promise.all([
          request.get("/admin/brand/list/"),
          request.get("/admin/fuel_type/list/"),
          request.get("/admin/body_type/list/"),
          request.get("/admin/transmission/list/"),
          request.get("/admin/color/list/"),
        ]);
      setBrands(brandsRes.data);
      setFuelType(fuelRes.data);
      const formData = new FormData();
      setBodyType(bodyRes.data);
      setTransmission(transRes.data);
      setColor(colorRes.data);
    } catch (e) {
      console.error(e);
    }
  };

  const getModels = async (id) => {
    try {
      const res = await request.get(`/admin/model/${id}/list/`);
      setModels(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const getGeneration = async (id) => {
    try {
      const res = await request.get(`/admin/generation/${id}/list/`);
      setGeneration(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const handleAdd = async () => {
    try {
      const values = await form.validateFields();
      setIsLoading(true);
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await request.post("/admin/car/create/", formData);
      setCarId(res.data.id);

      if (Object.keys(interiorExteriorValues).length > 0) {
        await request.post("/admin/car_interyer/create/", {
          ...interiorExteriorValues,
          car: res.data.id,
        });
      }
      if (Object.keys(seatsValues).length > 0) {
        await request.post("/admin/car_seats/create/", {
          ...seatsValues,
          car: res.data.id,
        });
      }
      if (Object.keys(safetyValues).length > 0) {
        await request.post("/admin/car_safety/create/", {
          ...safetyValues,
          car: res.data.id,
        });
      }
      if (Object.keys(comfortMultimediaValues).length > 0) {
        await request.post("/admin/car_multimedia/create/", {
          ...comfortMultimediaValues,
          car: res.data.id,
        });
      }
      if (Object.keys(priceCalculationValues).length > 0) {
        await request.post("/admin/car_pricing/create/", {
          ...priceCalculationValues,
          car: res.data.id,
        });
      }

      // Upload car images if any
      if (carImages.length > 0) {
        for (const file of carImages) {
          const imgFormData = new FormData();
          imgFormData.append("car", res.data.id);
          imgFormData.append("media", file.originFileObj);
          try {
            await request.post("/admin/car_media/create/", imgFormData);
          } catch (err) {
            openNotification("error", "Ошибка загрузки изображения");
          }
        }
        setCarImages([]); // tugagandan keyin tozalab qo'yamiz
      }

      openNotification("success", "Автомобиль успешно добавлен!");
      navigate("/");
    } catch (e) {
      if (e?.errorFields) {
        openNotification(
          "error",
          "Пожалуйста, заполните все обязательные поля."
        );
      } else {
        openNotification("error", "Ошибка при добавлении автомобиля.");
      }
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-start justify-between mb-4">
        <p className="text-[26px] font-bold">Добавить автомобиль</p>
      </div>
      <div className="flex items-start gap-10">
        <div className="w-[60%] border rounded-lg overflow-hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full border rounded-lg flex items-center justify-between p-3"
          >
            <span className="text-lg font-medium">Основная информация</span>
            <DownOutlined className="text-lg" />
          </button>
          {isOpen && (
            <div className="px-5 py-3">
              <Form form={form} autoComplete="off" layout="vertical">
                <Form.Item
                  label="Имя"
                  name="name"
                  rules={[{ required: true, message: "Введите имя!" }]}
                >
                  <Input size="large" />
                </Form.Item>

                <Form.Item
                  label="Бренд"
                  name="brand"
                  rules={[{ required: true, message: "Выберите бренд!" }]}
                >
                  <Select size="large" onChange={(e) => getModels(e)}>
                    {brands.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Модель"
                  name="model"
                  rules={[{ required: true, message: "Выберите модель!" }]}
                >
                  <Select size="large" onChange={(e) => getGeneration(e)}>
                    {models.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Поколение"
                  name="generation"
                  rules={[{ required: true, message: "Выберите поколение!" }]}
                >
                  <Select size="large">
                    {generation.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Тип топлива"
                  name="fuel_type"
                  rules={[{ required: true, message: "Выберите тип топлива!" }]}
                >
                  <Select size="large">
                    {fuelType.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Тип кузова"
                  name="body_type"
                  rules={[{ required: true, message: "Выберите тип кузова!" }]}
                >
                  <Select size="large">
                    {bodyType.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Трансмиссия"
                  name="transmission"
                  rules={[{ required: true, message: "Выберите трансмиссию!" }]}
                >
                  <Select size="large">
                    {transmission.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Цвет"
                  name="color"
                  rules={[{ required: true, message: "Выберите цвет!" }]}
                >
                  <Select size="large">
                    {color.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Цена"
                  name="price"
                  rules={[{ required: true, message: "Введите цену!" }]}
                >
                  <Input size="large" type="number" />
                </Form.Item>

                <Form.Item
                  label="Год"
                  name="year"
                  rules={[{ required: true, message: "Введите год!" }]}
                >
                  <Input size="large" type="number" maxLength={4} />
                </Form.Item>

                <Form.Item
                  label="Месяц"
                  name="month"
                  rules={[{ required: true, message: "Введите месяц!" }]}
                >
                  <Input size="large" type="number" maxLength={2} />
                </Form.Item>

                <Form.Item
                  label="Объем двигателя"
                  name="engine_capacity"
                  rules={[
                    { required: true, message: "Введите объем двигателя!" },
                  ]}
                >
                  <Input size="large" type="number" />
                </Form.Item>

                <Form.Item
                  label="Пробег"
                  name="miliage"
                  rules={[{ required: true, message: "Введите пробег!" }]}
                >
                  <Input size="large" type="number" />
                </Form.Item>
              </Form>
            </div>
          )}
        </div>

        <Button
          size="large"
          type="primary"
          htmlType="button"
          loading={isLoading}
          className="w-[250px]"
          onClick={handleAdd}
        >
          Добавить
        </Button>
      </div>

      <CarImagesSection carImages={carImages} setCarImages={setCarImages} />
      <InteriorExterior onValuesChange={setInteriorExteriorValues} />
      <SeatsSection onValuesChange={setSeatsValues} />
      <SafetySection onValuesChange={setSafetyValues} />
      <ComfortMultimediaSection onValuesChange={setComfortMultimediaValues} />
      <PriceCalculationSection onValuesChange={setPriceCalculationValues} />
    </>
  );
};

export default AddCar;
