'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
angular.module('sbAdminApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'ui.checkbox',
    'ui.bootstrap.datetimepicker',
])

.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
    });

    $urlRouterProvider.otherwise('/404');

    $stateProvider

    .state('404', {
        url: '/404',
        templateUrl: '404.html',
    })

    .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'views/dashboard/main.html',
        resolve: {
            loadMyDirectives: function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'sbAdminApp',
                    files: [
                        'scripts/directives/header/header.js',
                        'scripts/directives/header/header-notification/header-notification.js',
                        'scripts/directives/sidebar/sidebar.js',
                        'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                    ]
                }), $ocLazyLoad.load({
                    name:'toggle-switch',
                    files:[
                        "bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                        "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                    ]
                }), $ocLazyLoad.load({
                    name:'ngAnimate',
                    files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load({
                    name:'ngCookies',
                    files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load({
                    name:'ngResource',
                    files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load({
                    name: 'ngSanitize',
                    files: [
                        'bower_components/angular-sanitize/angular-sanitize.js'
                    ]
                })
                $ocLazyLoad.load({
                    name: 'ngTouch',
                    files: [
                        'bower_components/angular-touch/angular-touch.js'
                    ]
                })
            }
        }
    })

    .state('dashboard.home',{
        url: '/home',
        controller: 'MainCtrl',
        templateUrl: 'views/dashboard/home.html',
        resolve: {
            loadMyFiles: function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'sbAdminApp',
                    files: [
                        'scripts/controllers/main.js',
                        'scripts/directives/timeline/timeline.js',
                        'scripts/directives/notifications/notifications.js',
                        'scripts/directives/chat/chat.js',
                        'scripts/directives/dashboard/stats/stats.js'
                    ]
                })
            }
        }
    })

    .state('dashboard.form', {
        templateUrl: 'views/form.html',
        url: '/form',
        controller: 'FormCtrl',
        resolve: {
            loadMyFiles: function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'sbAdminApp',
                    files: [
                        'scripts/controllers/form.js'
                    ]
                })
            }
        }
    })

    .state('dashboard.blank', {
        templateUrl: 'views/pages/blank.html',
        url: '/blank'
    })

    .state('login', {
        templateUrl: 'views/pages/login.html',
        url: '/login'
    })

    .state('dashboard.chart',{
        templateUrl: 'views/chart.html',
        url: '/chart',
        controller: 'ChartCtrl',
        resolve: {
            loadMyFile:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'chart.js',
                    files: [
                        'bower_components/angular-chart.js/dist/angular-chart.min.js',
                        'bower_components/angular-chart.js/dist/angular-chart.css'
                    ]
                }), $ocLazyLoad.load({
                    name: 'sbAdminApp',
                    files: ['scripts/controllers/chartContoller.js']
                })
            }
        }
    })

    .state('dashboard.table', {
        templateUrl: 'views/table.html',
        url: '/table'
    })

    .state('dashboard.panels-wells', {
        templateUrl: 'views/ui-elements/panels-wells.html',
        url: '/panels-wells'
    })

    .state('dashboard.buttons', {
        templateUrl: 'views/ui-elements/buttons.html',
        url: '/buttons'
    })

    .state('dashboard.notifications', {
        templateUrl: 'views/ui-elements/notifications.html',
        url: '/notifications'
    })

    .state('dashboard.typography', {
        templateUrl: 'views/ui-elements/typography.html',
        url: '/typography'
    })

    .state('dashboard.icons', {
        templateUrl: 'views/ui-elements/icons.html',
        url: '/icons'
    })

    .state('dashboard.grid', {
        templateUrl: 'views/ui-elements/grid.html',
        url: '/grid'
    })

    .state('dashboard.datetimepicker', {
        templateUrl: 'views/ui-elements/datetimepicker.html',
        url: '/datetimepicker'
    })

}])

.config(function($httpProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    var param = function(obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

        for (name in obj) {
            value = obj[name];

            if (value instanceof Array) {
                for (i = 0; i < value.length; i++) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                };
            } else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            } else if (value !== undefined && value !== null) {
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    }

    $httpProvider.defaults.transformRequest = [function(data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
});
