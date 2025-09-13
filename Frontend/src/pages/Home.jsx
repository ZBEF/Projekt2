import React from "react";
import CalendarComponent from "../components/CalendarComponent";

const Home = () => {
  return (
    <div className="container mt-4">
      <h1 className="text-center">Reservierungen</h1>
      <CalendarComponent />
    </div>
  );
};

export default Home;
