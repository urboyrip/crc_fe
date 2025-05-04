import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type UserType = 'marketing' | 'bm';

// Define route permissions
const ROUTE_PERMISSIONS: Record<string, UserType[]> = {
  '/dashboard/marketing': ['marketing'],
  '/dashboard/marketing/inputnasabah': ['marketing'],
  '/dashboard/marketing/customer': ['marketing'],
  '/dashboard/manager': ['bm'],
  '/dashboard/manager/target': ['bm'],
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const user = request.cookies.get('user')?.value;
  const pathname = request.nextUrl.pathname;
  const isAuthPage = pathname === '/login';
  const isPublicPage = pathname === '/';

  // Handle public pages
  if (isPublicPage) {
    return NextResponse.next();
  }

  // If no token or user data, redirect to login
  if (!token || !user) {
    if (!isAuthPage) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  try {
    const userData = JSON.parse(user);
    const userType = userData.type as UserType;

    // Handle login page when user is already authenticated
    if (isAuthPage) {
      const dashboardPath = userType === 'marketing' ? '/dashboard/marketing' : '/dashboard/manager';
      return NextResponse.redirect(new URL(dashboardPath, request.url));
    }

    // Check route permissions
    for (const [route, allowedTypes] of Object.entries(ROUTE_PERMISSIONS)) {
      if (pathname.startsWith(route)) {
        // If user type is not allowed for this route
        if (!allowedTypes.includes(userType)) {
          // Redirect to appropriate dashboard
          const dashboardPath = userType === 'marketing' ? '/dashboard/marketing' : '/dashboard/manager';
          return NextResponse.redirect(new URL(dashboardPath, request.url));
        }
        break;
      }
    }

    // Handle 401 responses
    const response = NextResponse.next();
    response.headers.set('x-middleware-cache', 'no-cache');
    
    return response;
  } catch (error) {
    // If user data is invalid, clear cookies and redirect to login
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('token');
    response.cookies.delete('user');
    return response;
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public|assets).*)',
  ],
};