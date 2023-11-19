import { useEffect } from 'react';

import { useAppContext } from '../../context/appContext';
import StatsContainer from '../../components/StatsContainer';
import Loading from '../../components/Loading';
import ChartsContainer from '../../components/ChartsContainer';

const Stats = () => {
    const { showStats, isLoading, monthApplications } = useAppContext();

    useEffect(() => {
        showStats();
    }, []);

    if (isLoading) {
        return <Loading center />
    }

    return (
        <>
            <StatsContainer />

            { monthApplications?.length > 0 && <ChartsContainer /> }
        </>
    );
};

export default Stats;
