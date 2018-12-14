import * as React from 'react';
import * as dateDistance from 'date-fns/distance_in_words';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { ProjectHistory } from 'types/projectDetails';
import { HeaderSection, Row, Col } from 'components/Section';
import { Person } from 'components/Buddha';
import { ProjectBoardHistoryToggleButton } from '.';

// Styles
const s = require('./ProjectBoardHistory.css');
const zenscroll = require('zenscroll');

// Props
interface ProjectBoardHistoryProps {
    onExpansionToggle: () => void;
    isExpanded: boolean;
    userCanView: boolean;
    history: ProjectHistory[];
}

// Component
@observer
export class ProjectBoardHistory extends React.Component<ProjectBoardHistoryProps, {}> {
    @observable private now: Date = new Date();

    public render() {
        return this.props.userCanView && this.props.isExpanded && this.props.history.length > 0 ? (
            <HeaderSection hasMarginOnBottom={true}>
                <Row>
                    <Col size={12} className={s.changeListContainer}>
                        <table className={s.changesList}>
                            <tbody>
                                {this.props.history.map(change => {
                                    return (
                                        <tr key={`change-${change.id}`}>
                                            <td>
                                                <Person
                                                    personName={change.userFullName || change.username}
                                                    personImage={change.userImage}
                                                    showPersonNameOnLeft={false}
                                                    showSmallPersonImage={true}
                                                    showDarkPersonImage={true}
                                                />
                                            </td>
                                            <td>
                                                <p>{change.message}</p>
                                            </td>
                                            <td>
                                                <p>{dateDistance(change.createdAt, this.now)} ago</p>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </Col>
                </Row>

                <Row removeGutter={true} className={s.bottomExpansionButtonContainer}>
                    <Col size={12} className={s.arrows}>
                        <ProjectBoardHistoryToggleButton
                            onToggle={this.handleChangesListExpansion}
                            isExpanded={this.props.isExpanded}
                        />
                    </Col>
                </Row>
            </HeaderSection>
        ) : null;
    }

    private handleChangesListExpansion = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (this.props.isExpanded === false) {
            zenscroll.toY(0);
        }

        if (this.props.onExpansionToggle) {
            this.props.onExpansionToggle();
        }
    };
}
