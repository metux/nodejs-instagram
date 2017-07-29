
const UserPage = require('./userpage');

var method = InstagramCrawler.prototype;

function InstagramCrawler(param) {
    this._dir = (param.dir ? param.dir : './download');
}

method.download_user = function(username) {
    console.log("Crawling: "+username);
    UserPage.download_user(username,this._dir);
}

method.download_users = function(users) {
    var obj = this;
    users.forEach(function(u) { obj.download_user(u); });
}

module.exports = InstagramCrawler;
