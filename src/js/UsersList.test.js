import UsersList from './UsersList';
jest.mock('./UsersList');

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});