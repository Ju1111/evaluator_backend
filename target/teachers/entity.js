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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const bcrypt = require("bcrypt");
const entity_1 = require("../evaluations/entity");
let Teacher = class Teacher extends typeorm_1.BaseEntity {
    async setPassword(rawPassword) {
        const hash = await bcrypt.hash(rawPassword, 10);
        this.password = hash;
    }
    checkPassword(rawPassword) {
        return bcrypt.compare(rawPassword, this.password);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Teacher.prototype, "id", void 0);
__decorate([
    class_validator_1.IsEmail(),
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Teacher.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(8),
    typeorm_1.Column('text'),
    class_transformer_1.Exclude({ toPlainOnly: true }),
    __metadata("design:type", String)
], Teacher.prototype, "password", void 0);
__decorate([
    typeorm_1.OneToMany(_ => entity_1.default, evaluation => evaluation.teacher, { eager: true }),
    __metadata("design:type", Array)
], Teacher.prototype, "evaluation", void 0);
Teacher = __decorate([
    typeorm_1.Entity()
], Teacher);
exports.default = Teacher;
//# sourceMappingURL=entity.js.map