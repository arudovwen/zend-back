import type { NextRequest } from "next/server";
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

export function middleware(request: NextRequest) {

  const token = getCookie("token", {cookies});

  if (token && !request.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/dashboard", request.url));
  }

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
