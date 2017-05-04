function SinglePostModel($rootModel) {
  self = this;
  self.Url = ko.pureComputed(function() {
    return $rootModel.baseUrl() + "posts/";
  });
  //self.Url = $rootModel.baseUrl() + "posts/";

  //self.testObservable = $rootModel.postsPerPage();
  //self.singlePost = ko.observableArray();
  // self.singlePostUrl = ko.pureComputed(function() {
  //     return self.Url() + "?number=1";
  // });

  // gets latest post first
  // self.getInitialPost = function() {
  //   $.getJSON(self.singlePostUrl(), function(data) {
  //     console.log("data", data);
  //     ko.mapping.fromJS(data, {}, self);
  //   });
  // };
  // self.getInitialPost();
}
