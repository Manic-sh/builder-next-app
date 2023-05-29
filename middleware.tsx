import { NextRequest, NextResponse } from 'next/server'
import { getPersonalizedRewrite } from '@builder.io/personalization-utils'

const excludededPrefixes = ['/favicon', '/api']

export default function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()

  if (!excludededPrefixes.find((path) => url.pathname?.startsWith(path))) {
    const rewrite = getPersonalizedRewrite(url.pathname!, req.cookies)
    if (rewrite) {
      url.pathname = rewrite
      return NextResponse.rewrite(url)
    }
  }
  // if (req.nextUrl.pathname == '/' || req.nextUrl.pathname === '/blog') {
  //   console.log('middle: ', req.nextUrl.pathname)
  //   const pathname = req.nextUrl.pathname;
  //   const searchParams = req.nextUrl.searchParams
  //   const keyword = encodeOptions({
  //     kw: searchParams.get('kw')
  //   })

  // return NextResponse.rewrite(new URL(`${pathname !== '/' ? `${pathname}/` : ''}${keyword}`, req.nextUrl));
  // }
}
