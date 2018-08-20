import * as React from 'react';
import * as classNames from 'classnames';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import { Row, Col } from '../Section';

// Styles
const s = require('./Pagination.css');
import { IconArrowLeft, IconArrowRight, IconEllipsis } from '../Icons';
import { MathHandler } from '../../helpers/MathHandler';

// Props
interface PaginationProps {
    className?: string | null;
    onPageChange: ((newPage: number) => void) | null;
    edgesCount?: number;
    currentPage: number;
    countPerPage: number;
    countTotal: number;
    displayTotals?: boolean;
}

// Component
@observer
export class Pagination extends React.Component<PaginationProps, {}> {
    static get defaultProps(): PaginationProps {
        return {
            className: null,
            edgesCount: 3,
            currentPage: 1,
            countPerPage: 10,
            countTotal: 0,
            displayTotals: true,
            onPageChange: null,
        };
    }

    @observable private showingFrom: number = 1;
    @observable private showingTo: number = this.props.countPerPage;
    @observable private currentPage: number = this.props.currentPage;
    @observable
    private totalPages: number = MathHandler.calculateMultiplicationInside(
        this.props.countTotal,
        this.props.countPerPage
    );
    @observable private pagesToDisplay: number[] = [1];
    @observable private displayEllipsisAtStart: boolean = false;
    @observable private displayEllipsisAtEnd: boolean = false;

    @computed
    private get firstPageToDisplay(): number {
        return this.pagesToDisplay[0];
    }

    @computed
    private get lastPageToDisplay(): number {
        return this.pagesToDisplay[this.pagesToDisplay.length - 1];
    }

    public componentDidMount() {
        this.setPagesToDisplay();
    }

    public componentWillReceiveProps(nextProps: PaginationProps) {
        // Check if total count or count per page has changed
        if (this.props.countTotal !== nextProps.countTotal || this.props.countPerPage !== nextProps.countPerPage) {
            // Calculate new total pages
            const totalPages = MathHandler.calculateMultiplicationInside(nextProps.countTotal, nextProps.countPerPage);
            this.setPagesToDisplay(nextProps.currentPage, totalPages, nextProps.countTotal);
        } else if (this.props.currentPage !== nextProps.currentPage) {
            this.switchToPage(nextProps.currentPage);
        }
    }

    public render() {
        return (
            <div className={classNames(s.pagination, this.props.className)}>
                {this.props.countTotal > 0 ? this.renderPages() : this.renderEmpty()}
            </div>
        );
    }

    private renderEmpty() {
        return (
            <Row>
                <Col>
                    <p className={s.paginationTotals}>No entries available</p>
                </Col>
            </Row>
        );
    }

    private renderPages() {
        return (
            <Row>
                {this.props.displayTotals && (
                    <Col>
                        <p className={s.paginationTotals}>
                            {'Showing entries '}
                            <strong>{this.showingFrom}</strong>
                            {' — '}
                            <strong>{this.showingTo}</strong>
                            {' from total of '}
                            <strong>{this.props.countTotal}</strong>
                        </p>
                    </Col>
                )}

                <Col>
                    <ul className={s.paginationLinksList}>
                        <li className={s.paginationArrow}>
                            <button onClick={this.handlePageClick(this.currentPage - 1)}>
                                <IconArrowLeft />
                            </button>
                        </li>

                        {this.displayEllipsisAtStart &&
                            this.firstPageToDisplay > 1 && (
                                <li className={s.paginationPage}>
                                    <button onClick={this.handlePageClick(1)}>1</button>
                                </li>
                            )}

                        {this.displayEllipsisAtStart &&
                            this.firstPageToDisplay > 1 && (
                                <li className={s.paginationEllipsis}>
                                    <button onClick={this.handlePageClick(this.firstPageToDisplay - 1)}>
                                        <IconEllipsis />
                                    </button>
                                </li>
                            )}

                        {this.pagesToDisplay.map(page => (
                            <li
                                key={page}
                                className={classNames(s.paginationPage, {
                                    [s.paginationPageActive]: this.currentPage === page,
                                })}
                            >
                                <button onClick={this.handlePageClick(page)}>{page}</button>
                            </li>
                        ))}

                        {this.displayEllipsisAtEnd &&
                            this.lastPageToDisplay < this.totalPages && (
                                <li className={s.paginationEllipsis}>
                                    <button onClick={this.handlePageClick(this.lastPageToDisplay + 1)}>
                                        <IconEllipsis />
                                    </button>
                                </li>
                            )}

                        {this.displayEllipsisAtEnd &&
                            this.lastPageToDisplay < this.totalPages && (
                                <li className={s.paginationPage}>
                                    <button onClick={this.handlePageClick(this.totalPages)}>{this.totalPages}</button>
                                </li>
                            )}

                        <li className={s.paginationArrow}>
                            <button onClick={this.handlePageClick(this.currentPage + 1)}>
                                <IconArrowRight />
                            </button>
                        </li>
                    </ul>
                </Col>
            </Row>
        );
    }

    private handlePageClick = (newPage: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
        this.switchToPage(newPage);
    };

    @action
    private switchToPage = (newPage: number) => {
        // Check if new page is smaller than first page or larger than last page
        newPage = newPage < 0 ? this.totalPages : newPage > this.totalPages ? 1 : newPage;

        // Change current page
        this.setPagesToDisplay(newPage);

        // Pass event further
        if (this.props.onPageChange) {
            this.props.onPageChange(newPage);
        }
    };

    @action
    private setPagesToDisplay = (newPage?: number, newTotalPages?: number, newTotalCount?: number) => {
        // Get total pages
        const totalPages = typeof newTotalPages !== 'undefined' ? newTotalPages : this.totalPages;

        // Check if newPage is provided
        if (typeof newPage === 'undefined' || newPage === null || newPage === 0) {
            newPage = this.currentPage;
        }

        // Get total count
        const totalCount = typeof newTotalCount !== 'undefined' ? newTotalCount : this.props.countTotal;

        // Initially
        let displayEllipsisAtStart = false;
        let displayEllipsisAtEnd = false;
        let pagesToDisplay = [newPage];

        // Add edges
        if (typeof this.props.edgesCount !== 'undefined') {
            for (let i = 0; i < this.props.edgesCount; i++) {
                if (pagesToDisplay[0] > 1) {
                    pagesToDisplay.unshift(pagesToDisplay[0] - 1);
                }

                if (pagesToDisplay[pagesToDisplay.length - 1] < totalPages) {
                    pagesToDisplay.push(pagesToDisplay[pagesToDisplay.length - 1] + 1);
                }
            }
        }

        // Check if ellipsis should show at the start
        if (pagesToDisplay[0] > 2) {
            displayEllipsisAtStart = true;
        }

        // Check if ellipsis should show at the end
        if (pagesToDisplay[pagesToDisplay.length - 1] - 1 < totalPages) {
            displayEllipsisAtEnd = true;
        }

        // End of showing entries
        let showingTo = newPage * this.props.countPerPage;
        let showingFrom = showingTo - this.props.countPerPage + 1;
        showingTo = showingTo > totalCount ? totalCount : showingTo;

        // Set new state
        this.totalPages = totalPages;
        this.currentPage = newPage;
        this.pagesToDisplay = pagesToDisplay;
        this.showingFrom = showingFrom;
        this.showingTo = showingTo;
        this.displayEllipsisAtStart = displayEllipsisAtStart;
        this.displayEllipsisAtEnd = displayEllipsisAtEnd;
    };
}
