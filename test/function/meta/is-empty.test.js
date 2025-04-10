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
@use "sass:map";
@use "src/lib/function";

.selector {
  content: function.meta-is-empty(${args.filter((arg) => arg !== false).join(', ')});
}
`;

describe('@function meta-is-empty($value)', () => {
  it('should return $value is empty or not.', async () => {
    const cases = [
      // empty
      {
        params: [[]],
        expected: '.selector{content:true}'
      },
      {
        params: [['$value: null']],
        expected: '.selector{content:true}'
      },
      {
        params: [['$value: ""']],
        expected: '.selector{content:true}'
      },
      {
        params: [['$value: 0']],
        expected: '.selector{content:true}'
      },
      {
        // empty list
        params: [['$value: ()']],
        expected: '.selector{content:true}'
      },
      {
        // empty map
        params: [['$value: map.remove(("x": ""), "x")']],
        expected: '.selector{content:true}'
      },
      // not empty
      {
        params: [['$value: "hoge"']],
        expected: '.selector{content:false}'
      },
      {
        params: [['$value: 1']],
        expected: '.selector{content:false}'
      },
      {
        params: [['$value: ("",)']],
        expected: '.selector{content:false}'
      },
      {
        params: [['$value: ("x": "")']],
        expected: '.selector{content:false}'
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
