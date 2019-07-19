import React from 'react';
import PropTypes from 'prop-types';
import {Div, PanelHeader, View, Panel, Button, ScreenSpinner} from '@vkontakte/vkui';
import Auth from '../panels/auth'
import ChooseDiary from '../panels/choose_diary'
import "./styles/Authorization.css"
import {setId} from "../redux/actions/IdAction";
import {setSecret} from "../redux/actions/SecretAction";
import {setDiary} from "../redux/actions/DiaryAction";
import {setPanel} from "../redux/actions/PanelAction";
import {setView} from "../redux/actions/ViewAction";
import {connect} from 'react-redux'


class AuthorizationView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            popout: null
        }
    }

    viewScreenSpinner = (switcher) => {
        this.setState({popout: (switcher ? <ScreenSpinner/> : null)});
        console.log("start spinner", switcher);
        // this.setState({popout: <ScreenSpinner/>})
    };

    render() {
        return (
            <View popout={this.state.popout} activePanel={this.props.activePanel}>
                <ChooseDiary id="choose_diary"
                             setDiary={this.props.setDiaryAction}
                             setPanel={this.props.setPanelAction}
                />
                <Auth id="auth"
                      diary={this.props.diary}
                      fetchedUser={this.props.fetchedUser}
                      setSpinner={this.viewScreenSpinner}
                      setView={this.props.setViewAction}
                      setPanel={this.props.setPanelAction}
                      setId={this.props.setIdAction}
                      setSecret={this.props.setSecretAction}
                />
            </View>
        )
    }
}


const mapStateToProps = store => {
    console.log("Auth View", store);
    return {
        activePanel: store.activePanel,
        diary: store.diary,
        fetchedUser: store.fetchedUser,
        userId: store.userId,
        userSecret: store.userSecret,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setDiaryAction: diary => dispatch(setDiary(diary)),
        setIdAction: id => dispatch(setId(id)),
        setSecretAction: secret => dispatch(setSecret(secret)),
        setViewAction: view => dispatch(setView(view)),
        setPanelAction: panel => dispatch(setPanel(panel)),
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorizationView);