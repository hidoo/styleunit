/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import {eachTestCases, useSettingsWith} from '../util';

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
  @include mixin.on(${args.filter((arg) => arg !== false).join(', ')}) {
    font-size: 16px;
  };
}
`;

describe('@mixin on ($selectors, $capturing-selectors)', () => {

  it('should not out if argument $selectors is not set.', async () => {
    const cases = [
      {
        params: [[]],
        expected: ''
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

  it('should out with specified selectors if argument $selectors is set.', async () => {
    const cases = [
      {
        params: [['$selectors: (":hover")']],
        expected: '.selector:hover{font-size:16px}'
      },
      {
        params: [['$selectors: (":hover", ".is-hover")']],
        expected: '.selector.is-hover,.selector:hover{font-size:16px}'
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

  it('should out capturing settings with specified selectors if argument $capturing-selectors is set and argument $capturing-selectors is true.', async () => {
    const cases = [
      {
        params: [
          [
            '$selectors: (":hover")',
            '$capturing-selectors: ("a", "button")'
          ]
        ],
        expected: 'button:hover .selector,a:hover .selector,.selector:hover{font-size:16px}'
      },
      {
        params: [
          [
            '$selectors: (":hover", ".is-hover")',
            '$capturing-selectors: ("a", "button")'
          ]
        ],
        expected: 'button.is-hover .selector,button:hover .selector,a.is-hover .selector,a:hover .selector,.selector.is-hover,.selector:hover{font-size:16px}'
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
