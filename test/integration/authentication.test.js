import it from '../helpers/appium';
import server from '../helpers/server';
import fixtures from '../helpers/fixtures';

describe("Authentication", () => {
  beforeEach(() => {
    server.get("/api/posts/tester", fixtures.home());
  });

  it("should sign up the user and show dashboard", function* (driver, done) {
    server.post("api/signup", fixtures.signup());
    
    var username = yield driver.elementById('Username');
    var password = yield driver.elementById('Password');
    var button = yield driver.elementById('Sign up');
    yield username.setImmediateValue("tester");
    yield password.setImmediateValue("sample");
    yield button.click();

    // make sure logged in
    yield driver.elementById('Dashboard');
    yield driver.elementById('post1');

    done();
  });

  it("should log in and out", function* (driver, done) {
    server.post("api/login", fixtures.signup());

    yield driver.elementById('Already a user? Login here.').click();
    
    var username = yield driver.elementById('Username');
    var password = yield driver.elementById('Password');
    var button = yield driver.elementById('Log in');
    yield username.setImmediateValue("tester");
    yield password.setImmediateValue("sample");
    yield button.click();

    // make sure logged in
    yield driver.elementById('Dashboard');
    yield driver.elementById('post1');

    // show settings, log out
    yield driver.elementByXPath('//UIAApplication[1]/UIAWindow[1]/UIAElement[4]').click(); // "Me"
    yield driver.elementById('Settings');
    yield driver.elementById('Log out').click();

    // back on signup
    yield driver.elementById('Already a user? Login here.');

    done();
  });

});
