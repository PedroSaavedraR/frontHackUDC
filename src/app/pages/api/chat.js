export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método no permitido" });
    }
  
    try {
      const { message } = req.body; // Captura el mensaje del usuario
  
      // Aquí puedes llamar a una API externa o procesar la consulta
      const response = {
        text: `Recibí tu mensaje: ${message}`,
      };
  
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
  