var Crawler = require("crawler");
var NodeList = require('./nodelist');

const { URL, URLSearchParams } = require('url');

var parse_url = function(url) {
    const myURL = new URL(url);
    console.log(myURL.searchParams.entries());
}

var mk_url = function(param) {
    myURL = new URL('https://www.instagram.com/graphql/query/');
    myURL.searchParams.append('query_id', param.query_id);
    myURL.searchParams.append('variables',
        JSON.stringify({
            id    : param.id,
            first : param.limit,
            after : param.cursor,
        })
    );

    return myURL;
}

var scan_url = function(url, result_cb) {
    var crawler = new Crawler({
        maxConnections : 10,
        callback : function (error, res, done) {
            if (error) {
                console.log(error);
                return;
            }

	    var body = JSON.parse(res.body);

	    console.log("BODY="+JSON.stringify(body)+"\n");

            var data = JSON.parse(res.body).data.user.edge_owner_to_timeline_media;

            for (e in data.edges) {
                // note: reducing one hierarchy level in the tree
                data.edges[e] = NodeList.filter_elem(data.edges[e].node);
            }

            data.nodes = data.edges;
            delete data.edges;

            done();

            result_cb(data);
        },
        jQuery : false,
    });
    crawler.queue(url.toString());
}

module.exports = {
    scan_url : scan_url,
    parse_url : parse_url,
    mk_url : mk_url,
}
