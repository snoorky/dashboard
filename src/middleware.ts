import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
				},
			},
		}
	);

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const url = request.nextUrl.clone();

	if (user && request.nextUrl.pathname === "/") {
		url.pathname = "/dashboard";
		return NextResponse.redirect(url);
	}

	if (!user && request.nextUrl.pathname !== "/") {
		url.pathname = "/";
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard", "/"],
};
