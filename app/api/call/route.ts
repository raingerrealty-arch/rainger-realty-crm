import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const lead = await prisma.lead.findUnique({
      where: {
        id: body.leadId,
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

    /*
      TEMP AI SIMULATION

      Later ElevenLabs will return:
      Interested
      Not Interested
      Follow Up
      Site Visit Requested
    */

    const outcomes = [
      {
        outcome: "Interested",
        summary:
          "Lead showed strong interest and wants more information.",
      },
      {
        outcome: "Follow Up",
        summary:
          "Lead requested a follow-up call next week.",
      },
      {
        outcome: "Not Interested",
        summary:
          "Lead is not interested at this time.",
      },
      {
        outcome: "Site Visit Requested",
        summary:
          "Lead requested a site visit.",
      },
    ];

    const aiResult =
      outcomes[Math.floor(Math.random() * outcomes.length)];

    const callLog = await prisma.callLog.create({
      data: {
        leadId: lead.id,
        outcome: aiResult.outcome,
        summary: aiResult.summary,
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
        error: "Failed to start call",
      },
      {
        status: 500,
      }
    );
  }
}