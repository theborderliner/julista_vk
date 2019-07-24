import React from 'react';
import { View } from '@vkontakte/vkui';
import Schedule from '../panels/schedule'
import {connect} from "react-redux";
import {getJournal} from "../redux/actions/AppLogicAction";

class ScheduleView extends React.Component {
    constructor(props) {
        super(props);
        this.currentDay = new Date().getDay();
    }

    render() {
        return (
            <View activePanel={this.props.activePanel}>
                <Schedule id="schedule"
                          currentDay={this.currentDay}
                          profile={this.props.profile}
                          getJournal={this.props.getJournalAction}
                          appData={this.props.appLogic}
                />
            </View>
        )
    }
}

const mapStateToProps = store => {
    console.log("Schedule View", store);
    return {
        activePanel: store.activePanel,
        profile: store.profile,
        appLogic: store.appLogic,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getJournalAction: (journal, userId, secret, start, end) => {
            dispatch(getJournal(journal, userId, secret, start, end))
        }
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScheduleView);