export async function makeCall({
  leadId,
  name,
  phone,
}: {
  leadId: string;
  name: string;
  phone: string;
}) {
  const ELEVENLABS_API_KEY =
    process.env.ELEVENLABS_API_KEY;

  const ELEVENLABS_AGENT_ID =
    process.env.ELEVENLABS_AGENT_ID;

  const ELEVENLABS_PHONE_NUMBER_ID =
    process.env.ELEVENLABS_PHONE_NUMBER_ID;

  // Development Mode
  if (
  !ELEVENLABS_API_KEY ||
  !ELEVENLABS_AGENT_ID ||
  !ELEVENLABS_PHONE_NUMBER_ID
) {
  throw new Error(
    "ElevenLabs credentials missing"
  );
}

  const response = await fetch(
    "https://api.elevenlabs.io/v1/convai/calls",
    {
      method: "POST",
      headers: {
        "xi-api-key":
          ELEVENLABS_API_KEY,
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        agent_id:
          ELEVENLABS_AGENT_ID,

        phone_number_id:
          ELEVENLABS_PHONE_NUMBER_ID,

        customer: {
          phone_number: phone,
          name,
        },

        metadata: {
          leadId,
        },
      }),
    }
  );

  const result =
    await response.json();

  return result;
}