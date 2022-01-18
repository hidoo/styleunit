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
  content: function.math-remove-unit(${args.filter((arg) => arg !== false).join(', ')});
}
`;

describe('@function math-remove-unit($number)', () => {

  it('should throw error if argument "$number" is not valid.', async () => {
    const cases = [
      {params: [[]]},
      {params: [['$number: null']]},
      {params: [['$number: false']]},
      {params: [['$number: #000']]}
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should return as it if argument "$number" is number without unit.', async () => {
    const cases = [
      {
        params: [
          [
            '$number: 0'
          ]
        ],
        expected: '.selector{content:0}'
      },
      {
        params: [
          [
            '$number: 7'
          ]
        ],
        expected: '.selector{content:7}'
      },
      {
        params: [
          [
            '$number: 14'
          ]
        ],
        expected: '.selector{content:14}'
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

  it('should return number without unit if argument "$number" is number with unit.', async () => {
    const cases = [
      {
        params: [
          [
            '$number: 0px'
          ]
        ],
        expected: '.selector{content:0}'
      },
      {
        params: [
          [
            '$number: 7px'
          ]
        ],
        expected: '.selector{content:7}'
      },
      {
        params: [
          [
            '$number: 14rem'
          ]
        ],
        expected: '.selector{content:14}'
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
