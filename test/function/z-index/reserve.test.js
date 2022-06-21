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
  content: function.z-index-reserve(${args.filter((arg) => arg !== false).join(', ')});
}
`;

describe('@function z-index-reserve($type, $index, $options)', () => {

  it('should throw an error if argument "$type" is not valid.', async () => {
    const cases = [
      {params: [[]]},
      {params: [['$type: null']]},
      {params: [['$type: false']]},
      {params: [['$type: 0']]},
      {params: [['$type: #000']]}
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should throw an error if argument "$index" is not valid.', async () => {
    const cases = [
      {params: [[]]},
      {params: [['$type: "main"', '$index: null']]},
      {params: [['$type: "main"', '$index: false']]},
      {params: [['$type: "main"', '$index: ""']]},
      {params: [['$type: "main"', '$index: #000']]}
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should throw an error if argument "$index" value is already used.', async () => {
    const cases = [
      {params: [['$type: "main"', '$index: 100']]}
    ];

    const wrap = (args, settings) => {
      const code = wrapper(args, settings);

      return `
        ${code}

.selector2 {
  content: function.z-index-reserve(${args.filter((arg) => arg !== false).join(', ')});
}
`;
    };

    await eachTestCases(cases, wrap, ({error}, {resolve}) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should throw an error if argument "$index" value is outside the range specified by argument "$type".', async () => {
    const cases = [
      {params: [['$type: "main"', '$index: 5000']]},
      {params: [['$type: "floating"', '$index: 1999999']]}
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should return a unique z-index value.', async () => {
    const cases = [
      {
        params: [
          ['$type: "main"', '$index: 0']
        ],
        expected: `.selector{content:0}`
      },
      {
        params: [
          ['$type: "main"', '$index: 100']
        ],
        expected: `.selector{content:100}`
      },
      {
        params: [
          ['$type: "floating"', '$index: 0']
        ],
        expected: `.selector{content:2000000}`
      },
      {
        params: [
          ['$type: "floating"', '$index: 100']
        ],
        expected: `.selector{content:2000100}`
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
