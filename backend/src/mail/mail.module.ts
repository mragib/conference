import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/adapters/pug.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import mailConfig from 'src/config/mail.config';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mailConfig],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const mail = configService.get('mail');

        return {
          transport: {
            host: mail.host,
            port: mail.port,
            secure: false,
            tls: {
              rejectUnauthorized: false,
            },
            auth: {
              user: mail.user,
              pass: mail.pass,
            },
          },
          defaults: {
            from: mail.from,
          },
          template: {
            dir: __dirname + '/../../templates',
            adapter: new PugAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
