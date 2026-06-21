import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const visit = await prisma.siteVisit.create({
      data: {
        leadId: body.leadId,
        visitDate: new Date(body.visitDate),
        visitTime: body.visitTime,
        executive: body.executive,
        notes: body.notes || "",
      },
    });

    return NextResponse.json({
      success: true,
      visit,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create site visit",
      },
      {
        status: 500,
      }
    );
  }
}