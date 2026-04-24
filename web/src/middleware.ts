import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const decodedPathname = decodeURIComponent(request.nextUrl.pathname)

  if (decodedPathname === '/bikefest/näytteilleasettajat') {
    const rewriteUrl = request.nextUrl.clone()
    rewriteUrl.pathname = '/bikefest/naytteilleasettajat'
    return NextResponse.rewrite(rewriteUrl)
  }

  if (decodedPathname === '/bikefest/kumppaneille') {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/bikefest/n%C3%A4ytteilleasettajat'
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/bikefest/:path*'],
}
