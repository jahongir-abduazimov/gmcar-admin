import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import Home from "../../pages/home";
import CarsPage from "../../pages/cars";
import LoginPage from "../../pages/login";
import BrandsPage from "../../pages/brands";
import ModelsPage from "../../pages/models";
import Generation from "../../pages/generation";
import AddCar from "../../pages/add-car";
import CarDetail from "../container/cars/CarDetail";

const index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />}>
          <Route index element={<CarsPage />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/models/:id" element={<ModelsPage />} />
          <Route path="/generations/:id" element={<Generation />} />
          <Route path="/add-car" element={<AddCar />} />
          <Route path="/car/:id" element={<CarDetail />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default index;
