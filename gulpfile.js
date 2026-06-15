/**
 * Open Source Documentation (Jekyll Theme)
 *
 * Copyright (c) 2026 Andrew G. Johnson <andrew@andrewgjohnson.com>
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
 * Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @category    AndrewGJohnson
 * @package     Open Source Documentation (Jekyll Theme)
 * @author        Andrew G. Johnson <andrew@andrewgjohnson.com>
 * @copyright 2026 Andrew G. Johnson <andrew@andrewgjohnson.com>
 * @license     https://opensource.org/licenses/mit/ The MIT License
 * @link            https://github.com/andrewgjohnson/open-source-documentation-jekyll-theme
 */

/* global Buffer */

const gulp = require('gulp');
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const replace = require('gulp-replace');
const through2 = require('through2');
const uglify = require('gulp-uglify');

const processCss = function(paths, folder, filename) {
    return gulp
        .src(paths)
        .pipe(replace('/**', '/*!'))
        .pipe(cleanCss({
            compatibility: 'ie7',
            rebase:        false,
            level:         {
                1: {
                    optimizeFontWeight: false
                }
            }
        }))
        .pipe(replace('/*!', '/**'))
        .pipe(concat(filename))
        .pipe(gulp.dest(folder));
};

const processJavascript = function(paths, folder, filename) {
    return gulp
        .src(paths)
        .pipe(uglify({
            output: {
                comments: 'some'
            }
        }))
        .pipe(through2.obj(function(file, encoding, callback) {
            if (file.isBuffer()) {
                const contents = file.contents.toString(encoding);
                const processedContents = formatMultilineComments(contents);
                file.contents = Buffer.from(processedContents, encoding);
            }
            callback(null, file);
        }))
        .pipe(concat(filename))
        .pipe(gulp.dest(folder));
};

const formatMultilineComments = function(javascriptCode) {
    const javascriptLines = javascriptCode.split('\n');

    let multilineComment = false;
    for (let i = 0; i < javascriptLines.length; i++) {
        if (multilineComment && javascriptLines[i].trimStart().indexOf('*') === 0) {
            javascriptLines[i] = ' ' + javascriptLines[i].substring(
                javascriptLines[i].indexOf('*')
            );
        }

        if (javascriptLines[i].indexOf('/**') !== -1) {
            multilineComment = true;
        } else if (javascriptLines[i].indexOf('*/') !== -1) {
            multilineComment = false;
        }
    }

    return javascriptLines.join('\n');
};

const minifyStylesheet = function() {
    return processCss(
        ['assets/css/stylesheet.css'],
        'assets/css',
        'stylesheet.min.css'
    );
};

const minifySyntaxHighlighting = function() {
    return processCss(
        ['assets/css/syntax-highlighting.css'],
        'assets/css',
        'syntax-highlighting.min.css'
    );
};

const minifyJavascript = function() {
    return processJavascript(
        ['assets/js/javascript.js'],
        'assets/js',
        'javascript.min.js'
    );
};

gulp.task('default', gulp.series(
    minifyStylesheet,
    minifySyntaxHighlighting,
    minifyJavascript
));
