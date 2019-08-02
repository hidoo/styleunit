/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import {eachTestCases} from 'test-util';

describe('@function ununit($number)', () => {

  /**
   * wrapper
   * @param {Number} number font size
   * @return {String}
   */
  function wrapper(number) {
    const args = [
      number || number === 0 ? `$number: ${number}` : false
    ];

    return `
@import "src/lib/function/ununit";

p {
  content: ununit(${args.filter((arg) => arg !== false).join(',')});
}
    `;
  }

  it('should throw error if argument "$number" is not valid.', async () => {
    const cases = [
      {params: ['null']},
      {params: ['false']},
      {params: ['#000']}
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should return as it if argument "$number" is number without unit.', async () => {
    const cases = [
      {
        params: [0],
        expected: 'p { content: 0; }'
      },
      {
        params: [7],
        expected: 'p { content: 7; }'
      },
      {
        params: [14],
        expected: 'p { content: 14; }'
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
        params: ['0px'],
        expected: 'p { content: 0; }'
      },
      {
        params: ['7px'],
        expected: 'p { content: 7; }'
      },
      {
        params: ['14rem'],
        expected: 'p { content: 14; }'
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
