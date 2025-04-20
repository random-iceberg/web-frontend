import PredictionButton from "../components/PredictionButton";

function SurvivalCalculatorUI() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="p-4 shadow-md">
                <h1 className="text-4xl font-bold">Survivor Prediction Calculator</h1>
                <p className="mt-2 text-lg">Predicts the likelihood of survival during the Titanic disaster based on key factors from your input.</p>
            </header>

            <main>
            
            </main>

            <footer>
                <PredictionButton />
            </footer>
        </div>
    )
}

export default SurvivalCalculatorUI;    