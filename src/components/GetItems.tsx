import { ChangeEvent, FormEvent, useState } from "react";
import { ItemData } from "../interfaces/ItemData/ItemDataRequest";

export default function CreateItemForm() {
  const [formData, setFormData] = useState<ItemData>({
    boughtInLastMonth: 0,
    imgUrl: "",
    isBestSeller: false,
    price: 0,
    stars: 0,
    title: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(`Item created successfully with ID: ${data.itemId}`);
      } else {
        if (response.status === 400) {
          setError("Campos faltantes o inválidos.");
        } else if (response.status === 403) {
          setError("No autorizado.");
        } else if (response.status === 500) {
          setError("Error interno del servidor. Avisa a los TAs.");
        }
      }
    } catch (err) {
      setError("Ocurrió un error al crear el item. Inténtalo de nuevo.");
    }
  }

  return (
    <section className="create-item-section bg-secondary p-4 rounded-2xl">
      <h1 className="text-2xl font-bold">Crear un nuevo item</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="boughtInLastMonth">Cantidad de compras en el último mes</label>
          <input
            type="number"
            name="boughtInLastMonth"
            id="boughtInLastMonth"
            value={formData.boughtInLastMonth}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="imgUrl">URL de la imagen del producto</label>
          <input
            type="text"
            name="imgUrl"
            id="imgUrl"
            value={formData.imgUrl}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="isBestSeller">
            ¿Es un producto más vendido?
            <input
              type="checkbox"
              name="isBestSeller"
              id="isBestSeller"
              checked={formData.isBestSeller}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="price">Precio</label>
          <input
            type="number"
            step="0.01"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="stars">Puntuación del producto (0 a 5)</label>
          <input
            type="number"
            name="stars"
            id="stars"
            min="0"
            max="5"
            value={formData.stars}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="title">Nombre del producto</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <button
          className="bg-primary text-white font-bold mx-6 py-2 px-4 rounded-full cursor-pointer"
          type="submit"
        >
          Crear Item
        </button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {successMessage && <div style={{ color: "blue" }}>{successMessage}</div>}
    </section>
  );
}
