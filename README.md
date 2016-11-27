# React Native Sample App

At [TaskRabbit](https://www.taskrabbit.com), we are trying to understand the best way to build React Native apps. This app is a working app in which we implement new ideas or those that have worked for us so far. We'll write about it on our [tech blog](http://tech.taskrabbit.com/).

The app itself is vaguely like twitter/tumblr. There are users that make posts. They follow other users. You can look at follows and their posts. The features (or styling) isn't the main point. At this time, we're mostly demonstrating architectural concepts.

![Sign up](./screenshots/sign_up.png "Sign up")
![Create post](./screenshots/create_post.png "Create post")
![Show post](./screenshots/show_post.png "Show post")
![Followers](./screenshots/follows.png "Followers")

### iOS
In the root directory
* Install dependencies: `npm install`

In the `ios` directory

* Install Pods: `gem install cocoapods`
* Install Pods: `pod install`
* Install xcpretty: `gem install xcpretty`
* Launch: `open Sample.xcworkspace`

### Android

* You might need to do this to run it in Android Studio or on real device: `adb reverse tcp:8081 tcp:8081`
* And for the sample server: `adb reverse tcp:3000 tcp:3000`
* To run from command line try: `react-native run-android`

### Server

There is a server that the app hits for data. The data is only stored in memory, but it should produce a more realistic environment.

In the `server` directory

* Install nvm and node-4.2.3
* Install dependencies: `npm install`
* Run it: `npm start`

It has sample data in the `models.js` file. For example, there is a user bleonard (password: "sample") that you can log in as.

### Tests

The integration tests are run using [Appium](http://appium.io/).

There is also an [example](https://github.com/taskrabbit/ReactNativeSampleApp/blob/master/.travis.yml) of how to run it on Travis CI: [![Build Status](https://travis-ci.org/taskrabbit/ReactNativeSampleApp.svg?branch=master)](https://travis-ci.org/taskrabbit/ReactNativeSampleApp)

To run tests:

* Make sure you have the 9.0 simulators installed in XCode
* Compile app for the test environment: `npm run compile:test`
* Launch simulator and tests: `npm test`

### Compiling

You can compile and put it on the phone with: `npm run install:staging`

Not that there's a staging server at this point, but it's an example of how to compile things via the command line.

### Android

We'll get there, but we're still working on the iOS version.

# Current Concepts

### Navigation

The sole method of navigation (what's showing on the screen and where the back button goes) is via urls. We parse urls to determine the route stack. There is some stuff to make "related" url navigation look "right" (push and pop). Making everything addressable by URL is great for deep linking and forces each screen to be able to load all on it's own from simple data.

The Router handles parsing different routes depending if you are logged in or not. The urls must be able to represent the entire navigation stack, so that means they can be recursive like my friend's friend's friend's feed (sample://dashboard/follows/john/follows/sarah/follows/amy/posts).

#### Flux

The Components use Actions. Actions tend to use the API Services and dispatch an event. The Stores are listening to the events. The Components add and remove listeners to the Stores.

#### Environment

There is a model called Environment that gets bootstrapped from Objective-C. It knows things that are different per environment like what API server to talk to.

#### Data storage

Info is currently stored as json to the local file system.

#### Shared CSS

It uses the `cssVar` pattern from the sample Facebook apps.

#### API

It uses superagent to do HTTP requests and sets headers and other things like that.

#### Components

Some shared components that might be helpful

* SegmentedControl: Non-iOS specific version of that control
* SimpleList: make a list out of the props set
* Button: Helper to make them all similiar

#### Mixins

We are currently sharing code through mixins. Some of them might be generally useful.

* KeyboardListener: helps know the amount of space the keyboard is taking up
* DispatcherListener: subscribes and ubsubscribes from the Dispatcher for a component
* NavigationListener: react to navigation changes in a component

#### Extensions

We've been trying out ways to not use mixins. `AddSpinnerLoader` is an example of a higher-level component.

#### i18n

We've internationalized our app. Each component definies it's own keys.
This provides a sample of how that works.

#### Android too

We shipped our Android app! We need to update this to work there too.


## License

MIT
