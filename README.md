# @hidoo/unit

> Sass based css framework.

## Installation

```sh
$ npm install @hidoo/unit
```

## Usage

```scss
@import "node_modules/@hidoo/unit/src/index.scss";
```

### Import with [node-sass-magic-importer](https://github.com/maoberlehner/node-sass-magic-importer)

```scss
@import "~@hidoo/unit";
```

### Usage with custom settings

```scss
// import variables in advance
@import "settings";

// import this package
@import "node_modules/@hidoo/unit/src/index.scss";
```

### Usage only the required units

```scss
// import dependent files
@import "node_modules/@hidoo/unit/src/settings";
@import "node_modules/@hidoo/unit/src/lib";

// import all of text unit
@import "node_modules/@hidoo/unit/src/unit/text";

// import part of button unit
@import "node_modules/@hidoo/unit/src/unit/button/core";
@import "node_modules/@hidoo/unit/src/unit/button/inline";
```

### Hook mixins

You can use some hook mixins that called if defined.  
See [example](./example/src/scss/main.scss).

| Name                              | Called timing                 |
| :-------------------------------- | :---------------------------- |
| `@mixin hook-pre-import-lib`      | Before `@import "lib";`.      |
| `@mixin hook-pre-import-unit`     | Before `@import "unit";`.     |
| `@mixin hook-pre-import-util`     | Before `@import "util";`.     |
| `@mixin hook-pre-import-override` | Before `@import "override";`. |

## API

<a id="default-settings-variable-unit-prefix"></a>

### $unit-prefix

prefix of class name of components
(default: `"unit"`)

+ **Group:** Default settings
+ **Access:** public

#### Type

**[String](https://sass-lang.com/documentation/values/strings)**

#### Examples

scss inputs

```scss
$unit-prefix: "u";
```

css outputs

```css
.u-icon {
  /* settings */
}
```

<a id="default-settings-variable-unit-util-prefix"></a>

### $unit-util-prefix

prefix of class name of util
(default: `"util"`)

+ **Group:** Default settings
+ **Access:** public

#### Type

**[String](https://sass-lang.com/documentation/values/strings)**

#### Examples

scss inputs

```scss
$unit-util-prefix: "h";
```

css outputs

```css
.h--width-0 {
  /* settings */
}
```

<a id="default-settings-variable-unit-breakpoints"></a>

### $unit-breakpoints

settings of breakpoints

+ **Group:** Default settings
+ **Access:** public

#### Type

**[Map](https://sass-lang.com/documentation/values/maps)**

#### Properties

| Name      | Type                                                             | Description            | Default  |
| :-------- | :--------------------------------------------------------------- | :--------------------- | :------- |
| `desktop` | **[Number](https://sass-lang.com/documentation/values/numbers)** | breakpoint for desktop | `1024px` |
| `mobile`  | **[Number](https://sass-lang.com/documentation/values/numbers)** | breakpoint for desktop | `667px`  |

#### Dependents

+ **@mixin define-breakpoint** define breakepoint

<a id="default-settings-variable-unit-state-selectors-focus"></a>

### $unit-state-selectors-focus

settings of selector.
for expressing of state like `:hover` or `:focus`.
(default: `(".is-focus")`)

+ **Group:** Default settings
+ **Access:** public

#### Type

**[List](https://sass-lang.com/documentation/values/lists)**

<a id="default-settings-variable-unit-state-selectors-selected"></a>

### $unit-state-selectors-selected

settings of selector
for expressing of state like `:checked`.
(default: `(".is-selected")`)

+ **Group:** Default settings
+ **Access:** public

#### Type

**[List](https://sass-lang.com/documentation/values/lists)**

<a id="default-settings-variable-unit-state-selectors-disabled"></a>

### $unit-state-selectors-disabled

settings of selector.
for expressing of state like `:disabled`.
(default: `(".is-disabled")`)

+ **Group:** Default settings
+ **Access:** public

#### Type

**[List](https://sass-lang.com/documentation/values/lists)**

<a id="default-settings-variable-unit-state-selectors-current"></a>

### $unit-state-selectors-current

settings of selector.
for expressing of state like `".is-current"`
(default: `(".is-current")`)

+ **Group:** Default settings
+ **Access:** public

#### Type

**[List](https://sass-lang.com/documentation/values/lists)**

<a id="default-settings-variable-unit-link-color"></a>

### $unit-link-color

default link color

+ **Group:** Default settings
+ **Access:** public

#### Type

**[Map](https://sass-lang.com/documentation/values/maps)**

#### Properties

| Name    | Type                                                           | Description       | Default                 |
| :------ | :------------------------------------------------------------- | :---------------- | :---------------------- |
| `link`  | **[Color](https://sass-lang.com/documentation/values/colors)** | color of `:link`  | `#37a5e4`               |
| `focus` | **[Color](https://sass-lang.com/documentation/values/colors)** | color of `:focus` | `lighten(#37a5e4, 15%)` |

<a id="default-settings-variable-unit-font-enable-override"></a>

### $unit-font-enable-override

enable override font settings or not.
(default: `true`)

+ **Group:** Default settings
+ **Access:** public

#### Type

**[Boolean](https://sass-lang.com/documentation/values/booleans)**

#### Dependents

+ **@mixin use-font-family** use settings of `font-family`

<a id="default-settings-variable-unit-font-family"></a>

### $unit-font-family

default font family.

**default**

+ `-apple-system` ... use "San Francisco" as primary font in mac
+ `BlinkMacSystemFont` ... use "San Francisco" as primary in chrome on mac
+ `Helvetica` ... secondary font in mac
+ `Arial` ... secondary font in windows
+ `Hiragino Kaku Gothic ProN` ... primary japanese font in mac
+ `Yu Gothic Medium` ... primary japanese font in windows
+ `游ゴシック Medium` ... primary japanese font in ie on windows
+ `YuGothic` ... secondary japanese font in mac
+ `Meiryo` ... secondary japanese font in windows
+ `メイリオ` ... secondary japanese font in ie on windows

this use if `$unit-font-enable-override` is `true`

+ **Group:** Default settings
+ **Access:** public

#### Type

**[List](https://sass-lang.com/documentation/values/lists)**

#### Dependents

+ **@mixin use-font-family** use settings of `font-family`

<a id="default-settings-variable-unit-font-family-monospace"></a>

### $unit-font-family-monospace

default monospace font family.

**default**

+ `Consolas` ... primary font in windows (use it as primary if installed in mac)
+ `Monaco` ... primary font in mac
+ `Menlo` ... secondary font in mac
+ `Courier` ... secondary font in windows

this use if `$unit-font-enable-override` is `true`

+ **Group:** Default settings
+ **Access:** public

#### Type

**[List](https://sass-lang.com/documentation/values/lists)**

#### Dependents

+ **@mixin use-font-family** use settings of `font-family`

<a id="default-settings-variable-unit-font-enable-advanced-settings"></a>

### $unit-font-enable-advanced-settings

enable advanced font settings.
(default: `true`)

**features**

+ `font-feature-settings: "palt";` ... disable when browser is ie 10-11

this use if `$unit-font-enable-override` is `true`

+ **Group:** Default settings
+ **Access:** public

#### Type

**[Boolean](https://sass-lang.com/documentation/values/booleans)**

<a id="default-settings-variable-unit-font-enable-relative-size"></a>

### $unit-font-enable-relative-size

enable relative font-size specify.
override base size settings of font
(default: `true`)

+ **Group:** Default settings
+ **Access:** public

#### Type

**[Boolean](https://sass-lang.com/documentation/values/booleans)**

#### Dependents

+ **@mixin use-font-size** use settings of font-size

<a id="default-settings-variable-unit-font-base-size"></a>

### $unit-font-base-size

default base font size.
(default: `16px`)
this use if `$unit-font-enable-relative-size` is `true`

+ **Group:** Default settings
+ **Access:** public

#### Type

**[Number](https://sass-lang.com/documentation/values/numbers)**

#### Dependents

+ **@function px-to-rem** convert px to rem

<a id="default-settings-variable-unit-font-size"></a>

### $unit-font-size

default font size
(default: `14px`)

+ **Group:** Default settings
+ **Access:** public

#### Type

**[Number](https://sass-lang.com/documentation/values/numbers)**

#### Dependents

+ **@mixin use-font-size** use settings of font-size

<a id="default-settings-variable-unit-letter-spacing"></a>

### $unit-letter-spacing

default letter-spacing
(default: `0.04em`)

+ **Group:** Default settings
+ **Access:** public

#### Type

**[Number](https://sass-lang.com/documentation/values/numbers)**

#### Dependents

+ **@mixin use-text-base** use settings of initialized text

<a id="default-settings-variable-unit-line-height"></a>

### $unit-line-height

default line-height
(default: `1.5`)

+ **Group:** Default settings
+ **Access:** public

#### Type

**[Number](https://sass-lang.com/documentation/values/numbers)**

#### Dependents

+ **@mixin use-text-base** use settings of initialized text

<a id="default-settings-variable-unit-builtin-themes"></a>

### $unit-builtin-themes

default builtin theme

+ **Group:** Default settings
+ **Access:** public

#### Type

**[Map](https://sass-lang.com/documentation/values/maps)**

#### Properties

| Name    | Type                                                       | Description           | Default |
| :------ | :--------------------------------------------------------- | :-------------------- | :------ |
| `light` | **[Map](https://sass-lang.com/documentation/values/maps)** | values of light theme | `(...)` |
| `dark`  | **[Map](https://sass-lang.com/documentation/values/maps)** | values of dark theme  | `(...)` |

<a id="features-variable-_unit-defineded-placeholders"></a>

### $\_unit-defineded-placeholders

defineded placeholders.

+ **Group:** Features
+ **Access:** private

#### Type

**[List](https://sass-lang.com/documentation/values/lists)**

<a id="features-function-merge-state-selectors"></a>

### @function merge-state-selectors

return merged state selectors

+ **Group:** Features
+ **Access:** public

#### Parameters

| Name                    | Type                                                             | Description                                                                           | Default  |
| :---------------------- | :--------------------------------------------------------------- | :------------------------------------------------------------------------------------ | :------- |
| `$type`                 | **[String](https://sass-lang.com/documentation/values/strings)** | type of state (one of `"link"`, `"focus"`, `"selected"`, `"disabled"` or `"current"`) | `"link"` |
| `$additional-selectors` | **[List](https://sass-lang.com/documentation/values/lists)**     | additional selectors                                                                  | `()`     |

#### Returns

**[List](https://sass-lang.com/documentation/values/lists)**

#### Examples

scss inputs

```scss
$merged-focus-selectors: merge-state-selectors("link"); // -> (":link", ":visited")
```

#### Dependents

+ **@mixin on-current** wrappper of `.is-current`
+ **@mixin on-disabled** wrappper of `:disabled`
+ **@mixin on-focus** wrappper of `:hover` and `:focus`
+ **@mixin on-link** wrappper of `:link` and `:visited`

<a id="features-function-px-to-rem"></a>

### @function px-to-rem

convert px to rem

+ **Group:** Features
+ **Access:** public

#### Parameters

| Name         | Type                                                             | Description    | Default                |
| :----------- | :--------------------------------------------------------------- | :------------- | :--------------------- |
| `$size`      | **[Number](https://sass-lang.com/documentation/values/numbers)** | font size      | -                      |
| `$base-size` | **[Number](https://sass-lang.com/documentation/values/numbers)** | base font size | `$unit-font-base-size` |

#### Returns

**[Number](https://sass-lang.com/documentation/values/numbers)** rem value

#### Examples

scss inputs

```scss
.selector {
  font-size: px-to-rem(14px, 16px);
}
```

css outputs

```css
.selector {
  font-size: 0.875rem;
}
```

#### Dependencies

+ **[$unit-font-base-size](#default-settings-variable-unit-font-base-size)**

#### Dependents

+ **@mixin use-font-size** use settings of font-size

<a id="features-function-ununit"></a>

### @function ununit

return number without unit

+ **Group:** Features
+ **Access:** public

#### Parameters

| Name      | Type                                                             | Description      | Default |
| :-------- | :--------------------------------------------------------------- | :--------------- | :------ |
| `$number` | **[Number](https://sass-lang.com/documentation/values/numbers)** | number with unit | -       |

#### Returns

**[Number](https://sass-lang.com/documentation/values/numbers)** number without unit

#### Examples

scss inputs

```scss
$pure-number: ununit(14px); // -> 14
```

#### Dependents

+ **@mixin define-sizes-in-direction-groups** define sizes in direction groups
+ **@mixin define-sizes-in-directions** define sizes in directions
+ **@mixin define-sizes** define sizes

<a id="features-mixin-define-breakpoint"></a>

### @mixin define-breakpoint

define breakepoint

+ **Group:** Features
+ **Access:** public

#### Parameters

| Name             | Type                                                                                                                                                                                            | Description                  | Default |
| :--------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------- | :------ |
| `$from`          | **[Number](https://sass-lang.com/documentation/values/numbers)**, **[String](https://sass-lang.com/documentation/values/strings)**, **[Null](https://sass-lang.com/documentation/values/null)** | starting point of breakpoint | `null`  |
| `$until`         | **[Number](https://sass-lang.com/documentation/values/numbers)**, **[String](https://sass-lang.com/documentation/values/strings)**, **[Null](https://sass-lang.com/documentation/values/null)** | ending point of breakpoint   | `null`  |
| `$options`       | **[Map](https://sass-lang.com/documentation/values/maps)**                                                                                                                                      | options                      | `()`    |
| `$options.media` | **[String](https://sass-lang.com/documentation/values/strings)**                                                                                                                                | custom media name            | -       |

#### Examples

scss inputs

```scss
.selector {
  @include define-breakpoint($from: "mobile", $until: "desktop") {
    font-size: 16px;
  }
}
```

css outputs

```css
@media only screen and (min-width: 667px) and (max-width: 1023px) {
  .selector {
    font-size: 16px;
  }
}
```

#### Dependencies

+ **[$unit-breakpoints](#default-settings-variable-unit-breakpoints)**

<a id="features-mixin-define-placeholder"></a>

### @mixin define-placeholder

define placeholder class.

+ **Group:** Features
+ **Access:** public

#### Parameters

| Name    | Type                                                             | Description               | Default |
| :------ | :--------------------------------------------------------------- | :------------------------ | :------ |
| `$name` | **[String](https://sass-lang.com/documentation/values/strings)** | name of placeholder class | -       |

#### Examples

scss inputs

```scss
.selector {
  $name: unique-id();

  @include define-placeholder($name: $name) {
    font-size: 16px;
  }

  &__child-1 {
    @extend %#{$name};
  }

  &__child-2 {
    @extend %#{$name};
  }
}
```

css outputs

```css
.selector__child-1, .selector__child-2 {
   font-size: 16px;
}
```

#### Dependents

+ **@mixin on** wrappper of pseudo class like `:hover`

<a id="features-mixin-define-sizes-in-direction-groups"></a>

### @mixin define-sizes-in-direction-groups

define sizes in direction groups

+ **Group:** Features
+ **Access:** public

#### Parameters

| Name      | Type                                                             | Description                                                                  | Default    |
| :-------- | :--------------------------------------------------------------- | :--------------------------------------------------------------------------- | :--------- |
| `$type`   | **[String](https://sass-lang.com/documentation/values/strings)** | type of options (one of `"margin"`, `"padding"`, `"position"` or `"border"`) | `"margin"` |
| `$values` | **[List](https://sass-lang.com/documentation/values/lists)**     | list of value                                                                | `()`       |

#### Examples

scss inputs

```scss
.selector {
  @include define-sizes-in-direction-groups($type: "margin", $values: (5px, -5px))
}
```

css outputs

```css
.selector-vertical-5 {
  margin-top: 5px !important;
  margin-bottom: 5px !important;
}
.selector-vertical-5- {
  margin-top: -5em !important;
  margin-bottom: -5em !important;
}
.selector-horizontal-5 {
  margin-right: 5px !important;
  margin-left: 5px !important;
}
.selector-horizontal-5- {
  margin-right: -5em !important;
  margin-left: -5em !important;
}
.selector-all-5 {
  margin-top: 5px !important;
  margin-right: 5px !important;
  margin-bottom: 5px !important;
  margin-left: 5px !important;
}
.selector-all-5- {
  margin-top: -5em !important;
  margin-right: -5em !important;
  margin-bottom: -5em !important;
  margin-left: -5em !important;
}
```

#### Dependencies

+ **[@function ununit](#features-function-ununit)**

<a id="features-mixin-define-sizes-in-directions"></a>

### @mixin define-sizes-in-directions

define sizes in directions

+ **Group:** Features
+ **Access:** public

#### Parameters

| Name      | Type                                                             | Description                                                                  | Default    |
| :-------- | :--------------------------------------------------------------- | :--------------------------------------------------------------------------- | :--------- |
| `$type`   | **[String](https://sass-lang.com/documentation/values/strings)** | type of options (one of `"margin"`, `"padding"`, `"position"` or `"border"`) | `"margin"` |
| `$values` | **[List](https://sass-lang.com/documentation/values/lists)**     | list of value                                                                | `()`       |

#### Examples

scss inputs

```scss
.selector {
  @include define-sizes-in-directions($type: "margin", $values: (5px, -5px))
}
```

css outputs

```css
.selector-top-5 {
  margin-top: 5px !important;
}
.selector-top-5- {
  margin-top: -5px !important;
}
.selector-right-5 {
  margin-right: 5px !important;
}
.selector-right-5- {
  margin-right: -5px !important;
}
.selector-bottom-5 {
  margin-bottom: 5px !important;
}
.selector-bottom-5- {
  margin-bottom: -5px !important;
}
.selector-left-5 {
  margin-left: 5px !important;
}
.selector-left-5- {
  margin-left: -5px !important;
}
```

#### Dependencies

+ **[@function ununit](#features-function-ununit)**

<a id="features-mixin-define-sizes"></a>

### @mixin define-sizes

define sizes

+ **Group:** Features
+ **Access:** public

#### Parameters

| Name      | Type                                                             | Description                                                   | Default   |
| :-------- | :--------------------------------------------------------------- | :------------------------------------------------------------ | :-------- |
| `$type`   | **[String](https://sass-lang.com/documentation/values/strings)** | type of options (one of `"width"`, `"height"` or `"z-index"`) | `"width"` |
| `$values` | **[List](https://sass-lang.com/documentation/values/lists)**     | list of value                                                 | `()`      |

#### Examples

scss inputs

```scss
.selector {
  @include define-sizes($type: "width", $values: (10px))
}
```

css outputs

```css
.selector-10 {
  width: 10px !important;
}
.selector-min-10 {
  min-width: 10px !important;
}
.selector-max-10 {
  max-width: 10px !important;
}
```

#### Dependencies

+ **[@function ununit](#features-function-ununit)**

<a id="features-mixin-on-current"></a>

### @mixin on-current

wrappper of `.is-current`

+ **Group:** Features
+ **Access:** public

#### Parameters

| Name                    | Type                                                         | Description                  | Default |
| :---------------------- | :----------------------------------------------------------- | :--------------------------- | :------ |
| `$additional-selectors` | **[List](https://sass-lang.com/documentation/values/lists)** | list of additional selectors | `()`    |
| `$capturing-selectors`  | **[List](https://sass-lang.com/documentation/values/lists)** | capturing parent selectors   | `()`    |

#### Examples

scss inputs

```scss
.selector {
  @include on-current() {
    font-size: 16px;
  }
}
```

css outputs

```css
.selector.is-current {
  font-size: 16px;
}
```

#### Dependencies

+ **[@function merge-state-selectors](#features-function-merge-state-selectors)**
+ **[@mixin on](#features-mixin-on)**

<a id="features-mixin-on-disabled"></a>

### @mixin on-disabled

wrappper of `:disabled`

+ **Group:** Features
+ **Access:** public

#### Parameters

| Name                    | Type                                                         | Description                  | Default |
| :---------------------- | :----------------------------------------------------------- | :--------------------------- | :------ |
| `$additional-selectors` | **[List](https://sass-lang.com/documentation/values/lists)** | list of additional selectors | `()`    |
| `$capturing-selectors`  | **[List](https://sass-lang.com/documentation/values/lists)** | capturing parent selectors   | `()`    |

#### Examples

scss inputs

```scss
.selector {
  @include on-disabled() {
    font-size: 16px;
  }
}
```

css outputs

```css
.selector:disabled, .selector.is-disabled {
  font-size: 16px;
}
```

#### Dependencies

+ **[@function merge-state-selectors](#features-function-merge-state-selectors)**
+ **[@mixin on](#features-mixin-on)**

<a id="features-mixin-on-focus"></a>

### @mixin on-focus

wrappper of `:hover` and `:focus`

+ **Group:** Features
+ **Access:** public

#### Parameters

| Name                    | Type                                                         | Description                  | Default |
| :---------------------- | :----------------------------------------------------------- | :--------------------------- | :------ |
| `$additional-selectors` | **[List](https://sass-lang.com/documentation/values/lists)** | list of additional selectors | `()`    |
| `$capturing-selectors`  | **[List](https://sass-lang.com/documentation/values/lists)** | capturing parent selectors   | `()`    |

#### Examples

scss inputs

```scss
.selector {
  @include on-focus() {
    font-size: 16px;
  }
}
```

css outputs

```css
.selector:hover, .selector:focus, .selector.is-focus {
  font-size: 16px;
}
```

#### Dependencies

+ **[@function merge-state-selectors](#features-function-merge-state-selectors)**
+ **[@mixin on](#features-mixin-on)**

<a id="features-mixin-on-link"></a>

### @mixin on-link

wrappper of `:link` and `:visited`

+ **Group:** Features
+ **Access:** public

#### Parameters

| Name                    | Type                                                         | Description                  | Default |
| :---------------------- | :----------------------------------------------------------- | :--------------------------- | :------ |
| `$additional-selectors` | **[List](https://sass-lang.com/documentation/values/lists)** | list of additional selectors | `()`    |
| `$capturing-selectors`  | **[List](https://sass-lang.com/documentation/values/lists)** | capturing parent selectors   | `()`    |

#### Examples

scss inputs

```scss
.selector {
  @include on-link() {
    font-size: 16px;
  }
}
```

css outputs

```css
.selector:link, .selector:visited {
  font-size: 16px;
}
```

#### Dependencies

+ **[@function merge-state-selectors](#features-function-merge-state-selectors)**
+ **[@mixin on](#features-mixin-on)**

<a id="features-mixin-on-placeholder"></a>

### @mixin on-placeholder

wrappper of `:placeholder-shown`

+ **Group:** Features
+ **Access:** public

#### Examples

scss inputs

```scss
.selector {
  @include on-placeholder() {
    font-size: 16px;
  }
}
```

css outputs

```css
.selector::-webkit-input-placeholder {
  font-size: 16px;
}
.selector::-moz-placeholder {
  font-size: 16px;
}
.selector:-ms-input-placeholder {
  font-size: 16px;
}
.selector:placeholder-shown {
  font-size: 16px;
}
```

<a id="features-mixin-on"></a>

### @mixin on

wrappper of pseudo class like `:hover`

+ **Group:** Features
+ **Access:** public

#### Parameters

| Name                   | Type                                                         | Description                | Default |
| :--------------------- | :----------------------------------------------------------- | :------------------------- | :------ |
| `$selectors`           | **[List](https://sass-lang.com/documentation/values/lists)** | list of selectors          | `()`    |
| `$capturing-selectors` | **[List](https://sass-lang.com/documentation/values/lists)** | capturing parent selectors | `()`    |

#### Examples

scss inputs

```scss
.selector {
  @include on((":hover", ":focus")) {
    font-size: 16px;
  }
}
```

css outputs

```scss
.selector:hover,
.selector:focus {
  font-size: 16px;
}
```

#### Dependencies

+ **[@mixin define-placeholder](#features-mixin-define-placeholder)**

#### Dependents

+ **@mixin on-current** wrappper of `.is-current`
+ **@mixin on-disabled** wrappper of `:disabled`
+ **@mixin on-focus** wrappper of `:hover` and `:focus`
+ **@mixin on-link** wrappper of `:link` and `:visited`

<a id="features-mixin-use-box-aspect-ratio"></a>

### @mixin use-box-aspect-ratio

use settings of aspect ratio box

+ **Group:** Features
+ **Access:** public

#### Parameters

| Name      | Type                                                             | Description | Default |
| :-------- | :--------------------------------------------------------------- | :---------- | :------ |
| `$width`  | **[Number](https://sass-lang.com/documentation/values/numbers)** | width       | `16`    |
| `$height` | **[Number](https://sass-lang.com/documentation/values/numbers)** | height      | `9`     |

#### Examples

scss inputs

```scss
.selector {
  @include use-box-aspect-ratio($width: 16, $height: 9);
}
```

css outputs

```css
.selector::before {
  content: "";
  display: block;
  width: 100%;
  height: 0;
  padding-top: 56.25%;
}
```

<a id="features-mixin-use-box-base"></a>

### @mixin use-box-base

use settings of initialized box

+ **Group:** Features
+ **Access:** public

#### Parameters

| Name          | Type                                                                                                                           | Description              | Default         |
| :------------ | :----------------------------------------------------------------------------------------------------------------------------- | :----------------------- | :-------------- |
| `$display`    | **[String](https://sass-lang.com/documentation/values/strings)**                                                               | setting for `display`    | `"block"`       |
| `$overflow`   | **[String](https://sass-lang.com/documentation/values/strings)**                                                               | setting for `overflow`   | `null`          |
| `$box-sizing` | **[String](https://sass-lang.com/documentation/values/strings)**                                                               | setting for `box-sizing` | `"content-box"` |
| `$position`   | **[String](https://sass-lang.com/documentation/values/strings)**                                                               | setting for `position`   | `"relative"`    |
| `$list-style` | **[String](https://sass-lang.com/documentation/values/strings)**                                                               | setting for `list-style` | `0`             |
| `$margin`     | **[Number](https://sass-lang.com/documentation/values/numbers)**, **[List](https://sass-lang.com/documentation/values/lists)** | setting for `margin`     | `0`             |
| `$padding`    | **[Number](https://sass-lang.com/documentation/values/numbers)**, **[List](https://sass-lang.com/documentation/values/lists)** | setting for `padding`    | `0`             |
| `$border`     | **[Number](https://sass-lang.com/documentation/values/numbers)**, **[List](https://sass-lang.com/documentation/values/lists)** | setting for `border`     | `0`             |

#### Examples

scss inputs

```scss
.selector {
  @include use-box-base();
}
```

css outputs

```css
.selector {
  display: block;
  box-sizing: content-box;
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
  border: 0;
}
```

<a id="features-mixin-use-clearfix"></a>

### @mixin use-clearfix

use clearfix

+ **Group:** Features
+ **Access:** public

#### Examples

scss inputs

```scss
.selector {
  @include use-clearfix();
}
```

css outputs

```css
.selector::before, .selector::after {
  content: "";
  display: table;
}
.selector::after {
  clear: both;
}
```

<a id="features-mixin-use-font-advanced-settings"></a>

### @mixin use-font-advanced-settings

use advanced settings of font

+ **Group:** Features
+ **Access:** public

#### Parameters

| Name                | Type                                                             | Description                         | Default  |
| :------------------ | :--------------------------------------------------------------- | :---------------------------------- | :------- |
| `$feature-settings` | **[String](https://sass-lang.com/documentation/values/strings)** | setting for `font-feature-settings` | `"palt"` |

#### Examples

scss inputs

```scss
.selector {
  @include use-font-advanced-settings();
}
```

css outputs

```css
.selector {
  font-feature-settings: "palt";
  -ms-font-feature-settings: normal;
}
```

<a id="features-mixin-use-font-base"></a>

### @mixin use-font-base

use settings of initialized font

+ **Group:** Features
+ **Access:** public

#### Parameters

| Name      | Type                                                                                                                               | Description               | Default    |
| :-------- | :--------------------------------------------------------------------------------------------------------------------------------- | :------------------------ | :--------- |
| `$style`  | **[String](https://sass-lang.com/documentation/values/strings)**                                                                   | setting for `font-style`  | `"normal"` |
| `$weight` | **[String](https://sass-lang.com/documentation/values/strings)**, **[Number](https://sass-lang.com/documentation/values/numbers)** | setting for `font-weight` | `"normal"` |

#### Examples

scss inputs

```scss
.selector {
  @include use-font-base();
}
```

css outputs

```css
.selector {
  font-style: normal;
  font-weight: normal;
}
```

<a id="features-mixin-use-font-family"></a>

### @mixin use-font-family

use settings of `font-family`

+ **Group:** Features
+ **Access:** public

#### Parameters

| Name         | Type                                                                                                                           | Description                                                              | Default |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------- | :------ |
| `$value`     | **[List](https://sass-lang.com/documentation/values/lists)**, **[String](https://sass-lang.com/documentation/values/strings)** | setting for `font-family` (one of `"default"`, `"monospace"` or `(...)`) | `null`  |
| `$important` | **[Boolean](https://sass-lang.com/documentation/values/booleans)**                                                             | set `!important` or not                                                  | `false` |

#### Examples

scss inputs

```scss
.selector {
  @include use-font-family($value: "default", $important: true);
}
```

css outputs

```css
.selector {
  font-family: -apple-system, BlinkMacSystemFont, Helvetica, Arial, "Hiragino Kaku Gothic ProN", "Yu Gothic Medium", "游ゴシック Medium", YuGothic, Meiryo, "メイリオ", sans-serif !important;
}
```

#### Dependencies

+ **[$unit-font-enable-override](#default-settings-variable-unit-font-enable-override)**
+ **[$unit-font-family](#default-settings-variable-unit-font-family)**
+ **[$unit-font-family-monospace](#default-settings-variable-unit-font-family-monospace)**

<a id="features-mixin-use-font-size"></a>

### @mixin use-font-size

use settings of font-size

+ **Group:** Features
+ **Access:** public

#### Parameters

| Name         | Type                                                                                                                               | Description                                                                                                                           | Default |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ | :------ |
| `$value`     | **[String](https://sass-lang.com/documentation/values/strings)**, **[Number](https://sass-lang.com/documentation/values/numbers)** | value of font-size (one of `"xsmall"`, `"small"`, `"medium"`, `"large"`, `"xlarge"`, `"2xlarge"`, `"3xlarge"`, `"4xlarge"` or number) | -       |
| `$monospace` | **[Boolean](https://sass-lang.com/documentation/values/booleans)**                                                                 | font-family is monospace or not                                                                                                       | `false` |
| `$important` | **[Boolean](https://sass-lang.com/documentation/values/booleans)**                                                                 | set !important or not                                                                                                                 | `false` |

#### Examples

scss inputs

```scss
.selector {
  @include use-font-size($value: "medium", $important: true);
}
```

css outputs

```css
.selector {
  font-size: 14px !important;
  font-size: 0.875rem !important;
}
```

#### Dependencies

+ **[$unit-font-size](#default-settings-variable-unit-font-size)**
+ **[$unit-font-enable-relative-size](#default-settings-variable-unit-font-enable-relative-size)**
+ **[@function px-to-rem](#features-function-px-to-rem)**

<a id="features-mixin-use-table-base"></a>

### @mixin use-table-base

use settings of initialized table

+ **Group:** Features
+ **Access:** public

#### Parameters

| Name            | Type                                                                                                                               | Description                | Default   |
| :-------------- | :--------------------------------------------------------------------------------------------------------------------------------- | :------------------------- | :-------- |
| `$width`        | **[Number](https://sass-lang.com/documentation/values/numbers)**, **[String](https://sass-lang.com/documentation/values/strings)** | setting for `width`        | `"auto"`  |
| `$margin`       | **[Number](https://sass-lang.com/documentation/values/numbers)**, **[List](https://sass-lang.com/documentation/values/lists)**     | setting for `margin`       | `0`       |
| `$padding`      | **[Number](https://sass-lang.com/documentation/values/numbers)**, **[List](https://sass-lang.com/documentation/values/lists)**     | setting for `padding`      | `0`       |
| `$border-style` | **[String](https://sass-lang.com/documentation/values/strings)**                                                                   | setting for `border-style` | `"solid"` |
| `$border-width` | **[Number](https://sass-lang.com/documentation/values/numbers)**                                                                   | setting for `border-width` | `1px`     |

#### Examples

scss inputs

```scss
.selector {
  @include use-table-base();
}
```

css outputs

```css
.selector {
  display: table;
  width: auto;
  margin: 0;
  padding: 0;
  border-collapse: collapse;
  border-style: solid;
  border-width: 1px;
}
```

<a id="features-mixin-use-table-column-base"></a>

### @mixin use-table-column-base

use settings of initialized table column

+ **Group:** Features
+ **Access:** public

#### Parameters

| Name            | Type                                                                                                                           | Description                | Default   |
| :-------------- | :----------------------------------------------------------------------------------------------------------------------------- | :------------------------- | :-------- |
| `$margin`       | **[Number](https://sass-lang.com/documentation/values/numbers)**, **[List](https://sass-lang.com/documentation/values/lists)** | setting for `margin`       | `0`       |
| `$padding`      | **[Number](https://sass-lang.com/documentation/values/numbers)**, **[List](https://sass-lang.com/documentation/values/lists)** | setting for `padding`      | `0`       |
| `$border-style` | **[String](https://sass-lang.com/documentation/values/strings)**                                                               | setting for `border-style` | `"solid"` |
| `$border-width` | **[Number](https://sass-lang.com/documentation/values/numbers)**                                                               | setting for `border-width` | `1px`     |

#### Examples

scss inputs

```scss
.selector {
  @include use-table-column-base();
}
```

css outputs

```css
.selector {
  display: table-cell;
  margin: 0;
  padding: 0;
  vertical-align: middle;
  border-style: solid;
  border-width: 1px;
}
```

<a id="features-mixin-use-text-base"></a>

### @mixin use-text-base

use settings of initialized text

+ **Group:** Features
+ **Access:** public

#### Parameters

| Name               | Type                                                                                                                               | Description                   | Default                |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------- | :---------------------------- | :--------------------- |
| `$letter-spacing`  | **[Number](https://sass-lang.com/documentation/values/numbers)**                                                                   | setting for `letter-spacing`  | `$unit-letter-spacing` |
| `$line-height`     | **[Number](https://sass-lang.com/documentation/values/numbers)**, **[String](https://sass-lang.com/documentation/values/strings)** | setting for `line-height`     | `$unit-line-height`    |
| `$text-align`      | **[String](https://sass-lang.com/documentation/values/strings)**                                                                   | setting for `text-align`      | `"left"`               |
| `$text-decoration` | **[String](https://sass-lang.com/documentation/values/strings)**                                                                   | setting for `text-decoration` | `"none"`               |
| `$text-indent`     | **[Number](https://sass-lang.com/documentation/values/numbers)**                                                                   | setting for `text-indent`     | `0`                    |
| `$white-space`     | **[String](https://sass-lang.com/documentation/values/strings)**                                                                   | setting for `white-space`     | `"normal"`             |
| `$word-wrap`       | **[String](https://sass-lang.com/documentation/values/strings)**                                                                   | setting for `word-wrap`       | `"break-word"`         |

#### Examples

scss inputs

```scss
.selector {
  @include use-text-base();
}
```

css outputs

```css
.selector {
  letter-spacing: 0.04em;
  line-height: 1.5;
  text-align: left;
  text-decoration: none;
  text-indent: 0;
  white-space: normal;
  word-wrap: break-word;
}
```

#### Dependencies

+ **[$unit-letter-spacing](#default-settings-variable-unit-letter-spacing)**
+ **[$unit-line-height](#default-settings-variable-unit-line-height)**

## Test

```sh
$ yarn test
```

## License

MIT
