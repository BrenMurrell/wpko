function PostsModel($rootModel) {
  self = this;
  self.currentPage = ko.observable(1);
  //var postsList = [];
  self.data = ko.observableArray();
  self.Url = ko.observable($rootModel.baseUrl() + "posts/");
  self.getPostsList = function() {
    return ["test","two"];
  };
  self.postList = ko.observableArray(self.getPostsList());



  self.postsUrl = ko.pureComputed(function() {
    if($rootModel.searchString()) {
      return self.Url() + "?page=" + self.currentPage() + "&number=" + $rootModel.postsPerPage() + "&search=" + $rootModel.searchString();
    } else {
      return self.Url() + "?page=" + self.currentPage() + "&number=" + $rootModel.postsPerPage();
    }
  });


  // self.getLatestPosts = function() {
  //   $rootModel.Api.getPosts(
  //     self.postsUrl(),
  //     function (jqXhr) {
  //         //success
  //         // $("#emailPinModal").modal("hide");
  //         // $rootModel.SuccessOrErrorModel
  //         //     .displaySuccessMessage("Email sent", "An email containing your PIN has been sent.");
  //         // self.isSendingEmail(false);
  //         console.log('success');
  //     },
  //     function (jqXhr, textStatus) {
  //         //failure
  //         // self.sendPinError("Something went wrong, please try again soon (" + textStatus + ").");
  //         // $("#pinEmail").closest(".field").addClass("error");
  //         // self.isSendingEmail(false);
  //         console.log('failure');
  //     });
  // }

  //self.getLatestPosts();


  //self.posts = ko.observableArray(self.getPosts());

  //init
  //self.getPosts();

}
