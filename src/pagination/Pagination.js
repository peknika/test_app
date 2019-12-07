import React from 'react';
import cn from 'class-names';

import './Pagination.css';

const Pagination = ({ currentPage, onPageChange, totalPages }) => {
    const isDisabled = (className, step) => (currentPage <= 2  && step === 'previous')|| (currentPage >=  totalPages - 1  && step === 'next')
        ? cn({ [className]: true, disabled: true })
        : cn({ [className]: true, enabled: true });
    const pages = currentPage === 1
                    ? [1, 2, 3]
                    : currentPage === 13
                    ? [totalPages - 2, totalPages - 1, totalPages]
                    : [currentPage - 1, currentPage, currentPage + 1];
    return (
        <nav>
            <ul className="pagination d-flex justify-content-center">
                <li className={isDisabled('page-item', 'previous')}>
                    <button className={isDisabled('page-link', 'previous')}
                       aria-label="Previous"
                       onClick={onPageChange(currentPage - 2)}
                    >
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </button>
                </li>
                <li className="page-item enabled">
                    <button className="page-link enabled" onClick={onPageChange(pages[0])}>
                        {pages[0]}
                    </button>
                </li>
                <li className="page-item enabled">
                    <button className="page-link enabled" onClick={onPageChange(pages[1])}>
                        {pages[1]}
                    </button>
                </li>
                <li className="page-item enabled">
                    <button className="page-link enabled" onClick={onPageChange(pages[2])}>
                        {pages[2]}
                    </button>
                </li>
                <li className={isDisabled('page-item', 'next')}>
                    <button className={isDisabled('page-link', 'next')}
                       aria-label="Next"
                       onClick={onPageChange(currentPage + 2)}>
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </button>
                </li>
            </ul>
        </nav>
    )
};

export default Pagination;
