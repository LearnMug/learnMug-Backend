const express = require("express");
const router = express.Router();
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const BASE_URL = "https://learn-mug-backend.vercel.app/users";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

router.post("/:id", upload.single('file'), async (req, res) => {
  const uploadedImage = req.file;
  const id = req.params.id;

  if (!uploadedImage) {
    return res.status(400).json({ error: "Nenhuma imagem enviada." });
  }

  const filePath = uploadedImage.path;

  fs.readFile(filePath, async (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao ler o arquivo." });
    }

    const base64Image = data.toString("base64");

    const dados = {
      profile_img: base64Image,
    };

    try {
      const updateImageUser = await axios.put(`${BASE_URL}/update/${id}`, dados);
      res.status(200).json({
        message: "Arquivo convertido para base64 e enviado com sucesso.",
        filename: uploadedImage.filename,
        base64Image: base64Image,
      });
    } catch (error) {
      res.status(500).json({ error: "Erro ao enviar a imagem para o servidor." });
    }
  });
});

router.get("/:id/image", async (req, res) => {
  const id = req.params.id;

  try {
    const response = await axios.get(`${BASE_URL}/get/${id}`);
    const userData = response.data;

    if (userData.data[0].profile_img) {
      res.status(200).send(userData.data[0].profile_img);
    } else {
      res.status(404).json({ error: "Imagem não encontrada para o usuário." });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao recuperar a imagem do servidor." });
  }
});

module.exports = router;
