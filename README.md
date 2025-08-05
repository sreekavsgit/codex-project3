# codex-project3

Simple chat UI that queries an AWS Knowledge Base through the Model Context Protocol.

## Setup

- Set the environment variables `AWS_REGION` and `KNOWLEDGE_BASE_ID`.
- Deploy to Vercel; the `api/` folder exposes an `/api/ask` endpoint and `index.html` provides the UI.

Run checks locally with:

```bash
npm run lint
npm run format:check
npm test
```
