/**
 * generate `@use "settings" with (...settings);`
 *
 * @param {Array} [settings=[]] settings
 * @return {String}
 */
export default function useSettingsWith(settings = []) {
  if (!settings.length) {
    return '';
  }

  const filtered = settings.filter((setting) => setting !== false);

  if (!filtered.length) {
    return '';
  }

  return `
@use "src/settings" with (
  ${filtered.join('  \n')}
);
`;
}
