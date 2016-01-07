// Write your tests here!
// Here is an example.
Tinytest.add('test routes', function (test) {

    // var urls = [
    //     '/foo',
    //     '/foo',
    //     '/foo/:id-:rest',
    //     '/foo/:id-:rest',
    // ];

    function match(route, url, params) {
        var res;

        route = RouteParser.parse(route);

        res = route.exec(url);
        test.equal(!!res, true, route.route + " => " + route.regex + " => " + url);
        if (res && params) {
            test.equal(res, params);
        }
    }

    match('/foo', '/foo');
    match('/foo:bar', '/foobar', {bar: "bar"});
    match('/foo/:bar', '/foo/bar', {bar: "bar"});
    match('/foo/:bar?', '/foo/');
    match('/another/:foo/(bla/:bar(/*)?)?', '/another/foo/bla/bar', {0: null, foo:"foo", bar: "bar"});


});
