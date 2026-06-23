import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  return NextResponse.json({
    status: "CRM API ONLINE",
  });
}

export async function POST(request: Request) {
  console.log("LEADS IMPORT ROUTE HIT");

  try {
    let body: any;

    try {
      body = await request.json();
      console.log("REQUEST BODY RECEIVED");
    } catch {
      console.log("INVALID JSON RECEIVED");

      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON",
        },
        {
          status: 400,
        }
      );
    }

    const lead = await prisma.lead.upsert({
      where: {
        leadId:
          body.submission_id ||
          Date.now().toString(),
      },

      update: {},

      create: {
        leadId:
          body.submission_id ||
          Date.now().toString(),

        fullName: `${body.first_name || ""} ${
          body.last_name || ""
        }`.trim(),

        phone: body.phone || "",

        email: body.email || "",

        source: body.source || "Website",

        project:
          body.project ||
          "Website Inquiry",

        city: body.city || "",

        country: body.country || "",

        propertyType:
          body.propertyType || "",

        propertyInterested:
          body.propertyInterested || "",

        budget: body.budget || "",

        quotedPrice:
          body.quotedPrice || "",

        unitPrice:
          body.unitPrice || "",

        purpose: body.purpose || "",

        notes: body.message || "",

        status: "New",

        temperature: "Warm",
      },
    });

    console.log("IMPORT COMPLETE");
    console.log("Lead ID:", lead.id);
    console.log("Lead Number:", lead.leadId);
    console.log("Calling Dispatcher...");

    try {
      const dispatcherResponse = await fetch(
        `https://rainger-realty-crm.vercel.app/api/dispatcher`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            leadId: lead.id,
          }),
        }
      );

      console.log(
        "Dispatcher Status:",
        dispatcherResponse.status
      );

      const dispatcherResult =
        await dispatcherResponse.text();

      console.log(
        "Dispatcher Response:",
        dispatcherResult
      );

      console.log(
        "Dispatcher Request Sent"
      );
    } catch (dispatcherError) {
      console.error(
        "Dispatcher Error:",
        dispatcherError
      );
    }

    return NextResponse.json({
      success: true,
      lead,
    });
  } catch (error) {
    console.error(
      "IMPORT ROUTE ERROR:",
      error
    );

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