# Open Source Documentation (Jekyll Theme)

[![MIT License](https://img.shields.io/badge/license-MIT-0366d6.png?colorB=0366d6&style=flat-square)](https://github.com/andrewgjohnson/open-source-documentation-jekyll-theme/blob/main/LICENSE)
[![Current Release](https://img.shields.io/github/release/andrewgjohnson/open-source-documentation-jekyll-theme.png?colorB=0366d6&style=flat-square&logoColor=white&logo=github)](https://github.com/andrewgjohnson/open-source-documentation-jekyll-theme/releases)
[![Issues](https://img.shields.io/github/issues/andrewgjohnson/open-source-documentation-jekyll-theme.png?colorB=0366d6&style=flat-square&logoColor=white&logo=github)](https://github.com/andrewgjohnson/open-source-documentation-jekyll-theme/issues)
[![Installs](assets/images/installs-badge.png)](INSTALLS.md)
[![RubyGems Downloads](https://img.shields.io/gem/dt/open-source-documentation-jekyll-theme.png?colorB=0366d6&style=flat-square&logoColor=white&logo=rubygems)](https://rubygems.org/gems/open-source-documentation-jekyll-theme)
[![Patreon](assets/images/patreon-badge.png)](https://patreon.com/agjopensource)

<p align="center">
    <a href="https://github.com/andrewgjohnson/open-source-documentation-jekyll-theme" title="Open Source Documentation (Jekyll Theme)">
        <img src="assets/images/avatar.png" width="400" alt="Open Source Documentation (Jekyll Theme)" />
    </a>
</p>

## Description

**Open Source Documentation (Jekyll Theme)** is a shared Jekyll theme started by [Andrew G. Johnson](https://github.com/andrewgjohnson) for open source documentation.

## Usage/Installation

The theme can be used as a RubyGem or via `remote_theme`.

### As a gem

Add to your `Gemfile`:

```ruby
gem "open-source-documentation-jekyll-theme"
```

And to your `_config.yml`:

```yaml
theme: open-source-documentation-jekyll-theme
```

### Via `remote_theme` (e.g. GitHub Pages)

```yaml
remote_theme: andrewgjohnson/open-source-documentation-jekyll-theme
plugins:
  - jekyll-remote-theme
```

## Variables

### Site config (`_config.yml`)

| Variable | Required | Description |
|----------|----------|-------------|
| `name` | yes | Project name displayed in the wordmark and social links aside |
| `title` | yes | Site title used in `<title>` and keywords meta tag |
| `description` | yes | Site description used in meta tags; overridable per page with page-level `description` |
| `favicon` | no | URL of the favicon |
| `image` | no | Absolute URL of the default Open Graph / Twitter share image |
| `twitter_site` | no | Twitter/X `@handle` for the site, emitted as `twitter:site` |
| `twitter_creator` | no | Twitter/X `@handle` for the author, emitted as `twitter:creator` |
| `cover_image` | no | Filename (without extension) of a bundled cover image — `mountains` or `forest` |
| `cover_image_url` | no | Absolute URL of a custom cover image, takes precedence over `cover_image` |
| `menu_url` | no | URL for the menu toggle link — if omitted the toggle renders as a `<span>` instead of `<a>` |
| `keywords` | no | Comma-separated keywords prepended to the auto-generated keywords meta tag |
| `social_links` | no | Array of social links shown in the aside — each entry has `platform`, `url`, and `label` fields |
| `nav` | no | Array of navigation links not tied to a page — each entry has `url`, `label`, and `nav_order`. Merged with page-based nav links and sorted together by `nav_order` |
| `footer_text` | no | Text displayed in the footer before the copyright notice |
| `footer_url` | no | Absolute URL that wraps `footer_text` as a link — only used when `footer_text` is also set |
| `copyright_year_start` | no | Four-digit year the project was first released (e.g. `2013`) — when set and different from the current year, renders as a year range |
| `syntax_highlighting` | no | Set to `true` to include highlight.js CSS and JS |
| `custom_head` | no | Raw HTML injected at the end of `<head>` |
| `custom_body` | no | Raw HTML injected at the end of `<body>` |

#### `social_links` example

```yaml
social_links:
  - platform: github
    url:      https://github.com/andrewgjohnson/open-source-documentation-jekyll-theme
    label:    GitHub Repository
  - platform: facebook
    url:      https://www.facebook.com/andrewgjohnson
    label:    Facebook Profile
  - platform: homepage
    url:      https://www.andrewgjohnson.com/
    label:    Personal Homepage
```

Supported platforms: `bluesky`, `codepen`, `dev`, `discord`, `facebook`, `github`, `gitlab`, `instagram`, `linkedin`, `mastodon`, `npm`, `packagist`, `patreon`, `reddit`, `slack`, `stackoverflow`, `threads`, `tiktok`, `twitch`, `twitter`, `x` and `youtube`. Any unrecognized platform will render a generic link icon.

#### `nav` example

Extra links (typically external) that appear in the main navigation alongside pages, ordered by `nav_order`:

```yaml
nav:
  - url:       https://github.com/andrewgjohnson/open-source-documentation-jekyll-theme
    label:     GitHub
    nav_order: 101
  - url:       https://example.com/changelog/
    label:     Changelog
    nav_order: 102
```

Page-based links use the page's `nav_order`; `nav` links use their own. Because both share a single ordering you can interleave them. Unlike page links, `nav` URLs are used verbatim (no `baseurl` is prepended), so use absolute URLs.

### Page frontmatter

| Variable | Required | Description |
|----------|----------|-------------|
| `nav_order` | no | Integer controlling this page’s position in the navigation — pages without this set are excluded from the nav entirely |
| `nav_text` | no | Label for this page’s navigation link — required when `nav_order` is set |
| `canonical` | no | Canonical URL injected as `<link rel="canonical">` in `<head>` |
| `description` | no | Overrides `site.description` for this page (meta description + Open Graph/Twitter) |
| `image` | no | Absolute URL of this page’s share image — overrides `site.image` |
| `og_type` | no | Open Graph `og:type` for this page (defaults to `website`; use `article` for posts) |

## Layout

The theme provides a single `default` layout. Used by setting `layout: default` in the page frontmatter.

## Projects using this theme

You can see projects currently using this theme in the [INSTALLS.md](INSTALLS.md) file.

## Acknowledgements

This theme was started by [Andrew G. Johnson (@andrewgjohnson)](https://github.com/andrewgjohnson).

Full list of contributors:
 * [Andrew G. Johnson (@andrewgjohnson)](https://github.com/andrewgjohnson)

Our [security policies and procedures](https://github.com/andrewgjohnson/open-source-documentation-jekyll-theme/blob/main/.github/SECURITY.md) come via the [atomist/samples](https://github.com/atomist/samples/blob/master/SECURITY.md) project. Our [issue templates](https://github.com/andrewgjohnson/open-source-documentation-jekyll-theme/tree/main/.github/ISSUE_TEMPLATE) come via the [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow/tree/master/.github/ISSUE_TEMPLATE) project. Our [pull request template](https://github.com/andrewgjohnson/open-source-documentation-jekyll-theme/blob/main/.github/PULL_REQUEST_TEMPLATE.md) comes via the [stevemao/github-issue-templates](https://github.com/stevemao/github-issue-templates) project. The [mountains photo](https://unsplash.com/photos/qJvpykJ5SKs) comes via [Gabriel Garcia Marengo](https://unsplash.com/@gabrielgm). The [forest photo](https://unsplash.com/photos/RfTD9NoLMEE) comes via [Radek Homola](https://unsplash.com/@radekhomola).

## Changelog

You can find all notable changes in the [changelog](CHANGELOG.md).
