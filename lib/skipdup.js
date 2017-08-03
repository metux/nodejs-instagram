
const Dirty = require('dirty');
const mkdirp = require('mkdirp');
const Path = require('path');

var method = SkipDup.prototype;

function SkipDup(dbfn) {
    mkdirp.sync(Path.dirname(dbfn));
    this._dbfn = dbfn;
    this._db = new Dirty(dbfn);
    this._sql = require('sqlite-sync');
    this._sql.connect(dbfn+'.sqlite');
    this._sql.run('CREATE TABLE IF NOT EXISTS fetched(url text PRIMARY KEY, last timestamp DEFAULT current_timestamp, scope text);');
}

method.filter = function(url) {
    var ret = this._sql.run('SELECT * FROM fetched WHERE url = ?', url);
    if (ret[0])
        return false;

    if (this._db.get(url)) {
        console.log("moving to sqlite: ",url);
        this._sql.run('INSERT INTO fetched(url) SELECT ?',url);
        return false;
    }

    return true;
};

method.ok = function(url,scope) {
    console.log("OK: ",url,"scope",scope);
//    this._sql.run('INSERT INTO fetched(url,scope) SELECT ?, ?',url, scope);

    this._sql.insert(
        'fetched',
        { url : url, scope : scope },
        function(res) {
            if(res.error)
                throw res.error;
            console.log(res);
        }
    );
}

module.exports = SkipDup;
