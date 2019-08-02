/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import {eachTestCases, normalizeGlobalSettings} from 'test-util';

describe('@mixin define-breakpoint($from, $until)', () => {

  /**
   * wrapper
   * @param {String|Number|Null} from starting point of breakpoint
   * @param {String|Number|Null} until ending point of breakpoint
   * @param {String|Number|Null} options ending point of breakpoint
   * @param {Boolean} undefBreakpoints undefined $unit-breakpoints or not
   * @return {String}
   */
  function wrapper(from, until, options, undefBreakpoints = false) { // eslint-disable-line max-params
    const args = [
      from || from === '' ? `$from: ${from}` : false,
      until || until === '' ? `$until: ${until}` : false,
      options || options === '' ? `$options: ${options}` : false
    ];

    return `
${normalizeGlobalSettings({breakpoints: undefBreakpoints ? null : '("desktop": 1024px, "mobile": 667px)'})}
@import "src/lib/mixin/define-breakpoint";

.selector {
  @include define-breakpoint(${args.filter((arg) => arg !== false).join(', ')}) {
    font-size: 16px;
  };
}
    `;
  }

  it('should throw error if "$unit-breakpoints" is undefined.', async () => {
    const cases = [
      {params: ['300px', '1000px', null, true]}
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      assert.equal(error.message, '@mixin define-breakpoint: Global variable $unit-breakpoints is not defined.');
      return resolve();
    });
  });

  it('should throw error if argument "$from" is not valid.', async () => {
    const cases = [
      {params: ['false', '1000px', null]},
      {params: ['#000', '1000px', null]}
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should throw error if argument "$from" is not registered in $unit-breakpoints.', async () => {
    const cases = [
      {params: ['unregistered-breakpoint', '1000px', null]}
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should throw error if argument "$until" is not valid.', async () => {
    const cases = [
      {params: ['1000px', 'false', null]},
      {params: ['1000px', '#000', null]}
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should throw error if argument "$until" is not registered in $unit-breakpoints.', async () => {
    const cases = [
      {params: ['1000px', 'unregistered-breakpoint', null]}
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should throw error if unit of argument "$from" is not same to it of "$until".', async () => {
    const cases = [
      {params: ['0rem', '0px', null]},
      {params: ['0em', '1000rem', null]}
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should throw error if argument "$from" is not smaller than argument "$until".', async () => {
    const cases = [
      {params: ['1000px', '0', null]},
      {params: ['1000px', '1000px', null]},
      {params: ['desktop', 'mobile', null]}
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should out @media rule.', async () => {
    const cases = [
      // both specifed
      {
        params: ['0', '1000px'],
        expected: '@media only screen and (min-width: 0) and (max-width: 999px) { .selector { font-size: 16px; } }'
      },
      {
        params: ['30rem', '90rem'],
        expected: '@media only screen and (min-width: 30rem) and (max-width: 89rem) { .selector { font-size: 16px; } }'
      },
      {
        params: ['mobile', 'desktop'],
        expected: '@media only screen and (min-width: 667px) and (max-width: 1023px) { .selector { font-size: 16px; } }'
      },
      // $from is not specified or null
      {
        params: [null, '1000px'],
        expected: '@media only screen and (max-width: 999px) { .selector { font-size: 16px; } }'
      },
      {
        params: ['null', '1000px'],
        expected: '@media only screen and (max-width: 999px) { .selector { font-size: 16px; } }'
      },
      {
        params: ['null', 'desktop'],
        expected: '@media only screen and (max-width: 1023px) { .selector { font-size: 16px; } }'
      },
      // $until is not specified or null
      {
        params: ['30rem', null],
        expected: '@media only screen and (min-width: 30rem) { .selector { font-size: 16px; } }'
      },
      {
        params: ['30rem', 'null'],
        expected: '@media only screen and (min-width: 30rem) { .selector { font-size: 16px; } }'
      },
      {
        params: ['mobile', 'null'],
        expected: '@media only screen and (min-width: 667px) { .selector { font-size: 16px; } }'
      },
      // both not specified or null (warning)
      {
        params: [null, null],
        expected: ''
      },
      {
        params: ['null', 'null'],
        expected: ''
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

  it('should out @media rule with specified "media" if argument "$options" has "media" key.', async () => {
    const cases = [
      // both specifed
      {
        params: ['0', '1000px', '("media": "print")'],
        expected: '@media only print and (min-width: 0) and (max-width: 999px) { .selector { font-size: 16px; } }'
      },
      {
        params: [null, '1000px', '("media": "print")'],
        expected: '@media only print and (max-width: 999px) { .selector { font-size: 16px; } }'
      },
      {
        params: ['30rem', null, '("media": "print")'],
        expected: '@media only print and (min-width: 30rem) { .selector { font-size: 16px; } }'
      },
      // both not specified or null (warning)
      {
        params: [null, null, '("media": "print")'],
        expected: ''
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
