/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import eachTestCases from '../fixture/eachTestCases';

describe('@mixin define-sizes($type, $values)', () => {

  /**
   * wrapper
   * @param {String} type type of property
   * @param {String} values list of value (conma separated value)
   * @return {String}
   */
  function wrapper(type, values) {
    const args = [
      type || type === '' ? `$type: ${type}` : false,
      values || values === '' ? `$values: ${values}` : false
    ];

    return `
@import "src/lib/function";
@import "src/lib/mixin/define-sizes";

.selector {
  @include define-sizes(${args.filter((arg) => arg !== false).join(',')});
}
    `;
  }

  it('should throw error if argument "$type" is not valid.', async () => {
    const cases = [
      {params: ['null']},
      {params: ['false']},
      {params: ['14px']},
      {params: ['#000']},
      {params: ['_width']},
      {params: ['_height']},
      {params: ['_z-index']}
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should throw error if argument "$values" is not valid.', async () => {
    const cases = [
      {params: ['null']},
      {params: ['false']},
      {params: ['14px']},
      {params: ['#000']}
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should out options each by size.', async () => {
    const cases = [
      {
        params: ['width', '(10rem,)'],
        expected: [
          '.selector-10 { width: 10rem !important; }',
          '.selector-min-10 { min-width: 10rem !important; }',
          '.selector-max-10 { max-width: 10rem !important; }'
        ].join('\n\n')
      },
      {
        params: ['height', '(10px, 20px)'],
        expected: [
          '.selector-10 { height: 10px !important; }',
          '.selector-min-10 { min-height: 10px !important; }',
          '.selector-max-10 { max-height: 10px !important; }',
          '.selector-20 { height: 20px !important; }',
          '.selector-min-20 { min-height: 20px !important; }',
          '.selector-max-20 { max-height: 20px !important; }'
        ].join('\n\n')
      },
      {
        params: ['z-index', '(5, 10)'],
        expected: [
          '.selector-5 { z-index: 5 !important; }',
          '.selector-10 { z-index: 10 !important; }'
        ].join('\n\n')
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
