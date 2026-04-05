import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

export default registerAs(
  'refresh',
  (): JwtSignOptions => ({
    secret: process.env.REFRESH_TOKEN_SECRET,
    expiresIn: process.env
      .REFRESH_TOKEN_EXPIRATION as JwtSignOptions['expiresIn'],
    //   : process.env.REFRESH_TOKEN_EXPIRATION,
  }),
);
