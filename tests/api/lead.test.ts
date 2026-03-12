import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import test from "node:test";
import { POST, __setResendFactoryForTests } from "@/app/api/lead/route";

type LeadRequestPayload = {
  lang: string;
  pageUrl: string;
  type: "project" | "contact" | "talent";
  name: unknown;
  email: unknown;
  phone?: unknown;
  company?: unknown;
  servicesInterested?: unknown;
  message: unknown;
  acceptPrivacyPolicy: unknown;
};

const BASE_PAYLOAD: LeadRequestPayload = {
  lang: "es",
  pageUrl: "http://localhost/es/contacto",
  type: "contact",
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "Mensaje de prueba para validar el endpoint.",
  acceptPrivacyPolicy: true,
};

function makeRequest(
  payload: unknown,
  options?: { ip?: string; rawBody?: string; contentType?: string }
) {
  return new Request("http://localhost/api/lead", {
    method: "POST",
    headers: {
      "content-type": options?.contentType ?? "application/json",
      "x-real-ip": options?.ip ?? `ip-${Math.random().toString(36).slice(2, 9)}`,
    },
    body: options?.rawBody ?? JSON.stringify(payload),
  });
}

async function postLead(payload: unknown, ip?: string) {
  const res = await POST(makeRequest(payload, { ip }) as any);
  const body = await res.json();
  return { res, body };
}

type SendParams = {
  from: string;
  to: string;
  subject: string;
  text: string;
  replyTo?: string | string[];
  headers?: Record<string, string>;
};

function setupResendMock(
  impl?: (params: SendParams) => Promise<{ error: unknown }> | { error: unknown }
) {
  const calls: SendParams[] = [];
  __setResendFactoryForTests(() => ({
    emails: {
      send: async (params) => {
        calls.push(params);
        if (impl) return impl(params);
        return { error: null };
      },
    },
  }));
  return calls;
}

test("API /lead - casos válidos", async (t) => {
  const previousApiKey = process.env.RESEND_API_KEY;
  process.env.RESEND_API_KEY = "test_api_key";
  t.after(() => {
    __setResendFactoryForTests();
    if (typeof previousApiKey === "undefined") delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = previousApiKey;
  });

  await t.test("envío correcto y Resend llamado una sola vez", async () => {
    const calls = setupResendMock();
    const { res, body } = await postLead(BASE_PAYLOAD, "valid-1");
    assert.equal(res.status, 200);
    assert.equal(body.ok, true);
    assert.equal(calls.length, 1);
  });

  await t.test("from fijo del dominio y replyTo email usuario", async () => {
    const calls = setupResendMock();
    const payload = {
      ...BASE_PAYLOAD,
      email: " User+alias@Example.com ",
    };
    const { res } = await postLead(payload, "valid-2");
    assert.equal(res.status, 200);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].from, "Web Enblanco <web@agenciaenblanco.com>");
    assert.equal(calls[0].replyTo, "User+alias@Example.com");
    assert.notEqual(calls[0].from, calls[0].replyTo);
  });

  await t.test("nombre con tildes y ñ + apellidos compuestos", async () => {
    const calls = setupResendMock();
    const { res } = await postLead(
      { ...BASE_PAYLOAD, name: "María-José Muñoz García" },
      "valid-3"
    );
    assert.equal(res.status, 200);
    assert.equal(calls.length, 1);
  });

  await t.test("mensaje largo y con saltos de línea", async () => {
    const calls = setupResendMock();
    const msg = `Primera línea\nSegunda línea\n${"texto ".repeat(500)}`;
    const { res } = await postLead({ ...BASE_PAYLOAD, message: msg }, "valid-4");
    assert.equal(res.status, 200);
    assert.equal(calls.length, 1);
  });

  await t.test("unicode/caracteres especiales no rompen", async () => {
    const calls = setupResendMock();
    const payload = {
      ...BASE_PAYLOAD,
      name: "Álvaro 🚀 — 東京",
      message: "Prueba con unicode: ñ, ü, €, 中文, emoji 😀",
    };
    const { res } = await postLead(payload, "valid-5");
    assert.equal(res.status, 200);
    assert.equal(calls.length, 1);
  });
});

test("API /lead - errores probables de input", async (t) => {
  const previousApiKey = process.env.RESEND_API_KEY;
  process.env.RESEND_API_KEY = "test_api_key";
  t.after(() => {
    __setResendFactoryForTests();
    if (typeof previousApiKey === "undefined") delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = previousApiKey;
  });

  const assertValidation = async (payload: unknown, ip: string) => {
    const calls = setupResendMock();
    const { res, body } = await postLead(payload, ip);
    assert.equal(res.status, 400);
    assert.equal(body.error, "validation");
    assert.equal(calls.length, 0);
  };

  await t.test("nombre vacío", async () => {
    await assertValidation({ ...BASE_PAYLOAD, name: "" }, "name-empty");
  });

  await t.test("nombre solo espacios", async () => {
    await assertValidation({ ...BASE_PAYLOAD, name: "   " }, "name-spaces");
  });

  await t.test("nombre excesivamente largo sigue siendo aceptado (sin regla max)", async () => {
    const calls = setupResendMock();
    const { res } = await postLead(
      { ...BASE_PAYLOAD, name: "A".repeat(2000) },
      "name-long"
    );
    assert.equal(res.status, 200);
    assert.equal(calls.length, 1);
  });

  await t.test("nombre con HTML/script no rompe", async () => {
    const calls = setupResendMock();
    const { res } = await postLead(
      { ...BASE_PAYLOAD, name: "<script>alert(1)</script>" },
      "name-html"
    );
    assert.equal(res.status, 200);
    assert.equal(calls.length, 1);
    assert.match(calls[0].text, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  });

  await t.test("email vacío", async () => {
    await assertValidation({ ...BASE_PAYLOAD, email: "" }, "email-empty");
  });

  await t.test("email solo espacios", async () => {
    await assertValidation({ ...BASE_PAYLOAD, email: "   " }, "email-spaces");
  });

  await t.test("email inválido", async () => {
    await assertValidation({ ...BASE_PAYLOAD, email: "foo@" }, "email-invalid");
  });

  await t.test("email con caracteres no ASCII", async () => {
    await assertValidation({ ...BASE_PAYLOAD, email: "a€@gmail.com" }, "email-non-ascii");
  });

  await t.test("email sin TLD", async () => {
    await assertValidation({ ...BASE_PAYLOAD, email: "a@gmail" }, "email-no-tld");
  });

  await t.test("email con coma en dominio", async () => {
    await assertValidation({ ...BASE_PAYLOAD, email: "a@gmail,com" }, "email-domain-comma");
  });

  await t.test("email con espacios internos", async () => {
    await assertValidation({ ...BASE_PAYLOAD, email: "a @gmail.com" }, "email-inner-space");
  });

  await t.test("email válido con + y mayúsculas", async () => {
    const calls = setupResendMock();
    const { res } = await postLead(
      { ...BASE_PAYLOAD, email: "User+Lead@Example.COM" },
      "email-plus"
    );
    assert.equal(res.status, 200);
    assert.equal(calls[0].replyTo, "User+Lead@Example.COM");
  });

  await t.test("email con espacios alrededor se trimmea", async () => {
    const calls = setupResendMock();
    const { res } = await postLead(
      { ...BASE_PAYLOAD, email: "  user@example.com  " },
      "email-trim"
    );
    assert.equal(res.status, 200);
    assert.equal(calls[0].replyTo, "user@example.com");
  });

  await t.test("mensaje vacío", async () => {
    await assertValidation({ ...BASE_PAYLOAD, message: "" }, "msg-empty");
  });

  await t.test("mensaje solo espacios", async () => {
    await assertValidation({ ...BASE_PAYLOAD, message: "   " }, "msg-spaces");
  });

  await t.test("mensaje con HTML/script no rompe composición", async () => {
    const calls = setupResendMock();
    const payload = { ...BASE_PAYLOAD, message: "<script>hi</script> contenido seguro" };
    const { res } = await postLead(payload, "msg-html");
    assert.equal(res.status, 200);
    assert.equal(calls.length, 1);
    assert.match(calls[0].text, /<script>hi<\/script> contenido seguro/);
  });
});

test("API /lead - payload manipulado / tipos incorrectos", async (t) => {
  const previousApiKey = process.env.RESEND_API_KEY;
  process.env.RESEND_API_KEY = "test_api_key";
  t.after(() => {
    __setResendFactoryForTests();
    if (typeof previousApiKey === "undefined") delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = previousApiKey;
  });

  const assertValidation = async (payload: unknown, ip: string) => {
    const calls = setupResendMock();
    const { res, body } = await postLead(payload, ip);
    assert.equal(res.status, 400);
    assert.equal(body.error, "validation");
    assert.equal(calls.length, 0);
  };

  await t.test("payload vacío {}", async () => {
    await assertValidation({}, "payload-empty");
  });

  await t.test("payload null", async () => {
    const calls = setupResendMock();
    const req = makeRequest(null, { ip: "payload-null" });
    const res = await POST(req as any);
    const body = await res.json();
    assert.equal(res.status, 400);
    assert.equal(body.error, "validation");
    assert.equal(calls.length, 0);
  });

  await t.test("falta name", async () => {
    const { name: _omit, ...payload } = BASE_PAYLOAD;
    await assertValidation(payload, "missing-name");
  });

  await t.test("falta email", async () => {
    const { email: _omit, ...payload } = BASE_PAYLOAD;
    await assertValidation(payload, "missing-email");
  });

  await t.test("falta message", async () => {
    const { message: _omit, ...payload } = BASE_PAYLOAD;
    await assertValidation(payload, "missing-message");
  });

  await t.test("tipos incorrectos: name number / email array / message object", async () => {
    await assertValidation(
      {
        ...BASE_PAYLOAD,
        name: 123,
        email: ["a@b.com"],
        message: { text: "hola" },
      },
      "wrong-types"
    );
  });

  await t.test("JSON inválido retorna validation", async () => {
    const calls = setupResendMock();
    const req = makeRequest(undefined, { rawBody: "{", ip: "bad-json" });
    const res = await POST(req as any);
    const body = await res.json();
    assert.equal(res.status, 400);
    assert.equal(body.error, "validation");
    assert.equal(calls.length, 0);
  });

  await t.test("project sin servicesInterested válido -> 400 validation", async () => {
    await assertValidation(
      {
        ...BASE_PAYLOAD,
        type: "project",
        servicesInterested: [],
      },
      "project-no-services"
    );
  });
});

test("API /lead - robustez endpoint y resiliencia", async (t) => {
  const previousApiKey = process.env.RESEND_API_KEY;
  process.env.RESEND_API_KEY = "test_api_key";
  t.after(() => {
    __setResendFactoryForTests();
    if (typeof previousApiKey === "undefined") delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = previousApiKey;
  });

  await t.test("si Resend devuelve error responde 500 controlado", async () => {
    setupResendMock(async () => ({ error: { message: "resend-error" } }));
    const { res, body } = await postLead(BASE_PAYLOAD, "resend-error");
    assert.equal(res.status, 500);
    assert.equal(body.error, "send_failed");
  });

  await t.test("si Resend lanza excepción responde 500 controlado", async () => {
    setupResendMock(async () => {
      throw new Error("network fail");
    });
    const { res, body } = await postLead(BASE_PAYLOAD, "resend-throw");
    assert.equal(res.status, 500);
    assert.equal(body.error, "send_failed");
  });

  await t.test("sin RESEND_API_KEY falla controlado sin crash", async () => {
    const oldCwd = process.cwd();
    const suiteApiKey = process.env.RESEND_API_KEY;
    const tmpRoot = await mkdtemp(join(tmpdir(), "lead-api-test-"));
    process.chdir(tmpRoot);
    delete process.env.RESEND_API_KEY;
    __setResendFactoryForTests();
    try {
      const { res, body } = await postLead(BASE_PAYLOAD, "missing-env");
      assert.equal(res.status, 500);
      assert.equal(body.error, "send_failed");
    } finally {
      process.chdir(oldCwd);
      if (typeof suiteApiKey === "undefined") delete process.env.RESEND_API_KEY;
      else process.env.RESEND_API_KEY = suiteApiKey;
      await rm(tmpRoot, { recursive: true, force: true });
    }
  });

  await t.test("rate limit: 6ª petición desde misma IP devuelve 429", async () => {
    const calls = setupResendMock();
    const ip = "rate-limit-ip";
    for (let i = 0; i < 5; i += 1) {
      const { res } = await postLead(BASE_PAYLOAD, ip);
      assert.equal(res.status, 200);
    }
    const sixth = await postLead(BASE_PAYLOAD, ip);
    assert.equal(sixth.res.status, 429);
    assert.equal(sixth.body.error, "rate_limited");
    assert.equal(calls.length, 5);
  });
});

test("API /lead - sanitización y límites extremos no crashean", async (t) => {
  const previousApiKey = process.env.RESEND_API_KEY;
  process.env.RESEND_API_KEY = "test_api_key";
  t.after(() => {
    __setResendFactoryForTests();
    if (typeof previousApiKey === "undefined") delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = previousApiKey;
  });

  await t.test("mensaje extremadamente largo no rompe y se envía", async () => {
    const calls = setupResendMock();
    const hugeMessage = `${"x".repeat(70000)}<script>alert(1)</script>`;
    const { res } = await postLead(
      {
        ...BASE_PAYLOAD,
        message: hugeMessage,
      },
      "huge-message"
    );
    assert.equal(res.status, 200);
    assert.equal(calls.length, 1);
    assert.ok(calls[0].text.length > 0);
  });

  await t.test("texto del email escapa HTML en campos de nombre/email", async () => {
    const calls = setupResendMock();
    const { res } = await postLead(
      {
        ...BASE_PAYLOAD,
        name: `<img src=x onerror="alert('xss')">`,
        email: "safe@example.com",
      },
      "escape-html"
    );
    assert.equal(res.status, 200);
    assert.match(calls[0].text, /&lt;img src=x onerror=&quot;alert\('xss'\)&quot;&gt;/);
  });
});
