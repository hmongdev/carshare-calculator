const eviePlans = [
    {
        id: 0,
        name: '--- Choose EVIE Plan ---',
    },
    {
        id: 1,
        name: 'EV-Try It',
        perMinute: 0.3,
        perHour: 15.0,
        perDay: 110.0,
    },
    {
        id: 2,
        name: 'EV-Everyday',
        perMinute: 0.2,
        perHour: 9.75,
        perDay: 71.5,
    },
    {
        id: 3,
        name: 'EV-Everyday PLUS',
        perMinute: 0.2,
        perHour: 9.75,
        perDay: 71.5,
    },
    {
        id: 4,
        name: 'EV-Adventure PLUS',
        perMinute: 0.18,
        perHour: 9.0,
        perDay: 66.0,
    },
    {
        id: 5,
        name: 'EV-Access PLUS',
        perMinute: 0.18,
        perHour: 9.0,
        perDay: 66.0,
    },
    {
        id: 6,
        name: 'EV-Student',
        perMinute: 0.18,
        perHour: 9.0,
        perDay: 66.0,
    },
    {
        id: 7,
        name: 'EV-Student PLUS',
        perMinute: 0.18,
        perHour: 9.0,
        perDay: 66.0,
    },
];

const hourCarPlans = [
    {
        id: 0,
        name: '--- Choose HOURCAR Plan ---',
    },
    {
        id: 1,
        name: 'HC-Try It',
        perMinute: 0.17,
        perHour: 10.0,
        perDay: 75.0,
    },
    {
        id: 2,
        name: 'HC-Everyday',
        perMinute: 0.11,
        perHour: 6.5,
        perDay: 48.75,
    },
    {
        id: 3,
        name: 'HC-Everyday PLUS',
        perMinute: 0.11,
        perHour: 6.5,
        perDay: 48.75,
    },
    {
        id: 4,
        name: 'HC-Adventure PLUS',
        perMinute: 0.1,
        perHour: 6.0,
        perDay: 45.0,
    },
    {
        id: 5,
        name: 'HC-Access PLUS',
        perMinute: 0.1,
        perHour: 6.0,
        perDay: 45.0,
    },
    {
        id: 6,
        name: 'HC-Student',
        perMinute: 0.1,
        perHour: 6.0,
        perDay: 45.0,
    },
    {
        id: 7,
        name: 'HC-Student PLUS',
        perMinute: 0.1,
        perHour: 6.0,
        perDay: 45.0,
    },
];

module.exports = { eviePlans, hourCarPlans };
