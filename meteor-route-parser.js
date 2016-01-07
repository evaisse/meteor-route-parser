/**
 *
 */
RouteParser = {
    _namedParam: /(:(\w+))/g,
    _splatParam: /\*/g,
    _groups: /\((.+)\)/g,
    _smash: /(\(|:\w+|\*)/g,
};

RouteParser.parse = function (route) {
    var params = [],
        regex,
        i = 0,
        n = 0,
        sub;

    regex = route;

    params = regex.match(RouteParser._smash);
    params = params ? params : [];

    params = params.map(function (v) {
        if (v == "(") {
            return null;
        } else if (v == "*") {
            return i++; // positionnal arg
        } else {
            return v.substr(1);
        }
    });

    regex = regex.replace(RouteParser._namedParam, '([^\/]+)');
    regex = regex.replace(RouteParser._splatParam, '(.+)');
    regex = new RegExp('^' + regex + '$');

    // console.log(params, regex);

    return {
        route: route,
        regex: regex,
        exec: function (url) {
            var p = regex.exec(url),
                res = {};

            if (!p) {
                return false;
            }

            p.slice(1).forEach(function (v, i) {
                if (params[i] !== null) {
                    res[params[i]] = v === undefined ? null : v;
                }
            });

            // console.log('[RouteParser]', 'handle route', res, params, p.slice(1));

            return res;
        },
    };
};
