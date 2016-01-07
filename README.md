meteor-route-parser
=====

[![testing](https://travis-ci.org/evaisse/meteor-route-parser.svg?branch=master)](https://travis-ci.org/evaisse/meteor-route-parser)

    meteor add evaisse:route-parser


Small & consise route parser, inspired by Sinatra, Iron.Router & others.

**Do not provide routing by itself**, this lib only transform pattern to regexp/params-mapper handler.

*Note that the parser by itself has no dependencies from NodeJS nor Meteor. You can freely use it in vanilla Javascript.*

Simple usage


    RouteParser.parse("/post/:id").exec(url);
    /*
        Will match : /post/mypost-123 => { id: "mypost-123" }
     */

Optionnal groups

    RouteParser.parse("/post(/:id)").exec(url);
    /*
        Will match :
            /post/mypost-123 => { id: "mypost-123" }
            /post => { id: null }
            /post/ => { id: null }
     */

Works also in url subfragment level

    RouteParser.parse("/post/:id-*", {id: /\d+/}).exec(url);
    /*
        Will match :
            /post/123-match => { id: "123", 0: "match" }
    */

You can always use traditionnal RegExp

    RouteParser.parse(/^\/foo\/(\d+\/?)?$/).exec(url);

A more complex example

    var route = RouteParser.parse("/another/:foo/(bla/:bar(/*)?)?");

    params = route.exec(url);

    /*
        Will match :
            /another/123/ => { foo: "123", bar: "456" }
            /another/123/bla/456 => { foo: "123", bar: "456" }
            /another/123/bla/456/other/splat/anything => { foo: "123", bar: "456", 0: "other/splat/anything" }
     */
