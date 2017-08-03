
const md5File = require('md5-file')
const mkdirp = require('mkdirp');
const imgget = require('image-downloader');
const fs = require('fs');

var download_image = function(url, dir, id, filter, scope) {
    if (!filter.filter(url))
        return;

    console.log("URL fetching: "+url);

    mkdirp.sync(dir);
    imgget.image({ url: url, dest: dir+"/"+id+".jpg" })
        .then(({ filename, image }) => {
            const hash = md5File.sync(filename);
            console.log('File saved to', filename, ' -- md5: ', hash);
            fs.renameSync(filename, dir+'/'+hash+'.jpg');
            filter.ok(url, scope);
        }).catch((err) => {
            throw err
        });
}

module.exports = {
    download_image : download_image,
}
