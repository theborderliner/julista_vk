import {setCorrectYear} from "../../utils/utils"

const axios = require('axios');
let baseUrl = "https://bklet.ml/";

export function getJournal(journal, id, secret, start, end) {
    return dispatch => {
        dispatch({
            type: "GET_JOURNAL_REQUEST",
            data: journal,
        });

        getSchedule(id, secret, start, end, dispatch);
    }
}
function getSchedule(id, secret, start, end, dispatcher) {
    let methodUrl = "api/diary/journal/dates/";

    let queries = `?id=${id}&secret=${secret}&start=${setCorrectYear(start.toLocaleDateString())}&end=${setCorrectYear(end.toLocaleDateString())}`;

    console.log("q", queries);

    axios.get(baseUrl + methodUrl + queries)
        .then((response) => {
            console.log("resp", response.data);
            dispatcher({
                type:"GET_JOURNAL_SUCCESS",
                data: response.data
            })
        });
}

export function getMarks(id, secret) {
    return dispatch => {
        dispatch({
            type: "GET_MARKS_REQUEST",
            data: {
                data : []
            },
        });

        getAndAggregateMarks(id, secret, dispatch)
    }
}
function getAndAggregateMarks(id, secret, dispatcher) {
    let methodUrl = "api/diary/marks/all/";
    let startDate = new Date(2018, 9, 3);
    let endDate = new Date();

    let queries = `?id=${id}&secret=${secret}&start=${setCorrectYear(startDate.toLocaleDateString())}&end=${setCorrectYear(endDate.toLocaleDateString())}`;

    console.log(baseUrl + methodUrl + queries);

    axios.get(baseUrl + methodUrl + queries)
        .then((response) => {
            console.log("resp", response.data);
            dispatcher({
                type:"GET_MARKS_SUCCESS",
                data: response.data
            })
        });
}