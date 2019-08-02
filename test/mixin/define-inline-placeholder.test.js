/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import {eachTestCases} from 'test-util';

describe('@mixin define-placeholder($name)', () => {

  /**
   * wrapper
   * @param {String|Null} name name of placeholder class
   * @return {String}
   */
  function wrapper(name) {
    return `
@import "src/lib/mixin/define-placeholder";

.selector {
  $name: ${name};

  @include define-placeholder($name: $name) {
    font-size: 16px;
  }

  // ignore multiple define
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
    `;
  }

  it('should throw error if argument "$name" is not string.', async () => {
    const cases = [
      {params: [null]},
      {params: ['null']},
      {params: ['false']},
      {params: ['#000']}
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should out inline placeholder class.', async () => {
    const cases = [
      {
        params: ['hoge'],
        expected: '.selector__child-1, .selector__child-2 { font-size: 16px; }'
      }
    ];

    await eachTestCases(cases, wrapper, ({error, result, expected}, {resolve, reject}) => {
      if (error) {
        return reject(error);
      }

      const actual = result.css.toString().trim();

      assert(actual === expected);
      return resolve();
    });
  });

});
