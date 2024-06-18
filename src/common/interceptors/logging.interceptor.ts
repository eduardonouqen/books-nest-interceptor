import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { request } from 'http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const now = Date.now();
        const method = context.getHandler().name;
        const route = context.getClass().name;
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();
        const requestMethod = request.method;

        return next
            .handle()
            .pipe(
                tap(() => console.log(`O método ${method} com requisição ${requestMethod} na rota ${route} durou ${Date.now() - now}ms `)),
            );
    }
}