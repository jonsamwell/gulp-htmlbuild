'use strict';

var util = require('util'),
    PluginError = require('gulp-util').PluginError;

module.exports = {
    options: {
        getValue: function (context, options, key) {
            var value = options[key],
                pathChain,
                error,
                i;

            if (key === undefined) {
                throw new PluginError('gulp-htmlbuild', util.format('Please provide a key in your "<!-- htmlbuild:%s {arg} -->" html block.', context));
            }

            if (value === undefined) {
                // the key might be a chained path, so if it is follow the path down the options object
                if (key.indexOf('.') !== -1) {
                    value = options;
                    pathChain = key.split('.');
                    for (i = 0; i < pathChain.length; i += 1) {
                        value = value[pathChain[i]];
                        if (value === undefined) {
                            error = true;
                            break;
                        }
                    }
                } else {
                    error = true;
                }

                if (error || value === undefined) {
                    throw new PluginError('gulp-htmlbuild', util.format('Unable to find option key "%s" in htmlbuild:template options', key));
                }
            }

            return value;
        }
    }
};
