import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Only protect routes starting with /admin
    if (request.nextUrl.pathname.startsWith('/admin')) {
        const session = request.cookies.get('admin_session');

        // If no session cookie exists, redirect to login page
        if (!session || session.value !== 'true') {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

// Ensure middleware only runs on relevant paths
export const config = {
    matcher: '/admin/:path*',
};