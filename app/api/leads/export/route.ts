import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      include: {
        callLogs: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedLeads = leads.map((lead) => {
      const latestCall = lead.callLogs[0];

      const createdDate = new Date(lead.createdAt);

      const followUpDate =
        (lead as any).nextFollowUpDate
          ? new Date((lead as any).nextFollowUpDate)
          : null;

        return {
  CRM_ID: lead.id,
  Lead_ID: lead.leadId,

        SOURCE: lead.source,

        DD: createdDate.getDate(),
        MM: createdDate.getMonth() + 1,
        YYYY: createdDate.getFullYear(),

        THRU: lead.source,

        Status: lead.status,

        Product: (lead as any).propertyType || "",

        Project: lead.project || "",

        Options: (lead as any).propertyInterested || "",

        QUOTE:
          (lead as any).quotedPrice ||
          (lead as any).unitPrice ||
          lead.budget ||
          "",

        Name: lead.fullName || "",

        "State - City": (lead as any).city || "",

        Country: (lead as any).country || "",

        Mobile: lead.phone || "",

        email: lead.email || "",

        Purpose: (lead as any).purpose || "",

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
      };
    });

    return NextResponse.json(formattedLeads);
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Unknown Error",
        stack: error?.stack || null,
      },
      {
        status: 500,
      }
    );
  }
}