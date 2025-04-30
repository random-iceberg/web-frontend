import PredictionButton from "../components/PredictionButton";
import { DropDownButton } from "../components/InputForm";
import { InputButton } from "../components/InputForm";
import { CheckBox } from "../components/InputForm";
import ErrorMessage from "../components/ErrorMessage";
import  { useState } from "react";

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function SurvivalCalculatorUI() {
    const [showWarning, setShowWarning] = useState(false);

    const handlePrediction = () => {
        let validated = true;

        // Getting all of the values. //
        const age = (document.getElementById("age") as HTMLInputElement).value;
        const sibsp = (document.getElementById("sibsp") as HTMLInputElement).value;
        const parch = (document.getElementById("parch") as HTMLInputElement).value;
        
        const passengerClass = (document.getElementById("passenger-class") as HTMLButtonElement).innerText;
        const sex = (document.getElementById("sex") as HTMLButtonElement).innerText;
        const embarkationPort = (document.getElementById("embarkation-port") as HTMLButtonElement).innerText;
        
        const wereAlone = (document.getElementById("were-alone") as HTMLInputElement).checked;
        const cabinKnown = (document.getElementById("cabin-known") as HTMLInputElement).checked;

        // Validation of data. //
        if (isNaN(Number(age)) || age === '') validated = false;
        if (isNaN(Number(sibsp)) || sibsp === '') validated = false;
        if (isNaN(Number(parch)) || parch === '') validated = false;

        if (!passengerClass || !sex || !embarkationPort) validated = false;

        if (validated) {
            setShowWarning(false);
            const data = {
                age: age,
                sibsp: sibsp,
                parch: parch,
                passengerClass: passengerClass,
                sex: sex,
                embarkationPort: embarkationPort,
                wereAlone: wereAlone,
                cabinKnown: cabinKnown
            };

            fetch("/predict/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
              })
              .then((result) => {
                console.log(result);
              })
              .catch((error) => {
                console.error("Fetch error:", error);
              });
              
        } else {
            setShowWarning(true);
        }
}

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
            <Navbar />
            <header className="p-8 bg-accent">
                <div className="max-w-4xl mx-auto px-4 text-white">
                    <h1 className="text-4xl font-bold text-center">Survivor Prediction Calculator</h1>
                    <p className="mt-4 text-lg text-center text-foreground">
                        Predicts the likelihood of survival during the Titanic disaster based on key factors from your input.
                    </p>
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center p-6">
                <form className="w-full max-w-lg space-y-6 bg-white p-6 rounded-lg shadow-md border border-gray-300">
                    {/* Passenger Class */}
                    <DropDownButton label="Passenger Class" id="passenger-class">
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">1</a>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">2</a>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">3</a>
                    </DropDownButton>

                    {/* Sex */}
                    <DropDownButton label="Sex" id="sex">
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">Male</a>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">Female</a>
                    </DropDownButton>

                    {/* Embarkation Port */}
                    <DropDownButton label="Embarkation Port" id="embarkation-port">
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">Cherbourg</a>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">Queenstown</a>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">Southampton</a>
                    </DropDownButton>

                    {/* Age */}
                    <InputButton label="Age" id="age"/>

                    {/* Number of siblings/spouses */}
                    <InputButton label="Number of siblings/spouses" id="sibsp"/>

                    {/* Number of parents/children */}
                    <InputButton label="Number of parents/children" id="parch"/>

                    {/* Checkboxes */}
                    <CheckBox label="Were they alone?" id="were-alone"/>
                    <CheckBox label="Was their cabin known?" id="cabin-known"/>
                    
                    {/* Show warning if needed */}
                    {showWarning && <ErrorMessage />}

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <PredictionButton onClick={handlePrediction}/>
                    </div>
                </form>
            </main>
            
            <Footer />
        </div>
    );
}

export default SurvivalCalculatorUI;
