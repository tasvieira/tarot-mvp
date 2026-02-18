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

Cartas selecionadas:
1) ${c1} (Passado/Base)
2) ${c2} (Presente/Desafio)
3) ${c3} (Tendência/Conselho)

Interpretação (placeholder):
- ${c1}: indica o contexto e a energia que trouxe você até aqui.
- ${c2}: aponta o ponto de tensão atual e o que precisa de atenção.
- ${c3}: sugere uma direção prática para os próximos passos.

Recomendações:
1) Escreva em 1 frase o que você realmente quer resolver.
2) Escolha uma ação pequena para fazer ainda hoje.
3) Revise em 7 dias: o que mudou e o que permanece.`;

  return res.status(200).json({ reading });
}
