import { registerAs } from '@nestjs/config';
import { JwtModuleOptions, JwtSignOptions } from '@nestjs/jwt';

export default registerAs(
  'jwt',
  (): JwtModuleOptions => ({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn:
        (process.env.JWT_EXPIRATION as JwtSignOptions['expiresIn']) || '60s',
    },
  }),
);
