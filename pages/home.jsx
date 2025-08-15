import React, { useEffect } from "react";
import Layout from "../src/components/Layout";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("auth");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <Layout />
    </>
  );
};

export default Home;
