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
  content: function.font-size(${args.filter((arg) => arg !== false).join(', ')});
}
`;

describe('@function font-size($value, $options)', () => {

  it('should throw error if argument "$value" is not valid.', async () => {
    const cases = [
      {params: [[]]},
      {params: [['$value: null']]},
      {params: [['$value: false']]},
      {params: [['$value: "normal"']]},
      {params: [['$value: #000']]}
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should throw error if settings.$font-size-presets is not map.', async () => {
    const cases = [
      {
        params: [
          ['$value: null'],
          ['$font-size-presets: ""']
        ]
      }
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should throw error if argument "$value" is keyword and settings.$font-size is not set.', async () => {
    const cases = [
      {
        params: [
          ['$value: "medium"'],
          ['$font-size: ""']
        ]
      }
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should out font-size.', async () => {
    const cases = [
      {
        params: [
          ['$value: 0']
        ],
        expected: '.selector{content:0}'
      },
      {
        params: [
          ['$value: 14px']
        ],
        expected: '.selector{content:14px}'
      },
      {
        params: [
          ['$value: "medium"']
        ],
        expected: '.selector{content:14px}'
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

  it('should out font-size with rem if argument $options.relative-size is true.', async () => {
    const cases = [
      {
        params: [
          ['$value: 0, $options: ("relative-size": true)']
        ],
        expected: '.selector{content:0}'
      },
      {
        params: [
          ['$value: 14px, $options: ("relative-size": true)']
        ],
        expected: '.selector{content:.875rem}'
      },
      {
        params: [
          ['$value: "medium", $options: ("relative-size": true)']
        ],
        expected: '.selector{content:.875rem}'
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

  it('should out font-size smaller than specfied size if argument $options.monospace is true.', async () => {
    const cases = [
      {
        params: [
          ['$value: 0, $options: ("monospace": true)']
        ],
        expected: '.selector{content:0}'
      },
      {
        params: [
          ['$value: 14px, $options: ("monospace": true)']
        ],
        expected: '.selector{content:12px}'
      },
      {
        params: [
          ['$value: "medium", $options: ("monospace": true)']
        ],
        expected: '.selector{content:12px}'
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
