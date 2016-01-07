/**
 *
 */
RouteParser = {
    _namedParam: /(:(\w+))/g,
    _splatParam: /\*/g,
    _groups: /\((.+)\)/g,
    _smash: /(\(|:\w+|\*)/g,
};

/**
 * Parse given string route pattern
 *
 * @param  {String} route      route pattern, /foo, /foo/:bar, /home/(:bar/(:id/*-*))
 * @param  {Object} constrains declare optionnal regex constrains, { id: /\d+/ }
 * @return {Object|false}      A struct of route object
 */
RouteParser.parse = function (route, constrains) {

    var params = [],
        regex,
        i = 0,
        n = 0,
        sub,
        isRegExp = function (regex) {
            return (Object.prototype.toString.call(regex).indexOf('RegExp') > 0);
        };

    constrains = constrains || {};
    regex = route;

    /*
        If route is a pattern, we build from the pattern
     */
    if (!isRegExp(regex)) {

        params = regex.match(RouteParser._smash);
        params = params ? params : [];

        /*
            create sequence of patterns matchs list,
            to later assign named groups, positionnal param & discard
            optionnal virtual groups
         */
        params = params.map(function (v) {
            if (v == "(") {
                return null;
            } else if (v == "*") {
                return i++; // positionnal arg
            } else {
                return v.substr(1);
            }
        });

        // make every non-splat, non-named group optionnal
        regex = regex.replace(/\)/g, ')?');

        // detect named parameters & assign pattern constrains
        regex = regex.replace(RouteParser._namedParam, function (a) {

            var constrain = constrains[a.substr(1)];

            // we check if there is given constrain for named parameter
            if (constrain) {
                if (isRegExp(constrain)) {
                    // Insert the regexp constrain into the
                    constrain = constrain + '';
                    return '(' + constrain.replace(/^\//, '').replace(/(\/\w*)$/, '') + ')';
                } else {
                    // insert raw constrain
                    return '(' + constrain + ')';
                }
            } else {
                // default named parameter constrain
                return '([^\/]+)';
            }
        });

        // detect "splat" params
        regex = regex.replace(RouteParser._splatParam, '(.+)');

        // build final regex
        regex = new RegExp('^' + regex + '$');
    } else {
        params = null;
    }

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
                if (!params) {
                    res[i] = v === undefined ? null : v;
                } else if (params[i] !== null) {
                    res[params[i]] = v === undefined ? null : v;
                }
            });

            // console.log('[RouteParser]', 'handle route', res, params, p.slice(1));
            return res;
        },
    };
};
