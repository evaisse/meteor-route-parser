meteor-route-parser
=====

Small & consise route parser, inspired by Sinatra, Iron.Router &amp; others.
Do not provide routing by itself, only route pattern transformation to regexp handler.


Simple usage

    /*
        Will match : /post/mypost-123 => { id: "mypost-123" }
     */
    RouteParser.parse("/post/:id").exec(document.location);


Options

    /*
        Will match :
            /post/mypost-123 => { id: "mypost-123" }
            /post => { id: null }
            /post/ => { id: null }
     */
    RouteParser.parse("/post/?:id?").exec(document.location);


Work on subfragment levels

    /*
        Will match :
            /post/123-match => { id: "123", 0: "match" }
    */
    RouteParser.parse("/post/:id-*").constrain('id', /\d+/).exec(document.location);


A more complex example :

    var route = RouteParser.parse("/another/:foo/(bla/:bar(/*)?)?");

    /*
        Will match :
            /another/123/ => { foo: "123", bar: "456" }
            /another/123/bla/456 => { foo: "123", bar: "456" }
            /another/123/bla/456/other/splat/anything => { foo: "123", bar: "456", 0: "other/splat/anything" }
     */
    params = route.exec(document.location);
