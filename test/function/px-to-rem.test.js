/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import {eachTestCases} from 'test-util';

describe('@function px-to-rem($size, $base-size)', () => {

  /**
   * wrapper
   * @param {Number} size font size
   * @param {Number} baseSize base font size
   * @return {Number}
   */
  function wrapper(size, baseSize) {
    const args = [
      size || size === 0 ? `$size: ${size}` : false,
      baseSize || baseSize === 0 ? `$base-size: ${baseSize}` : false
    ];

    return `
$unit-font-base-size: 16px;
@import "src/lib/function/px-to-rem";

p {
  content: px-to-rem(${args.filter((arg) => arg !== false).join(',')});
}
    `;
  }

  it('should throw error if argument "$size" is not valid.', async () => {
    const cases = [
      {params: ['null']},
      {params: ['false']},
      {params: ['14em']},
      {params: ['#000']}
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should throw error if argument "$base-size" is not valid.', async () => {
    const cases = [
      {params: ['null']},
      {params: ['false']},
      {params: ['14em']},
      {params: ['#000']}
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should return 0 if argument "$size" is 0.', async () => {
    const cases = [
      {
        params: [0, '10px'],
        expected: 'p { content: 0; }'
      },
      {
        params: [0, '12px'],
        expected: 'p { content: 0; }'
      },
      {
        params: [0, '14px'],
        expected: 'p { content: 0; }'
      },
      {
        params: [0, '16px'],
        expected: 'p { content: 0; }'
      },
      {
        params: [0, '18px'],
        expected: 'p { content: 0; }'
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

  it('should use value of $unit-font-base-size if argument "$base-size" is not set.', async () => {
    const cases = [
      {
        params: ['16px', null],
        expected: 'p { content: 1rem; }'
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

  it('should return value of "rem" that converted from "px".', async () => {
    const cases = [
      {
        params: ['14px', '10px'],
        expected: 'p { content: 1.4rem; }'
      },
      {
        params: ['14px', '12px'],
        expected: 'p { content: 1.16667rem; }'
      },
      {
        params: ['14px', '14px'],
        expected: 'p { content: 1rem; }'
      },
      {
        params: ['14px', '16px'],
        expected: 'p { content: 0.875rem; }'
      },
      {
        params: ['14px', '18px'],
        expected: 'p { content: 0.77778rem; }'
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
