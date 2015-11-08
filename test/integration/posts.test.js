import it, {itOnly} from '../helpers/appium';
import server from '../helpers/server';
import fixtures from '../helpers/fixtures';
import bootstrap from '../helpers/bootstrap';

describe("Posts", () => {
  it("should show my posts", function* (driver, done) {
    server.get("/api/posts/tester", fixtures.home());

    yield bootstrap().login().nav("dashboard").launch(driver);
    
    yield driver.elementById('Dashboard');
    yield driver.elementById('post1');

    done();
  });

  it("should show an empty list", function* (driver, done) {
    server.get("/api/posts/tester", { username: "tester", posts: [] });

    yield bootstrap().login().nav("dashboard").launch(driver);

    yield driver.elementById('Dashboard');
    yield driver.elementById('No items');

    done();
  });

  it("should my friends's posts", function* (driver, done) {
    server.get("/api/posts/friend", fixtures.friend());

    yield bootstrap().login().nav("dashboard/follows/friend").launch(driver);

    yield driver.elementById('friend');
    yield driver.elementById('post3');

    done();
  });

  it("should create a new post", function* (driver, done) {
    var list = fixtures.home();
    server.get("/api/posts/tester", list);
    server.post("/api/posts",
      {id: 100, content: 'new post here', username: 'tester'}, // return this content
      {content: 'new post here'}                               // expect this content
    );

    yield bootstrap().login().launch(driver);

    yield driver.elementById('+').click(); // new post!

    yield driver.elementById('New Post');

    yield driver.execute("target.frontMostApp().keyboard().typeString('new post here')");

    yield driver.elementById('Submit').click();

    yield driver.elementById('Dashboard');

    yield driver.elementById('new post here'); // it's there!

    done();
  });

});
