'use strict';
var trackPageview = function() {
    var path = window.location.pathname;
    var pageName = '';
    if ( path === '/' ) {
        pageName = 'Home';
    } else if ( path === '/about/' ) {
        pageName = 'About';
    } else {
        pageName = 'Post';
    }
    mixpanel.track('Page View: ' + pageName, {
        'title': document.title
    });
}

var trackLinks = function() {
    mixpanel.track_links('a', 'Clicked link');
}
