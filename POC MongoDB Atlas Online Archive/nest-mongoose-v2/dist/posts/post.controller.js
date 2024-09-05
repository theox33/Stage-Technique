"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const create_post_dto_1 = require("./dto/create-post.dto");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    async index(search, sort) {
        const posts = await this.postService.findAll(search, sort);
        return { posts, search, sort };
    }
    newPost() {
        return {};
    }
    async createPost(createPostDto, res) {
        await this.postService.create(createPostDto);
        res.redirect('/');
    }
    async editPost(id) {
        const post = await this.postService.findOne(id);
        return { post };
    }
    async updatePost(id, createPostDto, res) {
        await this.postService.update(id, createPostDto);
        res.redirect('/');
    }
    async deletePost(id, res) {
        await this.postService.remove(id);
        res.redirect('/');
    }
};
exports.PostController = PostController;
__decorate([
    (0, common_1.Get)('/'),
    (0, common_1.Render)('index'),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('sort')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "index", null);
__decorate([
    (0, common_1.Get)('/new-post'),
    (0, common_1.Render)('new-post'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PostController.prototype, "newPost", null);
__decorate([
    (0, common_1.Post)('/post'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "createPost", null);
__decorate([
    (0, common_1.Get)('/edit-post/:id'),
    (0, common_1.Render)('edit-post'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "editPost", null);
__decorate([
    (0, common_1.Post)('/post/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_post_dto_1.CreatePostDto, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "updatePost", null);
__decorate([
    (0, common_1.Post)('/post/:id/delete'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deletePost", null);
exports.PostController = PostController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
//# sourceMappingURL=post.controller.js.map