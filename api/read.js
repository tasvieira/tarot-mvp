import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Use POST");

  const { question, cards } = req.body || {};
  if (!question || !Array.isArray(cards) || cards.length !== 3) {
    return res.status(400).json({ error: "Envie question e exatamente 3 cartas." });
  }

  const system = `
Você é um tarólogo experiente e ético.
Faça uma leitura simbólica, reflexiva e prática.
Evite previsões determinísticas.
Estrutura:
1) Visão geral
2) Carta 1 (Passado/Base)
3) Carta 2 (Presente/Desafio)
4) Carta 3 (Tendência/Conselho)
Finalize com 3 recomendações práticas.
`;

  const user = `
Pergunta: ${question}
Cartas: ${cards.join(", ")}
Interprete cada carta no contexto da pergunta.
`;

  try {
    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        { role: "system", content: system },
        { role: "user", content: user }
      ]
    });

    const reading = response.output_text || "Sem resposta.";
    return res.status(200).json({ reading });
  } catch (err) {
    return res.status(500).json({ error: err?.message || "Erro ao chamar OpenAI" });
  }
}
