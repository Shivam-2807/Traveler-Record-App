import { useEffect } from "react";
import { Link } from "react-router-dom";

const modules = [
  {
    title: "Map-first travel record",
    tag: "Route system",
    text: "Permanent A-to-B journey lines make every trip feel visible, not hidden inside a list."
  },
  {
    title: "Trip-locked expenses",
    tag: "Budget safety",
    text: "Each expense belongs to the active trip only, so old journeys never mix with new plans."
  },
  {
    title: "Resume after done",
    tag: "Safety net",
    text: "Forgot fuel, food, or a stay payment? Reopen the trip, fix it, and close it again."
  },
  {
    title: "Verified social travel",
    tag: "Trust layer",
    text: "DigiLocker verification can support safer join requests, reviews, and traveler discovery."
  }
];

const timeline = [
  {
    year: "Start",
    title: "Create a unique journey",
    text: "Choose source, destination, budget, and travel purpose."
  },
  {
    year: "Live",
    title: "Red route is active",
    text: "The expense sheet stays open while the trip is happening."
  },
  {
    year: "Done",
    title: "Green route becomes history",
    text: "The ledger locks and the map becomes a visual travel diary."
  },
  {
    year: "Resume",
    title: "Fix missed details",
    text: "A completed trip can reopen without losing its previous record."
  }
];

const expenses = [
  ["Fuel", "Saharanpur bypass", "Rs. 500"],
  ["Food", "Cafe near Mussoorie road", "Rs. 1,250"],
  ["Stay", "Dehradun hostel", "Rs. 3,100"]
];

export default function Home() {
  useEffect(() => {
    const root = document.documentElement;
    const motionItems = document.querySelectorAll(".motion-item");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("motion-in");
          }
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.18
      }
    );

    motionItems.forEach((item) => observer.observe(item));

    function updateScrollProgress() {
      const scrollableHeight = document.body.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      root.style.setProperty("--scroll-progress", progress.toString());
    }

    function updatePointer(event) {
      const x = event.clientX;
      const y = event.clientY;
      const tiltX = (x / window.innerWidth - 0.5).toFixed(3);
      const tiltY = (y / window.innerHeight - 0.5).toFixed(3);

      root.style.setProperty("--mouse-x", `${x}px`);
      root.style.setProperty("--mouse-y", `${y}px`);
      root.style.setProperty("--tilt-x", tiltX);
      root.style.setProperty("--tilt-y", tiltY);
    }

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("pointermove", updatePointer, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("pointermove", updatePointer);
    };
  }, []);

  return (
    <div className="home-experience">
      <div className="scroll-progress" aria-hidden="true" />
      <div className="cursor-light" aria-hidden="true" />
      <section className="cinema-hero motion-item">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85"
          alt="Mountain road for a travel route"
        />
        <div className="cinema-tint" />
        <div className="hero-copy">
          <p className="eyebrow light">Shivam P travel system</p>
          <h1>Every trip becomes a living route, ledger, and memory.</h1>
          <p>
            Active journeys glow red. Completed routes settle into green history.
            Expenses stay inside the trip where they belong.
          </p>
          <div className="actions">
            <Link className="button" to="/register">
              Start your first trip
            </Link>
            <Link className="button hero-secondary" to="/login">
              Open dashboard
            </Link>
          </div>
        </div>

        <div className="journey-map" aria-label="Animated route preview">
          <span className="map-label origin-label">Saharanpur</span>
          <span className="map-label destination-label">Dehradun</span>
          <span className="moving-route" />
          <span className="route-particle particle-one" />
          <span className="route-particle particle-two" />
          <span className="route-particle particle-three" />
          <span className="route-node origin-node" />
          <span className="route-node destination-node" />
          <div className="live-chip active-chip">
            <span>Active</span>
            <strong>Red</strong>
          </div>
          <div className="live-chip history-chip">
            <span>Done</span>
            <strong>Green</strong>
          </div>
        </div>
      </section>

      <section className="ticker-strip motion-item" aria-label="Platform highlights">
        <div className="ticker-track">
          <span>Map tracking</span>
          <span>Trip budget</span>
          <span>Expense split</span>
          <span>Resume trip</span>
          <span>DigiLocker badge</span>
          <span>Photo memory</span>
          <span>Map tracking</span>
          <span>Trip budget</span>
          <span>Expense split</span>
          <span>Resume trip</span>
          <span>DigiLocker badge</span>
          <span>Photo memory</span>
        </div>
      </section>

      <section className="mission-section motion-item">
        <div>
          <p className="eyebrow">Why this exists</p>
          <h2>Travel tools are scattered. A journey should feel like one record.</h2>
        </div>
        <p>
          Travelers jump between map apps, expense apps, galleries, and social platforms.
          Shivam P combines the emotional map diary with the practical trip ledger.
        </p>
      </section>

      <section className="live-product motion-item" aria-label="Product preview">
        <div className="product-copy">
          <p className="eyebrow">Live workflow</p>
          <h2>A dashboard that changes as the journey changes.</h2>
          <p>
            The route color, expense permissions, and history state all follow the
            same trip status.
          </p>
        </div>

        <div className="product-stage">
          <div className="trip-status-bar">
            <div>
              <span className="status-badge active">Active trip</span>
              <h3>Saharanpur to Dehradun</h3>
            </div>
            <strong>Rs. 4,850</strong>
          </div>

          <div className="stage-map">
            <img
              src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85"
              alt="Travel map and memories"
            />
            <span className="stage-route" />
            <span className="stage-route-runner" />
            <span className="stage-pin first-pin">Start</span>
            <span className="stage-pin second-pin">Stop</span>
            <span className="stage-pin third-pin">Memory</span>
          </div>

          <div className="expense-stack">
            {expenses.map(([category, note, amount]) => (
              <div key={category}>
                <span>{category}</span>
                <p>{note}</p>
                <strong>{amount}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="module-section motion-item">
        <div className="section-title">
          <p className="eyebrow">System modules</p>
          <h2>The homepage should show the full idea, not only login and register.</h2>
        </div>
        <div className="module-grid">
          {modules.map((module) => (
            <article className="module-tile motion-item" key={module.title}>
              <span>{module.tag}</span>
              <h3>{module.title}</h3>
              <p>{module.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="timeline-section motion-item">
        <div className="timeline-copy">
          <p className="eyebrow">Trip lifecycle</p>
          <h2>From red route to green memory.</h2>
          <p>
            This is the emotional hook of the app: the route changes color as the
            journey becomes part of the user's history.
          </p>
        </div>
        <div className="route-timeline">
          {timeline.map((item) => (
            <article className="timeline-stop motion-item" key={item.year}>
              <span>{item.year}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="memory-band motion-item">
        <img
          src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1400&q=85"
          alt="Friends recording a trip memory"
        />
        <div>
          <p className="eyebrow light">Premium memory layer</p>
          <h2>Photos live where the moment happened.</h2>
          <p>
            Premium users can pin images to places, turning completed green routes
            into a map-based gallery.
          </p>
        </div>
      </section>

      <section className="launch-section motion-item">
        <div>
          <p className="eyebrow">MVP direction</p>
          <h2>Build the website first. Make the core loop beautiful.</h2>
        </div>
        <div className="launch-actions">
          <Link className="button" to="/register">
            Create account
          </Link>
          <Link className="button secondary" to="/login">
            Login
          </Link>
        </div>
      </section>
    </div>
  );
}
