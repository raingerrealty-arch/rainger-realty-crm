import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("=================================");
    console.log("DISPATCHER STARTED");
    console.log("Lead ID:", body.leadId);

    const lead = await prisma.lead.findUnique({
      where: {
        id: body.leadId,
      },
    });

    if (!lead) {
      console.log("Lead Not Found");

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

    console.log("Lead Found");
    console.log("Lead ID:", lead.leadId);
    console.log("Name:", lead.fullName);
    console.log("Phone:", lead.phone);

    const now = new Date();

    const indiaTime = new Date(
      now.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      })
    );

    const hour = indiaTime.getHours();

    console.log("Current IST Hour:", hour);

    const autoCallAllowed =
      hour >= 11 && hour < 17;

    if (!autoCallAllowed) {
      console.log(
        "Outside Calling Window"
      );

      return NextResponse.json({
        success: true,
        autoCall: false,
        message:
          "Outside auto-calling window",
      });
    }

    console.log(
      "Inside Calling Window"
    );

    console.log(
      "Waiting 45 seconds..."
    );

    await new Promise((resolve) =>
      setTimeout(resolve, 45000)
    );

    console.log(
      "45 Second Delay Complete"
    );

    console.log(
      "READY FOR ELEVENLABS CALL"
    );

    console.log("=================================");

    return NextResponse.json({
      success: true,
      autoCall: true,
      message:
        "Dispatcher completed successfully",
    });
  } catch (error) {
    console.error(
      "Dispatcher Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Dispatcher failed",
      },
      {
        status: 500,
      }
    );
  }
}