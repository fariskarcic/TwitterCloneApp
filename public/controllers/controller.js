var myApp = angular.module('TwitterCloneApplication', []);


myApp.controller('TCCtrl', ['$scope', '$http', function ($scope, $http) {
    console.log("Controller successfully initialized.");

    var getDatetime = function () {
        return Date.now();
    };

    $scope.submitTweet = function () {
        if ($scope.tweet == undefined) {
            console.log("String empty!");
        }
        else {

            var data = { message: $scope.tweet };
            $http({
                method: 'POST',
                url: '/tweets',
                data: data,
            })
                .then(function (response) {
                    $scope.tweet = "";
                    console.log('POST Response: ' + response.statusText);
                    var dateLast = response.data.datetime;
                    var fromDate = new Date(dateLast);
                    var toDate = new Date();
                    var diff = timeDifference(toDate, fromDate);
                    var obj = { message: response.data.message, datetime: response.data.datetime, difference: diff }
                    $scope.tweets.push(obj);
                    $scope.tweetCount = $scope.tweetCount + 1;
                });

        }
    };

    $scope.remove = function (id) {
        console.log(id);
        $http({
            method: "DELETE",
            url: '/tweets/' + id
        }).then(function (response) {
            for (var i = 0; i < $scope.tweets.length; i++) {
                if ($scope.tweets[i]._id == id) {
                    $scope.tweets.splice(i, 1);
                    break;
                }
            };
            $scope.tweetCount= $scope.tweetCount - 1;
        });
    }

    $http({
        method: 'GET',
        url: '/user'
    })
        .then(function (response) {
            console.log("I got the user I requested");
            $scope.user = response.data;
        });

    $http({
        method: 'GET',
        url: '/tweets'
    })
        .then(function (response) {
            //  $scope.date = new Date();
            // var dateNow = $scope.date;
            var list = [];
            console.log("I got the tweets I requested");
            for (var i = 0; i < response.data.length; i++) {
                var dateLast = response.data[i].datetime;
                var fromDate = new Date(dateLast);
                var toDate = new Date();
                var diff = timeDifference(toDate, fromDate);
                var obj = {_id: response.data[i]._id, message: response.data[i].message, datetime: response.data[i].datetime, difference: diff };
                list.push(obj);
                numOfTweets = i;
            }
            $scope.tweetCount = i;
            $scope.tweets = list;
        });


    function timeDifference(current, previous) {

        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;

        var elapsed = current - previous;

        if (elapsed < msPerMinute) {
            return Math.round(elapsed / 1000) + ' seconds ago';
        }

        else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + ' minutes ago';
        }

        else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + ' hours ago';
        }

        else if (elapsed < msPerMonth) {
            return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
        }

        else if (elapsed < msPerYear) {
            return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
        }

        else {
            return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
        }
    }
}]);