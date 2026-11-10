---
icon: simple/statuspage
status: published
---

# :simple-statuspage: Page Status

The `status` field in the Frontmatter is used to indicate the status of the page.

```yaml title="Example"
---
status: draft
---
```

Appropriate icons in the front matter to visually represent them in the left sidebar.

Icons are embedded SVG masks in [extra.css](../../stylesheets/extra.css), loaded
after the Matrix theme stylesheet. They appear in navigation and in the examples
below, with colors for both light and dark palettes.

| Status | Icon |
| --- | --- |
| `deprecated` | Circle with a slash |
| `draft` | Pencil |
| `hot` | Flame |
| `new` | Sparkle |
| `published` | Checkmark in a circle |

Status values are case-sensitive: use lowercase values such as `published`, not
`Published`. Tooltip descriptions are configured in `project.extra.status` in
`zensical.toml`.

## <span class="md-ellipsis"> Deprecated <span class="md-status md-status--deprecated" title="WIll be removed soon"> </span> </span>

[Read more about deprecated pages](./deprecated.md).

## <span class="md-ellipsis"> Draft <span class="md-status md-status--draft" title="Draft - work in progress"> </span> </span>

[Read more about draft pages](./draft.md).


## <span class="md-ellipsis"> Hot <span class="md-status md-status--hot" title="Page under construction"> </span> </span>

[Read more about hot pages](./hot.md).

## <span class="md-ellipsis"> New <span class="md-status md-status--new" title="Newly created page"> </span> </span>

[Read more about new pages](./new.md).

## <span class="md-ellipsis"> Published <span class="md-status md-status--published" title="Page is complete and published"> </span> </span>

[Read more about published pages](./published.md).