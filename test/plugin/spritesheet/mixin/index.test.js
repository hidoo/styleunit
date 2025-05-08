/* eslint max-len: off, max-statements: off, no-magic-numbers: off */

import assert from 'assert';
import { eachTestCases } from '../../../util/index.js';

/**
 * generate `@use "src/plugin/spritesheet" with (...settings);`
 *
 * @param {Array} settings settings
 * @return {String}
 */
function usePluginSpritesheet(settings = []) {
  const withoutSettings = `
@use "src/plugin/spritesheet";
`;

  if (!settings.length) {
    return withoutSettings;
  }

  const filtered = settings.filter((setting) => setting !== false);

  if (!filtered.length) {
    return withoutSettings;
  }

  return `
@use "src/plugin/spritesheet" with (
  ${filtered.join('  \n')}
);
`;
}

/**
 * wrapper
 *
 * @param {Array} args arguments
 * @param {Array} settings settings of defaults
 * @return {String}
 */
const wrapper = (args = [], settings = []) => `
${usePluginSpritesheet(settings)}

.selector {
  @include spritesheet.define(${args.filter((arg) => arg !== false).join(', ')});
}
`;

/**
 * wrapper for use-spritesheet
 *
 * @param {Array} settings settings of defaults
 * @return {String}
 */
const wrapperUse = (settings = []) => `
${usePluginSpritesheet(settings)}
@use "sass:meta";

.selector {
  content: meta.mixin-exists("use-spritesheet", "spritesheet");
}
`;

describe('plugin/spritesheet', () => {
  describe('@mixin define($type, $name, $options)', () => {
    it('should throw error if argument "$type" is not valid string.', async () => {
      const cases = [
        { params: [['$type: null', '$name: "hoge"']] },
        { params: [['$type: 0', '$name: "hoge"']] },
        { params: [['$type: ()', '$name: "hoge"']] },
        { params: [['$type: #000', '$name: "hoge"']] },
        { params: [['$type: ""', '$name: "hoge"']] }
      ];

      await eachTestCases(cases, wrapper, ({ error }, { resolve }) => {
        assert(error instanceof Error);
        assert(error.message.match(/Argument \$type must be valid string\./));
        return resolve();
      });
    });

    it('should throw error if argument "$name" is not valid string.', async () => {
      const cases = [
        { params: [['$type: "hoge"', '$name: null']] },
        { params: [['$type: "hoge"', '$name: 0']] },
        { params: [['$type: "hoge"', '$name: ()']] },
        { params: [['$type: "hoge"', '$name: #000']] },
        { params: [['$type: "hoge"', '$name: ""']] }
      ];

      await eachTestCases(cases, wrapper, ({ error }, { resolve }) => {
        assert(error instanceof Error);
        assert(error.message.match(/Argument \$name must be valid string\./));
        return resolve();
      });
    });

    it('should not out if spritesheets value not configure.', async () => {
      const cases = [
        {
          params: [
            ['$type: "hoge"', '$name: "fuga"', '$options: null'],
            ['$spritesheets: null']
          ],
          expected: ''
        }
      ];

      await eachTestCases(
        cases,
        wrapper,
        ({ error, result, expected }, { resolve, reject }) => {
          if (error) {
            return reject(error);
          }

          const actual = result.css.toString().trim();

          assert.equal(actual, expected);
          return resolve();
        }
      );
    });

    it('should not out if specified $type value is not found in spritesheets value.', async () => {
      const cases = [
        {
          params: [
            ['$type: "hoge"', '$name: "fuga"', '$options: null'],
            ['$spritesheets: ("fuga": ())']
          ],
          expected: ''
        }
      ];

      await eachTestCases(
        cases,
        wrapper,
        ({ error, result, expected }, { resolve, reject }) => {
          if (error) {
            return reject(error);
          }

          const actual = result.css.toString().trim();

          assert.equal(actual, expected);
          return resolve();
        }
      );
    });

    it('should not out if specified $type value is not valid.', async () => {
      const cases = [
        {
          params: [
            ['$type: "hoge"', '$name: "fuga"', '$options: null'],
            ['$spritesheets: ("hoge": ("fuga": ""))']
          ],
          expected: ''
        },
        {
          params: [
            ['$type: "hoge"', '$name: "fuga"', '$options: null'],
            ['$spritesheets: ("hoge": ("image": "path/to/hoge.png"))']
          ],
          expected: ''
        },
        {
          params: [
            ['$type: "hoge"', '$name: "fuga"', '$options: null'],
            ['$spritesheets: ("hoge": ("items": ()))']
          ],
          expected: ''
        }
      ];

      await eachTestCases(
        cases,
        wrapper,
        ({ error, result, expected }, { resolve, reject }) => {
          if (error) {
            return reject(error);
          }

          const actual = result.css.toString().trim();

          assert.equal(actual, expected);
          return resolve();
        }
      );
    });

    it('should out spritesheet settings.', async () => {
      const cases = [
        {
          params: [
            ['$type: "icon-image"', '$name: "logo"', '$options: null'],
            [
              `
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
            `
            ]
          ],
          expected: `.selector-logo {
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
}`
        }
      ];

      await eachTestCases(
        cases,
        wrapper,
        ({ error, result, expected }, { resolve, reject }) => {
          if (error) {
            return reject(error);
          }

          const actual = result.css.toString().trim();

          assert.equal(actual, expected);
          return resolve();
        },
        { style: 'expanded' }
      );
    });

    it('should out 2x spritesheet settings if argument $options is ("use2x": true).', async () => {
      const cases = [
        {
          params: [
            [
              '$type: "icon-image"',
              '$name: "logo"',
              '$options: ("use2x": true)'
            ],
            [
              `
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
            `
            ]
          ],
          expected: `.selector-logo {
  --background-image: url(path/to/sprite/icon-image.png);
  background-image: var(--background-image);
}

.selector-logo {
  --overflow: hidden;
  --color: transparent;
  --text-indent: -100%;
}

.selector-logo {
  --width: 5px;
  width: var(--width);
  --height: 5px;
  height: var(--height);
  --background-position: -5px -5px;
  background-position: var(--background-position);
  --background-size: 15px 15px;
  background-size: var(--background-size);
}`
        }
      ];

      await eachTestCases(
        cases,
        wrapper,
        ({ error, result, expected }, { resolve, reject }) => {
          if (error) {
            return reject(error);
          }

          const actual = result.css.toString().trim();

          assert.equal(actual, expected);
          return resolve();
        },
        { style: 'expanded' }
      );
    });

    it('should out spritesheet settings used css masks if argument $options is ("as-mask": true).', async () => {
      const cases = [
        {
          params: [
            [
              '$type: "icon-image"',
              '$name: "logo"',
              '$options: ("as-mask": true)'
            ],
            [
              `
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
            `
            ]
          ],
          expected: `.selector-logo {
  --mask-image: url(path/to/sprite/icon-image.png);
  mask-image: var(--mask-image);
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
  --mask-position: -10px -10px;
  mask-position: var(--mask-position);
  --mask-size: 30px 30px;
  mask-size: var(--mask-size);
}`
        }
      ];

      await eachTestCases(
        cases,
        wrapper,
        ({ error, result, expected }, { resolve, reject }) => {
          if (error) {
            return reject(error);
          }

          const actual = result.css.toString().trim();

          assert.equal(actual, expected);
          return resolve();
        },
        { style: 'expanded' }
      );
    });

    it('should out responsive spritesheet settings if argument $options is ("responsive": true).', async () => {
      const cases = [
        {
          params: [
            [
              '$type: "icon-image"',
              '$name: "logo"',
              '$options: ("responsive": true)'
            ],
            [
              `
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
                    ),
                    "sm_logo": (
                      "width": 20px,
                      "height": 20px,
                      "total-width": 30px,
                      "total-height": 30px,
                      "offset-x": -4px,
                      "offset-y": -4px
                    )
                  )
                )
              )
            `
            ]
          ],
          expected: `.selector-logo {
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
@media only screen and (width < 667px) {
  .selector-logo {
    --width: 20px;
    --height: 20px;
    --background-position: -4px -4px;
    --background-size: 30px 30px;
  }
}`
        }
      ];

      await eachTestCases(
        cases,
        wrapper,
        ({ error, result, expected }, { resolve, reject }) => {
          if (error) {
            return reject(error);
          }

          const actual = result.css.toString().trim();

          assert.equal(actual, expected);
          return resolve();
        },
        { style: 'expanded' }
      );
    });

    it('should out responsive spritesheet settings if argument $options is ("use2x": "sm", "responsive": true).', async () => {
      const cases = [
        {
          params: [
            [
              '$type: "icon-image"',
              '$name: "logo"',
              '$options: ("use2x": "sm", "responsive": true)'
            ],
            [
              `
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
                    ),
                    "sm_logo": (
                      "width": 20px,
                      "height": 20px,
                      "total-width": 30px,
                      "total-height": 30px,
                      "offset-x": -4px,
                      "offset-y": -4px
                    )
                  )
                )
              )
            `
            ]
          ],
          expected: `.selector-logo {
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
@media only screen and (width < 667px) {
  .selector-logo {
    --width: 10px;
    --height: 10px;
    --background-position: -2px -2px;
    --background-size: 15px 15px;
  }
}`
        }
      ];

      await eachTestCases(
        cases,
        wrapper,
        ({ error, result, expected }, { resolve, reject }) => {
          if (error) {
            return reject(error);
          }

          const actual = result.css.toString().trim();

          assert.equal(actual, expected);
          return resolve();
        },
        { style: 'expanded' }
      );
    });

    it('should out spritesheet settings with state if image like "#{$name}--focus" exists.', async () => {
      const cases = [
        {
          params: [
            ['$type: "icon-image"', '$name: "logo"', '$options: null'],
            [
              `
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
                    ),
                    "logo--focus": (
                      "width": 10px,
                      "height": 10px,
                      "total-width": 30px,
                      "total-height": 30px,
                      "offset-x": -20px,
                      "offset-y": -20px
                    )
                  )
                )
              )
            `
            ]
          ],
          expected: `.selector-logo {
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
.selector-logo:where(:hover, :focus, .is-focus) {
  --background-position: -20px -20px;
}`
        },
        {
          params: [
            ['$type: "icon-image"', '$name: "logo"', '$options: null'],
            [
              `
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
                    ),
                    "logo--disabled": (
                      "width": 10px,
                      "height": 10px,
                      "total-width": 30px,
                      "total-height": 30px,
                      "offset-x": -20px,
                      "offset-y": -20px
                    )
                  )
                )
              )
            `
            ]
          ],
          expected: `.selector-logo {
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
.selector-logo:where(:disabled, .is-disabled) {
  --background-position: -20px -20px;
}`
        },
        {
          params: [
            ['$type: "icon-image"', '$name: "logo"', '$options: null'],
            [
              `
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
                    ),
                    "logo--current": (
                      "width": 10px,
                      "height": 10px,
                      "total-width": 30px,
                      "total-height": 30px,
                      "offset-x": -20px,
                      "offset-y": -20px
                    )
                  )
                )
              )
            `
            ]
          ],
          expected: `.selector-logo {
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
.selector-logo:where(.is-current) {
  --background-position: -20px -20px;
}`
        }
      ];

      await eachTestCases(
        cases,
        wrapper,
        ({ error, result, expected }, { resolve, reject }) => {
          if (error) {
            return reject(error);
          }

          const actual = result.css.toString().trim();

          assert.equal(actual, expected);
          return resolve();
        },
        { style: 'expanded' }
      );
    });

    it('should out responsive spritesheet settings with state if image like "sm_#{$name}--focus" exists and argument $options is ("responsive": true).', async () => {
      const cases = [
        {
          params: [
            [
              '$type: "icon-image"',
              '$name: "logo"',
              '$options: ("responsive": true)'
            ],
            [
              `
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
                    ),
                    "sm_logo": (
                      "width": 20px,
                      "height": 20px,
                      "total-width": 30px,
                      "total-height": 30px,
                      "offset-x": -4px,
                      "offset-y": -4px
                    ),
                    "logo--focus": (
                      "width": 10px,
                      "height": 10px,
                      "total-width": 30px,
                      "total-height": 30px,
                      "offset-x": -20px,
                      "offset-y": -20px
                    ),
                    "sm_logo--focus": (
                      "width": 20px,
                      "height": 20px,
                      "total-width": 30px,
                      "total-height": 30px,
                      "offset-x": -24px,
                      "offset-y": -24px
                    )
                  )
                )
              )
            `
            ]
          ],
          expected: `.selector-logo {
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
@media only screen and (width < 667px) {
  .selector-logo {
    --width: 20px;
    --height: 20px;
    --background-position: -4px -4px;
    --background-size: 30px 30px;
  }
}
.selector-logo:where(:hover, :focus, .is-focus) {
  --background-position: -20px -20px;
}
@media only screen and (width < 667px) {
  .selector-logo:where(:hover, :focus, .is-focus) {
    --background-position: -24px -24px;
  }
}`
        },
        {
          params: [
            [
              '$type: "icon-image"',
              '$name: "logo"',
              '$options: ("responsive": true)'
            ],
            [
              `
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
                    ),
                    "sm_logo": (
                      "width": 20px,
                      "height": 20px,
                      "total-width": 30px,
                      "total-height": 30px,
                      "offset-x": -4px,
                      "offset-y": -4px
                    ),
                    "logo--disabled": (
                      "width": 10px,
                      "height": 10px,
                      "total-width": 30px,
                      "total-height": 30px,
                      "offset-x": -20px,
                      "offset-y": -20px
                    ),
                    "sm_logo--disabled": (
                      "width": 20px,
                      "height": 20px,
                      "total-width": 30px,
                      "total-height": 30px,
                      "offset-x": -24px,
                      "offset-y": -24px
                    )
                  )
                )
              )
            `
            ]
          ],
          expected: `.selector-logo {
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
@media only screen and (width < 667px) {
  .selector-logo {
    --width: 20px;
    --height: 20px;
    --background-position: -4px -4px;
    --background-size: 30px 30px;
  }
}
.selector-logo:where(:disabled, .is-disabled) {
  --background-position: -20px -20px;
}
@media only screen and (width < 667px) {
  .selector-logo:where(:disabled, .is-disabled) {
    --background-position: -24px -24px;
  }
}`
        },
        {
          params: [
            [
              '$type: "icon-image"',
              '$name: "logo"',
              '$options: ("responsive": true)'
            ],
            [
              `
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
                    ),
                    "sm_logo": (
                      "width": 20px,
                      "height": 20px,
                      "total-width": 30px,
                      "total-height": 30px,
                      "offset-x": -4px,
                      "offset-y": -4px
                    ),
                    "logo--current": (
                      "width": 10px,
                      "height": 10px,
                      "total-width": 30px,
                      "total-height": 30px,
                      "offset-x": -20px,
                      "offset-y": -20px
                    ),
                    "sm_logo--current": (
                      "width": 20px,
                      "height": 20px,
                      "total-width": 30px,
                      "total-height": 30px,
                      "offset-x": -24px,
                      "offset-y": -24px
                    )
                  )
                )
              )
            `
            ]
          ],
          expected: `.selector-logo {
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
@media only screen and (width < 667px) {
  .selector-logo {
    --width: 20px;
    --height: 20px;
    --background-position: -4px -4px;
    --background-size: 30px 30px;
  }
}
.selector-logo:where(.is-current) {
  --background-position: -20px -20px;
}
@media only screen and (width < 667px) {
  .selector-logo:where(.is-current) {
    --background-position: -24px -24px;
  }
}`
        }
      ];

      await eachTestCases(
        cases,
        wrapper,
        ({ error, result, expected }, { resolve, reject }) => {
          if (error) {
            return reject(error);
          }

          const actual = result.css.toString().trim();

          assert.equal(actual, expected);
          return resolve();
        },
        { style: 'expanded' }
      );
    });

    it('should out spritesheet settings for toggle if argument $options is ("toggle": true).', async () => {
      const cases = [
        {
          params: [
            [
              '$type: "radio-image"',
              '$name: "radio"',
              '$options: ("toggle": true)'
            ],
            [
              `
              $spritesheets: (
                "radio-image": (
                  "image": "path/to/sprite/radio-image.png",
                  "items": (
                    "radio": (
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
            `
            ]
          ],
          expected: `.selector-radio::before {
  --background-image: url(path/to/sprite/radio-image.png);
  background-image: var(--background-image);
}

.selector-radio {
  --overflow: hidden;
  --vertical-align: baseline;
  --field-position: absolute;
  --field-z-index: 1;
  --field-inset: 0 0;
  --field-width: 100%;
  --field-height: 100%;
  --field-opacity: 0;
  --pseudo-content: "";
  --pseudo-position: relative;
  --pseudo-z-index: 0;
  --pseudo-display: block;
  --pseudo-color: transparent;
  --pseudo-text-indent: -100%;
}

.selector-radio::before {
  content: var(--pseudo-content);
  position: var(--pseudo-position);
  z-index: var(--pseudo-z-index);
  display: var(--pseudo-display);
  color: var(--pseudo-color);
  text-indent: var(--pseudo-text-indent);
}

.selector-radio::before {
  --width: 10px;
  width: var(--width);
  --height: 10px;
  height: var(--height);
  --background-position: -10px -10px;
  background-position: var(--background-position);
  --background-size: 30px 30px;
  background-size: var(--background-size);
}`
        }
      ];

      await eachTestCases(
        cases,
        wrapper,
        ({ error, result, expected }, { resolve, reject }) => {
          if (error) {
            return reject(error);
          }

          const actual = result.css.toString().trim();

          assert.equal(actual, expected);
          return resolve();
        },
        { style: 'expanded' }
      );
    });

    it('should out 2x spritesheet settings for toggle if argument $options is ("toggle": true, "use2x": true).', async () => {
      const cases = [
        {
          params: [
            [
              '$type: "radio-image"',
              '$name: "radio"',
              '$options: ("toggle": true, "use2x": true)'
            ],
            [
              `
              $spritesheets: (
                "radio-image": (
                  "image": "path/to/sprite/radio-image.png",
                  "items": (
                    "radio": (
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
            `
            ]
          ],
          expected: `.selector-radio::before {
  --background-image: url(path/to/sprite/radio-image.png);
  background-image: var(--background-image);
}

.selector-radio {
  --overflow: hidden;
  --vertical-align: baseline;
  --field-position: absolute;
  --field-z-index: 1;
  --field-inset: 0 0;
  --field-width: 100%;
  --field-height: 100%;
  --field-opacity: 0;
  --pseudo-content: "";
  --pseudo-position: relative;
  --pseudo-z-index: 0;
  --pseudo-display: block;
  --pseudo-color: transparent;
  --pseudo-text-indent: -100%;
}

.selector-radio::before {
  content: var(--pseudo-content);
  position: var(--pseudo-position);
  z-index: var(--pseudo-z-index);
  display: var(--pseudo-display);
  color: var(--pseudo-color);
  text-indent: var(--pseudo-text-indent);
}

.selector-radio::before {
  --width: 5px;
  width: var(--width);
  --height: 5px;
  height: var(--height);
  --background-position: -5px -5px;
  background-position: var(--background-position);
  --background-size: 15px 15px;
  background-size: var(--background-size);
}`
        }
      ];

      await eachTestCases(
        cases,
        wrapper,
        ({ error, result, expected }, { resolve, reject }) => {
          if (error) {
            return reject(error);
          }

          const actual = result.css.toString().trim();

          assert.equal(actual, expected);
          return resolve();
        },
        { style: 'expanded' }
      );
    });

    it('should out spritesheet settings for toggle used css masks if argument $options is ("toggle": true, "as-mask": true).', async () => {
      const cases = [
        {
          params: [
            [
              '$type: "radio-image"',
              '$name: "radio"',
              '$options: ("toggle": true, "as-mask": true)'
            ],
            [
              `
              $spritesheets: (
                "radio-image": (
                  "image": "path/to/sprite/radio-image.png",
                  "items": (
                    "radio": (
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
            `
            ]
          ],
          expected: `.selector-radio::before {
  --mask-image: url(path/to/sprite/radio-image.png);
  mask-image: var(--mask-image);
}

.selector-radio {
  --overflow: hidden;
  --vertical-align: baseline;
  --field-position: absolute;
  --field-z-index: 1;
  --field-inset: 0 0;
  --field-width: 100%;
  --field-height: 100%;
  --field-opacity: 0;
  --pseudo-content: "";
  --pseudo-position: relative;
  --pseudo-z-index: 0;
  --pseudo-display: block;
  --pseudo-color: transparent;
  --pseudo-text-indent: -100%;
}

.selector-radio::before {
  content: var(--pseudo-content);
  position: var(--pseudo-position);
  z-index: var(--pseudo-z-index);
  display: var(--pseudo-display);
  color: var(--pseudo-color);
  text-indent: var(--pseudo-text-indent);
}

.selector-radio::before {
  --width: 10px;
  width: var(--width);
  --height: 10px;
  height: var(--height);
  --mask-position: -10px -10px;
  mask-position: var(--mask-position);
  --mask-size: 30px 30px;
  mask-size: var(--mask-size);
}`
        }
      ];

      await eachTestCases(
        cases,
        wrapper,
        ({ error, result, expected }, { resolve, reject }) => {
          if (error) {
            return reject(error);
          }

          const actual = result.css.toString().trim();

          assert.equal(actual, expected);
          return resolve();
        },
        { style: 'expanded' }
      );
    });

    it('should out responsive spritesheet settings for toggle if argument $options is ("toggle": true, "responsive": true).', async () => {
      const cases = [
        {
          params: [
            [
              '$type: "radio-image"',
              '$name: "radio"',
              '$options: ("toggle": true, "responsive": true)'
            ],
            [
              `
              $spritesheets: (
                "radio-image": (
                  "image": "path/to/sprite/radio-image.png",
                  "items": (
                    "radio": (
                      "width": 10px,
                      "height": 10px,
                      "total-width": 30px,
                      "total-height": 30px,
                      "offset-x": -10px,
                      "offset-y": -10px
                    ),
                    "sm_radio": (
                      "width": 20px,
                      "height": 20px,
                      "total-width": 30px,
                      "total-height": 30px,
                      "offset-x": -4px,
                      "offset-y": -4px
                    )
                  )
                )
              )
            `
            ]
          ],
          expected: `.selector-radio::before {
  --background-image: url(path/to/sprite/radio-image.png);
  background-image: var(--background-image);
}

.selector-radio {
  --overflow: hidden;
  --vertical-align: baseline;
  --field-position: absolute;
  --field-z-index: 1;
  --field-inset: 0 0;
  --field-width: 100%;
  --field-height: 100%;
  --field-opacity: 0;
  --pseudo-content: "";
  --pseudo-position: relative;
  --pseudo-z-index: 0;
  --pseudo-display: block;
  --pseudo-color: transparent;
  --pseudo-text-indent: -100%;
}

.selector-radio::before {
  content: var(--pseudo-content);
  position: var(--pseudo-position);
  z-index: var(--pseudo-z-index);
  display: var(--pseudo-display);
  color: var(--pseudo-color);
  text-indent: var(--pseudo-text-indent);
}

.selector-radio::before {
  --width: 10px;
  width: var(--width);
  --height: 10px;
  height: var(--height);
  --background-position: -10px -10px;
  background-position: var(--background-position);
  --background-size: 30px 30px;
  background-size: var(--background-size);
}
@media only screen and (width < 667px) {
  .selector-radio::before {
    --width: 20px;
    --height: 20px;
    --background-position: -4px -4px;
    --background-size: 30px 30px;
  }
}`
        }
      ];

      await eachTestCases(
        cases,
        wrapper,
        ({ error, result, expected }, { resolve, reject }) => {
          if (error) {
            return reject(error);
          }

          const actual = result.css.toString().trim();

          assert.equal(actual, expected);
          return resolve();
        },
        { style: 'expanded' }
      );
    });

    it('should out responsive spritesheet settings for toggle if argument $options is ("toggle": true, "use2x": "sm", "responsive": true).', async () => {
      const cases = [
        {
          params: [
            [
              '$type: "radio-image"',
              '$name: "radio"',
              '$options: ("toggle": true, "use2x": "sm", "responsive": true)'
            ],
            [
              `
              $spritesheets: (
                "radio-image": (
                  "image": "path/to/sprite/radio-image.png",
                  "items": (
                    "radio": (
                      "width": 10px,
                      "height": 10px,
                      "total-width": 30px,
                      "total-height": 30px,
                      "offset-x": -10px,
                      "offset-y": -10px
                    ),
                    "sm_radio": (
                      "width": 20px,
                      "height": 20px,
                      "total-width": 30px,
                      "total-height": 30px,
                      "offset-x": -4px,
                      "offset-y": -4px
                    )
                  )
                )
              )
            `
            ]
          ],
          expected: `.selector-radio::before {
  --background-image: url(path/to/sprite/radio-image.png);
  background-image: var(--background-image);
}

.selector-radio {
  --overflow: hidden;
  --vertical-align: baseline;
  --field-position: absolute;
  --field-z-index: 1;
  --field-inset: 0 0;
  --field-width: 100%;
  --field-height: 100%;
  --field-opacity: 0;
  --pseudo-content: "";
  --pseudo-position: relative;
  --pseudo-z-index: 0;
  --pseudo-display: block;
  --pseudo-color: transparent;
  --pseudo-text-indent: -100%;
}

.selector-radio::before {
  content: var(--pseudo-content);
  position: var(--pseudo-position);
  z-index: var(--pseudo-z-index);
  display: var(--pseudo-display);
  color: var(--pseudo-color);
  text-indent: var(--pseudo-text-indent);
}

.selector-radio::before {
  --width: 10px;
  width: var(--width);
  --height: 10px;
  height: var(--height);
  --background-position: -10px -10px;
  background-position: var(--background-position);
  --background-size: 30px 30px;
  background-size: var(--background-size);
}
@media only screen and (width < 667px) {
  .selector-radio::before {
    --width: 10px;
    --height: 10px;
    --background-position: -2px -2px;
    --background-size: 15px 15px;
  }
}`
        }
      ];

      await eachTestCases(
        cases,
        wrapper,
        ({ error, result, expected }, { resolve, reject }) => {
          if (error) {
            return reject(error);
          }

          const actual = result.css.toString().trim();

          assert.equal(actual, expected);
          return resolve();
        },
        { style: 'expanded' }
      );
    });

    it('should out spritesheet settings for toggle with state if image like "#{$name}--focus" exists and argument $options is ("toggle": true).', async () => {
      const cases = [
        {
          params: [
            [
              '$type: "radio-image"',
              '$name: "radio"',
              '$options: ("toggle": true)'
            ],
            [
              `
              $spritesheets: (
                "radio-image": (
                  "image": "path/to/sprite/radio-image.png",
                  "items": (
                    "radio": (
                      "width": 10px,
                      "height": 10px,
                      "total-width": 30px,
                      "total-height": 30px,
                      "offset-x": -10px,
                      "offset-y": -10px
                    ),
                    "radio--focus": (
                      "width": 10px,
                      "height": 10px,
                      "total-width": 30px,
                      "total-height": 30px,
                      "offset-x": -20px,
                      "offset-y": -20px
                    )
                  )
                )
              )
            `
            ]
          ],
          expected: `.selector-radio::before {
  --background-image: url(path/to/sprite/radio-image.png);
  background-image: var(--background-image);
}

.selector-radio {
  --overflow: hidden;
  --vertical-align: baseline;
  --field-position: absolute;
  --field-z-index: 1;
  --field-inset: 0 0;
  --field-width: 100%;
  --field-height: 100%;
  --field-opacity: 0;
  --pseudo-content: "";
  --pseudo-position: relative;
  --pseudo-z-index: 0;
  --pseudo-display: block;
  --pseudo-color: transparent;
  --pseudo-text-indent: -100%;
}

.selector-radio::before {
  content: var(--pseudo-content);
  position: var(--pseudo-position);
  z-index: var(--pseudo-z-index);
  display: var(--pseudo-display);
  color: var(--pseudo-color);
  text-indent: var(--pseudo-text-indent);
}

.selector-radio::before {
  --width: 10px;
  width: var(--width);
  --height: 10px;
  height: var(--height);
  --background-position: -10px -10px;
  background-position: var(--background-position);
  --background-size: 30px 30px;
  background-size: var(--background-size);
}
.selector-radio:has(:hover, :focus, .is-focus)::before {
  --background-position: -20px -20px;
}`
        }
      ];

      await eachTestCases(
        cases,
        wrapper,
        ({ error, result, expected }, { resolve, reject }) => {
          if (error) {
            return reject(error);
          }

          const actual = result.css.toString().trim();

          assert.equal(actual, expected);
          return resolve();
        },
        { style: 'expanded' }
      );
    });

    it('should out responsive spritesheet settings for toggle with state if image like "sm_#{$name}--focus" exists and argument $options is ("toggle": true, "responsive": true).', async () => {
      const cases = [
        {
          params: [
            [
              '$type: "radio-image"',
              '$name: "radio"',
              '$options: ("toggle": true, "responsive": true)'
            ],
            [
              `
              $spritesheets: (
                "radio-image": (
                  "image": "path/to/sprite/radio-image.png",
                  "items": (
                    "radio": (
                      "width": 10px,
                      "height": 10px,
                      "total-width": 30px,
                      "total-height": 30px,
                      "offset-x": -10px,
                      "offset-y": -10px
                    ),
                    "sm_radio": (
                      "width": 20px,
                      "height": 20px,
                      "total-width": 30px,
                      "total-height": 30px,
                      "offset-x": -4px,
                      "offset-y": -4px
                    ),
                    "radio--focus": (
                      "width": 10px,
                      "height": 10px,
                      "total-width": 30px,
                      "total-height": 30px,
                      "offset-x": -20px,
                      "offset-y": -20px
                    ),
                    "sm_radio--focus": (
                      "width": 20px,
                      "height": 20px,
                      "total-width": 30px,
                      "total-height": 30px,
                      "offset-x": -24px,
                      "offset-y": -24px
                    )
                  )
                )
              )
            `
            ]
          ],
          expected: `.selector-radio::before {
  --background-image: url(path/to/sprite/radio-image.png);
  background-image: var(--background-image);
}

.selector-radio {
  --overflow: hidden;
  --vertical-align: baseline;
  --field-position: absolute;
  --field-z-index: 1;
  --field-inset: 0 0;
  --field-width: 100%;
  --field-height: 100%;
  --field-opacity: 0;
  --pseudo-content: "";
  --pseudo-position: relative;
  --pseudo-z-index: 0;
  --pseudo-display: block;
  --pseudo-color: transparent;
  --pseudo-text-indent: -100%;
}

.selector-radio::before {
  content: var(--pseudo-content);
  position: var(--pseudo-position);
  z-index: var(--pseudo-z-index);
  display: var(--pseudo-display);
  color: var(--pseudo-color);
  text-indent: var(--pseudo-text-indent);
}

.selector-radio::before {
  --width: 10px;
  width: var(--width);
  --height: 10px;
  height: var(--height);
  --background-position: -10px -10px;
  background-position: var(--background-position);
  --background-size: 30px 30px;
  background-size: var(--background-size);
}
@media only screen and (width < 667px) {
  .selector-radio::before {
    --width: 20px;
    --height: 20px;
    --background-position: -4px -4px;
    --background-size: 30px 30px;
  }
}
.selector-radio:has(:hover, :focus, .is-focus)::before {
  --background-position: -20px -20px;
}
@media only screen and (width < 667px) {
  .selector-radio:has(:hover, :focus, .is-focus)::before {
    --background-position: -24px -24px;
  }
}`
        },
        {
          params: [
            [
              '$type: "radio-image"',
              '$name: "radio"',
              '$options: ("toggle": true, "responsive": true)'
            ],
            [
              `
              $spritesheets: (
                "radio-image": (
                  "image": "path/to/sprite/radio-image.png",
                  "items": (
                    "radio": (
                      "width": 10px,
                      "height": 10px,
                      "total-width": 30px,
                      "total-height": 30px,
                      "offset-x": -10px,
                      "offset-y": -10px
                    ),
                    "sm_radio": (
                      "width": 20px,
                      "height": 20px,
                      "total-width": 30px,
                      "total-height": 30px,
                      "offset-x": -4px,
                      "offset-y": -4px
                    ),
                    "radio--disabled": (
                      "width": 10px,
                      "height": 10px,
                      "total-width": 30px,
                      "total-height": 30px,
                      "offset-x": -20px,
                      "offset-y": -20px
                    ),
                    "sm_radio--disabled": (
                      "width": 20px,
                      "height": 20px,
                      "total-width": 30px,
                      "total-height": 30px,
                      "offset-x": -24px,
                      "offset-y": -24px
                    )
                  )
                )
              )
            `
            ]
          ],
          expected: `.selector-radio::before {
  --background-image: url(path/to/sprite/radio-image.png);
  background-image: var(--background-image);
}

.selector-radio {
  --overflow: hidden;
  --vertical-align: baseline;
  --field-position: absolute;
  --field-z-index: 1;
  --field-inset: 0 0;
  --field-width: 100%;
  --field-height: 100%;
  --field-opacity: 0;
  --pseudo-content: "";
  --pseudo-position: relative;
  --pseudo-z-index: 0;
  --pseudo-display: block;
  --pseudo-color: transparent;
  --pseudo-text-indent: -100%;
}

.selector-radio::before {
  content: var(--pseudo-content);
  position: var(--pseudo-position);
  z-index: var(--pseudo-z-index);
  display: var(--pseudo-display);
  color: var(--pseudo-color);
  text-indent: var(--pseudo-text-indent);
}

.selector-radio::before {
  --width: 10px;
  width: var(--width);
  --height: 10px;
  height: var(--height);
  --background-position: -10px -10px;
  background-position: var(--background-position);
  --background-size: 30px 30px;
  background-size: var(--background-size);
}
@media only screen and (width < 667px) {
  .selector-radio::before {
    --width: 20px;
    --height: 20px;
    --background-position: -4px -4px;
    --background-size: 30px 30px;
  }
}
.selector-radio:has(:disabled, .is-disabled) {
  --field-opacity: 0;
}
.selector-radio:has(:disabled, .is-disabled)::before {
  --background-position: -20px -20px;
}
@media only screen and (width < 667px) {
  .selector-radio:has(:disabled, .is-disabled)::before {
    --background-position: -24px -24px;
  }
}`
        },
        {
          params: [
            [
              '$type: "radio-image"',
              '$name: "radio"',
              '$options: ("toggle": true, "responsive": true)'
            ],
            [
              `
              $spritesheets: (
                "radio-image": (
                  "image": "path/to/sprite/radio-image.png",
                  "items": (
                    "radio": (
                      "width": 10px,
                      "height": 10px,
                      "total-width": 30px,
                      "total-height": 30px,
                      "offset-x": -10px,
                      "offset-y": -10px
                    ),
                    "sm_radio": (
                      "width": 20px,
                      "height": 20px,
                      "total-width": 30px,
                      "total-height": 30px,
                      "offset-x": -4px,
                      "offset-y": -4px
                    ),
                    "radio--disabled": (
                      "width": 10px,
                      "height": 10px,
                      "total-width": 30px,
                      "total-height": 30px,
                      "offset-x": -20px,
                      "offset-y": -20px
                    ),
                    "sm_radio--disabled": (
                      "width": 20px,
                      "height": 20px,
                      "total-width": 30px,
                      "total-height": 30px,
                      "offset-x": -24px,
                      "offset-y": -24px
                    ),
                    "radio--selected": (
                      "width": 10px,
                      "height": 10px,
                      "total-width": 28px,
                      "total-height": 28px,
                      "offset-x": -28px,
                      "offset-y": -28px
                    ),
                    "sm_radio--selected": (
                      "width": 20px,
                      "height": 20px,
                      "total-width": 38px,
                      "total-height": 38px,
                      "offset-x": -38px,
                      "offset-y": -38px
                    ),
                    "radio--selected--disabled": (
                      "width": 10px,
                      "height": 10px,
                      "total-width": 40px,
                      "total-height": 40px,
                      "offset-x": -25px,
                      "offset-y": -25px
                    ),
                    "sm_radio--selected--disabled": (
                      "width": 20px,
                      "height": 20px,
                      "total-width": 60px,
                      "total-height": 60px,
                      "offset-x": -36px,
                      "offset-y": -36px
                    )
                  )
                )
              )
            `
            ]
          ],
          expected: `.selector-radio::before {
  --background-image: url(path/to/sprite/radio-image.png);
  background-image: var(--background-image);
}

.selector-radio {
  --overflow: hidden;
  --vertical-align: baseline;
  --field-position: absolute;
  --field-z-index: 1;
  --field-inset: 0 0;
  --field-width: 100%;
  --field-height: 100%;
  --field-opacity: 0;
  --pseudo-content: "";
  --pseudo-position: relative;
  --pseudo-z-index: 0;
  --pseudo-display: block;
  --pseudo-color: transparent;
  --pseudo-text-indent: -100%;
}

.selector-radio::before {
  content: var(--pseudo-content);
  position: var(--pseudo-position);
  z-index: var(--pseudo-z-index);
  display: var(--pseudo-display);
  color: var(--pseudo-color);
  text-indent: var(--pseudo-text-indent);
}

.selector-radio::before {
  --width: 10px;
  width: var(--width);
  --height: 10px;
  height: var(--height);
  --background-position: -10px -10px;
  background-position: var(--background-position);
  --background-size: 30px 30px;
  background-size: var(--background-size);
}
@media only screen and (width < 667px) {
  .selector-radio::before {
    --width: 20px;
    --height: 20px;
    --background-position: -4px -4px;
    --background-size: 30px 30px;
  }
}
.selector-radio:has(:disabled, .is-disabled) {
  --field-opacity: 0;
}
.selector-radio:has(:disabled, .is-disabled)::before {
  --background-position: -20px -20px;
}
@media only screen and (width < 667px) {
  .selector-radio:has(:disabled, .is-disabled)::before {
    --background-position: -24px -24px;
  }
}
.selector-radio:has(:checked, .is-selected)::before {
  --background-position: -28px -28px;
}
@media only screen and (width < 667px) {
  .selector-radio:has(:checked, .is-selected)::before {
    --background-position: -38px -38px;
  }
}
.selector-radio:has(:checked, .is-selected):has(:disabled, .is-disabled) {
  --field-opacity: 0;
}
.selector-radio:has(:checked, .is-selected):has(:disabled, .is-disabled)::before {
  --background-position: -25px -25px;
}
@media only screen and (width < 667px) {
  .selector-radio:has(:checked, .is-selected):has(:disabled, .is-disabled)::before {
    --background-position: -36px -36px;
  }
}`
        }
      ];

      await eachTestCases(
        cases,
        wrapper,
        ({ error, result, expected }, { resolve, reject }) => {
          if (error) {
            return reject(error);
          }

          const actual = result.css.toString().trim();

          assert.equal(actual, expected);
          return resolve();
        },
        { style: 'expanded' }
      );
    });
  });

  describe('[DEPRECATED] @mixin use-spritesheet($type, $name, $options)', () => {
    it('should exists.', async () => {
      const cases = [
        {
          params: [[]],
          expected: '.selector{content:true}'
        }
      ];

      await eachTestCases(
        cases,
        wrapperUse,
        ({ error, result, expected }, { resolve, reject }) => {
          if (error) {
            return reject(error);
          }

          const actual = result.css.toString().trim();

          assert.equal(actual, expected);
          return resolve();
        }
      );
    });
  });
});
