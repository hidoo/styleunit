/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import { eachTestCases, useSettingsWith } from '../../util/index.js';

/**
 * wrapper
 *
 * @param {Array} args arguments
 * @param {Array} settings settings of defaults
 * @return {String}
 */
const wrapper = (args = [], settings = []) => `
${useSettingsWith(settings)}
@use "src/lib/function";

.selector {
  content: function.math-px-to-rem(${args.filter((arg) => arg !== false).join(', ')});
}
`;

describe('@function math-px-to-rem($size, $base-size)', () => {
  it('should throw error if argument "$size" is not valid.', async () => {
    const cases = [
      { params: [[]] },
      { params: [['$size: null']] },
      { params: [['$size: false']] },
      { params: [['$size: 14em']] },
      { params: [['$size: #000']] }
    ];

    await eachTestCases(cases, wrapper, ({ error }, { resolve }) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should throw error if argument "$base-size" is not valid.', async () => {
    const cases = [
      { params: [['$size: 14px', '$base-size: 14em']] },
      { params: [['$size: 14px', '$base-size: #000']] }
    ];

    await eachTestCases(cases, wrapper, ({ error }, { resolve }) => {
      assert(error instanceof Error);
      assert(error.message.match(/Argument \$base-size is not valid number\./));
      return resolve();
    });
  });

  it('should return 0 if argument "$size" is 0.', async () => {
    const cases = [
      {
        params: [['$size: 0', '$base-size: 10px']],
        expected: '.selector{content:0}'
      },
      {
        params: [['$size: 0', '$base-size: 12px']],
        expected: '.selector{content:0}'
      },
      {
        params: [['$size: 0', '$base-size: 14px']],
        expected: '.selector{content:0}'
      },
      {
        params: [['$size: 0', '$base-size: 16px']],
        expected: '.selector{content:0}'
      },
      {
        params: [['$size: 0', '$base-size: 18px']],
        expected: '.selector{content:0}'
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

  it('should use value of settings.$font-base-size if argument "$base-size" is not set.', async () => {
    const cases = [
      {
        params: [['$size: 20px', null], ['$font-base-size: 20px']],
        expected: '.selector{content:1rem}'
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

  it('should return value of "rem" that converted from "px".', async () => {
    const cases = [
      {
        params: [['$size: 14px', '$base-size: 10px']],
        expected: '.selector{content:1.4rem}'
      },
      {
        params: [['$size: 14px', '$base-size: 12px']],
        expected: '.selector{content:1.1666666667rem}'
      },
      {
        params: [['$size: 14px', '$base-size: 14px']],
        expected: '.selector{content:1rem}'
      },
      {
        params: [['$size: 14px', '$base-size: 16px']],
        expected: '.selector{content:.875rem}'
      },
      {
        params: [['$size: 14px', '$base-size: 18px']],
        expected: '.selector{content:.7777777778rem}'
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
