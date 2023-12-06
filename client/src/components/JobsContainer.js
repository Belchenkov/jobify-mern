import { useEffect } from 'react';

import { useAppContext } from '../context/appContext';
import Loading from './Loading';
import Wrapper from '../assets/wrappers/JobsContainer';
import Job from './Job';
import PageBtnContainer from './PageBtnContainer';

const JobsContainer = () => {
    const {
        jobs,
        isLoading,
        page,
        totalJobs,
        getJobs,
        search,
        searchStatus,
        searchType,
        sort,
    } = useAppContext();

    useEffect(() => {
        getJobs();
        // eslint-disable-next-line
    }, [page, searchType, search, searchStatus, sort]);

    if (isLoading) {
        return <Loading center />;
    }

    if (jobs.length === 0) {
        return (
            <Wrapper>
                <h2>No jobs to display...</h2>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <h5>{totalJobs} job{jobs.length > 1 && 's'} found</h5>
            <div className="jobs">
                {jobs.map(job => {
                    return <Job key={job._id} {...job} />
                })}
            </div>
            <PageBtnContainer />
        </Wrapper>
    );
};

export default JobsContainer;
