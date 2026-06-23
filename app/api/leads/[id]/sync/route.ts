import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const lead = await prisma.lead.findUnique({
      where: {
        id,
      },
      include: {
        callLogs: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
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

    const latestCall = lead.callLogs[0];

    const payload = {
      CRM_ID: lead.id,
      SOURCE: lead.source,
      Status: lead.status,
      Temperature: lead.temperature,
      Product: lead.propertyType || "",
      Project: lead.project || "",
      Options: lead.propertyInterested || "",
      QUOTE:
        lead.quotedPrice ||
        lead.unitPrice ||
        lead.budget ||
        "",
      Name: lead.fullName || "",
      City: lead.city || "",
      Country: lead.country || "",
      Mobile: lead.phone || "",
      Email: lead.email || "",
      Purpose: lead.purpose || "",
      LatestRemarks:
        latestCall?.summary || "",
      RRRemarks: lead.notes || "",
      NextFollowUpDate:
        lead.nextFollowUpDate || null,
    };

    const makeWebhook =
      process.env.MAKE_SYNC_WEBHOOK;

    if (!makeWebhook) {
      return NextResponse.json(
        {
          success: false,
          error: "MAKE_SYNC_WEBHOOK missing",
        },
        {
          status: 500,
        }
      );
    }

    await fetch(makeWebhook, {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({
      success: true,
      synced: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Sync failed",
      },
      {
        status: 500,
      }
    );
  }
}