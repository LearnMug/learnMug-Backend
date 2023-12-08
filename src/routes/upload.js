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

router.get("/:id/image", async (req, res) => {
  const id = req.params.id;

  // Faça uma requisição para obter os dados do usuário com a imagem em base64
  try {
    const response = await axios.get(`${BASE_URL}/get/${id}`);
    const userData = response.data;

    // Verifique se o usuário possui a propriedade profile_img (imagem em base64)
    if (userData.profile_img) {
      // A imagem já está em base64, envie-a como resposta
      res.status(200).send(userData.profile_img);
    } else {
      res.status(404).json({ error: "Imagem não encontrada para o usuário." });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao recuperar a imagem do servidor." });
  }
});

module.exports = router;
