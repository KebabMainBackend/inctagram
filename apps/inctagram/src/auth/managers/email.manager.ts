import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    // Create a Nodemailer transporter with your email configuration
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: 'gmail',
      auth: {
        user: 'johnny178917@gmail.com',
        pass: process.env.GOOGLE_PASSWORD,
      },
    });
  }

  async sendMail(
    mailDetails: Mail.Options,
    callback?: (info: SMTPTransport.SentMessageInfo) => void,
  ): Promise<void> {
    try {
      const info = await this.transporter.sendMail(mailDetails);
      callback(info);
    } catch (e) {
      throw Error('Error during email sending');
    }
  }

  async sendConfirmationCodeEmail(
    userEmail: string,
    message: string,
    subject: string,
  ) {
    const messageTemplate = `
            <h1>Thanks for your registration</h1>
            <p>To finish registration please follow the link below:
                <a href='https://inctagram.fun/confirm-email?code=${message}&email=${userEmail}'>complete registration</a>
            </p>`;
    const options = {
      from: 'Johnny <johnny178917@gmail.com>',
      to: userEmail,
      subject: subject,
      html: messageTemplate,
    };
    try {
      await this.sendMail(options, () => {
        console.log('Email is delivered successfully');
        return true;
      });
    } catch (e) {
      throw Error('second error');
    }
  }

  async sendRecoveryCodeEmail(
    userEmail: string,
    message: string,
    subject: string,
  ) {
    const messageTemplate = `
            <h1>Password recovery</h1>
            <p>To finish password recovery please follow the link below:
                <a href='https://inctagram.fun/password-recovery?recoveryCode=${message}'>recovery password</a>
            </p>`;
    const options = {
      from: 'Johnny <johnny178917@gmail.com>',
      to: userEmail,
      subject: subject,
      html: messageTemplate,
    };
    try {
      await this.sendMail(options);
    } catch (e) {
      throw Error('second error');
    }
  }

  async sendNotificationEmail(userEmail: string) {
    const messageTemplate = `
            <h1>Congratulations!</h1>
            <p>You registered in our service
                <a href='https://inctagram.fun'>Inctagram</a>
            </p>`;
    const options = {
      from: 'Johnny <johnny178917@gmail.com>',
      to: userEmail,
      subject: 'Successful registration',
      html: messageTemplate,
    };
    try {
      await this.sendMail(options, () => {
        console.log('notification Email is delivered successfully');
        return true;
      });
    } catch (e) {
      throw Error('second error');
    }
  }
}
