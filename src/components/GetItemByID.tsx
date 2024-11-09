import { useState } from "react";
import { ItemData } from "../interfaces/ItemData/ItemDataRequest";

export default function GetItem() {
  const [itemId, setItemId] = useState<string>("");
  const [itemData, setItemData] = useState<ItemData | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleGetItem() {
    setError(null);
    setItemData(null);

    if (!itemId) {
      setError("El ID del producto es requerido.");
      return;
    }

    try {
      const response = await fetch(`/item/${itemId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setItemData(data);
      } else {
        switch (response.status) {
          case 400:
            setError("Falta el parámetro del path.");
            break;
          case 404:
            setError("Producto no encontrado.");
            break;
          case 500:
            setError("Error interno del servidor. Avisa a los TAs.");
            break;
          default:
            setError("Ocurrió un error inesperado.");
        }
      }
    } catch (err) {
      setError("Ocurrió un error al intentar obtener el ítem. Inténtalo de nuevo.");
    }
  }

  return (
    <section className="get-item-section bg-secondary p-4 rounded-2xl">
      <h1 className="text-2xl font-bold">Obtener un ítem del inventario</h1>
      <div>
        <label htmlFor="itemId">ID del ítem a obtener:</label>
        <input
          type="text"
          name="itemId"
          id="itemId"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
          required
        />
      </div>
      <button
        className="bg-primary text-white font-bold mx-6 py-2 px-4 rounded-full cursor-pointer"
        onClick={handleGetItem}
      >
        Obtener Ítem
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {itemData && (
        <div style={{ marginTop: "20px", color: "green" }}>
          <h2>Información del ítem:</h2>
          <p>Nombre: {itemData.title}</p>
          <p>Precio: {itemData.price}</p>
          <p>Comprado el último mes: {itemData.boughtInLastMonth}</p>
          <p>Más vendido: {itemData.isBestSeller ? "Sí" : "No"}</p>
          <p>Puntuación: {itemData.stars}</p>
          <img
            src={itemData.imgUrl}
            alt={`Imagen de ${itemData.title}`}
            style={{ maxWidth: "200px", marginTop: "10px" }}
          />
        </div>
      )}
    </section>
  );
}
