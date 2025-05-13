import React from "react";
import { Link } from "react-router-dom";
import Section from "components/common/Section"; // Import common Section
import Card from "components/common/Card"; // Import common Card

const LandingPage: React.FC = () => (
  // Removed min-h-screen flex flex-col as App.tsx handles layout
  <div className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
    {/* Navbar is handled globally in App.tsx */}

    {/* ── Hero ── */}
    {/* Note: This header is specific to the landing page, distinct from the global Navbar */}
    <header className="flex flex-col items-center justify-center text-center py-24 bg-gradient-to-r from-blue-700 to-blue-500 text-white">
      <h1 className="text-5xl font-bold mb-4 leading-tight">
        Predict Titanic Survivals&nbsp;with AI
      </h1>
      <p className="text-xl mb-8 max-w-2xl">
        Experience production-grade machine-learning models directly in your
        browser – instantly, securely, and without any setup.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/calculator"
          className="bg-white text-blue-700 font-semibold px-8 py-3 rounded shadow hover:bg-gray-100 transition"
        >
          Try the Demo
        </Link>
        <a
          href="#features"
          className="border border-white font-semibold px-8 py-3 rounded hover:bg-white hover:text-blue-700 transition"
        >
          Learn More
        </a>
      </div>
    </header>

    {/* ── Feature Cards ────────────── */}
    <Section id="features">
      <h2 className="text-4xl font-bold text-center mb-12">Key Features</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Instant Predictions",
            body: "Change passenger details and watch survival odds update live.",
            icon: "⚡",
          },
          {
            title: "Multiple Models",
            body: "Compare Random Forest, SVM or train your own custom model.",
            icon: "🤖",
          },
          {
            title: "Admin Console",
            body: "Create, delete and retrain models – full control for data scientists.",
            icon: "🛠️",
          },
        ].map(({ title, body, icon }) => (
          // Use Card component
          <Card key={title} className="p-8 text-center">
            {" "}
            {/* Added p-8 and text-center */}
            <div className="text-5xl mb-4" aria-hidden>
              {icon}
            </div>
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <p className="text-gray-600">{body}</p>
          </Card>
        ))}
      </div>
    </Section>

    {/* ── How it works ─────────────── */}
    <Section id="how-it-works" className="bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-12">How it Works</h2>
      <div className="grid md:grid-cols-3 gap-8 text-center">
        {[
          ["Create an Account", "Unlock full access to training and history."],
          ["Define Passenger", "Enter details; prediction updates instantly."],
          ["Explore & Train", "Use admin tools to manage your models."],
        ].map(([step, body], i) => (
          <div key={step}>
            <div className="text-6xl font-bold text-blue-600 mb-2">{i + 1}</div>
            <h3 className="text-2xl font-semibold mb-2">{step}</h3>
            <p className="text-gray-600">{body}</p>
          </div>
        ))}
      </div>
    </Section>

    {/* ── Call to Action ────────────── */}
    <div className="bg-blue-600 text-white py-20 text-center">
      <h2 className="text-4xl font-bold mb-4">
        Ready to see how <span className="italic">you</span> would do?
      </h2>
      <Link
        to="/calculator"
        className="bg-white text-blue-700 font-semibold px-10 py-3 rounded shadow hover:bg-gray-100 transition"
      >
        Start Predicting
      </Link>
    </div>

    {/* ── Portfolio / Advertisement ─── */}
    <Section id="portfolio">
      <h2 className="text-4xl font-bold text-center mb-12">
        Explore More From Us
      </h2>
      <p className="text-center text-lg mb-16 text-gray-600 max-w-2xl mx-auto">
        We don’t just predict Titanic survivals — our team builds fast, secure,
        and scalable web applications. Check out some of our recent projects
        below.
      </p>

      <div className="grid md:grid-cols-3 gap-8 text-center">
        {[
          {
            title: "🎓 Build AI Web Apps – Online Course",
            body: "Our bestselling course on building full-stack AI applications with React, FastAPI & more.",
            href: "#",
          },
          {
            title: "🚀 Startup Launcher Kit",
            body: "A boilerplate with auth, payments, dashboards — launch your SaaS faster than ever.",
            href: "#",
          },
          {
            title: "📊 Real-Time Analytics Dashboard",
            body: "Visualize live data streams with beautiful, high-performance charts in React.",
            href: "#",
          },
        ].map(({ title, body, href }) => (
          <a
            key={title}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            // Use Card component - adjusted padding and hover effect
            className="p-8 bg-white shadow rounded-lg hover:shadow-md hover:bg-blue-50 transition flex flex-col"
          >
            <span className="text-xl font-bold mb-2">{title}</span>
            <span className="text-gray-600 flex-grow">{body}</span>
          </a>
          // Potential Card usage here, but keeping as <a> for simplicity unless more complex styling is needed.
          // If Card were used:
          // <Card key={title} className="p-8 hover:bg-blue-50 flex flex-col text-center">
          //   <a href={href} target="_blank" rel="noopener noreferrer" className="flex flex-col flex-grow">
          //     <span className="text-xl font-bold mb-2">{title}</span>
          //     <span className="text-gray-600 flex-grow">{body}</span>
          //   </a>
          // </Card>
        ))}
      </div>
    </Section>

    {/* Footer is handled globally in App.tsx */}
  </div>
);

export default LandingPage;
