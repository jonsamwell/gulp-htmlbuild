'use strict';

var gulp = require('gulp'),
    util = require('util'),
    htmlbuildutils = require('./utils'),
    through = require('through'),
    PluginError = require('gulp-util').PluginError;

module.exports = function (options) {
  if (options === undefined) {
    throw new PluginError('gulp-htmlbuild', 'Please provide options to htmlbuild:inlinescript function, which should indicate template paths.');
  }

  return function (block) {
    var config = htmlbuildutils.options.getValue('inlinescript', options, block.args[0]),
        templatePath = config.path || config;
    gulp.src(templatePath, { cwd: options.cwd })
      .pipe(through(
        function write(file) {
          var contents = String(file.contents);
          if (config.process) {
            contents = config.process(contents);
          }

          block.end(util.format('<script type="text/javascript">%s</script>', contents));
        }
      ));
  };
};
