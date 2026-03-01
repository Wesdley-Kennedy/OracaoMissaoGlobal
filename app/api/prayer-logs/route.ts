import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function formatLog(log: any) {
  return {
    id: log.id,
    hours: Math.floor(log.minutes / 60),
    minutes: log.minutes % 60,
    type: log.type,
    timestamp: new Date(log.createdAt).getTime(),
  };
}

export async function GET() {
  try {
    const logs = await prisma.prayerLog.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(logs.map(formatLog));
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar registros" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { hours, minutes, type } = await req.json();
    const totalMinutes = (parseInt(hours) || 0) * 60 + (parseInt(minutes) || 0);

    const newLog = await prisma.prayerLog.create({
      data: {
        userId: "TEMP_USER",
        minutes: totalMinutes,
        type: type || "adicionado",
      },
    });

    return NextResponse.json(formatLog(newLog));
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar registro" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await prisma.prayerLog.deleteMany({});
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao limpar registros" }, { status: 500 });
  }
}