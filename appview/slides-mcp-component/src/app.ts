// slides.etzhayyim.com thin edge facade. OAuth/sync/cron run in AgentGateway MCP + pod-side LangServer.

interface SecretBinding { get(): Promise<string>; }
interface Env { ASSETS?: Fetcher; DISPATCHER_URL?: string; DISPATCHER_INTERNAL_SECRET?: string | SecretBinding; APP_NANOID?: string; AGENTGATEWAY_MCP_ROUTER_URL?: string; MCP_ROUTER_URL?: string; }
const APP = "slides";
const NSID_PREFIX = "com.etzhayyim.apps.slides.";

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    if (url.pathname === "/health" || url.pathname === "/_app/meta") return json({ ok: true, actor: "did:web:slides.etzhayyim.com", nanoid: env.APP_NANOID ?? "slides-mcp", execution: "edge-proxy+agentgateway-mcp+langserver", businessLogic: "40-engine/kotoba/crates/kotoba-kotodama/py/src/kotodama/ingest/gworkspace_lite.py", bpmn: "etzhayyim-root/00-contracts/bpmn/com/etzhayyim/slides" });
    if (url.pathname === "/oauth/callback") return htmlFromDispatcher(env, `${NSID_PREFIX}oauthCallback`, Object.fromEntries(url.searchParams));
    const nsid = url.pathname.startsWith("/xrpc/") ? url.pathname.slice("/xrpc/".length) : "";
    if (nsid && req.method === "OPTIONS") return new Response(null, { status: 204, headers: { "access-control-allow-origin": "*", "access-control-allow-methods": "POST,OPTIONS", "access-control-allow-headers": "content-type,authorization", "access-control-max-age": "86400" } });
    if (nsid && req.method === "POST") {
      const body = await bodyWithQuery(req, url);
      if (body.__invalidJson) return json({ error: "InvalidJson" }, 400);
      return proxyToMcp(req, env, nsid, body);
    }
    if (nsid.startsWith(NSID_PREFIX) && req.method === "GET") {
      const body = await bodyWithQuery(req, url);
      if (body.__invalidJson) return json({ error: "InvalidJson" }, 400);
      return proxyToDispatcher(env, nsid, body);
    }
    if (env.ASSETS) return env.ASSETS.fetch(req);
    return json({ error: "NotFound", message: `${APP} not found` }, 404);
  },
} satisfies ExportedHandler<Env>;

async function bodyWithQuery(req: Request, url: URL): Promise<Record<string, unknown>> { let body: Record<string, unknown> = {}; if (req.method === "POST") { const text = await req.text(); try { body = text ? JSON.parse(text) : {}; } catch { return { __invalidJson: true }; } } for (const [k, v] of url.searchParams) if (!(k in body)) body[k] = v; return body; }
// Preserve the appview's MCP tools/call transport when changing its UI build.
async function proxyToMcp(req: Request, env: Env, nsid: string, body: Record<string, unknown>): Promise<Response> {
  const base = env.AGENTGATEWAY_MCP_ROUTER_URL?.trim() || env.MCP_ROUTER_URL?.trim() || "https://mcp.etzhayyim.com/xrpc/com.etzhayyim.mcp.message";
  const headers = new Headers(req.headers);
  headers.delete("host");
  headers.set("content-type", "application/json");
  headers.set("x-etzhayyim-bff", "cljs-edge-bff");
  headers.set("x-etzhayyim-xrpc-method", nsid);
  const upstream = await fetch(base.replace(/\/+$/, ""), { method: "POST", headers, body: JSON.stringify({ jsonrpc: "2.0", id: crypto.randomUUID(), method: "tools/call", params: { name: nsid, arguments: body } }) });
  const text = await upstream.text();
  let payload: unknown = text;
  try { payload = text ? JSON.parse(text) : null; } catch { /* Preserve upstream text. */ }
  if (!upstream.ok) return json({ error: "MCP router request failed", upstream: payload }, upstream.status);
  if (payload && typeof payload === "object" && "error" in payload) {
    const error = (payload as { error?: { message?: string } }).error;
    return json({ error: error?.message ?? "MCP router returned an error", upstream: payload }, 502);
  }
  const result = payload && typeof payload === "object" && "result" in payload ? (payload as { result?: unknown }).result : payload;
  return json(result && typeof result === "object" && "structuredContent" in result ? (result as { structuredContent?: unknown }).structuredContent ?? {} : result ?? {});
}
async function htmlFromDispatcher(env: Env, nsid: string, body: Record<string, unknown>): Promise<Response> { const r = await proxyToDispatcher(env, nsid, body); const text = await r.text(); let html = text; try { html = (JSON.parse(text) as { html?: string }).html ?? text; } catch {} return new Response(html, { status: r.status, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } }); }
async function proxyToDispatcher(env: Env, nsid: string, body: Record<string, unknown>): Promise<Response> { const base = (env.DISPATCHER_URL ?? "https://dispatcher.etzhayyim.com").replace(/\/+$/, ""); const headers: Record<string, string> = { "content-type": "application/json" }; const trust = await internalTrustSecret(env); if (trust) headers["x-internal-trust"] = trust; const resp = await fetch(`${base}/xrpc/${nsid}`, { method: "POST", headers, body: JSON.stringify(body) }); const text = await resp.text(); return new Response(text, { status: resp.status, headers: { "content-type": resp.headers.get("content-type") ?? "application/json", "cache-control": "no-store" } }); }
async function internalTrustSecret(env: Env): Promise<string> { const binding = env.DISPATCHER_INTERNAL_SECRET; if (!binding) return ""; try { return typeof binding === "string" ? binding : await binding.get(); } catch { return ""; } }
function json(body: unknown, status = 200): Response { return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } }); }
