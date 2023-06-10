"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppView = void 0;
const news_ts_1 = __importDefault(require("./news/news.ts"));
const sources_ts_1 = __importDefault(require("./sources/sources.ts"));
class AppView {
    constructor() {
        this.news = new news_ts_1.default();
        this.sources = new sources_ts_1.default();
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
