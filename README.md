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

## Test

```sh
$ yarn test
```

## License

MIT
