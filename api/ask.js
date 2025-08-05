const {
  BedrockAgentRuntimeClient,
  RetrieveAndGenerateCommand,
} = require("@aws-sdk/client-bedrock-agent-runtime");

const client = new BedrockAgentRuntimeClient({
  region: process.env.AWS_REGION,
});

function getJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end("Method Not Allowed");
    return;
  }

  try {
    const { question } = await getJsonBody(req);
    const command = new RetrieveAndGenerateCommand({
      knowledgeBaseId: process.env.KNOWLEDGE_BASE_ID,
      input: { text: question },
    });
    const response = await client.send(command);
    const answer = response.output?.text || "No answer found.";
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ answer }));
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Failed to fetch answer" }));
  }
};
