import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="home-main">
      <section className="home-intro">
        <h2>Welcome to SnipShare</h2>
        <p>
          SnipShare is your secure code snippet manager designed to help you
          organize and share code effortlessly while ensuring privacy and
          security.
        </p>
       <Link to="/signup"><button className="cta-button">Signup Now</button></Link>
      </section>

      <section className="home-testimonials">
        <h4>What Developers Say</h4>
        <div className="testimonial-card">
          <p>
            “SnipShare helps me store and reuse my code easily. Love the clean
            UI!” — <strong>Priya S.</strong>
          </p>
        </div>
        <div className="testimonial-card">
          <p>
            “Finally a tool that lets me manage my snippets securely!” — 
            <strong> Ankit R.</strong>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Home;
