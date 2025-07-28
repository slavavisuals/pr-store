import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';

// Edge Runtime compatible auth configuration (no Prisma)
export const authConfig = {
  trustHost: true,
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [], // No providers needed for middleware
  callbacks: {
    authorized({ request, auth }: any) {
      // Check for cart cookie
      if (!request.cookies.get('sessionCartId')) {
        // Generate cart cookie
        const sessionCartId = crypto.randomUUID();

        // Clone the request headers
        const newRequestHeaders = new Headers(request.headers);

        // Create a new response and add the new headers
        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          },
        });

        // Set the newly generated sessionCartId in the response cookies
        response.cookies.set('sessionCartId', sessionCartId);

        // Return the response with the sessionCartId set
        return response;
      } else {
        return true;
      }
    },
  },
} satisfies NextAuthConfig;