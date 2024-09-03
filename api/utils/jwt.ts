import { sign } from 'jsonwebtoken'

export function generateJwt (email:string) {
    return sign({ email: email }, process.env.JWT_SECRET_KEY)
}