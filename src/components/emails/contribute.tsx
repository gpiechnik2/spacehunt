import * as React from 'react';


interface ContributeEmailTemplateProps {
    name: string
    productName: string
    link: string
    description: string
}

export const ContributeEmailTemplate: React.FC<Readonly<ContributeEmailTemplateProps>> = ({
    name,
    productName,
    link,
    description
}) => (
    <div>
        <h1>New contribiution from {name}!</h1>
        Product name: {productName}
        Link: {link}
        Description: {description}
    </div>
);

