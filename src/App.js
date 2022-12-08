import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { cityTaxes } from './modules/cityTaxes';
import { eviePlans } from './modules/carPlans';
import { hourCarPlans } from './modules/carPlans';

const App = () => {
    const [cityTax, setCityTax] = useState(0);
    const [carType, setCarType] = useState('');
    const [carPlan, setCarPlan] = useState([]);

    const [userMinutes, setMinutes] = useState(0);
    const [userHours, setHours] = useState(0);
    const [userDays, setDays] = useState(0);

    const [preTax, setPreTax] = useState(0);
    const [taxCost, setTaxCost] = useState(0);

    const minutes = [...Array(60).keys()];
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

    const checkInputs = () => {
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
        }
    };

    const calculateCosts = (userMinutes, userHours, userDays, cityTax) => {
        checkInputs(cityTax, carPlan);
        if (userDays === 0 && userHours >= 7 && userMinutes >= 30) {
            // if days === 0 && greater than 7.5 hours
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
        <div className="flex flex-col w-full h-full">
            <h1 className="flex justify-center items-center text-3xl bg-blue-700 py-5 text-white font-bold">
                Carshare Trip Calculator
            </h1>
            <div id="city" className="my-2">
                <h1 className="flex justify-center font-bold w-full text-xl md:text-2xl">
                    1. Choose Your City
                </h1>
                <div className="flex flex-col gap-2 justify-evenly my-3">
                    {cityTaxes.map(({ id, name, tax }) => (
                        <button
                            key={id}
                            value={tax}
                            onClick={(e) => setCityTax(e.target.value)}
                            className="text-2xl bg-slate-400 focus:bg-blue-700 text-white rounded-md mx-auto uppercase h-[3rem]  w-[50vw]"
                        >
                            {name}
                        </button>
                    ))}
                </div>
            </div>
            <div id="carType" className="my-2">
                <h1 className="flex justify-center px-3 font-bold w-full text-xl md:text-2xl">
                    2. Choose A Car:
                </h1>
                <div className="flex my-3">
                    <button
                        onClick={(e) => setCarType(e.target.value)}
                        value="Evie"
                        className="text-2xl focus:bg-green-600 bg-slate-400 text-white rounded-md mx-auto uppercase h-[3rem]  w-[30vw]"
                    >
                        Evie
                    </button>
                    <button
                        onClick={(e) => setCarType(e.target.value)}
                        value="HOURCAR"
                        className="text-2xl focus:bg-orange-600 bg-slate-400 text-white rounded-md mx-auto uppercase h-[3rem]  w-[30%]"
                    >
                        HOURCAR
                    </button>
                </div>
            </div>
            <div id="carPlan" className="my-2">
                <h1 className="flex justify-center px-3 font-bold w-full text-xl md:text-2xl">
                    3. Choose A Plan:
                </h1>
                {carType === 'HOURCAR' ? (
                    <select
                        onChange={selectPlan}
                        className="flex mx-auto w-3/5 border-2 gap-5 rounded-lg py-1 text-lg"
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
                        className="flex mx-auto w-3/5 border-2 gap-5 rounded-lg py-1 text-lg"
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
            <div id="rentalDuration" className="w-full my-2">
                <h1 className="flex justify-center p-3 font-bold w-full text-xl md:text-2xl">
                    4. Rental Duration
                </h1>
                <div className="flex flex-col w-3/5 gap-3 mx-auto">
                    <select
                        onChange={(e) => setDays(Number(e.target.value))}
                        className="border-2 py-1 rounded-lg text-lg"
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
                        className="border-2 py-1 rounded-lg text-lg"
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
                        className="border-2 py-1 rounded-lg text-lg"
                    >
                        {minutes.map((minute, i) => {
                            return (
                                <option key={i} value={minute}>
                                    {minute} minutes
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>

            <table className="font-bold w-[90%] mx-auto my-5 text-xl">
                <tr className="flex justify-between border-b border-gray-400 w-full">
                    <td>City Taxes</td>
                    <td className="text-red-700">
                        {(cityTax * 100).toFixed(3)}%
                    </td>
                    <td>${taxCost.toFixed(2)}</td>
                </tr>
                <tr className="flex justify-between border-b border-gray-400 w-full">
                    <td>Car Plan</td>
                    <td className="text-blue-700">
                        {carPlan.id !== 0 && carPlan.name}
                    </td>
                    <td>${preTax.toFixed(2)}</td>
                </tr>
                <tr className="flex justify-between border-b border-gray-400 w-full">
                    <td>Total Cost</td>
                    <td className="text-red-600">
                        -${Number((preTax + taxCost).toFixed(2))}
                    </td>
                </tr>
            </table>
            <button
                onClick={() =>
                    calculateCosts(userMinutes, userHours, userDays, cityTax)
                }
                className="text-2xl bg-orange-700 text-white rounded-md mx-auto uppercase h-[3rem] w-[50vw]"
            >
                Calculate
            </button>
        </div>
    );
};

export default App;
