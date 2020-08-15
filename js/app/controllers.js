var app = angular.module("meuModulo", []);
app.controller("indexController", function ($scope, $http) {
    var url = "https://tranquil-waters-16323.herokuapp.com/contacts/";
    $scope.editing = false;

    $scope.loadContact = function () {
        $http.get(url).success(function (response) {
            $scope.contacts = response;
        }).error(function (){
            console.log("Erro na requisição");
        });
    }

    $scope.openAddContact = function () {
        $scope.editing = false;
        limpaform();
        $("#modal1").openModal();
    }

    $scope.addContact = function (contact) {
        $http.post(url, contact).then($scope.loadContact);
        $('#modal1').closeModal();
    }

    $scope.editContact = function (contact) {
        $scope.editing = true;
        $scope.contact = angular.copy(contact);
        $("#modal1").openModal();

    }

    $scope.saveContact = function (contact) {
        $http.put(url + contact.id, contact).then($scope.loadContact);
        $('#modal1').closeModal();
    }

    $scope.deleteContact = function (contact) {
        // for(var index in $scope.contacts){
        //     var aux = $scope.contacts[index];
        //     if(question === aux){
        //          $scope.contacts.splice(index,1);
        //     }
        // }

        $http.delete(url + contact.id).then(function (response) {
            $scope.loadContact();
         // $scope.contacts.splice(i, 1);
        });
    }

    var limpaform = function () {
        $scope.contact = { name: "", email: "", phone: "" };
    }
    $scope.loadContact();

});