/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import {eachTestCases, useSettingsWith} from '../../util';

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
  content: function.list-concat-as-string(${args.filter((arg) => arg !== false).join(', ')});
}
`;

describe('@function list-concat-as-string($list, $separator)', () => {

  it('should throw error if argument "$list" is not valid.', async () => {
    const cases = [
      {params: [['$list: null']]},
      {params: [['$list: false']]},
      {params: [['$list: #000']]}
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should return as concatinated string it if argument "$list" is list.', async () => {
    const cases = [
      {
        params: [
          ['$list: ()']
        ],
        expected: '.selector{content:""}'
      },
      {
        params: [
          ['$list: (0,)']
        ],
        expected: '.selector{content:"0"}'
      },
      {
        params: [
          ['$list: (7, 6)']
        ],
        expected: '.selector{content:"7,6"}'
      },
      {
        params: [
          ['$list: ("a", "b", "c")']
        ],
        expected: '.selector{content:"a,b,c"}'
      },
      // with $separator.
      {
        params: [
          ['$list: ("a", "b", "c"), $separator: ":"']
        ],
        expected: '.selector{content:"a:b:c"}'
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
