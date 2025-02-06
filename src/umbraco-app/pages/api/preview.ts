import type { NextApiRequest, NextApiResponse } from "next";

export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { secret, redirect } = req.query;

  // Check the secret and next parameters
  // This secret should only be known by this API route
  if (!secret) {
    return res.status(401).json({ message: "No token provided" });
  }

  if (secret !== process.env.UMBRACO_PREVIEW_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  res.setDraftMode({ enable: true });

  // support iframe previews by enforcing "SameSite=None; Secure=True" for preview the cookie
  const responseCookies = res.getHeader("Set-Cookie") as string[];
  if (responseCookies) {
    const cookies = responseCookies.map((cookie) => {
      if (cookie.match(/^(__prerender_bypass|__next_preview_data)=/)) {
        return cookie.replace(/SameSite=Lax/, "SameSite=None; Secure=True");
      }

      return cookie;
    });

    res.setHeader("Set-Cookie", cookies);
  }

  // redirect to the redirect target if any has been provided, otherwise just redirect to root
  const redirectValue = redirect as string;
  if (redirectValue ) {
    res.redirect(redirectValue);
  }
  else  {
    res.redirect("/");
  }
  res.end();
  return res;
}
