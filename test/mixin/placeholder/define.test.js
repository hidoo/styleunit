import assert from 'assert';
import { eachTestCases, useSettingsWith } from '../../util/index.js';

/**
 * wrapper
 *
 * @param {String} name name for placeholder
 * @param {Array} settings settings of defaults
 * @return {String}
 */
const wrapper = (name, settings = []) => `
${useSettingsWith(settings)}
@use "src/lib/mixin";

.selector {
  ${name || '$name: null'};

  @include mixin.placeholder-define($name: $name) {
    font-size: 16px;
  }

  // ignore multiple define
  @include mixin.placeholder-define($name: $name) {
    font-size: 18px;
  }

  &__child-1 {
    @extend %#{$name};
  }

  &__child-2 {
    @extend %#{$name};
  }
}
`;

describe('@mixin placeholder-define($name)', () => {
  it('should throw error if argument "$name" is not string.', async () => {
    const cases = [
      { params: [] },
      { params: ['$name: null'] },
      { params: ['$name: ""'] },
      { params: ['$name: false'] },
      { params: ['$name: #000'] }
    ];

    await eachTestCases(cases, wrapper, ({ error }, { resolve }) => {
      assert(error instanceof Error);
      assert(error.message.match(/Argument \$name is not valid string\./));
      return resolve();
    });
  });

  it('should out inline placeholder class.', async () => {
    const cases = [
      {
        params: ['$name: hoge'],
        expected: '.selector__child-2,.selector__child-1{font-size:16px}'
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

        assert(actual === expected);
        return resolve();
      }
    );
  });
});
