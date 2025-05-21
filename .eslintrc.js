module.exports = {
  env: {
    jest: true,
    node: true,
    browser: true,
    es2021: true,
  },
  globals: {
    React: true,
    google: true,
    mount: true,
    mountWithRouter: true,
    shallow: true,
    shallowWithRouter: true,
    context: true,
    expect: true,
    jsdom: true,
    JSX: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
    project: [
      './tsconfig.eslint.json',
    ],
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
    'react-hooks',
    'unused-imports',
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'airbnb-base',
    'plugin:import/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript/base',
    'plugin:import/typescript',
  ],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: [
          'src',
        ],
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
        ],
      },
    },
  },
  rules: {
    '@typescript-eslint/ban-types': [
      'error', {
        extendDefaults: true,
        types: {
          Function: false,
        },
      },
    ],
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/indent': ['error', 2, {
      SwitchCase: 1,
    }],
    '@typescript-eslint/member-delimiter-style': ['error'],
    '@typescript-eslint/no-explicit-any': ['error', {
      ignoreRestArgs: true,
    }],
    '@typescript-eslint/no-unused-vars': ['warn', {
      args: 'after-used',
      argsIgnorePattern: '^_',
      vars: 'all',
      varsIgnorePattern: '^_',
    }],
    '@typescript-eslint/semi': ['error'],
    '@typescript-eslint/space-infix-ops': ['error', {
      int32Hint: false,
    }],
    '@typescript-eslint/type-annotation-spacing': ['error', {
      after: true,
      before: true,
      overrides: {
        colon: {
          before: false,
        },
      },
    }],
    'arrow-body-style': ['off', 'never'],
    'arrow-parens': ['error', 'always'],
    'class-methods-use-this': 'off',
    'comma-dangle': 'off',
    'eol-last': ['error', 'always'],
    'function-paren-newline': ['error', 'consistent'],
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: ['**/*.stories.tsx', '**/*.tests.ts', '**/*.tests.tsx', '**/__tests__/**/*.ts', '**/*.mocks.ts'],
    }],
    'import/order': ['error', {
      alphabetize: {
        caseInsensitive: true,
        order: 'asc',
      },
    }],
    'import/prefer-default-export': 0,
    indent: 'off',
    'key-spacing': ['error', {
      afterColon: true,
      beforeColon: false,
    }],
    'max-classes-per-file': 'off',
    'max-len': ['error', {
      code: 140,
    }],
    'no-console': ['error'],
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': ['error', {
      max: 1,
      maxBOF: 0,
      maxEOF: 1,
    }],
    'no-nested-ternary': 0,
    'no-restricted-exports': 'off',
    'no-trailing-spaces': 'error',
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'off',
    'object-curly-newline': ['error', {
      ImportDeclaration: {
        minProperties: 7,
        multiline: true,
      },
    }],
    'object-curly-spacing': ['error', 'always'],
    quotes: ['error', 'single'],
    semi: 'off',
    'space-infix-ops': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': ['warn', {
      args: 'after-used',
      argsIgnorePattern: '^_',
      vars: 'all',
      varsIgnorePattern: '^_',
    }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-key': 'error',
    'react/prop-types': 'off',
    'react/no-unused-prop-types': 'off',
    'react/jsx-curly-spacing': [
      'error',
      {
        when: 'always',
        children: true,
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-curly-newline': [
      'error',
      {
        multiline: 'require',
        singleline: 'forbid',
      },
    ],
    'react/require-default-props': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-equals-spacing': [
      'error',
      'never',
    ],
  },
  overrides: [
    {
      files: [
        '**/*.stories.*',
      ],
      rules: {
        'import/no-anonymous-default-export': 'off',
      },
    },
  ],
};
