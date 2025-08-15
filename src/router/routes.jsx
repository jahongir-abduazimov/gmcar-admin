import { AppstoreOutlined } from "@ant-design/icons";
import { IoCarSportOutline } from "react-icons/io5";
import { SlBadge } from "react-icons/sl";

export const routes = [
  {
    path: "/",
    content: "Автомобили",
    icon: <IoCarSportOutline style={{ fontSize: 20 }} />,
  },
  {
    path: "/brands",
    content: "Бренды",
    icon: <SlBadge style={{ fontSize: 20 }} />,
  },
  // {
  //   content: "Баннеры",
  //   icon: <TbSlideshow style={{ fontSize: 22 }} />,
  //   children: [
  //     {
  //       path: "/banners",
  //       content: "Основные баннеры",
  //     },
  //     {
  //       path: "/advertising-banner",
  //       content: "Рекламный баннер",
  //     },
  //   ],
  // },
];
