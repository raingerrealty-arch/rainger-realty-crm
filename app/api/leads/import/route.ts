import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  return NextResponse.json({
    status: "CRM API ONLINE",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const lead = await prisma.lead.create({
      data: {
        leadId: body.submission_id || Date.now().toString(),
        fullName: `${body.first_name || ""} ${body.last_name || ""}`.trim(),
        phone: body.phone || "",
        email: body.email || "",
        project: body.project || "Website Inquiry",
        source: "Contact Form 7",
        notes: body.message || "",
      },
    });

    return NextResponse.json({
      success: true,
      lead,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to save lead",
      },
      {
        status: 500,
      }
    );
  }
}