import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: [
      '**/dist',
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            // --- scope: who may depend on whom -------------------------
            // The two apps may only reach into shared libraries.
            // web can never import api, and api can never import web.
            {
              sourceTag: 'scope:web',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },
            {
              sourceTag: 'scope:api',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },
            {
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },

            // --- type: the direction of the dependency graph -----------
            // models <- util <- content / ui <- apps
            {
              sourceTag: 'type:ui',
              onlyDependOnLibsWithTags: ['type:util', 'type:model'],
            },
            {
              sourceTag: 'type:content',
              onlyDependOnLibsWithTags: ['type:util', 'type:model'],
            },
            {
              sourceTag: 'type:util',
              onlyDependOnLibsWithTags: ['type:model'],
            },
            {
              sourceTag: 'type:model',
              onlyDependOnLibsWithTags: [],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];
