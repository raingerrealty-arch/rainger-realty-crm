import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const lead = await prisma.lead.findFirst({
      where: {
        leadId: body.leadId,
      },
    });

    if (!lead) {
      return NextResponse.json(
        {
          success: false,
          error: "Lead not found",
        },
        {
          status: 404,
        }
      );
    }

    const callLog = await prisma.callLog.create({
      data: {
        leadId: lead.id,
        outcome: body.outcome,
        summary: body.summary,
      },
    });

    return NextResponse.json({
      success: true,
      callLog,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create call log",
      },
      {
        status: 500,
      }
    );
  }
}