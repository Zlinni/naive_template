const __DEV__ = process.env.NODE_ENV !== "production";
const isMock = false;
const mock = () =>
  __DEV__ && isMock ? basis(process.env.VUE_APP_MOCK_URL) : false;
const basis = (str?: string) => str || "";
export const urls = {
  baseUrl: mock() || process.env.VUE_APP_URL,
  mockUrl: process.env.VUE_APP_MOCK_URL,
};
