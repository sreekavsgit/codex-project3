const messages = document.getElementById("messages");
const send = document.getElementById("send");

function addMessage(sender, text) {
  const li = document.createElement("li");
  li.textContent = `${sender}: ${text}`;
  messages.appendChild(li);
}

send.addEventListener("click", async () => {
  const input = document.getElementById("question");
  const question = input.value.trim();
  if (!question) return;
  addMessage("you", question);
  input.value = "";
  try {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    addMessage("bot", data.answer || "No answer");
  } catch {
    addMessage("bot", "Error contacting server");
  }
});
