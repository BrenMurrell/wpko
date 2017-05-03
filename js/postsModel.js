function PostsModel($rootModel) {
  self = this;
  self.title2 = ko.observable("test title for posts model");
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
      ko.mapping.fromJS(data, {}, self);
      //self.posts(data.posts);
      //self.postCount(data.found);
      //console.log("post count", postCount)
    });
  };
  //init
  self.getPosts();

}
// $(function () {
//     var viewModel = new AppModel();
//     ko.applyBindings(viewModel, $("#app")[0]);
//     //viewModel.initialisePage();
//     //viewModel.reloadPage({ isInitialisePage: true, isGetInventory: false });
// });
