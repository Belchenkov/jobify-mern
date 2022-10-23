import moment from 'moment';

const Job = ({ company, createdAt }) => {
    const date = moment(createdAt).format('MMM Do, YYYY');

    return (
        <>
            <h5>{company}</h5>
            <h5>{date}</h5>
        </>
    );
};

export default Job;