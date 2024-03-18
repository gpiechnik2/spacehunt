import * as React from 'react';


interface ContactEmailTemplateProps {
    email: string
    message: string
}

export const ContactEmailTemplate: React.FC<Readonly<ContactEmailTemplateProps>> = ({
    email,
    message
}) => (
    <div>
        <h1>New email from {email}</h1>
        {message}
    </div>
);

