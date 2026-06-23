import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const updatedLead = await prisma.lead.update({
      where: {
        id: body.id,
      },
      data: {
        status: body.status,
        temperature: body.temperature,
        purpose: body.purpose,
        budget: body.budget,
        quotedPrice: body.quotedPrice,
        unitPrice: body.unitPrice,
        propertyType: body.propertyType,
        propertyInterested: body.propertyInterested,
        notes: body.notes,
        nextFollowUpDate: body.nextFollowUpDate
          ? new Date(body.nextFollowUpDate)
          : null,
      },
    });

    return NextResponse.json({
      success: true,
      updatedLead,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update lead",
      },
      {
        status: 500,
      }
    );
  }
}