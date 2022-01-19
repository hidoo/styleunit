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
@use "src/lib/mixin";

.selector {
  @include mixin.size-define-by-direction-group(${args.filter((arg) => arg !== false).join(',')});
}
`;

describe('@mixin size-define-by-direction-group($type, $values, $breakpoints)', () => {

  it('should throw error if argument "$type" is not valid.', async () => {
    const cases = [
      {params: [['$type: null']]},
      {params: [['$type: false']]},
      {params: [['$type: 14px']]},
      {params: [['$type: #000']]},
      {params: [['$type: "_margin"']]},
      {params: [['$type: "_padding"']]},
      {params: [['$type: "_position"']]},
      {params: [['$type: "_border"']]}
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      assert(error.message.match(/Argument \$type must be one of/));
      return resolve();
    });
  });

  it('should throw error if argument "$values" is not valid.', async () => {
    const cases = [
      {params: [['$type: "margin"', '$values: null']]},
      {params: [['$type: "margin"', '$values: false']]},
      {params: [['$type: "margin"', '$values: 14px']]},
      {params: [['$type: "margin"', '$values: #000']]}
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      assert(error.message.match(/Argument \$values must be list\./));
      return resolve();
    });
  });

  it('should throw error if argument "$type" is "border" and argument item of "$values" is not map or not have "name" key.', async () => {
    const cases = [
      // when list
      {params: [['$type: "border"', '$values: (10rem,)']]},

      // when no "name" key
      {params: [['$type: "border"', '$values: (("NAMELESS": "hoge"),)']]}
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      assert(error.message.match(/Argument \$values is not valid list of map\./));
      return resolve();
    });
  });

  it('should out options each by direction.', async () => {
    const cases = [
      {
        params: [['$type: "margin"', '$values: (5px, -5em)']],
        expected: [
          '.selector-vertical-5{margin-top:5px !important;margin-bottom:5px !important}',
          '.selector-vertical-5-{margin-top:-5em !important;margin-bottom:-5em !important}',
          '.selector-horizontal-5{margin-right:5px !important;margin-left:5px !important}',
          '.selector-horizontal-5-{margin-right:-5em !important;margin-left:-5em !important}',
          '.selector-all-5{margin-top:5px !important;margin-right:5px !important;margin-bottom:5px !important;margin-left:5px !important}',
          '.selector-all-5-{margin-top:-5em !important;margin-right:-5em !important;margin-bottom:-5em !important;margin-left:-5em !important}'
        ].join('')
      },
      {
        params: [['$type: "padding"', '$values: (10rem,)']],
        expected: [
          '.selector-vertical-10{padding-top:10rem !important;padding-bottom:10rem !important}',
          '.selector-horizontal-10{padding-right:10rem !important;padding-left:10rem !important}',
          '.selector-all-10{padding-top:10rem !important;padding-right:10rem !important;padding-bottom:10rem !important;padding-left:10rem !important}'
        ].join('')
      },
      {
        params: [['$type: "position"', '$values: (5px, -5em)']],
        expected: [
          '.selector-vertical-5{top:5px !important;bottom:5px !important}',
          '.selector-vertical-5-{top:-5em !important;bottom:-5em !important}',
          '.selector-horizontal-5{right:5px !important;left:5px !important}',
          '.selector-horizontal-5-{right:-5em !important;left:-5em !important}',
          '.selector-all-5{top:5px !important;right:5px !important;bottom:5px !important;left:5px !important}',
          '.selector-all-5-{top:-5em !important;right:-5em !important;bottom:-5em !important;left:-5em !important}'
        ].join('')
      },
      {
        params: [['$type: "border"', '$values: (("name": "example", "size": 2px, "style": dashed, "color": #ccc),)']],
        expected: [
          '.selector-vertical-example{border-top:2px dashed #ccc !important;border-bottom:2px dashed #ccc !important}',
          '.selector-horizontal-example{border-right:2px dashed #ccc !important;border-left:2px dashed #ccc !important}',
          '.selector-all-example{border-top:2px dashed #ccc !important;border-right:2px dashed #ccc !important;border-bottom:2px dashed #ccc !important;border-left:2px dashed #ccc !important}'
        ].join('')
      },
      {
        params: [['$type: "border"', '$values: (("name": "example-default-value"),)']],
        expected: [
          '.selector-vertical-example-default-value{border-top:1px solid #000 !important;border-bottom:1px solid #000 !important}',
          '.selector-horizontal-example-default-value{border-right:1px solid #000 !important;border-left:1px solid #000 !important}',
          '.selector-all-example-default-value{border-top:1px solid #000 !important;border-right:1px solid #000 !important;border-bottom:1px solid #000 !important;border-left:1px solid #000 !important}'
        ].join('')
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

  it('should out options each by direction with breakpoints.', async () => {
    const cases = [
      {
        params: [['$type: "margin"', '$values: (5px, -5em)', '$breakpoints: ("if-mobile": ("until": "mobile"))']],
        expected: [
          '.selector-vertical-5{margin-top:5px !important;margin-bottom:5px !important}',
          '@media only screen and (max-width: 666px){.selector-vertical-5-if-mobile{margin-top:5px !important;margin-bottom:5px !important}}',
          '.selector-vertical-5-{margin-top:-5em !important;margin-bottom:-5em !important}',
          '@media only screen and (max-width: 666px){.selector-vertical-5--if-mobile{margin-top:-5em !important;margin-bottom:-5em !important}}',
          '.selector-horizontal-5{margin-right:5px !important;margin-left:5px !important}',
          '@media only screen and (max-width: 666px){.selector-horizontal-5-if-mobile{margin-right:5px !important;margin-left:5px !important}}',
          '.selector-horizontal-5-{margin-right:-5em !important;margin-left:-5em !important}',
          '@media only screen and (max-width: 666px){.selector-horizontal-5--if-mobile{margin-right:-5em !important;margin-left:-5em !important}}',
          '.selector-all-5{margin-top:5px !important;margin-right:5px !important;margin-bottom:5px !important;margin-left:5px !important}',
          '@media only screen and (max-width: 666px){.selector-all-5-if-mobile{margin-top:5px !important;margin-right:5px !important;margin-bottom:5px !important;margin-left:5px !important}}',
          '.selector-all-5-{margin-top:-5em !important;margin-right:-5em !important;margin-bottom:-5em !important;margin-left:-5em !important}',
          '@media only screen and (max-width: 666px){.selector-all-5--if-mobile{margin-top:-5em !important;margin-right:-5em !important;margin-bottom:-5em !important;margin-left:-5em !important}}'
        ].join('')
      },
      {
        params: [['$type: "padding"', '$values: (10rem,)', '$breakpoints: ("if-mobile": ("until": "mobile"))']],
        expected: [
          '.selector-vertical-10{padding-top:10rem !important;padding-bottom:10rem !important}',
          '@media only screen and (max-width: 666px){.selector-vertical-10-if-mobile{padding-top:10rem !important;padding-bottom:10rem !important}}',
          '.selector-horizontal-10{padding-right:10rem !important;padding-left:10rem !important}',
          '@media only screen and (max-width: 666px){.selector-horizontal-10-if-mobile{padding-right:10rem !important;padding-left:10rem !important}}',
          '.selector-all-10{padding-top:10rem !important;padding-right:10rem !important;padding-bottom:10rem !important;padding-left:10rem !important}',
          '@media only screen and (max-width: 666px){.selector-all-10-if-mobile{padding-top:10rem !important;padding-right:10rem !important;padding-bottom:10rem !important;padding-left:10rem !important}}'
        ].join('')
      },
      {
        params: [['$type: "position"', '$values: (5px, -5em)', '$breakpoints: ("if-mobile": ("until": "mobile"))']],
        expected: [
          '.selector-vertical-5{top:5px !important;bottom:5px !important}',
          '@media only screen and (max-width: 666px){.selector-vertical-5-if-mobile{top:5px !important;bottom:5px !important}}',
          '.selector-vertical-5-{top:-5em !important;bottom:-5em !important}',
          '@media only screen and (max-width: 666px){.selector-vertical-5--if-mobile{top:-5em !important;bottom:-5em !important}}',
          '.selector-horizontal-5{right:5px !important;left:5px !important}',
          '@media only screen and (max-width: 666px){.selector-horizontal-5-if-mobile{right:5px !important;left:5px !important}}',
          '.selector-horizontal-5-{right:-5em !important;left:-5em !important}',
          '@media only screen and (max-width: 666px){.selector-horizontal-5--if-mobile{right:-5em !important;left:-5em !important}}',
          '.selector-all-5{top:5px !important;right:5px !important;bottom:5px !important;left:5px !important}',
          '@media only screen and (max-width: 666px){.selector-all-5-if-mobile{top:5px !important;right:5px !important;bottom:5px !important;left:5px !important}}',
          '.selector-all-5-{top:-5em !important;right:-5em !important;bottom:-5em !important;left:-5em !important}',
          '@media only screen and (max-width: 666px){.selector-all-5--if-mobile{top:-5em !important;right:-5em !important;bottom:-5em !important;left:-5em !important}}'
        ].join('')
      },
      {
        params: [['$type: "border"', '$values: (("name": "example", "size": 2px, "style": dashed, "color": #ccc),)', '$breakpoints: ("if-mobile": ("until": "mobile"))']],
        expected: [
          '.selector-vertical-example{border-top:2px dashed #ccc !important;border-bottom:2px dashed #ccc !important}',
          '@media only screen and (max-width: 666px){.selector-vertical-example-if-mobile{border-top:2px dashed #ccc !important;border-bottom:2px dashed #ccc !important}}',
          '.selector-horizontal-example{border-right:2px dashed #ccc !important;border-left:2px dashed #ccc !important}',
          '@media only screen and (max-width: 666px){.selector-horizontal-example-if-mobile{border-right:2px dashed #ccc !important;border-left:2px dashed #ccc !important}}',
          '.selector-all-example{border-top:2px dashed #ccc !important;border-right:2px dashed #ccc !important;border-bottom:2px dashed #ccc !important;border-left:2px dashed #ccc !important}',
          '@media only screen and (max-width: 666px){.selector-all-example-if-mobile{border-top:2px dashed #ccc !important;border-right:2px dashed #ccc !important;border-bottom:2px dashed #ccc !important;border-left:2px dashed #ccc !important}}'
        ].join('')
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
