function PostsModel($rootModel) {
  self = this;
  self.currentPage = ko.observable(1);
  self.posts = ko.observableArray();

  self.Url = ko.observable($rootModel.baseUrl() + "posts/");

  self.postsUrl = ko.pureComputed(function() {
    if($rootModel.searchString()) {
      return self.Url() + "?page=" + self.currentPage() + "&number=" + $rootModel.postsPerPage() + "&search=" + $rootModel.searchString();
    } else {
      return self.Url() + "?page=" + self.currentPage() + "&number=" + $rootModel.postsPerPage();
    }
  });

  // var posts = ko.mapping.fromJS()
  self.getPosts = function() {
    $.getJSON(self.postsUrl() + "&pretty=true", function(data) {
      console.log("data", data);
      //console.log(self.postsUrl());
      //ko.mapping.fromJS(data, {}, self);
      self.posts(data.posts);
      //self.posts(data.posts);
      //self.postCount(data.found);
      //console.log("post count", postCount)
    });
  };
  //init
  self.getPosts();

}
