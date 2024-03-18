import { ContributeEmailTemplate } from '@/components/emails/contribute';
import { NextResponse } from 'next/server'
import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { name, productName, link, description } = await request.json();

        const data = await resend.emails.send({
            from: 'SpaceHunt <contribute@spacehunt.io>',
            to: ['contact@spacehunt.io'],
            subject: 'New contribute from ' + name,
            react: ContributeEmailTemplate({
                name: name,
                productName: productName,
                link: link,
                description: description
            }) as React.ReactElement,
        });

        return Response.json(data)
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}
