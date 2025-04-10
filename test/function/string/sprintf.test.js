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
@use "src/lib/function";

.selector {
  content: function.string-sprintf(${args.filter((arg) => arg !== false).join(', ')});
}
`;

describe('@function string-sprintf($format, $args...)', () => {
  it('should throw error if argument "$format" is not valid.', async () => {
    const cases = [
      { params: [[]] },
      { params: [['$format: null']] },
      { params: [['$format: false']] },
      { params: [['$format: 0']] },
      { params: [['$format: #000']] }
    ];

    await eachTestCases(cases, wrapper, ({ error }, { resolve }) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should out formatted string.', async () => {
    const cases = [
      {
        params: [['"buzz: %s, fuzz: %o"', '"buzz"']],
        expected: '.selector{content:"buzz: buzz, fuzz: %o"}'
      },
      {
        params: [['"buzz: %s, fuzz: %o"', '"buzz", 0.1']],
        expected: '.selector{content:"buzz: buzz, fuzz: 0.1"}'
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
