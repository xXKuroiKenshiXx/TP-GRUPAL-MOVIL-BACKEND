import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as hbs from 'nodemailer-express-handlebars';
import * as path from 'path';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
      },
    });

    this.transporter.use('compile', hbs({
      viewEngine: {
        extName: '.hbs',
        partialsDir: path.resolve('./src/templates/'),
        defaultLayout: false,
      },
      viewPath: path.resolve('./src/templates/'),
      extName: '.hbs',
    }));
  }

  async sendMail(to: string, subject: string, template: string, context: any) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      template,
      context,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
