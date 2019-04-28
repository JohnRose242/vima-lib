import { TempUnitPipe } from './temp-unit.pipe';

describe('TempUnitPipe', () => {

  const pipe = new TempUnitPipe();

  it('should return the correct temperature and unit', () => {
    expect(pipe.transform(100, 'F')).toEqual('100°F');
    expect(pipe.transform(100, 'C')).toEqual('38°C');
  });

});
