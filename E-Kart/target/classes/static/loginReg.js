var URL = "https://fir-1c7de-default-rtdb.firebaseio.com/"
function checkIsNull(value) {
    return value === "" || value === undefined || value === null ? true : false;
}
function loginUser() {
    let requestBody = {
        "emailId": $("#contactNumId").val(),
        "password": $("#pwdId").val()
    }
    if (checkIsNull($("#contactNumId").val()) || checkIsNull($("#pwdId").val())) {
        alert("Please fill Required Data");
    } else {
        $.ajax({
            type: 'get',
            contentType: "application/json",
            dataType: 'json',
            cache: false,
            url: URL + "/gasBookingUserRegister.json",
            //data: JSON.stringify(requestBody),
            success: function (response) {
                let loginUserList = [];
                for (let i in response) {
                    let data = response[i];
                    data["userId"] = i;
                    loginUserList.push(data);
                }
                let isValid = false;
                for (let i = 0; i < loginUserList.length; i++) {
                    if (loginUserList[i].contactNum == $("#contactNumId").val() && loginUserList[i].password == $("#pwdId").val()) {
                        isValid = true;
                        localStorage.setItem("userId", loginUserList[i].userId);
                        localStorage.setItem("userData", JSON.stringify(loginUserList[i]));
                        $("#contactNumId").val('');
                        window.location.href = "eKart.html";

                    }
                }
                if (!isValid) {
                    alert("User not found");
                }

            }, error: function (error) {
                alert("Something went wrong");
            }
        });
    }
}
function registerUser() {

    if (checkIsNull($("#memberNameId").val()) || checkIsNull($("#passwordId").val()) || checkIsNull($("#contactId").val())) {
        alert("Please fill all the required data");
    } else {
        let requestBody = {
            "memberName": $("#memberNameId").val(),
            "emailId": $("#userEmailId").val(),
            "password": $("#passwordId").val(),
            "contactNum": $("#contactId").val(),
            "locationId": $('#locationId').val()
        }
        $.ajax({
            type: 'post',
            contentType: "application/json",
            dataType: 'json',
            cache: false,
            url: URL + "/gasBookingUserRegister.json",
            data: JSON.stringify(requestBody),
            success: function (response) {
                $('#regModelId').modal('hide');
                alert("Registerd sucessfully!!!");
            }, error: function (error) {
                alert("Something went wrong");
            }
        });
    }
}
$(document).ready(function () {
    $('#regModelId').on('hidden.bs.modal', function (e) {
        $("#memberNameId").val("");
        $("#userEmailId").val("");
        $("#passwordId").val("");
        $("#contactId").val("");
        $('#locationId').val("")
    })
})
