/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import eachTestCases from '../fixture/eachTestCases';
import normalizeGlobalSettings from '../fixture/normalizeGlobalSettings';

describe('@function merge-state-selectors($type, $additional-selectors)', () => {

  /**
   * wrapper
   * @param {String|null} type font size
   * @param {String|null} additionalSelectors font size
   * @param {Object} globalSettings global settings
   * @return {String}
   */
  function wrapper(type, additionalSelectors, globalSettings = {}) {
    const args = [
      type || type === '' ? `$type: ${type}` : false,
      additionalSelectors || additionalSelectors === '' ? `$additional-selectors: ${additionalSelectors}` : false
    ];

    return `
${normalizeGlobalSettings(globalSettings)}
@import "src/lib/function/merge-state-selectors";

p {
  content: #{merge-state-selectors(${args.filter((arg) => arg !== false).join(', ')})};
}
    `;
  }

  it('should throw error if argument "$type" is not one of type "link", focus", "disabled" or "current".', async () => {
    const cases = [
      {params: ['null']},
      {params: ['false']},
      {params: ['#000']},
      {params: ['#hoge']}
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should return merged selectors if argument "$type" is valid.', async () => {
    const cases = [
      {
        params: ['"link"'],
        expected: 'p { content: :link :visited; }'
      },
      {
        params: ['"focus"'],
        expected: 'p { content: :hover :focus .is-focus; }'
      },
      {
        params: ['"selected"'],
        expected: 'p { content: :checked .is-selected; }'
      },
      {
        params: ['"disabled"'],
        expected: 'p { content: :disabled .is-disabled; }'
      },
      {
        params: ['"current"'],
        expected: 'p { content: .is-current; }'
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

  it('should return merged selectors without global settings if global variable is not defined.', async () => {
    const cases = [
      {
        params: ['"focus"', null, {stateSelectorsFocus: null}],
        expected: 'p { content: :hover :focus; }'
      },
      {
        params: ['"selected"', null, {stateSelectorsSelected: null}],
        expected: 'p { content: :checked; }'
      },
      {
        params: ['"disabled"', null, {stateSelectorsDisabled: null}],
        expected: 'p { content: :disabled; }'
      },
      {
        params: ['"current"', null, {stateSelectorsCurrent: null}],
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

  it('should return merged selectors if argument "$additional-selectors" is set.', async () => {
    const cases = [
      {
        params: ['"link"', '(".is-hoge")'],
        expected: 'p { content: :link :visited .is-hoge; }'
      },
      {
        params: ['"focus"', '(".is-hoge")'],
        expected: 'p { content: :hover :focus .is-focus .is-hoge; }'
      },
      {
        params: ['"selected"', '(".is-hoge")'],
        expected: 'p { content: :checked .is-selected .is-hoge; }'
      },
      {
        params: ['"disabled"', '(".is-hoge")'],
        expected: 'p { content: :disabled .is-disabled .is-hoge; }'
      },
      {
        params: ['"current"', '(".is-hoge")'],
        expected: 'p { content: .is-current .is-hoge; }'
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
