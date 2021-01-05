import axios from 'axios';


const defaultCountdowns = [
    /*{
        id: 'Auditorium',
        ip: '192.168.12.140',
        time: 0,
    },
    {
        id: 'BlackSea',
        ip: '192.168.12.141',
        time: 0
    },
    {
        id: 'Concord',
        ip: '192.168.12.142',
        time: 0
    },*/
    {
        id: 'Marathon',
        ip: '192.168.12.137',
        //ip: '192.168.8.164',
        time: 0,
        on: false,
        start: 0,
        paused: false,
        checked: false


    },
    /*{
        id: 'Normandy',
        ip: '192.168.12.144',
        time: 0
    },
    {
        id: 'Stalingrad',
        ip: '192.168.12.145',
        time: 0
    },*/
    {
        id: 'Tours',
        ip: '192.168.12.135',
        //ip: '192.168.8.135',
        time: 0,
        on: false,
        start: 0,
        paused: false,
        checked: false

    },
    // {
    //     id: 'Test',
    //     time: 0
    // }
];

//const defaultCountdowns = [ ];

// const action = {
//      type: 'ADD_TIMER',
//      payload: {
//         id: 'room03',
//         ip: '192.168.12.140',
//         time: 0
//      }
// }

const countdownTimers = (state = defaultCountdowns, action) => {
    switch (action.type) {
        case 'ADD_TIMER':
            return [ ...state, action.payload ];
        default:
            return state;
    }
};

export default countdownTimers;