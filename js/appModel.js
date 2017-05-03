function AppModel() {
  self = this;

  self.baseUrl = ko.observable("https://public-api.wordpress.com/rest/v1.1/sites/theweirdoandthebeardo.wordpress.com/");

  self.title = ko.observable("test title");
  self.postsPerPage = ko.observable(10);
  self.searchString = ko.observable();

  self.init = function() {
    console.log("init");
  }
  self.PostsModel = new PostsModel(self);
  self.SinglePostModel = new SinglePostModel(self);
}
$(function () {
    var viewModel = new AppModel();
    ko.applyBindings(viewModel, $("#app")[0]);
    viewModel.init();
    //viewModel.reloadPage({ isInitialisePage: true, isGetInventory: false });
    console.log(viewModel);
});
