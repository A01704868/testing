"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { PrismaClient } from '@prisma/client'
const weather_service_1 = __importDefault(require("../src/services/weather-service"));
// const prisma = new PrismaClient()
// async function GetAllUsers () {
//     return await prisma.usuario.findMany({
//         select: { password: false, nombre: true, email: true, role: true }
//     });
// }
// async function DeleteAllUsers () {
//     return await prisma.usuario.deleteMany();
// }
// async function AddTestUsers () {
//     return await prisma.usuario.createMany({
//         data: [
//             { email: "eduardo-larios@outlook.com", nombre: "Eduardo Larios", password: "hunter2" },
//             { email: "sofia-soto@gmail.com", nombre: "Sofia Soto", password: "Sofia1999." }
//         ]
//     })
// }
(() => __awaiter(void 0, void 0, void 0, function* () {
    const weatherAPI = new weather_service_1.default();
    const forecast = yield weatherAPI.getWeatherByCity("Queretaro", "Queretaro", "Mexico");
    console.debug(forecast);
}))().then(() => console.log("Finished executing")).catch(e => console.error(e));
