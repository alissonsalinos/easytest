import LoadData from './LoadData';
jest.mock('./LoadData');

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});