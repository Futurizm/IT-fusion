import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Проверяем, если на главной странице, то нужно перенаправить, если нет авторизации
  if (request.nextUrl.pathname === '/' && !request.cookies.get('isLoggedIn')) {
    // Редиректим на страницу логина, если не авторизован
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
