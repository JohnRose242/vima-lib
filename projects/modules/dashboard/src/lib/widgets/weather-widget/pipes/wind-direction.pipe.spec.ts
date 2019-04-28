import { WindDirectionPipe } from './wind-direction.pipe';

describe('WindDirectionPipe', () => {

  const pipe = new WindDirectionPipe();

  it('should return the correct wind direction', () => {
    expect(pipe.transform(0)).toEqual('NE');
    expect(pipe.transform(45)).toEqual('E');
    expect(pipe.transform(90)).toEqual('SE');
    expect(pipe.transform(140)).toEqual('S');
    expect(pipe.transform(190)).toEqual('SW');
    expect(pipe.transform(240)).toEqual('W');
    expect(pipe.transform(290)).toEqual('NW');
    expect(pipe.transform(340)).toEqual('N');
  });

});
