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
  content: function.color-foreground(${args.filter((arg) => arg !== false).join(', ')});
}
`;

describe('@function color-foreground($background-color, $options)', () => {
  it('should throw error if argument "$background-color" is not valid.', async () => {
    const cases = [
      { params: [[]] },
      { params: [['$background-color: null']] },
      { params: [['$background-color: false']] },
      { params: [['$background-color: 0']] }
    ];

    await eachTestCases(cases, wrapper, ({ error }, { resolve }) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should return foreground color if argument "$background-color" specified.', async () => {
    const cases = [
      {
        params: [['$background-color: #000']],
        expected: '.selector{content:#fff}'
      },
      {
        params: [['$background-color: #333']],
        expected: '.selector{content:#fff}'
      },
      {
        params: [['$background-color: #777']],
        expected: '.selector{content:#fff}'
      },
      {
        params: [['$background-color: #999']],
        expected: '.selector{content:#fff}'
      },
      {
        params: [['$background-color: #aaa']],
        expected: '.selector{content:#000}'
      },
      {
        params: [['$background-color: #ccc']],
        expected: '.selector{content:#000}'
      },
      {
        params: [['$background-color: #fff']],
        expected: '.selector{content:#000}'
      },
      // with $options.threshold
      {
        params: [['$background-color: #000, $options: ("threshold": 30%)']],
        expected: '.selector{content:#fff}'
      },
      {
        params: [['$background-color: #333, $options: ("threshold": 30%)']],
        expected: '.selector{content:#fff}'
      },
      {
        params: [['$background-color: #777, $options: ("threshold": 30%)']],
        expected: '.selector{content:#000}'
      },
      {
        params: [['$background-color: #999, $options: ("threshold": 30%)']],
        expected: '.selector{content:#000}'
      },
      {
        params: [['$background-color: #aaa, $options: ("threshold": 30%)']],
        expected: '.selector{content:#000}'
      },
      {
        params: [['$background-color: #ccc, $options: ("threshold": 30%)']],
        expected: '.selector{content:#000}'
      },
      {
        params: [['$background-color: #fff, $options: ("threshold": 30%)']],
        expected: '.selector{content:#000}'
      },
      // with $options.color-mappings
      {
        params: [
          [
            '$background-color: #fff, $options: ("color-mappings": ("dark": #333))'
          ]
        ],
        expected: '.selector{content:#333}'
      },
      {
        params: [
          [
            '$background-color: #000, $options: ("color-mappings": ("light": #ccc))'
          ]
        ],
        expected: '.selector{content:#ccc}'
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
