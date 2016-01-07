Tinytest.add('test routes', function (test) {

    function assert(route, config, tests) {
       var res;

       route = RouteParser.parse(route, config);

       tests.forEach(function (t) {
           var cond = t[0],
               url = t[1],
               params = t[2];

           res = route.exec(url);

           test.equal(!!res, cond, route.route + " => " + route.regex + " => " + url);

           if (res && params) {
               test.equal(res, params);
           }
       });
    }

    assert('/foo/:bar', {}, [
        [true, '/foo/bar', {bar: "bar"}],
    ]);

    assert('/foo:bar', {}, [
        [true, '/foobar', {bar: "bar"}],
    ]);

    assert('/foo/:bar', {}, [
        [true, '/foo/bar', {bar: "bar"}],
    ]);

    assert('/foo/(:bar)', {}, [
        [true, '/foo/bar', {bar: "bar"}],
        [true, '/foo/', {bar: null}],
    ]);

    assert('/foo/(:bar)', {
        bar: /\d+/,
    }, [
        [false, '/foo/bar', {bar: null}],
        [true, '/foo/12', {bar: "12"}],
        [true, '/foo/', {bar: null}],
    ]);

    assert('/foo/(:bar)', {
        bar: /\d+/g,
    }, [
        [false, '/foo/bar', {bar: null}],
        [true, '/foo/12', {bar: "12"}],
        [true, '/foo/', {bar: null}],
    ]);

    assert(/^\/foo\/(\d+\/?)?$/, {}, [
        [false, '/foo/bar', {0: null}],
        [true, '/foo/12', {0: "12"}],
        [true, '/foo/', {0: null}],
    ]);

    assert('/archive(/:year(/:month(/:day)))', {
        year: /2\d{3}/g,
        month: /[0-1][0-9]/g,
        day: /[0-3][0-9]/g,
    }, [
        [false, '/archive/bar', {year: null, month: null, day: null}],
        [false, '/archive/300', {year: null, month: null, day: null}],
        [true, '/archive/2015/05/06', {year: "2015", month: "05", day: "06"}],
        [true, '/archive/2015/05', {year: "2015", month: "05", day: null}],
        [true, '/archive/2015', {year: "2015", month: null, day: null}],
    ]);

    assert('/another/:foo/(bla/:bar(/*))', {}, [
        [true, '/another/foo/bla/bar', {0: null, foo:"foo", bar: "bar"}],
        [true, '/another/foo/', {0: null, foo:"foo", bar: null}],
    ]);

    assert('/another/?', {}, [
        [true, '/another', {}],
        [true, '/another/', {}],
    ]);

});
