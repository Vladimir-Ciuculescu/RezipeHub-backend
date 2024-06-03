import { MailtrapClient } from 'mailtrap';

import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  async sendMail(to: string, from: string, subject: string, text: string) {
    const TOKEN = process.env.MAILTRAP_TOKEN;
    const ENDPOINT = process.env.MAILTRAP_ENDPOINT;

    //@ts-ignore
    const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

    const sender = {
      email: from,
      name: subject,
    };

    const recipients = [
      {
        email: to,
      },
    ];

    try {
      await client.send({
        from: sender,
        to: recipients,
        subject,
        text,
        category: 'Integration Test',
      });
    } catch (error: any) {
      console.log(error);
    }
  }
}
