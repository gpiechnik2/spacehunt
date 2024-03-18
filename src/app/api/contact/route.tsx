import { ContactEmailTemplate } from '@/components/emails/contact';
import { NextResponse } from 'next/server'
import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { email, message } = await request.json();

        const data = await resend.emails.send({
            from: 'SpaceHunt <contactus@spacehunt.io>',
            to: ['contact@spacehunt.io'],
            subject: 'Contact from ' + email,
            react: ContactEmailTemplate({
                email: email,
                message: message
            }) as React.ReactElement,
        });

        return Response.json(data)
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}
