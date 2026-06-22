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

    const lead = await prisma.lead.upsert({
      where: {
        leadId: body.submission_id || Date.now().toString(),
      },

      update: {},

      create: {
        leadId: body.submission_id || Date.now().toString(),

        fullName: `${body.first_name || ""} ${body.last_name || ""}`.trim(),

        phone: body.phone || "",

        email: body.email || "",

        source: body.source || "Website",

        project: body.project || "Website Inquiry",

        city: body.city || "",

        country: body.country || "",

        propertyType: body.propertyType || "",

        propertyInterested: body.propertyInterested || "",

        budget: body.budget || "",

        quotedPrice: body.quotedPrice || "",

        unitPrice: body.unitPrice || "",

        purpose: body.purpose || "",

        notes: body.message || "",

        status: "New",

        temperature: "Warm",
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