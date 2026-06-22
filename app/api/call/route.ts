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

    const outcomes = [
      {
        outcome: "Interested",
        summary:
          "Lead showed strong interest and wants more information.",
        status: "Interested",
        nextFollowUpDays: 2,
      },
      {
        outcome: "Follow Up",
        summary:
          "Lead requested a follow-up call next week.",
        status: "Follow Up",
        nextFollowUpDays: 7,
      },
      {
        outcome: "Not Interested",
        summary:
          "Lead is not interested at this time.",
        status: "Not Interested",
        nextFollowUpDays: null,
      },
      {
        outcome: "Site Visit Requested",
        summary:
          "Lead requested a site visit.",
        status: "Site Visit",
        nextFollowUpDays: 1,
      },
    ];

    const aiResult =
      outcomes[Math.floor(Math.random() * outcomes.length)];

    let nextFollowUpDate: Date | null = null;

    if (aiResult.nextFollowUpDays) {
      nextFollowUpDate = new Date();

      nextFollowUpDate.setDate(
        nextFollowUpDate.getDate() +
          aiResult.nextFollowUpDays
      );
    }

    const callLog = await prisma.callLog.create({
      data: {
        leadId: lead.id,
        outcome: aiResult.outcome,
        summary: aiResult.summary,
      },
    });

    await prisma.lead.update({
      where: {
        id: lead.id,
      },
      data: {
        status: aiResult.status,
        notes: aiResult.summary,
        nextFollowUpDate,
      },
    });

    return NextResponse.json({
      success: true,
      callLog,
      aiResult,
      nextFollowUpDate,
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