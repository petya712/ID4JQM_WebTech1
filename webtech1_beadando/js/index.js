$(function() {

    $('#addCarForm').on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: 'https://webtechcars.herokuapp.com/api/cars',
            data: JSON.stringify({
                name: $("#addCarName").val(),
                consumption: $("#addConsumption").val(),
                color: $("#addColor").val(),
                manufacturer: $("#dropdown").val(),
                avaiable: $("#addAvailable").val(),
                year: $("#addYear").val(),
                horsepower: $("#addHorsepower").val()

            }),
            contentType: "application/json",
            success: function () {
                listCars()
            },
            error: function () {
                alert("Error!");
            }
        })
    });

    $('#modCarForm').on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: 'https://webtechcars.herokuapp.com/api/cars',
            data: JSON.stringify({
                id: $("#modCarID").val(),
                name: $("#modCarName").val(),
                consumption: $("#modConsumption").val(),
                color: $("#modColor").val(),
                manufacturer: $("#moddropdown").val(),
                avaiable: $("#modAvailable").val(),
                year: $("#modYear").val(),
                horsepower: $("#modHorsepower").val()

            }),
            contentType: "application/json",
            success: function () {
                deleteCar($("#modCarID").val())
                listCars()
            },
            error: function () {
                alert("Error!");
            }
        })
    });

    $('#addManufacturerForm').on("submit", function (e) {
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: 'https://webtechcars.herokuapp.com/api/manufacturers',
            data: JSON.stringify({
                name: $("#addName").val(),
                country: $("#addCountry").val(),
                founded: $("#addFounded").val()
            }),
            contentType: "application/json",
            success: function () {
                listManufacturers()
            },
            error: function () {
                alert("Error!");
            }
        })
    });

    $('#modManufacturerForm').on("submit", function (e) {
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: 'https://webtechcars.herokuapp.com/api/manufacturers',
            data: JSON.stringify({
                id: $("#modId").val(),
                name: $("#modName").val(),
                country: $("#modCountry").val(),
                founded: $("#modFounded").val()
            }),
            contentType: "application/json",
            success: function () {
                deleteManufacturer($("#modId").val())
                listManufacturers()
            },
            error: function () {
                alert("Error!");
            }
        })
    });


});




function listCars() {

    $("#description").fadeOut(700);
    $(".contentImage").fadeOut(700);
    $("#listCar").fadeIn(700);
    $("#listManufacturers").fadeOut(0);
    $("#addCar").fadeOut(0);
    $("#addManufacturer").fadeOut(0);
    $("#modManufacturer").fadeOut(0);
    $("#modCar").fadeOut(0);


    $.getJSON('https://webtechcars.herokuapp.com/api/cars', function (data) {
        let table = $('<table id="listTableCar"></table>');
        table.append('<tr><th class="listth">Modify</th><th class="listth">Delete</th><th class="listth">ID</th><th class="listth">Name</th><th class="listth">Consumption</th><th class="listth">Color</th><th class="listth">Manufacturer</th><th class="listth">Available</th><th class="listth">Year</th><th class="listth">Horsepower</th></tr>');
        $.each(data, function (key, value) {
            let row = $('<tr></tr>');
            let delButton = $('<td class="listtd"><button onclick="deleteCar(\''+value._id+'\')">Delete</button></td>');
            let modButton = $("<td class='listtd'><button onclick='modifyCar("+JSON.stringify(value)+")'>Modify</button></td>");
            let idCell = $('<td class="listtd">' +value._id+ '</td>');
            let nameCell = $('<td class="listtd">' + value.name + '</td>');
            let consumptionCell = $('<td class="listtd">' + value.consumption +'</td>');
            let colorCell = $('<td class="listtd">' + value.color + '</td>');
            let manufacturerCell = $('<td class="listtd">' + value.manufacturer +' </td>');
            let availableCell = $('<td class="listtd">' + value.avaiable + '</td>');
            let yearCell = $('<td class="listtd">' + value.year + '</td>');
            let horsepowerCell = $('<td class="listtd">' + value.horsepower + '</td>');
            row.append(modButton);
            row.append(delButton);
            row.append(idCell);
            row.append(nameCell);
            row.append(consumptionCell);
            row.append(colorCell);
            row.append(manufacturerCell);
            row.append(availableCell);
            row.append(yearCell);
            row.append(horsepowerCell);
            table.append(row)
        });
        $('#listCar').html(table);
    });

}

function toHome() {
    $("#description").fadeIn(700);
    $(".contentImage").fadeIn(700);
    $("#listManufacturers").fadeOut(1);
    $("#listCar").fadeOut(1);
    $("#addCar").fadeOut(1);
    $("#addManufacturer").fadeOut(1);
    $("#modManufacturer").fadeOut(1);
    $("#modCar").fadeOut(1);
}

function addCar() {
    $("#description").fadeOut(600);
    $(".contentImage").fadeOut(600);
    $("#listManufacturers").fadeOut(0);
    $("#listCar").fadeOut(0);
    $("#addCar").fadeIn(600);
    $("#addManufacturer").fadeOut(0);
    $("#modManufacturer").fadeOut(0);
    $("#modCar").fadeOut(0);


    let dropdown = $('#dropdown');

    dropdown.empty();
    dropdown.append('<option  disabled>Choose from manufacturers</option>');
    dropdown.prop('selectedIndex', 0);
    const url = 'https://webtechcars.herokuapp.com/api/manufacturers';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            dropdown.append($('<option></option>').attr('value', entry.id).text(entry.name));
        })
    });
}

function modCar() {
    $("#description").fadeOut(700);
    $(".contentImage").fadeOut(700);
    $("#listManufacturers").fadeOut(0);
    $("#listCar").fadeOut(0);
    $("#addCar").fadeOut(0);
    $("#modManufacturer").fadeOut(0);
    $("#addManufacturer").fadeOut(0);
    $("#modCar").fadeIn(700);

}

function modifyCar(car){
    modCar()
    $('#modCarForm #modCarID').val(car._id)
    $('#modCarForm #modCarName').val(car.name)
    $('#modCarForm #modConsumption').val(car.consumption)
    $('#modCarForm #modColor').val(car.color)
    $('#modCarForm #modManufacturer').val(car.manufacturer)
    $('#modCarForm #modAvailable').val(car.avaiable)
    $('#modCarForm #modYear').val(car.year)
    $('#modCarForm #modHorsepower').val(car.horsepower)

    let dropdown = $('#moddropdown');
    let manuf = [];

    $('#moddropdown option').remove();
    dropdown.append('<option value="0" disabled>Choose from manufacturers</option>');

    const url = 'https://webtechcars.herokuapp.com/api/manufacturers';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            dropdown.append($('<option></option>').attr('value', entry._id).text(entry.name));
        })
        manuf = data;
    }).then(function (){
        dropdown.val(0);
        for (let i in manuf) {
            if (manuf[i].name === car.manufacturer) {
                dropdown.val(manuf[i]._id);
            }
        }
    });
}

function deleteCar (id) {
    $.ajax({
        url: 'https://webtechcars.herokuapp.com/api/cars/' +id,
        type: 'DELETE',
        contentType: "application/json",
        success: function () {
            listCars();
        },
        error: function () {
            alert("Error!");
        }
    });
}


function listManufacturers() {
    $("#description").fadeOut(600);
    $(".contentImage").fadeOut(600);
    $("#listManufacturers").fadeIn(600);
    $("#listCar").fadeOut(0);
    $("#addCar").fadeOut(0);
    $("#addManufacturer").fadeOut(0);
    $("#modManufacturer").fadeOut(0);
    $("#modCar").fadeOut(0);

    $.getJSON("https://webtechcars.herokuapp.com/api/manufacturers", function (data) {
        let table = $('<table id="listTableManufacturers"></table>');
        table.append('<tr><th class="listth">Modify</th><th class="listth">Delete</th><th class="listth">ID</th><th class="listth">Name</th><th class="listth">Country</th><th class="listth">Founded</th></tr>');
        $.each(data, function (key, value) {
            let row = $('<tr></tr>');
            let delButton = $('<td class="listtd"><button onclick="deleteManufacturer(\''+value._id+'\')">Delete</button></td>');
            let modButton = $("<td class='listtd'><button onclick='modifyManufacturer("+JSON.stringify(value)+")'>Modify</button></td>");
            let idCell = $('<td class="listtd">' + value._id + '</td>');
            let nameCell = $('<td class="listtd">' + value.name + '</td>');
            let countryCell = $('<td class="listtd">' + value.country + ' </td> ');
            let foundedCell = $('<td class="listtd">' + value.founded + ' </td>');
            row.append(modButton);
            row.append(delButton);
            row.append(idCell);
            row.append(nameCell);
            row.append(countryCell);
            row.append(foundedCell);
            table.append(row)
        });
        $('#listManufacturers').html(table);
    });
}

function deleteManufacturer (id) {
    $.ajax({
        url: 'https://webtechcars.herokuapp.com/api/manufacturers/'+id,
        type: 'DELETE',
        contentType: "application/json",
        success: function () {
            listManufacturers();
        },
        error: function () {
            alert("Error!");
        }
    });

}

function modifyManufacturer(manuf){
    modManufacturer()
    $('#modManufacturerForm #modId').val(manuf._id)
    $('#modManufacturerForm #modName').val(manuf.name)
    $('#modManufacturerForm #modCountry').val(manuf.country)
    $('#modManufacturerForm #modFounded').val(manuf.founded)
}

function addManufacturer() {
    $("#description").fadeOut(700);
    $(".contentImage").fadeOut(700);
    $("#listManufacturers").fadeOut(0);
    $("#listCar").fadeOut(0);
    $("#addCar").fadeOut(0);
    $("#addManufacturer").fadeIn(700);
    $("#modManufacturer").fadeOut(0);
    $("#modCar").fadeOut(0);

}

function modManufacturer() {
    $("#description").fadeOut(700);
    $(".contentImage").fadeOut(700);
    $("#listManufacturers").fadeOut(0);
    $("#listCar").fadeOut(0);
    $("#addCar").fadeOut(0);
    $("#modManufacturer").fadeIn(700);
    $("#addManufacturer").fadeOut(0);
    $("#modCar").fadeOut(0);

}




