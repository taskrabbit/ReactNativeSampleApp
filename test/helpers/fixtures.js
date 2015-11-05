// API Responses

var Fixtures = {
  signup: function() {
    return {
      "id": 123,
      "token": "d3f4g5h67j8",
      "username": "tester",
    };
  },

  home: function() {
    return {
      username: 'tester',
      posts: [
        { id: 1, content: "post1", username: "tester" },
        { id: 2, content: "post2", username: "tester" }
      ]
    };
  },

  error: function(message, status, key, code) {
    return {
      status: (status ? status : 422),
      body: {
        error: message
      }

    };
  }

};

module.exports = Fixtures;
