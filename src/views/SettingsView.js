import React from 'react';
import {View, ActionSheet, ActionSheetItem, withPlatform, ANDROID, IOS,} from '@vkontakte/vkui';
import Settings from '../panels/settings'
import {connect} from "react-redux";
import {setMark} from "../redux/actions/ExpectedMarkAction";
import PurposeMarkFive from "../custom_components/icon-pack/PurposeMarkFive"
import PurposeMarkFour from "../custom_components/icon-pack/PurposeMarkFour"
import PurposeMarkThree from "../custom_components/icon-pack/PurposeMarkThree"
import "./styles/Settings.css"
import {setPanel} from "../redux/actions/PanelAction";
import {setView} from "../redux/actions/ViewAction";
import {clearProfile} from "../redux/actions/ProfileAction";
import {clearData} from "../redux/actions/AppLogicAction";
import {setTheme} from "../redux/actions/ThemeAction";

class SettingsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            popout: null,
        };
    }

    chooseMark = () => {
        this.setState({
            popout:
                <ActionSheet
                    onClose={() => this.setState({popout: null})}
                    title="Выбери желаемую оценку"
                >
                    <ActionSheetItem autoclose
                                     onClick={() => {
                                         this.props.setMarkAction(5);
                                     }}
                                     before={<PurposeMarkFive/>}>
                        Всегда стремись к лучшему =)
                    </ActionSheetItem>
                    <ActionSheetItem autoclose
                                     onClick={() => {
                                         this.props.setMarkAction(4);
                                     }}
                                     before={<PurposeMarkFour/>}>
                        Не переоценивай себя ;)
                    </ActionSheetItem>
                    <ActionSheetItem autoclose
                                     onClick={() => {
                                         this.props.setMarkAction(3);
                                     }}
                                     before={<PurposeMarkThree/>}>
                        Никогда не отчаивайся!
                    </ActionSheetItem>
                    {this.props.platform === IOS && <ActionSheetItem autoclose theme="cancel">Cancel</ActionSheetItem>}
                </ActionSheet>
        });
    };

    render() {
        return (
            <View activePanel={(this.props.activePanel === "auth" ? "settings" : this.props.activePanel)}
                  popout={this.state.popout}>
                <Settings id="settings"
                          expectedMark={this.props.expectedMark}
                          chooseMark={this.chooseMark}
                          setView={this.props.setViewAction}
                          setPanel={this.props.setPanelAction}
                          profile={this.props.profile}
                          signOutClear={this.props.signOutClear}
                          theme={this.props.theme}
                          setTheme={this.props.setThemeAction}
                />
            </View>
        )
    }
}

withPlatform(SettingsView);

const mapStateToProps = store => {
    // console.log("Settings View", store);
    return {
        activePanel: store.activePanel,
        profile: store.profile,
        expectedMark: store.expectedMark,
        theme: store.theme,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        signOutClear: () => {
            dispatch(clearProfile());
            dispatch(clearData());
        },
        setMarkAction: mark => dispatch(setMark(mark)),
        setPanelAction: panel => dispatch(setPanel(panel)),
        setViewAction: view => dispatch(setView(view)),
        setThemeAction: theme => dispatch(setTheme(theme)),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsView);