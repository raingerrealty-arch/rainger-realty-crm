import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("=================================");
    console.log("BODY RECEIVED");
    console.log(JSON.stringify(body, null, 2));
    console.log("=================================");

    const lead = await prisma.lead.findFirst({
      where: {
        OR: [
          { leadId: body.leadId },
          { phone: body.phone }
        ]
      }
    });

    if (!lead) {
      console.log("LEAD NOT FOUND");

      return NextResponse.json(
        {
          success: false,
          error: "Lead not found"
        },
        { status: 404 }
      );
    }

    console.log("LEAD FOUND:", lead.id);

    console.log("CALL SUMMARY VALUE:");
    console.log(body.callSummary);
    console.log("TYPE:");
    console.log(typeof body.callSummary);

    const callLog = await prisma.callLog.create({
      data: {
        leadId: lead.id,
        outcome: String(body.callStatus || ""),
        summary: String(body.callSummary || ""),
        siteVisitResult: String(body.visitDate || "")
      }
    });

    console.log("CALL LOG CREATED");
    console.log(callLog.id);

    return NextResponse.json({
      success: true,
      callLog
    });

  } catch (error) {
    console.error("CALL LOG IMPORT ERROR:");
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create call log"
      },
      { status: 500 }
    );
  }
}