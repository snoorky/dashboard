import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const { email, password } = await request.json();

		if (!email || !password)
			return NextResponse.json({ error: "Email e senha são obrigatórios." }, { status: 400 });

		const supabase = await createClient();

		const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (authError || !authData?.user) {
			return NextResponse.json({ error: authError?.message || "Erro ao logar" }, { status: 401 });
		}

		const response = NextResponse.json({ user: authData.user });

		const accessToken = authData.session.access_token;
		const refreshToken = authData.session.refresh_token;
		const expiresIn = authData.session.expires_at;

		response.cookies.set("sb-access-token", accessToken, {
			httpOnly: true,
			path: "/",
			secure: process.env.NODE_ENV === "production",
			maxAge: expiresIn ? expiresIn - Math.floor(Date.now() / 1000) : 60 * 60,
			sameSite: "lax",
		});

		response.cookies.set("sb-refresh-token", refreshToken, {
			httpOnly: true,
			path: "/",
			secure: process.env.NODE_ENV === "production",
			maxAge: 60 * 60 * 24 * 30,
			sameSite: "lax",
		});

		return response;
	} catch {
		return NextResponse.json({ error: "Erro interno." }, { status: 500 });
	}
}
