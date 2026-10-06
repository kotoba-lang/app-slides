import assert from 'node:assert/strict';
import test from 'node:test';
import worker from '../src/app.ts';

test('XRPC JSON/authorization preflight does not fall through to assets', async () => {
  const response = await worker.fetch(new Request('https://slides.example/xrpc/com.etzhayyim.apps.slides.sync', {
    method: 'OPTIONS', headers: { origin: 'https://client.example', 'access-control-request-method': 'POST', 'access-control-request-headers': 'content-type,authorization' }
  }), { ASSETS: { fetch() { throw new Error('preflight reached assets'); } } });
  assert.equal(response.status, 204);
  assert.equal(response.headers.get('access-control-allow-origin'), '*');
  assert.equal(response.headers.get('access-control-allow-methods'), 'POST,OPTIONS');
  assert.equal(response.headers.get('access-control-allow-headers'), 'content-type,authorization');
  assert.equal(response.headers.get('access-control-max-age'), '86400');
  assert.equal(await response.text(), '');
});

test('preflight retains the old generic XRPC route without exposing other paths', async () => {
  assert.equal((await worker.fetch(new Request('https://slides.example/xrpc/other.method', { method: 'OPTIONS' }), {})).status, 204);
  assert.equal((await worker.fetch(new Request('https://slides.example/unrelated', { method: 'OPTIONS' }), {})).status, 404);
});

test('malformed JSON is rejected before dispatcher access', async () => {
  const response = await worker.fetch(new Request('https://slides.example/xrpc/com.etzhayyim.apps.slides.sync', { method: 'POST', body: '{' }), {});
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: 'InvalidJson' });
});

test('POST preserves MCP method, caller authentication and structured result', async (t) => {
  t.mock.method(globalThis, 'fetch', async (url, init) => {
    assert.equal(url, 'https://router.example/message');
    assert.equal(init.headers.get('authorization'), 'Bearer test-caller');
    assert.equal(init.headers.get('host'), null);
    assert.equal(init.headers.get('x-etzhayyim-xrpc-method'), 'other.method');
    const body = JSON.parse(init.body);
    assert.equal(body.jsonrpc, '2.0');
    assert.equal(body.method, 'tools/call');
    assert.deepEqual(body.params, { name: 'other.method', arguments: { value: 7 } });
    return Response.json({ result: { structuredContent: { accepted: true } } });
  });
  const response = await worker.fetch(new Request('https://slides.example/xrpc/other.method', { method: 'POST', headers: { authorization: 'Bearer test-caller', host: 'slides.example' }, body: '{"value":7}' }), { AGENTGATEWAY_MCP_ROUTER_URL: 'https://router.example/message/' });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await response.json(), { accepted: true });
});

test('MCP errors are not returned as successful XRPC responses', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => Response.json({ error: { message: 'refused' } }));
  const response = await worker.fetch(new Request('https://slides.example/xrpc/com.etzhayyim.apps.slides.sync', { method: 'POST', body: '{}' }), {});
  assert.equal(response.status, 502);
  assert.equal((await response.json()).error, 'refused');
});
