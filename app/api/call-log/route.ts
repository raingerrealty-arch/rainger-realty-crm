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

    switch (outcome) {
      case "Interested":
        status = "Interested";
        temperature = "Hot";

        nextFollowUpDate = new Date(today);
        nextFollowUpDate.setDate(today.getDate() + 2);
        break;

      case "Follow Up":
        status = "Follow Up";
        temperature = "Warm";

        nextFollowUpDate = new Date(today);
        nextFollowUpDate.setDate(today.getDate() + 7);
        break;

      case "Visit Booked":
        status = "Site Visit";
        temperature = "Hot";

        nextFollowUpDate = null;
        break;

      case "Not Interested":
        status = "Closed";
        temperature = "Cold";
        break;

      default:
        status = "Contacted";
        temperature = "Warm";
    }

    // Create Call Log
    const callLog = await prisma.callLog.create({
      data: {
        leadId: lead.id,
        outcome,
        summary: body.summary || "",
        siteVisitResult: body.visitDate || "",
      },
    });

    // Create Site Visit if AI booked one
    if (outcome === "Visit Booked" && body.visitDate) {
      const visitDate = new Date(body.visitDate);

      const existingVisit = await prisma.siteVisit.findFirst({
        where: {
          leadId: lead.id,
          visitDate,
        },
      });

      if (!existingVisit) {
        await prisma.siteVisit.create({
          data: {
            leadId: lead.id,
            visitDate,
            visitTime: body.visitTime || "",
            executive: "AI Scheduled",
            status: "Scheduled",
            notes: body.summary || "",
          },
        });
      }
    }

    // Update Lead
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