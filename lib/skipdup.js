
const Dirty = require('dirty');
const mkdirp = require('mkdirp');
const Path = require('path');

var method = SkipDup.prototype;

function SkipDup(dbfn) {
    mkdirp.sync(Path.dirname(dbfn));
    this._dbfn = dbfn;
    this._db = new Dirty(dbfn);
}

method.filter = function(url) {
    return !this._db.get(url);
};

method.ok = function(url) {
    console.log("OK: "+url);
    this._db.set(url,1);
}

module.exports = SkipDup;
