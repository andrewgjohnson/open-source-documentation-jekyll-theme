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
const through2 = require('through2').default;
const uglify = require('gulp-uglify');
const postcss = require('postcss');

/*
 * The syntax highlighting CSS and JS are vendored from the @highlightjs/cdn-assets
 * npm package (pinned in package.json). Bump that dependency and re-run `npx gulp`
 * to update; do not edit the generated assets/css/highlight-js.min.css or
 * assets/js/highlight-js.min.js by hand.
 */
const HIGHLIGHT_CSS_SOURCE = 'node_modules/@highlightjs/cdn-assets/styles/default.min.css';
const HIGHLIGHT_JS_SOURCE = 'node_modules/@highlightjs/cdn-assets/highlight.min.js';

/*
 * Only these declarations are kept from the upstream theme. Layout properties
 * (padding, background, display, overflow, etc.) are stripped so they cannot
 * conflict with the code-block rules in stylesheet.css.
 */
const HIGHLIGHT_CSS_WHITELIST = [
    'color',
    'font-style',
    'font-weight'
];

const CLEAN_CSS_OPTIONS = {
    compatibility: 'ie7',
    rebase:        false,
    level:         {
        1: {
            optimizeFontWeight: false
        }
    }
};

const processCss = function(paths, folder, filename) {
    return gulp
        .src(paths)
        .pipe(replace('/**', '/*!'))
        .pipe(cleanCss(CLEAN_CSS_OPTIONS))
        .pipe(replace('/*!', '/**'))
        .pipe(concat(filename))
        .pipe(gulp.dest(folder));
};

/*
 * Parse the upstream highlight.js theme, drop every declaration whose property is
 * not whitelisted, drop any rule left empty, replace the upstream banner with a
 * generated-file header and log a report of everything that was stripped.
 */
const stripHighlightCss = function(css) {
    const root = postcss.parse(css);
    const stripped = [];

    root.walkComments(function(comment) {
        comment.remove();
    });

    root.walkRules(function(rule) {
        const removed = [];
        rule.walkDecls(function(decl) {
            if (HIGHLIGHT_CSS_WHITELIST.indexOf(decl.prop) === -1) {
                removed.push(decl.prop);
                decl.remove();
            }
        });

        const emptied = rule.nodes.length === 0;
        if (removed.length > 0) {
            stripped.push(
                '  - ' + rule.selector + ' { ' + removed.join(', ') + ' }' +
                (emptied ? '  -> rule removed' : '')
            );
        }
        if (emptied) {
            rule.remove();
        }
    });

    console.log(
        'highlight-js: kept ' + root.nodes.length + ' rule(s); stripped ' +
        'non-whitelisted properties (keeping only ' +
        HIGHLIGHT_CSS_WHITELIST.join(', ') + '):'
    );
    stripped.forEach(function(line) {
        console.log(line);
    });

    const header =
        '/**\n' +
        ' * GENERATED FILE - do not edit by hand.\n' +
        ' * Regenerate with `npx gulp` (sourced from the @highlightjs/cdn-assets\n' +
        ' * npm package; bump that dependency to update). Only the ' +
        HIGHLIGHT_CSS_WHITELIST.join(', ') + '\n' +
        ' * properties are kept so layout rules cannot conflict with stylesheet.css.\n' +
        ' * highlight.js (c) highlight.js contributors, BSD-3-Clause.\n' +
        ' */\n';

    return header + root.toString();
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
    return gulp
        .src(HIGHLIGHT_CSS_SOURCE)
        .pipe(through2.obj(function(file, encoding, callback) {
            if (file.isBuffer()) {
                file.contents = Buffer.from(
                    stripHighlightCss(file.contents.toString(encoding)),
                    encoding
                );
            }
            callback(null, file);
        }))
        .pipe(replace('/**', '/*!'))
        .pipe(cleanCss(CLEAN_CSS_OPTIONS))
        .pipe(replace('/*!', '/**'))
        .pipe(concat('highlight-js.min.css'))
        .pipe(gulp.dest('assets/css'));
};

const copyHighlightJavascript = function() {
    return gulp
        .src(HIGHLIGHT_JS_SOURCE)
        .pipe(concat('highlight-js.min.js'))
        .pipe(gulp.dest('assets/js'));
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
    copyHighlightJavascript,
    minifyJavascript
));
