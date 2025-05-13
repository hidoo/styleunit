# spritesheet plugin

> Mixin for using spritesheet in @hidoo/styleunit.

## Usage

SCSS

```scss
// use spritesheet plugin with configuration
@use 'node_modules/unit/src/plugin/spritesheet' with (
  $spritesheets: (
    'icon-image': (
      'image': 'path/to/sprite/icon-image.png',
      'items': (
        'logo': (
          'width': 10px,
          'height': 10px,
          'total-width': 30px,
          'total-height': 30px,
          'offset-x': -10px,
          'offset-y': -10px
        )
      )
    )
  )
);

// use this mixin inside block
.selector {
  @include spritesheet.define($type: 'icon-image', $name: 'logo');
}
```

CSS Outputs

```css
.selector-logo {
  --background-image: url(path/to/sprite/icon-image.png);
  background-image: var(--background-image);
}
.selector-logo {
  --overflow: hidden;
  --color: transparent;
  --text-indent: -100%;
}
.selector-logo {
  --width: 10px;
  width: var(--width);
  --height: 10px;
  height: var(--height);
  --background-position: -10px -10px;
  background-position: var(--background-position);
  --background-size: 30px 30px;
  background-size: var(--background-size);
}
```

## Supported format of spritesheet

This mixin support following format of spritesheet.

```scss
$spritesheets: (
  // output each by files of spritesheet
  'icon-image': (
      'image': 'path/to/sprite/icon-image.png',
      'items': (
        // output each by items
        'logo': (
            'width': 10px,
            'height': 10px,
            'total-width': 30px,
            'total-height': 30px,
            'offset-x': -10px,
            'offset-y': -10px
          ),
        ...
      )
    ),
  ...
) !default;
```

### Usage with prefix and suffix of item state

The state can be expressed by specifying the following prefix and suffix in the item name.

| Prefix | Suffix       | Example                | State                                                        |
| :----- | :----------- | :--------------------- | :----------------------------------------------------------- |
| (None) | (None)       | `example`              | Default styles                                               |
| (None) | `--focus`    | `example--focus`       | Styles in `:hover, :focus, .is-focus`                        |
| (None) | `--disabled` | `example--disabled`    | Styles in `:disabled, .is-disabled`.                         |
| `sm:`  | (None)       | `sm:example`           | Styles if viewport is `"sm"`.                                |
| `sm:`  | `--focus`    | `sm:example--focus`    | Styles in `:hover, :focus, .is-focus` if viewport is `"sm"`. |
| `sm:`  | `--disabled` | `sm:example--disabled` | Styles in `:disabled, .is-disabled` if viewport is `"sm"`.   |

#### When `$options: ("toggle": false);`

| Prefix | Suffix      | Example               | State                                          |
| :----- | :---------- | :-------------------- | :--------------------------------------------- |
| (None) | `--current` | `example--current`    | Styles in `.is-current`.                       |
| `sm:`  | `--current` | `sm:example--current` | Styles in `.is-current` if viewport is `"sm"`. |

#### When `$options: ("toggle": true);`

| Prefix | Suffix                 | Example                          | State                                                                                                                                               |
| :----- | :--------------------- | :------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| (None) | `--selected`           | `example--selected`              | Styles in `:checked, .is-selected`.                                                                                                                 |
| (None) | `--selected--focus`    | `example--selected--focus`       | Styles in `:checked:hover, :checked:focus :checked.is-focus, .is-selected:hover, .is-selected:focus .is-selected.is-focus`.                         |
| (None) | `--selected--disabled` | `example--selected--disabled`    | Styles in `:checked:disabled :checked.is-disabled, .is-selected:disabled .is-selected.is-disabled`.                                                 |
| `sm:`  | `--selected`           | `sm:example--selected`           | Styles in `:checked, .is-selected` if viewport is `"sm"`.                                                                                           |
| `sm:`  | `--selected--focus`    | `sm:example--selected--focus`    | Styles in `:checked:hover, :checked:focus, :checked.is-focus, .is-selected:hover, .is-selected:focus, .is-selected.is-focus` if viewport is `"sm"`. |
| `sm:`  | `--selected--disabled` | `sm:example--selected--disabled` | Styles in `:checked:disabled, :checked.is-disabled, .is-selected:disabled, .is-selected.is-disabled` if viewport is `"sm"`.                         |

## License

MIT
