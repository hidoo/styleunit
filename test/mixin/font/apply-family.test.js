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
@use "src/lib/mixin";

.selector {
  @include mixin.font-apply-family(${args.filter((arg) => arg !== false).join(', ')});
}
`;

describe('@mixin font-apply-family(...)', () => {
  it('should throw error if argument "$value" is empty.', async () => {
    const cases = [
      { params: [[]] },
      { params: [['$value: null']] },
      { params: [['$value: ""']] },
      { params: [['$value: 0']] },
      { params: [['$value: ()']] }
    ];

    await eachTestCases(cases, wrapper, ({ error }, { resolve }) => {
      assert(error instanceof Error);
      assert(error.message.match(/Argument \$value must not be empty\./));
      return resolve();
    });
  });

  it('should throw error if argument "$value" is not list or string.', async () => {
    const cases = [
      { params: [['$value: 1']] },
      { params: [['$value: ("x": "")']] }
    ];

    await eachTestCases(cases, wrapper, ({ error }, { resolve }) => {
      assert(error instanceof Error);
      assert(error.message.match(/Argument \$value must be list or string\./));
      return resolve();
    });
  });

  it('should throw error if argument "$value" is "default" and settings.$font-family is not set.', async () => {
    const cases = [
      {
        params: [['$value: "default"'], ['$font-family: ""']]
      }
    ];

    await eachTestCases(cases, wrapper, ({ error }, { resolve }) => {
      assert(error instanceof Error);
      assert(error.message.match(/settings\.\$font-family is not valid\./));
      return resolve();
    });
  });

  it('should throw error if argument "$value" is "monospace" and settings.$font-family-monospace is not defined.', async () => {
    const cases = [
      {
        params: [['$value: "monospace"'], ['$font-family-monospace: ""']]
      }
    ];

    await eachTestCases(cases, wrapper, ({ error }, { resolve }) => {
      assert(error instanceof Error);
      assert(
        error.message.match(/settings\.\$font-family-monospace is not valid\./)
      );
      return resolve();
    });
  });

  it('should out font-family.', async () => {
    const cases = [
      {
        params: [['$value: (serif,)']],
        expected: '.selector{font-family:serif}'
      },
      {
        params: [['$value: "default"']],
        expected:
          '.selector{font-family:-apple-system,BlinkMacSystemFont,Helvetica,Arial,"Hiragino Kaku Gothic ProN","Yu Gothic Medium","游ゴシック Medium",YuGothic,Meiryo,"メイリオ",sans-serif}'
      },
      {
        params: [['$value: "monospace"']],
        expected:
          '.selector{font-family:Consolas,Monaco,Menlo,Courier,monospace}'
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

  it('should out font-family with !important if argument $important is true.', async () => {
    const cases = [
      {
        params: [['$value: (serif,)', '$important: true']],
        expected: '.selector{font-family:serif !important}'
      },
      {
        params: [['$value: "default"', '$important: true']],
        expected:
          '.selector{font-family:-apple-system,BlinkMacSystemFont,Helvetica,Arial,"Hiragino Kaku Gothic ProN","Yu Gothic Medium","游ゴシック Medium",YuGothic,Meiryo,"メイリオ",sans-serif !important}'
      },
      {
        params: [['$value: "monospace"', '$important: true']],
        expected:
          '.selector{font-family:Consolas,Monaco,Menlo,Courier,monospace !important}'
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
});
