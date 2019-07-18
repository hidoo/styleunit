/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import {eachTestCases} from '@hidoo/unit-test-util';

describe('@mixin define-sizes-in-direction-groups($type, $values)', () => {

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
@import "src/lib/mixin/define-sizes-in-direction-groups";

.selector {
  @include define-sizes-in-direction-groups(${args.filter((arg) => arg !== false).join(',')});
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
      {params: ['margin', 'null']},
      {params: ['margin', 'false']},
      {params: ['margin', '14px']},
      {params: ['margin', '#000']}
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
          '.selector-vertical-5 { margin-top: 5px !important; margin-bottom: 5px !important; }',
          '.selector-vertical-5- { margin-top: -5em !important; margin-bottom: -5em !important; }',
          '.selector-horizontal-5 { margin-right: 5px !important; margin-left: 5px !important; }',
          '.selector-horizontal-5- { margin-right: -5em !important; margin-left: -5em !important; }',
          '.selector-all-5 { margin-top: 5px !important; margin-right: 5px !important; margin-bottom: 5px !important; margin-left: 5px !important; }',
          '.selector-all-5- { margin-top: -5em !important; margin-right: -5em !important; margin-bottom: -5em !important; margin-left: -5em !important; }'
        ].join('\n\n')
      },
      {
        params: ['padding', '(10rem,)'],
        expected: [
          '.selector-vertical-10 { padding-top: 10rem !important; padding-bottom: 10rem !important; }',
          '.selector-horizontal-10 { padding-right: 10rem !important; padding-left: 10rem !important; }',
          '.selector-all-10 { padding-top: 10rem !important; padding-right: 10rem !important; padding-bottom: 10rem !important; padding-left: 10rem !important; }'
        ].join('\n\n')
      },
      {
        params: ['position', '(5px, -5em)'],
        expected: [
          '.selector-vertical-5 { top: 5px !important; bottom: 5px !important; }',
          '.selector-vertical-5- { top: -5em !important; bottom: -5em !important; }',
          '.selector-horizontal-5 { right: 5px !important; left: 5px !important; }',
          '.selector-horizontal-5- { right: -5em !important; left: -5em !important; }',
          '.selector-all-5 { top: 5px !important; right: 5px !important; bottom: 5px !important; left: 5px !important; }',
          '.selector-all-5- { top: -5em !important; right: -5em !important; bottom: -5em !important; left: -5em !important; }'
        ].join('\n\n')
      },
      {
        params: ['border', '(("name": "example", "size": 2px, "style": dashed, "color": #ccc),)'],
        expected: [
          '.selector-vertical-example { border-top: 2px dashed #ccc !important; border-bottom: 2px dashed #ccc !important; }',
          '.selector-horizontal-example { border-right: 2px dashed #ccc !important; border-left: 2px dashed #ccc !important; }',
          '.selector-all-example { border-top: 2px dashed #ccc !important; border-right: 2px dashed #ccc !important; border-bottom: 2px dashed #ccc !important; border-left: 2px dashed #ccc !important; }'
        ].join('\n\n')
      },
      {
        params: ['border', '(("name": "example-default-value"),)'],
        expected: [
          '.selector-vertical-example-default-value { border-top: 1px solid #000 !important; border-bottom: 1px solid #000 !important; }',
          '.selector-horizontal-example-default-value { border-right: 1px solid #000 !important; border-left: 1px solid #000 !important; }',
          '.selector-all-example-default-value { border-top: 1px solid #000 !important; border-right: 1px solid #000 !important; border-bottom: 1px solid #000 !important; border-left: 1px solid #000 !important; }'
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
