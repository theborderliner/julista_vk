import connect from '@vkontakte/vk-connect-promise';

let localData = JSON.parse(localStorage.getItem("userData"));

connect.send("VKWebAppStorageGet", {
    "keys": ["userData"],
})
    .then(res => {
        console.log("VK Storage Get Success", res);
        localData = JSON.parse(
            res.data.keys[0].value
        )
    })
    .catch(err => {
        console.log("VK Storage Get Fail", err);
        localData = JSON.parse(localStorage.getItem("userData"));
    });

let initialState;

if (localData) {
    initialState = {
        id: (localData.id ? localData.id : null),
        secret: (localData.secret ? localData.secret : null),
        diary: (localData.diary ? localData.diary : null),
        classmates: (localData.classmates ? localData.classmates : null),
        personalInfo: (localData.personalInfo ? localData.personalInfo : null),
        students: (localData.students ? localData.students : null),
        student: (localData.student
            ? localData.student
            : (localData.students
                ? localData.students[0]
                : null)),
        errMessage: null,
        isFetching: false,
        error: false,
    }
} else {
    initialState = {
        id: null,
        secret: null,
        diary: null,
        personalInfo: null,
        classmates: null,
        students: null,
        student: null,
        errMessage: null,
        isFetching: false,
        error: false,
    }
}

function profile(state = initialState, action) {
    switch (action.type) {
        case "DO_AUTHORIZATION_REQUEST":
            return {
                ...state,
                id: action.data.id,
                secret: action.data.secret,
                students: action.data.students,
                student: action.data.studentId,
                isFetching: true,
                error: false,
            };
        case "DO_VK_AUTHORIZATION_SUCCESS":
            return {
                ...state,
                id: action.data.id,
                secret: action.data.secret,
                students: action.data.students,
                student: action.data.student,
                isFetching: false,
                error: false,
            };

        case "DO_VK_AUTHORIZATION_FAIL":
            return {
                ...state,
            };

        case "DO_AUTHORIZATION_SUCCESS":
            let localData = {
                id: action.data.id,
                secret: action.data.secret,
                students: action.data.students,
            };
            localStorage.setItem("userData", JSON.stringify(localData));
            return {
                ...state,
                id: action.data.id,
                secret: action.data.secret,
                students: action.data.students,
                student: action.data.student,
                isFetching: false,
                error: false,
            };
        case "DO_AUTHORIZATION_FAIL":
            return {
                ...state,
                errMessage: action.data,
                isFetching: false,
                error: true,
            };
        case "SET_DIARY":
            let locDataDiary = localStorage.getItem("userData")
            if (locDataDiary) {
                locDataDiary = JSON.parse(locDataDiary);
                locDataDiary.diary = action.data;
                localStorage.setItem("userData", JSON.stringify(locDataDiary));
            }
            return {
                ...state,
                diary: action.data,
                isFetching: false
            };
        case "SET_USER_DATA":
            let locDataUser = localStorage.getItem("userData")
                ? JSON.parse(localStorage.getItem("userData"))
                : {};
            locDataUser.student = {
                ...state.student,
                exp: action.data.exp,
            };
            locDataUser.classmates = action.data.classmates;
            locDataUser.personalInfo = action.data.personal;
            console.log("SET_USER_DATA", action.data, locDataUser);
            localStorage.setItem("userData", JSON.stringify(locDataUser));
            return {
                ...state,
                student: {
                    ...state.student,
                    exp: action.data.exp,
                },
                classmates: action.data.classmates,
                personalInfo: action.data.personal,
            };
        case "SET_STUDENT":
            let locData = localStorage.getItem("userData")
                ? JSON.parse(localStorage.getItem("userData"))
                : {};
            locData.student = action.data;
            localStorage.setItem("userData", JSON.stringify(locData));
            // connect.send("VKWebAppStorageGet", {
            //     "keys": ["userData"],
            // })
            //     .then(res => {
            //         console.log("VK Storage Get Success", res);
            //         userData = JSON.parse(
            //             res.data.keys[0].value
            //         );
            //         userData.student = action.data;
            //         connect.send("VKWebAppStorageSet", {
            //             "key": "userData",
            //             "value": JSON.stringify(userData),
            //         })
            //             .then(res => console.log("VK Storage Set Success", res))
            //             .catch(err => {
            //                 console.log("VK Storage Set Fail", err);
            //             });
            //     })
            //     .catch(err => {
            //         console.log("VK Storage Get Fail", err);
            //     });
            return {
                ...state,
                student: action.data
            };

        case "CLEAR_PROFILE":
            localStorage.removeItem("userData");
            return {
                id: null,
                secret: null,
                diary: null,
                students: null,
                student: null,
                errMessage: null,
                isFetching: false,
                error: false,
            };

        default:
            return state
    }
}

export default profile;