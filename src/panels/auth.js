import {Div, Group, Input, Panel, PanelHeader, Link, Button} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/auth.css"

import auth from "../utils/api"

class Auth extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            diary: this.props.diary,
            login: "",
            password: "",
            inviteCode: ""
        };
    }

    render() {
        return(
            <Panel id={this.props.id}>
                <PanelHeader className='header_color'>Авторизация</PanelHeader>
                <Group className="authGroup">
                    <Div className="welcome">
                        Добро пожаловать!
                    </Div>
                    <Div className="large_tip">
                        Войдите с помощью данных аккаунта mos.ru
                    </Div>
                    <Div className="inputContainer">
                        <div className="inputIcon"></div>
                        <div className="inputInput">
                            <p className="medium_tip">Номер телефона или email</p>
                            <Input
                                type="text"
                                onChange={(str) => {this.setState({login : str.currentTarget.value})}}
                            />
                        </div>
                    </Div>
                    <Div className="inputContainer">
                        <div className="inputIcon"></div>
                        <div className="inputInput">
                            <p className="medium_tip">Пароль</p>
                            <Input
                                type="password"
                                onChange={(str) => {this.setState({password : str.currentTarget.value})}}
                            />
                        </div>
                    </Div>
                    <Div>
                        <span className="medium_tip">Введите код приглашения, при его наличии, или оставьте поле пустым</span>
                    </Div>
                    <Div className="inviteInput">
                        <div></div>
                        <div>
                            <Input
                                type="text"
                                onChange={(str) => {this.setState({inviteCode : str.currentTarget.value})}}
                                style={{textTransform: 'uppercase'}}
                            />
                        </div>
                    </Div>
                    <Div>
            <span className="annotate">Нажимая войти, вы соглашаетесь на обработку, хранение, передачу ваших персональных данных.
                <br/>
                <Link href="https://google.com" target="_blank">Регламент</Link> и <Link href="https://google.com" target="_blank">политика конфиденциальности</Link></span>
                    </Div>
                    <Button level="tertiary" className="getInButton"
                            onClick={() => {console.log(this.state.login + "\n" + this.state.password + "\n" + this.state.diary);
                                auth(this.state.login, this.state.password, this.state.diary)}}>
                        Войти
                    </Button>
                    <Div className="restorePassword">
                        <span>Забыли данные учетной записи?</span>
                        <Link href="https://google.com" target="_blank" className="restoreLink">Восстановить</Link>
                    </Div>
                </Group>
            </Panel>
        )
    }

}

Auth.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
    diary: PropTypes.string.isRequired
};

export default Auth;