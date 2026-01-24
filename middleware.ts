import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    console.log("🛡️ Middleware checking path:", request.nextUrl.pathname);
    
    if (request.nextUrl.pathname.startsWith('/admin')) {
        const session = request.cookies.get('admin_session');
        
        if (!session || session.value !== 'true') {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }
    return NextResponse.next();
}

// Ensure middleware only runs on relevant paths
export const config = {
    // This ensures both "/admin" and "/admin/anything" are covered
    matcher: ['/admin', '/admin/:path*'],
};