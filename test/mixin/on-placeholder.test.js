/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import {eachTestCases} from 'test-util';

describe('@mixin on-placeholder(...)', () => {

  /**
   * wrapper
   * @return {String}
   */
  function wrapper() {
    const args = [];

    return `
@import "src/lib/mixin/define-placeholder";
@import "src/lib/mixin/on";
@import "src/lib/mixin/on-placeholder";

.selector {
  @include on-placeholder(${args.filter((arg) => arg !== false).join(', ')}) {
    font-size: 16px;
  };
}
    `;
  }

  it('should out placeholder selectors.', async () => {
    const cases = [
      {
        params: [{}],
        expected: [
          '.selector::-webkit-input-placeholder { font-size: 16px; }',
          '.selector::-moz-placeholder { font-size: 16px; }',
          '.selector:-ms-input-placeholder { font-size: 16px; }',
          '.selector:placeholder-shown { font-size: 16px; }'
        ].join('\n\n')
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
