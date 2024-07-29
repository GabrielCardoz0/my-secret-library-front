import { createCookieSessionStorage } from "@remix-run/node";

export const { getSession, destroySession, commitSession } = createCookieSessionStorage({
    cookie: {
        name: "my-secret-library",
        secrets: [import.meta.env.VITE_COOKIE_SECRET],
    }
});
