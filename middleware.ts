import { authMiddleware, redirectToSignIn } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export default authMiddleware({
	async afterAuth(auth, request) {
		if (!auth.userId && !auth.isPublicRoute) {
			return redirectToSignIn({ returnBackUrl: request.url })
		}

		if (auth.userId && !auth.user?.privateMetadata?.streamRegistered) {
		} else {
			console.log(
				'[Middleware] User already registered on Stream backend: ',
				auth.userId
			)
		}

		return NextResponse.next()
	},
})

export const config = {
	matcher: [
		// Exclude files with a "." followed by an extension, which are typically static files.
		// Exclude files in the _next directory, which are Next.js internals.

		'/((?!.+\\.[\\w]+$|_next).*)',
		// Re-include any files in the api or trpc folders that might have an extension
		'/(api|trpc)(.*)',
	],
}
