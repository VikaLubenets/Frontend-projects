"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppView = void 0;
const news_1 = __importDefault(require("./news/news"));
const sources_1 = __importDefault(require("./sources/sources"));
class AppView {
    constructor() {
        this.news = new news_1.default();
        this.sources = new sources_1.default();
    }
    drawNews(data) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }
    drawSources(data) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}
exports.AppView = AppView;
exports.default = AppView;
