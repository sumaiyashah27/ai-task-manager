import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // Access token generate
  generateAccessToken(userId: string) {
    return this.jwtService.sign({ sub: userId });
  }

  // Refresh token generate (different secret)
  generateRefreshToken(userId: string) {
    return this.jwtService.sign(
      { sub: userId },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
      },
    );
  }
}
