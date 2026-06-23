import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET(
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

    const createdDate = new Date(lead.createdAt);

    const followUpDate = lead.nextFollowUpDate
      ? new Date(lead.nextFollowUpDate)
      : null;

    return NextResponse.json({
  SOURCE: lead.source,

  DD: createdDate.getDate(),
  MM: createdDate.getMonth() + 1,
  YYYY: createdDate.getFullYear(),

  THRU: lead.source,

  Status: lead.status,

  Product: lead.propertyType || "",

  Project: lead.project || "",

  Options: lead.propertyInterested || "",

  QUOTE:
    lead.quotedPrice ||
    lead.unitPrice ||
    lead.budget ||
    "",

  Name: lead.fullName || "",

  "State - City": lead.city || "",

  Country: lead.country || "",

  Mobile: lead.phone || "",

  email: lead.email || "",

  Purpose: lead.purpose || "",

  "Latest Remarks":
    latestCall?.summary || "",

  "RR Remarks":
    lead.notes || "",

  dd: followUpDate
    ? followUpDate.getDate()
    : "",

  mm: followUpDate
    ? followUpDate.getMonth() + 1
    : "",

  yyyy: followUpDate
    ? followUpDate.getFullYear()
    : "",
});
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed",
      },
      {
        status: 500,
      }
    );
  }
}