const express = require("express");
const router = express.Router();
const multer = require("multer");
const uuid = require("uuid");
const path = require("path");
const axios = require("axios");
const BASE_URL = "https://learn-mug-backend.vercel.app/users";

let newFileName = ""; // Defina newFileName no escopo mais amplo

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/");
  },
  filename: (req, file, cb) => {
    // Gere um novo nome de arquivo com base em UUID
    newFileName = `${uuid.v4()}${path.extname(file.originalname)}`;
    cb(null, newFileName);
  },
});

const upload = multer({ storage: storage });

router.post("/:id", upload.single("file"), async (req, res) => {
  const uploadedImage = req.file;
  const id = req.params.id;
  console.log(id);

  if (!uploadedImage) {
    return res.status(400).json({ error: "Nenhuma imagem enviada." });
  }

  const dados = {
    "profile_img": newFileName,
  };

  // Use o valor de 'id' na URL da solicitação PUT
  const updateImageUser = await axios.put(`${BASE_URL}/update/${id}`, dados);

  res
    .status(200)
    .json({ message: "Arquivo carregado com sucesso.", filename: newFileName });
});

module.exports = router;
