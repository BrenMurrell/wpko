function WPKOModel() {
  var baseUrl = "https://public-api.wordpress.com/rest/v1.1/sites/theweirdoandthebeardo.wordpress.com/posts/?number=7&page=",
  //var baseUrl = "https://public-api.wordpress.com/wp/v2/sites/theweirdoandthebeardo.wordpress.com/posts/?number=7&page=",
    currentPage = 1,
    postCount = 0,
    postsPerPage = 7;

  self = this;

  self.searchString = ko.observable();
  //throttled version of input to ping wordpress api after typing.
  self.searchDo = ko.computed(function() {
    // read: function () {
    //   console.log("search string: ", self.searchString);
    // },
    // write: function (value) {
    //     console.log("value: ", value)
    // },
    // owner: self
    return self.searchString();
  }).extend({ throttle: 500 });



  self.posts = ko.observableArray();

  self.title = ko.observable();
  self.content = ko.observable();
  self.date = ko.observable();
  self.author = ko.observable();
  self.authorData = ko.observableArray();
  self.avatar_URL = ko.observable();

  self.canNext = ko.pureComputed(function() {
    if((postsPerPage * currentPage) < (postCount)) {
      return true;
    }
    return false;
  })
  self.canPrev = ko.pureComputed(function()  {
    if(currentPage > 1) {
      return true;
    }
    return false;
  });

  self.getNext = function() {
    //if((postsPerPage * currentPage) < (postCount)) {
      currentPage += 1;
      console.log(currentPage);
      self.updatePosts();
    //}
  }
  self.getPrev = function() {
    //if(currentPage > 1) {
      currentPage -= 1;
      console.log(currentPage);
      self.updatePosts();
    //}
  }

  self.updatePosts = function() {
    $.getJSON(baseUrl + currentPage, function(data) {
      console.log("data", data);
      self.posts(data.posts);
      postCount = data.found;
      //console.log("post count", postCount)
    });
  }
  showPost = function(data) {
    console.log(data);
    self.title(data.title);
    self.content(data.content);
    self.date(data.date)
    self.author(data.author);
    //count = data.posts
  }



}

var viewModel = new WPKOModel();
ko.applyBindings(viewModel, $("#div")[0]);
self.updatePosts();
