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
            name: 'Try It',
            perMinute: 0.3,
            perHour: 15.0,
            perDay: 110.0,
        },
        {
            id: 2,
            name: 'Everyday',
            perMinute: 0.2,
            perHour: 9.75,
            perDay: 71.5,
        },
        {
            id: 3,
            name: 'Everyday PLUS',
            perMinute: 0.2,
            perHour: 9.75,
            perDay: 71.5,
        },
        {
            id: 4,
            name: 'Adventure PLUS',
            perMinute: 0.18,
            perHour: 9.0,
            perDay: 66.0,
        },
        {
            id: 5,
            name: 'Access PLUS',
            perMinute: 0.18,
            perHour: 9.0,
            perDay: 66.0,
        },
        {
            id: 6,
            name: 'Student',
            perMinute: 0.18,
            perHour: 9.0,
            perDay: 66.0,
        },
        {
            id: 7,
            name: 'Student PLUS',
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
            name: 'Try It',
            perMinute: 0.17,
            perHour: 10.0,
            perDay: 75.0,
        },
        {
            id: 2,
            name: 'Everyday',
            perMinute: 0.11,
            perHour: 6.5,
            perDay: 48.75,
        },
        {
            id: 3,
            name: 'Everyday PLUS',
            perMinute: 0.11,
            perHour: 6.5,
            perDay: 48.75,
        },
        {
            id: 4,
            name: 'Adventure PLUS',
            perMinute: 0.1,
            perHour: 9.0,
            perDay: 45.0,
        },
        {
            id: 5,
            name: 'Access PLUS',
            perMinute: 0.1,
            perHour: 9.0,
            perDay: 45.0,
        },
        {
            id: 6,
            name: 'Student',
            perMinute: 0.1,
            perHour: 9.0,
            perDay: 45.0,
        },
        {
            id: 7,
            name: 'Student PLUS',
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

    const calculateCosts = (minutes, hours, days, cityTax) => {
        if (cityTax === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Select Your City!',
            });
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
        } else {
            let minuteCost = minutes * carPlan.perMinute;
            let hourCost = hours * carPlan.perHour;
            let dayCost = days * carPlan.perDay;
            let cost = minuteCost + hourCost + dayCost;
            setPreTax(cost);
            setTaxCost(Number((cityTax * cost).toFixed(2)));
        }
    };

    console.log(`inside carPlan`, carPlan);

    return (
        <div className="w-full h-screen bg-gradient-to-b from-orange-500 via-transparent to-green-600">
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
                            className="bg-blue-900 text-white rounded-full mx-auto px-2 border-2 border-gray-500 w-[30%]"
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
                        className="bg-green-600 text-white rounded-full mx-auto px-2 border-2 border-gray-500 w-[30%]"
                    >
                        Evie
                    </button>
                    <button
                        onClick={(e) => setCarType(e.target.value)}
                        value="HOURCAR"
                        className="bg-orange-600 text-white rounded-full mx-auto px-2 border-2 border-gray-500 w-[30%]"
                    >
                        HOURCAR
                    </button>
                </div>
                {carType === 'HOURCAR' ? (
                    <select
                        onChange={selectPlan}
                        className="flex mx-auto w-4/5 gap-5 rounded-lg py-1 px-3"
                    >
                        {hourCarPlans.map(({ id, name }) => (
                            <option key={id} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                ) : (
                    <select
                        onChange={selectPlan}
                        className="flex mx-auto w-4/5 gap-5 rounded-lg py-1 px-3"
                    >
                        {eviePlans.map(({ id, name }) => (
                            <option key={id} value={name}>
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
                    <select onChange={(e) => setDays(e.target.value)}>
                        {days.map((day, i) => {
                            return (
                                <option key={i} value={day}>
                                    {day} days
                                </option>
                            );
                        })}
                    </select>
                    <select onChange={(e) => setHours(e.target.value)}>
                        {hours.map((hour, i) => {
                            return (
                                <option key={i} value={hour}>
                                    {hour} hours
                                </option>
                            );
                        })}
                    </select>
                    <select onChange={(e) => setMinutes(e.target.value)}>
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
                        className="bg-blue-900 text-white rounded-full mx-auto px-2 border-2 border-gray-500 w-fit"
                    >
                        Calculate
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-3 font-bold w-[90%] mx-auto my-10 text-xl">
                <ul>
                    <li>City Taxes</li>
                    <li>Car Plan</li>
                    <hr className="border-black" />
                    <li>Total Cost</li>
                </ul>
                <ul className="whitespace-nowrap">
                    <li className="text-center text-red-700">
                        {(cityTax * 100).toFixed(3)}%
                    </li>
                    <li className="text-center text-blue-700">
                        {carPlan.id !== 0 && <p>{carPlan.name}</p>}
                    </li>
                    <hr className="border-black" />
                </ul>
                <ul>
                    <li className="text-right">${taxCost.toFixed(2)}</li>
                    <li className="text-right">${preTax.toFixed(2)}</li>
                    <li className="text-right text-red-700">
                        <hr className="border-black" />
                        -${(preTax + taxCost).toFixed(2)}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default App;
