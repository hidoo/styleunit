/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import {eachTestCases} from 'test-util';

describe('@mixin define-sizes-in-directions($type, $values)', () => {

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
@import "src/lib/mixin/define-sizes-in-directions";

.selector {
  @include define-sizes-in-directions(${args.filter((arg) => arg !== false).join(',')});
}
    `;
  }

  it('should throw error if argument "$type" is not valid.', async () => {
    const cases = [
      {params: ['null']},
      {params: ['false']},
      {params: ['14px']},
      {params: ['#000']},
      {params: ['_margin']},
      {params: ['_padding']},
      {params: ['_position']},
      {params: ['_border']}
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

  it('should throw error if argument "$type" is "border" and argument item of "$values" is not map or invalid.', async () => {
    const cases = [
      {params: ['border', '(10rem,)']},
      {params: ['border', '(("nameless": "hoge")),)']}
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should out options each by direction.', async () => {
    const cases = [
      {
        params: ['margin', '(5px, -5em)'],
        expected: [
          '.selector-top-5 { margin-top: 5px !important; }',
          '.selector-top-5- { margin-top: -5em !important; }',
          '.selector-right-5 { margin-right: 5px !important; }',
          '.selector-right-5- { margin-right: -5em !important; }',
          '.selector-bottom-5 { margin-bottom: 5px !important; }',
          '.selector-bottom-5- { margin-bottom: -5em !important; }',
          '.selector-left-5 { margin-left: 5px !important; }',
          '.selector-left-5- { margin-left: -5em !important; }'
        ].join('\n\n')
      },
      {
        params: ['padding', '(10rem,)'],
        expected: [
          '.selector-top-10 { padding-top: 10rem !important; }',
          '.selector-right-10 { padding-right: 10rem !important; }',
          '.selector-bottom-10 { padding-bottom: 10rem !important; }',
          '.selector-left-10 { padding-left: 10rem !important; }'
        ].join('\n\n')
      },
      {
        params: ['position', '(5px, -5em)'],
        expected: [
          '.selector-top-5 { top: 5px !important; }',
          '.selector-top-5- { top: -5em !important; }',
          '.selector-right-5 { right: 5px !important; }',
          '.selector-right-5- { right: -5em !important; }',
          '.selector-bottom-5 { bottom: 5px !important; }',
          '.selector-bottom-5- { bottom: -5em !important; }',
          '.selector-left-5 { left: 5px !important; }',
          '.selector-left-5- { left: -5em !important; }'
        ].join('\n\n')
      },
      {
        params: ['border', '(("name": "example", "size": 2px, "style": dashed, "color": #ccc),)'],
        expected: [
          '.selector-top-example { border-top: 2px dashed #ccc !important; }',
          '.selector-right-example { border-right: 2px dashed #ccc !important; }',
          '.selector-bottom-example { border-bottom: 2px dashed #ccc !important; }',
          '.selector-left-example { border-left: 2px dashed #ccc !important; }'
        ].join('\n\n')
      },
      {
        params: ['border', '(("name": "example-default-value"),)'],
        expected: [
          '.selector-top-example-default-value { border-top: 1px solid #000 !important; }',
          '.selector-right-example-default-value { border-right: 1px solid #000 !important; }',
          '.selector-bottom-example-default-value { border-bottom: 1px solid #000 !important; }',
          '.selector-left-example-default-value { border-left: 1px solid #000 !important; }'
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
