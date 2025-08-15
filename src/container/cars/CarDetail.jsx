// EditCar.jsx
import { Button, Form, Input, Select } from "antd";
import { useNotification } from "../../components/ui/Notification";
import { DownOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import request from "../../components/config";
import InteriorExterior from "../add-car/InteriorExterior";
import SeatsSection from "../add-car/SeatsSection";
import SafetySection from "../add-car/SafetySection";
import ComfortMultimediaSection from "../add-car/ComfortMultimediaSection";
import CarImagesSection from "../add-car/CarImagesSection";
import PriceCalculationSection from "../add-car/PriceCalculationSection";
import { useParams, useNavigate } from "react-router-dom";

const EditCar = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [generation, setGeneration] = useState([]);
  const [fuelType, setFuelType] = useState([]);
  const [bodyType, setBodyType] = useState([]);
  const [transmission, setTransmission] = useState([]);
  const [color, setColor] = useState([]);
  const [carImages, setCarImages] = useState([]);
  const { id } = useParams();
  const carId = id;

  // extra values
  const [interiorExteriorValues, setInteriorExteriorValues] = useState({});
  const [interiorInitial, setInteriorInitial] = useState({});
  const [seatsValues, setSeatsValues] = useState({});
  const [seatsInitial, setSeatsInitial] = useState({});
  const [safetyValues, setSafetyValues] = useState({});
  const [safetyInitial, setSafetyInitial] = useState({});
  const [comfortMultimediaValues, setComfortMultimediaValues] = useState({});
  const [multimediaInitial, setMultimediaInitial] = useState({});
  const [priceCalculationValues, setPriceCalculationValues] = useState({});
  const [pricingInitial, setPricingInitial] = useState({});

  const { openNotification } = useNotification();

  /* --- dropdownlarni olish --- */
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

  /* --- mavjud car ma’lumotni olish va ko'rsatish --- */
  const fetchCarDetail = async () => {
    try {
      const res = await request.get(`/admin/car/${carId}/`);
      const car = res.data;

      form.setFieldsValue({
        ...car,
        fuel_type: car.fuel_type?.id,
        color: car.color?.id,
        transmission: car.transmission?.id,
        body_type: car.body_type?.id,
        brand: car.brand?.id,
        model: car.model?.id,
        generation: car.generation?.id,
      });

      getModels(car.brand?.id);
      getGeneration(car.model?.id);

      const [interior, seats, safety, multimedia, pricing, media] =
        await Promise.all([
          request.get(`/admin/car_interyer/${carId}/list/`),
          request.get(`/admin/car_seats/${carId}/list/`),
          request.get(`/admin/car_safety/${carId}/list/`),
          request.get(`/admin/car_multimedia/${carId}/list/`),
          request.get(`/admin/car_pricing/${carId}/list/`),
          request.get(`/admin/car_media/${carId}/list/`),
        ]);

      setInteriorInitial(interior.data[0]);
      setSeatsInitial(seats.data[0]);
      setSafetyInitial(safety.data[0]);
      setMultimediaInitial(multimedia.data[0]);
      setPricingInitial(pricing.data[0]);

      // mavjud rasmlarni fileList formatiga o'tkazish
      const existingImages = media.data.map((img) => ({
        uid: img.id,
        name: img.media.split("/").pop(),
        status: "done",
        url: `https://gmcar-backend.best-change-grozniy.ru${img.media}`,
      }));
      setCarImages(existingImages);
    } catch (err) {
      console.error(err);
      openNotification("error", "Не удалось загрузить данные автомобиля");
    }
  };

  useEffect(() => {
    fetchDropdownData();
    if (carId) fetchCarDetail();
  }, [carId]);

  /* --- Yangilash --- */
  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      setIsLoading(true);

      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await request.patch(`/admin/car/${carId}/update/`, formData);

      // qo‘shimcha bo‘limlarni patch qilish
      if (Object.keys(interiorExteriorValues).length > 0) {
        if (interiorInitial) {
          await request.patch(
            `/admin/car_interyer/${interiorInitial.id}/update/`,
            {
              ...interiorExteriorValues,
            }
          );
        } else {
          await request.post("/admin/car_interyer/create/", {
            ...interiorExteriorValues,
            car: carId,
          });
        }
      }
      if (Object.keys(seatsValues).length > 0) {
        if (seatsInitial) {
          await request.patch(`/admin/car_seats/${seatsInitial.id}/update/`, {
            ...seatsValues,
          });
        } else {
          await request.post(`/admin/car_seats/create/`, {
            ...seatsValues,
            car: carId,
          });
        }
      }
      if (Object.keys(safetyValues).length > 0) {
        if (safetyInitial) {
          await request.patch(`/admin/car_safety/${safetyInitial.id}/update/`, {
            ...safetyValues,
          });
        } else {
          await request.post(`/admin/car_safety/create/`, {
            ...safetyValues,
            car: carId,
          });
        }
      }
      if (Object.keys(comfortMultimediaValues).length > 0) {
        if (multimediaInitial) {
          await request.patch(
            `/admin/car_multimedia/${multimediaInitial.id}/update/`,
            {
              ...comfortMultimediaValues,
            }
          );
        } else {
          await request.post(`/admin/car_multimedia/create/`, {
            ...comfortMultimediaValues,
            car: carId,
          });
        }
      }
      if (Object.keys(priceCalculationValues).length > 0) {
        if (pricingInitial) {
          await request.patch(
            `/admin/car_pricing/${pricingInitial.id}/update/`,
            {
              ...priceCalculationValues,
            }
          );
        } else {
          await request.post(`/admin/car_pricing/create/`, {
            ...priceCalculationValues,
            car: carId,
          });
        }
      }

      // rasm upload qilish (faqat yangi qo'shilganlarni)
      for (const file of carImages) {
        if (file.originFileObj) {
          const imgFormData = new FormData();
          imgFormData.append("car", carId);
          imgFormData.append("media", file.originFileObj);
          await request.post("/admin/car_media/create/", imgFormData);
        }
      }

      openNotification("success", "Автомобиль успешно обновлен!");
      navigate("/");
    } catch (e) {
      if (e?.errorFields) {
        openNotification("error", "Заполните обязательные поля.");
      } else {
        openNotification("error", "Ошибка при обновлении автомобиля.");
      }
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-start justify-between mb-4">
        <p className="text-[26px] font-bold">Редактировать автомобиль</p>
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
          onClick={handleUpdate}
        >
          Обновить
        </Button>
      </div>

      {/* rasmlar + qo'shimcha bo‘limlar */}
      <CarImagesSection carImages={carImages} setCarImages={setCarImages} />
      <InteriorExterior
        onValuesChange={setInteriorExteriorValues}
        initialValues={interiorInitial}
      />
      <SeatsSection
        onValuesChange={setSeatsValues}
        initialValues={seatsInitial}
      />
      <SafetySection
        onValuesChange={setSafetyValues}
        initialValues={safetyInitial}
      />
      <ComfortMultimediaSection
        onValuesChange={setComfortMultimediaValues}
        initialValues={multimediaInitial}
      />
      <PriceCalculationSection
        onValuesChange={setPriceCalculationValues}
        initialValues={pricingInitial}
      />
    </>
  );
};

export default EditCar;
