/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/files/src/adapters/s3-storage.adapter.ts":
/*!*******************************************************!*\
  !*** ./apps/files/src/adapters/s3-storage.adapter.ts ***!
  \*******************************************************/
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
exports.S3StorageManager = void 0;
const client_s3_1 = __webpack_require__(/*! @aws-sdk/client-s3 */ "@aws-sdk/client-s3");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let S3StorageManager = exports.S3StorageManager = class S3StorageManager {
    constructor(configService) {
        this.configService = configService;
        const region = 'us-east-1';
        this.s3client = new client_s3_1.S3Client({
            region,
            endpoint: 'https://storage.yandexcloud.net',
            credentials: {
                accessKeyId: this.configService.get('YANDEX_ID'),
                secretAccessKey: this.configService.get('YANDEX_SECRET'),
            },
        });
        this.bucketName = this.configService.get('YANDEX_BUCKET');
    }
    async saveImage(buffer, url) {
        const options = {
            Bucket: this.bucketName,
            Key: url,
            Body: buffer,
            ContentLength: buffer.length,
        };
        const command = new client_s3_1.PutObjectCommand(options);
        try {
            const data = await this.s3client.send(command);
            return data.id;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }
    async deleteImage(key) {
        const options = {
            Bucket: this.bucketName,
            Key: key,
        };
        const command = new client_s3_1.DeleteObjectCommand(options);
        try {
            await this.s3client.send(command);
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }
};
exports.S3StorageManager = S3StorageManager = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], S3StorageManager);


/***/ }),

/***/ "./apps/files/src/api/dto/upload-avatar.dto.ts":
/*!*****************************************************!*\
  !*** ./apps/files/src/api/dto/upload-avatar.dto.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadAvatarDto = void 0;
class UploadAvatarDto {
}
exports.UploadAvatarDto = UploadAvatarDto;


/***/ }),

/***/ "./apps/files/src/api/dto/upload-post-images.dto.ts":
/*!**********************************************************!*\
  !*** ./apps/files/src/api/dto/upload-post-images.dto.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadPostImagesDto = void 0;
class UploadPostImagesDto {
}
exports.UploadPostImagesDto = UploadPostImagesDto;


/***/ }),

/***/ "./apps/files/src/api/files.controller.ts":
/*!************************************************!*\
  !*** ./apps/files/src/api/files.controller.ts ***!
  \************************************************/
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
exports.FilesController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const files_service_1 = __webpack_require__(/*! ../files.service */ "./apps/files/src/files.service.ts");
const upload_avatar_dto_1 = __webpack_require__(/*! ./dto/upload-avatar.dto */ "./apps/files/src/api/dto/upload-avatar.dto.ts");
const upload_post_images_dto_1 = __webpack_require__(/*! ./dto/upload-post-images.dto */ "./apps/files/src/api/dto/upload-post-images.dto.ts");
const messages_1 = __webpack_require__(/*! ../../../../types/messages */ "./types/messages.ts");
let FilesController = exports.FilesController = class FilesController {
    constructor(fileService) {
        this.fileService = fileService;
    }
    async upload(data) {
        return await this.fileService.uploadUserAvatar(data);
    }
    async deleteAvatars(data) {
        return await this.fileService.deleteUserAvatars(data.ownerId);
    }
    async get(data) {
        return await this.fileService.getAvatarImagesByOwnerId(data.ownerId);
    }
    async getPostImages(data) {
        return await this.fileService.getImagesByIds(data.imagesIds);
    }
    async uploadPostImages(data) {
        return await this.fileService.uploadPostImages(data);
    }
    async deletePostImage(data) {
        return await this.fileService.deletePostImage(data.imageId, data.userId);
    }
    async getUserThumbnailAvatar(data) {
        return await this.fileService.getImageById(data.imageId);
    }
    hello() {
        return 'hello world from files';
    }
};
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: messages_1.MicroserviceMessagesEnum.UPLOAD_AVATAR }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof upload_avatar_dto_1.UploadAvatarDto !== "undefined" && upload_avatar_dto_1.UploadAvatarDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "upload", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: messages_1.MicroserviceMessagesEnum.DELETE_AVATAR }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "deleteAvatars", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: messages_1.MicroserviceMessagesEnum.GET_AVATAR }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "get", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: messages_1.MicroserviceMessagesEnum.GET_POST_IMAGES }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "getPostImages", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: messages_1.MicroserviceMessagesEnum.UPLOAD_POST_IMAGES }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof upload_post_images_dto_1.UploadPostImagesDto !== "undefined" && upload_post_images_dto_1.UploadPostImagesDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "uploadPostImages", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: messages_1.MicroserviceMessagesEnum.DELETE_POST_IMAGE }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "deletePostImage", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: messages_1.MicroserviceMessagesEnum.GET_USER_THUMBNAIL_AVATAR }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "getUserThumbnailAvatar", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'hello-world' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "hello", null);
exports.FilesController = FilesController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof files_service_1.FilesService !== "undefined" && files_service_1.FilesService) === "function" ? _a : Object])
], FilesController);


/***/ }),

/***/ "./apps/files/src/application/use-cases/delete-file.command.ts":
/*!*********************************************************************!*\
  !*** ./apps/files/src/application/use-cases/delete-file.command.ts ***!
  \*********************************************************************/
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
exports.DeleteFileHandler = exports.DeleteFileCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const s3_storage_adapter_1 = __webpack_require__(/*! ../../adapters/s3-storage.adapter */ "./apps/files/src/adapters/s3-storage.adapter.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! mongoose */ "mongoose");
class DeleteFileCommand {
    constructor(url) {
        this.url = url;
    }
}
exports.DeleteFileCommand = DeleteFileCommand;
let DeleteFileHandler = exports.DeleteFileHandler = class DeleteFileHandler {
    constructor(s3Manager, fileImageModel) {
        this.s3Manager = s3Manager;
        this.fileImageModel = fileImageModel;
    }
    async execute({ url }) {
        await this.s3Manager.deleteImage(url);
        await this.fileImageModel.deleteOne({
            url,
        });
    }
};
exports.DeleteFileHandler = DeleteFileHandler = __decorate([
    (0, cqrs_1.CommandHandler)(DeleteFileCommand),
    __param(1, (0, common_1.Inject)('FILE_MODEL')),
    __metadata("design:paramtypes", [typeof (_a = typeof s3_storage_adapter_1.S3StorageManager !== "undefined" && s3_storage_adapter_1.S3StorageManager) === "function" ? _a : Object, typeof (_b = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _b : Object])
], DeleteFileHandler);


/***/ }),

/***/ "./apps/files/src/application/use-cases/upload-file.command.ts":
/*!*********************************************************************!*\
  !*** ./apps/files/src/application/use-cases/upload-file.command.ts ***!
  \*********************************************************************/
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
exports.UploadFileHandler = exports.UploadFileCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const image_size_1 = __webpack_require__(/*! image-size */ "image-size");
const s3_storage_adapter_1 = __webpack_require__(/*! ../../adapters/s3-storage.adapter */ "./apps/files/src/adapters/s3-storage.adapter.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! mongoose */ "mongoose");
const sharp = __webpack_require__(/*! sharp */ "sharp");
const file_image_enum_types_1 = __webpack_require__(/*! ../../../../../types/file-image-enum.types */ "./types/file-image-enum.types.ts");
class UploadFileCommand {
    constructor(data) {
        this.data = data;
    }
}
exports.UploadFileCommand = UploadFileCommand;
let UploadFileHandler = exports.UploadFileHandler = class UploadFileHandler {
    constructor(s3Manager, fileImageModel) {
        this.s3Manager = s3Manager;
        this.fileImageModel = fileImageModel;
    }
    execute(data) {
        return this.uploadIFile(data);
    }
    async uploadIFile({ data }) {
        const { buffer, userId: ownerId, imageSize, imageType } = data;
        const url = this.createUrlForFileImage(ownerId, imageType);
        const fileBuffer = Buffer.from(buffer);
        const compressedBuffer = await this.compressImage(fileBuffer, imageSize);
        const fileId = await this.uploadImageToCloud({
            buffer: compressedBuffer,
            url,
            ownerId,
            type: imageType,
        });
        return {
            fileId: fileId,
            url,
            width: imageSize,
            height: imageSize,
            fileSize: compressedBuffer.length,
            type: imageType,
        };
    }
    async compressImage(imageBuffer, size) {
        return await sharp(imageBuffer).resize(size, size).webp().toBuffer();
    }
    async uploadImageToCloud({ buffer, url, ownerId, type, }) {
        const fileSize = buffer.length;
        await this.s3Manager.saveImage(buffer, url);
        const currentImage = await this.createImageInDB({
            type,
            fileSize,
            ownerId,
            url,
            buffer,
        });
        return currentImage.id;
    }
    createUrlForFileImage(userId, type) {
        return type === file_image_enum_types_1.FileImageTypeEnum.POST_IMAGE
            ? `media/users/${userId}/posts/${userId}-${Date.now()}.webp`
            : `media/users/${userId}/avatars/${userId}-${Date.now()}-${type}.webp`;
    }
    async createImageInDB(data) {
        const { buffer, url, ownerId, fileSize, type } = data;
        const { width, height } = (0, image_size_1.default)(buffer);
        const currentImage = new this.fileImageModel({
            url,
            width,
            height,
            ownerId,
            fileSize,
            type,
        });
        await currentImage.save();
        return currentImage;
    }
};
exports.UploadFileHandler = UploadFileHandler = __decorate([
    (0, cqrs_1.CommandHandler)(UploadFileCommand),
    __param(1, (0, common_1.Inject)('FILE_MODEL')),
    __metadata("design:paramtypes", [typeof (_a = typeof s3_storage_adapter_1.S3StorageManager !== "undefined" && s3_storage_adapter_1.S3StorageManager) === "function" ? _a : Object, typeof (_b = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _b : Object])
], UploadFileHandler);


/***/ }),

/***/ "./apps/files/src/db/schemas/file.schema.ts":
/*!**************************************************!*\
  !*** ./apps/files/src/db/schemas/file.schema.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileImageSchema = void 0;
const mongoose_1 = __webpack_require__(/*! mongoose */ "mongoose");
exports.FileImageSchema = new mongoose_1.default.Schema({
    url: String,
    width: Number,
    height: Number,
    ownerId: Number,
    type: { type: String },
    fileSize: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


/***/ }),

/***/ "./apps/files/src/files.module.ts":
/*!****************************************!*\
  !*** ./apps/files/src/files.module.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FilesModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const files_controller_1 = __webpack_require__(/*! ./api/files.controller */ "./apps/files/src/api/files.controller.ts");
const files_service_1 = __webpack_require__(/*! ./files.service */ "./apps/files/src/files.service.ts");
const database_providers_1 = __webpack_require__(/*! ./providers/database.providers */ "./apps/files/src/providers/database.providers.ts");
const s3_storage_adapter_1 = __webpack_require__(/*! ./adapters/s3-storage.adapter */ "./apps/files/src/adapters/s3-storage.adapter.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const files_provider_1 = __webpack_require__(/*! ./providers/files.provider */ "./apps/files/src/providers/files.provider.ts");
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const upload_file_command_1 = __webpack_require__(/*! ./application/use-cases/upload-file.command */ "./apps/files/src/application/use-cases/upload-file.command.ts");
const delete_file_command_1 = __webpack_require__(/*! ./application/use-cases/delete-file.command */ "./apps/files/src/application/use-cases/delete-file.command.ts");
const CommandHandlers = [upload_file_command_1.UploadFileHandler, delete_file_command_1.DeleteFileHandler];
let FilesModule = exports.FilesModule = class FilesModule {
};
exports.FilesModule = FilesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cqrs_1.CqrsModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env', '.env.dev'],
            }),
        ],
        controllers: [files_controller_1.FilesController],
        providers: [
            files_service_1.FilesService,
            s3_storage_adapter_1.S3StorageManager,
            ...database_providers_1.databaseProviders,
            ...files_provider_1.filesProviders,
            ...CommandHandlers,
        ],
    })
], FilesModule);


/***/ }),

/***/ "./apps/files/src/files.service.ts":
/*!*****************************************!*\
  !*** ./apps/files/src/files.service.ts ***!
  \*****************************************/
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
exports.FilesService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! mongoose */ "mongoose");
const upload_file_command_1 = __webpack_require__(/*! ./application/use-cases/upload-file.command */ "./apps/files/src/application/use-cases/upload-file.command.ts");
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const file_image_enum_types_1 = __webpack_require__(/*! ../../../types/file-image-enum.types */ "./types/file-image-enum.types.ts");
const constants_1 = __webpack_require__(/*! ./utils/constants */ "./apps/files/src/utils/constants.ts");
const delete_file_command_1 = __webpack_require__(/*! ./application/use-cases/delete-file.command */ "./apps/files/src/application/use-cases/delete-file.command.ts");
let FilesService = exports.FilesService = class FilesService {
    constructor(fileImageModel, commandBus) {
        this.fileImageModel = fileImageModel;
        this.commandBus = commandBus;
    }
    async uploadUserAvatar({ userId, buffer }) {
        const avatarImage = await this.commandBus.execute(new upload_file_command_1.UploadFileCommand({
            buffer,
            userId,
            imageType: file_image_enum_types_1.FileImageTypeEnum.AVATAR_MEDIUM,
            imageSize: constants_1.FILE_IMAGE_SIZE.mediumAvatar,
        }));
        const thumbnailImage = await this.commandBus.execute(new upload_file_command_1.UploadFileCommand({
            buffer,
            userId,
            imageType: file_image_enum_types_1.FileImageTypeEnum.AVATAR_THUMBNAIL,
            imageSize: constants_1.FILE_IMAGE_SIZE.thumbnailAvatar,
        }));
        return { avatars: [avatarImage, thumbnailImage] };
    }
    async uploadPostImages({ userId, buffers }) {
        const postImages = [];
        for (const buffer of buffers) {
            const postImage = await this.commandBus.execute(new upload_file_command_1.UploadFileCommand({
                buffer,
                userId,
                imageType: file_image_enum_types_1.FileImageTypeEnum.POST_IMAGE,
                imageSize: constants_1.FILE_IMAGE_SIZE.postImage,
            }));
            postImages.push(postImage);
        }
        return { postImages };
    }
    async deleteUserAvatars(userId) {
        const images = await this.getAvatarImagesByOwnerId(userId);
        if (images && images.length) {
            for (const image of images) {
                await this.commandBus.execute(new delete_file_command_1.DeleteFileCommand(image.url));
            }
        }
        return;
    }
    async deletePostImage(imageId, userId) {
        const image = await this.getImageById(imageId);
        if (image && image.ownerId === userId) {
            await this.commandBus.execute(new delete_file_command_1.DeleteFileCommand(image.url));
            return true;
        }
        return false;
    }
    async getAvatarImagesByOwnerId(ownerId) {
        return this.fileImageModel.find({
            ownerId,
            $nor: [
                {
                    type: file_image_enum_types_1.FileImageTypeEnum.POST_IMAGE,
                },
            ],
        });
    }
    async getImageById(imageId) {
        return this.fileImageModel.findById(imageId);
    }
    async getImagesByIds(imageIds) {
        const images = await this.fileImageModel.find({
            _id: {
                $in: imageIds.map((i) => new mongoose_1.Types.ObjectId(i)),
            },
            type: file_image_enum_types_1.FileImageTypeEnum.POST_IMAGE,
        });
        return images.map((image) => ({
            fileId: image._id,
            url: image.url,
            width: image.width,
            height: image.height,
            fileSize: image.fileSize,
            type: image.type,
        }));
    }
};
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('FILE_MODEL')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, typeof (_b = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _b : Object])
], FilesService);


/***/ }),

/***/ "./apps/files/src/providers/database.providers.ts":
/*!********************************************************!*\
  !*** ./apps/files/src/providers/database.providers.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.databaseProviders = void 0;
const mongoose = __webpack_require__(/*! mongoose */ "mongoose");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
exports.databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: (configService) => mongoose.connect(configService.get('MONGO_URL')),
        inject: [config_1.ConfigService],
    },
];


/***/ }),

/***/ "./apps/files/src/providers/files.provider.ts":
/*!****************************************************!*\
  !*** ./apps/files/src/providers/files.provider.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.filesProviders = void 0;
const file_schema_1 = __webpack_require__(/*! ../db/schemas/file.schema */ "./apps/files/src/db/schemas/file.schema.ts");
exports.filesProviders = [
    {
        provide: 'FILE_MODEL',
        useFactory: (connection) => connection.model('FileImages', file_schema_1.FileImageSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];


/***/ }),

/***/ "./apps/files/src/utils/constants.ts":
/*!*******************************************!*\
  !*** ./apps/files/src/utils/constants.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FILE_IMAGE_SIZE = void 0;
exports.FILE_IMAGE_SIZE = {
    mediumAvatar: 192,
    thumbnailAvatar: 45,
    postImage: 300,
};


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

/***/ "@aws-sdk/client-s3":
/*!*************************************!*\
  !*** external "@aws-sdk/client-s3" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("@aws-sdk/client-s3");

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

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

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

/***/ "sharp":
/*!************************!*\
  !*** external "sharp" ***!
  \************************/
/***/ ((module) => {

module.exports = require("sharp");

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
/*!********************************!*\
  !*** ./apps/files/src/main.ts ***!
  \********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const files_module_1 = __webpack_require__(/*! ./files.module */ "./apps/files/src/files.module.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(files_module_1.FilesModule);
    const configService = app.get(config_1.ConfigService);
    await app.connectMicroservice({
        transport: microservices_1.Transport.TCP,
        options: {
            host: '0.0.0.0',
            port: Number(configService.get('FILES_SERVICE_PORT') || 3262),
        },
    });
    await app.startAllMicroservices();
}
bootstrap();

})();

/******/ })()
;