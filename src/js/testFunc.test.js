import { expect } from '@jest/globals';
import testFunc from './testFunc';

it('Retorna 4 como valor da soma', () => {
    expect(testFunc(1,3)).toBe(4)
})