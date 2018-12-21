describe("Calculating arrival time", function(){
    it("Time of arrival should be correct", function(){
        var told = "02:00";
        var tdiff = "04:40";
        var ans = "06:40";
        expect(newtime(told, tdiff)).toEqual(ans);
    });
});

describe("Comparing time(1)", function(){
    it("Comparsion of time (early)", function(){
        var time = "03:20";
        var departure = "04:00";
        var arrival = "06:00";
        var ans = -1;
        expect(time_check(time, departure, arrival)).toEqual(ans);
    });
});

describe("Comparing time(2)", function(){
    it("Comparsion of time (in progress)", function(){
        var time = "11:20";
        var departure = "10:00";
        var arrival = "13:00";
        var ans = 0;
        expect(time_check(time, departure, arrival)).toEqual(ans);
    });
});

describe("Comparing time(3)", function(){
    it("Comparsion of time (late)", function(){
        var time = "06:20";
        var departure = "04:00";
        var arrival = "06:00";
        var ans = 1;
        expect(time_check(time, departure, arrival)).toEqual(ans);
    });
});

describe("Correct indexing", function(){
    it("Admin should have access to admin page", function(){
        var index = getCookie('newCookie');
        var newIndex = parseInt(index);
        expect(ind(4)).toEqual(newIndex);
    });
});

// describe("Admin inserting to DB", function(){
//     it("Information about train should have been added", function(){
//         var trainNMB = "TE000S";
//         expect(writeScheduleData("1", "TE000S", "00:00", "01:00")).toEqual(trainNMB);
//     });
// });

// describe("Showing schedules", function(){
//     it("Showing first station from chosen schedule", function() {
//         var st_name = "Станция 1";
//         expect(ShowSchedule(1)).toEqual(st_name);
//     });
// });

// describe("login", function(){
//     it("User should have access to website", function(){
//         var userEmail = "test_user@mail.ru";
//         var password = "1234qwer";
//         expect(login(userEmail, password)).toEqual(1);
//     });
// });


