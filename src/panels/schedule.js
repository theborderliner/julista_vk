import {Div, Button, Panel, PanelHeader, FixedLayout, Gallery} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/schedule.css"
import Mark from "../custom_components/mark"

class Schedule extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDay: (this.props.currentDay ? this.props.currentDay : 1),
            weekDuration : 6
        };
    }

    drawTopBar = () => {
        return(
          <FixedLayout className="scheduleWeekTopBarContainer">
              <Div className="scheduleWeekTopBar">
                  <div className="scheduleWeekDay">
                      <span>ПН</span>
                      <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}} onClick={() => this.setState({currentDay : 1})}>
                          <div className={`scheduleWeekDayDate ${this.state.currentDay === 1 ? 'scheduleWeekDaySelected' : null}`}>6</div>
                      </Button>
                  </div>
                  <div className="scheduleWeekDay">
                      <span>ВТ</span>
                      <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}} onClick={() => this.setState({currentDay : 2})}>
                          <div className={`scheduleWeekDayDate ${this.state.currentDay === 2 ? 'scheduleWeekDaySelected' : null}`}>7</div>
                      </Button>
                  </div>
                  <div className="scheduleWeekDay">
                      <span>СР</span>
                      <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}} onClick={() => this.setState({currentDay : 3})}>
                          <div className={`scheduleWeekDayDate ${this.state.currentDay === 3 ? 'scheduleWeekDaySelected' : null}`}>8</div>
                      </Button>
                  </div>
                  <div className="scheduleWeekDay">
                      <span>ЧТ</span>
                      <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}} onClick={() => this.setState({currentDay : 4})}>
                          <div className={`scheduleWeekDayDate ${this.state.currentDay === 4 ? 'scheduleWeekDaySelected' : null}`}>9</div>
                      </Button>
                  </div>
                  <div className="scheduleWeekDay">
                      <span>ПТ</span>
                      <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}} onClick={() => this.setState({currentDay : 5})}>
                          <div className={`scheduleWeekDayDate ${this.state.currentDay === 5 ? 'scheduleWeekDaySelected' : null}`}>10</div>
                      </Button>
                  </div>
                  <div className="scheduleWeekDay">
                      <span>СБ</span>
                      <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}} onClick={() => this.setState({currentDay : 6})}>
                          <div className={`scheduleWeekDayDate ${this.state.currentDay === 6 ? 'scheduleWeekDaySelected' : null}`}>11</div>
                      </Button>
                  </div>
              </Div>
          </FixedLayout>
        );
    };

    generateScheduleTale = () => {

        let generateSubjectTale = () => {
            return(
                <div className="scheduleSubjectTale">
                    <div className="scheduleSubjectTaleNumber">
                        1
                    </div>
                    <div className="scheduleSubjectTaleInfo">
                        <span className="scheduleSubjectTaleSubjectName">
                            Мировая Художественная культура
                        </span>
                        <span className="scheduleSubjectTaleHomework">
                            Выучить библию наизусть
                        </span>
                        <span className="scheduleSubjectTaleTimetable">
                            9:30 - 10:15
                        </span>
                    </div>
                    <div className="scheduleSubjectTaleMarks">
                        <Mark size="25" val="4" is_routine={false} fs="15"/>
                    </div>
                </div>
            )
        };

      return(
          <div className="scheduleTale">
              {generateSubjectTale()}
          </div>
      );
    };

    drawShedule = () => {
        console.log('day', this.state.currentDay);
        return(
          <div>
              <Gallery
                  slideWidth="100%"
                  // align="center"
                  className="scheduleSliderContainer"
                  slideIndex={this.state.currentDay > 0 ? this.state.currentDay - 1 : this.state.currentDay}
                  onChange={slideIndex => {this.setState({currentDay : (slideIndex + 1)}); console.log('slide', slideIndex);}}
                  onEnd={(this.state.currentDay > this.state.weekDuration ? this.setState({currentDay : this.state.weekDuration}) : null)}
              >
                  {this.generateScheduleTale()}
                  {this.generateScheduleTale()}
                  {this.generateScheduleTale()}
                  {this.generateScheduleTale()}
                  {this.generateScheduleTale()}
                  {this.generateScheduleTale()}
                  <div></div>
              </Gallery>
          </div>
        );
    };

    render() {
        return (
            <Panel id={this.props.id} style={{backgroundColor : "rgb(86, 144, 255)"}}>
                <PanelHeader
                    noShadow>
                    <span className="scheduleHeaderMonth">Май</span>
                </PanelHeader>
                {this.drawTopBar()}
                {this.drawShedule()}
            </Panel>
        )
    }
}

Schedule.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    currentDay: PropTypes.number
};

export default Schedule;