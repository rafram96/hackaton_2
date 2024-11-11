import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  return (
    <section className="dashboard-section bg-gray-100 p-4 rounded-2xl">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Bienvenido a tu Dashboard.</p>
      <button className="flex items-center bg-primary text-white font-bold py-2 px-4 rounded-full mt-4">
        <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
        Productos
      </button>
    </section>
  );
}