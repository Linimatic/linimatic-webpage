import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // _vercel is excluded so the platform's own endpoints — including the
  // consent-gated analytics script — are never rewritten into a locale path.
  matcher: ['/((?!api|_next|_vercel|images|videos|favicon.ico|robots.txt|sitemap.xml|llms.txt).*)']
};
