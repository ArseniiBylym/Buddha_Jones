import React from 'react';
import classNames from 'classnames';
import { printDateAsDateStringWithTime } from './../../../helpers/date';
import { padWithCharacter } from './../../../helpers/text';
import { Row, Col } from './../../../components/Section';
import { Button } from './../../../components/Button';
import { Paragraph } from './../../../components/Content';
import { Person } from './../../../components/Buddha';

// Styles
import s from './ProjectsGrid.css';
import { IconArrowRight } from './../../../components/Icons';

// Component
function ProjectGridCard(props) {
    const { clientId, client, id, name } = props.project;

    return (
        <div className={s.project} onClick={e => props.handleProjectClick(clientId, client, id, name)}>

            <Row className={s.title} removeMargins={true}>
                <Col>
                    <h3 className={s.name}>
                        {props.project.name}
                        <IconArrowRight
                            width={15}
                            height={11}
                            marginTop={-5}
                            marginLeft={-7}
                        />
                    </h3>
                    <h4 className={s.client}>{props.project.client}</h4>
                </Col>
            </Row>

            <Row className={s.campaigns} doWrap={true} removeMargins={true}>
                <Col size={0}>
                    {props.project.campaigns.length > 0 ? 'Campaigns:' : 'No campaigns'}
                </Col>
                {props.project.campaigns.map((campaign) => (
                    <Col key={`project-${props.project.id}-campaign-${campaign.id}`} size={0}>
                        {campaign.name}
                    </Col>
                ))}
            </Row>

            <Row className={s.summary} removeMargins={true}>
                <Col className={s.dateCol}>
                    <Paragraph>
                        <span>Last update</span>
                        {printDateAsDateStringWithTime(props.project.lastUpdate.date)}
                    </Paragraph>
                </Col>
                <Col className={s.nameCol}>
                    <Person
                        align="right"
                        nameOnLeft={true}
                        labelOnLeft="by"
                        labelNoPadding={true}
                        name={props.project.lastUpdate.user.name}
                        image={props.project.lastUpdate.user.image}
                    />
                </Col>
            </Row>

        </div>
    );
}

export default ProjectGridCard;
