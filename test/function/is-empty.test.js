/* eslint max-len: off, no-magic-numbers: off */

import assert from 'assert';
import {eachTestCases, useSettingsWith} from '../util';

/**
 * wrapper
 *
 * @param {Array} settings settings of defaults
 * @return {String}
 */
const wrapper = (settings = []) => `
${useSettingsWith(settings)}
@use "sass:meta";
@use "src/lib/function";

.selector {
  content: meta.function-exists("is-empty", "function");
}
`;

describe('[DEPRECATED] @function is-empty($value)', () => {

  it('should exists.', async () => {
    const cases = [
      {
        params: [[]],
        expected: '.selector{content:true}'
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
