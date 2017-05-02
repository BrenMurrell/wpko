function WPKOModel() {
  var baseUrl = "https://public-api.wordpress.com/rest/v1.1/sites/theweirdoandthebeardo.wordpress.com/posts/";
  //var baseUrl = "https://public-api.wordpress.com/rest/v1.1/sites/blog.moon.co.nz/posts/";
    //currentPage = 1,
    //postCount = 0,
    //postsPerPage = 7;

  self = this;

  self.searchString = ko.observable();
  //throttled version of input to ping wordpress api after typing.
  self.searchDo = ko.computed(function(){
    return self.searchString();
  }).extend({ throttle: 500 });
  self.searchDo.subscribe(function() {
    self.currentPage(1);
    self.updatePosts();

  });

  self.currentPage = ko.observable(1);
  self.postCount = ko.observable(0);
  self.postsPerPage = ko.observable(10);
  self.maxPage = ko.pureComputed(function() {
    return self.postCount() / self.postsPerPage();
  });
  self.fromPost = ko.pureComputed(function() {
    return ((self.currentPage() - 1) * self.postsPerPage()) + 1;
  });
  self.toPost = ko.pureComputed(function() {
    return self.currentPage() * self.postsPerPage();
  });
  self.posts = ko.observableArray();
  self.title = ko.observable();
  self.content = ko.observable();
  self.date = ko.observable();
  self.author = ko.observable();
  self.authorData = ko.observableArray();
  self.avatar_URL = ko.observable();

  self.canNext = ko.pureComputed(function() {
    if(self.currentPage() >= self.maxPage()){
      return false;
    }
    return true;
  })
  self.canPrev = ko.pureComputed(function()  {
    if(self.currentPage() > 1) {
      return true;
    }
    return false;
  });

  self.getNext = function() {
    //if((self.postsPerPage() * self.currentPage()) < (self.postCount())) {
      self.currentPage(self.currentPage() + 1);
      console.log(self.currentPage());
      self.updatePosts();
    //}
  }
  self.getPrev = function() {
    //if(self.currentPage() > 1) {
      self.currentPage(self.currentPage() - 1);
      console.log(self.currentPage());
      self.updatePosts();
    //}
  }
  self.postsUrl = ko.pureComputed(function() {
    if(self.searchString()) {
      return baseUrl + "?page=" + self.currentPage() + "&number=" + self.postsPerPage() + "&search=" + self.searchString();
    } else {
      return baseUrl + "?page=" + self.currentPage() + "&number=" + self.postsPerPage();
    }
  });
  self.updatePosts = function() {
    //searchString += "&search=" + encodeURI(self.searchDo());
    $.getJSON(self.postsUrl() + "&pretty=true", function(data) {
      console.log("data", data);
      self.posts(data.posts);
      self.postCount(data.found);
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
