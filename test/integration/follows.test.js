import it from '../helpers/appium';
import server from '../helpers/server';
import fixtures from '../helpers/fixtures';
import bootstrap from '../helpers/bootstrap';

describe("Follows", () => {
  it("should show my follows", function* (driver, done) {
    server.get("/api/follows/tester", fixtures.myFollows());

    yield bootstrap().login().nav("dashboard/follows").launch(driver);
    
    yield driver.elementById('Dashboard');
    yield driver.elementById('friend');
    yield driver.elementById('follow2');

    done();
  });

  it("should show an empty list", function* (driver, done) {
    server.get("/api/follows/tester", { username: "tester", follows: [] });

    yield bootstrap().login().nav("dashboard/follows").launch(driver);

    yield driver.elementById('Follows');
    yield driver.elementById('No items');

    done();
  });

  it("should my friends's follows", function* (driver, done) {
    server.get("/api/follows/friend", fixtures.friendFollows());

    yield bootstrap().login().nav("dashboard/follows/friend/follows").launch(driver);

    yield driver.elementById('friend');
    yield driver.elementById('tester');
    yield driver.elementById('follow4');

    done();
  });

  it("should navigate follows recursively", function* (driver, done) {
    server.get("/api/posts/tester", fixtures.home());
    server.get("/api/posts/friend", fixtures.friend());
    server.get("/api/posts/follow4", { 
        username: "follow4", 
        posts: [ { id: 1000, username: 'follow4', content: 'post1000' }]
    });

    server.get("/api/follows/friend", fixtures.friendFollows());
    server.get("/api/follows/tester", fixtures.myFollows());
    server.get("/api/follows/follow4", { username: "follow4", follows: [ { id: 123, username: 'tester' }] });

    yield bootstrap().login().launch(driver);

    yield driver.elementById("Dashboard");
    yield driver.elementById("post1");  // my post
    // yield driver.sleep(90000000);
    yield driver.elementById("segFollows_tester").click(); // open my follows

    yield driver.elementById('friend').click();  // click on friend

    yield driver.elementById("friend"); // friend's list
    yield driver.elementById("post4");  // friend's post
    yield driver.elementById("segFollows_friend").click(); // open friend's follows

    yield driver.elementById('follow4').click();  // click on other

    yield driver.elementById("follow4"); // other's list
    yield driver.elementById("post100"); // other's post
    yield driver.elementById("segFollows_follow4").click(); // open other's follows

    yield driver.elementById('tester').click(); // click on me

    // TODO: it should NOT say "Dashboard"    
    yield driver.elementById("tester"); // my list
    yield driver.elementById("post1");  // my post

    // Now pop everything
    yield driver.elementById("back").click(); // back
    yield driver.elementById("follow4");

    yield driver.elementById("back").click(); // back
    yield driver.elementById("friend");

    yield driver.elementById("back").click(); // back

    yield driver.elementById("Dashboard");

    done();
  });
});
