import React from 'react';
import '../global.css';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow p-0">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center py-20 bg-accent text-white">
          <h1 className="text-5xl font-bold mb-4">Predict Titanic Survivals with AI</h1>
          <p className="text-xl mb-8">Experience machine learning models in action — instantly and easily.</p>
          <div className="space-x-4">
            <Link to="/calculator" className="bg-white text-accent font-bold py-2 px-6 rounded hover:bg-gray-200">
              Get Started
            </Link>
            <a href="#how-it-works" className="bg-transparent border-2 border-white text-white font-bold py-2 px-6 rounded hover:bg-white hover:text-accent">
              Learn More
            </a>
          </div>
        </section>

        {/* Feature Cards */}
        <section id="features" className="container mx-auto py-16 px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 shadow-lg rounded-lg bg-secondary text-center">
              <h3 className="text-2xl font-bold mb-4">Instant Predictions</h3>
              <p>Adjust passenger details and watch survival chances update live.</p>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-secondary text-center">
              <h3 className="text-2xl font-bold mb-4">Multiple Models</h3>
              <p>Choose Random Forest, SVM, or train your own machine learning model.</p>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-secondary text-center">
              <h3 className="text-2xl font-bold mb-4">Admin Tools</h3>
              <p>Manage, delete, and train models — take full control of your AI system.</p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="container mx-auto py-16 px-4">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-6xl font-bold text-accent mb-4">1</div>
              <h3 className="text-2xl font-bold mb-2">Create an Account</h3>
              <p>Register quickly to unlock full access to models and history.</p>
            </div>
            <div>
              <div className="text-6xl font-bold text-accent mb-4">2</div>
              <h3 className="text-2xl font-bold mb-2">Define Passenger</h3>
              <p>Input passenger data and watch survival predictions update instantly.</p>
            </div>
            <div>
              <div className="text-6xl font-bold text-accent mb-4">3</div>
              <h3 className="text-2xl font-bold mb-2">Explore & Train</h3>
              <p>Use admin tools to manage or train your own machine learning models.</p>
            </div>
          </div>
        </section>

        {/* Call To Action */}
        <section className="flex flex-col items-center justify-center text-center py-20 bg-accent text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to see how you'd fare?</h2>
          <Link to="/calculator" className="bg-white text-accent font-bold py-3 px-8 rounded hover:bg-gray-200 mt-4">
            Start Predicting
          </Link>
        </section>

        {/* Portfolio / Advertisement Section */}
        <section className="container mx-auto py-16 px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Explore More From Us</h2>
          <p className="text-center text-lg mb-16 text-muted-foreground max-w-2xl mx-auto">
            We don't just predict Titanic survivals — our team builds fast, secure, and scalable web applications. Check out some of our recent projects below.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-secondary shadow-lg rounded-lg font-bold hover:bg-accent hover:text-white transition"
            >
              🎓 Build AI Web Apps – Online Course
              <p className="mt-2 text-sm font-normal text-muted-foreground">
                Our bestselling course on building full-stack AI applications with React, FastAPI & more.
              </p>
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-secondary shadow-lg rounded-lg font-bold hover:bg-accent hover:text-white transition"
            >
              🚀 Startup Launcher Kit
              <p className="mt-2 text-sm font-normal text-muted-foreground">
                A boilerplate kit with auth, payments, and dashboards — launch your SaaS faster than ever.
              </p>
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-secondary shadow-lg rounded-lg font-bold hover:bg-accent hover:text-white transition"
            >
              📊 Real-Time Analytics Dashboard
              <p className="mt-2 text-sm font-normal text-muted-foreground">
                Visualize live data streams with beautiful, high-performance charting in React.
              </p>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
