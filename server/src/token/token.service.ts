import jwt from 'jsonwebtoken'

class TokenService {
  private secret = process.env.JWT_SECRET as string

  generate(payload: any) {
    return jwt.sign(payload, this.secret, { expiresIn: '60m' })
  }

  validate(token: string) {
    return jwt.verify(token, this.secret)
  }
}

export const tokenService = new TokenService()