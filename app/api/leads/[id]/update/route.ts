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

    await fetch(
  "https://hook.eu1.make.com/2n4solc94v192a0pkyl2e95hu4ck6ptf",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedLead),
  }
);

return NextResponse.json({
  success: true,
  lead: updatedLead,
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