function WPKOModel() {
  var baseUrl = "https://public-api.wordpress.com/rest/v1.1/sites/blog.moon.co.nz/posts/?number=7&page=",
    currentPage = 1,
    postCount = 0,
    postsPerPage = 7;

  self = this;

  self.test = ko.observable("test");
  self.testBackup = ko.pureComputed(function() {
    return self.test();
  }).extend({ throttle: 500 });
  self.posts = ko.observableArray();

  self.title = ko.observable();
  self.content = ko.observable();
  self.date = ko.observable();
  self.author = ko.observable();
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
      console.log(data);
      self.posts(data.posts);
      postCount = data.found;
      //console.log("post count", postCount)
    });
  }
  showPost = function(data) {
    console.log(data);


    self.title(data.title);
    self.content(data.content);
    self.author(data.author.name);
    self.date(data.date)
    self.avatar_URL(data.author.avatar_URL)
    //count = data.posts
  }



}

var viewModel = new WPKOModel();
ko.applyBindings(viewModel, $("#div")[0]);
self.updatePosts();
