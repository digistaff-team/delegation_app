import '@testing-library/jest-dom';

// jsdom's scrollTo is not implemented; replace with a no-op for tests
// @ts-expect-error - test-only mock
window.scrollTo = () => {};
