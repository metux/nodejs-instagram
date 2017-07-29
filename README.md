# nodejs-instagram
nodejs-based crawler for instagram

* downloads images from instagram
* currently just supports per-user (no arbitrary queries yet)
* skips aleady downloaded files
* output files are named by their MD5

# Usage
```
var param = {
    dir : './download'
};

var crawler = new(require('instagram-crawler'))(param);

crawler.download_users([
    'user1',
    'user2'
]);
```

# Feedback

Comments and patches welcomed

Enrico Weigelt, metux IT consult <enrico.weigelt@gr13.net>
