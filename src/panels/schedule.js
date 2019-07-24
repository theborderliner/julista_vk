import {Div, Button, Panel, PanelHeader, FixedLayout, Gallery,} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/schedule.css"
import Mark from "../custom_components/mark"
import CustomSpinner from "../custom_components/customSpinner"
import {scheduleGetDates, getRusMonthName} from "../utils/utils"

class Schedule extends React.Component {
    constructor(props) {
        super(props);

        this.dayDates = scheduleGetDates();
        this.scheduleData = this.props.appData.journal;
        let flag = this.props.appData.journal.data.days.length === 0;

        this.state = {
            currentDay: (this.props.currentDay ? this.props.currentDay === 0 ? 6 : this.props.currentDay : 1),
            month: getRusMonthName(new Date().getMonth()),
            weekDuration: (!flag ? this.scheduleData.data.days.length : 5),
            ready: !flag,
            heights: [],
        };

        if (flag)
            this.loadData();
    }

    loadData = async () => {
        this.props.getJournal([], this.props.profile.id, this.props.profile.secret, this.dayDates[7], this.dayDates[8]);
        let journal = this.props.appData.journal;

        let id = setInterval(() => {
            if (this.props.appData.journal.length !== 0) {
                this.scheduleData = this.props.appData.journal;
                clearInterval(id);
                this.setState({
                    ready: true,
                    weekDuration: (this.scheduleData.data.days.length > 5 ? 6 : 5) // if holidays, length is equal to 0
                });
            }
        }, 200);

    };

    drawSpinner = () => {
        return (
            <CustomSpinner isInverse={false}/>
        );
    };

    drawTopBar = () => { //FIXME
        return (
            <FixedLayout className="scheduleWeekTopBarContainer">
                <Div className="scheduleWeekTopBar">
                    <div className="scheduleWeekDay">
                        <span>ПН</span>
                        <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}}
                                onClick={() => this.setState({currentDay: 1})}>
                            <div
                                className={`scheduleWeekDayDate ${this.state.currentDay === 1 ? 'scheduleWeekDaySelected' : null}`}>
                                {this.dayDates[0]}
                            </div>
                        </Button>
                    </div>
                    <div className="scheduleWeekDay">
                        <span>ВТ</span>
                        <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}}
                                onClick={() => this.setState({currentDay: 2})}>
                            <div
                                className={`scheduleWeekDayDate ${this.state.currentDay === 2 ? 'scheduleWeekDaySelected' : null}`}>
                                {this.dayDates[1]}
                            </div>
                        </Button>
                    </div>
                    <div className="scheduleWeekDay">
                        <span>СР</span>
                        <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}}
                                onClick={() => this.setState({currentDay: 3})}>
                            <div
                                className={`scheduleWeekDayDate ${this.state.currentDay === 3 ? 'scheduleWeekDaySelected' : null}`}>
                                {this.dayDates[2]}
                            </div>
                        </Button>
                    </div>
                    <div className="scheduleWeekDay">
                        <span>ЧТ</span>
                        <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}}
                                onClick={() => this.setState({currentDay: 4})}>
                            <div
                                className={`scheduleWeekDayDate ${this.state.currentDay === 4 ? 'scheduleWeekDaySelected' : null}`}>
                                {this.dayDates[3]}
                            </div>
                        </Button>
                    </div>
                    <div className="scheduleWeekDay">
                        <span>ПТ</span>
                        <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}}
                                onClick={() => this.setState({currentDay: 5})}>
                            <div
                                className={`scheduleWeekDayDate ${this.state.currentDay === 5 ? 'scheduleWeekDaySelected' : null}`}>
                                {this.dayDates[4]}
                            </div>
                        </Button>
                    </div>
                    {(
                        this.state.weekDuration === 6 ?
                            <div className="scheduleWeekDay">
                                <span>СБ</span>
                                <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}}
                                        onClick={() => this.setState({currentDay: 6})}>
                                    <div
                                        className={`scheduleWeekDayDate ${this.state.currentDay === 6 ? 'scheduleWeekDaySelected' : null}`}>
                                        {this.dayDates[5]}
                                    </div>
                                </Button>
                            </div>
                            :
                            null
                    )}
                </Div>
            </FixedLayout>
        );
    };

    generateScheduleTale = (day) => {
        let generateSubjectTale = (num, subjectName, subjectHomework, subjectTime) => {
            return (
                <div className="scheduleSubjectTale">
                    <div className="scheduleSubjectTaleNumber">
                        {num}
                    </div>
                    <div className="scheduleSubjectTaleInfo">
                        <span className="scheduleSubjectTaleSubjectName">
                            {subjectName}
                        </span>
                        <span className="scheduleSubjectTaleHomework">
                            {subjectHomework}
                        </span>
                        <span className="scheduleSubjectTaleTimetable">
                            {subjectTime[0]} - {subjectTime[1]}
                        </span>
                    </div>
                    <div className="scheduleSubjectTaleMarks">
                        <Mark size="25" val="4" is_routine={false} fs="15"/>
                    </div>
                </div>
            )
        };

        let subjectTales = [];

        let subjects = day.subjects;
        subjects.forEach((subject, num) => {
            subjectTales.push(generateSubjectTale(subject.number, subject.name, "", subject.time))
        });

        subjectTales.push(<div className="scheduleSubjectLastChild"></div>);

        return (
            <div className="scheduleTale">
                {subjectTales}
            </div>
        );
    };
    generateEmptyTale = () => {
        return (
            <div className="scheduleTale">
                <p>Сегодня нет занятий</p>
            </div>
        )
    };

    generateSchedule = () => {
        let days = this.scheduleData.data.days;
        let tales = [];

        days.forEach((day) => {
            tales.push(this.generateScheduleTale(day));
        });

        if (tales.length === 0) {
            for (let i = 0; i < 5; i++) {
                tales.push(this.generateEmptyTale());
            }
        }

        tales.push(<div></div>);
        return tales
    };

    // fixHeight = () => {
    //     setTimeout(() => {
    //         if (this.state.heights.length === 0){
    //             let tempArr = [];
    //             for (let i = 0; i < this.state.weekDuration; i++) {
    //                 tempArr.push(document.getElementsByClassName("scheduleTale")[i].offsetHeight)
    //             }
    //             this.setState({heights : tempArr});
    //         } else {
    //             document.getElementsByClassName("scheduleSliderContainer")[0].style.height =
    //                 `${this.state.heights[this.state.currentDay - 1]}px`;
    //         }
    //         console.log(document.getElementsByClassName("scheduleTale")[this.state.currentDay - 1].offsetHeight)
    //
    //     }, 200);
    // };

    drawShedule = () => {
        return (
                <Gallery
                    slideWidth="100%"
                    className="scheduleSliderContainer"
                    slideIndex={this.state.currentDay > 0 ? this.state.currentDay - 1 : this.state.currentDay}
                    onChange={slideIndex => {
                        this.setState({currentDay: (slideIndex + 1)});
                    }}
                    onEnd={(this.state.currentDay > this.state.weekDuration ? this.setState({currentDay: this.state.weekDuration}) : null)}
                >
                    {this.generateSchedule()}
                </Gallery>
        );
    };

    render() {
        return (
            <Panel id={this.props.id} style={{backgroundColor: "rgb(86, 144, 255)"}}>
                <PanelHeader
                    noShadow>
                    <span className="scheduleHeaderMonth">{this.state.month}</span>
                </PanelHeader>
                {this.drawTopBar()}
                {
                    (this.state.ready ? this.drawShedule() : this.drawSpinner())
                }
                {/*{*/}
                {/*    this.state.ready ? this.fixHeight() : null*/}
                {/*}*/}
            </Panel>
        )
    }
}

Schedule.propTypes = {
    id: PropTypes.string.isRequired,
    currentDay: PropTypes.number,
    profile: PropTypes.any.isRequired,
    getJournal: PropTypes.func.isRequired,
    appData: PropTypes.any.isRequired,
};

export default Schedule;