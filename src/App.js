import React, { useState } from 'react';
import Swal from 'sweetalert2';

import evieLogo from './assets/evie.png';
import hourCarLogo from './assets/hourcar.png';

const App = () => {
    const [cityTax, setCityTax] = useState(0);
    const [carType, setCarType] = useState('');
    const [carPlan, setCarPlan] = useState([]);

    const [userMinutes, setMinutes] = useState(0);
    const [userHours, setHours] = useState(0);
    const [userDays, setDays] = useState(0);

    const [preTax, setPreTax] = useState(0);
    const [taxCost, setTaxCost] = useState(0);

    const cityTaxes = [
        {
            id: 0,
            name: 'Saint Paul',
            tax: 0.17075,
        },
        {
            id: 1,
            name: 'Minneapolis',
            tax: 0.17225,
        },
        {
            id: 2,
            name: 'Rochester',
            tax: 0.17325,
        },
    ];

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
            perHour: 9.0,
            perDay: 45.0,
        },
        {
            id: 5,
            name: 'HC-Access PLUS',
            perMinute: 0.1,
            perHour: 9.0,
            perDay: 45.0,
        },
        {
            id: 6,
            name: 'HC-Student',
            perMinute: 0.1,
            perHour: 9.0,
            perDay: 45.0,
        },
        {
            id: 7,
            name: 'HC-Student PLUS',
            perMinute: 0.1,
            perHour: 9.0,
            perDay: 45.0,
        },
    ];

    const minutes = [0, 15, 30, 45];
    const hours = [...Array(8).keys()];
    const days = [...Array(5).keys()];

    const selectPlan = (e) => {
        for (let i = 0; i < eviePlans.length; i++) {
            if (e.target.value === eviePlans[i].name) {
                setCarPlan(eviePlans[i]);
            }
        }
        for (let i = 0; i < hourCarPlans.length; i++) {
            if (e.target.value === hourCarPlans[i].name) {
                setCarPlan(hourCarPlans[i]);
            }
        }
    };

    const calculateCosts = (userMinutes, userHours, userDays, cityTax) => {
        // check if 1st choice is empty
        if (cityTax === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Select Your City!',
            });
            // check if 2nd choice is empty
        } else if (
            carPlan.length === 0 ||
            carPlan === '--- Choose EVIE Plan ---' ||
            carPlan === '--- Choose HOURCAR Plan ---'
        ) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Select A Car Plan!',
            });
            // if days === 0 && greater than 7.5 hours
        } else if (userDays === 0 && userHours >= 7 && userMinutes >= 30) {
            let cost = carPlan.perDay * 1;
            setPreTax(cost);
            setTaxCost(Number((cityTax * cost).toFixed(2)));
            // if days >= 1 && greater than 7.5 hours
        } else if (userDays >= 1 && userHours >= 7 && userMinutes >= 30) {
            let cost = carPlan.perDay * (userDays + 1);
            setPreTax(cost);
            setTaxCost(Number((cityTax * cost).toFixed(2)));
        } else {
            // actual calculation
            let minuteCost = userMinutes * carPlan.perMinute;
            let hourCost = userHours * carPlan.perHour;
            let dayCost = userDays * carPlan.perDay;
            let cost = minuteCost + hourCost + dayCost;
            setPreTax(cost);
            setTaxCost(Number((cityTax * cost).toFixed(2)));
        }
    };

    return (
        <div className="flex flex-col w-full h-full bg-gradient-to-b from-orange-500 via-transparent to-green-600">
            <div className="flex justify-evenly w-full py-3">
                <img src={evieLogo} alt="evie logo" className="w-1/2" />
                <img src={hourCarLogo} alt="hourcar logo" className="w-1/2" />
            </div>
            <h1 className="text-center text-3xl py-3 text-blue-900 font-bold whitespace-nowrap">
                Carshare Calculator
            </h1>
            <div id="city">
                <h1 className="flex justify-center whitespace-nowrap font-bold w-full text-xl">
                    1. Choose Your City
                </h1>
                <div className="flex flex-col gap-2 justify-evenly my-3">
                    {cityTaxes.map(({ id, name, tax }) => (
                        <button
                            key={id}
                            value={tax}
                            onClick={(e) => setCityTax(e.target.value)}
                            className="bg-slate-500 focus:bg-blue-700 text-white rounded-full mx-auto px-2 border-2 border-gray-500 w-[50vw]"
                        >
                            {name}
                        </button>
                    ))}
                </div>
            </div>
            <div id="carPlan">
                <h1 className="flex justify-center px-3 whitespace-nowrap font-bold w-full text-xl">
                    2. Choose A Car Plan:
                </h1>
                <div className="flex my-3">
                    <button
                        onClick={(e) => setCarType(e.target.value)}
                        value="Evie"
                        className="focus:bg-green-600 bg-slate-500 text-white rounded-full mx-auto px-2 border-2 border-gray-500 w-[30vw]"
                    >
                        Evie
                    </button>
                    <button
                        onClick={(e) => setCarType(e.target.value)}
                        value="HOURCAR"
                        className="focus:bg-orange-600 bg-slate-500 text-white rounded-full mx-auto px-2 border-2 border-gray-500 w-[30%]"
                    >
                        HOURCAR
                    </button>
                </div>
                {carType === 'HOURCAR' ? (
                    <select
                        onChange={selectPlan}
                        className="flex mx-auto w-4/5 border-2 gap-5 rounded-lg py-1 px-3"
                    >
                        {hourCarPlans.map(({ id, name }) => (
                            <option
                                key={id}
                                value={name}
                                className="text-center"
                            >
                                {name}
                            </option>
                        ))}
                    </select>
                ) : (
                    <select
                        onChange={selectPlan}
                        className="flex mx-auto w-4/5 border-2 gap-5 rounded-lg py-1 px-3"
                    >
                        {eviePlans.map(({ id, name }) => (
                            <option
                                key={id}
                                value={name}
                                className="text-center"
                            >
                                {name}
                            </option>
                        ))}
                    </select>
                )}
            </div>
            <div className="w-full">
                <h1 className="flex justify-center p-3 font-bold w-full text-xl whitespace-nowrap">
                    3. Rental Duration
                </h1>
                <div className="flex flex-col w-3/5 gap-3 mx-auto">
                    <select
                        onChange={(e) => setDays(Number(e.target.value))}
                        className="border-2"
                    >
                        {days.map((day, i) => {
                            return (
                                <option key={i} value={day}>
                                    {day} days
                                </option>
                            );
                        })}
                    </select>
                    <select
                        onChange={(e) => setHours(Number(e.target.value))}
                        className="border-2"
                    >
                        {hours.map((hour, i) => {
                            return (
                                <option key={i} value={hour}>
                                    {hour} hours
                                </option>
                            );
                        })}
                    </select>
                    <select
                        onChange={(e) => setMinutes(Number(e.target.value))}
                        className="border-2"
                    >
                        {minutes.map((minute, i) => {
                            return (
                                <option key={i} value={minute}>
                                    {minute} minutes
                                </option>
                            );
                        })}
                    </select>
                    <button
                        onClick={() =>
                            calculateCosts(
                                userMinutes,
                                userHours,
                                userDays,
                                cityTax
                            )
                        }
                        className="bg-blue-700 text-white rounded-full mx-auto px-2 border-2 border-gray-500 w-[50vw]"
                    >
                        Calculate
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-3 font-bold w-[90%] mx-auto py-10 text-xl">
                <ul>
                    <li>City Taxes</li>
                    <li>Car Plan</li>
                    <li>You Pay</li>
                </ul>
                <ul className="">
                    <li className="text-center text-red-800">
                        {(cityTax * 100).toFixed(3)}%
                    </li>
                    <li className="flex justify-center whitespace-nowrap text-sm text-blue-500">
                        {carPlan.id !== 0 && <p>{carPlan.name}</p>}
                    </li>
                </ul>
                <ul>
                    <li className="text-right">{taxCost.toFixed(2)}</li>
                    <li className="text-right">{preTax.toFixed(2)}</li>
                    <li className="text-right text-red-800">
                        <hr className="border-black" />
                        -${(preTax + taxCost).toFixed(2)}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default App;
