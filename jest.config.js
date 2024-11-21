export default {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  preset: 'ts-jest',
  roots: ['<rootDir>'],
  testEnvironment: 'jsdom',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest' // Use Babel to transform JS/TS files
  },
  transformIgnorePatterns: [
    'node_modules/(?!preact|preact/jsx-runtime)' // Allow specific modules to be transformed
  ],
  moduleNameMapper: {
    // Mock static assets if needed (images, CSS)
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  }
};
