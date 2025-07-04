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

		return NextResponse.json({ user: authData.user });
	} catch {
		return NextResponse.json({ error: "Erro interno." }, { status: 500 });
	}
}
