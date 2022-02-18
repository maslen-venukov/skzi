import jwt from 'jsonwebtoken'

export class TokenService {
  private static secret = process.env.JWT_SECRET as string

  static generate(payload: any) {
    return jwt.sign(payload, this.secret, { expiresIn: '60m' })
  }

  static validate(token: string) {
    return jwt.verify(token, this.secret)
  }
}