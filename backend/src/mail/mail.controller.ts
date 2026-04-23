import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorators';
import { ContactDto } from './dto/create-contact-mail.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Public()
  @Post('contact')
  sendContactEmail(@Body() contactDto: ContactDto) {
    // Implement the logic to send contact email using mailService
    return this.mailService.sendContactEmail(contactDto);
  }
}
