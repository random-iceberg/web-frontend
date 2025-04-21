import PredictionButton from "../components/PredictionButton";
import { DropDownButton } from "../components/InputForm";
import { InputButton } from "../components/InputForm";

function SurvivalCalculatorUI() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="p-4 shadow-md">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-center">Survivor Prediction Calculator</h1>
                <p className="mt-2 text-lg text-center">
                    Predicts the likelihood of survival during the Titanic disaster based on key factors from your input.
                </p>
            </div>
            </header>

            {/* TODO: Add forms. */}
            {/* TODO: Add error handling for form inputs*/}
            <main>
                <DropDownButton label="Passenger Class">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">1</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">2</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">3</a>
                </DropDownButton>

                <DropDownButton label="Sex">
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">Male</a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">Female</a>
                </DropDownButton>

                <InputButton></InputButton>
            </main>
            
            {/* TODO: Grey out button until forms filled. */}
            <footer>
                <PredictionButton />
            </footer>
        </div>
    )
}

export default SurvivalCalculatorUI;    