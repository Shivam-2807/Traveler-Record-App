import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroRouteMap from "../components/HeroRouteMap.jsx";

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

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function Home() {
  const stageRef = useRef(null);
  const heroRef = useRef(null);

  // Hero Scroll Map
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Live Workflow Scroll Map
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start center", "center center"]
  });

  const vehicleLeft = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "94%"]);
  // At 85% trip completion, smoothly switch the road to green
  const routeColor = useTransform(scrollYProgress, [0.85, 0.95], ["#e11d48", "#10B981"]);

  useEffect(() => {
    const root = document.documentElement;

    function updateScrollProgress() {
      const scrollableHeight = document.body.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      root.style.setProperty("--scroll-progress", progress.toString());
    }

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
    };
  }, []);

  return (
    <div className="home-experience">
      <div className="scroll-progress" aria-hidden="true" />
      <div className="cursor-light" aria-hidden="true" />
      <motion.section 
        className="cinema-hero split-layout"
        ref={heroRef}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      >
        {/* Left Side: Dark Hero Copy */}
        <div className="hero-split-text">
          <p className="eyebrow light">SHIVAM P TRAVEL SYSTEM</p>
          <h1>Every trip becomes a living route, ledger, and memory.</h1>
          <p>
            Active journeys glow red. Completed routes settle into green history.
            Expenses stay inside the trip where they belong.
          </p>
          <div className="actions">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ display: 'inline-block' }}>
              <Link className="button" to="/register">
                Start your first trip
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ display: 'inline-block' }}>
              <Link className="button hero-secondary" to="/login" style={{ marginLeft: "12px", background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.4)" }}>
                Open dashboard
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Animated Leaflet Map tracking Saharanpur to Chennai */}
        <div className="hero-split-map leaflet-hero-container">
          <HeroRouteMap scrollProgress={heroProgress} />
        </div>
      </motion.section>

      <motion.section 
        className="ticker-strip" 
        aria-label="Platform highlights"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      >
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
      </motion.section>

      <motion.section 
        className="mission-section"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      >
        <div>
          <p className="eyebrow">Why this exists</p>
          <h2>Travel tools are scattered. A journey should feel like one record.</h2>
        </div>
        <p>
          Travelers jump between map apps, expense apps, galleries, and social platforms.
          Shivam P combines the emotional map diary with the practical trip ledger.
        </p>
      </motion.section>

      <motion.section 
        className="live-product" 
        aria-label="Product preview"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      >
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

          <div className="stage-map" ref={stageRef}>
            <img
              src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85"
              alt="Travel map and memories"
            />
            <motion.span className="stage-route" style={{ backgroundColor: routeColor }}>
              <motion.span className="stage-route-runner" style={{ left: vehicleLeft }}>
                <span style={{ fontSize: "28px", position: "absolute", top: "-18px", left: "-14px", transform: "scaleX(-1) rotate(19deg)" }}>🏍️</span>
              </motion.span>
            </motion.span>
            <span className="stage-pin first-pin">Start</span>
            <span className="stage-pin second-pin">Stop</span>
            <span className="stage-pin third-pin">Memory</span>
          </div>

          <motion.div 
            className="expense-stack"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {expenses.map(([category, note, amount], i) => (
              <motion.div key={category} variants={fadeUp} whileHover={{ y: -6 }}>
                <span>{category}</span>
                <p>{note}</p>
                <strong>{amount}</strong>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        className="module-section"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      >
        <div className="section-title">
          <p className="eyebrow">System modules</p>
          <h2>The homepage should show the full idea, not only login and register.</h2>
        </div>
        <motion.div 
          className="module-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {modules.map((module) => (
            <motion.article 
              className="module-tile" 
              key={module.title}
              variants={fadeUp}
              whileHover={{ scale: 1.03, y: -6, boxShadow: "0 22px 48px rgba(23, 23, 23, 0.1)" }}
            >
              <span>{module.tag}</span>
              <h3>{module.title}</h3>
              <p>{module.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      <motion.section 
        className="timeline-section"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      >
        <div className="timeline-copy">
          <p className="eyebrow">Trip lifecycle</p>
          <h2>From red route to green memory.</h2>
          <p>
            This is the emotional hook of the app: the route changes color as the
            journey becomes part of the user's history.
          </p>
        </div>
        <motion.div 
          className="route-timeline"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {timeline.map((item) => (
            <motion.article 
              className="timeline-stop" 
              key={item.year}
              variants={fadeUp}
              whileHover={{ x: 10 }}
            >
              <span>{item.year}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      <motion.section 
        className="memory-band"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      >
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
      </motion.section>

      <motion.section 
        className="launch-section"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      >
        <div>
          <p className="eyebrow">MVP direction</p>
          <h2>Build the website first. Make the core loop beautiful.</h2>
        </div>
        <div className="launch-actions">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link className="button" to="/register">
              Create account
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link className="button secondary" to="/login">
              Login
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
