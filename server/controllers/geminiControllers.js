const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const correctContent = async (req, res) => {
  try {
    const { content } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `CCorrect the following text for grammar, punctuation, and clarity.
    Do NOT include any introductions, explanations, or extra sentences.
    Only return the corrected text itself:\n\n${content}`;
    const result = await model.generateContent(prompt);

    const corrected = result.response.text();
    console.log(corrected);
    res.json({ corrected });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = correctContent;
