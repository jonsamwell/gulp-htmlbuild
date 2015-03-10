'use strict';

var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    htmlbuild = require('../index'),
    htmlbuildutils = require('./utils'),
    through = require('through'),
    PluginError = require('gulp-util').PluginError;

module.exports = function (options) {
    if (options === undefined) {
        throw new PluginError('gulp-htmlbuild', 'Please provide options to htmlbuild:template function, which should indicate template paths.');
    }

    return function (block) {
        var templatePath = htmlbuildutils.options.getValue('template', options, block.args[0]);
        gulp.src(templatePath, { cwd: options.cwd })
            .pipe(gulpif(options.recurse, htmlbuild({
                template: htmlbuild.preprocess.template(options),
                remove: function (block) { block.end(); }
            })))
            .pipe(through(
                function write(file) {
                    var contents = String(file.contents);
                    block.end(contents);
                }
            ));
    };
};
