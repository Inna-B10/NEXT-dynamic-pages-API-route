import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtected = createRouteMatcher([
	'/user(.*)' // all inside  /user
])

export default clerkMiddleware(async (auth, req) => {
	if (isProtected(req)) {
		// log, customize, check the role
		// await auth.protect()
	}
})

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		'/((?!_next|auth|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		// Always run for API routes
		'/(api|trpc)(.*)'
	]
	// matcher: ['/((?!api|_next|auth|favicon.ico|.*\\..*).*)']
}
