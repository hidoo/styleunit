# [1.0.0-alpha.6](https://github.com/hidoo/styleunit/compare/v1.0.0-alpha.5...v1.0.0-alpha.6) (2025-05-29)


### Features

* **plugin:** export some functions and mixins in plugin/spritesheet ([6c45cdd](https://github.com/hidoo/styleunit/commit/6c45cddb8dc767c35767a3adffff1fb99df187fe))



# [1.0.0-alpha.5](https://github.com/hidoo/styleunit/compare/v1.0.0-alpha.4...v1.0.0-alpha.5) (2025-05-27)


### Bug Fixes

* **settings:** fix light value in the font weight presets ([0ede5d3](https://github.com/hidoo/styleunit/commit/0ede5d3d17c3bd2bcbc8e1406f785267328ba280))


### Features

* **mixin:** update mixin by-breakpoints to support selectors other than class selector ([2c7a2ec](https://github.com/hidoo/styleunit/commit/2c7a2ec1c051bd807815b0f1089099533e0febf3))



# [1.0.0-alpha.4](https://github.com/hidoo/styleunit/compare/v1.0.0-alpha.3...v1.0.0-alpha.4) (2025-05-23)


### Bug Fixes

* change breakpont modifiers to build by [@mixin](https://github.com/mixin) by-breakpoints ([ff42d49](https://github.com/hidoo/styleunit/commit/ff42d492054b77f2c1defbf8adbc2e292144b8c7))
* **unit:** set weight module of text unit to be deprecated ([fd8a723](https://github.com/hidoo/styleunit/commit/fd8a723986f9afaf46475e86d70ec9af3dedefb2))


### Features

* **mixin:** add [@mixin](https://github.com/mixin) by-breakpoints ([13c3660](https://github.com/hidoo/styleunit/commit/13c36607114c1345fa070be8255140570e366d61))
* **mixin:** add breakpoints option to [@mixin](https://github.com/mixin) media ([4de3df3](https://github.com/hidoo/styleunit/commit/4de3df32b69ca388972407d23944ccadc1ea73c8))



# [1.0.0-alpha.3](https://github.com/hidoo/styleunit/compare/v1.0.0-alpha.2...v1.0.0-alpha.3) (2025-05-16)


### Bug Fixes

* **bootstrap:** change to not export query type breakpoints as custom properties ([9546e49](https://github.com/hidoo/styleunit/commit/9546e4944c7d6628a4946c2b3ba2caf62e3c971e))
* **settings:** change default settings.$pkg value to "su" ([588c040](https://github.com/hidoo/styleunit/commit/588c040b96b0fe015b1abe06a1d4b6e8487df7d3))


### Features

* **settings:** update default font family and export font family presets as custom properties ([ea09bcd](https://github.com/hidoo/styleunit/commit/ea09bcd50635da4c7ffb1bdb3d508ef0abb2ed87))
* **settings:** update font size presets ([2810645](https://github.com/hidoo/styleunit/commit/281064509dedd4d4ecc76967ffeb9006d3dd36a8))



# [1.0.0-alpha.2](https://github.com/hidoo/styleunit/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2025-05-15)


### Bug Fixes

* **util:** fix font-size class name on breakpoints ([2dd553d](https://github.com/hidoo/styleunit/commit/2dd553dac198c27b5d9db116429da3a9f78112b7))



# [1.0.0-alpha.1](https://github.com/hidoo/styleunit/compare/v1.0.0-alpha.0...v1.0.0-alpha.1) (2025-05-13)


### Bug Fixes

* **package:** add boostrap.scss to exports field ([470b7f1](https://github.com/hidoo/styleunit/commit/470b7f19bf45937e7dd83afe7b0793f41b530ddd))



# [1.0.0-alpha.0](https://github.com/hidoo/styleunit/compare/8fb38588f1e50db23d3bd967b54e69939bd83374...v1.0.0-alpha.0) (2025-05-13)


* feat(unit)!: support module system ([9a85972](https://github.com/hidoo/styleunit/commit/9a85972b6be2cc7c52accc3bf94b8244c6546d8c))


### Bug Fixes

* change mixin.on-print to be deprecated ([2cb9101](https://github.com/hidoo/styleunit/commit/2cb91016d3ac2404329125b862d51cdfed95776b))
* **deps:** update stylelint packages and update rules ([0a1bc06](https://github.com/hidoo/styleunit/commit/0a1bc06f8eca65c0f83b141b1aa8eba0801d1fe0))
* **generator:** fixed in response to changes of commander ([a6f0a51](https://github.com/hidoo/styleunit/commit/a6f0a51d9bc3fa799092f1c72010e1da5da0bf94))
* **github:** set environment variable NYC_CONFIG for workaround to avoid ERR_REQUIRE_ASYNC_MODULE ([0603dae](https://github.com/hidoo/styleunit/commit/0603dae82f55cd797b416b8d75e76ba9ad24f16d))
* import from @hidoo/unit monorepo ([400621e](https://github.com/hidoo/styleunit/commit/400621e137f0a3d1b8e34b1e39aad81d56eb997e))
* **kss-builder:** change to use sass module system ([541405c](https://github.com/hidoo/styleunit/commit/541405c8501ff98c40685a3c7f6bb3481b40b0c6))
* **unit:** add prefix to $counter-name in unit--list--marker-numeric ([404fe4a](https://github.com/hidoo/styleunit/commit/404fe4a28ddd9db858f0948ba4f9a8482ebaaf9f))
* **unit:** change to ignore multiple define-inline-placeholder ([28b7161](https://github.com/hidoo/styleunit/commit/28b716157bdfc940a9fa564c2a539e1f7db9831f))
* **unit:** fix an issue --copy-protect modifier of unit-document with images being copied on chrome ([c413b9b](https://github.com/hidoo/styleunit/commit/c413b9b2b3f0effce37461e15efeea2fe10dfddd))
* **unit:** fix an issue --copy-protect modifier of unit-pict with images being copied on chrome ([19f366f](https://github.com/hidoo/styleunit/commit/19f366f87d70fded5a75f135cfec107cd5e3dd0b))
* **unit:** fix default font family in windows ([f2f5358](https://github.com/hidoo/styleunit/commit/f2f5358839769e016095cdb17e61ee0aa17c6ecd))
* **unit:** fix deprecated warnings for slash as division ([3fa3dd7](https://github.com/hidoo/styleunit/commit/3fa3dd75e332dd990efc2df35e8e4457be15fa9b))
* **unit:** fix to not override font-family in body ([f84bd85](https://github.com/hidoo/styleunit/commit/f84bd85ca69e08fbe2009839ca06597a2e4d5cc6))
* **unit:** fix typo ([0621a35](https://github.com/hidoo/styleunit/commit/0621a356de465f65935e22fb2dd7286fc0419294))
* **unit:** remove argument $feature-settings from [@mixin](https://github.com/mixin) use-font-base ([0cf8d10](https://github.com/hidoo/styleunit/commit/0cf8d10b8aeb40729f6a0ce1fd3fdbf40410e6eb))
* **unit:** remove text base settings from structure role units ([101981b](https://github.com/hidoo/styleunit/commit/101981b83b3b2ce2b58dda82657f7fa720d570bc))
* **unit:** rename [@mixin](https://github.com/mixin) define-inline-placeholder to define-placeholder ([eb38e59](https://github.com/hidoo/styleunit/commit/eb38e59fd8592d6d75081527d1d17ffc4123aeab))
* **unit:** rename to $unit-font-enable-advanced-settings ([9cefbca](https://github.com/hidoo/styleunit/commit/9cefbcad1705ed66403e7d8168b6631759792d84))


### Features

* **package:** add exports field to import via NodePackageImporter ([58c2421](https://github.com/hidoo/styleunit/commit/58c2421c211d0d1cdd21427354fa91c63105bfec))
* **unit:** add [@function](https://github.com/function) z-index-reserve ([0814c36](https://github.com/hidoo/styleunit/commit/0814c36c257fe650bb4f13ea9680c503af7cfdf6))
* **unit:** add [@mixin](https://github.com/mixin) use-font-advanced-settings ([0c4c1d9](https://github.com/hidoo/styleunit/commit/0c4c1d94323fe7224172536b5dad3bd6a69eca9b))
* **unit:** add $capturing-selectors argument to [@mixin](https://github.com/mixin) on-disabled ([2a18b0b](https://github.com/hidoo/styleunit/commit/2a18b0b8ec4866b58cf1f62138dd9b9912f58663))
* **unit:** add argument $word-break to [@mixin](https://github.com/mixin) use-text-base ([d9b828d](https://github.com/hidoo/styleunit/commit/d9b828dec2be2ec407db456dc991e65076caa0c8))
* **unit:** add as-mask option to plugin/spritesheet ([7692be5](https://github.com/hidoo/styleunit/commit/7692be5b11e0ae5bc57dcd9b1506acbb38631377))
* **unit:** add functions and organize by module ([fa1e624](https://github.com/hidoo/styleunit/commit/fa1e6242c24688da910517ba9b0a329618e914e5))
* **unit:** add hook mixins ([0c7789d](https://github.com/hidoo/styleunit/commit/0c7789def1f7844e1de963913d426e49dc8e5995))
* **unit:** add on-print mixin ([b7a1e08](https://github.com/hidoo/styleunit/commit/b7a1e08c543dc786e9911d5c9a857f00c64f22a4))
* **unit:** add package that sass based css framework ([8fb3858](https://github.com/hidoo/styleunit/commit/8fb38588f1e50db23d3bd967b54e69939bd83374))
* **unit:** add select unit ([5a52ef1](https://github.com/hidoo/styleunit/commit/5a52ef1d8dd5bf837fe35d95d3f288b811be4ab2))
* **unit:** add settings.$verbose ([a84ddac](https://github.com/hidoo/styleunit/commit/a84ddac46c4ffda20c72c36aafbc27c1ef203dd5))
* **unit:** add spritesheet plugin ([e31bca8](https://github.com/hidoo/styleunit/commit/e31bca808cd59f337508c04ef7904c4f989d2c6b))
* **unit:** add use-object-fit option to pict-apply-flexible-size ([fa2721f](https://github.com/hidoo/styleunit/commit/fa2721fa9a88333d9a86df683532c8b3a4f8f746))
* **unit:** update mixins and organize by module ([8923888](https://github.com/hidoo/styleunit/commit/8923888802fcc53a4849c6705e4da15d2245c337))


### BREAKING CHANGES

*   Drop support for node-sass for migration to module system.

  Remove feature of "Hook mixins". Use instead `with` for configuration of settings.

  Remove `_override.scss` partial. Use instead `_bootstrap.scss`.
* **unit:** rename unit-text--decoration-default to unit-text-text--decoration-false and unit-text--decoration-strikelike to unit-text---text--decoration-strikeline
* **unit:** text styles no longer apply to internal text nodes
* **unit:** changed @mixin use-font-family not to refer to $unit-font-enable-override
* **unit:** instead use @mixin use-font-advanced-settings if to set font-feature-settings



