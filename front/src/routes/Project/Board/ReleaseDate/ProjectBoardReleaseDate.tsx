import * as React from 'react';
import * as dateFormat from 'date-fns/format';
import { observer } from 'mobx-react';
import { HeaderSection, Row, Col } from 'components/Section';
import { Paragraph } from 'components/Content';
import { ProjectBoardHistoryToggleButton } from '..';

// Styles
const s = require('./ProjectBoardReleaseDate.css');

// Props
interface ProjectBoardReleaseDateProps {
    onToggleExpansionOfProjectHistoryClick: () => void;
    editingProjectCore: boolean;
    userCanViewReleaseDate: boolean;
    userCanViewHistory: boolean;
    projectReleaseDate: Date | null;
    isHistoryExpanded: boolean;
}

// Component
@observer
export class ProjectBoardReleaseDate extends React.Component<ProjectBoardReleaseDateProps, {}> {
    public render() {
        return (this.props.userCanViewReleaseDate || this.props.userCanViewHistory) &&
            this.props.editingProjectCore === false ? (
            <HeaderSection className={s.projectBoardReleaseDateSection}>
                <Row className={s.row}>
                    <Col className={s.leftCol}>
                        {this.props.userCanViewReleaseDate &&
                            this.props.projectReleaseDate !== null && (
                                <Paragraph>
                                    {`Project's release date: `}
                                    <strong>{dateFormat(this.props.projectReleaseDate, 'MM/DD/YYYY')}</strong>
                                </Paragraph>
                            )}
                    </Col>
                    <Col>
                        {this.props.userCanViewHistory && (
                            <ProjectBoardHistoryToggleButton
                                onToggle={this.props.onToggleExpansionOfProjectHistoryClick}
                                isExpanded={this.props.isHistoryExpanded}
                            />
                        )}
                    </Col>
                </Row>
            </HeaderSection>
        ) : null;
    }
}
