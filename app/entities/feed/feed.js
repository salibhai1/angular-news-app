"use strict";
var Feed = (function () {
    function Feed(name, serviceUrl, feedType, isEnabled) {
        this.name = name;
        this.serviceUrl = serviceUrl;
        this.feedType = feedType;
        this.isEnabled = isEnabled;
    }
    return Feed;
}());
exports.Feed = Feed;
var Feeds = (function () {
    function Feeds() {
    }
    // constructor() {
    //     Feeds.feeds.push(new Feed("680 News", "/feed/toJson?url=http://www.680news.com/feed/", FeedType._680News));
    //     Feeds.feeds.push(new Feed("Google News", "/feed/google-news", FeedType.GoogleNews));
    //     Feeds.feeds.push(new Feed("CBC News", "/feed/toJson?url=http://www.cbc.ca/cmlink/rss-topstories", FeedType.CBCNews));
    // }    
    Feeds.Get = function (filterList) {
        return Feeds.feeds.filter(function (feed) { return filterList.findIndex(function (f) { return f == feed.feedType; }) > 0; });
    };
    Feeds.feeds = [
        new Feed("680 News", "/feed/toJson?url=http://www.680news.com/feed/metrolinx/local/", 0 /* _680News */, true),
        new Feed("Google News", "/feed/google-news", 1 /* GoogleNews */, false),
        new Feed("CBC News", "/feed/toJson?url=http://www.cbc.ca/cmlink/rss-topstories", 2 /* CBCNews */, false)
    ];
    return Feeds;
}());
exports.Feeds = Feeds;
//# sourceMappingURL=feed.js.map