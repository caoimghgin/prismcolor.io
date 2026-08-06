import nextPlugin from '@next/eslint-plugin-next';
import mantine from 'eslint-config-mantine';
import reactCompiler from 'eslint-plugin-react-compiler';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...mantine,
  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      '**/*.{mjs,cjs,js,d.ts,d.mts}',
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@next/next': nextPlugin,
      'react-compiler': reactCompiler,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      'react-compiler/react-compiler': 'error',
    },
  }
);
