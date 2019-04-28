import { SpeedUnitPipe } from './speed-unit.pipe';

describe('SpeedUnitPipe', () => {

  const pipe = new SpeedUnitPipe();

  it('should return the correct speed and unit', () => {
    expect(pipe.transform(100, null)).toEqual('100.0 kph');
    expect(pipe.transform(100, 'mph')).toEqual('160.0 mph');
  });

});
