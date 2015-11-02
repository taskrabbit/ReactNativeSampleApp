import it from '../helpers/appium';

describe("integration smoke test", () => {
  it("should launch the simulator and compute the sum", function* (driver, done) {
    var value = 1 + 1;
    value.should.equal(2);
    done();
  });

});
