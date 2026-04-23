import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailConfig } from 'src/config/mail.config';
import { ContactDto } from './dto/create-contact-mail.dto';

@Injectable()
export class MailService {
  private from: string;

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {
    const mail = this.configService.get<MailConfig>('mail');
    this.from = mail?.from || 'no-reply@example.com';
  }
  async sendEmail(
    to: string,
    subject: string,
    template: string,
    context: Record<string, any>,
  ) {
    try {
      const response = await this.mailerService.sendMail({
        to,
        from: this.from,
        subject,
        template,
        context,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async sendContactEmail(contactDto: ContactDto) {
    const { fullName, email, message } = contactDto;
    const subject = `New Contact Message from ${fullName}`;
    const template = 'contact-email';
    const context = {
      fullName,
      email,
      message,
    };

    const adminEmailAddress =
      this.configService.get<string>('ADMIN_EMAIL') ||
      'ragib.shahriar@ewubd.edu';

    const customerEmail = await this.sendEmail(
      email,
      subject,
      template,
      context,
    );
    const adminEmail = await this.sendEmail(
      adminEmailAddress,
      subject,
      'admin-contact-email',
      { ...context, email },
    );

    return { customerEmail, adminEmail };
  }
}
