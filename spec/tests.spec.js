describe("Calculating arrival time", function(){
    it("Time of arrival should be correct", function(){
        var told = "02:00";
        var tdiff = "04:40";
        var ans = "06:40";
        expect(newtime(told, tdiff)).toEqual(ans);
    });
});

describe("Admin inserting to DB", function(){
    it("Information about train should have been added", function(){
        var trainNMB = "TE000S";
        expect(writeScheduleData("1", "TE000S", "00:00", "01:00")).toEqual(trainNMB);
    });
});

describe("Showing schedules", function(){
    it("Showing first station from chosen schedule", function() {
        var st_name = "Станция 1";
        expect(ShowSchedule(1)).toEqual(st_name);
    });
});

describe("login", function(){
    it("User should have access to website", function(){
        var userEmail = "test_user@mail.ru";
        var password = "1234qwer";
        expect(login(userEmail, password)).toEqual(1);
    });
});


describe("Correct indexing", function(){
    it("Admin should have access to admin page", function(){
        var index = getCookie('newCookie');
        var newIndex = parseInt(index);
        expect(ind(4)).toEqual(newIndex);
    });
});


