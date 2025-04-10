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
@use "sass:meta";
@use "sass:string";
@use "src/lib/function";

.selector {
  content: function.list-map(${args.filter((arg) => arg !== false).join(', ')});
}
`;

describe('@function list-map($list, $callback, $options)', () => {
  it('should throw error if argument "$list" is not valid.', async () => {
    const cases = [
      { params: [['$list: null']] },
      { params: [['$list: false']] },
      { params: [['$list: #000']] }
    ];

    await eachTestCases(cases, wrapper, ({ error }, { resolve }) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should throw error if argument "$callback" is not valid.', async () => {
    const cases = [
      { params: [['$list: ("a",), $callback: null']] },
      { params: [['$list: ("a",), $callback: false']] },
      { params: [['$list: ("a",), $callback: #000']] }
    ];

    await eachTestCases(cases, wrapper, ({ error }, { resolve }) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should return list each processed by $callback it if argument "$list" is list and $callback is function.', async () => {
    const cases = [
      {
        params: [
          [
            '$list: ("a",)',
            '$callback: meta.get-function("length", $module: "string")'
          ]
        ],
        expected: '.selector{content:1}'
      },
      {
        params: [
          [
            '$list: ("hoge", "fuga", "pi", "yo")',
            '$callback: meta.get-function("length", $module: "string")'
          ]
        ],
        expected: '.selector{content:4 4 2 2}'
      },
      // with $options.separator
      {
        params: [
          [
            '$list: ("hoge", "fuga", "pi", "yo")',
            '$callback: meta.get-function("length", $module: "string")',
            '$options: ("separator": slash)'
          ]
        ],
        expected: '.selector{content:4/4/2/2}'
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
