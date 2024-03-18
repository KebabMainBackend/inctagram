/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/inctagram/src/app.controller.ts":
/*!**********************************************!*\
  !*** ./apps/inctagram/src/app.controller.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./apps/inctagram/src/app.service.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
let AppController = exports.AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiExcludeEndpoint)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ }),

/***/ "./apps/inctagram/src/app.module.ts":
/*!******************************************!*\
  !*** ./apps/inctagram/src/app.module.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const path_1 = __webpack_require__(/*! path */ "path");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const throttler_1 = __webpack_require__(/*! @nestjs/throttler */ "@nestjs/throttler");
const serve_static_1 = __webpack_require__(/*! @nestjs/serve-static */ "@nestjs/serve-static");
const app_controller_1 = __webpack_require__(/*! ./app.controller */ "./apps/inctagram/src/app.controller.ts");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./apps/inctagram/src/app.service.ts");
const auth_module_1 = __webpack_require__(/*! ./auth/auth.module */ "./apps/inctagram/src/auth/auth.module.ts");
const security_devices_module_1 = __webpack_require__(/*! ./features/security-devices/security-devices.module */ "./apps/inctagram/src/features/security-devices/security-devices.module.ts");
const profile_module_1 = __webpack_require__(/*! ./features/profile/profile.module */ "./apps/inctagram/src/features/profile/profile.module.ts");
const posts_module_1 = __webpack_require__(/*! ./features/posts/posts.module */ "./apps/inctagram/src/features/posts/posts.module.ts");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)('D:\\job\\inctagram\\apps\\inctagram\\swagger-static'),
                serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger',
            }),
            auth_module_1.AuthModule,
            security_devices_module_1.SecurityDevicesModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env', '.env.dev'],
            }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 10000,
                    limit: 5,
                },
            ]),
            posts_module_1.PostsModule,
            profile_module_1.ProfileModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);


/***/ }),

/***/ "./apps/inctagram/src/app.service.ts":
/*!*******************************************!*\
  !*** ./apps/inctagram/src/app.service.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let AppService = exports.AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
};
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ }),

/***/ "./apps/inctagram/src/app.settings.ts":
/*!********************************************!*\
  !*** ./apps/inctagram/src/app.settings.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.appSettings = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const cookieParser = __webpack_require__(/*! cookie-parser */ "cookie-parser");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./apps/inctagram/src/app.module.ts");
const http_exception_filter_1 = __webpack_require__(/*! ./modules/filters/http-exception.filter */ "./apps/inctagram/src/modules/filters/http-exception.filter.ts");
const appSettings = (app) => {
    app.use(cookieParser());
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new common_1.ValidationPipe({
        stopAtFirstError: true,
        whitelist: true,
        transform: true,
        exceptionFactory: (errors) => {
            const respErrors = [];
            errors.forEach((error) => {
                const keys = Object.keys(error.constraints);
                keys.forEach((key) => {
                    respErrors.push({
                        message: error.constraints[key],
                        field: error.property,
                    });
                });
            });
            throw new common_1.BadRequestException(respErrors);
        },
    }));
    app.enableCors({
        origin: [
            'https://inctagram.fun',
            'http://localhost:3000',
            'http://localhost:5173',
            'http://localhost:3001',
        ],
        credentials: true,
    });
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
};
exports.appSettings = appSettings;


/***/ }),

/***/ "./apps/inctagram/src/auth/api/auth.controller.ts":
/*!********************************************************!*\
  !*** ./apps/inctagram/src/auth/api/auth.controller.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const express_1 = __webpack_require__(/*! express */ "express");
const auth_register_dto_1 = __webpack_require__(/*! ./dto/auth-register.dto */ "./apps/inctagram/src/auth/api/dto/auth-register.dto.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const throttler_1 = __webpack_require__(/*! @nestjs/throttler */ "@nestjs/throttler");
const swagger_constants_1 = __webpack_require__(/*! ../../utils/constants/swagger-constants */ "./apps/inctagram/src/utils/constants/swagger-constants.ts");
const auth_login_dto_1 = __webpack_require__(/*! ./dto/auth-login.dto */ "./apps/inctagram/src/auth/api/dto/auth-login.dto.ts");
const create_refresh_token_command_1 = __webpack_require__(/*! ../application/use-cases/create-refresh-token.command */ "./apps/inctagram/src/auth/application/use-cases/create-refresh-token.command.ts");
const create_access_token_command_1 = __webpack_require__(/*! ../application/use-cases/create-access-token.command */ "./apps/inctagram/src/auth/application/use-cases/create-access-token.command.ts");
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const auth_verify_email_dto_1 = __webpack_require__(/*! ./dto/auth-verify-email.dto */ "./apps/inctagram/src/auth/api/dto/auth-verify-email.dto.ts");
const decode_refresh_token_command_1 = __webpack_require__(/*! ../application/use-cases/decode-refresh-token.command */ "./apps/inctagram/src/auth/application/use-cases/decode-refresh-token.command.ts");
const delete_device_command_1 = __webpack_require__(/*! ../../features/security-devices/commands/delete-device.command */ "./apps/inctagram/src/features/security-devices/commands/delete-device.command.ts");
const auth_password_recovery_dto_1 = __webpack_require__(/*! ./dto/auth-password-recovery.dto */ "./apps/inctagram/src/auth/api/dto/auth-password-recovery.dto.ts");
const auth_resend_code_dto_1 = __webpack_require__(/*! ./dto/auth-resend-code.dto */ "./apps/inctagram/src/auth/api/dto/auth-resend-code.dto.ts");
const auth_new_password_dto_1 = __webpack_require__(/*! ./dto/auth-new-password.dto */ "./apps/inctagram/src/auth/api/dto/auth-new-password.dto.ts");
const change_user_password_1 = __webpack_require__(/*! ../application/use-cases/change-user-password */ "./apps/inctagram/src/auth/application/use-cases/change-user-password.ts");
const bearer_auth_guard_1 = __webpack_require__(/*! ../guards/bearer-auth.guard */ "./apps/inctagram/src/auth/guards/bearer-auth.guard.ts");
const password_recovery_command_1 = __webpack_require__(/*! ../application/use-cases/password-recovery.command */ "./apps/inctagram/src/auth/application/use-cases/password-recovery.command.ts");
const resend_confirmation_code_command_1 = __webpack_require__(/*! ../application/use-cases/resend-confirmation-code.command */ "./apps/inctagram/src/auth/application/use-cases/resend-confirmation-code.command.ts");
const register_user_command_1 = __webpack_require__(/*! ../application/use-cases/register-user.command */ "./apps/inctagram/src/auth/application/use-cases/register-user.command.ts");
const check_credentials_command_1 = __webpack_require__(/*! ../application/use-cases/check-credentials.command */ "./apps/inctagram/src/auth/application/use-cases/check-credentials.command.ts");
const verify_confirmation_code_command_1 = __webpack_require__(/*! ../application/use-cases/verify-confirmation-code.command */ "./apps/inctagram/src/auth/application/use-cases/verify-confirmation-code.command.ts");
const delete_user_command_1 = __webpack_require__(/*! ../test/delete-user.command */ "./apps/inctagram/src/auth/test/delete-user.command.ts");
const add_refresh_to_blacklist_1 = __webpack_require__(/*! ../application/use-cases/add-refresh-to-blacklist */ "./apps/inctagram/src/auth/application/use-cases/add-refresh-to-blacklist.ts");
const update_refresh_token_command_1 = __webpack_require__(/*! ../application/use-cases/update-refresh-token.command */ "./apps/inctagram/src/auth/application/use-cases/update-refresh-token.command.ts");
const user_decorator_1 = __webpack_require__(/*! ../../utils/decorators/user.decorator */ "./apps/inctagram/src/utils/decorators/user.decorator.ts");
const types_1 = __webpack_require__(/*! ../../types */ "./apps/inctagram/src/types/index.ts");
const check_verify_code_dto_1 = __webpack_require__(/*! ./dto/check-verify-code.dto */ "./apps/inctagram/src/auth/api/dto/check-verify-code.dto.ts");
const check_recovery_code_command_1 = __webpack_require__(/*! ../application/use-cases/check-recovery-code.command */ "./apps/inctagram/src/auth/application/use-cases/check-recovery-code.command.ts");
const auth_resend_recovery_code_dto_1 = __webpack_require__(/*! ./dto/auth-resend-recovery-code.dto */ "./apps/inctagram/src/auth/api/dto/auth-resend-recovery-code.dto.ts");
const resend_recovery_code_command_1 = __webpack_require__(/*! ../application/use-cases/resend-recovery-code.command */ "./apps/inctagram/src/auth/application/use-cases/resend-recovery-code.command.ts");
const cookie_options_1 = __webpack_require__(/*! ../../utils/constants/cookie-options */ "./apps/inctagram/src/utils/constants/cookie-options.ts");
let AuthController = exports.AuthController = class AuthController {
    constructor(commandBus) {
        this.commandBus = commandBus;
    }
    async register(registerDTO) {
        return await this.commandBus.execute(new register_user_command_1.RegisterUserCommand(registerDTO.username, registerDTO.password, registerDTO.email));
    }
    async login(loginDto, req, res) {
        const email = loginDto.email;
        const password = loginDto.password;
        const userId = await this.commandBus.execute(new check_credentials_command_1.CheckCredentialsCommand(email, password));
        const title = req.get('User-Agent') || 'unknown user agent';
        const ip = req.socket.remoteAddress || '';
        const refreshToken = await this.commandBus.execute(new create_refresh_token_command_1.CreateRefreshTokenCommand(userId, title, ip));
        res.cookie('refreshToken', refreshToken, cookie_options_1.cookieOptions);
        const accessToken = await this.commandBus.execute(new create_access_token_command_1.CreateAccessTokenCommand(userId));
        return { accessToken };
    }
    async passwordRecovery(passwordRecoveryDto) {
        await this.commandBus.execute(new password_recovery_command_1.PasswordRecoveryCommand(passwordRecoveryDto.email, passwordRecoveryDto.recaptcha));
        return;
    }
    async logout(req, res) {
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
            const result = await this.commandBus.execute(new decode_refresh_token_command_1.DecodeRefreshTokenCommand(refreshToken));
            if (result) {
                await this.commandBus.execute(new add_refresh_to_blacklist_1.AddRefreshToBlacklistCommand(refreshToken));
                await this.commandBus.execute(new delete_device_command_1.DeleteDeviceCommand(result.sessionId));
                res.clearCookie('refreshToken', cookie_options_1.cookieOptions);
                return;
            }
        }
        throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
    }
    async registrationConfirmation(body) {
        const code = body.confirmationCode;
        await this.commandBus.execute(new verify_confirmation_code_command_1.VerifyConfirmationCodeCommand(code));
    }
    async registrationEmailResend(body) {
        const email = body.email;
        await this.commandBus.execute(new resend_confirmation_code_command_1.ResendConfirmationCodeCommand(email));
        return;
    }
    async newPassword(body) {
        const code = body.recoveryCode;
        const newPassword = body.newPassword;
        await this.commandBus.execute(new change_user_password_1.ChangeUserPasswordCommand(code, newPassword));
    }
    async refreshToken(req, res) {
        const refreshToken = req.cookies.refreshToken;
        const result = await this.commandBus.execute(new decode_refresh_token_command_1.DecodeRefreshTokenCommand(refreshToken));
        if (result) {
            const accessToken = await this.commandBus.execute(new create_access_token_command_1.CreateAccessTokenCommand(result.userId));
            const newRefreshToken = await this.commandBus.execute(new update_refresh_token_command_1.UpdateRefreshTokenCommand(result));
            await this.commandBus.execute(new add_refresh_to_blacklist_1.AddRefreshToBlacklistCommand(refreshToken));
            res.cookie('refreshToken', newRefreshToken, cookie_options_1.cookieOptions);
            return { accessToken };
        }
        throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
    }
    async checkRecoveryCode(body) {
        return await this.commandBus.execute(new check_recovery_code_command_1.CheckRecoveryCodeCommand(body.recoveryCode));
    }
    async resendRecoveryCode(body) {
        return await this.commandBus.execute(new resend_recovery_code_command_1.ResendRecoveryCodeCommand(body.email));
    }
    async getMe(user) {
        return user;
    }
    async deleteMe() {
        await this.commandBus.execute(new delete_user_command_1.TestDeleteUserCommand());
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'An email with a verification code has been sent to the specified email address',
        content: {
            'application/json': { example: { email: 'string' } },
        },
    }),
    (0, swagger_1.ApiBadRequestResponse)(swagger_constants_1.BadRequestResponseOptions),
    (0, swagger_1.ApiTooManyRequestsResponse)(swagger_constants_1.TooManyRequestsResponseOptions),
    (0, common_1.Post)('registration'),
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof auth_register_dto_1.AuthRegisterDto !== "undefined" && auth_register_dto_1.AuthRegisterDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'success',
        content: {
            'application/json': { example: { accessToken: 'string' } },
        },
    }),
    (0, swagger_1.ApiBadRequestResponse)(swagger_constants_1.BadRequestResponseOptions),
    (0, swagger_1.ApiTooManyRequestsResponse)(swagger_constants_1.TooManyRequestsResponseOptions),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'If the password or login is wrong',
    }),
    (0, common_1.Post)('login'),
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof auth_login_dto_1.AuthLoginDto !== "undefined" && auth_login_dto_1.AuthLoginDto) === "function" ? _c : Object, typeof (_d = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _d : Object, typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiNoContentResponse)(swagger_constants_1.NoContentResponseOptions),
    (0, swagger_1.ApiBadRequestResponse)(swagger_constants_1.BadRequestResponseOptions),
    (0, common_1.Post)('password-recovery'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof auth_password_recovery_dto_1.AuthPasswordRecoveryDto !== "undefined" && auth_password_recovery_dto_1.AuthPasswordRecoveryDto) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "passwordRecovery", null);
__decorate([
    (0, swagger_1.ApiNoContentResponse)(swagger_constants_1.NoContentResponseOptions),
    (0, swagger_1.ApiUnauthorizedResponse)(swagger_constants_1.UnauthorizedRequestResponseOptions),
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _g : Object, typeof (_h = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _h : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('registration-confirmation'),
    (0, swagger_1.ApiNoContentResponse)(swagger_constants_1.NoContentResponseOptions),
    (0, swagger_1.ApiBadRequestResponse)(swagger_constants_1.BadRequestResponseOptions),
    (0, swagger_1.ApiTooManyRequestsResponse)(swagger_constants_1.TooManyRequestsResponseOptions),
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof auth_verify_email_dto_1.AuthVerifyEmailDto !== "undefined" && auth_verify_email_dto_1.AuthVerifyEmailDto) === "function" ? _j : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registrationConfirmation", null);
__decorate([
    (0, swagger_1.ApiNoContentResponse)(swagger_constants_1.NoContentResponseOptions),
    (0, swagger_1.ApiBadRequestResponse)(swagger_constants_1.BadRequestResponseOptions),
    (0, swagger_1.ApiTooManyRequestsResponse)(swagger_constants_1.TooManyRequestsResponseOptions),
    (0, common_1.Post)('registration-email-resending'),
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof auth_resend_code_dto_1.AuthResendCodeDto !== "undefined" && auth_resend_code_dto_1.AuthResendCodeDto) === "function" ? _k : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registrationEmailResend", null);
__decorate([
    (0, swagger_1.ApiNoContentResponse)(swagger_constants_1.NoContentResponseOptions),
    (0, swagger_1.ApiBadRequestResponse)(swagger_constants_1.BadRequestResponseOptions),
    (0, swagger_1.ApiTooManyRequestsResponse)(swagger_constants_1.TooManyRequestsResponseOptions),
    (0, common_1.Post)('new-password'),
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof auth_new_password_dto_1.AuthNewPasswordDto !== "undefined" && auth_new_password_dto_1.AuthNewPasswordDto) === "function" ? _l : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "newPassword", null);
__decorate([
    (0, common_1.Post)('update-token'),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'JWT refreshToken inside cookie is missing, expired or incorrect',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'success',
        content: {
            'application/json': { example: { accessToken: 'string' } },
        },
    }),
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_m = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _m : Object, typeof (_o = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _o : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('check-recovery-code'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Recovery code is valid',
        content: {
            'application/json': { example: { email: 'string' } },
        },
    }),
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBadRequestResponse)(swagger_constants_1.BadRequestResponseOptions),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_p = typeof check_verify_code_dto_1.CheckVerifyCodeDto !== "undefined" && check_verify_code_dto_1.CheckVerifyCodeDto) === "function" ? _p : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkRecoveryCode", null);
__decorate([
    (0, common_1.Post)('resend-recovery-code'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Recovery code is sent to email',
    }),
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBadRequestResponse)(swagger_constants_1.BadRequestResponseOptions),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_q = typeof auth_resend_recovery_code_dto_1.AuthResendRecoveryCodeDto !== "undefined" && auth_resend_recovery_code_dto_1.AuthResendRecoveryCodeDto) === "function" ? _q : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendRecoveryCode", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(bearer_auth_guard_1.BearerAuthGuard),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_r = typeof types_1.UserTypes !== "undefined" && types_1.UserTypes) === "function" ? _r : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getMe", null);
__decorate([
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, common_1.Delete)('delete-me'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "deleteMe", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('Auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _a : Object])
], AuthController);


/***/ }),

/***/ "./apps/inctagram/src/auth/api/dto/auth-login.dto.ts":
/*!***********************************************************!*\
  !*** ./apps/inctagram/src/auth/api/dto/auth-login.dto.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthLoginDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class AuthLoginDto {
}
exports.AuthLoginDto = AuthLoginDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)({
        description: 'email: email for create/registration User',
        example: 'example@gmail.com',
    }),
    __metadata("design:type", String)
], AuthLoginDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.MaxLength)(20),
    (0, swagger_1.ApiProperty)({
        description: 'password: password for create/registration User',
        example: 'Pa$$w0rD',
    }),
    __metadata("design:type", String)
], AuthLoginDto.prototype, "password", void 0);


/***/ }),

/***/ "./apps/inctagram/src/auth/api/dto/auth-new-password.dto.ts":
/*!******************************************************************!*\
  !*** ./apps/inctagram/src/auth/api/dto/auth-new-password.dto.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthNewPasswordDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class AuthNewPasswordDto {
}
exports.AuthNewPasswordDto = AuthNewPasswordDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.MaxLength)(20),
    (0, swagger_1.ApiProperty)({
        description: 'password: password for create/registration User',
        example: 'Pa$$w0rD',
    }),
    (0, class_validator_1.Matches)(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~])[A-Za-z0-9!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~]+$/),
    __metadata("design:type", String)
], AuthNewPasswordDto.prototype, "newPassword", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'Code that be sent via Email inside link',
        example: 'string',
    }),
    __metadata("design:type", String)
], AuthNewPasswordDto.prototype, "recoveryCode", void 0);


/***/ }),

/***/ "./apps/inctagram/src/auth/api/dto/auth-password-recovery.dto.ts":
/*!***********************************************************************!*\
  !*** ./apps/inctagram/src/auth/api/dto/auth-password-recovery.dto.ts ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthPasswordRecoveryDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class AuthPasswordRecoveryDto {
}
exports.AuthPasswordRecoveryDto = AuthPasswordRecoveryDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'Email User for recovery',
        example: 'string',
    }),
    (0, class_validator_1.Matches)(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
    __metadata("design:type", String)
], AuthPasswordRecoveryDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'Recaptcha token',
        example: 'string',
    }),
    __metadata("design:type", String)
], AuthPasswordRecoveryDto.prototype, "recaptcha", void 0);


/***/ }),

/***/ "./apps/inctagram/src/auth/api/dto/auth-register.dto.ts":
/*!**************************************************************!*\
  !*** ./apps/inctagram/src/auth/api/dto/auth-register.dto.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthRegisterDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class AuthRegisterDto {
}
exports.AuthRegisterDto = AuthRegisterDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'username: name for create/registration User',
        example: 'string',
    }),
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9_-]*$/),
    __metadata("design:type", String)
], AuthRegisterDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)({
        description: 'email: email for create/registration User',
        example: 'example@gmail.com',
    }),
    (0, class_validator_1.Matches)(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
    __metadata("design:type", String)
], AuthRegisterDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.MaxLength)(20),
    (0, swagger_1.ApiProperty)({
        description: 'password: password for create/registration User',
        example: 'Pa$$w0rd',
    }),
    (0, class_validator_1.Matches)(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~])[A-Za-z0-9!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~]+$/),
    __metadata("design:type", String)
], AuthRegisterDto.prototype, "password", void 0);


/***/ }),

/***/ "./apps/inctagram/src/auth/api/dto/auth-resend-code.dto.ts":
/*!*****************************************************************!*\
  !*** ./apps/inctagram/src/auth/api/dto/auth-resend-code.dto.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthResendCodeDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class AuthResendCodeDto {
}
exports.AuthResendCodeDto = AuthResendCodeDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
    (0, swagger_1.ApiProperty)({
        description: 'email: email for create/registration User',
        example: 'example@gmail.com',
    }),
    __metadata("design:type", String)
], AuthResendCodeDto.prototype, "email", void 0);


/***/ }),

/***/ "./apps/inctagram/src/auth/api/dto/auth-resend-recovery-code.dto.ts":
/*!**************************************************************************!*\
  !*** ./apps/inctagram/src/auth/api/dto/auth-resend-recovery-code.dto.ts ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthResendRecoveryCodeDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class AuthResendRecoveryCodeDto {
}
exports.AuthResendRecoveryCodeDto = AuthResendRecoveryCodeDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
    (0, swagger_1.ApiProperty)({
        description: 'email: email for recovering password',
        example: 'example@gmail.com',
    }),
    __metadata("design:type", String)
], AuthResendRecoveryCodeDto.prototype, "email", void 0);


/***/ }),

/***/ "./apps/inctagram/src/auth/api/dto/auth-verify-email.dto.ts":
/*!******************************************************************!*\
  !*** ./apps/inctagram/src/auth/api/dto/auth-verify-email.dto.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthVerifyEmailDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class AuthVerifyEmailDto {
}
exports.AuthVerifyEmailDto = AuthVerifyEmailDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'code that be sent via Email inside link',
        example: 'string',
    }),
    __metadata("design:type", String)
], AuthVerifyEmailDto.prototype, "confirmationCode", void 0);


/***/ }),

/***/ "./apps/inctagram/src/auth/api/dto/check-verify-code.dto.ts":
/*!******************************************************************!*\
  !*** ./apps/inctagram/src/auth/api/dto/check-verify-code.dto.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CheckVerifyCodeDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CheckVerifyCodeDto {
}
exports.CheckVerifyCodeDto = CheckVerifyCodeDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'Code that be sent via Email inside link',
        example: 'string',
    }),
    __metadata("design:type", String)
], CheckVerifyCodeDto.prototype, "recoveryCode", void 0);


/***/ }),

/***/ "./apps/inctagram/src/auth/api/github.controller.ts":
/*!**********************************************************!*\
  !*** ./apps/inctagram/src/auth/api/github.controller.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GithubController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const throttler_1 = __webpack_require__(/*! @nestjs/throttler */ "@nestjs/throttler");
const swagger_constants_1 = __webpack_require__(/*! ../../utils/constants/swagger-constants */ "./apps/inctagram/src/utils/constants/swagger-constants.ts");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const express_1 = __webpack_require__(/*! express */ "express");
const create_refresh_token_command_1 = __webpack_require__(/*! ../application/use-cases/create-refresh-token.command */ "./apps/inctagram/src/auth/application/use-cases/create-refresh-token.command.ts");
const create_access_token_command_1 = __webpack_require__(/*! ../application/use-cases/create-access-token.command */ "./apps/inctagram/src/auth/application/use-cases/create-access-token.command.ts");
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const create_user_via_oauth_provider_command_1 = __webpack_require__(/*! ../application/use-cases/create-user-via-oauth-provider.command */ "./apps/inctagram/src/auth/application/use-cases/create-user-via-oauth-provider.command.ts");
const oauth_provider_entity_1 = __webpack_require__(/*! ../domain/entities/oauth-provider.entity */ "./apps/inctagram/src/auth/domain/entities/oauth-provider.entity.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let GithubController = exports.GithubController = class GithubController {
    constructor(commandBus, configService) {
        this.commandBus = commandBus;
        this.configService = configService;
    }
    async register() { }
    async redirect(req, res) {
        const { email, id } = req.user;
        const userId = await this.commandBus.execute(new create_user_via_oauth_provider_command_1.SignInUserViaOauthProviderCommand(email, id, oauth_provider_entity_1.ProviderType.GITHUB));
        const title = req.get('User-Agent') || 'unknown user agent';
        const ip = req.socket.remoteAddress || '';
        const refreshToken = await this.commandBus.execute(new create_refresh_token_command_1.CreateRefreshTokenCommand(userId, title, ip));
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });
        await this.commandBus.execute(new create_access_token_command_1.CreateAccessTokenCommand(userId));
        const frontLink = this.configService.get('FRONT_PROD');
        const accessToken = await this.commandBus.execute(new create_access_token_command_1.CreateAccessTokenCommand(userId));
        res
            .writeHead(301, {
            Location: `${frontLink}/general/redirect/github?code=${accessToken}`,
        })
            .end();
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'An email with a verification code has been sent to the specified email address',
        content: {
            'application/json': { example: { accessToken: 'string' } },
        },
    }),
    (0, swagger_1.ApiTooManyRequestsResponse)(swagger_constants_1.TooManyRequestsResponseOptions),
    (0, common_1.Get)('login'),
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('github')),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('redirect'),
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('github')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "redirect", null);
exports.GithubController = GithubController = __decorate([
    (0, common_1.Controller)('auth/github'),
    (0, swagger_1.ApiTags)('Github-OAuth2'),
    __metadata("design:paramtypes", [typeof (_a = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], GithubController);


/***/ }),

/***/ "./apps/inctagram/src/auth/api/google.controller.ts":
/*!**********************************************************!*\
  !*** ./apps/inctagram/src/auth/api/google.controller.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const throttler_1 = __webpack_require__(/*! @nestjs/throttler */ "@nestjs/throttler");
const swagger_constants_1 = __webpack_require__(/*! ../../utils/constants/swagger-constants */ "./apps/inctagram/src/utils/constants/swagger-constants.ts");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const create_refresh_token_command_1 = __webpack_require__(/*! ../application/use-cases/create-refresh-token.command */ "./apps/inctagram/src/auth/application/use-cases/create-refresh-token.command.ts");
const express_1 = __webpack_require__(/*! express */ "express");
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const create_user_via_oauth_provider_command_1 = __webpack_require__(/*! ../application/use-cases/create-user-via-oauth-provider.command */ "./apps/inctagram/src/auth/application/use-cases/create-user-via-oauth-provider.command.ts");
const oauth_provider_entity_1 = __webpack_require__(/*! ../domain/entities/oauth-provider.entity */ "./apps/inctagram/src/auth/domain/entities/oauth-provider.entity.ts");
const create_access_token_command_1 = __webpack_require__(/*! ../application/use-cases/create-access-token.command */ "./apps/inctagram/src/auth/application/use-cases/create-access-token.command.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let GoogleController = exports.GoogleController = class GoogleController {
    constructor(commandBus, configService) {
        this.commandBus = commandBus;
        this.configService = configService;
    }
    async register() { }
    async redirect(req, res) {
        const { email, id } = req.user;
        const userId = await this.commandBus.execute(new create_user_via_oauth_provider_command_1.SignInUserViaOauthProviderCommand(email, id, oauth_provider_entity_1.ProviderType.GOOGLE));
        const title = req.get('User-Agent') || 'unknown user agent';
        const ip = req.socket.remoteAddress || '';
        const refreshToken = await this.commandBus.execute(new create_refresh_token_command_1.CreateRefreshTokenCommand(userId, title, ip));
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });
        const frontLink = this.configService.get('FRONT_PROD');
        const accessToken = await this.commandBus.execute(new create_access_token_command_1.CreateAccessTokenCommand(userId));
        res
            .writeHead(301, {
            Location: `${frontLink}/general/redirect/google?code=${accessToken}`,
        })
            .end();
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'An email with a verification code has been sent to the specified email address',
        content: {
            'application/json': { example: { accessToken: 'string' } },
        },
    }),
    (0, swagger_1.ApiTooManyRequestsResponse)(swagger_constants_1.TooManyRequestsResponseOptions),
    (0, common_1.Get)('login'),
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GoogleController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('redirect'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    (0, swagger_1.ApiExcludeEndpoint)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], GoogleController.prototype, "redirect", null);
exports.GoogleController = GoogleController = __decorate([
    (0, common_1.Controller)('auth/google'),
    (0, swagger_1.ApiTags)('Google-OAuth2'),
    __metadata("design:paramtypes", [typeof (_a = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], GoogleController);


/***/ }),

/***/ "./apps/inctagram/src/auth/application/use-cases/add-refresh-to-blacklist.ts":
/*!***********************************************************************************!*\
  !*** ./apps/inctagram/src/auth/application/use-cases/add-refresh-to-blacklist.ts ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddRefreshToBlacklistHandler = exports.AddRefreshToBlacklistCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const security_devices_repository_1 = __webpack_require__(/*! ../../../features/security-devices/db/security-devices.repository */ "./apps/inctagram/src/features/security-devices/db/security-devices.repository.ts");
class AddRefreshToBlacklistCommand {
    constructor(refreshToken) {
        this.refreshToken = refreshToken;
    }
}
exports.AddRefreshToBlacklistCommand = AddRefreshToBlacklistCommand;
let AddRefreshToBlacklistHandler = exports.AddRefreshToBlacklistHandler = class AddRefreshToBlacklistHandler {
    constructor(securityDevicesRepository) {
        this.securityDevicesRepository = securityDevicesRepository;
    }
    async execute({ refreshToken }) {
        await this.securityDevicesRepository.addTokenToBlacklist(refreshToken);
    }
};
exports.AddRefreshToBlacklistHandler = AddRefreshToBlacklistHandler = __decorate([
    (0, cqrs_1.CommandHandler)(AddRefreshToBlacklistCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof security_devices_repository_1.SecurityDevicesRepository !== "undefined" && security_devices_repository_1.SecurityDevicesRepository) === "function" ? _a : Object])
], AddRefreshToBlacklistHandler);


/***/ }),

/***/ "./apps/inctagram/src/auth/application/use-cases/change-user-password.ts":
/*!*******************************************************************************!*\
  !*** ./apps/inctagram/src/auth/application/use-cases/change-user-password.ts ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChangeUserPasswordHandler = exports.ChangeUserPasswordCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const user_hashing_manager_1 = __webpack_require__(/*! ../../managers/user-hashing.manager */ "./apps/inctagram/src/auth/managers/user-hashing.manager.ts");
const users_repository_1 = __webpack_require__(/*! ../../db/users.repository */ "./apps/inctagram/src/auth/db/users.repository.ts");
const create_error_object_1 = __webpack_require__(/*! ../../../utils/create-error-object */ "./apps/inctagram/src/utils/create-error-object.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
class ChangeUserPasswordCommand {
    constructor(recoveryCode, newPassword) {
        this.recoveryCode = recoveryCode;
        this.newPassword = newPassword;
    }
}
exports.ChangeUserPasswordCommand = ChangeUserPasswordCommand;
let ChangeUserPasswordHandler = exports.ChangeUserPasswordHandler = class ChangeUserPasswordHandler {
    constructor(userHashingManager, usersRepo) {
        this.userHashingManager = userHashingManager;
        this.usersRepo = usersRepo;
    }
    async execute({ recoveryCode, newPassword }) {
        const user = await this.usersRepo.getUserByCode(recoveryCode);
        if (!user) {
            const error = (0, create_error_object_1.createErrorMessage)('invalid recovery code', 'recoveryCode');
            throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
        }
        const { passwordSalt, passwordHash } = await this.userHashingManager.getHashAndSalt(newPassword);
        return await this.usersRepo.updateUserPassword(user.id, passwordSalt, passwordHash);
    }
};
exports.ChangeUserPasswordHandler = ChangeUserPasswordHandler = __decorate([
    (0, cqrs_1.CommandHandler)(ChangeUserPasswordCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof user_hashing_manager_1.UserHashingManager !== "undefined" && user_hashing_manager_1.UserHashingManager) === "function" ? _a : Object, typeof (_b = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _b : Object])
], ChangeUserPasswordHandler);


/***/ }),

/***/ "./apps/inctagram/src/auth/application/use-cases/check-credentials.command.ts":
/*!************************************************************************************!*\
  !*** ./apps/inctagram/src/auth/application/use-cases/check-credentials.command.ts ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CheckCredentialsHandler = exports.CheckCredentialsCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const user_hashing_manager_1 = __webpack_require__(/*! ../../managers/user-hashing.manager */ "./apps/inctagram/src/auth/managers/user-hashing.manager.ts");
const users_repository_1 = __webpack_require__(/*! ../../db/users.repository */ "./apps/inctagram/src/auth/db/users.repository.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
class CheckCredentialsCommand {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}
exports.CheckCredentialsCommand = CheckCredentialsCommand;
let CheckCredentialsHandler = exports.CheckCredentialsHandler = class CheckCredentialsHandler {
    constructor(userHashingManager, usersRepo) {
        this.userHashingManager = userHashingManager;
        this.usersRepo = usersRepo;
    }
    async execute({ email, password }) {
        const user = await this.usersRepo.getUserByEmail(email);
        if (user) {
            if (!user.passwordHash) {
                throw new common_1.HttpException('create new password or login via Google/Github', common_1.HttpStatus.NOT_ACCEPTABLE);
            }
            const passwordHash = await this.userHashingManager.generateHash(password, user.passwordSalt);
            if (!user.isConfirmed) {
                throw new common_1.HttpException('email is not confirmed', common_1.HttpStatus.UNAUTHORIZED);
            }
            if (user.passwordHash === passwordHash) {
                return user.id;
            }
        }
        throw new common_1.HttpException('wrong email or password', common_1.HttpStatus.BAD_REQUEST);
    }
};
exports.CheckCredentialsHandler = CheckCredentialsHandler = __decorate([
    (0, cqrs_1.CommandHandler)(CheckCredentialsCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof user_hashing_manager_1.UserHashingManager !== "undefined" && user_hashing_manager_1.UserHashingManager) === "function" ? _a : Object, typeof (_b = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _b : Object])
], CheckCredentialsHandler);


/***/ }),

/***/ "./apps/inctagram/src/auth/application/use-cases/check-recovery-code.command.ts":
/*!**************************************************************************************!*\
  !*** ./apps/inctagram/src/auth/application/use-cases/check-recovery-code.command.ts ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CheckRecoveryCodeHandler = exports.CheckRecoveryCodeCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const users_repository_1 = __webpack_require__(/*! ../../db/users.repository */ "./apps/inctagram/src/auth/db/users.repository.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
class CheckRecoveryCodeCommand {
    constructor(code) {
        this.code = code;
    }
}
exports.CheckRecoveryCodeCommand = CheckRecoveryCodeCommand;
let CheckRecoveryCodeHandler = exports.CheckRecoveryCodeHandler = class CheckRecoveryCodeHandler {
    constructor(usersRepo) {
        this.usersRepo = usersRepo;
    }
    async execute({ code }) {
        const user = await this.usersRepo.getUserByCode(code);
        if (!user) {
            throw new common_1.HttpException('invalid recovery code', common_1.HttpStatus.BAD_REQUEST);
        }
        if (user.confirmationData.codeExpirationDate < new Date()) {
            throw new common_1.HttpException('expired recovery code', common_1.HttpStatus.BAD_REQUEST);
        }
        return { email: user.email };
    }
};
exports.CheckRecoveryCodeHandler = CheckRecoveryCodeHandler = __decorate([
    (0, cqrs_1.CommandHandler)(CheckRecoveryCodeCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _a : Object])
], CheckRecoveryCodeHandler);


/***/ }),

/***/ "./apps/inctagram/src/auth/application/use-cases/create-access-token.command.ts":
/*!**************************************************************************************!*\
  !*** ./apps/inctagram/src/auth/application/use-cases/create-access-token.command.ts ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAccessTokenHandler = exports.CreateAccessTokenCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
class CreateAccessTokenCommand {
    constructor(userId) {
        this.userId = userId;
    }
}
exports.CreateAccessTokenCommand = CreateAccessTokenCommand;
let CreateAccessTokenHandler = exports.CreateAccessTokenHandler = class CreateAccessTokenHandler {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    execute({ userId }) {
        return this.jwtService.signAsync({ userId });
    }
};
exports.CreateAccessTokenHandler = CreateAccessTokenHandler = __decorate([
    (0, cqrs_1.CommandHandler)(CreateAccessTokenCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], CreateAccessTokenHandler);


/***/ }),

/***/ "./apps/inctagram/src/auth/application/use-cases/create-refresh-token.command.ts":
/*!***************************************************************************************!*\
  !*** ./apps/inctagram/src/auth/application/use-cases/create-refresh-token.command.ts ***!
  \***************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateRefreshTokenHandler = exports.CreateRefreshTokenCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const security_devices_repository_1 = __webpack_require__(/*! ../../../features/security-devices/db/security-devices.repository */ "./apps/inctagram/src/features/security-devices/db/security-devices.repository.ts");
const session_entity_1 = __webpack_require__(/*! ../../domain/entities/session.entity */ "./apps/inctagram/src/auth/domain/entities/session.entity.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
class CreateRefreshTokenCommand {
    constructor(userId, deviceTitle, deviceIp) {
        this.userId = userId;
        this.deviceTitle = deviceTitle;
        this.deviceIp = deviceIp;
    }
}
exports.CreateRefreshTokenCommand = CreateRefreshTokenCommand;
let CreateRefreshTokenHandler = exports.CreateRefreshTokenHandler = class CreateRefreshTokenHandler {
    constructor(jwtService, securityDevicesRepository, configService) {
        this.jwtService = jwtService;
        this.securityDevicesRepository = securityDevicesRepository;
        this.configService = configService;
    }
    async execute({ userId, deviceTitle, deviceIp }) {
        const device = session_entity_1.DeviceEntity.create({
            title: deviceTitle,
            ip: deviceIp,
        });
        const newDevice = await this.securityDevicesRepository.createDevice(device);
        const session = session_entity_1.SessionEntity.create(userId, newDevice.deviceId);
        const sessionId = await this.securityDevicesRepository.createSession(session);
        return await this.jwtService.signAsync({ userId, sessionId }, {
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION_TIME'),
            secret: this.configService.get('JWT_REFRESH_KEY'),
        });
    }
};
exports.CreateRefreshTokenHandler = CreateRefreshTokenHandler = __decorate([
    (0, cqrs_1.CommandHandler)(CreateRefreshTokenCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof security_devices_repository_1.SecurityDevicesRepository !== "undefined" && security_devices_repository_1.SecurityDevicesRepository) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object])
], CreateRefreshTokenHandler);


/***/ }),

/***/ "./apps/inctagram/src/auth/application/use-cases/create-user-via-oauth-provider.command.ts":
/*!*************************************************************************************************!*\
  !*** ./apps/inctagram/src/auth/application/use-cases/create-user-via-oauth-provider.command.ts ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignInUserViaOauthProviderHandler = exports.SignInUserViaOauthProviderCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const prisma_service_1 = __webpack_require__(/*! ../../../prisma.service */ "./apps/inctagram/src/prisma.service.ts");
const email_manager_1 = __webpack_require__(/*! ../../managers/email.manager */ "./apps/inctagram/src/auth/managers/email.manager.ts");
const user_entity_1 = __webpack_require__(/*! ../../domain/entities/user.entity */ "./apps/inctagram/src/auth/domain/entities/user.entity.ts");
const users_repository_1 = __webpack_require__(/*! ../../db/users.repository */ "./apps/inctagram/src/auth/db/users.repository.ts");
const oauth_provider_entity_1 = __webpack_require__(/*! ../../domain/entities/oauth-provider.entity */ "./apps/inctagram/src/auth/domain/entities/oauth-provider.entity.ts");
class SignInUserViaOauthProviderCommand {
    constructor(email, providerId, providerType) {
        this.email = email;
        this.providerId = providerId;
        this.providerType = providerType;
    }
}
exports.SignInUserViaOauthProviderCommand = SignInUserViaOauthProviderCommand;
let SignInUserViaOauthProviderHandler = exports.SignInUserViaOauthProviderHandler = class SignInUserViaOauthProviderHandler {
    constructor(prisma, usersRepo, emailService) {
        this.prisma = prisma;
        this.usersRepo = usersRepo;
        this.emailService = emailService;
    }
    async execute(data) {
        const { providerId, providerType, email } = data;
        let userId;
        const providerClient = await this.usersRepo.getUserProviderByIdAndType(providerId, providerType);
        if (providerClient) {
            return providerClient.userId;
        }
        const userByEmail = await this.usersRepo.getUserByEmail(email);
        if (!userByEmail) {
            userId = await this.createUser(data);
        }
        else {
            userId = userByEmail.id;
        }
        const provider = oauth_provider_entity_1.OauthProviderEntity.create({
            email,
            providerType,
            providerId,
            userId: userId,
        });
        await this.usersRepo.createOauthProvider(provider);
        return userId;
    }
    async createUser({ email, providerId, }) {
        const newUser = user_entity_1.UserEntity.create({
            email,
            username: 'client' + providerId,
            isConfirmed: true,
        });
        return this.prisma.$transaction(async () => {
            const user = await this.usersRepo.createUser(newUser);
            await this.emailService.sendNotificationEmail(email);
            return user.id;
        }, {
            timeout: 6000,
        });
    }
};
exports.SignInUserViaOauthProviderHandler = SignInUserViaOauthProviderHandler = __decorate([
    (0, cqrs_1.CommandHandler)(SignInUserViaOauthProviderCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _b : Object, typeof (_c = typeof email_manager_1.EmailService !== "undefined" && email_manager_1.EmailService) === "function" ? _c : Object])
], SignInUserViaOauthProviderHandler);


/***/ }),

/***/ "./apps/inctagram/src/auth/application/use-cases/decode-refresh-token.command.ts":
/*!***************************************************************************************!*\
  !*** ./apps/inctagram/src/auth/application/use-cases/decode-refresh-token.command.ts ***!
  \***************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DecodeRefreshTokenHandler = exports.DecodeRefreshTokenCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const security_devices_query_repository_1 = __webpack_require__(/*! ../../../features/security-devices/db/security-devices.query-repository */ "./apps/inctagram/src/features/security-devices/db/security-devices.query-repository.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
class DecodeRefreshTokenCommand {
    constructor(refresh) {
        this.refresh = refresh;
    }
}
exports.DecodeRefreshTokenCommand = DecodeRefreshTokenCommand;
let DecodeRefreshTokenHandler = exports.DecodeRefreshTokenHandler = class DecodeRefreshTokenHandler {
    constructor(securityDevicesQueryRepository, jwtService, configService) {
        this.securityDevicesQueryRepository = securityDevicesQueryRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async execute({ refresh }) {
        try {
            const result = await this.jwtService.verifyAsync(refresh, {
                secret: this.configService.get('JWT_REFRESH_KEY'),
            });
            const isInBlackList = await this.securityDevicesQueryRepository.getBlackList(refresh);
            const session = await this.securityDevicesQueryRepository.getSessionByUserIdAndSessionId(result.sessionId, result.userId);
            if (isInBlackList) {
                return null;
            }
            if (!session) {
                return null;
            }
            if (result.exp * 1000 < Date.now()) {
                return null;
            }
            return {
                userId: result.userId,
                sessionId: result.sessionId,
            };
        }
        catch (e) {
            return null;
        }
    }
};
exports.DecodeRefreshTokenHandler = DecodeRefreshTokenHandler = __decorate([
    (0, cqrs_1.CommandHandler)(DecodeRefreshTokenCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof security_devices_query_repository_1.SecurityDevicesQueryRepository !== "undefined" && security_devices_query_repository_1.SecurityDevicesQueryRepository) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object])
], DecodeRefreshTokenHandler);


/***/ }),

/***/ "./apps/inctagram/src/auth/application/use-cases/password-recovery.command.ts":
/*!************************************************************************************!*\
  !*** ./apps/inctagram/src/auth/application/use-cases/password-recovery.command.ts ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PasswordRecoveryHandler = exports.PasswordRecoveryCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const prisma_service_1 = __webpack_require__(/*! ../../../prisma.service */ "./apps/inctagram/src/prisma.service.ts");
const email_manager_1 = __webpack_require__(/*! ../../managers/email.manager */ "./apps/inctagram/src/auth/managers/email.manager.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const create_error_object_1 = __webpack_require__(/*! ../../../utils/create-error-object */ "./apps/inctagram/src/utils/create-error-object.ts");
const users_repository_1 = __webpack_require__(/*! ../../db/users.repository */ "./apps/inctagram/src/auth/db/users.repository.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
class PasswordRecoveryCommand {
    constructor(email, recaptcha) {
        this.email = email;
        this.recaptcha = recaptcha;
    }
}
exports.PasswordRecoveryCommand = PasswordRecoveryCommand;
let PasswordRecoveryHandler = exports.PasswordRecoveryHandler = class PasswordRecoveryHandler {
    constructor(prisma, emailService, usersRepo, configService) {
        this.prisma = prisma;
        this.emailService = emailService;
        this.usersRepo = usersRepo;
        this.configService = configService;
    }
    async execute({ email, recaptcha }) {
        const secretKey = this.configService.get('RECAPTCHA_SECRET');
        const verifyCaptchaBodyString = `secret=${secretKey}&response=${recaptcha}`;
        const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: verifyCaptchaBodyString,
        });
        const requestStatus = await res.json();
        if (requestStatus.success) {
            return this.recoverPassword(email);
        }
        const error = (0, create_error_object_1.createErrorMessage)(requestStatus['error-codes'][0], 'recaptcha');
        throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
    }
    async recoverPassword(email) {
        const user = await this.usersRepo.getUserByEmail(email);
        if (!user) {
            const error = (0, create_error_object_1.createErrorMessage)('incorrect email', 'email');
            throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
        }
        return this.prisma.$transaction(async () => {
            try {
                const confirmationData = await this.usersRepo.getUserConfirmation(user.confirmationData.id);
                confirmationData.updateConfirmationData();
                await this.usersRepo.updateConfirmationDate(confirmationData);
                await this.emailService.sendRecoveryCodeEmail(email, confirmationData.confirmationCode);
                return true;
            }
            catch (e) {
                console.log(e);
                throw Error('some error try later');
            }
        }, {
            timeout: 6000,
        });
    }
};
exports.PasswordRecoveryHandler = PasswordRecoveryHandler = __decorate([
    (0, cqrs_1.CommandHandler)(PasswordRecoveryCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof email_manager_1.EmailService !== "undefined" && email_manager_1.EmailService) === "function" ? _b : Object, typeof (_c = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _c : Object, typeof (_d = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _d : Object])
], PasswordRecoveryHandler);


/***/ }),

/***/ "./apps/inctagram/src/auth/application/use-cases/register-user.command.ts":
/*!********************************************************************************!*\
  !*** ./apps/inctagram/src/auth/application/use-cases/register-user.command.ts ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterUserHandler = exports.RegisterUserCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const user_hashing_manager_1 = __webpack_require__(/*! ../../managers/user-hashing.manager */ "./apps/inctagram/src/auth/managers/user-hashing.manager.ts");
const prisma_service_1 = __webpack_require__(/*! ../../../prisma.service */ "./apps/inctagram/src/prisma.service.ts");
const email_manager_1 = __webpack_require__(/*! ../../managers/email.manager */ "./apps/inctagram/src/auth/managers/email.manager.ts");
const user_entity_1 = __webpack_require__(/*! ../../domain/entities/user.entity */ "./apps/inctagram/src/auth/domain/entities/user.entity.ts");
const users_repository_1 = __webpack_require__(/*! ../../db/users.repository */ "./apps/inctagram/src/auth/db/users.repository.ts");
const create_error_object_1 = __webpack_require__(/*! ../../../utils/create-error-object */ "./apps/inctagram/src/utils/create-error-object.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
class RegisterUserCommand {
    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }
}
exports.RegisterUserCommand = RegisterUserCommand;
let RegisterUserHandler = exports.RegisterUserHandler = class RegisterUserHandler {
    constructor(userHashingManager, prisma, emailService, userRepo) {
        this.userHashingManager = userHashingManager;
        this.prisma = prisma;
        this.emailService = emailService;
        this.userRepo = userRepo;
    }
    async execute(data) {
        const userByEmail = await this.userRepo.getUserByEmail(data.email);
        const userByUsername = await this.userRepo.getUserByUsername(data.username);
        if (userByEmail) {
            const error = (0, create_error_object_1.createErrorMessage)('email already exists', 'email');
            throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
        }
        if (userByUsername) {
            const error = (0, create_error_object_1.createErrorMessage)('username already exists', 'username');
            throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
        }
        return this.createUser(data);
    }
    async createUser({ username, password, email }) {
        const { passwordHash, passwordSalt } = await this.userHashingManager.getHashAndSalt(password);
        const newUser = user_entity_1.UserEntity.create({
            email,
            username,
            isConfirmed: false,
        });
        newUser.passwordSalt = passwordSalt;
        newUser.passwordHash = passwordHash;
        this.prisma.$transaction(async () => {
            const user = await this.userRepo.createUser(newUser);
            const userConfirmation = user_entity_1.UserConfirmationEntity.create(user.id);
            await this.userRepo.createUserConfirmationData(userConfirmation);
            await this.emailService.sendConfirmationCodeEmail(email, userConfirmation.confirmationCode, 'Confirmation code');
        }, { timeout: 7000 });
        return { email: email.toLowerCase() };
    }
};
exports.RegisterUserHandler = RegisterUserHandler = __decorate([
    (0, cqrs_1.CommandHandler)(RegisterUserCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof user_hashing_manager_1.UserHashingManager !== "undefined" && user_hashing_manager_1.UserHashingManager) === "function" ? _a : Object, typeof (_b = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _b : Object, typeof (_c = typeof email_manager_1.EmailService !== "undefined" && email_manager_1.EmailService) === "function" ? _c : Object, typeof (_d = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _d : Object])
], RegisterUserHandler);


/***/ }),

/***/ "./apps/inctagram/src/auth/application/use-cases/resend-confirmation-code.command.ts":
/*!*******************************************************************************************!*\
  !*** ./apps/inctagram/src/auth/application/use-cases/resend-confirmation-code.command.ts ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResendConfirmationCodeHandler = exports.ResendConfirmationCodeCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const prisma_service_1 = __webpack_require__(/*! ../../../prisma.service */ "./apps/inctagram/src/prisma.service.ts");
const email_manager_1 = __webpack_require__(/*! ../../managers/email.manager */ "./apps/inctagram/src/auth/managers/email.manager.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const create_error_object_1 = __webpack_require__(/*! ../../../utils/create-error-object */ "./apps/inctagram/src/utils/create-error-object.ts");
const user_entity_1 = __webpack_require__(/*! ../../domain/entities/user.entity */ "./apps/inctagram/src/auth/domain/entities/user.entity.ts");
const users_repository_1 = __webpack_require__(/*! ../../db/users.repository */ "./apps/inctagram/src/auth/db/users.repository.ts");
class ResendConfirmationCodeCommand {
    constructor(email) {
        this.email = email;
    }
}
exports.ResendConfirmationCodeCommand = ResendConfirmationCodeCommand;
let ResendConfirmationCodeHandler = exports.ResendConfirmationCodeHandler = class ResendConfirmationCodeHandler {
    constructor(prisma, emailService, usersRepo) {
        this.prisma = prisma;
        this.emailService = emailService;
        this.usersRepo = usersRepo;
    }
    async execute({ email }) {
        const user = await this.usersRepo.getUserByEmail(email);
        if (!user) {
            const error = (0, create_error_object_1.createErrorMessage)('incorrect email', 'email');
            throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
        }
        if (user.isConfirmed) {
            const error = (0, create_error_object_1.createErrorMessage)('email already confirmed', 'email');
            throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
        }
        return this.prisma.$transaction(async (tx) => {
            const userConfirmation = user_entity_1.UserConfirmationEntity.create(user.id);
            await tx.userConfirmation.update({
                where: { id: user.confirmationData.id },
                data: userConfirmation,
            });
            await this.emailService.sendConfirmationCodeEmail(email, userConfirmation.confirmationCode, 'New confirmation code');
            return true;
        }, {
            timeout: 6000,
        });
    }
};
exports.ResendConfirmationCodeHandler = ResendConfirmationCodeHandler = __decorate([
    (0, cqrs_1.CommandHandler)(ResendConfirmationCodeCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof email_manager_1.EmailService !== "undefined" && email_manager_1.EmailService) === "function" ? _b : Object, typeof (_c = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _c : Object])
], ResendConfirmationCodeHandler);


/***/ }),

/***/ "./apps/inctagram/src/auth/application/use-cases/resend-recovery-code.command.ts":
/*!***************************************************************************************!*\
  !*** ./apps/inctagram/src/auth/application/use-cases/resend-recovery-code.command.ts ***!
  \***************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResendRecoveryCodeHandler = exports.ResendRecoveryCodeCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const prisma_service_1 = __webpack_require__(/*! ../../../prisma.service */ "./apps/inctagram/src/prisma.service.ts");
const email_manager_1 = __webpack_require__(/*! ../../managers/email.manager */ "./apps/inctagram/src/auth/managers/email.manager.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const create_error_object_1 = __webpack_require__(/*! ../../../utils/create-error-object */ "./apps/inctagram/src/utils/create-error-object.ts");
const users_repository_1 = __webpack_require__(/*! ../../db/users.repository */ "./apps/inctagram/src/auth/db/users.repository.ts");
class ResendRecoveryCodeCommand {
    constructor(email) {
        this.email = email;
    }
}
exports.ResendRecoveryCodeCommand = ResendRecoveryCodeCommand;
let ResendRecoveryCodeHandler = exports.ResendRecoveryCodeHandler = class ResendRecoveryCodeHandler {
    constructor(prisma, emailService, usersRepo) {
        this.prisma = prisma;
        this.emailService = emailService;
        this.usersRepo = usersRepo;
    }
    async execute({ email }) {
        return this.recoverPassword(email);
    }
    async recoverPassword(email) {
        const user = await this.usersRepo.getUserByEmail(email);
        if (!user) {
            const error = (0, create_error_object_1.createErrorMessage)('incorrect email', 'email');
            throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
        }
        return this.prisma.$transaction(async () => {
            try {
                const confirmationData = await this.usersRepo.getUserConfirmation(user.confirmationData.id);
                confirmationData.updateConfirmationData();
                await this.usersRepo.updateConfirmationDate(confirmationData);
                await this.emailService.sendRecoveryCodeEmail(email, confirmationData.confirmationCode);
            }
            catch (e) {
                console.log(e);
                throw Error('some error try later');
            }
        }, {
            timeout: 6000,
        });
    }
};
exports.ResendRecoveryCodeHandler = ResendRecoveryCodeHandler = __decorate([
    (0, cqrs_1.CommandHandler)(ResendRecoveryCodeCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof email_manager_1.EmailService !== "undefined" && email_manager_1.EmailService) === "function" ? _b : Object, typeof (_c = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _c : Object])
], ResendRecoveryCodeHandler);


/***/ }),

/***/ "./apps/inctagram/src/auth/application/use-cases/update-refresh-token.command.ts":
/*!***************************************************************************************!*\
  !*** ./apps/inctagram/src/auth/application/use-cases/update-refresh-token.command.ts ***!
  \***************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateRefreshTokenHandler = exports.UpdateRefreshTokenCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const security_devices_repository_1 = __webpack_require__(/*! ../../../features/security-devices/db/security-devices.repository */ "./apps/inctagram/src/features/security-devices/db/security-devices.repository.ts");
const session_entity_1 = __webpack_require__(/*! ../../domain/entities/session.entity */ "./apps/inctagram/src/auth/domain/entities/session.entity.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
class UpdateRefreshTokenCommand {
    constructor(oldRefresh) {
        this.oldRefresh = oldRefresh;
    }
}
exports.UpdateRefreshTokenCommand = UpdateRefreshTokenCommand;
let UpdateRefreshTokenHandler = exports.UpdateRefreshTokenHandler = class UpdateRefreshTokenHandler {
    constructor(jwtService, securityDevicesRepository, configService) {
        this.jwtService = jwtService;
        this.securityDevicesRepository = securityDevicesRepository;
        this.configService = configService;
    }
    async execute({ oldRefresh }) {
        const { userId, sessionId } = oldRefresh;
        const session = await this.securityDevicesRepository.getSession(sessionId);
        const newSession = session_entity_1.SessionEntity.create(userId, session.deviceId);
        const newSessionId = await this.securityDevicesRepository.createSession(newSession);
        await this.securityDevicesRepository.deleteSessionById(sessionId);
        return await this.jwtService.signAsync({
            userId: oldRefresh.userId,
            sessionId: newSessionId,
        }, {
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION_TIME'),
            secret: this.configService.get('JWT_REFRESH_KEY'),
        });
    }
};
exports.UpdateRefreshTokenHandler = UpdateRefreshTokenHandler = __decorate([
    (0, cqrs_1.CommandHandler)(UpdateRefreshTokenCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof security_devices_repository_1.SecurityDevicesRepository !== "undefined" && security_devices_repository_1.SecurityDevicesRepository) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object])
], UpdateRefreshTokenHandler);


/***/ }),

/***/ "./apps/inctagram/src/auth/application/use-cases/verify-confirmation-code.command.ts":
/*!*******************************************************************************************!*\
  !*** ./apps/inctagram/src/auth/application/use-cases/verify-confirmation-code.command.ts ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VerifyConfirmationCodeHandler = exports.VerifyConfirmationCodeCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const users_repository_1 = __webpack_require__(/*! ../../db/users.repository */ "./apps/inctagram/src/auth/db/users.repository.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
class VerifyConfirmationCodeCommand {
    constructor(code) {
        this.code = code;
    }
}
exports.VerifyConfirmationCodeCommand = VerifyConfirmationCodeCommand;
let VerifyConfirmationCodeHandler = exports.VerifyConfirmationCodeHandler = class VerifyConfirmationCodeHandler {
    constructor(usersRepo) {
        this.usersRepo = usersRepo;
    }
    async execute({ code }) {
        const user = await this.usersRepo.getUserByCode(code);
        if (!user) {
            throw new common_1.HttpException('invalid code', common_1.HttpStatus.BAD_REQUEST);
        }
        if (user.confirmationData.codeExpirationDate < new Date()) {
            throw new common_1.HttpException('code expired', common_1.HttpStatus.BAD_REQUEST);
        }
        if (user.isConfirmed) {
            throw new common_1.HttpException('code already confirmed', common_1.HttpStatus.BAD_REQUEST);
        }
        await this.usersRepo.updateUsersConfirmationStatus(user.id);
    }
};
exports.VerifyConfirmationCodeHandler = VerifyConfirmationCodeHandler = __decorate([
    (0, cqrs_1.CommandHandler)(VerifyConfirmationCodeCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _a : Object])
], VerifyConfirmationCodeHandler);


/***/ }),

/***/ "./apps/inctagram/src/auth/auth.module.ts":
/*!************************************************!*\
  !*** ./apps/inctagram/src/auth/auth.module.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_controller_1 = __webpack_require__(/*! ./api/auth.controller */ "./apps/inctagram/src/auth/api/auth.controller.ts");
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const users_repository_1 = __webpack_require__(/*! ./db/users.repository */ "./apps/inctagram/src/auth/db/users.repository.ts");
const users_query_repository_1 = __webpack_require__(/*! ./db/users.query-repository */ "./apps/inctagram/src/auth/db/users.query-repository.ts");
const prisma_service_1 = __webpack_require__(/*! ../prisma.service */ "./apps/inctagram/src/prisma.service.ts");
const register_user_command_1 = __webpack_require__(/*! ./application/use-cases/register-user.command */ "./apps/inctagram/src/auth/application/use-cases/register-user.command.ts");
const user_hashing_manager_1 = __webpack_require__(/*! ./managers/user-hashing.manager */ "./apps/inctagram/src/auth/managers/user-hashing.manager.ts");
const email_manager_1 = __webpack_require__(/*! ./managers/email.manager */ "./apps/inctagram/src/auth/managers/email.manager.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const github_controller_1 = __webpack_require__(/*! ./api/github.controller */ "./apps/inctagram/src/auth/api/github.controller.ts");
const google_controller_1 = __webpack_require__(/*! ./api/google.controller */ "./apps/inctagram/src/auth/api/google.controller.ts");
const create_access_token_command_1 = __webpack_require__(/*! ./application/use-cases/create-access-token.command */ "./apps/inctagram/src/auth/application/use-cases/create-access-token.command.ts");
const create_refresh_token_command_1 = __webpack_require__(/*! ./application/use-cases/create-refresh-token.command */ "./apps/inctagram/src/auth/application/use-cases/create-refresh-token.command.ts");
const decode_refresh_token_command_1 = __webpack_require__(/*! ./application/use-cases/decode-refresh-token.command */ "./apps/inctagram/src/auth/application/use-cases/decode-refresh-token.command.ts");
const update_refresh_token_command_1 = __webpack_require__(/*! ./application/use-cases/update-refresh-token.command */ "./apps/inctagram/src/auth/application/use-cases/update-refresh-token.command.ts");
const security_devices_repository_1 = __webpack_require__(/*! ../features/security-devices/db/security-devices.repository */ "./apps/inctagram/src/features/security-devices/db/security-devices.repository.ts");
const security_devices_query_repository_1 = __webpack_require__(/*! ../features/security-devices/db/security-devices.query-repository */ "./apps/inctagram/src/features/security-devices/db/security-devices.query-repository.ts");
const add_refresh_to_blacklist_1 = __webpack_require__(/*! ./application/use-cases/add-refresh-to-blacklist */ "./apps/inctagram/src/auth/application/use-cases/add-refresh-to-blacklist.ts");
const delete_device_command_1 = __webpack_require__(/*! ../features/security-devices/commands/delete-device.command */ "./apps/inctagram/src/features/security-devices/commands/delete-device.command.ts");
const password_recovery_command_1 = __webpack_require__(/*! ./application/use-cases/password-recovery.command */ "./apps/inctagram/src/auth/application/use-cases/password-recovery.command.ts");
const google_strategy_1 = __webpack_require__(/*! ./strategies/google.strategy */ "./apps/inctagram/src/auth/strategies/google.strategy.ts");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const github_strategy_1 = __webpack_require__(/*! ./strategies/github.strategy */ "./apps/inctagram/src/auth/strategies/github.strategy.ts");
const resend_confirmation_code_command_1 = __webpack_require__(/*! ./application/use-cases/resend-confirmation-code.command */ "./apps/inctagram/src/auth/application/use-cases/resend-confirmation-code.command.ts");
const change_user_password_1 = __webpack_require__(/*! ./application/use-cases/change-user-password */ "./apps/inctagram/src/auth/application/use-cases/change-user-password.ts");
const create_user_via_oauth_provider_command_1 = __webpack_require__(/*! ./application/use-cases/create-user-via-oauth-provider.command */ "./apps/inctagram/src/auth/application/use-cases/create-user-via-oauth-provider.command.ts");
const check_credentials_command_1 = __webpack_require__(/*! ./application/use-cases/check-credentials.command */ "./apps/inctagram/src/auth/application/use-cases/check-credentials.command.ts");
const verify_confirmation_code_command_1 = __webpack_require__(/*! ./application/use-cases/verify-confirmation-code.command */ "./apps/inctagram/src/auth/application/use-cases/verify-confirmation-code.command.ts");
const delete_user_command_1 = __webpack_require__(/*! ./test/delete-user.command */ "./apps/inctagram/src/auth/test/delete-user.command.ts");
const check_recovery_code_command_1 = __webpack_require__(/*! ./application/use-cases/check-recovery-code.command */ "./apps/inctagram/src/auth/application/use-cases/check-recovery-code.command.ts");
const resend_recovery_code_command_1 = __webpack_require__(/*! ./application/use-cases/resend-recovery-code.command */ "./apps/inctagram/src/auth/application/use-cases/resend-recovery-code.command.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const CommandHandlers = [
    register_user_command_1.RegisterUserHandler,
    create_access_token_command_1.CreateAccessTokenHandler,
    create_refresh_token_command_1.CreateRefreshTokenHandler,
    decode_refresh_token_command_1.DecodeRefreshTokenHandler,
    update_refresh_token_command_1.UpdateRefreshTokenHandler,
    add_refresh_to_blacklist_1.AddRefreshToBlacklistHandler,
    delete_device_command_1.DeleteDeviceHandler,
    password_recovery_command_1.PasswordRecoveryHandler,
    resend_confirmation_code_command_1.ResendConfirmationCodeHandler,
    change_user_password_1.ChangeUserPasswordHandler,
    create_user_via_oauth_provider_command_1.SignInUserViaOauthProviderHandler,
    check_credentials_command_1.CheckCredentialsHandler,
    verify_confirmation_code_command_1.VerifyConfirmationCodeHandler,
    check_recovery_code_command_1.CheckRecoveryCodeHandler,
    resend_recovery_code_command_1.ResendRecoveryCodeHandler,
];
const TestHandlers = [delete_user_command_1.TestDeleteUserHandler];
let AuthModule = exports.AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cqrs_1.CqrsModule,
            passport_1.PassportModule.register({ session: true }),
            jwt_1.JwtModule.registerAsync({
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET_KEY'),
                    signOptions: { expiresIn: configService.get('JWT_EXPIRATION_TIME') },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [auth_controller_1.AuthController, github_controller_1.GithubController, google_controller_1.GoogleController],
        providers: [
            google_strategy_1.GoogleStrategy,
            github_strategy_1.GithubStrategy,
            users_repository_1.UsersRepository,
            users_query_repository_1.UsersQueryRepository,
            prisma_service_1.PrismaService,
            user_hashing_manager_1.UserHashingManager,
            email_manager_1.EmailService,
            security_devices_repository_1.SecurityDevicesRepository,
            security_devices_query_repository_1.SecurityDevicesQueryRepository,
            ...CommandHandlers,
            ...TestHandlers,
        ],
    })
], AuthModule);


/***/ }),

/***/ "./apps/inctagram/src/auth/db/users.query-repository.ts":
/*!**************************************************************!*\
  !*** ./apps/inctagram/src/auth/db/users.query-repository.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersQueryRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let UsersQueryRepository = exports.UsersQueryRepository = class UsersQueryRepository {
    constructor() { }
};
exports.UsersQueryRepository = UsersQueryRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UsersQueryRepository);


/***/ }),

/***/ "./apps/inctagram/src/auth/db/users.repository.ts":
/*!********************************************************!*\
  !*** ./apps/inctagram/src/auth/db/users.repository.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! ../../prisma.service */ "./apps/inctagram/src/prisma.service.ts");
const user_entity_1 = __webpack_require__(/*! ../domain/entities/user.entity */ "./apps/inctagram/src/auth/domain/entities/user.entity.ts");
let UsersRepository = exports.UsersRepository = class UsersRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUser(data) {
        return this.prisma.user.create({
            data: {
                ...data,
                profile: {
                    create: {
                        firstname: null,
                        lastname: null,
                    },
                },
            },
        });
    }
    async deleteUserByEmail(email, userId) {
        await this.prisma.profile.delete({
            where: { userId },
        });
        await this.prisma.user.delete({
            where: { email },
        });
    }
    async updateUsersConfirmationStatus(userId) {
        await this.prisma.user.update({
            where: { id: userId },
            data: { isConfirmed: true },
        });
    }
    async deleteUserConfirmationData(id) {
        await this.prisma.userConfirmation.delete({
            where: { id },
        });
    }
    async updateUserPassword(userId, newPasswordSalt, newPasswordHash) {
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                passwordSalt: newPasswordSalt,
                passwordHash: newPasswordHash,
            },
        });
    }
    async createUserConfirmationData(data) {
        await this.prisma.userConfirmation.create({
            data: {
                confirmationCode: data.confirmationCode,
                userId: data.userId,
                codeExpirationDate: data.codeExpirationDate,
            },
        });
    }
    async getUserConfirmation(id) {
        const data = await this.prisma.userConfirmation.findUnique({
            where: { id },
        });
        const confirmationData = new user_entity_1.UserConfirmationEntity();
        confirmationData.id = data.id;
        confirmationData.confirmationCode = data.confirmationCode;
        confirmationData.userId = data.userId;
        confirmationData.codeExpirationDate = data.codeExpirationDate;
        return confirmationData;
    }
    async updateConfirmationDate(confirmData) {
        await this.prisma.userConfirmation.update({
            where: {
                id: confirmData.id,
            },
            data: {
                confirmationCode: confirmData.confirmationCode,
                codeExpirationDate: confirmData.codeExpirationDate,
            },
        });
    }
    async createOauthProvider(data) {
        return this.prisma.oAuthProvider.create({
            data,
        });
    }
    async getUserByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email: email.toLowerCase() },
            include: { providers: true, confirmationData: true },
        });
    }
    getUserByUsername(username) {
        return this.prisma.user.findUnique({
            where: { username },
        });
    }
    getUserByCode(code) {
        return this.prisma.user.findFirst({
            where: {
                confirmationData: { confirmationCode: code },
            },
            include: {
                providers: true,
                confirmationData: true,
            },
        });
    }
    getUserById(id) {
        return this.prisma.user.findFirst({
            where: { id },
            include: {
                profile: {
                    select: {
                        lastname: true,
                        firstname: true,
                    },
                },
            },
        });
    }
    getUserProviderByIdAndType(providerId, providerType) {
        return this.prisma.oAuthProvider.findFirst({
            where: {
                providerId,
                providerType,
            },
        });
    }
};
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], UsersRepository);


/***/ }),

/***/ "./apps/inctagram/src/auth/domain/entities/oauth-provider.entity.ts":
/*!**************************************************************************!*\
  !*** ./apps/inctagram/src/auth/domain/entities/oauth-provider.entity.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OauthProviderEntity = exports.ProviderType = void 0;
const base_entity_1 = __webpack_require__(/*! ../../../utils/base.entity */ "./apps/inctagram/src/utils/base.entity.ts");
var ProviderType;
(function (ProviderType) {
    ProviderType["GOOGLE"] = "google";
    ProviderType["GITHUB"] = "github";
})(ProviderType || (exports.ProviderType = ProviderType = {}));
class OauthProviderEntity extends base_entity_1.BaseEntity {
    static create(data) {
        const provider = new OauthProviderEntity();
        provider.providerType = data.providerType;
        provider.email = data.email;
        provider.userId = data.userId;
        provider.providerId = data.providerId;
        return provider;
    }
}
exports.OauthProviderEntity = OauthProviderEntity;


/***/ }),

/***/ "./apps/inctagram/src/auth/domain/entities/session.entity.ts":
/*!*******************************************************************!*\
  !*** ./apps/inctagram/src/auth/domain/entities/session.entity.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeviceEntity = exports.SessionEntity = void 0;
const base_entity_1 = __webpack_require__(/*! ../../../utils/base.entity */ "./apps/inctagram/src/utils/base.entity.ts");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
const date_fns_1 = __webpack_require__(/*! date-fns */ "date-fns");
class SessionEntity extends base_entity_1.BaseEntity {
    static create(userId, deviceId) {
        const currentTime = new Date();
        const session = new SessionEntity();
        session.aliveTill = (0, date_fns_1.add)(currentTime, { minutes: 15 });
        session.userId = userId;
        session.lastActiveDate = currentTime.toISOString();
        session.deviceId = deviceId;
        return session;
    }
}
exports.SessionEntity = SessionEntity;
class DeviceEntity {
    static create(data) {
        const device = new DeviceEntity();
        device.deviceId = (0, uuid_1.v4)();
        device.ip = data.ip;
        device.title = data.title;
        return device;
    }
}
exports.DeviceEntity = DeviceEntity;


/***/ }),

/***/ "./apps/inctagram/src/auth/domain/entities/user.entity.ts":
/*!****************************************************************!*\
  !*** ./apps/inctagram/src/auth/domain/entities/user.entity.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserConfirmationEntity = exports.UserEntity = void 0;
const base_entity_1 = __webpack_require__(/*! ../../../utils/base.entity */ "./apps/inctagram/src/utils/base.entity.ts");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
const date_fns_1 = __webpack_require__(/*! date-fns */ "date-fns");
class UserEntity extends base_entity_1.BaseEntity {
    static create(data) {
        const user = new UserEntity();
        user.email = data.email.toLowerCase();
        user.username = data.username;
        user.isConfirmed = data.isConfirmed;
        return user;
    }
}
exports.UserEntity = UserEntity;
class UserConfirmationEntity extends base_entity_1.BaseEntity {
    static create(userId) {
        const code = (0, uuid_1.v4)();
        const codeExpirationDate = (0, date_fns_1.add)(new Date(), {
            minutes: 3,
        });
        const userConfirmation = new UserConfirmationEntity();
        userConfirmation.confirmationCode = code;
        userConfirmation.codeExpirationDate = codeExpirationDate;
        userConfirmation.userId = userId;
        return userConfirmation;
    }
    updateConfirmationData() {
        const codeExpirationDate = (0, date_fns_1.add)(new Date(), {
            minutes: 3,
        });
        this.confirmationCode = (0, uuid_1.v4)();
        this.codeExpirationDate = codeExpirationDate;
    }
}
exports.UserConfirmationEntity = UserConfirmationEntity;


/***/ }),

/***/ "./apps/inctagram/src/auth/guards/bearer-auth.guard.ts":
/*!*************************************************************!*\
  !*** ./apps/inctagram/src/auth/guards/bearer-auth.guard.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BearerAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const users_repository_1 = __webpack_require__(/*! ../db/users.repository */ "./apps/inctagram/src/auth/db/users.repository.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let BearerAuthGuard = exports.BearerAuthGuard = class BearerAuthGuard {
    constructor(jwtService, usersRepo, configService) {
        this.jwtService = jwtService;
        this.usersRepo = usersRepo;
        this.configService = configService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('JWT_SECRET_KEY'),
            });
            if (payload.userId) {
                const user = await this.usersRepo.getUserById(payload.userId);
                if (user) {
                    request['owner'] = {
                        id: user.id,
                        email: user.email,
                    };
                }
                return true;
            }
        }
        catch {
            throw new common_1.UnauthorizedException();
        }
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
};
exports.BearerAuthGuard = BearerAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object])
], BearerAuthGuard);


/***/ }),

/***/ "./apps/inctagram/src/auth/managers/email.manager.ts":
/*!***********************************************************!*\
  !*** ./apps/inctagram/src/auth/managers/email.manager.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmailService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const nodemailer = __webpack_require__(/*! nodemailer */ "nodemailer");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let EmailService = exports.EmailService = class EmailService {
    constructor(configService) {
        this.configService = configService;
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'gmail',
            auth: {
                user: 'johnny178917@gmail.com',
                pass: this.configService.get('GOOGLE_PASSWORD'),
            },
        });
    }
    async sendMail(mailDetails, callback) {
        try {
            const info = await this.transporter.sendMail(mailDetails);
            callback(info);
        }
        catch (e) {
            throw Error('Error during email sending');
        }
    }
    async sendConfirmationCodeEmail(userEmail, message, subject) {
        const messageTemplate = `
            <h1>Thanks for your registration</h1>
            <p>To finish registration please follow the link below:
                <a href='https://inctagram.fun/auth/confirm-email?code=${message}&email=${userEmail}'>complete registration</a>
            </p>`;
        const options = {
            from: 'Johnny <johnny178917@gmail.com>',
            to: userEmail,
            subject: subject,
            html: messageTemplate,
        };
        try {
            await this.sendMail(options, () => {
                console.log('Email is delivered successfully');
                return true;
            });
        }
        catch (e) {
            throw Error('second error');
        }
    }
    async sendRecoveryCodeEmail(userEmail, message) {
        const messageTemplate = `
            <h1>Password recovery</h1>
            <p>To finish password recovery please follow the link below:
                <a href='https://inctagram.fun/auth/create-new-password?code=${message}&email=${userEmail}'>recovery password</a>
            </p>`;
        const options = {
            from: 'Johnny <johnny178917@gmail.com>',
            to: userEmail,
            subject: 'Recovery code',
            html: messageTemplate,
        };
        try {
            await this.sendMail(options, () => {
                console.log('recovery code Email is delivered successfully');
                return true;
            });
        }
        catch (e) {
            throw Error('second error');
        }
    }
    async sendNotificationEmail(userEmail) {
        const messageTemplate = `
            <h1>Congratulations!</h1>
            <p>You registered in our service
                <a href='https://inctagram.fun'>Inctagram</a>
            </p>`;
        const options = {
            from: 'Johnny <johnny178917@gmail.com>',
            to: userEmail,
            subject: 'Successful registration',
            html: messageTemplate,
        };
        try {
            await this.sendMail(options, () => {
                console.log('notification Email is delivered successfully');
                return true;
            });
        }
        catch (e) {
            throw Error('second error');
        }
    }
};
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], EmailService);


/***/ }),

/***/ "./apps/inctagram/src/auth/managers/user-hashing.manager.ts":
/*!******************************************************************!*\
  !*** ./apps/inctagram/src/auth/managers/user-hashing.manager.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserHashingManager = void 0;
const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");
class UserHashingManager {
    generateHash(password, salt) {
        return bcrypt.hash(password, salt);
    }
    _generateSalt(round) {
        return bcrypt.genSalt(round);
    }
    async getHashAndSalt(password) {
        const passwordSalt = await this._generateSalt(10);
        const passwordHash = await this.generateHash(password, passwordSalt);
        return { passwordHash, passwordSalt };
    }
}
exports.UserHashingManager = UserHashingManager;


/***/ }),

/***/ "./apps/inctagram/src/auth/strategies/github.strategy.ts":
/*!***************************************************************!*\
  !*** ./apps/inctagram/src/auth/strategies/github.strategy.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GithubStrategy = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const passport_github_1 = __webpack_require__(/*! passport-github */ "passport-github");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let GithubStrategy = exports.GithubStrategy = class GithubStrategy extends (0, passport_1.PassportStrategy)(passport_github_1.Strategy, 'github') {
    constructor(configService) {
        super({
            clientID: configService.get('GITHUB_CLIENT_ID'),
            clientSecret: configService.get('GITHUB_CLIENT_SECRET'),
            callbackURL: configService.get('PROD_URL') + '/api/v1/auth/github/redirect',
            scope: ['user'],
        });
    }
    async validate(accessToken, refreshToken, profile) {
        let email;
        if (!profile.emails) {
            const req = await fetch('https://api.github.com/user/emails', {
                headers: {
                    Authorization: 'token ' + accessToken,
                },
            });
            const emails = await req.json();
            if (req.status !== 404) {
                email = (emails.find((e) => e.primary) ?? emails[0]).email;
                return {
                    email: email || null,
                    id: profile.id,
                };
            }
        }
        throw new common_1.HttpException('email is hidden', common_1.HttpStatus.CONFLICT);
    }
};
exports.GithubStrategy = GithubStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], GithubStrategy);


/***/ }),

/***/ "./apps/inctagram/src/auth/strategies/google.strategy.ts":
/*!***************************************************************!*\
  !*** ./apps/inctagram/src/auth/strategies/google.strategy.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleStrategy = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const passport_google_oauth20_1 = __webpack_require__(/*! passport-google-oauth20 */ "passport-google-oauth20");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let GoogleStrategy = exports.GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    constructor(configService) {
        super({
            clientID: configService.get('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
            callbackURL: configService.get('PROD_URL') + '/api/v1/auth/google/redirect',
            scope: ['profile', 'email'],
        });
    }
    async validate(accessToken, refreshToken, profile) {
        return {
            email: profile.emails[0].value,
            id: profile.id,
        };
    }
};
exports.GoogleStrategy = GoogleStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], GoogleStrategy);


/***/ }),

/***/ "./apps/inctagram/src/auth/test/delete-user.command.ts":
/*!*************************************************************!*\
  !*** ./apps/inctagram/src/auth/test/delete-user.command.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TestDeleteUserHandler = exports.TestDeleteUserCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const users_repository_1 = __webpack_require__(/*! ../db/users.repository */ "./apps/inctagram/src/auth/db/users.repository.ts");
class TestDeleteUserCommand {
    constructor() { }
}
exports.TestDeleteUserCommand = TestDeleteUserCommand;
let TestDeleteUserHandler = exports.TestDeleteUserHandler = class TestDeleteUserHandler {
    constructor(usersRepo) {
        this.usersRepo = usersRepo;
    }
    async execute() {
        const me = await this.usersRepo.getUserByEmail('default@gmail.com');
        if (me) {
            await this.usersRepo.deleteUserByEmail('default@gmail.com', me.id);
        }
    }
};
exports.TestDeleteUserHandler = TestDeleteUserHandler = __decorate([
    (0, cqrs_1.CommandHandler)(TestDeleteUserCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _a : Object])
], TestDeleteUserHandler);


/***/ }),

/***/ "./apps/inctagram/src/configs/swagger.configs.ts":
/*!*******************************************************!*\
  !*** ./apps/inctagram/src/configs/swagger.configs.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createStaticSwagger = void 0;
const process = __webpack_require__(/*! process */ "process");
const fs_1 = __webpack_require__(/*! fs */ "fs");
const http_1 = __webpack_require__(/*! http */ "http");
function createStaticSwagger() {
    const env = process.env.NODE_ENV;
    const port = process.env.PORT;
    if (env === 'development') {
        const serverUrl = `http://localhost:${port}`;
        (0, http_1.get)(`${serverUrl}/swagger/swagger-ui-bundle.js`, function (response) {
            response.pipe((0, fs_1.createWriteStream)('apps/inctagram/swagger-static/swagger-ui-bundle.js'));
        });
        (0, http_1.get)(`${serverUrl}/swagger/swagger-ui-init.js`, function (response) {
            response.pipe((0, fs_1.createWriteStream)('apps/inctagram/swagger-static/swagger-ui-init.js'));
        });
        (0, http_1.get)(`${serverUrl}/swagger/swagger-ui-standalone-preset.js`, function (response) {
            response.pipe((0, fs_1.createWriteStream)('apps/inctagram/swagger-static/swagger-ui-standalone-preset.js'));
        });
        (0, http_1.get)(`${serverUrl}/swagger/swagger-ui.css`, function (response) {
            response.pipe((0, fs_1.createWriteStream)('apps/inctagram/swagger-static/swagger-ui.css'));
        });
    }
}
exports.createStaticSwagger = createStaticSwagger;


/***/ }),

/***/ "./apps/inctagram/src/features/posts/api/dto/create-post.body.dto.ts":
/*!***************************************************************************!*\
  !*** ./apps/inctagram/src/features/posts/api/dto/create-post.body.dto.ts ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePostBodyDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const trim_transformer_1 = __webpack_require__(/*! ../../../../utils/custom-validators/trim-transformer */ "./apps/inctagram/src/utils/custom-validators/trim-transformer.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const is_object_id_validator_1 = __webpack_require__(/*! ../../../../utils/custom-validators/is-object-id.validator */ "./apps/inctagram/src/utils/custom-validators/is-object-id.validator.ts");
class CreatePostBodyDto {
}
exports.CreatePostBodyDto = CreatePostBodyDto;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (0, trim_transformer_1.trimTransformer)(value, 'description')),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'post description',
        example: 'cool post about my journey',
        maxLength: 500,
        nullable: true,
    }),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreatePostBodyDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.Validate)(is_object_id_validator_1.IsObjectId),
    (0, swagger_1.ApiProperty)({
        description: 'previously created images ids',
        example: ['string'],
        minLength: 1,
    }),
    __metadata("design:type", Array)
], CreatePostBodyDto.prototype, "images", void 0);


/***/ }),

/***/ "./apps/inctagram/src/features/posts/api/dto/update-post.body.dto.ts":
/*!***************************************************************************!*\
  !*** ./apps/inctagram/src/features/posts/api/dto/update-post.body.dto.ts ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdatePostBodyDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const trim_transformer_1 = __webpack_require__(/*! ../../../../utils/custom-validators/trim-transformer */ "./apps/inctagram/src/utils/custom-validators/trim-transformer.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class UpdatePostBodyDto {
}
exports.UpdatePostBodyDto = UpdatePostBodyDto;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (0, trim_transformer_1.trimTransformer)(value, 'description')),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'post description',
        example: 'cool post about my journey',
        maxLength: 500,
        nullable: true,
    }),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], UpdatePostBodyDto.prototype, "description", void 0);


/***/ }),

/***/ "./apps/inctagram/src/features/posts/api/dto/upload-image.dto.ts":
/*!***********************************************************************!*\
  !*** ./apps/inctagram/src/features/posts/api/dto/upload-image.dto.ts ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadPostImageDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class UploadPostImageDto {
}
exports.UploadPostImageDto = UploadPostImageDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'file',
        type: 'string',
        format: 'binary',
        isArray: true,
    }),
    __metadata("design:type", String)
], UploadPostImageDto.prototype, "file", void 0);


/***/ }),

/***/ "./apps/inctagram/src/features/posts/api/posts.controller.ts":
/*!*******************************************************************!*\
  !*** ./apps/inctagram/src/features/posts/api/posts.controller.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const create_post_body_dto_1 = __webpack_require__(/*! ./dto/create-post.body.dto */ "./apps/inctagram/src/features/posts/api/dto/create-post.body.dto.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const posts_query_repository_1 = __webpack_require__(/*! ../db/posts.query-repository */ "./apps/inctagram/src/features/posts/db/posts.query-repository.ts");
const bearer_auth_guard_1 = __webpack_require__(/*! ../../../auth/guards/bearer-auth.guard */ "./apps/inctagram/src/auth/guards/bearer-auth.guard.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const user_decorator_1 = __webpack_require__(/*! ../../../utils/decorators/user.decorator */ "./apps/inctagram/src/utils/decorators/user.decorator.ts");
const types_1 = __webpack_require__(/*! ../../../types */ "./apps/inctagram/src/types/index.ts");
const create_post_command_1 = __webpack_require__(/*! ../application/use-cases/create-post.command */ "./apps/inctagram/src/features/posts/application/use-cases/create-post.command.ts");
const update_post_command_1 = __webpack_require__(/*! ../application/use-cases/update-post.command */ "./apps/inctagram/src/features/posts/application/use-cases/update-post.command.ts");
const swagger_constants_1 = __webpack_require__(/*! ../../../utils/constants/swagger-constants */ "./apps/inctagram/src/utils/constants/swagger-constants.ts");
const file_validator_1 = __webpack_require__(/*! ../../../utils/custom-validators/file.validator */ "./apps/inctagram/src/utils/custom-validators/file.validator.ts");
const default_query_params_1 = __webpack_require__(/*! ../../../utils/constants/default-query-params */ "./apps/inctagram/src/utils/constants/default-query-params.ts");
const upload_post_images_command_1 = __webpack_require__(/*! ../application/use-cases/upload-post-images.command */ "./apps/inctagram/src/features/posts/application/use-cases/upload-post-images.command.ts");
const messages_1 = __webpack_require__(/*! ../../../../../../types/messages */ "./types/messages.ts");
const default_get_query_uri_dto_1 = __webpack_require__(/*! ../../../utils/default-get-query.uri.dto */ "./apps/inctagram/src/utils/default-get-query.uri.dto.ts");
const create_error_object_1 = __webpack_require__(/*! ../../../utils/create-error-object */ "./apps/inctagram/src/utils/create-error-object.ts");
const delete_post_command_1 = __webpack_require__(/*! ../application/use-cases/delete-post.command */ "./apps/inctagram/src/features/posts/application/use-cases/delete-post.command.ts");
const response_examples_1 = __webpack_require__(/*! ./swagger-examples/response-examples */ "./apps/inctagram/src/features/posts/api/swagger-examples/response-examples.ts");
const update_post_body_dto_1 = __webpack_require__(/*! ./dto/update-post.body.dto */ "./apps/inctagram/src/features/posts/api/dto/update-post.body.dto.ts");
const upload_image_dto_1 = __webpack_require__(/*! ./dto/upload-image.dto */ "./apps/inctagram/src/features/posts/api/dto/upload-image.dto.ts");
let PostsController = exports.PostsController = class PostsController {
    constructor(commandBus, postsQueryRepository, clientProxy) {
        this.commandBus = commandBus;
        this.postsQueryRepository = postsQueryRepository;
        this.clientProxy = clientProxy;
    }
    async getPosts(user, queryPost) {
        return await this.postsQueryRepository.findPosts(queryPost, user.id);
    }
    async createPost(user, body) {
        const createResult = await this.commandBus.execute(new create_post_command_1.CreatePostCommand({
            userId: user.id,
            description: body.description,
            images: body.images,
        }));
        if (createResult === common_1.HttpStatus.NOT_FOUND) {
            throw new common_1.UnauthorizedException();
        }
        return createResult;
    }
    async updatePost(user, body, postId) {
        const updateResult = await this.commandBus.execute(new update_post_command_1.UpdatePostCommand({
            userId: user.id,
            postId,
            description: body.description,
        }));
        if (updateResult === common_1.HttpStatus.NOT_FOUND) {
            const error = (0, create_error_object_1.createErrorMessage)('wrong id', 'id');
            throw new common_1.BadRequestException(error);
        }
        if (updateResult === common_1.HttpStatus.FORBIDDEN) {
            throw new common_1.ForbiddenException();
        }
        return;
    }
    async deletePost(user, postId) {
        const updateResult = await this.commandBus.execute(new delete_post_command_1.DeletePostCommand({
            userId: user.id,
            postId,
        }));
        if (updateResult === common_1.HttpStatus.NOT_FOUND) {
            const error = (0, create_error_object_1.createErrorMessage)('wrong id', 'id');
            throw new common_1.BadRequestException(error);
        }
        if (updateResult === common_1.HttpStatus.FORBIDDEN) {
            throw new common_1.ForbiddenException();
        }
        return;
    }
    async uploadPostImage(user, files) {
        const buffers = files.map((file) => file.buffer);
        return this.commandBus.execute(new upload_post_images_command_1.UploadPostImagesCommand(buffers, user.id));
    }
    async deletePostImage(user, imageId) {
        try {
            return this.clientProxy.send({ cmd: messages_1.MicroserviceMessagesEnum.DELETE_POST_IMAGE }, { userId: user.id, imageId });
        }
        catch (err) {
            console.log('error on deleting post image');
        }
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get posts' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
        content: {
            'application/json': { example: response_examples_1.GetRequestPostsViewExample },
        },
    }),
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)((0, swagger_constants_1.CursorQueryOptions)('ID of the last uploaded post. If endCursorPostId not provided, the first set of posts is returned.')),
    (0, swagger_1.ApiQuery)(swagger_constants_1.SortDirectionQueryOptions),
    (0, swagger_1.ApiQuery)(swagger_constants_1.SortByQueryOptions),
    (0, swagger_1.ApiQuery)(swagger_constants_1.PageSizeQueryOptions),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof types_1.UserTypes !== "undefined" && types_1.UserTypes) === "function" ? _d : Object, typeof (_e = typeof default_get_query_uri_dto_1.GetDefaultUriDto !== "undefined" && default_get_query_uri_dto_1.GetDefaultUriDto) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getPosts", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new post' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Post created',
        content: {
            'application/json': { example: response_examples_1.PostViewExample },
        },
    }),
    (0, swagger_1.ApiBadRequestResponse)(swagger_constants_1.BadRequestResponseOptions),
    (0, common_1.Post)(),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof types_1.UserTypes !== "undefined" && types_1.UserTypes) === "function" ? _f : Object, typeof (_g = typeof create_post_body_dto_1.CreatePostBodyDto !== "undefined" && create_post_body_dto_1.CreatePostBodyDto) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "createPost", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update existing post' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiNoContentResponse)(swagger_constants_1.NoContentResponseOptions),
    (0, swagger_1.ApiForbiddenResponse)(swagger_constants_1.ForbiddenRequestResponseOptions),
    (0, swagger_1.ApiNotFoundResponse)(swagger_constants_1.NotFoundResponseOptions),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof types_1.UserTypes !== "undefined" && types_1.UserTypes) === "function" ? _h : Object, typeof (_j = typeof update_post_body_dto_1.UpdatePostBodyDto !== "undefined" && update_post_body_dto_1.UpdatePostBodyDto) === "function" ? _j : Object, Number]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "updatePost", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete existing post' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiNoContentResponse)(swagger_constants_1.NoContentResponseOptions),
    (0, swagger_1.ApiNotFoundResponse)(swagger_constants_1.NotFoundResponseOptions),
    (0, swagger_1.ApiForbiddenResponse)(swagger_constants_1.ForbiddenRequestResponseOptions),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof types_1.UserTypes !== "undefined" && types_1.UserTypes) === "function" ? _k : Object, Number]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "deletePost", null);
__decorate([
    (0, common_1.Post)('images'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload image to new post' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'Profile avatar',
        type: upload_image_dto_1.UploadPostImageDto,
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiUnprocessableEntityResponse)({
        description: 'invalid file, wrong fileType or maxSize',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Uploaded images information object.',
        content: {
            'application/json': { example: response_examples_1.PostImagesViewExample },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10)),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.UploadedFiles)(new common_1.ParseFilePipeBuilder()
        .addFileTypeValidator({
        fileType: /^.+(jpeg|png)$/,
    })
        .addValidator(new file_validator_1.CheckMimetype({ mimetype: 'jpeg' }))
        .addMaxSizeValidator({
        maxSize: default_query_params_1.POST_IMAGE_NORMAL_SIZE,
    })
        .build({
        errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof types_1.UserTypes !== "undefined" && types_1.UserTypes) === "function" ? _l : Object, Array]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "uploadPostImage", null);
__decorate([
    (0, common_1.Delete)('images/:imageId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete post`s image' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiNoContentResponse)(swagger_constants_1.NoContentResponseOptions),
    (0, swagger_1.ApiForbiddenResponse)(swagger_constants_1.ForbiddenRequestResponseOptions),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('imageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_m = typeof types_1.UserTypes !== "undefined" && types_1.UserTypes) === "function" ? _m : Object, String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "deletePostImage", null);
exports.PostsController = PostsController = __decorate([
    (0, swagger_1.ApiTags)('Posts'),
    (0, common_1.Controller)('posts'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(bearer_auth_guard_1.BearerAuthGuard),
    (0, swagger_1.ApiUnauthorizedResponse)(swagger_constants_1.UnauthorizedRequestResponseOptions),
    __param(2, (0, common_1.Inject)('FILES_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _a : Object, typeof (_b = typeof posts_query_repository_1.PostsQueryRepository !== "undefined" && posts_query_repository_1.PostsQueryRepository) === "function" ? _b : Object, typeof (_c = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _c : Object])
], PostsController);


/***/ }),

/***/ "./apps/inctagram/src/features/posts/api/public-posts.controller.ts":
/*!**************************************************************************!*\
  !*** ./apps/inctagram/src/features/posts/api/public-posts.controller.ts ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PublicPostsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const posts_query_repository_1 = __webpack_require__(/*! ../db/posts.query-repository */ "./apps/inctagram/src/features/posts/db/posts.query-repository.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const swagger_constants_1 = __webpack_require__(/*! ../../../utils/constants/swagger-constants */ "./apps/inctagram/src/utils/constants/swagger-constants.ts");
const default_get_query_uri_dto_1 = __webpack_require__(/*! ../../../utils/default-get-query.uri.dto */ "./apps/inctagram/src/utils/default-get-query.uri.dto.ts");
const response_examples_1 = __webpack_require__(/*! ./swagger-examples/response-examples */ "./apps/inctagram/src/features/posts/api/swagger-examples/response-examples.ts");
let PublicPostsController = exports.PublicPostsController = class PublicPostsController {
    constructor(postsQueryRepository) {
        this.postsQueryRepository = postsQueryRepository;
    }
    async getUserPosts(queryPost, userId) {
        return await this.postsQueryRepository.findPosts(queryPost, userId);
    }
    async getAllPublicPosts(queryPost) {
        return await this.postsQueryRepository.findPosts(queryPost);
    }
    async getPostById(postId) {
        return await this.postsQueryRepository.getPostById(postId);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all user`s posts' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
        content: {
            'application/json': { example: response_examples_1.GetRequestPostsViewExample },
        },
    }),
    (0, common_1.Get)('user/:userId'),
    (0, swagger_1.ApiQuery)((0, swagger_constants_1.CursorQueryOptions)('ID of the last uploaded post. If endCursorPostId not provided, the first set of posts is returned.')),
    (0, swagger_1.ApiQuery)(swagger_constants_1.SortDirectionQueryOptions),
    (0, swagger_1.ApiQuery)(swagger_constants_1.SortByQueryOptions),
    (0, swagger_1.ApiQuery)(swagger_constants_1.PageSizeQueryOptions),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof default_get_query_uri_dto_1.GetDefaultUriDto !== "undefined" && default_get_query_uri_dto_1.GetDefaultUriDto) === "function" ? _b : Object, Number]),
    __metadata("design:returntype", Promise)
], PublicPostsController.prototype, "getUserPosts", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all public posts' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
        content: {
            'application/json': { example: response_examples_1.GetRequestPostsViewExample },
        },
    }),
    (0, common_1.Get)('all'),
    (0, swagger_1.ApiQuery)((0, swagger_constants_1.CursorQueryOptions)('ID of the last uploaded post. If endCursorPostId not provided, the first set of posts is returned.')),
    (0, swagger_1.ApiQuery)(swagger_constants_1.SortDirectionQueryOptions),
    (0, swagger_1.ApiQuery)(swagger_constants_1.SortByQueryOptions),
    (0, swagger_1.ApiQuery)(swagger_constants_1.PageSizeQueryOptions),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof default_get_query_uri_dto_1.GetDefaultUriDto !== "undefined" && default_get_query_uri_dto_1.GetDefaultUriDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], PublicPostsController.prototype, "getAllPublicPosts", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get post by id' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
        content: {
            'application/json': { example: response_examples_1.GetRequestPostsViewExample },
        },
    }),
    (0, common_1.Get)(':postId'),
    __param(0, (0, common_1.Param)('postId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PublicPostsController.prototype, "getPostById", null);
exports.PublicPostsController = PublicPostsController = __decorate([
    (0, swagger_1.ApiTags)('Public-Posts'),
    (0, common_1.Controller)('public-posts'),
    __metadata("design:paramtypes", [typeof (_a = typeof posts_query_repository_1.PostsQueryRepository !== "undefined" && posts_query_repository_1.PostsQueryRepository) === "function" ? _a : Object])
], PublicPostsController);


/***/ }),

/***/ "./apps/inctagram/src/features/posts/api/swagger-examples/response-examples.ts":
/*!*************************************************************************************!*\
  !*** ./apps/inctagram/src/features/posts/api/swagger-examples/response-examples.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetRequestPostsViewExample = exports.PostViewExample = exports.PostImagesViewExample = void 0;
exports.PostImagesViewExample = {
    images: [
        {
            url: 'https://example.com/image.jpg',
            width: 300,
            height: 300,
            fileSize: 300,
            uploadId: 'string',
        },
    ],
};
exports.PostViewExample = {
    id: 1,
    username: 'Alex',
    description: 'description',
    location: 'location',
    images: [
        {
            url: 'https://example.com/image.jpg',
            width: 300,
            height: 300,
            fileSize: 300,
            uploadId: 'string',
        },
    ],
    createdAt: '2024-03-07T16:57:15.304Z',
    updatedAt: '2024-03-07T16:57:15.304Z',
    ownerId: 1,
    avatarOwner: 'https://storage.yandexcloud.net/users-inctagram/users/41/avatar/3359612b-cff9-4b6b-8897-fbbd09153d51-images-45x45',
    owner: {
        firstName: 'firstName',
        lastName: 'lastName',
    },
};
exports.GetRequestPostsViewExample = {
    totalCount: 1,
    pageSize: 8,
    pagesCount: 1,
    cursor: 1,
    items: [exports.PostViewExample],
};


/***/ }),

/***/ "./apps/inctagram/src/features/posts/application/use-cases/create-post.command.ts":
/*!****************************************************************************************!*\
  !*** ./apps/inctagram/src/features/posts/application/use-cases/create-post.command.ts ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePostHandler = exports.CreatePostCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const mapPost_1 = __webpack_require__(/*! ../../db/view/mapPost */ "./apps/inctagram/src/features/posts/db/view/mapPost.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const posts_repository_1 = __webpack_require__(/*! ../../db/posts.repository */ "./apps/inctagram/src/features/posts/db/posts.repository.ts");
const post_entity_1 = __webpack_require__(/*! ../../domain/entities/post.entity */ "./apps/inctagram/src/features/posts/domain/entities/post.entity.ts");
const messages_1 = __webpack_require__(/*! ../../../../../../../types/messages */ "./types/messages.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const profile_repository_1 = __webpack_require__(/*! ../../../profile/db/profile.repository */ "./apps/inctagram/src/features/profile/db/profile.repository.ts");
class CreatePostCommand {
    constructor(data) {
        this.data = data;
    }
}
exports.CreatePostCommand = CreatePostCommand;
let CreatePostHandler = exports.CreatePostHandler = class CreatePostHandler {
    constructor(profileRepo, postsRepo, client) {
        this.profileRepo = profileRepo;
        this.postsRepo = postsRepo;
        this.client = client;
    }
    async execute({ data }) {
        const userProfile = await this.profileRepo.getUserProfile(data.userId);
        if (userProfile === null)
            return common_1.HttpStatus.NOT_FOUND;
        const newPost = post_entity_1.PostEntity.create(data);
        const res = await this.postsRepo.createPost(newPost);
        const images = await (0, rxjs_1.firstValueFrom)(this.getImages(data.images));
        const userAvatar = await this.getUserThumbnailAvatar(userProfile.thumbnailId);
        return (0, mapPost_1.mapPostsWithImages)({
            post: res,
            postImages: images,
            userAvatar,
            profile: userProfile,
        });
    }
    getImages(imagesIds) {
        const pattern = { cmd: messages_1.MicroserviceMessagesEnum.GET_POST_IMAGES };
        const payload = {
            imagesIds,
        };
        return this.client.send(pattern, payload);
    }
    getUserAvatar(imageId) {
        const pattern = { cmd: messages_1.MicroserviceMessagesEnum.GET_USER_THUMBNAIL_AVATAR };
        const payload = {
            imageId,
        };
        return this.client.send(pattern, payload);
    }
    async getUserThumbnailAvatar(imageId) {
        const thumbnail = await (0, rxjs_1.firstValueFrom)(this.getUserAvatar(imageId));
        return thumbnail?.url;
    }
};
exports.CreatePostHandler = CreatePostHandler = __decorate([
    (0, cqrs_1.CommandHandler)(CreatePostCommand),
    __param(2, (0, common_1.Inject)('FILES_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof profile_repository_1.ProfileRepository !== "undefined" && profile_repository_1.ProfileRepository) === "function" ? _a : Object, typeof (_b = typeof posts_repository_1.PostsRepository !== "undefined" && posts_repository_1.PostsRepository) === "function" ? _b : Object, typeof (_c = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _c : Object])
], CreatePostHandler);


/***/ }),

/***/ "./apps/inctagram/src/features/posts/application/use-cases/delete-post.command.ts":
/*!****************************************************************************************!*\
  !*** ./apps/inctagram/src/features/posts/application/use-cases/delete-post.command.ts ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeletePostHandler = exports.DeletePostCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const posts_repository_1 = __webpack_require__(/*! ../../db/posts.repository */ "./apps/inctagram/src/features/posts/db/posts.repository.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
class DeletePostCommand {
    constructor(data) {
        this.data = data;
    }
}
exports.DeletePostCommand = DeletePostCommand;
let DeletePostHandler = exports.DeletePostHandler = class DeletePostHandler {
    constructor(postsRepo) {
        this.postsRepo = postsRepo;
    }
    async execute({ data }) {
        const post = await this.postsRepo.getPostById(data.postId);
        if (!post)
            return common_1.HttpStatus.NOT_FOUND;
        if (post.userId !== data.userId)
            return common_1.HttpStatus.FORBIDDEN;
        await this.postsRepo.deletePost(data.postId);
        return true;
    }
};
exports.DeletePostHandler = DeletePostHandler = __decorate([
    (0, cqrs_1.CommandHandler)(DeletePostCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof posts_repository_1.PostsRepository !== "undefined" && posts_repository_1.PostsRepository) === "function" ? _a : Object])
], DeletePostHandler);


/***/ }),

/***/ "./apps/inctagram/src/features/posts/application/use-cases/update-post.command.ts":
/*!****************************************************************************************!*\
  !*** ./apps/inctagram/src/features/posts/application/use-cases/update-post.command.ts ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdatePostHandler = exports.UpdatePostCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const posts_repository_1 = __webpack_require__(/*! ../../db/posts.repository */ "./apps/inctagram/src/features/posts/db/posts.repository.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
class UpdatePostCommand {
    constructor(data) {
        this.data = data;
    }
}
exports.UpdatePostCommand = UpdatePostCommand;
let UpdatePostHandler = exports.UpdatePostHandler = class UpdatePostHandler {
    constructor(postsRepo) {
        this.postsRepo = postsRepo;
    }
    async execute({ data }) {
        const post = await this.postsRepo.getPostById(data.postId);
        if (!post)
            return common_1.HttpStatus.NOT_FOUND;
        if (post.userId !== data.userId)
            return common_1.HttpStatus.FORBIDDEN;
        await this.postsRepo.updatePost(data.postId, {
            description: data.description,
        });
        return true;
    }
};
exports.UpdatePostHandler = UpdatePostHandler = __decorate([
    (0, cqrs_1.CommandHandler)(UpdatePostCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof posts_repository_1.PostsRepository !== "undefined" && posts_repository_1.PostsRepository) === "function" ? _a : Object])
], UpdatePostHandler);


/***/ }),

/***/ "./apps/inctagram/src/features/posts/application/use-cases/upload-post-images.command.ts":
/*!***********************************************************************************************!*\
  !*** ./apps/inctagram/src/features/posts/application/use-cases/upload-post-images.command.ts ***!
  \***********************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadPostImagesHandler = exports.UploadPostImagesCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const mapPost_1 = __webpack_require__(/*! ../../db/view/mapPost */ "./apps/inctagram/src/features/posts/db/view/mapPost.ts");
const messages_1 = __webpack_require__(/*! ../../../../../../../types/messages */ "./types/messages.ts");
class UploadPostImagesCommand {
    constructor(buffers, userId) {
        this.buffers = buffers;
        this.userId = userId;
    }
}
exports.UploadPostImagesCommand = UploadPostImagesCommand;
let UploadPostImagesHandler = exports.UploadPostImagesHandler = class UploadPostImagesHandler {
    constructor(client) {
        this.client = client;
    }
    async execute({ buffers, userId }) {
        const data = await (0, rxjs_1.firstValueFrom)(await this.createFileImage(buffers, userId));
        return { images: (0, mapPost_1.mapPostImages)(data.postImages) };
    }
    async createFileImage(buffers, userId) {
        const pattern = { cmd: messages_1.MicroserviceMessagesEnum.UPLOAD_POST_IMAGES };
        const payload = {
            userId,
            buffers,
        };
        return this.client.send(pattern, payload);
    }
};
exports.UploadPostImagesHandler = UploadPostImagesHandler = __decorate([
    (0, cqrs_1.CommandHandler)(UploadPostImagesCommand),
    __param(0, (0, common_1.Inject)('FILES_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], UploadPostImagesHandler);


/***/ }),

/***/ "./apps/inctagram/src/features/posts/db/posts.query-repository.ts":
/*!************************************************************************!*\
  !*** ./apps/inctagram/src/features/posts/db/posts.query-repository.ts ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostsQueryRepository = void 0;
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mapPost_1 = __webpack_require__(/*! ./view/mapPost */ "./apps/inctagram/src/features/posts/db/view/mapPost.ts");
const get_request_mapper_helper_1 = __webpack_require__(/*! ../../../utils/helpers/get-request-mapper.helper */ "./apps/inctagram/src/utils/helpers/get-request-mapper.helper.ts");
const post_enum_1 = __webpack_require__(/*! ../domain/types/post.enum */ "./apps/inctagram/src/features/posts/domain/types/post.enum.ts");
const messages_1 = __webpack_require__(/*! ../../../../../../types/messages */ "./types/messages.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
let PostsQueryRepository = exports.PostsQueryRepository = class PostsQueryRepository {
    constructor(prismaClient, client) {
        this.prismaClient = prismaClient;
        this.client = client;
    }
    async findPosts(queryPost, userId) {
        const { pageSize, cursor, sortBy, sortDirection } = (0, get_request_mapper_helper_1.getRequestQueryMapper)(queryPost);
        const filterByStatusAndOptionalUserId = {
            status: post_enum_1.PostStatusEnum.ACTIVE,
        };
        if (userId) {
            filterByStatusAndOptionalUserId.userId = userId;
        }
        const filter = {
            where: filterByStatusAndOptionalUserId,
            take: pageSize,
            orderBy: { [sortBy]: sortDirection },
        };
        if (cursor) {
            filter.skip = 1;
            filter.cursor = { id: Number(cursor) };
        }
        const totalCount = await this.prismaClient.post.count({
            where: filterByStatusAndOptionalUserId,
        });
        const postsNPostImages = await this.prismaClient.post.findMany(filter);
        const lastPostId = postsNPostImages.length ? postsNPostImages.at(-1).id : 0;
        let userProfile;
        let userAvatar;
        if (userId) {
            userProfile = await this.getUserProfile(userId);
            userAvatar = await (0, rxjs_1.firstValueFrom)(this.getUserThumbnailAvatar(userProfile?.thumbnailId));
        }
        const items = [];
        for (const post of postsNPostImages) {
            if (!userId) {
                userProfile = await this.getUserProfile(post.userId);
                userAvatar = await (0, rxjs_1.firstValueFrom)(this.getUserThumbnailAvatar(userProfile?.thumbnailId));
            }
            const postImages = await (0, rxjs_1.firstValueFrom)(this.getPostImages(post.images));
            const mappedPost = (0, mapPost_1.mapPostsWithImages)({
                post,
                profile: userProfile,
                userAvatar: userAvatar?.url,
                postImages,
            });
            items.push(mappedPost);
        }
        return (0, get_request_mapper_helper_1.getRequestReturnMapper)({
            totalCount,
            items,
            cursor: lastPostId,
            pageSize,
        });
    }
    getUserProfile(userId) {
        return this.prismaClient.profile.findUnique({
            where: {
                userId,
            },
            include: {
                user: {
                    select: {
                        username: true,
                    },
                },
            },
        });
    }
    getUserThumbnailAvatar(imageId) {
        const pattern = { cmd: messages_1.MicroserviceMessagesEnum.GET_USER_THUMBNAIL_AVATAR };
        const payload = {
            imageId,
        };
        return this.client.send(pattern, payload);
    }
    getPostImages(imagesIds) {
        const pattern = { cmd: messages_1.MicroserviceMessagesEnum.GET_POST_IMAGES };
        const payload = {
            imagesIds,
        };
        return this.client.send(pattern, payload);
    }
    async getPostById(postId) {
        const post = await this.prismaClient.post.findUnique({
            where: { id: postId },
        });
        const userProfile = await this.getUserProfile(post.userId);
        const userAvatar = await (0, rxjs_1.firstValueFrom)(this.getUserThumbnailAvatar(userProfile?.thumbnailId));
        const postImages = await (0, rxjs_1.firstValueFrom)(this.getPostImages(post.images));
        return (0, mapPost_1.mapPostsWithImages)({
            post,
            profile: userProfile,
            userAvatar: userAvatar?.url,
            postImages,
        });
    }
};
exports.PostsQueryRepository = PostsQueryRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('FILES_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof client_1.PrismaClient !== "undefined" && client_1.PrismaClient) === "function" ? _a : Object, typeof (_b = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _b : Object])
], PostsQueryRepository);


/***/ }),

/***/ "./apps/inctagram/src/features/posts/db/posts.repository.ts":
/*!******************************************************************!*\
  !*** ./apps/inctagram/src/features/posts/db/posts.repository.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostsRepository = void 0;
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const post_enum_1 = __webpack_require__(/*! ../domain/types/post.enum */ "./apps/inctagram/src/features/posts/domain/types/post.enum.ts");
let PostsRepository = exports.PostsRepository = class PostsRepository {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    async getPostById(postId) {
        return this.prismaClient.post.findUnique({
            where: {
                id: postId,
            },
        });
    }
    async createPost(post) {
        return this.prismaClient.post.create({
            data: post,
        });
    }
    async updatePost(postId, body) {
        await this.prismaClient.post.update({
            where: { id: postId },
            data: { description: body.description },
        });
    }
    async deletePost(postId) {
        await this.prismaClient.post.update({
            where: { id: postId },
            data: { status: post_enum_1.PostStatusEnum.DELETED },
        });
    }
};
exports.PostsRepository = PostsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof client_1.PrismaClient !== "undefined" && client_1.PrismaClient) === "function" ? _a : Object])
], PostsRepository);


/***/ }),

/***/ "./apps/inctagram/src/features/posts/db/view/mapPost.ts":
/*!**************************************************************!*\
  !*** ./apps/inctagram/src/features/posts/db/view/mapPost.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mapPostImages = exports.mapPostsWithImages = void 0;
const mapPostsWithImages = ({ post, postImages, profile, userAvatar, }) => {
    return {
        id: post.id,
        description: post.description,
        images: (0, exports.mapPostImages)(postImages),
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        ownerId: post.userId,
        username: profile.user.username,
        location: 'location',
        avatarOwner: userAvatar ? process.env.FILES_STORAGE_URL + userAvatar : null,
        owner: {
            lastname: profile.lastname,
            firstname: profile.firstname,
        },
    };
};
exports.mapPostsWithImages = mapPostsWithImages;
const mapPostImages = (images) => {
    return images.map((image) => ({
        url: process.env.FILES_STORAGE_URL + image.url,
        width: image.width,
        height: image.height,
        fileSize: image.fileSize,
        uploadId: image.fileId,
    }));
};
exports.mapPostImages = mapPostImages;


/***/ }),

/***/ "./apps/inctagram/src/features/posts/domain/entities/post.entity.ts":
/*!**************************************************************************!*\
  !*** ./apps/inctagram/src/features/posts/domain/entities/post.entity.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostEntity = void 0;
const base_entity_1 = __webpack_require__(/*! ../../../../utils/base.entity */ "./apps/inctagram/src/utils/base.entity.ts");
const post_enum_1 = __webpack_require__(/*! ../types/post.enum */ "./apps/inctagram/src/features/posts/domain/types/post.enum.ts");
class PostEntity extends base_entity_1.BaseEntity {
    static create(data) {
        const { userId, images, description } = data;
        const post = new PostEntity();
        post.userId = userId;
        post.images = images;
        post.status = post_enum_1.PostStatusEnum.ACTIVE;
        if (description) {
            post.description = description;
        }
        return post;
    }
}
exports.PostEntity = PostEntity;


/***/ }),

/***/ "./apps/inctagram/src/features/posts/domain/types/post.enum.ts":
/*!*********************************************************************!*\
  !*** ./apps/inctagram/src/features/posts/domain/types/post.enum.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostStatusEnum = void 0;
var PostStatusEnum;
(function (PostStatusEnum) {
    PostStatusEnum["DELETED"] = "DELETED";
    PostStatusEnum["ACTIVE"] = "ACTIVE";
    PostStatusEnum["BLOCKED"] = "BLOCKED";
})(PostStatusEnum || (exports.PostStatusEnum = PostStatusEnum = {}));


/***/ }),

/***/ "./apps/inctagram/src/features/posts/posts.module.ts":
/*!***********************************************************!*\
  !*** ./apps/inctagram/src/features/posts/posts.module.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
const prisma_service_1 = __webpack_require__(/*! ../../prisma.service */ "./apps/inctagram/src/prisma.service.ts");
const posts_controller_1 = __webpack_require__(/*! ./api/posts.controller */ "./apps/inctagram/src/features/posts/api/posts.controller.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const posts_query_repository_1 = __webpack_require__(/*! ./db/posts.query-repository */ "./apps/inctagram/src/features/posts/db/posts.query-repository.ts");
const upload_post_images_command_1 = __webpack_require__(/*! ./application/use-cases/upload-post-images.command */ "./apps/inctagram/src/features/posts/application/use-cases/upload-post-images.command.ts");
const create_post_command_1 = __webpack_require__(/*! ./application/use-cases/create-post.command */ "./apps/inctagram/src/features/posts/application/use-cases/create-post.command.ts");
const posts_repository_1 = __webpack_require__(/*! ./db/posts.repository */ "./apps/inctagram/src/features/posts/db/posts.repository.ts");
const profile_repository_1 = __webpack_require__(/*! ../profile/db/profile.repository */ "./apps/inctagram/src/features/profile/db/profile.repository.ts");
const delete_post_command_1 = __webpack_require__(/*! ./application/use-cases/delete-post.command */ "./apps/inctagram/src/features/posts/application/use-cases/delete-post.command.ts");
const update_post_command_1 = __webpack_require__(/*! ./application/use-cases/update-post.command */ "./apps/inctagram/src/features/posts/application/use-cases/update-post.command.ts");
const users_repository_1 = __webpack_require__(/*! ../../auth/db/users.repository */ "./apps/inctagram/src/auth/db/users.repository.ts");
const public_posts_controller_1 = __webpack_require__(/*! ./api/public-posts.controller */ "./apps/inctagram/src/features/posts/api/public-posts.controller.ts");
const CommandHandlers = [
    upload_post_images_command_1.UploadPostImagesHandler,
    create_post_command_1.CreatePostHandler,
    delete_post_command_1.DeletePostHandler,
    update_post_command_1.UpdatePostHandler,
];
const Repos = [
    posts_query_repository_1.PostsQueryRepository,
    posts_repository_1.PostsRepository,
    profile_repository_1.ProfileRepository,
    users_repository_1.UsersRepository,
];
let PostsModule = exports.PostsModule = class PostsModule {
};
exports.PostsModule = PostsModule = __decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule, config_1.ConfigModule],
        controllers: [posts_controller_1.PostsController, public_posts_controller_1.PublicPostsController],
        providers: [
            {
                provide: 'FILES_SERVICE',
                useFactory: (configService) => {
                    const options = {
                        transport: microservices_1.Transport.TCP,
                        options: {
                            host: configService.get('FILES_SERVICE_HOST'),
                            port: configService.get('FILES_SERVICE_PORT'),
                        },
                    };
                    return microservices_1.ClientProxyFactory.create(options);
                },
                inject: [config_1.ConfigService],
            },
            client_1.PrismaClient,
            prisma_service_1.PrismaService,
            jwt_1.JwtService,
            config_1.ConfigService,
            ...CommandHandlers,
            ...Repos,
        ],
    })
], PostsModule);


/***/ }),

/***/ "./apps/inctagram/src/features/profile/api/dto/update-profile.dto.ts":
/*!***************************************************************************!*\
  !*** ./apps/inctagram/src/features/profile/api/dto/update-profile.dto.ts ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateProfileDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class UpdateProfileDto {
}
exports.UpdateProfileDto = UpdateProfileDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'username',
        example: 'string',
    }),
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9_-]*$/),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'firstname',
        example: 'string',
    }),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.Matches)(/^[a-zA-Zа-яА-Я]*$/),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "firstname", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'lastname',
        example: 'string',
    }),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.Matches)(/^[a-zA-Zа-яА-Я]*$/),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "lastname", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'birthDate',
        example: '01-01-2000',
    }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "birthDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'about me',
        example: 'string',
        nullable: true,
    }),
    (0, class_validator_1.MinLength)(0),
    (0, class_validator_1.MaxLength)(200),
    (0, class_validator_1.Matches)(/^[a-zA-Zа-яА-Я0-9!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~\s]*$/),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "aboutMe", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'city',
        nullable: true,
    }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "city", void 0);


/***/ }),

/***/ "./apps/inctagram/src/features/profile/api/dto/upload-avatar.dto.ts":
/*!**************************************************************************!*\
  !*** ./apps/inctagram/src/features/profile/api/dto/upload-avatar.dto.ts ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadAvatarDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class UploadAvatarDto {
}
exports.UploadAvatarDto = UploadAvatarDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'file',
        type: 'string',
        format: 'binary',
    }),
    __metadata("design:type", String)
], UploadAvatarDto.prototype, "file", void 0);


/***/ }),

/***/ "./apps/inctagram/src/features/profile/api/profile.controller.ts":
/*!***********************************************************************!*\
  !*** ./apps/inctagram/src/features/profile/api/profile.controller.ts ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const update_profile_dto_1 = __webpack_require__(/*! ./dto/update-profile.dto */ "./apps/inctagram/src/features/profile/api/dto/update-profile.dto.ts");
const bearer_auth_guard_1 = __webpack_require__(/*! ../../../auth/guards/bearer-auth.guard */ "./apps/inctagram/src/auth/guards/bearer-auth.guard.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const swagger_constants_1 = __webpack_require__(/*! ../../../utils/constants/swagger-constants */ "./apps/inctagram/src/utils/constants/swagger-constants.ts");
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
const profile_query_repository_1 = __webpack_require__(/*! ../db/profile.query-repository */ "./apps/inctagram/src/features/profile/db/profile.query-repository.ts");
const update_profile_command_1 = __webpack_require__(/*! ../application/use-cases/update-profile.command */ "./apps/inctagram/src/features/profile/application/use-cases/update-profile.command.ts");
const upload_avatar_command_1 = __webpack_require__(/*! ../application/use-cases/upload-avatar.command */ "./apps/inctagram/src/features/profile/application/use-cases/upload-avatar.command.ts");
const upload_avatar_dto_1 = __webpack_require__(/*! ./dto/upload-avatar.dto */ "./apps/inctagram/src/features/profile/api/dto/upload-avatar.dto.ts");
const delete_avatar_command_1 = __webpack_require__(/*! ../application/use-cases/delete-avatar.command */ "./apps/inctagram/src/features/profile/application/use-cases/delete-avatar.command.ts");
const user_decorator_1 = __webpack_require__(/*! ../../../utils/decorators/user.decorator */ "./apps/inctagram/src/utils/decorators/user.decorator.ts");
const types_1 = __webpack_require__(/*! ../../../types */ "./apps/inctagram/src/types/index.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const file_validator_1 = __webpack_require__(/*! ../../../utils/custom-validators/file.validator */ "./apps/inctagram/src/utils/custom-validators/file.validator.ts");
const response_examples_1 = __webpack_require__(/*! ./swagger-examples/response-examples */ "./apps/inctagram/src/features/profile/api/swagger-examples/response-examples.ts");
let ProfileController = exports.ProfileController = class ProfileController {
    constructor(commandBus, profileQueryRepo, client) {
        this.commandBus = commandBus;
        this.profileQueryRepo = profileQueryRepo;
        this.client = client;
    }
    async sendHello() {
        try {
            return this.client.send({
                cmd: 'hello-world',
            }, {
                l: '',
            });
        }
        catch (e) {
            console.log(e, 'error');
            throw new common_1.HttpException(e, common_1.HttpStatus.CONFLICT);
        }
    }
    findProfile(user) {
        return this.profileQueryRepo.getUserProfile(user.id);
    }
    async update(updateProfileDto, user) {
        await this.commandBus.execute(new update_profile_command_1.UpdateProfileCommand(updateProfileDto, user.id));
        return;
    }
    async uploadFile(user, file) {
        return this.commandBus.execute(new upload_avatar_command_1.UploadAvatarCommand(file.buffer, user.id));
    }
    async delete(user) {
        await this.commandBus.execute(new delete_avatar_command_1.DeleteAvatarCommand(user.id));
        return;
    }
};
__decorate([
    (0, common_1.Get)('hello-world'),
    (0, swagger_1.ApiExcludeEndpoint)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "sendHello", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({
        description: 'success',
        content: {
            'application/json': { example: response_examples_1.ProfileViewExample },
        },
    }),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof types_1.UserTypes !== "undefined" && types_1.UserTypes) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "findProfile", null);
__decorate([
    (0, common_1.Put)(),
    (0, swagger_1.ApiNoContentResponse)(swagger_constants_1.NoContentResponseOptions),
    (0, swagger_1.ApiBadRequestResponse)(swagger_constants_1.BadRequestResponseOptions),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof update_profile_dto_1.UpdateProfileDto !== "undefined" && update_profile_dto_1.UpdateProfileDto) === "function" ? _e : Object, typeof (_f = typeof types_1.UserTypes !== "undefined" && types_1.UserTypes) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('avatar'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'Profile avatar',
        type: upload_avatar_dto_1.UploadAvatarDto,
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiUnprocessableEntityResponse)({
        description: 'invalid file, wrong fileType or maxSize',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Uploaded image information object.',
        content: {
            'application/json': { example: response_examples_1.ProfileImagesViewExample },
        },
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipeBuilder()
        .addFileTypeValidator({
        fileType: /^.+(jpeg|png)$/,
    })
        .addValidator(new file_validator_1.CheckMimetype({ mimetype: 'jpeg' }))
        .addMaxSizeValidator({
        maxSize: 10000000,
    })
        .build({
        errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof types_1.UserTypes !== "undefined" && types_1.UserTypes) === "function" ? _g : Object, typeof (_j = typeof Express !== "undefined" && (_h = Express.Multer) !== void 0 && _h.File) === "function" ? _j : Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Delete)('avatar'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiNoContentResponse)(swagger_constants_1.NoContentResponseOptions),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof types_1.UserTypes !== "undefined" && types_1.UserTypes) === "function" ? _k : Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "delete", null);
exports.ProfileController = ProfileController = __decorate([
    (0, common_1.Controller)('profile'),
    (0, swagger_1.ApiTags)('Profile'),
    (0, common_1.UseGuards)(bearer_auth_guard_1.BearerAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiUnauthorizedResponse)(swagger_constants_1.UnauthorizedRequestResponseOptions),
    __param(2, (0, common_1.Inject)('FILES_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _a : Object, typeof (_b = typeof profile_query_repository_1.ProfileQueryRepository !== "undefined" && profile_query_repository_1.ProfileQueryRepository) === "function" ? _b : Object, typeof (_c = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _c : Object])
], ProfileController);


/***/ }),

/***/ "./apps/inctagram/src/features/profile/api/public-profile.controller.ts":
/*!******************************************************************************!*\
  !*** ./apps/inctagram/src/features/profile/api/public-profile.controller.ts ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PublicProfileController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const profile_query_repository_1 = __webpack_require__(/*! ../db/profile.query-repository */ "./apps/inctagram/src/features/profile/db/profile.query-repository.ts");
const response_examples_1 = __webpack_require__(/*! ./swagger-examples/response-examples */ "./apps/inctagram/src/features/profile/api/swagger-examples/response-examples.ts");
let PublicProfileController = exports.PublicProfileController = class PublicProfileController {
    constructor(profileQueryRepo) {
        this.profileQueryRepo = profileQueryRepo;
    }
    getRegisteredUsers() {
        return this.profileQueryRepo.getAllUsersCount();
    }
    findProfile(userId) {
        return this.profileQueryRepo.getUserPublicProfile(userId);
    }
};
__decorate([
    (0, common_1.Get)('/total'),
    (0, swagger_1.ApiOkResponse)({
        description: 'success',
        content: {
            'application/json': { example: response_examples_1.PublicProfilesTotalCountViewExample },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PublicProfileController.prototype, "getRegisteredUsers", null);
__decorate([
    (0, common_1.Get)('/:userId'),
    (0, swagger_1.ApiOkResponse)({
        description: 'success',
        content: {
            'application/json': { example: response_examples_1.ProfileViewExample },
        },
    }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PublicProfileController.prototype, "findProfile", null);
exports.PublicProfileController = PublicProfileController = __decorate([
    (0, common_1.Controller)('public-profile'),
    (0, swagger_1.ApiTags)('Public-profile'),
    __metadata("design:paramtypes", [typeof (_a = typeof profile_query_repository_1.ProfileQueryRepository !== "undefined" && profile_query_repository_1.ProfileQueryRepository) === "function" ? _a : Object])
], PublicProfileController);


/***/ }),

/***/ "./apps/inctagram/src/features/profile/api/swagger-examples/response-examples.ts":
/*!***************************************************************************************!*\
  !*** ./apps/inctagram/src/features/profile/api/swagger-examples/response-examples.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PublicProfilesTotalCountViewExample = exports.ProfileViewExample = exports.ProfileImagesViewExample = void 0;
exports.ProfileImagesViewExample = {
    'avatar-medium': {
        url: 'https://example.com/image.jpg',
        width: 192,
        height: 192,
        fileSize: 300,
    },
    'avatar-thumbnail': {
        url: 'https://example.com/image.jpg',
        width: 45,
        height: 45,
        fileSize: 300,
    },
};
exports.ProfileViewExample = {
    id: 1,
    username: 'user1',
    firstname: 'John',
    lastname: 'Doe',
    city: 'London',
    dateOfBirth: '01-01-2000',
    aboutMe: 'About me',
    avatars: exports.ProfileImagesViewExample,
    createdAt: '2024-02-13T16:27:51.919Z',
};
exports.PublicProfilesTotalCountViewExample = {
    totalUsersCount: 50,
};


/***/ }),

/***/ "./apps/inctagram/src/features/profile/application/use-cases/delete-avatar.command.ts":
/*!********************************************************************************************!*\
  !*** ./apps/inctagram/src/features/profile/application/use-cases/delete-avatar.command.ts ***!
  \********************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteAvatarHandler = exports.DeleteAvatarCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const profile_repository_1 = __webpack_require__(/*! ../../db/profile.repository */ "./apps/inctagram/src/features/profile/db/profile.repository.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const messages_1 = __webpack_require__(/*! ../../../../../../../types/messages */ "./types/messages.ts");
class DeleteAvatarCommand {
    constructor(userId) {
        this.userId = userId;
    }
}
exports.DeleteAvatarCommand = DeleteAvatarCommand;
let DeleteAvatarHandler = exports.DeleteAvatarHandler = class DeleteAvatarHandler {
    constructor(profileRepo, client) {
        this.profileRepo = profileRepo;
        this.client = client;
    }
    async execute({ userId }) {
        const profile = await this.profileRepo.getUserProfile(userId);
        if (profile) {
            this.deleteFromMS(userId).subscribe();
            await this.profileRepo.removeAvatarFromProfile(userId);
        }
    }
    deleteFromMS(userId) {
        const pattern = { cmd: messages_1.MicroserviceMessagesEnum.DELETE_AVATAR };
        const payload = {
            ownerId: userId,
        };
        return this.client.send(pattern, payload);
    }
};
exports.DeleteAvatarHandler = DeleteAvatarHandler = __decorate([
    (0, cqrs_1.CommandHandler)(DeleteAvatarCommand),
    __param(1, (0, common_1.Inject)('FILES_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof profile_repository_1.ProfileRepository !== "undefined" && profile_repository_1.ProfileRepository) === "function" ? _a : Object, typeof (_b = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _b : Object])
], DeleteAvatarHandler);


/***/ }),

/***/ "./apps/inctagram/src/features/profile/application/use-cases/update-profile.command.ts":
/*!*********************************************************************************************!*\
  !*** ./apps/inctagram/src/features/profile/application/use-cases/update-profile.command.ts ***!
  \*********************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateProfileHandler = exports.UpdateProfileCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const profile_repository_1 = __webpack_require__(/*! ../../db/profile.repository */ "./apps/inctagram/src/features/profile/db/profile.repository.ts");
const prisma_service_1 = __webpack_require__(/*! ../../../../prisma.service */ "./apps/inctagram/src/prisma.service.ts");
const profile_entity_1 = __webpack_require__(/*! ../../domain/entities/profile.entity */ "./apps/inctagram/src/features/profile/domain/entities/profile.entity.ts");
const date_fns_1 = __webpack_require__(/*! date-fns */ "date-fns");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const create_error_object_1 = __webpack_require__(/*! ../../../../utils/create-error-object */ "./apps/inctagram/src/utils/create-error-object.ts");
const date_validator_1 = __webpack_require__(/*! ../../../../utils/custom-validators/date.validator */ "./apps/inctagram/src/utils/custom-validators/date.validator.ts");
const convert_date_helper_1 = __webpack_require__(/*! ../../../../utils/helpers/convert-date.helper */ "./apps/inctagram/src/utils/helpers/convert-date.helper.ts");
class UpdateProfileCommand {
    constructor(data, userId) {
        this.data = data;
        this.userId = userId;
    }
}
exports.UpdateProfileCommand = UpdateProfileCommand;
let UpdateProfileHandler = exports.UpdateProfileHandler = class UpdateProfileHandler {
    constructor(profileRepo, prisma) {
        this.profileRepo = profileRepo;
        this.prisma = prisma;
    }
    async execute({ data, userId }) {
        this.checkAge(data.birthDate);
        await this.checkUsername(data.username, userId);
        await this.update(data, userId);
        return;
    }
    async update(data, userId) {
        return this.prisma.$transaction(async () => {
            await this.profileRepo.updateUserUsername(data.username, userId);
            const newProfile = profile_entity_1.ProfileEntity.create(data, userId);
            await this.profileRepo.updateProfile(userId, newProfile);
        });
    }
    checkAge(birthDate) {
        const currentDate = new Date();
        const isBirthDateValid = (0, date_validator_1.isValidDate)(birthDate);
        const convertedDate = (0, convert_date_helper_1.convertDMYtoYMD)(birthDate);
        const age = (0, date_fns_1.differenceInYears)(currentDate, convertedDate);
        if (!isBirthDateValid) {
            const error = (0, create_error_object_1.createErrorMessage)('Invalid date', 'birthDate');
            throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
        }
        if (age < 13) {
            const error = (0, create_error_object_1.createErrorMessage)('A user under 13 cannot create a profile', 'birthDate');
            throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async checkUsername(username, userId) {
        const user = await this.profileRepo.getUserByUsername(username);
        if (user && user.id !== userId) {
            throw new common_1.HttpException('user with this username already exists', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.UpdateProfileHandler = UpdateProfileHandler = __decorate([
    (0, cqrs_1.CommandHandler)(UpdateProfileCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof profile_repository_1.ProfileRepository !== "undefined" && profile_repository_1.ProfileRepository) === "function" ? _a : Object, typeof (_b = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _b : Object])
], UpdateProfileHandler);


/***/ }),

/***/ "./apps/inctagram/src/features/profile/application/use-cases/upload-avatar.command.ts":
/*!********************************************************************************************!*\
  !*** ./apps/inctagram/src/features/profile/application/use-cases/upload-avatar.command.ts ***!
  \********************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadAvatarHandler = exports.UploadAvatarCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const profile_repository_1 = __webpack_require__(/*! ../../db/profile.repository */ "./apps/inctagram/src/features/profile/db/profile.repository.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const messages_1 = __webpack_require__(/*! ../../../../../../../types/messages */ "./types/messages.ts");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const mapUserProfile_1 = __webpack_require__(/*! ../../db/view/mapUserProfile */ "./apps/inctagram/src/features/profile/db/view/mapUserProfile.ts");
const file_image_enum_types_1 = __webpack_require__(/*! ../../../../../../../types/file-image-enum.types */ "./types/file-image-enum.types.ts");
class UploadAvatarCommand {
    constructor(buffer, userId) {
        this.buffer = buffer;
        this.userId = userId;
    }
}
exports.UploadAvatarCommand = UploadAvatarCommand;
let UploadAvatarHandler = exports.UploadAvatarHandler = class UploadAvatarHandler {
    constructor(profileRepo, client) {
        this.profileRepo = profileRepo;
        this.client = client;
    }
    async execute({ buffer, userId }) {
        const userProfile = await this.profileRepo.getUserProfile(userId);
        if (userProfile.avatarId) {
            this.deleteFileImage(userId).subscribe();
        }
        const data = await (0, rxjs_1.firstValueFrom)(await this.createFileImage(buffer, userId));
        const avatarId = data.avatars.find((x) => x.type === file_image_enum_types_1.FileImageTypeEnum.AVATAR_MEDIUM).fileId;
        const thumbnailId = data.avatars.find((x) => x.type === file_image_enum_types_1.FileImageTypeEnum.AVATAR_THUMBNAIL).fileId;
        await this.profileRepo.addAvatarToProfile(avatarId, thumbnailId, userId);
        return (0, mapUserProfile_1.mapUserImages)(data.avatars);
    }
    async createFileImage(buffer, userId) {
        const pattern = { cmd: messages_1.MicroserviceMessagesEnum.UPLOAD_AVATAR };
        const payload = {
            userId,
            buffer,
        };
        return this.client.send(pattern, payload);
    }
    deleteFileImage(userId) {
        const pattern = { cmd: messages_1.MicroserviceMessagesEnum.DELETE_AVATAR };
        const payload = {
            ownerId: userId,
        };
        return this.client.send(pattern, payload);
    }
};
exports.UploadAvatarHandler = UploadAvatarHandler = __decorate([
    (0, cqrs_1.CommandHandler)(UploadAvatarCommand),
    __param(1, (0, common_1.Inject)('FILES_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof profile_repository_1.ProfileRepository !== "undefined" && profile_repository_1.ProfileRepository) === "function" ? _a : Object, typeof (_b = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _b : Object])
], UploadAvatarHandler);


/***/ }),

/***/ "./apps/inctagram/src/features/profile/db/profile.query-repository.ts":
/*!****************************************************************************!*\
  !*** ./apps/inctagram/src/features/profile/db/profile.query-repository.ts ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileQueryRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! ../../../prisma.service */ "./apps/inctagram/src/prisma.service.ts");
const mapUserProfile_1 = __webpack_require__(/*! ./view/mapUserProfile */ "./apps/inctagram/src/features/profile/db/view/mapUserProfile.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const messages_1 = __webpack_require__(/*! ../../../../../../types/messages */ "./types/messages.ts");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const post_enum_1 = __webpack_require__(/*! ../../posts/domain/types/post.enum */ "./apps/inctagram/src/features/posts/domain/types/post.enum.ts");
let ProfileQueryRepository = exports.ProfileQueryRepository = class ProfileQueryRepository {
    constructor(prisma, client) {
        this.prisma = prisma;
        this.client = client;
    }
    async getAllUsersCount() {
        const total = await this.prisma.profile.count({});
        return { totalUsersCount: total };
    }
    async getUserProfile(userId) {
        const profile = await this.prisma.profile.findUnique({
            where: { userId },
            include: {
                user: {
                    select: {
                        username: true,
                    },
                },
            },
        });
        const fileImage = await (0, rxjs_1.firstValueFrom)(this.getUserProfileImages(userId));
        return (0, mapUserProfile_1.mapUserProfile)(profile, fileImage);
    }
    async getUserPublicProfile(userId) {
        const publicUser = await this.getUserProfile(userId);
        const postsCount = await this.prisma.post.count({
            where: {
                userId,
                status: post_enum_1.PostStatusEnum.ACTIVE,
            },
        });
        return {
            id: publicUser.id,
            username: publicUser.username,
            aboutMe: publicUser.aboutMe,
            avatars: publicUser.avatars,
            following: 0,
            followers: 0,
            posts: postsCount,
        };
    }
    getUserProfileImages(userId) {
        const pattern = { cmd: messages_1.MicroserviceMessagesEnum.GET_AVATAR };
        const payload = {
            ownerId: userId,
        };
        return this.client.send(pattern, payload);
    }
};
exports.ProfileQueryRepository = ProfileQueryRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('FILES_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _b : Object])
], ProfileQueryRepository);


/***/ }),

/***/ "./apps/inctagram/src/features/profile/db/profile.repository.ts":
/*!**********************************************************************!*\
  !*** ./apps/inctagram/src/features/profile/db/profile.repository.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! ../../../prisma.service */ "./apps/inctagram/src/prisma.service.ts");
let ProfileRepository = exports.ProfileRepository = class ProfileRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getUserProfile(userId) {
        return this.prisma.profile.findUnique({
            where: { userId },
            include: {
                user: {
                    select: {
                        username: true,
                    },
                },
            },
        });
    }
    async getUserByUsername(username) {
        return this.prisma.user.findUnique({
            where: { username },
        });
    }
    async addAvatarToProfile(avatarId, thumbnailId, userId) {
        await this.prisma.profile.update({
            where: {
                userId,
            },
            data: {
                avatarId,
                thumbnailId,
            },
        });
    }
    async removeAvatarFromProfile(userId) {
        await this.prisma.profile.update({
            where: { userId },
            data: { avatarId: null, thumbnailId: null },
        });
    }
    updateUserUsername(username, userId) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { username },
        });
    }
    async updateProfile(userId, data) {
        await this.prisma.profile.update({
            where: { userId },
            data,
        });
    }
};
exports.ProfileRepository = ProfileRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], ProfileRepository);


/***/ }),

/***/ "./apps/inctagram/src/features/profile/db/view/mapUserProfile.ts":
/*!***********************************************************************!*\
  !*** ./apps/inctagram/src/features/profile/db/view/mapUserProfile.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mapUserImages = exports.mapUserProfile = void 0;
const mapUserProfile = (profile, avatars) => {
    return {
        id: profile.userId,
        username: profile.user.username,
        firstname: profile.firstname,
        lastname: profile.lastname,
        city: profile.city,
        birthDate: profile.birthDate,
        aboutMe: profile.aboutMe,
        avatars: avatars.length ? (0, exports.mapUserImages)(avatars) : null,
        createdAt: profile.createdAt,
    };
};
exports.mapUserProfile = mapUserProfile;
const mapUserImages = (avatars) => {
    const obj = {};
    avatars.forEach((x) => {
        obj[x.type] = {
            url: 'https://storage.yandexcloud.net/kebab-inctagram/' + x.url,
            width: x.width,
            height: x.height,
            fileSize: x.fileSize,
        };
    });
    return obj;
};
exports.mapUserImages = mapUserImages;


/***/ }),

/***/ "./apps/inctagram/src/features/profile/domain/entities/profile.entity.ts":
/*!*******************************************************************************!*\
  !*** ./apps/inctagram/src/features/profile/domain/entities/profile.entity.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileEntity = void 0;
const base_entity_1 = __webpack_require__(/*! ../../../../utils/base.entity */ "./apps/inctagram/src/utils/base.entity.ts");
class ProfileEntity extends base_entity_1.BaseEntity {
    static create(data, userId) {
        const { aboutMe, city, firstname, lastname, birthDate } = data;
        const user = new ProfileEntity();
        user.userId = userId;
        user.firstname = firstname;
        user.lastname = lastname;
        if (birthDate) {
            user.birthDate = birthDate;
        }
        if (aboutMe) {
            user.aboutMe = aboutMe;
        }
        if (city) {
            user.city = city;
        }
        return user;
    }
}
exports.ProfileEntity = ProfileEntity;


/***/ }),

/***/ "./apps/inctagram/src/features/profile/profile.module.ts":
/*!***************************************************************!*\
  !*** ./apps/inctagram/src/features/profile/profile.module.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const profile_controller_1 = __webpack_require__(/*! ./api/profile.controller */ "./apps/inctagram/src/features/profile/api/profile.controller.ts");
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const users_repository_1 = __webpack_require__(/*! ../../auth/db/users.repository */ "./apps/inctagram/src/auth/db/users.repository.ts");
const prisma_service_1 = __webpack_require__(/*! ../../prisma.service */ "./apps/inctagram/src/prisma.service.ts");
const profile_repository_1 = __webpack_require__(/*! ./db/profile.repository */ "./apps/inctagram/src/features/profile/db/profile.repository.ts");
const profile_query_repository_1 = __webpack_require__(/*! ./db/profile.query-repository */ "./apps/inctagram/src/features/profile/db/profile.query-repository.ts");
const update_profile_command_1 = __webpack_require__(/*! ./application/use-cases/update-profile.command */ "./apps/inctagram/src/features/profile/application/use-cases/update-profile.command.ts");
const upload_avatar_command_1 = __webpack_require__(/*! ./application/use-cases/upload-avatar.command */ "./apps/inctagram/src/features/profile/application/use-cases/upload-avatar.command.ts");
const delete_avatar_command_1 = __webpack_require__(/*! ./application/use-cases/delete-avatar.command */ "./apps/inctagram/src/features/profile/application/use-cases/delete-avatar.command.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const public_profile_controller_1 = __webpack_require__(/*! ./api/public-profile.controller */ "./apps/inctagram/src/features/profile/api/public-profile.controller.ts");
const CommandHandlers = [
    update_profile_command_1.UpdateProfileHandler,
    upload_avatar_command_1.UploadAvatarHandler,
    delete_avatar_command_1.DeleteAvatarHandler,
];
const Repos = [users_repository_1.UsersRepository, profile_repository_1.ProfileRepository, profile_query_repository_1.ProfileQueryRepository];
let ProfileModule = exports.ProfileModule = class ProfileModule {
};
exports.ProfileModule = ProfileModule = __decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule, jwt_1.JwtModule, config_1.ConfigModule],
        controllers: [profile_controller_1.ProfileController, public_profile_controller_1.PublicProfileController],
        providers: [
            {
                provide: 'FILES_SERVICE',
                useFactory: (configService) => {
                    const options = {
                        transport: microservices_1.Transport.TCP,
                        options: {
                            host: configService.get('FILES_SERVICE_HOST'),
                            port: configService.get('FILES_SERVICE_PORT'),
                        },
                    };
                    return microservices_1.ClientProxyFactory.create(options);
                },
                inject: [config_1.ConfigService],
            },
            prisma_service_1.PrismaService,
            ...Repos,
            ...CommandHandlers,
        ],
    })
], ProfileModule);


/***/ }),

/***/ "./apps/inctagram/src/features/security-devices/commands/delete-device.command.ts":
/*!****************************************************************************************!*\
  !*** ./apps/inctagram/src/features/security-devices/commands/delete-device.command.ts ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteDeviceHandler = exports.DeleteDeviceCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const security_devices_repository_1 = __webpack_require__(/*! ../db/security-devices.repository */ "./apps/inctagram/src/features/security-devices/db/security-devices.repository.ts");
class DeleteDeviceCommand {
    constructor(sessionId) {
        this.sessionId = sessionId;
    }
}
exports.DeleteDeviceCommand = DeleteDeviceCommand;
let DeleteDeviceHandler = exports.DeleteDeviceHandler = class DeleteDeviceHandler {
    constructor(securityDevicesRepository) {
        this.securityDevicesRepository = securityDevicesRepository;
    }
    async execute({ sessionId }) {
        await this.securityDevicesRepository.deleteSessionById(sessionId);
    }
};
exports.DeleteDeviceHandler = DeleteDeviceHandler = __decorate([
    (0, cqrs_1.CommandHandler)(DeleteDeviceCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof security_devices_repository_1.SecurityDevicesRepository !== "undefined" && security_devices_repository_1.SecurityDevicesRepository) === "function" ? _a : Object])
], DeleteDeviceHandler);


/***/ }),

/***/ "./apps/inctagram/src/features/security-devices/db/security-devices.query-repository.ts":
/*!**********************************************************************************************!*\
  !*** ./apps/inctagram/src/features/security-devices/db/security-devices.query-repository.ts ***!
  \**********************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SecurityDevicesQueryRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! ../../../prisma.service */ "./apps/inctagram/src/prisma.service.ts");
let SecurityDevicesQueryRepository = exports.SecurityDevicesQueryRepository = class SecurityDevicesQueryRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getSessionByUserIdAndSessionId(sessionId, userId) {
        return this.prisma.session.findUnique({
            where: {
                id: sessionId,
                userId,
            },
        });
    }
    async getBlackList(refresh) {
        return this.prisma.blacklist.findUnique({
            where: { refreshToken: refresh },
        });
    }
};
exports.SecurityDevicesQueryRepository = SecurityDevicesQueryRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], SecurityDevicesQueryRepository);


/***/ }),

/***/ "./apps/inctagram/src/features/security-devices/db/security-devices.repository.ts":
/*!****************************************************************************************!*\
  !*** ./apps/inctagram/src/features/security-devices/db/security-devices.repository.ts ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SecurityDevicesRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! ../../../prisma.service */ "./apps/inctagram/src/prisma.service.ts");
let SecurityDevicesRepository = exports.SecurityDevicesRepository = class SecurityDevicesRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createDevice(deviceBody) {
        return this.prisma.devices.create({
            data: deviceBody,
        });
    }
    async createSession(data) {
        const session = await this.prisma.session.create({
            data,
        });
        return session.id;
    }
    async updateLastActiveDateOfSession(sessionId, newDate, aliveTill) {
        this.prisma.session.update({
            where: {
                id: sessionId,
            },
            data: {
                lastActiveDate: newDate,
                aliveTill: aliveTill,
            },
        });
    }
    async deleteSessionById(sessionId) {
        await this.prisma.session.delete({
            where: { id: sessionId },
        });
    }
    getSession(sessionId) {
        return this.prisma.session.findUnique({
            where: { id: sessionId },
            include: { device: true },
        });
    }
    async addTokenToBlacklist(refreshToken) {
        await this.prisma.blacklist.create({
            data: {
                refreshToken,
            },
        });
    }
};
exports.SecurityDevicesRepository = SecurityDevicesRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], SecurityDevicesRepository);


/***/ }),

/***/ "./apps/inctagram/src/features/security-devices/security-devices.controller.ts":
/*!*************************************************************************************!*\
  !*** ./apps/inctagram/src/features/security-devices/security-devices.controller.ts ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SecurityDevicesController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let SecurityDevicesController = exports.SecurityDevicesController = class SecurityDevicesController {
    constructor() { }
};
exports.SecurityDevicesController = SecurityDevicesController = __decorate([
    (0, common_1.Controller)('security-devices'),
    __metadata("design:paramtypes", [])
], SecurityDevicesController);


/***/ }),

/***/ "./apps/inctagram/src/features/security-devices/security-devices.module.ts":
/*!*********************************************************************************!*\
  !*** ./apps/inctagram/src/features/security-devices/security-devices.module.ts ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SecurityDevicesModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const security_devices_service_1 = __webpack_require__(/*! ./security-devices.service */ "./apps/inctagram/src/features/security-devices/security-devices.service.ts");
const security_devices_controller_1 = __webpack_require__(/*! ./security-devices.controller */ "./apps/inctagram/src/features/security-devices/security-devices.controller.ts");
let SecurityDevicesModule = exports.SecurityDevicesModule = class SecurityDevicesModule {
};
exports.SecurityDevicesModule = SecurityDevicesModule = __decorate([
    (0, common_1.Module)({
        controllers: [security_devices_controller_1.SecurityDevicesController],
        providers: [security_devices_service_1.SecurityDevicesService],
    })
], SecurityDevicesModule);


/***/ }),

/***/ "./apps/inctagram/src/features/security-devices/security-devices.service.ts":
/*!**********************************************************************************!*\
  !*** ./apps/inctagram/src/features/security-devices/security-devices.service.ts ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SecurityDevicesService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let SecurityDevicesService = exports.SecurityDevicesService = class SecurityDevicesService {
};
exports.SecurityDevicesService = SecurityDevicesService = __decorate([
    (0, common_1.Injectable)()
], SecurityDevicesService);


/***/ }),

/***/ "./apps/inctagram/src/modules/filters/http-exception.filter.ts":
/*!*********************************************************************!*\
  !*** ./apps/inctagram/src/modules/filters/http-exception.filter.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpExceptionFilter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const express_1 = __webpack_require__(/*! express */ "express");
let HttpExceptionFilter = exports.HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        try {
            const isHttpException = exception instanceof common_1.HttpException;
            const exceptionResponse = isHttpException
                ? exception.getResponse()
                : null;
            const message = isHttpException ? exception?.message : 'Some error';
            const errorDescription = Array.isArray(exceptionResponse?.message)
                ? exceptionResponse?.message
                : null;
            const status = isHttpException
                ? exception.getStatus()
                : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            if (status !== common_1.HttpStatus.INTERNAL_SERVER_ERROR) {
                response.status(status).json({
                    ...this.getDefaultResponseHttpBody(status),
                    path: express_1.request.url,
                    message,
                    errorDescription,
                });
                return;
            }
            response
                .status(status)
                .json(this.getDefaultResponseHttpBody(common_1.HttpStatus.INTERNAL_SERVER_ERROR));
        }
        catch (error) {
            console.log('All EXCEPTIONS CATCH:', error);
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(this.getDefaultResponseHttpBody(common_1.HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }
    getDefaultResponseHttpBody(status) {
        return {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: null,
            message: 'Some error occurred',
            errorDescription: null,
        };
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionFilter);


/***/ }),

/***/ "./apps/inctagram/src/prisma.service.ts":
/*!**********************************************!*\
  !*** ./apps/inctagram/src/prisma.service.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
let PrismaService = exports.PrismaService = class PrismaService extends client_1.PrismaClient {
    async onModuleInit() {
        await this.$connect();
    }
};
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)()
], PrismaService);


/***/ }),

/***/ "./apps/inctagram/src/types/index.ts":
/*!*******************************************!*\
  !*** ./apps/inctagram/src/types/index.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./apps/inctagram/src/utils/base.entity.ts":
/*!*************************************************!*\
  !*** ./apps/inctagram/src/utils/base.entity.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseEntity = void 0;
class BaseEntity {
}
exports.BaseEntity = BaseEntity;


/***/ }),

/***/ "./apps/inctagram/src/utils/constants/cookie-options.ts":
/*!**************************************************************!*\
  !*** ./apps/inctagram/src/utils/constants/cookie-options.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cookieOptions = void 0;
exports.cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 60 * 60 * 1000,
};


/***/ }),

/***/ "./apps/inctagram/src/utils/constants/default-query-params.ts":
/*!********************************************************************!*\
  !*** ./apps/inctagram/src/utils/constants/default-query-params.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.POST_IMAGE_NORMAL_SIZE = exports.SortDirection = exports.PAGE_SIZE_DEFAULT = void 0;
exports.PAGE_SIZE_DEFAULT = 8;
var SortDirection;
(function (SortDirection) {
    SortDirection["ASC"] = "asc";
    SortDirection["DESC"] = "desc";
})(SortDirection || (exports.SortDirection = SortDirection = {}));
exports.POST_IMAGE_NORMAL_SIZE = 20000 * 2 ** 10;


/***/ }),

/***/ "./apps/inctagram/src/utils/constants/swagger-constants.ts":
/*!*****************************************************************!*\
  !*** ./apps/inctagram/src/utils/constants/swagger-constants.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CursorQueryOptions = exports.SortDirectionQueryOptions = exports.SortByQueryOptions = exports.PageSizeQueryOptions = exports.ForbiddenRequestResponseOptions = exports.UnauthorizedRequestResponseOptions = exports.TooManyRequestsResponseOptions = exports.BadRequestResponseOptions = exports.NotFoundResponseOptions = exports.NoContentResponseOptions = exports.responseErrorObjectExample = void 0;
const default_query_params_1 = __webpack_require__(/*! ./default-query-params */ "./apps/inctagram/src/utils/constants/default-query-params.ts");
exports.responseErrorObjectExample = {
    errorsMessages: [
        {
            message: 'string',
            field: 'string',
        },
    ],
};
exports.NoContentResponseOptions = {
    description: 'success',
};
exports.NotFoundResponseOptions = {
    description: 'Not Found',
};
exports.BadRequestResponseOptions = {
    description: 'Incorrect input data',
    content: {
        'application/json': { example: exports.responseErrorObjectExample },
    },
};
exports.TooManyRequestsResponseOptions = {
    description: 'More than 5 attempts from one IP-address during 10 seconds',
};
exports.UnauthorizedRequestResponseOptions = {
    description: 'Unauthorized',
};
exports.ForbiddenRequestResponseOptions = {
    description: 'Forbidden',
};
exports.PageSizeQueryOptions = {
    name: 'pageSize',
    description: 'page size is number of items that should be returned',
    type: 'number',
    required: false,
};
exports.SortByQueryOptions = {
    name: 'sortBy',
    description: 'Sort by parameters',
    type: 'string',
    required: false,
};
exports.SortDirectionQueryOptions = {
    name: 'sortDirection',
    description: 'Sort by desc or asc',
    type: 'string',
    enum: default_query_params_1.SortDirection,
    required: false,
};
const CursorQueryOptions = (description) => ({
    name: 'cursor',
    description,
    type: 'string',
    required: false,
});
exports.CursorQueryOptions = CursorQueryOptions;


/***/ }),

/***/ "./apps/inctagram/src/utils/create-error-object.ts":
/*!*********************************************************!*\
  !*** ./apps/inctagram/src/utils/create-error-object.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createErrorMessage = void 0;
const createErrorMessage = (message, field) => ({
    message: [
        {
            message,
            field,
        },
    ],
});
exports.createErrorMessage = createErrorMessage;


/***/ }),

/***/ "./apps/inctagram/src/utils/custom-validators/date.validator.ts":
/*!**********************************************************************!*\
  !*** ./apps/inctagram/src/utils/custom-validators/date.validator.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isValidDate = void 0;
function isValidDate(dateString) {
    if (!/^\d{1,2}-\d{1,2}-\d{4}$/.test(dateString)) {
        return false;
    }
    const parts = dateString.split('-');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    if (year < 1000 || year > 3000 || month == 0 || month > 12) {
        return false;
    }
    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
        monthLength[1] = 29;
    }
    return day > 0 && day <= monthLength[month - 1];
}
exports.isValidDate = isValidDate;


/***/ }),

/***/ "./apps/inctagram/src/utils/custom-validators/file.validator.ts":
/*!**********************************************************************!*\
  !*** ./apps/inctagram/src/utils/custom-validators/file.validator.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CheckMimetype = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const image_size_1 = __webpack_require__(/*! image-size */ "image-size");
class CheckMimetype extends common_1.FileValidator {
    constructor(options) {
        super(options);
    }
    isValid(file) {
        if ('buffer' in file) {
            try {
                const { type } = (0, image_size_1.default)(file.buffer);
                this.currentType = type;
                return !(type !== 'jpg' && type !== 'png');
            }
            catch (e) {
                return false;
            }
        }
    }
    buildErrorMessage() {
        return `File uploaded is invalid. File type is (${this.currentType})`;
    }
}
exports.CheckMimetype = CheckMimetype;


/***/ }),

/***/ "./apps/inctagram/src/utils/custom-validators/is-object-id.validator.ts":
/*!******************************************************************************!*\
  !*** ./apps/inctagram/src/utils/custom-validators/is-object-id.validator.ts ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IsObjectId = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! mongoose */ "mongoose");
let IsObjectId = exports.IsObjectId = class IsObjectId {
    constructor() { }
    async validate(ids) {
        return ids.every((id) => mongoose_1.default.isValidObjectId(id));
    }
    defaultMessage(validationArguments) {
        return `each value in ${validationArguments?.property} must be a ObjectId`;
    }
};
exports.IsObjectId = IsObjectId = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'IsObjectId', async: true }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], IsObjectId);


/***/ }),

/***/ "./apps/inctagram/src/utils/custom-validators/trim-transformer.ts":
/*!************************************************************************!*\
  !*** ./apps/inctagram/src/utils/custom-validators/trim-transformer.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.trimTransformer = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const trimTransformer = (value, field) => {
    try {
        return value.trim().trimEnd();
    }
    catch {
        throw new common_1.BadRequestException({
            message: 'Value is not a string type',
            field: field,
        });
    }
};
exports.trimTransformer = trimTransformer;


/***/ }),

/***/ "./apps/inctagram/src/utils/decorators/user.decorator.ts":
/*!***************************************************************!*\
  !*** ./apps/inctagram/src/utils/decorators/user.decorator.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.User = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    if (request.owner) {
        return request.owner;
    }
    throw new common_1.UnauthorizedException();
});


/***/ }),

/***/ "./apps/inctagram/src/utils/default-get-query.uri.dto.ts":
/*!***************************************************************!*\
  !*** ./apps/inctagram/src/utils/default-get-query.uri.dto.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetDefaultUriDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const default_query_params_1 = __webpack_require__(/*! ./constants/default-query-params */ "./apps/inctagram/src/utils/constants/default-query-params.ts");
class GetDefaultUriDto {
    constructor() {
        this.sortBy = '';
        this.sortDirection = default_query_params_1.SortDirection.DESC;
        this.pageSize = default_query_params_1.PAGE_SIZE_DEFAULT;
    }
}
exports.GetDefaultUriDto = GetDefaultUriDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], GetDefaultUriDto.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(default_query_params_1.SortDirection),
    (0, class_validator_1.MaxLength)(4),
    __metadata("design:type", typeof (_a = typeof default_query_params_1.SortDirection !== "undefined" && default_query_params_1.SortDirection) === "function" ? _a : Object)
], GetDefaultUriDto.prototype, "sortDirection", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], GetDefaultUriDto.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetDefaultUriDto.prototype, "cursor", void 0);


/***/ }),

/***/ "./apps/inctagram/src/utils/helpers/convert-date.helper.ts":
/*!*****************************************************************!*\
  !*** ./apps/inctagram/src/utils/helpers/convert-date.helper.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertDMYtoYMD = void 0;
const convertDMYtoYMD = (date) => {
    const parts = date.split('-');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    return `${year}-${month}-${day}`;
};
exports.convertDMYtoYMD = convertDMYtoYMD;


/***/ }),

/***/ "./apps/inctagram/src/utils/helpers/get-request-mapper.helper.ts":
/*!***********************************************************************!*\
  !*** ./apps/inctagram/src/utils/helpers/get-request-mapper.helper.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRequestReturnMapper = exports.getRequestQueryMapper = void 0;
const default_query_params_1 = __webpack_require__(/*! ../constants/default-query-params */ "./apps/inctagram/src/utils/constants/default-query-params.ts");
const getRequestQueryMapper = ({ pageSize, cursor, sortDirection, sortBy, }) => {
    const data = {
        pageSize: default_query_params_1.PAGE_SIZE_DEFAULT,
        sortDirection: default_query_params_1.SortDirection.DESC,
        sortBy: 'createdAt',
        cursor: undefined,
    };
    if (pageSize) {
        data.pageSize = Number(pageSize);
    }
    if (cursor) {
        data.cursor = cursor;
    }
    if (sortDirection) {
        data.sortDirection = sortDirection.toLowerCase();
    }
    if (sortBy) {
        data.sortBy = sortBy;
    }
    return data;
};
exports.getRequestQueryMapper = getRequestQueryMapper;
const getRequestReturnMapper = ({ pageSize, cursor, totalCount, items, }) => ({
    pagesCount: Math.ceil(totalCount / pageSize),
    cursor,
    pageSize,
    totalCount,
    items,
});
exports.getRequestReturnMapper = getRequestReturnMapper;


/***/ }),

/***/ "./types/file-image-enum.types.ts":
/*!****************************************!*\
  !*** ./types/file-image-enum.types.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileImageTypeEnum = void 0;
var FileImageTypeEnum;
(function (FileImageTypeEnum) {
    FileImageTypeEnum["AVATAR_MEDIUM"] = "avatar-medium";
    FileImageTypeEnum["POST_IMAGE"] = "post-image";
    FileImageTypeEnum["AVATAR_THUMBNAIL"] = "avatar-thumbnail";
})(FileImageTypeEnum || (exports.FileImageTypeEnum = FileImageTypeEnum = {}));


/***/ }),

/***/ "./types/messages.ts":
/*!***************************!*\
  !*** ./types/messages.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MicroserviceMessagesEnum = void 0;
var MicroserviceMessagesEnum;
(function (MicroserviceMessagesEnum) {
    MicroserviceMessagesEnum["UPLOAD_AVATAR"] = "upload-avatar";
    MicroserviceMessagesEnum["DELETE_AVATAR"] = "delete-avatar";
    MicroserviceMessagesEnum["GET_AVATAR"] = "get-avatar";
    MicroserviceMessagesEnum["GET_POST_IMAGES"] = "get-post-images";
    MicroserviceMessagesEnum["UPLOAD_POST_IMAGES"] = "upload-post-images";
    MicroserviceMessagesEnum["DELETE_POST_IMAGE"] = "delete-post-image";
    MicroserviceMessagesEnum["GET_USER_THUMBNAIL_AVATAR"] = "get-user-thumbnail-avatar";
})(MicroserviceMessagesEnum || (exports.MicroserviceMessagesEnum = MicroserviceMessagesEnum = {}));


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/cqrs":
/*!*******************************!*\
  !*** external "@nestjs/cqrs" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/cqrs");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@nestjs/passport":
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/platform-express":
/*!*******************************************!*\
  !*** external "@nestjs/platform-express" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),

/***/ "@nestjs/serve-static":
/*!***************************************!*\
  !*** external "@nestjs/serve-static" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("@nestjs/serve-static");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "@nestjs/throttler":
/*!************************************!*\
  !*** external "@nestjs/throttler" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("@nestjs/throttler");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "class-transformer":
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "date-fns":
/*!***************************!*\
  !*** external "date-fns" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("date-fns");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "image-size":
/*!*****************************!*\
  !*** external "image-size" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("image-size");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("nodemailer");

/***/ }),

/***/ "passport-github":
/*!**********************************!*\
  !*** external "passport-github" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("passport-github");

/***/ }),

/***/ "passport-google-oauth20":
/*!******************************************!*\
  !*** external "passport-google-oauth20" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("passport-google-oauth20");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("process");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!************************************!*\
  !*** ./apps/inctagram/src/main.ts ***!
  \************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./apps/inctagram/src/app.module.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const app_settings_1 = __webpack_require__(/*! ./app.settings */ "./apps/inctagram/src/app.settings.ts");
const swagger_configs_1 = __webpack_require__(/*! ./configs/swagger.configs */ "./apps/inctagram/src/configs/swagger.configs.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.setGlobalPrefix('api/v1');
    (0, app_settings_1.appSettings)(app);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Inctagram')
        .setDescription('The Inctagram API description from Kebab team')
        .setVersion('0.1')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/v1/swagger', app, document);
    await app.listen(configService.get('PORT'));
    (0, swagger_configs_1.createStaticSwagger)();
}
bootstrap();

})();

/******/ })()
;