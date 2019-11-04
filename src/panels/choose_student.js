import {Div, Panel, Button} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/choose_student.css"

class ChooseStudent extends React.Component {
    constructor(props) {
        super(props);

        this.students = [];
        this.drawStudents();
    }

    choose = (student) => {
        this.props.getProfileInfo({
            ...this.props.profile,
            student: student
        });
        this.props.setStudent(student);
        this.props.switchView("MainView", "schedule");
    };

    drawStudents = () => {
        this.props.profile.students.forEach(student => {
            this.students.push(
                <Button level="tertiary" className="chooseStudentScreenStudentContainer"
                        onClick={() => {
                            this.choose(student)
                        }}>
                    <div className="chooseStudentScreenStudentName">
                        {student.name}
                    </div>
                    <div className="chooseStudentScreenStudentGrade">
                        {student.class} класс
                    </div>
                </Button>
            )
        });
    };

    render() {
        return (
            <Panel id={this.props.id}>
                <Div className="chooseStudentScreen">
                    <div className="chooseStudentTitle">
                        Выберите ученика
                    </div>
                    <div className="chooseStudentScreenStudents">
                        {this.students}
                    </div>
                </Div>
            </Panel>
        )
    }

}

ChooseStudent.propTypes = {
    id: PropTypes.string.isRequired,
    profile: PropTypes.any.isRequired,
    setStudent: PropTypes.func.isRequired,
    switchView: PropTypes.func,
    setPanel: PropTypes.func.isRequired,
    getProfileInfo: PropTypes.func.isRequired,
};

export default ChooseStudent;