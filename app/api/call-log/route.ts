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

    const outcome = body.outcome || "Follow Up";

    let status = "Contacted";
    let temperature = "Warm";

    let nextFollowUpDate: Date | null = null;

    const today = new Date();

    if (outcome === "Interested") {
      status = "Interested";
      temperature = "Hot";

      nextFollowUpDate = new Date(today);
      nextFollowUpDate.setDate(today.getDate() + 2);
    }

    if (outcome === "Follow Up") {
      status = "Follow Up";
      temperature = "Warm";

      nextFollowUpDate = new Date(today);
      nextFollowUpDate.setDate(today.getDate() + 7);
    }

    if (outcome === "Not Interested") {
      status = "Closed";
      temperature = "Cold";
    }

    const callLog = await prisma.callLog.create({
      data: {
        leadId: lead.id,
        outcome,
        summary: body.summary,
      },
    });

    await prisma.lead.update({
  where: {
    id: lead.id,
  },
  data: {
    status,
    temperature,
    nextFollowUpDate,
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