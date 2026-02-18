export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Use POST");

  const { question, cards } = req.body || {};
  if (!question || !Array.isArray(cards) || cards.length !== 3) {
    return res.status(400).json({ error: "Envie question e exatamente 3 cartas." });
  }

  const [c1, c2, c3] = cards;

  const reading =
`Modo DEMO (sem IA)

Pergunta:
${question}

Cartas:
1) ${c1} (Passado/Base)
2) ${c2} (Presente/Desafio)
3) ${c3} (Tendência/Conselho)

Interpretação simbólica:
- ${c1} representa a energia que te trouxe até aqui.
- ${c2} mostra o ponto de atenção atual.
- ${c3} indica uma possível direção.

Reflexão:
1) O que você realmente quer resolver?
2) Qual pequena ação pode começar hoje?
3) O que precisa ser ajustado?`;

  return res.status(200).json({ reading });
}
