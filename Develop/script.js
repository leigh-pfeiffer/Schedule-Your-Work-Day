//Header
function getHeaderDate() {
    var currentHeaderDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentHeaderDate);
}
getHeaderDate();

// the day. would like to simplify if possible 
var myDay = [
    {
        id: "0",
        hour: "9",
        time: "9",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "4",
        hour: "1",
        time: "13",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "5",
        hour: "2",
        time: "14",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "6",
        hour: "3",
        time: "15",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "7",
        hour: "4",
        time: "16",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "8",
        hour: "5",
        time: "17",
        meridiem: "pm",
        reminder: ""
    },
    
]



// saves info
function saveReminders() {
    localStorage.setItem("myDay", JSON.stringify(myDay));
}


function displayReminders() {
    for( var i = 0; i < myDay.length; i++)
        $(`#${myDay[i].id}`).val(myDay[i].reminder);
    }

// loads local storage
function init() {
    var storedDay = JSON.parse(localStorage.getItem("myDay"));

    if (storedDay) {
        myDay = storedDay;
    }

    saveReminders();
    displayReminders();
}


// schedule

for( var i = 0; i < myDay.length; i++){
    
    var hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourRow);

    var hourField = $("<div>")
        .text(`${myDay[i].hour}${myDay[i].meridiem}`)
        .attr({
            "class": "col-md-2 hour"
    });

    var hourPlan = $("<div>")
        .attr({
            "class": "col-md-8 description p-0"
        });
    var planData = $("<textarea>");

    hourPlan.append(planData);

    planData.attr("id", myDay[i].id);
    console.log(myDay[i].time)
    console.log(moment().format("HH"))
    if (myDay[i].time < moment().format("HH")) {
        planData.attr ({
            "class": "past", 
        })
    } else if (myDay[i].time === moment().format("HH")) {
        planData.attr({
            "class": "present"
        })
    } else if (myDay[i].time > moment().format("HH")) {
        planData.attr({
            "class": "future"
        })
    }

    // save
    var saveButton = $("<i class='far fa-save fa-lg'></i>")

    var savePlan = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });

    savePlan.append(saveButton);

    hourRow.append(hourField, hourPlan, savePlan);
}

// loads storage
init();


// saves 
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".future").attr("id");
    myDay[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
    console.log(saveIndex);
    saveReminders();
    displayReminders();
})