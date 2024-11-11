import React, { useState, useEffect } from "react";
import axios from "axios";

interface Item {
  id: string;
  name: string;
}

export default function ItemsPagination() {
  const [items, setItems] = useState<Item[]>([]);
  const [limit, setLimit] = useState<number>(10); 
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    setError(null);

    try {
      const params: any = { limit };
      if (lastKey) params.lastKey = lastKey;

      const response = await axios.get("https://your-api-url.com/items", { params });

      if (response.status === 200) {
        const data = response.data;
        setItems(data.items);
        setLastKey(data.lastKey || null);
      }
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 400) {
          setError("Falta el parámetro de consulta o es inválido.");
        } else if (err.response.status === 500) {
          setError("Error interno del servidor. Avisa a los TAs.");
        } else {
          setError("Ocurrió un error inesperado.");
        }
      } else {
        setError("Ocurrió un error inesperado.");
      }
    }
  }

  function handleLoadMore() {
    fetchItems();
  }

  return (
    <div className="items-pagination-section">
      <h1 className="text-2xl font-bold">Items con Paginación</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      {lastKey && (
        <button
          className="bg-primary text-white font-bold py-2 px-4 rounded-full mt-4"
          onClick={handleLoadMore}
        >
          Cargar más
        </button>
      )}
    </div>
  );
}
