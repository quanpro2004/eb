var myapp = angular
  .module("myapp", ["ngRoute"])
  .config(function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "home.html?" + Math.random(),
        controller: "homeCtrl",
      })
      .when("/cart", {
        templateUrl: "cart.html?" + Math.random(),
        controller: "cartCtrl",
      })
      .when("/detail/:id", {
        templateUrl: "detail.html?" + Math.random(),
        controller: "detailCtrl",
      })
      .when("/list", {
        templateUrl: "list.html?" + Math.random(),
        controller: "listCtrl",
      })
      .when("/login", {
        templateUrl: "login.html?" + Math.random(),
        controller: "loginCtrl",
      })
      .when("/signup", {
        templateUrl: "signup.html?" + Math.random(),
        controller: "listCtrl",
      })
      .when("/contact", {
        templateUrl: "contact.html?" + Math.random(),
        controller: "contactCtrl",
      })
      .when("/ps5", {
        templateUrl: "ps5.html?" + Math.random(),
        controller: "ps5Ctrl",
      })
      .when("/ps4", {
        templateUrl: "ps4.html?" + Math.random(),
        controller: "ps4Ctrl",
      })
      .when("/xbox", {
        templateUrl: "xbox.html?" + Math.random(),
        controller: "xboxCtrl",
      })
      .when("/nintendo", {
        templateUrl: "nintendo.html?" + Math.random(),
        controller: "nintendoCtrl",
      })
      .when("/chs", {
        templateUrl: "chs.html?" + Math.random(),
        controller: "chsCtrl",
      })
      .otherwise({
        template: "<h1>404 - Not Found</h1>",
      });
  })
  .controller("myctrl", function ($scope, $http, $rootScope) {
    $scope.dsSP = [];
    $scope.carts = [];

    $http.get("list.json").then(
      function (res) {
        console.log(res);
        $scope.dsSP = res.data;
      },
      function (res) {
        alert("Lỗi tải dữ liệu");
      }
    );
    $rootScope.cart = []; // để lưu giỏ hàng khi load lại trang dùng localstorage
    $scope.addToCart = function (sp) {
      let inCart = false;
      for (i = 0; i < $rootScope.cart.length; i++) {
        // sản phẩm đã có trong giỏ hàng --> +1 sản phẩm
        if ($rootScope.cart[i].id == sp.id) {
          $rootScope.cart[i].quanlity++;
          inCart = true;
          break;
        }
      }
      if (!inCart) {
        //Sản phẩm chưa có trong giỏ hàng--> Thêm vào giỏ hàng
        sp.quanlity = 1;
        $rootScope.cart.push(sp);
      }
      console.log($rootScope.cart);
    };
    $scope.getAmount = function () {
      var amount = 0;
      for (var i = 0; i < $scope.cart.length; i++) {
          if ($scope.cart[i].buy) {
              amount += $scope.cart[i].price * $scope.cart[i].quanlity;
          }
      }
      return amount;
  }
  })
  .controller("homeCtrl", function ($scope, $http) {
    $scope.dsSP = [];
    $http.get("product.json").then(
      function (res) {
        $scope.dsSP = res.data;
      },
      function (res) {
        alert("Lỗi không tải được dữ liệu!");
      }
    );
  })
  .controller("detailCtrl", function ($scope, $routeParams) {
    $scope.id = $routeParams.id;
    for (let i = 0; i < $scope.dsSP.length; i++) {
      if ($scope.dsSP[i].id == $scope.id) {
        $scope.sp = $scope.dsSP[i];
      }
    }
  })
  .controller("cartCtrl", function ($scope) {
    
  })
  .controller("listCtrl", function ($scope, $http) {
    $scope.limit = 8;
    // $scope.page = 1;
    $scope.start = ($scope.page - 1) * $scope.limit;

    $scope.totalPage = Math.ceil($scope.dsSP.length / $scope.limit);

    $scope.pageList = [];
    for (i = 1; i <= $scope.totalPage; i++) {
      $scope.pageList.push(i);
    }

    $scope.changePage = function (trang) {
      $scope.page = trang;
      $scope.start = ($scope.page - 1) * $scope.limit;
    };
  })
  .controller("loginCtrl", function ($scope) {})
  .controller("aboutCtrl", function ($scope) {})
  .controller("chsCtrl", function ($scope) {})
  .filter("searchProduct", function () {
    return function (input, keyword, attr) {
      if (!keyword) return input;
      var output = [];
      for (var i = 0; i < input.length; i++) {
        for (var j = 0; j < attr.length; j++) {
          if (
            input[i][attr[j]]
              .toString()
              .toLowerCase()
              .indexOf(keyword.toLowerCase()) >= 0
          ) {
            output.push(input[i]);
          }
        }
      }
      return output;
    };
  })
myapp.directive("passwordMatch", function () {
  return {
    require: "ngModel",
    link: function (scope, elem, attrs, ctrl) {
      var firstPassword = "#" + attrs.passwordMatch;
      elem.add(firstPassword).on("keyup", function () {
        scope.$apply(function () {
          var v = elem.val() === $(firstPassword).val();
          ctrl.$setValidity("passwordMatch", v);
        });
      });
    },
  };
});
// .run(function($rootScope,$timeout){
//   $rootScope.$on('$routeChangeStart',function(){
//       $rootScope.loading=true;
//   });
//   $rootScope.$on('$routeChangeSuccess',function(){
//       $timeout(function(){
//       $rootScope.loading=false;},2000);
//   });
//   $rootScope.$on('$routeChangeError',function(){
//       $rootScope.loading=false;
//       alert('Lỗi không tải được trang');
//   });
//   })
