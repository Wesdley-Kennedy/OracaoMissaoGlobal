import { NextResponse } from "next/server";

const users = [
  { nome: "pedroMissao", senha: "pedroMissao123" },
  { nome: "pastorMissao", senha: "pastorMissao123" },
  { nome: "painelMissao", senha: "painelMissao123" },
];

export async function POST(request: Request) {
  const { nome, senha } = await request.json();

  const user = users.find(
    (u) => u.nome === nome && u.senha === senha
  );

  if (!user) {
    return NextResponse.json(
      { message: "Credenciais inválidas" },
      { status: 401 }
    );
  }

  return NextResponse.json({ nome: user.nome });
}