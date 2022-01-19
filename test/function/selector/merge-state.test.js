/* eslint max-len: off, no-magic-numbers: off */

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
  $values: function.selector-merge-state(${args.filter((arg) => arg !== false).join(', ')});

  @each $value in $values {
    content: $value;
  }
}
`;

describe('@function selector-merge-state($type, $additional-selectors)', () => {

  it('should throw error if argument "$type" is not one of type "link", focus", "disabled" or "current".', async () => {
    const cases = [
      {params: [['$type: null']]},
      {params: [['$type: false']]},
      {params: [['$type: #000']]},
      {params: [['$type: hoge']]}
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should return merged selectors if argument "$type" is valid.', async () => {
    const cases = [
      {
        params: [
          ['$type: "link"']
        ],
        expected: '.selector{content:":link";content:":visited"}'
      },
      {
        params: [
          ['$type: "focus"']
        ],
        expected: '.selector{content:":hover";content:":focus";content:".is-focus"}'
      },
      {
        params: [
          ['$type: "selected"']
        ],
        expected: '.selector{content:":checked";content:".is-selected"}'
      },
      {
        params: [
          ['$type: "disabled"']
        ],
        expected: '.selector{content:":disabled";content:".is-disabled"}'
      },
      {
        params: [
          ['$type: "current"']
        ],
        expected: '.selector{content:".is-current"}'
      },
      {
        params: [
          ['$type: "active"']
        ],
        expected: '.selector{content:".is-active"}'
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

  it('should return merged selectors without default value if variable in defaults is not set.', async () => {
    const cases = [
      {
        params: [
          ['$type: "focus"'],
          ['$selector-focus: ""']
        ],
        expected: '.selector{content:":hover";content:":focus"}'
      },
      {
        params: [
          ['$type: "selected"'],
          ['$selector-selected: ""']
        ],
        expected: '.selector{content:":checked"}'
      },
      {
        params: [
          ['$type: "disabled"'],
          ['$selector-disabled: ""']
        ],
        expected: '.selector{content:":disabled"}'
      },
      {
        params: [
          ['$type: "current"'],
          ['$selector-current: ""']
        ],
        expected: ''
      },
      {
        params: [
          ['$type: "active"'],
          ['$selector-active: ""']
        ],
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

  it('should return merged selectors if argument "$additional-selectors" is set.', async () => {
    const cases = [
      {
        params: [
          [
            '$type: "link"',
            '$additional-selectors: (".is-hoge")'
          ]
        ],
        expected: '.selector{content:":link";content:":visited";content:".is-hoge"}'
      },
      {
        params: [
          [
            '$type: "focus"',
            '$additional-selectors: (".is-hoge")'
          ]
        ],
        expected: '.selector{content:":hover";content:":focus";content:".is-focus";content:".is-hoge"}'
      },
      {
        params: [
          [
            '$type: "selected"',
            '$additional-selectors: (".is-hoge")'
          ]
        ],
        expected: '.selector{content:":checked";content:".is-selected";content:".is-hoge"}'
      },
      {
        params: [
          [
            '$type: "disabled"',
            '$additional-selectors: (".is-hoge")'
          ]
        ],
        expected: '.selector{content:":disabled";content:".is-disabled";content:".is-hoge"}'
      },
      {
        params: [
          [
            '$type: "current"',
            '$additional-selectors: (".is-hoge")'
          ]
        ],
        expected: '.selector{content:".is-current";content:".is-hoge"}'
      },
      {
        params: [
          [
            '$type: "active"',
            '$additional-selectors: (".is-hoge")'
          ]
        ],
        expected: '.selector{content:".is-active";content:".is-hoge"}'
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
