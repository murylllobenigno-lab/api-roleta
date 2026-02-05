import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const API_URL =
"https://api.casinoscores.com/svc-evolution-game-events/api/immersiveroulette?page=0&size=50&sort=data.settledAt,desc";

app.get("/immersive", async (req, res) => {
  try {
    const r = await fetch(API_URL, {
      headers: { "user-agent": "Mozilla/5.0" }
    });

    const j = await r.json();

    const numeros = j.content
      .map(e => e?.data?.result?.outcome?.number)
      .filter(n => typeof n === "number")
      .slice(0, 5);

    res.json({ numeros });
  } catch {
    res.status(500).json({ erro: "Falha API" });
  }
});

app.listen(process.env.PORT || 3000);
