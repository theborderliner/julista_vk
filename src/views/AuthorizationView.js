import React from 'react';
import PropTypes from 'prop-types';
import {Div, PanelHeader, View, Panel, Button} from '@vkontakte/vkui';
import Auth from '../panels/auth'
import "./styles/Authorization.css"

class AuthorizationView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activePanel: this.props.activePanel,
            diary: ''
        }
    }

    render() {
        return (
            <View activePanel={this.state.activePanel}>
                <Panel id="choose_diary">
                    <PanelHeader noShadow={true}></PanelHeader>
                    <Div className="chooseDiaryScreen">
                        <span className="chooseDiaryScreenTitle">
                            Выберите ваш дневник
                        </span>
                        <div className="chooseDiaryScreenDiaryDiaries">
                            <Button level="tertiary" className="chooseDiaryScreenDiaryContainer"
                                    onClick={() => {this.setState({activePanel : 'auth', diary: 'mosru'})}}>
                                <div className="chooseDiaryScreenDiaryContainerIcon" style={{backgroundColor: "#0080ff"}}></div>
                                <span className="chooseDiaryScreenDiaryContainerTitle">МЭШ (mos.ru)</span>
                                <div className="chooseDiaryScreenDiaryContainerChecker">
                                    <div>rar</div>
                                </div>
                            </Button>
                            <Button level="tertiary" className="chooseDiaryScreenDiaryContainer"
                                    onClick={() => {this.setState({activePanel : 'auth', diary: 'mosregru'})}}>
                                <div className="chooseDiaryScreenDiaryContainerIcon" style={{backgroundColor: "#ff3000"}}></div>
                                <span className="chooseDiaryScreenDiaryContainerTitle">mosreg.ru</span>
                                <div className="chooseDiaryScreenDiaryContainerChecker">
                                    <div>rar</div>
                                </div>
                            </Button>
                        </div>
                        <Button level="tertiary" className="getInButton" style={{visibility: "hidden"}}>
                            Войти
                        </Button>
                    </Div>
                </Panel>
                <Auth id="auth" go={this.props.go} fetchedUser={this.props.fetchedUser} diary={this.state.diary}/>
            </View>
        )
    }
}

AuthorizationView.propTypes = {
    id: PropTypes.string.isRequired,
    activePanel: PropTypes.string.isRequired,
    go: PropTypes.func,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
};

export default AuthorizationView;