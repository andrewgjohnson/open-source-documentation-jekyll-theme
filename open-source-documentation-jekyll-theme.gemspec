# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name     = "open-source-documentation-jekyll-theme"
  spec.version  = "1.1.0"
  spec.authors  = ["Andrew G. Johnson"]
  spec.email    = ["andrew@andrewgjohnson.com"]

  spec.summary  = "A Jekyll theme for open source project documentation sites."
  spec.homepage = "https://github.com/andrewgjohnson/open-source-documentation-jekyll-theme"
  spec.license  = "MIT"

  spec.metadata = {
    "plugin_type"     => "theme",
    "source_code_uri" => spec.homepage,
    "bug_tracker_uri" => "#{spec.homepage}/issues",
    "changelog_uri"   => "#{spec.homepage}/blob/main/CHANGELOG.md"
  }

  # Ship only the theme’s runtime files. Everything else is excluded automatically.
  spec.files = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r!\A(assets/|_layouts/|LICENSE|README|CHANGELOG)!i)
  end

  spec.required_ruby_version = ">= 2.7.0"

  spec.add_runtime_dependency "jekyll", ">= 4.0", "< 5.0"
  spec.add_development_dependency "bundler", ">= 2.3"
end
