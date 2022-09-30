import { Injectable } from '@nestjs/common';

const API_TOKEN = "ThisIsASecretToken"

@Injectable()
export class AuthService {

    isValidToken(token: string): boolean {
        return token === API_TOKEN
    }
}
