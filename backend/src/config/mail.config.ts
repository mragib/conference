import { registerAs } from '@nestjs/config';

export interface MailConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
}

export default registerAs(
  'mail',
  (): MailConfig => ({
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.FROM || '',
  }),
);
