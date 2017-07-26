import { reducers } from 'store/reducers';
import { updateLocation } from 'store/actions';

describe('(Specialized Action Creator) updateLocation', () => {
  let _globalState;
  let _dispatchSpy;

  beforeEach(() => {
    _globalState = {
      location: reducers.location(undefined, {})
    };
    _dispatchSpy = sinon.spy((action) => {
      _globalState = {
        ..._globalState,
        location: reducers.location(_globalState.location, action)
      };
    });
  });

  it('Should be exported as a function.', () => {
    expect(updateLocation).to.be.a('function');
  });

  it('Should return a function (is a thunk).', () => {
    expect(updateLocation({ dispatch: _dispatchSpy })).to.be.a('function');
  });

  it('Should call dispatch exactly once.', () => {
    updateLocation({ dispatch: _dispatchSpy })('/');
    expect(_dispatchSpy.should.have.been.calledOnce);
  });
});
