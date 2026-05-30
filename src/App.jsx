import { useState, useMemo } from "react";
import "./App.css";

const ORANGE = "#F97316";
const ORANGE_LIGHT = "#FFF7ED";
const ORANGE_DARK = "#C2410C";

const destinations = [
  { name: "Goa", state: "Goa", type: "Beach", emoji: "🏖️", rating: 4.8, minBudget: 1500, recommended: 3000 },
  { name: "Manali", state: "Himachal Pradesh", type: "Mountains", emoji: "🏔️", rating: 4.9, minBudget: 800, recommended: 2000 },
  { name: "Varanasi", state: "Uttar Pradesh", type: "Heritage", emoji: "🕌", rating: 4.7, minBudget: 600, recommended: 1200 },
  { name: "Coorg", state: "Karnataka", type: "Nature", emoji: "🌿", rating: 4.6, minBudget: 1000, recommended: 2500 },
  { name: "Rishikesh", state: "Uttarakhand", type: "Adventure", emoji: "🏄", rating: 4.8, minBudget: 500, recommended: 1000 },
  { name: "Jaisalmer", state: "Rajasthan", type: "Desert", emoji: "🐪", rating: 4.7, minBudget: 700, recommended: 1500 },
  { name: "Leh-Ladakh", state: "J&K/Ladakh", type: "High-Altitude", emoji: "🏔️", rating: 4.9, minBudget: 1500, recommended: 3500 },
  { name: "Mysuru", state: "Karnataka", type: "Heritage", emoji: "🏯", rating: 4.5, minBudget: 600, recommended: 1200 },
  { name: "Hampi", state: "Karnataka", type: "UNESCO Site", emoji: "🏛️", rating: 4.7, minBudget: 500, recommended: 1000 },
  { name: "Spiti Valley", state: "Himachal Pradesh", type: "Off-Beat", emoji: "🌄", rating: 4.8, minBudget: 1200, recommended: 2500 },
  { name: "Kolkata", state: "West Bengal", type: "City", emoji: "🌆", rating: 4.4, minBudget: 700, recommended: 1500 },
  { name: "Kodaikanal", state: "Tamil Nadu", type: "Hill Station", emoji: "⛰️", rating: 4.5, minBudget: 800, recommended: 1800 },
];

const stays = [
  { name: "Zostel Goa", location: "Panaji, Goa", type: "Hostel", price: 350, rating: 4.7, amenities: ["WiFi", "AC", "Common Kitchen"], desc: "Vibrant backpacker hostel with beach-vibe rooftop and social events.", verified: true },
  { name: "Backpacker's Inn Manali", location: "Old Manali, HP", type: "Hostel", price: 400, rating: 4.5, amenities: ["WiFi", "Hot Water", "Common Room"], desc: "Cozy hostel with mountain views, fireplace, and fun group activities.", verified: true },
  { name: "Ganges View PG", location: "Varanasi, UP", type: "PG", price: 280, rating: 4.3, amenities: ["WiFi", "Meals Included", "Study Area"], desc: "Affordable PG with Ganges view and home-cooked vegetarian meals.", verified: false },
  { name: "Rishikesh Yog Hostel", location: "Tapovan, Rishikesh", type: "Hostel", price: 299, rating: 4.8, amenities: ["WiFi", "Yoga Deck", "River View"], desc: "Spiritual backpacker hub with yoga sessions and adventure sports booking.", verified: true },
  { name: "Desert Camp Jaisalmer", location: "Sam Sand Dunes, Rajasthan", type: "Camping", price: 800, rating: 4.6, amenities: ["Camel Ride", "Cultural Show", "Meals Included"], desc: "Authentic desert camping with traditional meals and folk music.", verified: true },
  { name: "Dharamshala Pilgrim Niwas", location: "Dharamshala, HP", type: "Dharamshala", price: 150, rating: 4.1, amenities: ["Hot Water", "Meals", "Prayer Hall"], desc: "Simple and clean dharamshala with basic amenities for budget-conscious students.", verified: false },
  { name: "Gokulam Mysuru PG", location: "Mysuru, Karnataka", type: "PG", price: 350, rating: 4.4, amenities: ["WiFi", "Meals", "AC"], desc: "Well-maintained PG near Mysuru Palace with homely atmosphere.", verified: true },
  { name: "Hampi Guesthouse", location: "Hampi, Karnataka", type: "Budget Hotel", price: 450, rating: 4.2, amenities: ["WiFi", "Hot Water", "Bicycle Rental"], desc: "Amidst Hampi's ruins with rooftop dining and easy access to temples.", verified: false },
  { name: "Paharganj Budget Stay", location: "New Delhi, Delhi", type: "Budget Hotel", price: 500, rating: 3.9, amenities: ["WiFi", "AC", "24hr Front Desk"], desc: "Classic Delhi backpacker zone hotel near New Delhi Railway Station.", verified: true },
  { name: "Zostel Kasol", location: "Kasol, HP", type: "Hostel", price: 299, rating: 4.9, amenities: ["WiFi", "River View", "Common Kitchen"], desc: "Most loved hostel in Parvati Valley with campfires and trek booking.", verified: true },
];

const discounts = [
  { name: "Indian Railway Student Concession", org: "Indian Railways / IRCTC", discount: "50% off", category: "Transport", tag: "Most Popular" },
  { name: "STIC Student Travel Card", org: "STIC Travels", discount: "Up to 30% off", category: "Transport", tag: "Multi-benefit" },
  { name: "ASI Monuments — Student Entry", org: "Archaeological Survey of India", discount: "Free / 50% off", category: "Monuments", tag: "3500+ Sites" },
  { name: "National Museum Student Pass", org: "National Museum, Delhi", discount: "₹10 entry", category: "Museums", tag: "₹10 only" },
  { name: "Himachal Pradesh Bus Student Pass", org: "HRTC", discount: "50% off", category: "Transport", tag: "HP Routes" },
  { name: "BookMyShow Student Offer", org: "BookMyShow", discount: "Up to 25% off", category: "Entertainment", tag: "Movies & Events" },
  { name: "Rajasthan State Transport Student Concession", org: "RSRTC", discount: "50% off", category: "Transport", tag: "Rajasthan Routes" },
  { name: "IndiGo Student Fares", org: "IndiGo Airlines", discount: "₹1,000–₹3,000 off", category: "Transport", tag: "Flight Discount" },
  { name: "Forest Dept National Parks — Student Rate", org: "State Forest Departments", discount: "50–75% off", category: "Monuments", tag: "Wildlife Parks" },
];

const DISC_CATEGORIES = ["All", "Transport", "Accommodation", "Monuments", "Museums", "Entertainment", "Food"];
const STAY_TYPES = ["All", "Hostel", "PG", "Budget Hotel", "Dharamshala", "Camping"];

function Avatar({ name, color = ORANGE }) {
  return (
    <div style={{ width: 34, height: 34, borderRadius: "50%", background: ORANGE_LIGHT, color: ORANGE_DARK, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 13, flexShrink: 0, border: `1.5px solid ${ORANGE}22` }}>
      {name[0].toUpperCase()}
    </div>
  );
}

function Badge({ text, color = "#F97316" }) {
  return <span style={{ background: color + "18", color, fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20, border: `1px solid ${color}33` }}>{text}</span>;
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: "none", border: "none", cursor: "pointer", padding: "8px 10px", borderRadius: 10, color: active ? ORANGE : "#9CA3AF", flex: 1 }}>
      <span style={{ fontSize: 20 }}>{icon}</span>
      <span style={{ fontSize: 10, fontWeight: active ? 600 : 400 }}>{label}</span>
    </button>
  );
}

// ── HOME ──────────────────────────────────────────────────────────────────────
function Home({ setPage }) {
  const features = [
    { icon: "📋", title: "Budget Planner", desc: "Plan your India trip within your budget", page: "budget" },
    { icon: "👥", title: "Shared Expenses", desc: "Track and split group expenses fairly", page: "expenses" },
    { icon: "🏷️", title: "Student Discounts", desc: "Exclusive discounts across transport & more", page: "discounts" },
    { icon: "🏨", title: "Nearby Stays", desc: "Budget hostels, PGs and dharamshalas", page: "stays" },
    { icon: "🍛", title: "Budget Food", desc: "Cheap dhabas, canteens & local eateries", page: null },
    { icon: "🗺️", title: "Group Trip", desc: "Plan group itineraries and manage budgets", page: "group" },
    { icon: "₹", title: "Currency Converter", desc: "Convert any currency to INR instantly", page: null },
  ];

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)", padding: "32px 20px 28px", color: "#fff" }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, lineHeight: 1.2 }}>Travel India</h1>
        <h1 style={{ margin: "0 0 12px", fontSize: 26, fontWeight: 800, color: ORANGE }}>Smart & Cheap</h1>
        <p style={{ margin: "0 0 20px", fontSize: 13, color: "#CBD5E1", lineHeight: 1.6 }}>
          The all-in-one budget travel companion for Indian students. Plan trips, split expenses, find discounts, and explore India — all in Indian Rupees.
        </p>
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          <button onClick={() => setPage("budget")} style={{ background: ORANGE, color: "#fff", border: "none", borderRadius: 24, padding: "10px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>🚀 Start Planning →</button>
          <button onClick={() => setPage("group")} style={{ background: "transparent", color: "#fff", border: "1px solid #ffffff44", borderRadius: 24, padding: "10px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>👥 Plan Group Trip</button>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {["🚂 Train", "🚌 Bus", "✈️ Flight"].map(t => (
            <span key={t} style={{ background: "#ffffff18", borderRadius: 20, padding: "4px 12px", fontSize: 11, color: "#CBD5E1" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "#F1F5F9", margin: "0 0 0" }}>
        {[["50+", "Indian Destinations"], ["₹500", "Min. Daily Budget"], ["100+", "Student Discounts"], ["Free", "Always Free"]].map(([val, label]) => (
          <div key={label} style={{ background: "#fff", padding: "16px", textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: ORANGE }}>{val}</div>
            <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div style={{ padding: "24px 16px 12px" }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 700, textAlign: "center" }}>Everything You Need to <span style={{ color: ORANGE }}>Travel Smart</span></h2>
        <p style={{ margin: "0 0 16px", fontSize: 12, color: "#6B7280", textAlign: "center" }}>Seven powerful tools designed for student budget travelers</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {features.map(f => (
            <div key={f.title} onClick={() => f.page && setPage(f.page)} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "14px 12px", cursor: f.page ? "pointer" : "default" }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{f.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{f.title}</div>
              <div style={{ fontSize: 11, color: "#6B7280", lineHeight: 1.4 }}>{f.desc}</div>
              {f.page && <div style={{ fontSize: 11, color: ORANGE, marginTop: 6, fontWeight: 600 }}>Explore →</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Popular Destinations */}
      <div style={{ padding: "16px 16px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Popular Student Destinations</div>
            <div style={{ fontSize: 11, color: "#6B7280" }}>Top domestic picks for budget travelers</div>
          </div>
          <button onClick={() => setPage("budget")} style={{ background: "none", border: "none", color: ORANGE, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>View all →</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {destinations.slice(0, 6).map(d => (
            <div key={d.name} style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ background: "#FFEDD5", padding: "20px 0 12px", textAlign: "center", fontSize: 32 }}>{d.emoji}</div>
              <div style={{ padding: "10px 10px 12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>{d.name}</span>
                  <span style={{ fontSize: 11, color: "#D97706" }}>⭐ {d.rating}</span>
                </div>
                <div style={{ fontSize: 10, color: "#6B7280", marginBottom: 6 }}>📍 {d.state}</div>
                <Badge text={d.type} color="#D97706" />
                <div style={{ fontSize: 11, color: "#059669", marginTop: 6, fontWeight: 600 }}>↘ ₹{d.recommended.toLocaleString()}/day</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ margin: "0 16px 24px", background: `linear-gradient(135deg, ${ORANGE}, #DC2626)`, borderRadius: 16, padding: "24px 20px", color: "#fff", textAlign: "center" }}>
        <div style={{ fontSize: 20, marginBottom: 8 }}>🛡️</div>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Built for Indian Students</div>
        <p style={{ fontSize: 11, color: "#FFE4D0", margin: "0 0 16px", lineHeight: 1.6 }}>All prices in Indian Rupees. Designed with student budgets in mind — from ₹500/day backpacking to ₹5,000/day comfort travel.</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button onClick={() => setPage("discounts")} style={{ background: "#fff", color: ORANGE, border: "none", borderRadius: 24, padding: "9px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>🏷️ Find Discounts</button>
          <button onClick={() => setPage("expenses")} style={{ background: "transparent", color: "#fff", border: "1.5px solid #ffffff66", borderRadius: 24, padding: "9px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>👥 Split Expenses</button>
        </div>
      </div>
    </div>
  );
}

// ── BUDGET PLANNER ────────────────────────────────────────────────────────────
function BudgetPlanner() {
  const [budget, setBudget] = useState(5000);
  const [days, setDays] = useState(3);
  const [travelers, setTravelers] = useState(1);
  const [transport, setTransport] = useState("Train");

  const perDay = Math.round(budget / travelers / days);
  const affordable = destinations.filter(d => d.minBudget <= perDay);

  return (
    <div style={{ padding: "20px 16px", background: "#fff", minHeight: "100vh" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
        <span style={{ fontSize: 24 }}>📋</span>
        <div>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Budget Planner</h2>
          <p style={{ margin: 0, fontSize: 12, color: "#6B7280" }}>Plan your India trip within your budget</p>
        </div>
      </div>

      <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 14, padding: 16, margin: "16px 0" }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, color: "#92400E", display: "flex", alignItems: "center", gap: 6 }}>📊 Enter Your Details</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 12 }}>
          {[["Total Budget (₹)", budget, setBudget, 500, 100000, 500], ["Number of Days", days, setDays, 1, 30, 1], ["Number of Travelers", travelers, setTravelers, 1, 20, 1]].map(([label, val, set, min, max, step]) => (
            <div key={label}>
              <div style={{ fontSize: 10, color: "#6B7280", marginBottom: 4 }}>{label}</div>
              <input type="number" value={val} min={min} max={max} step={step} onChange={e => set(Number(e.target.value))}
                style={{ width: "100%", border: "1px solid #E5E7EB", borderRadius: 8, padding: "7px 8px", fontSize: 13, fontWeight: 600, boxSizing: "border-box" }} />
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 8 }}>Preferred Transport Mode</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[["Train", "🚂", "Cheapest option"], ["Bus", "🚌", "Budget buses available"], ["Flight", "✈️", "Check budget airlines"]].map(([t, icon, sub]) => (
              <button key={t} onClick={() => setTransport(t)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 24, border: `1.5px solid ${transport === t ? ORANGE : "#E5E7EB"}`, background: transport === t ? ORANGE_LIGHT : "#fff", color: transport === t ? ORANGE_DARK : "#374151", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
                {icon} {t} <span style={{ fontSize: 10, fontWeight: 400, color: transport === t ? ORANGE : "#9CA3AF" }}>{sub}</span>
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          <div style={{ textAlign: "center", background: "#fff", borderRadius: 10, padding: "10px 6px" }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: ORANGE }}>₹{perDay.toLocaleString()}</div>
            <div style={{ fontSize: 10, color: "#6B7280" }}>Per person / day</div>
          </div>
          <div style={{ textAlign: "center", background: "#fff", borderRadius: 10, padding: "10px 6px" }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#1D4ED8" }}>{days}</div>
            <div style={{ fontSize: 10, color: "#6B7280" }}>Days of travel</div>
          </div>
          <div style={{ textAlign: "center", background: "#fff", borderRadius: 10, padding: "10px 6px" }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#059669" }}>{affordable.length}</div>
            <div style={{ fontSize: 10, color: "#6B7280" }}>Affordable destinations</div>
          </div>
        </div>
      </div>

      <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 12px", color: "#059669" }}>↘ Destinations Within Your Budget</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {destinations.map(d => {
          const canAfford = d.minBudget <= perDay;
          const mode = canAfford ? (d.recommended <= perDay ? "Comfortable" : "Budget Mode") : "Over Budget";
          const modeColor = mode === "Comfortable" ? "#059669" : mode === "Budget Mode" ? ORANGE_DARK : "#DC2626";
          return (
            <div key={d.name} style={{ background: canAfford ? "#fff" : "#FAFAFA", border: "0.5px solid #E5E7EB", borderRadius: 10, padding: "12px 14px", opacity: canAfford ? 1 : 0.5 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>{d.name}</span>
                  <div style={{ fontSize: 11, color: "#6B7280" }}>📍 {d.state}</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: modeColor }}>{mode}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4, marginTop: 8, fontSize: 11 }}>
                <div><span style={{ color: "#6B7280" }}>Min budget</span><br /><span style={{ fontWeight: 600 }}>₹{d.minBudget}/day</span></div>
                <div><span style={{ color: "#6B7280" }}>Recommended</span><br /><span style={{ fontWeight: 600, color: ORANGE }}>₹{d.recommended}/day</span></div>
                <div><span style={{ color: "#6B7280" }}>Type</span><br /><span style={{ fontWeight: 600 }}>{d.type}</span></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── SHARED EXPENSES ───────────────────────────────────────────────────────────
function SharedExpenses() {
  const [members, setMembers] = useState(["Rahul", "Priya", "Amit"]);
  const [newMember, setNewMember] = useState("");
  const [expenses, setExpenses] = useState([
    { desc: "Hotel Room", paidBy: "Rahul", amount: 3600 },
    { desc: "Auto Rickshaw", paidBy: "Priya", amount: 180 },
    { desc: "Dinner at Dhaba", paidBy: "Amit", amount: 540 },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newExp, setNewExp] = useState({ desc: "", paidBy: "", amount: "" });

  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const perPerson = members.length > 0 ? total / members.length : 0;

  const balances = useMemo(() => {
    const bal = {};
    members.forEach(m => bal[m] = 0);
    expenses.forEach(e => {
      if (bal[e.paidBy] !== undefined) bal[e.paidBy] += e.amount;
      members.forEach(m => { if (bal[m] !== undefined) bal[m] -= perPerson; });
    });
    return bal;
  }, [expenses, members, perPerson]);

  const settlements = useMemo(() => {
    const pos = [], neg = [];
    Object.entries(balances).forEach(([m, b]) => {
      if (b > 0.01) pos.push({ m, b });
      else if (b < -0.01) neg.push({ m, b: -b });
    });
    const result = [];
    let pi = 0, ni = 0;
    while (pi < pos.length && ni < neg.length) {
      const pay = Math.min(pos[pi].b, neg[ni].b);
      result.push({ from: neg[ni].m, to: pos[pi].m, amt: pay });
      pos[pi].b -= pay; neg[ni].b -= pay;
      if (pos[pi].b < 0.01) pi++;
      if (neg[ni].b < 0.01) ni++;
    }
    return result;
  }, [balances]);

  return (
    <div style={{ padding: "20px 16px", background: "#fff", minHeight: "100vh" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <span style={{ fontSize: 24 }}>👥</span>
        <div>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Shared Expense Tracker</h2>
          <p style={{ margin: 0, fontSize: 12, color: "#6B7280" }}>Track group expenses and settle debts fairly</p>
        </div>
      </div>

      {/* Members */}
      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: 14, marginBottom: 14 }}>
        <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 10 }}>Group Members</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
          {members.map(m => (
            <div key={m} style={{ display: "flex", alignItems: "center", gap: 6, background: ORANGE_LIGHT, border: `1px solid ${ORANGE}33`, borderRadius: 20, padding: "4px 10px 4px 6px" }}>
              <Avatar name={m} />
              <span style={{ fontSize: 13, fontWeight: 500 }}>{m}</span>
              <button onClick={() => setMembers(ms => ms.filter(x => x !== m))} style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", fontSize: 14, padding: 0, lineHeight: 1 }}>✕</button>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={newMember} onChange={e => setNewMember(e.target.value)} placeholder="Add member name..." onKeyDown={e => { if (e.key === "Enter" && newMember.trim()) { setMembers(ms => [...ms, newMember.trim()]); setNewMember(""); } }} style={{ flex: 1, border: "1px solid #E5E7EB", borderRadius: 8, padding: "8px 12px", fontSize: 13 }} />
          <button onClick={() => { if (newMember.trim()) { setMembers(ms => [...ms, newMember.trim()]); setNewMember(""); } }} style={{ background: ORANGE, color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+ Add</button>
        </div>
      </div>

      {/* Expenses */}
      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: 14, marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontWeight: 600, fontSize: 13 }}>Expenses</div>
          <button onClick={() => setShowAdd(a => !a)} style={{ background: ORANGE, color: "#fff", border: "none", borderRadius: 20, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>+ Add Expense</button>
        </div>
        {showAdd && (
          <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: 12, marginBottom: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <input value={newExp.desc} onChange={e => setNewExp(x => ({ ...x, desc: e.target.value }))} placeholder="Description (e.g. Hotel Room)" style={{ border: "1px solid #E5E7EB", borderRadius: 8, padding: "8px 12px", fontSize: 13 }} />
              <div style={{ display: "flex", gap: 8 }}>
                <select value={newExp.paidBy} onChange={e => setNewExp(x => ({ ...x, paidBy: e.target.value }))} style={{ flex: 1, border: "1px solid #E5E7EB", borderRadius: 8, padding: "8px", fontSize: 13 }}>
                  <option value="">Paid by...</option>
                  {members.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <input type="number" value={newExp.amount} onChange={e => setNewExp(x => ({ ...x, amount: e.target.value }))} placeholder="₹ Amount" style={{ flex: 1, border: "1px solid #E5E7EB", borderRadius: 8, padding: "8px 12px", fontSize: 13 }} />
              </div>
              <button onClick={() => {
                if (newExp.desc && newExp.paidBy && newExp.amount) {
                  setExpenses(es => [...es, { desc: newExp.desc, paidBy: newExp.paidBy, amount: Number(newExp.amount) }]);
                  setNewExp({ desc: "", paidBy: "", amount: "" }); setShowAdd(false);
                }
              }} style={{ background: ORANGE, color: "#fff", border: "none", borderRadius: 8, padding: "9px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Add Expense</button>
            </div>
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {expenses.map((e, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < expenses.length - 1 ? "0.5px solid #F3F4F6" : "none" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{e.desc}</div>
                <div style={{ fontSize: 11, color: "#6B7280" }}>Paid by {e.paidBy} · Split {members.length} ways</div>
              </div>
              <span style={{ fontWeight: 700, fontSize: 14, color: "#1F2937" }}>₹{e.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 14, padding: 14, marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600, fontSize: 13, marginBottom: 10 }}>📊 Summary</div>
        {[["Total Expenses", `₹${total.toLocaleString()}`], ["Members", members.length], ["Per Person (avg)", `₹${Math.round(perPerson).toLocaleString()}`]].map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 13 }}>
            <span style={{ color: "#6B7280" }}>{k}</span>
            <span style={{ fontWeight: 600, color: k === "Per Person (avg)" ? ORANGE : "#1F2937" }}>{v}</span>
          </div>
        ))}
      </div>

      {/* Balances */}
      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: 14, marginBottom: 14 }}>
        <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 10 }}>Individual Balances</div>
        {Object.entries(balances).map(([m, b]) => (
          <div key={m} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Avatar name={m} /><span style={{ fontSize: 13 }}>{m}</span></div>
            <span style={{ fontWeight: 700, fontSize: 14, color: b >= 0 ? "#059669" : "#DC2626" }}>{b >= 0 ? "+" : ""}{Math.round(b).toLocaleString()}</span>
          </div>
        ))}
      </div>

      {/* Settlements */}
      {settlements.length > 0 && (
        <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600, fontSize: 13, marginBottom: 10 }}>₹ How to Settle</div>
          {settlements.map((s, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: i < settlements.length - 1 ? "0.5px solid #F3F4F6" : "none" }}>
              <span style={{ fontSize: 13 }}>{s.from} → {s.to}</span>
              <span style={{ fontWeight: 600, color: ORANGE, fontSize: 14 }}>₹{Math.round(s.amt).toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── STUDENT DISCOUNTS ─────────────────────────────────────────────────────────
function StudentDiscounts() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");

  const filtered = discounts.filter(d =>
    (cat === "All" || d.category === cat) &&
    (d.name.toLowerCase().includes(query.toLowerCase()) || d.org.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div style={{ padding: "20px 16px", background: "#fff", minHeight: "100vh" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <span style={{ fontSize: 24 }}>🏷️</span>
        <div>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Student Discounts</h2>
          <p style={{ margin: 0, fontSize: 12, color: "#6B7280" }}>Exclusive discounts for Indian students across transport, monuments & more</p>
        </div>
      </div>

      <div style={{ position: "relative", marginBottom: 12 }}>
        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }}>🔍</span>
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search discounts..." style={{ width: "100%", border: "1px solid #E5E7EB", borderRadius: 10, padding: "9px 12px 9px 36px", fontSize: 13, boxSizing: "border-box" }} />
      </div>

      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 14 }}>
        {DISC_CATEGORIES.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{ flexShrink: 0, background: cat === c ? ORANGE : "#F3F4F6", color: cat === c ? "#fff" : "#374151", border: "none", borderRadius: 20, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{c}</button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {filtered.map((d, i) => (
          <div key={d.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "13px 0", borderBottom: i < filtered.length - 1 ? "0.5px solid #F3F4F6" : "none" }}>
            <div style={{ display: "flex", gap: 12, flex: 1, minWidth: 0 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: ORANGE_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
                {d.category === "Transport" ? "🚂" : d.category === "Monuments" ? "🏛️" : d.category === "Museums" ? "🎨" : d.category === "Entertainment" ? "🎭" : "🏷️"}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{d.name}</div>
                <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 4 }}>{d.org}</div>
                {d.tag && <Badge text={d.tag} color={ORANGE} />}
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#059669", whiteSpace: "nowrap" }}>{d.discount}</div>
              <div style={{ fontSize: 10, color: "#9CA3AF" }}>{d.category}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── NEARBY STAYS ──────────────────────────────────────────────────────────────
function NearbyStays() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [maxPrice, setMaxPrice] = useState(1000);

  const filtered = stays.filter(s =>
    (type === "All" || s.type === type) &&
    s.price <= maxPrice &&
    (s.name.toLowerCase().includes(query.toLowerCase()) || s.location.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div style={{ padding: "20px 16px", background: "#fff", minHeight: "100vh" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <span style={{ fontSize: 24 }}>🏨</span>
        <div>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Nearby Stays</h2>
          <p style={{ margin: 0, fontSize: 12, color: "#6B7280" }}>Budget hostels, PGs, dharamshalas & affordable hotels across India</p>
        </div>
      </div>

      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: 12, marginBottom: 14 }}>
        <div style={{ position: "relative", marginBottom: 10 }}>
          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF", fontSize: 14 }}>🔍</span>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name or city..." style={{ width: "100%", border: "1px solid #E5E7EB", borderRadius: 8, padding: "8px 10px 8px 30px", fontSize: 13, boxSizing: "border-box" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 12, color: "#6B7280", flexShrink: 0 }}>Max Price/Night: ₹{maxPrice}</span>
          <input type="range" min={100} max={2000} step={50} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} style={{ flex: 1, accentColor: ORANGE }} />
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 14 }}>
        {STAY_TYPES.map(t => (
          <button key={t} onClick={() => setType(t)} style={{ flexShrink: 0, background: type === t ? ORANGE : "#F3F4F6", color: type === t ? "#fff" : "#374151", border: "none", borderRadius: 20, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{t}</button>
        ))}
      </div>

      <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 10 }}>{filtered.length} stays found</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {filtered.map(s => (
          <div key={s.name} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "12px 12px 10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.3 }}>{s.name}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: ORANGE, flexShrink: 0, marginLeft: 4 }}>₹{s.price}</span>
              </div>
              <div style={{ fontSize: 10, color: "#6B7280", marginBottom: 4 }}>📍 {s.location}</div>
              {s.verified && <span style={{ fontSize: 9, background: "#DCFCE7", color: "#166534", borderRadius: 10, padding: "2px 6px", fontWeight: 600 }}>✓ Verified</span>}
              <p style={{ fontSize: 10, color: "#374151", margin: "6px 0", lineHeight: 1.4 }}>{s.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 6 }}>
                {s.amenities.slice(0, 2).map(a => (
                  <span key={a} style={{ fontSize: 9, background: "#F3F4F6", borderRadius: 8, padding: "2px 6px", color: "#374151" }}>{a}</span>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Badge text={s.type} color="#7C3AED" />
                <span style={{ fontSize: 11, color: "#D97706" }}>⭐ {s.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── GROUP TRIP PLANNER ────────────────────────────────────────────────────────
function GroupTrip() {
  const [tripName, setTripName] = useState("Manali Winter Trip 2025");
  const [destination, setDestination] = useState("Manali");
  const [groupBudget, setGroupBudget] = useState(30000);
  const [startDate, setStartDate] = useState("2025-12-20");
  const [endDate, setEndDate] = useState("2025-12-26");
  const [members, setMembers] = useState(["Rahul", "Priya", "Amit", "Neha"]);
  const [newMember, setNewMember] = useState("");
  const [itinerary, setItinerary] = useState([
    { day: 1, items: [{ time: "14:00", loc: "Old Manali", activity: "Arrive at Manali, check-in hostel" }, { time: "17:00", loc: "Mall Road", activity: "Explore Mall Road & local market" }] },
    { day: 2, items: [{ time: "08:00", loc: "Rohtang Pass", activity: "Rohtang Pass / Solang Valley snow" }] },
    { day: 3, items: [{ time: "09:00", loc: "Hadimba", activity: "Hadimba Temple & Vashisht Hot Springs" }] },
    { day: 4, items: [{ time: "10:00", loc: "Kullu", activity: "Adventure sports — paragliding & river rafting" }] },
    { day: 5, items: [{ time: "08:00", loc: "Manali Bus Stand", activity: "Departure" }] },
  ]);
  const [transport, setTransport] = useState([
    { route: "Bus: Delhi → Manali", date: "2025-12-20", bookedBy: "Rahul", cost: 700 },
    { route: "Bus: Manali → Delhi", date: "2025-12-26", bookedBy: "Priya", cost: 700 },
  ]);

  const days = Math.max(1, Math.round((new Date(endDate) - new Date(startDate)) / 86400000));
  const perPerson = members.length > 0 ? Math.round(groupBudget / members.length) : 0;
  const totalTransport = transport.reduce((s, t) => s + t.cost, 0);

  return (
    <div style={{ padding: "20px 16px", background: "#fff", minHeight: "100vh" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <span style={{ fontSize: 24 }}>🗺️</span>
        <div>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Group Trip Planner</h2>
          <p style={{ margin: 0, fontSize: 12, color: "#6B7280" }}>Coordinate group trips, itinerary, and budgets</p>
        </div>
      </div>

      {/* Trip Details */}
      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: 14, marginBottom: 14 }}>
        <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 12 }}>Trip Details</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 10, color: "#6B7280", marginBottom: 4 }}>Trip Name</div>
            <input value={tripName} onChange={e => setTripName(e.target.value)} style={{ width: "100%", border: "1px solid #E5E7EB", borderRadius: 8, padding: "7px 10px", fontSize: 12, boxSizing: "border-box" }} />
          </div>
          <div>
            <div style={{ fontSize: 10, color: "#6B7280", marginBottom: 4 }}>Destination (India Only)</div>
            <select value={destination} onChange={e => setDestination(e.target.value)} style={{ width: "100%", border: "1px solid #E5E7EB", borderRadius: 8, padding: "7px 8px", fontSize: 12 }}>
              {destinations.map(d => <option key={d.name}>{d.name}</option>)}
            </select>
          </div>
          <div>
            <div style={{ fontSize: 10, color: "#6B7280", marginBottom: 4 }}>Group Budget (₹)</div>
            <input type="number" value={groupBudget} onChange={e => setGroupBudget(Number(e.target.value))} style={{ width: "100%", border: "1px solid #E5E7EB", borderRadius: 8, padding: "7px 10px", fontSize: 12, boxSizing: "border-box" }} />
          </div>
          <div>
            <div style={{ fontSize: 10, color: "#6B7280", marginBottom: 4 }}>Start Date</div>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={{ width: "100%", border: "1px solid #E5E7EB", borderRadius: 8, padding: "7px 8px", fontSize: 12 }} />
          </div>
          <div style={{ gridColumn: "span 2" }}>
            <div style={{ fontSize: 10, color: "#6B7280", marginBottom: 4 }}>End Date</div>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={{ width: "100%", border: "1px solid #E5E7EB", borderRadius: 8, padding: "7px 8px", fontSize: 12 }} />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, background: "#F9FAFB", borderRadius: 10, overflow: "hidden", border: "1px solid #E5E7EB" }}>
          <div style={{ padding: "12px 0", textAlign: "center", borderRight: "1px solid #E5E7EB" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: ORANGE }}>{days}</div>
            <div style={{ fontSize: 10, color: "#6B7280" }}>Days</div>
          </div>
          <div style={{ padding: "12px 0", textAlign: "center", borderRight: "1px solid #E5E7EB" }}>
            <div style={{ fontSize: 22, fontWeight: 700 }}>{members.length}</div>
            <div style={{ fontSize: 10, color: "#6B7280" }}>Members</div>
          </div>
          <div style={{ padding: "12px 0", textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#059669" }}>₹{perPerson.toLocaleString()}</div>
            <div style={{ fontSize: 10, color: "#6B7280" }}>Per Person</div>
          </div>
        </div>
      </div>

      {/* Itinerary */}
      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: 14, marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600, fontSize: 13 }}>📅 Itinerary</div>
          <button style={{ background: ORANGE, color: "#fff", border: "none", borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>+ Add</button>
        </div>
        {itinerary.map(d => (
          <div key={d.day} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: ORANGE, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{d.day}</div>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Day {d.day}</span>
            </div>
            {d.items.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 10px", background: "#F9FAFB", borderRadius: 8, marginLeft: 12, marginBottom: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", border: `2px solid #D1D5DB`, marginTop: 4, flexShrink: 0 }}></div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{item.activity}</div>
                  <div style={{ fontSize: 10, color: ORANGE }}>{item.time} · {item.loc}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Members */}
      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: 14, marginBottom: 14 }}>
        <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 10 }}>👥 Members ({members.length})</div>
        {members.map(m => (
          <div key={m} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "0.5px solid #F3F4F6" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Avatar name={m} />
              <span style={{ fontSize: 13 }}>{m}</span>
            </div>
            <button onClick={() => setMembers(ms => ms.filter(x => x !== m))} style={{ background: "none", border: "none", color: "#9CA3AF", cursor: "pointer", fontSize: 16 }}>🗑️</button>
          </div>
        ))}
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <input value={newMember} onChange={e => setNewMember(e.target.value)} placeholder="Add member..." onKeyDown={e => { if (e.key === "Enter" && newMember.trim()) { setMembers(ms => [...ms, newMember.trim()]); setNewMember(""); } }} style={{ flex: 1, border: "1px solid #E5E7EB", borderRadius: 8, padding: "7px 10px", fontSize: 13 }} />
          <button onClick={() => { if (newMember.trim()) { setMembers(ms => [...ms, newMember.trim()]); setNewMember(""); } }} style={{ background: ORANGE, color: "#fff", border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+</button>
        </div>
      </div>

      {/* Transport */}
      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600, fontSize: 13 }}>🚌 Transport</div>
          <button style={{ background: ORANGE, color: "#fff", border: "none", borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>+ Add</button>
        </div>
        {transport.map((t, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "8px 0", borderBottom: "0.5px solid #F3F4F6" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{t.route}</div>
              <div style={{ fontSize: 11, color: "#6B7280" }}>{t.date} · Booked by {t.bookedBy}</div>
            </div>
            <span style={{ color: "#DC2626", fontWeight: 600, fontSize: 13 }}>₹{t.cost}</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, fontWeight: 600, fontSize: 13 }}>
          <span style={{ color: "#6B7280" }}>Total Transport</span>
          <span>₹{totalTransport.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

// ── APP SHELL ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");

  const navItems = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "budget", icon: "📋", label: "Budget" },
    { id: "expenses", icon: "👥", label: "Expenses" },
    { id: "discounts", icon: "🏷️", label: "Discounts" },
    { id: "stays", icon: "🏨", label: "Stays" },
    { id: "group", icon: "🗺️", label: "Group" },
  ];

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#F9FAFB", minHeight: "100vh", position: "relative" }}>
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: ORANGE, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🧳</div>
        <span style={{ fontWeight: 700, fontSize: 16, color: "#1F2937" }}>TripSmart</span>
        <span style={{ fontSize: 11, color: "#6B7280", marginLeft: 2 }}>Student Travel Planner</span>
      </div>

      {/* Page */}
      <div style={{ paddingBottom: 70 }}>
        {page === "home" && <Home setPage={setPage} />}
        {page === "budget" && <BudgetPlanner />}
        {page === "expenses" && <SharedExpenses />}
        {page === "discounts" && <StudentDiscounts />}
        {page === "stays" && <NearbyStays />}
        {page === "group" && <GroupTrip />}
      </div>

      {/* Bottom Nav */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 420, background: "#fff", borderTop: "1px solid #E5E7EB", display: "flex", zIndex: 200 }}>
        {navItems.map(n => <NavItem key={n.id} icon={n.icon} label={n.label} active={page === n.id} onClick={() => setPage(n.id)} />)}
      </div>
    </div>
  );
}
