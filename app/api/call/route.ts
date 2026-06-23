import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { makeCall } from "../../../lib/elevenlabs";

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

    // Create call initiation log
    const callLog = await prisma.callLog.create({
      data: {
        leadId: lead.id,
        outcome: "Calling",
        summary:
          "AI outbound call initiated and waiting for completion.",
      },
    });

    // Update lead status
    await prisma.lead.update({
      where: {
        id: lead.id,
      },
      data: {
        status: "Calling",
      },
    });

   await makeCall({
  leadId: lead.leadId,
  name: lead.fullName,
  phone: lead.phone,
});

    return NextResponse.json({
      success: true,
      message: "Call initiated",
      callLog,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to initiate call",
      },
      {
        status: 500,
      }
    );
  }
}