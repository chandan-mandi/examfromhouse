import moment from 'moment';
import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const AlertTimer = (props) => {
    const { endingTime } = props;
    const currentTime = moment().format('HH:mm:ss');
    var ms = moment(endingTime, "HH:mm:ss").diff(moment(currentTime, "HH:mm:ss"));
    var d = moment.duration(ms);
    const difference = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
    const diffTime = moment(difference, 'HH:mm:ss').diff(moment().startOf('day'), 'seconds');

    const formatRemainingTime = time => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        return `${hours}:${minutes}:${seconds}`;
    };
    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
            return <div className="timer">Too late...</div>;
        }

        return (
            <div className="flex flex-col items-center justify-center">
                <div className="text-slate-400">Remaining time</div>
                <div className="text-4xl">{formatRemainingTime(remainingTime)}</div>
            </div>
        );
    };

    return (
        <div className="fixed -left-48">
            <CountdownCircleTimer
                isPlaying
                duration={diffTime}
                colors="#3f0096"
                onComplete={() => [true, 1000]}
            >
                {renderTime}
            </CountdownCircleTimer>
        </div>
    );
};

export default AlertTimer;