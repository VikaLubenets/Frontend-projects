"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appLoader_1 = __importDefault(require("./appLoader"));
class AppController extends appLoader_1.default {
    getSources(callback) {
        super.getResponse({
            endpoint: 'sources',
        }, callback);
    }
    getNews(e, callback) {
        let target = e.target;
        const newsContainer = e.currentTarget;
        if (target instanceof HTMLElement) {
            while (target !== newsContainer) {
                if (target.classList.contains('source__item')) {
                    const sourceId = target.getAttribute('data-source-id');
                    if (newsContainer.getAttribute('data-source') !== sourceId) {
                        if (sourceId !== null) {
                            newsContainer.setAttribute('data-source', sourceId);
                            super.getResponse({
                                endpoint: 'everything',
                                options: {
                                    sources: sourceId,
                                },
                            }, callback);
                        }
                    }
                    return;
                }
                target = target.parentNode;
            }
        }
    }
}
exports.default = AppController;
