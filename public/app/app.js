angular.module('addressBook', ['ui.router', 'ngResource'])
    .config(configFn);

configFn.$inject = ['$stateProvider', '$urlRouterProvider'];

function configFn($stateProvider, $urlRouterProvider) {
   
    $urlRouterProvider.otherwise("/list");

    $stateProvider
        .state('list', {
            url: "/list",
            templateUrl: "app/partials/list.html",
            controller: 'ListController'
        })
        .state('form', {
            url: "/form/:id",
            templateUrl: "app/partials/form.html",
            controller: 'FormController'
        })
        .state('delete', {
            url: "/delete/:id",
            controller: 'DeleteController'
        });
}