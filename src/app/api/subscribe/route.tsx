import { NextResponse } from 'next/server'
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { email } = await request.json();
        const audienceId = `${process.env.RESEND_SPACEHUNT_AUDIENCE_ID}`

        const { data, error } = await resend.contacts.create({
            email: email,
            unsubscribed: false,
            audienceId: audienceId,
        });

        if (error) {
            return NextResponse.json({ message: error }, { status: 500 })
        }

        return Response.json(data)
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}
