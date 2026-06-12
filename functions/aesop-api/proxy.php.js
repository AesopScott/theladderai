const DEFAULT_MODEL = 'claude-haiku-4-5-20251001';
const MAX_TOKENS_CAP = 1024;
const MAX_MESSAGES = 40;

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'X-Content-Type-Options': 'nosniff'
    }
  });
}

function clampMaxTokens(value) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return MAX_TOKENS_CAP;
  return Math.min(parsed, MAX_TOKENS_CAP);
}

function normalizeMessages(messages) {
  return messages.map((message) => ({
    role: message.role,
    content: String(message.content)
  }));
}

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }

  if (request.method !== 'POST') {
    return jsonResponse({ error: 'POST only' }, 405);
  }

  const apiKey = env.AESOP_ANTHROPIC_API_KEY || env.ANTHROPIC_API_KEY || '';
  if (!apiKey) {
    return jsonResponse({ error: 'Server is missing AESOP_ANTHROPIC_API_KEY' }, 500);
  }

  let input;
  try {
    input = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid request. Required: { messages: [...] }' }, 400);
  }

  if (!input || !Array.isArray(input.messages)) {
    return jsonResponse({ error: 'Invalid request. Required: { messages: [...] }' }, 400);
  }

  for (const message of input.messages) {
    if (!message || !message.role || typeof message.content !== 'string') {
      return jsonResponse({ error: 'Each message needs role and content.' }, 400);
    }
    if (!['user', 'assistant'].includes(message.role)) {
      return jsonResponse({ error: 'Message role must be "user" or "assistant".' }, 400);
    }
  }

  const messages = normalizeMessages(input.messages.slice(-MAX_MESSAGES));
  const payload = {
    model: env.AESOP_ANTHROPIC_MODEL || DEFAULT_MODEL,
    max_tokens: clampMaxTokens(input.max_tokens),
    messages
  };

  if (typeof input.system_prompt === 'string' && input.system_prompt.trim()) {
    payload.system = input.system_prompt.trim();
  }

  let upstream;
  try {
    upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    return jsonResponse({ error: `Connection failed: ${error.message || 'Anthropic request failed'}` }, 502);
  }

  const text = await upstream.text();
  const headers = {
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff'
  };

  return new Response(text || JSON.stringify({ error: 'Empty Anthropic response' }), {
    status: upstream.status,
    headers
  });
}
