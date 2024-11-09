import { useState } from "react";

export default function DeleteItem() {
  const [itemId, setItemId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleDelete() {
    setError(null);
    setSuccessMessage(null);

    if (!itemId) {
      setError("El ID del producto es requerido.");
      return;
    }

    try {
      const response = await fetch(`/item/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setSuccessMessage("¡El ítem se eliminó correctamente!");
      } else {
        switch (response.status) {
          case 400:
            setError("Campos faltantes o JSON inválido.");
            break;
          case 403:
            setError("No autorizado. Probablemente no eres el dueño del producto.");
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
      setError("Ocurrió un error al intentar eliminar el ítem. Inténtalo de nuevo.");
    }
  }

  return (
    <section className="delete-item-section bg-secondary p-4 rounded-2xl">
      <h1 className="text-2xl font-bold">Eliminar un ítem del inventario</h1>
      <div>
        <label htmlFor="itemId">ID del ítem a eliminar:</label>
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
        className="bg-red-600 text-white font-bold mx-6 py-2 px-4 rounded-full cursor-pointer"
        onClick={handleDelete}
      >
        Eliminar Ítem
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {successMessage && <div style={{ color: "blue" }}>{successMessage}</div>}
    </section>
  );
}
