
var cityname = $('#City')
var cityTemp = $('#temperature')
var cityHumidity = $('#humidity')
var cityWindSpeed = $('#wind-speed')
var dateDisplay = $('#date')
var miniDateDisplay = $('.mini-date')


var inputBtn = $('#button-addon2')
var inputContainer = $('.input-group')
var cityList = $('#city-display-list')
var firstBlock = $('.first-block')




inputContainer.on('click', '#button-addon2', function(event){
    
    var displayCityAnchor = $('<a>');
    displayCityAnchor.addClass('list-group-item list-group-item-action list-group-item-dark city');
    
    var value = $(event.target).parent('div').children('input').val().trim().toLowerCase()
    if(value == ""){
        return
    } 

    if(containsWhitespace(value)){
        const words = value.split(" ");
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        var CapitalizedWord = words.join(" ");
    } else {
        var CapitalizedWord = value.substring(0, 1).toUpperCase() + value.substring(1);
    }

    $.getJSON('cities.json', function(data) {
        $.each(data, function(key, val) {
            if(val.name == CapitalizedWord){
                let CityList = JSON.parse(localStorage.getItem("City Collection"));
                $.each(  CityList, function( i, val ){
                    if(val == CapitalizedWord){
                        CityList.splice(i, 1)
                        return
                    }
                });
                setInfo(CapitalizedWord)
                correctspelling = true
                $('#input-city').val('')
                $('.alert').text('')
                return
            }
            if(correctspelling == false){
                $('.alert').text('Invalid Input')
                return
            }
         })
    });
    correctspelling = false
})


var cityListArray = []

function storeValue(input){
    let storedCities = JSON.parse(localStorage.getItem("City Collection"));

    if(storedCities !== null){
        cityListArray = storedCities
    } 

    $.each(  cityListArray, function( i, val ){
        if(val == input){
            cityListArray.splice(i, 1)
            return
        }
      });

    cityListArray.push(input);
    localStorage.setItem('City Collection', JSON.stringify(cityListArray))
    printList()

}

function containsWhitespace(str) {
    return str.includes(' ');
  }
  

$(document).ready(function() {

    var correctspelling = false
    var posted = true

    inputContainer.keydown(function(event) {

        var value = $(event.target).parent('div').children('input').val().trim().toLowerCase()
        if(value == ""){
            return
        }
    
        if(event.which == 13){

            if(containsWhitespace(value)){
                const words = value.split(" ");
                for (let i = 0; i < words.length; i++) {
                    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
                }
                var CapitalizedWord = words.join(" ");
            } else {
                var CapitalizedWord = value.substring(0, 1).toUpperCase() + value.substring(1);
            }

            $.getJSON('cities.json', function(data) {
                $.each(data, function(key, val) {
                    if(val.name == CapitalizedWord){
                        let CityList = JSON.parse(localStorage.getItem("City Collection"));
                        $.each(  CityList, function( i, val ){
                            if(val == CapitalizedWord){
                                CityList.splice(i, 1)
                                return
                            }
                        });
                        setInfo(CapitalizedWord)
                        correctspelling = true
                        $('#input-city').val('')
                        $('.alert').text('')
                        return
                    }
                    if(correctspelling == false){

                        $('.alert').text('Invalid Input')
                        return
                    }
                 })
            });
        }
        correctspelling = false
      });
});