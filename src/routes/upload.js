const express = require("express");
const router = express.Router();
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const BASE_URL = "https://learn-mug-backend.vercel.app/users";

router.post("/:id", async (req, res) => {
  const uploadedImage = req.file;
  const id = req.params.id;

  if (!uploadedImage) {
    return res.status(400).json({ error: "Nenhuma imagem enviada." });
  }

  const filePath = uploadedImage.path;

  // Lê o arquivo de imagem como um buffer
  fs.readFile(filePath, async (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao ler o arquivo." });
    }

    // Converte o buffer para base64
    const base64Image = data.toString("base64");

    const dados = {
      profile_img: base64Image,
    };

    // Envie os dados com a imagem em base64 para o backend
    try {
      const updateImageUser = await axios.put(`${BASE_URL}/update/${id}`, dados);
      res.status(200).json({
        message: "Arquivo convertido para base64 e enviado com sucesso.",
        filename: uploadedImage.filename,
        base64Image: base64Image, // Se desejar retornar a imagem em base64 no response
      });
    } catch (error) {
      res.status(500).json({ error: "Erro ao enviar a imagem para o servidor." });
    }
  });
});

module.exports = router;
