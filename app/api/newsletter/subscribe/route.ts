import { NextResponse } from "next/server";

// In-memory set for deduplicating subscriptions across server lifecycle
const subscribers = new Set<string>();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "Email address is required." },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Standard RFC-compliant email validation regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (subscribers.has(trimmedEmail)) {
      return NextResponse.json(
        {
          success: false,
          error: "This email address is already subscribed to The Adda Gazette.",
        },
        { status: 409 }
      );
    }

    // Register new subscriber
    subscribers.add(trimmedEmail);

    return NextResponse.json(
      {
        success: true,
        message: "Namaste! Your subscription to The Adda Gazette is confirmed.",
        email: trimmedEmail,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
