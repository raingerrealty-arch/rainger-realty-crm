import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("BODY RECEIVED");
console.log(JSON.stringify(body, null, 2));

    const lead = await prisma.lead.findFirst({
      where: {
        OR: [
          { leadId: body.leadId },
          { phone: body.phone }
        ]
      }
    });

    if (!lead) {
      return NextResponse.json(
        {
          success: false,
          error: "Lead not found"
        },
        { status: 404 }
      );
    }

    const callLog = await prisma.callLog.create({
      data: {
        leadId: lead.id,
        outcome: body.callStatus || "",
        summary: body.callSummary || "",
        siteVisitResult:
          body.visitDate || ""
      }
    });

    return NextResponse.json({
      success: true,
      callLog
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed"
      },
      { status: 500 }
    );
  }
}