(()=>{"use strict";var e={669:(e,r,n)=>{n.d(r,{Z:()=>i});var t=n(645),o=n.n(t)()((function(e){return e[1]}));o.push([e.id,".news__item {\r\n    display: flex;\r\n    flex-direction: column;\r\n    margin: 1rem auto;\r\n    margin-bottom: 1.6%;\r\n    background: #fff;\r\n    color: #333;\r\n    line-height: 1.4;\r\n    font-family: Arial, sans-serif;\r\n    border-radius: 5px;\r\n    overflow: hidden;\r\n}\r\n\r\n.news__item:hover .news__meta-photo {\r\n    transform: scale(1.3) rotate(3deg);\r\n}\r\n\r\n.news__item .news__meta {\r\n    position: relative;\r\n    height: 200px;\r\n}\r\n\r\n.news__item .news__meta-photo {\r\n    position: absolute;\r\n    top: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    background-size: cover;\r\n    background-position: center;\r\n    transition: transform 0.2s;\r\n}\r\n\r\n.news__item .news__meta-details,\r\n.news__item .news__meta-details ul {\r\n    margin: auto;\r\n    padding: 0;\r\n    list-style: none;\r\n}\r\n\r\n.news__item .news__meta-details {\r\n    position: absolute;\r\n    top: 0;\r\n    bottom: 0;\r\n    left: -120%;\r\n    margin: auto;\r\n    transition: left 0.2s;\r\n    background: rgba(0, 0, 0, 0.6);\r\n    color: #fff;\r\n    padding: 10px;\r\n    width: 100%;\r\n    font-size: 0.9rem;\r\n}\r\n\r\n.news__item .news__description {\r\n    padding: 1rem;\r\n    background: #fff;\r\n    position: relative;\r\n    z-index: 1;\r\n}\r\n\r\n.news__item .news__description h2 {\r\n    line-height: 1;\r\n    margin: 0;\r\n    font-size: 1.7rem;\r\n}\r\n\r\n.news__item .news__description h3 {\r\n    font-size: 1rem;\r\n    font-weight: 300;\r\n    text-transform: uppercase;\r\n    color: #a2a2a2;\r\n    margin-top: 5px;\r\n}\r\n\r\n.news__item .news__description .news__read-more {\r\n    text-align: right;\r\n}\r\n\r\n.news__item .news__description .news__read-more a {\r\n    color: #5ad67d;\r\n    display: inline-block;\r\n    position: relative;\r\n    text-decoration: none;\r\n    font-weight: 800;\r\n}\r\n\r\n.news__item .news__description .news__read-more a:after {\r\n    content: '→';\r\n    margin-left: -10px;\r\n    opacity: 0;\r\n    vertical-align: middle;\r\n    transition: margin 0.3s, opacity 0.3s;\r\n}\r\n\r\n.news__item .news__description .news__read-more a:hover:after {\r\n    margin-left: 5px;\r\n    opacity: 1;\r\n}\r\n\r\n.news__item p {\r\n    margin: 1rem 0 0;\r\n}\r\n\r\n.news__item p:first-of-type {\r\n    margin-top: 1.25rem;\r\n    position: relative;\r\n}\r\n\r\n.news__item p:first-of-type:before {\r\n    content: '';\r\n    position: absolute;\r\n    height: 5px;\r\n    background: #5ad67d;\r\n    width: 35px;\r\n    top: -0.75rem;\r\n    border-radius: 3px;\r\n}\r\n\r\n.news__item:hover .news__meta-details {\r\n    left: 0%;\r\n}\r\n\r\n@media (min-width: 640px) {\r\n    .news__item {\r\n        flex-direction: row;\r\n        max-width: 700px;\r\n    }\r\n\r\n    .news__item .news__meta {\r\n        flex-basis: 40%;\r\n        height: auto;\r\n    }\r\n\r\n    .news__item .news__description {\r\n        flex-basis: 60%;\r\n    }\r\n\r\n    .news__item .news__description:before {\r\n        -webkit-transform: skewX(-3deg);\r\n        transform: skewX(-3deg);\r\n        content: '';\r\n        background: #fff;\r\n        width: 30px;\r\n        position: absolute;\r\n        left: -10px;\r\n        top: 0;\r\n        bottom: 0;\r\n        z-index: -1;\r\n    }\r\n\r\n    .news__item.alt {\r\n        flex-direction: row-reverse;\r\n    }\r\n\r\n    .news__item.alt .news__description:before {\r\n        left: inherit;\r\n        right: -10px;\r\n        -webkit-transform: skew(3deg);\r\n        transform: skew(3deg);\r\n    }\r\n\r\n    .news__item.alt .news__meta-details {\r\n        padding-left: 25px;\r\n    }\r\n}\r\n",""]);const i=o},501:(e,r,n)=>{n.d(r,{Z:()=>i});var t=n(645),o=n.n(t)()((function(e){return e[1]}));o.push([e.id,".sources {\r\n    margin-top: 15px;\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n    width: 100%;\r\n    overflow-x: hidden;\r\n    align-items: center;\r\n    justify-content: center;\r\n    font: 300 1em 'Fira Sans', sans-serif;\r\n}\r\n\r\n.source__item {\r\n    background: none;\r\n    border: 2px solid #30c5ff;\r\n    font: inherit;\r\n    line-height: 0.6em;\r\n    margin: 0.2em;\r\n    padding: 0.5em 1em;\r\n    color: #70d6ff;\r\n    transition: 0.25s;\r\n    cursor: pointer;\r\n    border-radius: 15px;\r\n}\r\n\r\n.source__item:hover,\r\n.source__item:focus {\r\n    border-color: black;\r\n    color: black;\r\n    box-shadow: 0 0.5em 0.5em -0.4em black;\r\n    transform: translateY(-0.25em);\r\n    background-color: white;\r\n}\r\n\r\n.source__item-name {\r\n    font-weight: 400;\r\n    white-space: nowrap;\r\n}\r\n\r\n.alphabet {\r\n    display: flex;\r\n    justify-content: center;\r\n    margin-top: 15px;\r\n    flex-wrap: wrap;\r\n  }\r\n  \r\n  .alphabet button {\r\n    margin: 0 5px;\r\n    padding: 5px 10px;\r\n    font-size: 14px;\r\n    cursor: pointer;\r\n    background: none;\r\n    border: 2px solid #30c5ff;\r\n    font: inherit;\r\n    line-height: 0.6em;\r\n    margin: 0.2em;\r\n    padding: 0.5em 1em;\r\n    color: #70d6ff;\r\n    transition: 0.25s;\r\n    cursor: pointer;\r\n    border-radius: 15px;\r\n  }\r\n\r\n  .alphabet button:hover,\r\n  .alphabet button:focus{\r\n    border-color: black;\r\n    color: black;\r\n    box-shadow: 0 0.5em 0.5em -0.4em black;\r\n    transform: translateY(-0.25em);\r\n    background-color: white;\r\n  }\r\n  \r\n  .source__item.hidden {\r\n    display: none;\r\n  }\r\n",""]);const i=o},767:(e,r,n)=>{n.d(r,{Z:()=>_});var t=n(645),o=n.n(t),i=n(667),s=n.n(i),a=n(741),c=n(19),d=n(212),l=n(750),u=o()((function(e){return e[1]})),p=s()(a.Z),f=s()(c.Z),m=s()(d.Z),h=s()(l.Z);u.push([e.id,"body {\r\n    color: #fff;\r\n    background:url("+p+");\r\n    background-size: cover;\r\n    background-repeat: no-repeat;\r\n    font-family: verdana, sans-serif;\r\n    min-height: 95vh;\r\n    display: flex;\r\n    flex-direction: column;\r\n}\r\n\r\nheader {\r\n    padding: 10px 30px;\r\n    display: flex;\r\n    gap: 10px;\r\n    justify-content: center;\r\n}\r\n\r\nheader h1 {\r\n    font-size: 40px;\r\n    font-weight: 800;\r\n}\r\n\r\n.logo{\r\n    width: 65px;\r\n    height: 65px;\r\n    background: url("+f+");\r\n    background-size:contain;\r\n    background-repeat: no-repeat;\r\n}\r\n\r\n.logo-git{\r\n    width: 50px;\r\n    height: 50px;\r\n    background: url("+m+");\r\n    background-size:contain;\r\n    background-repeat: no-repeat;\r\n}\r\n\r\n.header-logo{\r\n    width: 100px;\r\n    height: 100px;\r\n    background: url("+h+");\r\n    background-size: cover;\r\n    background-repeat: no-repeat;\r\n}\r\n\r\nfooter {\r\n    height: 100px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    gap: 10px;\r\n    margin-top: auto;\r\n}\r\nfooter .copyright {\r\n    font-size: 14px;\r\n    color: #333;\r\n    text-align: center;\r\n}\r\nfooter .copyright a {\r\n    color: #444;\r\n}\r\nfooter .copyright a:hover {\r\n    color: #555;\r\n}\r\nfooter .copyright:before {\r\n    content: '©';\r\n}\r\n\r\n::-webkit-scrollbar{\r\n    width: 15px;\r\n    background-color: rgb(40, 106, 106);\r\n}\r\n\r\n::-webkit-scrollbar-track{\r\n    border: 3px solid rgba(255, 255, 255, 0.25);\r\n}\r\n\r\n::-webkit-scrollbar-thumb{\r\n    background-color: white;\r\n    border-radius: 15px;\r\n}\r\n\r\n@media screen and (max-width: 500px) {\r\n    .header-logo{\r\n        display: none;\r\n    }\r\n}\r\n",""]);const _=u},645:e=>{e.exports=function(e){var r=[];return r.toString=function(){return this.map((function(r){var n=e(r);return r[2]?"@media ".concat(r[2]," {").concat(n,"}"):n})).join("")},r.i=function(e,n,t){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(t)for(var i=0;i<this.length;i++){var s=this[i][0];null!=s&&(o[s]=!0)}for(var a=0;a<e.length;a++){var c=[].concat(e[a]);t&&o[c[0]]||(n&&(c[2]?c[2]="".concat(n," and ").concat(c[2]):c[2]=n),r.push(c))}},r}},667:e=>{e.exports=function(e,r){return r||(r={}),"string"!=typeof(e=e&&e.__esModule?e.default:e)?e:(/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),r.hash&&(e+=r.hash),/["'() \t\n]/.test(e)||r.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e)}},212:(e,r,n)=>{n.d(r,{Z:()=>t});const t=n.p+"images/git-logo-white.png"},750:(e,r,n)=>{n.d(r,{Z:()=>t});const t=n.p+"images/header-logo.png"},19:(e,r,n)=>{n.d(r,{Z:()=>t});const t=n.p+"images/logo-rs.png"},741:(e,r,n)=>{n.d(r,{Z:()=>t});const t=n.p+"images/news-background.jpg"},455:(e,r,n)=>{n.r(r),n.d(r,{default:()=>t});const t=n.p+"images/news_placeholder.png"},242:(e,r,n)=>{n.r(r),n.d(r,{default:()=>s});var t=n(379),o=n.n(t),i=n(669);o()(i.Z,{insert:"head",singleton:!1});const s=i.Z.locals||{}},595:(e,r,n)=>{n.r(r),n.d(r,{default:()=>s});var t=n(379),o=n.n(t),i=n(501);o()(i.Z,{insert:"head",singleton:!1});const s=i.Z.locals||{}},427:(e,r,n)=>{n.r(r),n.d(r,{default:()=>s});var t=n(379),o=n.n(t),i=n(767);o()(i.Z,{insert:"head",singleton:!1});const s=i.Z.locals||{}},379:(e,r,n)=>{var t,o=function(){var e={};return function(r){if(void 0===e[r]){var n=document.querySelector(r);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[r]=n}return e[r]}}(),i=[];function s(e){for(var r=-1,n=0;n<i.length;n++)if(i[n].identifier===e){r=n;break}return r}function a(e,r){for(var n={},t=[],o=0;o<e.length;o++){var a=e[o],c=r.base?a[0]+r.base:a[0],d=n[c]||0,l="".concat(c," ").concat(d);n[c]=d+1;var u=s(l),p={css:a[1],media:a[2],sourceMap:a[3]};-1!==u?(i[u].references++,i[u].updater(p)):i.push({identifier:l,updater:h(p,r),references:1}),t.push(l)}return t}function c(e){var r=document.createElement("style"),t=e.attributes||{};if(void 0===t.nonce){var i=n.nc;i&&(t.nonce=i)}if(Object.keys(t).forEach((function(e){r.setAttribute(e,t[e])})),"function"==typeof e.insert)e.insert(r);else{var s=o(e.insert||"head");if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(r)}return r}var d,l=(d=[],function(e,r){return d[e]=r,d.filter(Boolean).join("\n")});function u(e,r,n,t){var o=n?"":t.media?"@media ".concat(t.media," {").concat(t.css,"}"):t.css;if(e.styleSheet)e.styleSheet.cssText=l(r,o);else{var i=document.createTextNode(o),s=e.childNodes;s[r]&&e.removeChild(s[r]),s.length?e.insertBefore(i,s[r]):e.appendChild(i)}}function p(e,r,n){var t=n.css,o=n.media,i=n.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),i&&"undefined"!=typeof btoa&&(t+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}var f=null,m=0;function h(e,r){var n,t,o;if(r.singleton){var i=m++;n=f||(f=c(r)),t=u.bind(null,n,i,!1),o=u.bind(null,n,i,!0)}else n=c(r),t=p.bind(null,n,r),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return t(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap)return;t(e=r)}else o()}}e.exports=function(e,r){(r=r||{}).singleton||"boolean"==typeof r.singleton||(r.singleton=(void 0===t&&(t=Boolean(window&&document&&document.all&&!window.atob)),t));var n=a(e=e||[],r);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var t=0;t<n.length;t++){var o=s(n[t]);i[o].references--}for(var c=a(e,r),d=0;d<n.length;d++){var l=s(n[d]);0===i[l].references&&(i[l].updater(),i.splice(l,1))}n=c}}}},717:function(e,r,n){var t=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0});const o=t(n(842)),i=n(527);r.default=class{constructor(){this.controller=new o.default,this.view=new i.AppView}start(){const e=document.querySelector(".sources");e&&e.addEventListener("click",(e=>{this.controller.getNews(e,(e=>this.view.drawNews(e)))})),this.controller.getSources((e=>{this.view.drawSources(e)}))}}},853:function(e,r,n){var t=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0});const o=t(n(24));class i extends o.default{constructor(){super("https://news-proxy.spanb4.shop/",{apiKey:"2a69021b08ef4dfe9c4d772e4d3f6bd1"})}}r.default=i},842:function(e,r,n){var t=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0});const o=t(n(853));class i extends o.default{getSources(e){super.getResponse({endpoint:"sources"},e)}getNews(e,r){let n=e.target;const t=e.currentTarget;if(n instanceof HTMLElement)for(;n!==t;){if(n.classList.contains("source__item")){const e=n.getAttribute("data-source-id");return void(t.getAttribute("data-source")!==e&&e&&(t.setAttribute("data-source",e),super.getResponse({endpoint:"everything",options:{sources:e}},r)))}n=n.parentNode}}}r.default=i},24:(e,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0});const t=n(604);r.default=class{constructor(e,r={}){this.baseLink=e,this.options=r}getResponse({endpoint:e,options:r={}},n=(()=>{console.error("No callback for GET response")})){this.load("GET",e,n,r)}errorHandler(e){if(!e.ok)throw e.status!==t.ErrorStatusEnum.Unauthorized&&e.status!==t.ErrorStatusEnum.NotFound||console.log(`Sorry, but there is ${e.status} error: ${e.statusText}`),Error(e.statusText);return e}makeUrl(e,r){const n={...this.options,...e};let t=`${this.baseLink}${r}?`;return Object.keys(n).forEach((e=>{t+=`${e}=${n[e]}&`})),t.slice(0,-1)}load(e,r,n,t={}){fetch(this.makeUrl(t,r),{method:e}).then(this.errorHandler).then((e=>e.json())).then((e=>n(e))).catch((e=>console.error(e)))}}},527:function(e,r,n){var t=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0}),r.AppView=void 0;const o=t(n(798)),i=t(n(53));class s{constructor(){this.news=new o.default,this.sources=new i.default}drawNews(e){const{articles:r=[]}=e;this.news.draw(r)}drawSources(e){const{sources:r=[]}=e;this.sources.draw(r)}}r.AppView=s,r.default=s},798:function(e,r,n){var t=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0}),n(242);const o=t(n(455));r.default=class{draw(e){const r=e.length>=10?e.filter(((e,r)=>r<10)):e,n=document.createDocumentFragment(),t=document.querySelector("#newsItemTemp");t&&r.forEach(((e,r)=>{const i=t.content.cloneNode(!0);r%2&&i.querySelector(".news__item")?.classList.add("alt");const s=i.querySelector(".news__meta-photo");s&&(s.style.backgroundImage=`url(${e.urlToImage||o.default})`);const a=i.querySelector(".news__meta-author");a&&(a.textContent=e.author||e.source.name);const c=i.querySelector(".news__meta-date");c&&(c.textContent=e.publishedAt.slice(0,10).split("-").reverse().join("-"));const d=i.querySelector(".news__description-title");d&&(d.textContent=e.title);const l=i.querySelector(".news__description-source");l&&(l.textContent=e.source.name);const u=i.querySelector(".news__description-content");u&&(u.textContent=e.description);const p=i.querySelector(".news__read-more a");p&&p.setAttribute("href",e.url),n.append(i)}));const i=document.querySelector(".news");i&&(i.innerHTML="",i.appendChild(n))}}},53:(e,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),n(595),r.default=class{draw(e){const r=document.createDocumentFragment(),n=document.querySelector("#sourceItemTemp");if(n){e.forEach((e=>{const t=n.content.cloneNode(!0),o=t.querySelector(".source__item-name");o&&(o.textContent=e.name||"");const i=t.querySelector(".source__item");i&&i.setAttribute("data-source-id",e.id),r.append(t)}));const t=document.querySelector(".sources");t&&(t.innerHTML=""),r.querySelectorAll(".source__item").forEach((e=>{e.classList.add("hidden"),t.appendChild(e)})),this.doAlphabeticalContainer(e)}}doAlphabeticalContainer(e){const r=document.createElement("div");r.classList.add("alphabet");const n=new Set;e.forEach((e=>{const r=e.name.charAt(0).toUpperCase();n.add(r)})),Array.from(n).forEach((e=>{const n=document.createElement("button");n.textContent=e,n.addEventListener("click",(()=>this.filterSources(e))),r.appendChild(n)}));const t=document.querySelector(".alphabet-container");t&&t.insertBefore(r,t.firstChild)}filterSources(e){const r=document.querySelectorAll(".source__item");r&&r.forEach((r=>{(r.querySelector(".source__item-name")?.textContent||"").charAt(0).toUpperCase()===e?r.classList.remove("hidden"):r.classList.add("hidden")}))}}},607:function(e,r,n){var t=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0});const o=t(n(717));n(427),(new o.default).start()},604:(e,r)=>{var n;Object.defineProperty(r,"__esModule",{value:!0}),r.ErrorStatusEnum=void 0,function(e){e[e.Unauthorized=401]="Unauthorized",e[e.NotFound=404]="NotFound"}(n||(r.ErrorStatusEnum=n={}))}},r={};function n(t){var o=r[t];if(void 0!==o)return o.exports;var i=r[t]={id:t,exports:{}};return e[t].call(i.exports,i,i.exports,n),i.exports}n.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return n.d(r,{a:r}),r},n.d=(e,r)=>{for(var t in r)n.o(r,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var r=n.g.document;if(!e&&r&&(r.currentScript&&(e=r.currentScript.src),!e)){var t=r.getElementsByTagName("script");if(t.length)for(var o=t.length-1;o>-1&&!e;)e=t[o--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),n.nc=void 0,n(607)})();