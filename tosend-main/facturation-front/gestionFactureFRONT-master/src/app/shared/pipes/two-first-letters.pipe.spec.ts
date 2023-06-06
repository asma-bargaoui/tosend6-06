import { TwoFirstLettersPipe } from './two-first-letters.pipe';

describe('TwoFirstLettersPipe', () => {
  it('create an instance', () => {
    const pipe = new TwoFirstLettersPipe();
    expect(pipe).toBeTruthy();
  });
});
