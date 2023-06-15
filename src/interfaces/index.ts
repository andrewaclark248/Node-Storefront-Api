import { User } from '../models/user'

export interface AuthenticateResult {
    user: User | null;
    success: boolean;
}