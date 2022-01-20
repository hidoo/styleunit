# spritesheet plugin

> Mixin for using spritesheet in @hidoo/unit framework.

## Usage

SCSS

```scss
// use spritesheet plugin with configuration
@use "node_modules/unit/src/plugin/spritesheet" with (
  $spritesheets: (
    "icon-image": (
      "image": "path/to/sprite/icon-image.png",
      "items": (
        "logo": (
          "width": 10px,
          "height": 10px,
          "total-width": 30px,
          "total-height": 30px,
          "offset-x": -10px,
          "offset-y": -10px
        )
      )
    )
  )
);

// use this mixin inside block
.selector {
  @include spritesheet.define($type: "icon-image", $name: "logo");
}
```

CSS Outputs

```css
.selector-logo {
  overflow: hidden;
  text-indent: -100%;
  color: transparent;
  background-image: url(path/to/sprite/icon-image.png);
}
.selector-logo {
  width: 10px;
  height: 10px;
  background-position: -10px -10px;
  background-size: 30px 30px;
}
```

## Supported format of spritesheet

This mixin support following format of spritesheet.

```scss
$spritesheets: (
  // output each by files of spritesheet
  "icon-image": (
    "image": "path/to/sprite/icon-image.png",
    "items": (
      // output each by items
      "logo": (
        "width": 10px,
        "height": 10px,
        "total-width": 30px,
        "total-height": 30px,
        "offset-x": -10px,
        "offset-y": -10px
      ),
      ...
    )
  ),
  ...
) !default;
```

### Usage with suffix of item state

The state can be expressed by specifying the following suffix in the item name.

| Suffix                  | Example                        | State                                                     |
| :---------------------- | :----------------------------- | :-------------------------------------------------------- |
| (None)                  | `example`                      | (Default)                                                 |
| `--focus`               | `example--focus`               | Styles in `:hover, :focus, .is-focus`                     |
| `--disabled`            | `example--disabled`            | Styles in `:disabled, .is-disabled`.                      |
| `--if-mobile`           | `example--if-mobile`           | Styles at mobile viewport.                                |
| `--focus--if-mobile`    | `example--focus--if-mobile`    | Styles in `:hover, :focus, .is-focus` at mobile viewport. |
| `--disabled--if-mobile` | `example--disabled--if-mobile` | Styles in `:disabled, .is-disabled` at mobile viewport.   |

#### When `$options: ("toggle": false);`

| Suffix                 | Example                       | State                                       |
| :--------------------- | :---------------------------- | :------------------------------------------ |
| `--current`            | `example--current`            | Styles in `.is-current`.                    |
| `--current--if-mobile` | `example--current--if-mobile` | Styles in `.is-current` at mobile viewport. |

#### When `$options: ("toggle": true);`

| Suffix                            | Example                                  | State                                                                                                                                            |
| :-------------------------------- | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| `--selected`                      | `example--selected`                      | Styles in `:checked, .is-selected`.                                                                                                              |
| `--selected--focus`               | `example--selected--focus`               | Styles in `:checked:hover, :checked:focus :checked.is-focus, .is-selected:hover, .is-selected:focus .is-selected.is-focus`.                      |
| `--selected--disabled`            | `example--selected--disabled`            | Styles in `:checked:disabled :checked.is-disabled, .is-selected:disabled .is-selected.is-disabled`.                                              |
| `--selected--if-mobile`           | `example--selected--if-mobile`           | Styles in `:checked, .is-selected` at mobile viewport.                                                                                           |
| `--selected--focus--if-mobile`    | `example--selected--focus--if-mobile`    | Styles in `:checked:hover, :checked:focus, :checked.is-focus, .is-selected:hover, .is-selected:focus, .is-selected.is-focus` at mobile viewport. |
| `--selected--disabled--if-mobile` | `example--selected--disabled--if-mobile` | Styles in `:checked:disabled, :checked.is-disabled, .is-selected:disabled, .is-selected.is-disabled` at mobile viewport.                         |

## License

MIT
