import PredictionButton from "../components/PredictionButton";
import { DropDownButton } from "../components/InputForm";
import { InputButton } from "../components/InputForm";
import { CheckBox } from "../components/InputForm";

function SurvivalCalculatorUI() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
            <header className="p-8 shadow-md">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center text-foreground">Survivor Prediction Calculator</h1>
                    <p className="mt-4 text-lg text-center text-foreground opacity-80">
                        Predicts the likelihood of survival during the Titanic disaster based on key factors from your input.
                    </p>
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center p-6">
                <form className="w-full max-w-lg space-y-6 bg-white p-6 rounded-lg shadow-md border border-gray-300">
                    {/* Passenger Class */}
                    <DropDownButton label="Passenger Class">
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">1</a>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">2</a>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">3</a>
                    </DropDownButton>

                    {/* Sex */}
                    <DropDownButton label="Sex">
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">Male</a>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">Female</a>
                    </DropDownButton>

                    {/* Embarkation Port */}
                    <DropDownButton label="Embarkation Port">
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">Cherbourg</a>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">Queenstown</a>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">Southampton</a>
                    </DropDownButton>

                    {/* Age */}
                    <InputButton label="Age" />

                    {/* Number of siblings/spouses */}
                    <InputButton label="Number of siblings/spouses" />

                    {/* Number of parents/children */}
                    <InputButton label="Number of parents/children" />

                    {/* Checkboxes */}
                    <CheckBox label="Were they alone?" />
                    <CheckBox label="Was their cabin known?" />

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <PredictionButton />
                    </div>
                </form>
            </main>
            
            <footer className="p-4 bg-background text-center">
                <p className="text-sm text-foreground opacity-60">© 2024 Titanic App. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default SurvivalCalculatorUI;
