import test from "node:test";
import assert from "node:assert/strict";
import { POST, __setResendFactoryForTests } from "@/app/api/lead/route";

test("POST /api/lead devuelve 200 con payload válido", async () => {
  const previousApiKey = process.env.RESEND_API_KEY;
  const previousFrom = process.env.RESEND_FROM_EMAIL;
  process.env.RESEND_API_KEY = "test_api_key";
  process.env.RESEND_FROM_EMAIL = "no-reply@example.com";

  __setResendFactoryForTests(() => ({
    emails: {
      send: async () => ({ data: { id: "email_test_1" }, error: null }),
    },
  }));

  try {
    const request = new Request("http://localhost/api/lead", {
      method: "POST",
      body: JSON.stringify({
        lang: "es",
        pageUrl: "http://localhost/es/contacto",
        type: "contact",
        name: "Ada Lovelace",
        email: "ada@example.com",
        message: "Mensaje de prueba para validar el endpoint.",
        acceptPrivacyPolicy: true,
      }),
      headers: { "content-type": "application/json" },
    });

    const response = await POST(request as any);
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.ok, true);
  } finally {
    __setResendFactoryForTests();
    if (typeof previousApiKey === "undefined") {
      delete process.env.RESEND_API_KEY;
    } else {
      process.env.RESEND_API_KEY = previousApiKey;
    }
    if (typeof previousFrom === "undefined") {
      delete process.env.RESEND_FROM_EMAIL;
    } else {
      process.env.RESEND_FROM_EMAIL = previousFrom;
    }
  }
});
