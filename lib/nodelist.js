
var filter_elem = function(elem) {
    delete elem.code;
    delete elem.date;
    delete elem.comments;
    delete elem.likes;
    delete elem.thumbnail_resources;
    delete elem.owner;
    delete elem.comments_disabled;
    delete elem.__typename;
    delete elem.dimensions;
    delete elem.media_preview;
    delete elem.gating_info;
    delete elem.thumbnail_src;
    delete elem.is_video;
    delete elem.caption;
    delete elem.edge_media_to_caption;
    delete elem.taken_at_timestamp;
    delete elem.edge_media_to_comment;
    delete elem.edge_media_preview_like;
    delete elem.video_view_count;
    return elem;
}

module.exports = {
    filter_elem : filter_elem,
}
