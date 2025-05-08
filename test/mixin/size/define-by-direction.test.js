/* eslint max-len: 0, no-magic-numbers: 0 */

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
@use "src/lib/mixin";

.selector {
  @include mixin.size-define-by-direction(${args.filter((arg) => arg !== false).join(',')});
}
`;

describe('@mixin size-define-by-direction($type, $values, $breakpoints)', () => {
  it('should throw error if argument "$type" is not valid.', async () => {
    const cases = [
      { params: [['$type: null']] },
      { params: [['$type: false']] },
      { params: [['$type: 14px']] },
      { params: [['$type: #000']] },
      { params: [['$type: "_margin"']] },
      { params: [['$type: "_padding"']] },
      { params: [['$type: "_position"']] },
      { params: [['$type: "_border"']] }
    ];

    await eachTestCases(cases, wrapper, ({ error }, { resolve }) => {
      assert(error instanceof Error);
      assert(error.message.match(/Argument \$type must be one of/));
      return resolve();
    });
  });

  it('should throw error if argument "$values" is not valid.', async () => {
    const cases = [
      { params: [['$values: null']] },
      { params: [['$values: false']] },
      { params: [['$values: 14px']] },
      { params: [['$values: #000']] }
    ];

    await eachTestCases(cases, wrapper, ({ error }, { resolve }) => {
      assert(error instanceof Error);
      assert(error.message.match(/Argument \$values must be list\./));
      return resolve();
    });
  });

  it('should throw error if argument "$type" is "border" and argument item of "$values" is not map or invalid.', async () => {
    const cases = [
      { params: [['$type: "border"', '$values: (10rem,)']] },
      { params: [['$type: "border"', '$values: (("nameless": "hoge"),)']] }
    ];

    await eachTestCases(cases, wrapper, ({ error }, { resolve }) => {
      assert(error instanceof Error);
      assert(
        error.message.match(/Argument \$values is not valid list of map\./)
      );
      return resolve();
    });
  });

  it('should out options each by direction.', async () => {
    const cases = [
      {
        params: [['$type: "margin"', '$values: (5px, -5em)']],
        expected: [
          '.selector-top-5{margin-top:5px !important}',
          '.selector-top-5-{margin-top:-5em !important}',
          '.selector-right-5{margin-right:5px !important}',
          '.selector-right-5-{margin-right:-5em !important}',
          '.selector-bottom-5{margin-bottom:5px !important}',
          '.selector-bottom-5-{margin-bottom:-5em !important}',
          '.selector-left-5{margin-left:5px !important}',
          '.selector-left-5-{margin-left:-5em !important}'
        ].join('')
      },
      {
        params: [['$type: "padding"', '$values: (10rem,)']],
        expected: [
          '.selector-top-10{padding-top:10rem !important}',
          '.selector-right-10{padding-right:10rem !important}',
          '.selector-bottom-10{padding-bottom:10rem !important}',
          '.selector-left-10{padding-left:10rem !important}'
        ].join('')
      },
      {
        params: [['$type: "position"', '$values: (5px, -5em)']],
        expected: [
          '.selector-top-5{top:5px !important}',
          '.selector-top-5-{top:-5em !important}',
          '.selector-right-5{right:5px !important}',
          '.selector-right-5-{right:-5em !important}',
          '.selector-bottom-5{bottom:5px !important}',
          '.selector-bottom-5-{bottom:-5em !important}',
          '.selector-left-5{left:5px !important}',
          '.selector-left-5-{left:-5em !important}'
        ].join('')
      },
      {
        params: [
          [
            '$type: "border"',
            '$values: (("name": "example", "size": 2px, "style": dashed, "color": #ccc),)'
          ]
        ],
        expected: [
          '.selector-top-example{border-top:2px dashed #ccc !important}',
          '.selector-right-example{border-right:2px dashed #ccc !important}',
          '.selector-bottom-example{border-bottom:2px dashed #ccc !important}',
          '.selector-left-example{border-left:2px dashed #ccc !important}'
        ].join('')
      },
      {
        params: [
          ['$type: "border"', '$values: (("name": "example-default-value"),)']
        ],
        expected: [
          '.selector-top-example-default-value{border-top:1px solid #000 !important}',
          '.selector-right-example-default-value{border-right:1px solid #000 !important}',
          '.selector-bottom-example-default-value{border-bottom:1px solid #000 !important}',
          '.selector-left-example-default-value{border-left:1px solid #000 !important}'
        ].join('')
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

  it('should out options each by direction with breakpoints.', async () => {
    const cases = [
      {
        params: [
          [
            '$type: "margin"',
            '$values: (5px, -5em)',
            '$breakpoints: ("if-mobile": ("until": 667px))'
          ]
        ],
        expected: [
          '.selector-top-5{margin-top:5px !important}',
          '@media only screen and (max-width: 666px){.selector-top-5-if-mobile{margin-top:5px !important}}',
          '.selector-top-5-{margin-top:-5em !important}',
          '@media only screen and (max-width: 666px){.selector-top-5--if-mobile{margin-top:-5em !important}}',
          '.selector-right-5{margin-right:5px !important}',
          '@media only screen and (max-width: 666px){.selector-right-5-if-mobile{margin-right:5px !important}}',
          '.selector-right-5-{margin-right:-5em !important}',
          '@media only screen and (max-width: 666px){.selector-right-5--if-mobile{margin-right:-5em !important}}',
          '.selector-bottom-5{margin-bottom:5px !important}',
          '@media only screen and (max-width: 666px){.selector-bottom-5-if-mobile{margin-bottom:5px !important}}',
          '.selector-bottom-5-{margin-bottom:-5em !important}',
          '@media only screen and (max-width: 666px){.selector-bottom-5--if-mobile{margin-bottom:-5em !important}}',
          '.selector-left-5{margin-left:5px !important}',
          '@media only screen and (max-width: 666px){.selector-left-5-if-mobile{margin-left:5px !important}}',
          '.selector-left-5-{margin-left:-5em !important}',
          '@media only screen and (max-width: 666px){.selector-left-5--if-mobile{margin-left:-5em !important}}'
        ].join('')
      },
      {
        params: [
          [
            '$type: "padding"',
            '$values: (10rem,)',
            '$breakpoints: ("if-mobile": ("until": 667px))'
          ]
        ],
        expected: [
          '.selector-top-10{padding-top:10rem !important}',
          '@media only screen and (max-width: 666px){.selector-top-10-if-mobile{padding-top:10rem !important}}',
          '.selector-right-10{padding-right:10rem !important}',
          '@media only screen and (max-width: 666px){.selector-right-10-if-mobile{padding-right:10rem !important}}',
          '.selector-bottom-10{padding-bottom:10rem !important}',
          '@media only screen and (max-width: 666px){.selector-bottom-10-if-mobile{padding-bottom:10rem !important}}',
          '.selector-left-10{padding-left:10rem !important}',
          '@media only screen and (max-width: 666px){.selector-left-10-if-mobile{padding-left:10rem !important}}'
        ].join('')
      },
      {
        params: [
          [
            '$type: "position"',
            '$values: (5px, -5em)',
            '$breakpoints: ("if-mobile": ("until": 667px))'
          ]
        ],
        expected: [
          '.selector-top-5{top:5px !important}',
          '@media only screen and (max-width: 666px){.selector-top-5-if-mobile{top:5px !important}}',
          '.selector-top-5-{top:-5em !important}',
          '@media only screen and (max-width: 666px){.selector-top-5--if-mobile{top:-5em !important}}',
          '.selector-right-5{right:5px !important}',
          '@media only screen and (max-width: 666px){.selector-right-5-if-mobile{right:5px !important}}',
          '.selector-right-5-{right:-5em !important}',
          '@media only screen and (max-width: 666px){.selector-right-5--if-mobile{right:-5em !important}}',
          '.selector-bottom-5{bottom:5px !important}',
          '@media only screen and (max-width: 666px){.selector-bottom-5-if-mobile{bottom:5px !important}}',
          '.selector-bottom-5-{bottom:-5em !important}',
          '@media only screen and (max-width: 666px){.selector-bottom-5--if-mobile{bottom:-5em !important}}',
          '.selector-left-5{left:5px !important}',
          '@media only screen and (max-width: 666px){.selector-left-5-if-mobile{left:5px !important}}',
          '.selector-left-5-{left:-5em !important}',
          '@media only screen and (max-width: 666px){.selector-left-5--if-mobile{left:-5em !important}}'
        ].join('')
      },
      {
        params: [
          [
            '$type: "border"',
            '$values: (("name": "example", "size": 2px, "style": dashed, "color": #ccc),)',
            '$breakpoints: ("if-mobile": ("until": 667px))'
          ]
        ],
        expected: [
          '.selector-top-example{border-top:2px dashed #ccc !important}',
          '@media only screen and (max-width: 666px){.selector-top-example-if-mobile{border-top:2px dashed #ccc !important}}',
          '.selector-right-example{border-right:2px dashed #ccc !important}',
          '@media only screen and (max-width: 666px){.selector-right-example-if-mobile{border-right:2px dashed #ccc !important}}',
          '.selector-bottom-example{border-bottom:2px dashed #ccc !important}',
          '@media only screen and (max-width: 666px){.selector-bottom-example-if-mobile{border-bottom:2px dashed #ccc !important}}',
          '.selector-left-example{border-left:2px dashed #ccc !important}',
          '@media only screen and (max-width: 666px){.selector-left-example-if-mobile{border-left:2px dashed #ccc !important}}'
        ].join('')
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
