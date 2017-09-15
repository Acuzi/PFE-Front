'use strict';

/**
 * @ngdoc function
 * @name frontApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontApp
 */
angular.module('frontApp')
    .controller('MainCtrl', function ($scope, $http, $cookies) {

        var ADRESS_SERVER = "http://localhost:8000";
        /*
         On commence par initialiser toutes les variables qui seront utilisées sur le scope.
         */
        $scope.nbHeader = 1;
        $scope.askedUrl = "/";
        $scope.name = [];
        $scope.content = [];
        $scope.HTTP = "GET";
        $scope.reponse = {};
        $scope.inventaire = {};
        //Fonction qui permet de faire un ng-repeat avec un nombre précis d'itération.
        $scope.range = function (min, max, step) {
            step = step || 1;
            var input = [];
            for (var i = min; i <= max; i += step) {
                input.push(i);
            }
            return input;
        };


        /*
        Cette fonction permet en cliquant sur le "plus" d'ajouter un à nbHeader, qui permet d'ajouter plusieurs headers
         */
        $scope.addHeader = function (moins) {
            if(!moins) {
                $scope.nbHeader++;
            }
            else if($scope.nbHeader > 1){
                $scope.nbHeader--;
            }
        };


        /*
        Cette fonction est celle qui lance la requète ajax.
         */
        $scope.goRequest = function () {

            $scope.loading = true;
            //on crée la variable des headers
            var headers = {};
            for (var i = 0; i < $scope.name.length - 1; i++) {
                headers[$scope.name[i + 1]] = $scope.content[i + 1];
            }

            // on formate la requète
            var req = {
                method: $scope.HTTP,
                url: ADRESS_SERVER + $scope.askedUrl,
                headers: headers,
                data: $scope.body
            };

            /*
            On lance la requète et attends les promesses.
            La fonction d'erreur est là même que la fonction de réussite pour gérer les cas où les codes réponses sont
            des erreurs mais qui permettent d'avancer l'histoire du jeu : une erreur 403 sur une porte par exemple.
             */
            $http(req).then(function (response) {
                    console.log(response);
                    $scope.result = response.data;
                    $scope.reponse.status = response.status;
                    $scope.reponse.status_text = response.statusText;
                    $scope.reponse.headers = response.headers();
                console.log($scope.reponse.headers);
                    $scope.reponse.headersTitles = Object.keys($scope.reponse.headers);
                    $scope.inventaire = $cookies.getAll();
                    angular.forEach($scope.inventaire, function (value, key) {
                        if (value != key) {
                            delete $scope.inventaire[key];
                        }
                    });
                    $scope.loading = false;
                $scope.error = false;

                },
                function (response, status, header) {
                    $scope.result = response.data;
                    $scope.reponse.status = response.status;
                    $scope.reponse.status_text = response.statusText;
                    $scope.reponse.headers = response.headers();
                    console.log(header);
                    console.log($scope.reponse.headers);
                    $scope.reponse.headersTitles = Object.keys($scope.reponse.headers);
                    $scope.inventaire = $cookies.getAll();
                    angular.forEach($scope.inventaire, function (value, key) {
                        if (value != key) {
                            delete $scope.inventaire[key];
                        }
                    });
                    $scope.loading = false;
                    $scope.error = true;
                });
        };

        /*
        Fonction qui permet d'hydrater le formulaire lorsque l'on clique sur un lien.
        On pourrait ajouter les autres données que l'URL, comme préremplir les différents headers, pour faire un
        tutoriel plus complet, mais le temps nous a manqué.
         */
        $scope.link = function (url) {
            $scope.askedUrl = url;
        };


        /*
        On lance au lancement de la page une recherche sur "/"
         */
            $scope.goRequest("/");
        $('.ui.dropdown')
            .dropdown();


        });
