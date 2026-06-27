# Changelog

All notable changes to the [Open Source Documentation (Jekyll Theme)](https://github.com/andrewgjohnson/open-source-documentation-jekyll-theme) will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/) and this project adheres to [Semantic Versioning](https://semver.org/).

## [v1.1.0](https://github.com/andrewgjohnson/open-source-documentation-jekyll-theme/releases/tag/v1.1.0) (June 27, 2026)
 * Added Open Graph and Twitter Card meta tags, configurable at the site or page level, via the new `image`, `twitter_site`/`twitter_creator` site options and the new `image` and `og_type` page options
 * Added page-level `description` support so a page can override the site description for its meta description and social tags
 * Added page-level `keywords` support so a page can override the site keywords in its meta tags
 * Added an optional `nav` site option for navigation links that are not tied to a page, merged with page-based links and sorted together by `nav_order`
 * Limited the social links aside to the first ten entries so the icon grid stays intact
 * Changed syntax highlighting to be self-hosted instead of loaded from a CDN — highlight.js is now vendored from the `@highlightjs/cdn-assets` npm package and built with gulp, with the styles stripped to colour, weight and style declarations so they cannot conflict with the stylesheet
 * Added support for older browsers via cross-browser JavaScript fallbacks
 * Added automated install tracking with an installs badge and a generated `INSTALLS.md` report
 * Hardened HTML output by escaping interpolated configuration values (titles, descriptions, labels and URLs) to prevent broken markup from special characters
 * Added support for installing the theme as a RubyGem in addition to `remote_theme`

## [v1.0.0](https://github.com/andrewgjohnson/open-source-documentation-jekyll-theme/releases/tag/v1.0.0) (June 14, 2026)
 * Initial release of the theme
