import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getSession(req)
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  const protectedPaths = {
    '/': {
      isAuthenticated: token,
      loginPath: '/login',
    }
  };

  const loginPaths = {
    '/login': {
      isAuthenticated: token,
      redirectPath: '/',
    }
  };

  if (protectedPaths[pathname]) {
    if (!token) {
      url.pathname = protectedPaths[pathname].loginPath;
      return NextResponse.redirect(url);
    }
  }

  if (loginPaths[pathname]) {
    if (token) {
      url.pathname = loginPaths[pathname].redirectPath;
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login']
};
