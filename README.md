# Documentation preview

Start the local Zensical preview from any directory:

```sh
/path/to/docs-blogs/_local-scripts/start-zensical.sh
```

## Matrix theme

The site defaults to a dark green Matrix theme with terminal-style navigation,
readable content panels, and subtle digital rain. The palette toggle in the
header switches to a green-tinted light mode.

The site logo is the green `>_` terminal image in
[logo.png](docs/assets/logo.png), configured with `project.theme.logo`.
The browser favicon is [favicon.ico](docs/assets/favicon.ico), configured
via `project.theme.favicon`, including on the custom 404 page.
Keep its `.ico` extension: renaming an ICO file to `.png` does not convert it
and causes the server to advertise the wrong image type.
Its URL includes `?v=terminal-ico-2` to bypass previously cached favicons.
Increment that version when replacing the icon; browsers can cache tab icons
independently of page content.
The separate repository icon is set with `project.theme.icon.repo` to
`fontawesome/brands/github-alt`.

- [Theme overrides](docs/overrides/main.html) preserve Zensical's navigation and search.
- [Theme styles](docs/stylesheets/matrix.css) control colors, typography, and layout.
- [Shared animation](docs/javascripts/matrix.js) powers both the docs and the 404 page.

Use the circular pause/resume icon button at the top right of the header to
stop or restart the background. Its tooltip and accessible label indicate
**Pause** or **Resume**. Reduced-motion
preferences start it paused, and hidden tabs suspend animation. Instant navigation
keeps the animation and its pause state without starting duplicate render loops.
The theme uses local assets and system fonts; no third-party assets are needed
for its styling or animation.

## Announcement banner

Edit [announce.html](docs/overrides/announce.html) to change the banner content.
[main.html](docs/overrides/main.html) includes it inside Zensical's `announce`
block; an `announce.html` file alone is not loaded automatically.

The `announce.dismiss` theme feature enables the close button. A dismissed banner
stays hidden in that browser until its content changes. Remove that feature if
the banner should not be dismissible. The standalone 404 page has no banner.

## Metadata in Markdown

The native `zensical.extensions.macros` extension is enabled in
[zensical.toml](zensical.toml). Add `render_macros: true` to a page's front matter
to interpolate variables before Markdown is converted to HTML:

```markdown
---
render_macros: true
description: A description for this page.
---

> {{ config.site_description | e }}

> {{ page.meta.description | e }}
```

`config` exposes site settings, `config.extra` exposes custom site data, and
`page.meta` exposes front matter. The [homepage](docs/index.md) uses this to
display the configured site description.

Other pages do not evaluate template expressions by default. On enabled pages,
wrap literal Jinja examples in `{% raw %}...{% endraw %}`. Undefined variables
and rendering errors stop the build instead of silently producing empty output.
No additional plugin package or local Python module is needed.

## Custom 404 page

The [404 template](docs/overrides/404.html) provides a standalone Matrix-style
digital-rain background, a home link, and an animation pause control. It uses the
same local animation script as the docs, respects reduced-motion preferences,
and pauses animation while the tab is hidden.

`project.theme.custom_dir` in [zensical.toml](zensical.toml) points to
`docs/overrides`. That directory is excluded from documentation assets so the
unrendered template isn't published.

After starting the preview, visit `/404.html` (under your site's base path, if
applicable) to view the page. A deployment must serve the generated `404.html`
for missing routes; GitHub Pages does this automatically.