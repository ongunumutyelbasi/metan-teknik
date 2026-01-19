import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { password } = await request.json();

    console.log("Input Password:", password);
    console.log("Expected Password:", process.env.ADMIN_PASSWORD);
    console.log("Is there a match?:", password === process.env.ADMIN_PASSWORD);

    if (password === "test123") {
        const response = NextResponse.json({ success: true });
        
        // Set a simple cookie that expires in 24 hours
        response.cookies.set('admin_session', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24,
            path: '/',
        });
        
        return response;
    }

    return NextResponse.json({ error: 'Hatalı şifre' }, { status: 401 });
}