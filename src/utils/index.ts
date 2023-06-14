import jwt, { Secret } from "jsonwebtoken"
import { User } from "../models/user"

const SECRET = process.env.TOKEN_SECRET as Secret

export function getTokenByUser (user: User) {
  return jwt.sign({user}, SECRET)
}
