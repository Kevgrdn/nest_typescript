import { CanActivate, ExecutionContext, Injectable, forwardRef } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,

  ){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>()
    const token = req.headers["authorization"]
    const isValidToken = this.authService.isValidToken(token)

    return isValidToken;
  }
}
