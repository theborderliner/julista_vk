import {Panel, PanelHeader, Button, Switch, Tooltip, Link} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/settings.css"
import VKSettingsIcon from "../custom_components/icon-pack/VKSettingsIcon"
import SettingsNotificationsIcon from "../custom_components/icon-pack/SettingsNotificationsIcon"
import DarkThemeIcon from "../custom_components/icon-pack/DarkThemeIcon"
import Mark from "../custom_components/mark"
import GetOutIcon from "../custom_components/icon-pack/GetOutIcon"
import connect from '@vkontakte/vk-connect-promise';

class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tooltip: false,
            ready: false,
        };

        this.settings = (localStorage.getItem("appSettings") ? JSON.parse(localStorage.getItem("appSettings")) : null)
    }

    signOut = () => {
        localStorage.removeItem("userData");
        this.props.setView("AuthorizationView");
        this.props.setPanel("choose_diary");
    };

    askForNotifications = () => {
        if (!this.settings) {
            this.settings = {};
        }
        let switcher = document.getElementById("settingsNotificationsSwitcher");
        if (this.settings.notifications && switcher._valueTracker.getValue()) {
            connect.send("VKWebAppDenyNotifications", {})
                .then(answer => {
                    this.settings.notifications = false;
                    switcher._valueTracker.setValue(false);
                    this.setState({ready : true})
                })
                .catch(err => {
                    document.getElementById("settingsNotificationsSwitcher").
                        _valueTracker.setValue(true);
                    this.setState({ready : true});
                });
        } else {
            connect.send("VKWebAppAllowNotifications", {})
                .then(answer => {
                    this.settings.notifications = true;
                    document.getElementById("settingsNotificationsSwitcher").
                        _valueTracker.setValue(true);
                    this.setState({ready : true});
                })
        }
        localStorage.setItem("appSettings", JSON.stringify(this.settings));
        this.setState({ready : false});
    };

    render() {
        return (
            <Panel id={this.props.id}>
                <PanelHeader noShadow>
                    Настройки
                </PanelHeader>
                <div className="groupSettingsContainer">
                    <div className="settingsTitleContainer">
                        <span className="settingsTitle">
                            Ссылки
                        </span>
                    </div>
                    <Button level="tertiary" className="settingsSettingContainer">
                        <VKSettingsIcon/>
                        <div className="settingsSettingInfo">
                            <span className="settingsSettingTitle" style={{color: "#5181b8"}}>
                                <Link
                                    href="https://vk.com/bklet/"
                                    target="_self">
                                    Группа ВК
                                </Link>
                            </span>
                            <span className="settingsSettingSwitch">
                        </span>
                        </div>
                    </Button>
                </div>
                <div className="groupSettingsContainer">
                    <div className="settingsTitleContainer">
                        <span className="settingsTitle">
                            Дневник
                        </span>
                    </div>
                    <Button level="tertiary" className="settingsSettingContainer" onClick={this.props.chooseMark}>
                        <div style={{width: "24px"}}>
                            <Mark size="28" val={this.props.expectedMark.toString()} is_routine={false}/>
                        </div>
                        <div className="settingsSettingInfo">
                        <span className="settingsSettingTitle">
                            Желаемая оценка
                        </span>
                        </div>
                    </Button>
                    <div className="settingsSettingContainer" style={{paddingRight: "-16px"}}>
                        <SettingsNotificationsIcon/>
                        <div className="settingsSettingInfo">
                        <span className="settingsSettingTitle">
                            Уведомления
                        </span>
                            <span>
                                <Switch className="settingsSettingSwitcher" id="settingsNotificationsSwitcher"
                                        getRef={(ref) => console.log("ref", ref)}
                                    onChange={this.askForNotifications}/>
                        </span>
                        </div>
                    </div>
                    <div className="settingsSettingContainer" style={{paddingRight: "-16px"}}
                         onClick={() => this.setState({tooltip: true})}>
                        <DarkThemeIcon/>
                        <div className="settingsSettingInfo">
                        <span className="settingsSettingTitle">
                            Тёмная тема
                        </span>
                            <span>
                            <Tooltip
                                text="Обязательно появится в релизе :)"
                                isShown={this.state.tooltip}
                                onClose={() => this.setState({tooltip: false})}
                                offsetX={-50}
                                offsetY={5}
                                cornerOffset={55}
                            >
                                <Switch className="settingsSettingSwitcher" disabled/>
                            </Tooltip>
                        </span>
                        </div>
                    </div>
                </div>
                <div className="groupSettingsContainer">
                    <Button level="tertiary" className="settingsSettingContainer" style={{marginTop: "35px"}}
                            onClick={this.signOut}>
                        <GetOutIcon/>
                        <div className="settingsSettingInfo">
                        <span className="settingsSettingTitle" style={{color: "#ff4939", fontWeight: "bold"}}>
                            Выйти
                        </span>
                        </div>
                    </Button>
                </div>
            </Panel>
        )
    }
}

Settings.propTypes = {
    id: PropTypes.string.isRequired,
    expectedMark: PropTypes.number.isRequired,
    chooseMark: PropTypes.func.isRequired,
    setView: PropTypes.func.isRequired,
    setPanel: PropTypes.func.isRequired,
};

export default Settings;