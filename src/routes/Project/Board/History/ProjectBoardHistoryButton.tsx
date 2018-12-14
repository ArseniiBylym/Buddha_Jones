import * as React from 'react';
import { observer } from 'mobx-react';
import { Button } from 'components/Button';
import { IconArrowLeftYellow, IconArrowRightYellow } from 'components/Icons';

// Props
interface ProjectBoardHistoryToggleButtonProps {
    onToggle: (e?: React.MouseEvent<HTMLButtonElement>) => void;
    isExpanded: boolean;
}

// Component
@observer
export class ProjectBoardHistoryToggleButton extends React.Component<ProjectBoardHistoryToggleButtonProps, {}> {
    public render() {
        return (
            <Button
                onClick={this.props.onToggle}
                float="right"
                label={{
                    text: this.props.isExpanded ? 'Hide project history' : 'View project history',
                    onLeft: this.props.isExpanded === false,
                    color: 'yellow',
                    size: 'small',
                }}
                icon={{
                    size: 'nopadding',
                    background: 'none',
                    element: this.props.isExpanded ? (
                        <IconArrowLeftYellow width={15} height={11} />
                    ) : (
                        <IconArrowRightYellow width={15} height={11} />
                    ),
                }}
            />
        );
    }
}
