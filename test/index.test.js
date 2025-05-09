import assert from 'node:assert';
import path from 'node:path';
import * as sass from 'sass';

describe('@hidoo/unit', () => {
  const packages = [
    '@hidoo/unit',
    '@hidoo/unit/lib',
    '@hidoo/unit/function',
    '@hidoo/unit/mixin',
    '@hidoo/unit/plugin/foo',
    '@hidoo/unit/settings',
    '@hidoo/unit/unit',
    '@hidoo/unit/unit/buz',
    '@hidoo/unit/unit/buz/modifier',
    '@hidoo/unit/util',
    '@hidoo/unit/util/modifier'
  ];

  // eslint-disable-next-line mocha/no-setup-in-describe
  packages.forEach((pkg) => {
    describe(pkg, () => {
      it(`should be importable with pkg: URL as pkg:${pkg}`, () => {
        let error = null;

        try {
          sass.compileString(`@use "pkg:${pkg}";`, {
            importers: [
              new sass.NodePackageImporter(
                path.join(process.cwd(), 'test/fixture')
              )
            ]
          });
        } catch (err) {
          error = err;
        }
        assert(!(error instanceof Error));
      });
    });
  });
});
