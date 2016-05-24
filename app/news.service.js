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
var core_1 = require("@angular/core");
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var NewsService = (function () {
    // private serviceUrls = [
    //     "/feed/toJson?url=http://www.680news.com/feed/",
    //     "/feed/google-news",
    //     "/feed/toJson?url=http://www.cbc.ca/cmlink/rss-topstories"
    // ];
    // private serviceUrl = "/feed/google-news.js";
    function NewsService(http) {
        this.http = http;
        console.info('News Service Constructor initialized');
        //asdsa        
    }
    // getServiceUrl(feedType: FeedType): string {
    //     switch (feedType) {
    //         case FeedType._680News:
    //             return this.serviceUrls[0];
    //         case FeedType.CBCNews:
    //             return this.serviceUrls[1];
    //         case FeedType.CBCNews:
    //             return this.serviceUrls[2];
    //     }
    // }
    NewsService.prototype.getPosts = function (feed) {
        if (feed.feedType == 0 /* _680News */) {
            return this.http.get(feed.serviceUrl)
                .map(function (res) { return res.json().rss.channel.item || {}; })
                .catch(this.handleError);
        }
        else if (feed.feedType == 1 /* GoogleNews */) {
            return this.http.get(feed.serviceUrl)
                .map(function (res) { return res.json().responseData.feed.entries || {}; })
                .catch(this.handleError);
        }
    };
    // private extractData(res: Response) {
    //     let body = res.json();
    //     //google news
    //     // return res.json().responseData.feed.entries || { };
    //     //cbc news
    //     return res.json().rss.channel.item || { };
    // }
    NewsService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    NewsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], NewsService);
    return NewsService;
}());
exports.NewsService = NewsService;
//# sourceMappingURL=news.service.js.map