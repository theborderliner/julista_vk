const axios = require('axios');
let baseUrl = "http://bklet.ml/";

export function doAuthorize(login, password, diary, region, province, city, school) {
    return dispatch => {
        dispatch({
            type: "DO_AUTHORIZATION_REQUEST",
            data: {
                id: null,
                secret: null,
                students: [],
                student: null,
            },
        });

        auth(login, password, diary, dispatch)
    }
}

function auth(login, password, diary, dispatcher, region, province, city, school) {
    let methodUrl = "api/auth/";
    // let json ={
    //     diary : diary,
    //     login : login,
    //     password : password,
    //     region: region,
    //     province: province,
    //     city: city,
    //     school: school,
    // };
    let json = {
        region: 40,
        province: -1,
        city: 1,
        school: 293,
        login: "ПетроваВ2",
        password: "Петрова302",
        diary: "netschool",
    };
    console.log(baseUrl + methodUrl, json);

    axios.post(baseUrl + methodUrl, json)
        .then((response) => {
            console.log("resp", response.data);
            let students = [];
            response.data.students.list.forEach(e => {
                students.push(e);
            });
            if (response.data.status) {
                let localData = {
                    id: response.data.id,
                    secret: response.data.secret,
                    students: students,
                    diary: diary,
                    // student: (students.length === 1 ? students[0]: null),
                    student: null,
                };
                localStorage.setItem("userData", JSON.stringify(localData));
                dispatcher({
                    type: "DO_AUTHORIZATION_SUCCESS",
                    data: {
                        id: response.data.id,
                        secret: response.data.secret,
                        students: students,
                        // student: (students.length === 1 ? students[0]: null),
                        student: null,
                    },
                })
            } else {
                dispatcher({
                    type: "DO_AUTHORIZATION_FAIL",
                    data: response.data
                })
            }
        })
        .catch(error => {
            console.log("auth error", error);
            dispatcher({
                type: "DO_AUTHORIZATION_FAIL",
                data: error
            })
        });
}

export function setDiary(diary) {
    return {
        type: "SET_DIARY",
        data: diary,
    }
}

export function setStudent(student) {
    return {
        type: "SET_STUDENT",
        data: student,
    }
}