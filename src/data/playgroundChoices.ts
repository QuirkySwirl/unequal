import { PlaygroundChoice } from '../types';
// Import existing and potentially new icons needed
import {
  Globe,
  Zap,
  GraduationCap,
  Droplets,
  HeartPulse,
  Ship,
  Crown,
  Twitter, // Keep using Twitter for consistency unless you want to rename the icon usage
  Landmark,
  HandHeart,
  SunMedium,
  School,
  Rocket,
  ShieldCheck, // For Vaccinations
  Building, // For Hospitals/Infrastructure
  Network, // For Internet/Connectivity
  Seedling, // For Environment/Reforestation
  Coins, // For Microloans/CashDrop
  Briefcase, // For Entrepreneurship
  Car, // For EV Subsidy
  Bone, // For Absurd Pet item
  Mountain, // For Landmark/Absurd
  Train, // For High-Speed Rail
  Plane, // For Jets
  Moon, // For Moon Base
  Atom, // For Disease Eradication/Research
  Bitcoin, // For Absurd Crypto purchase
  Factory, // For Industrial/Resource Control
  CloudRain, // For Weather Control Absurdity
  HelpCircle, // Placeholder if no specific icon fits well
  Gift, // Added for cash drop/basic income
  TreeDeciduous // Added for Reforestation / Islands
} from 'lucide-react';

// --- Billionaire Scale Choices ---
// Expanded list with more options for variety
export const billionaireChoices: PlaygroundChoice[] = [
  // --- Social Good ---
  {
    id: 'b_feed_world_1y',
    name: "Feed the World (for 1 Year) 🌍",
    scale: 'billionaire',
    category: 'socialGood',
    cost: 45, // Mid-point estimate ($45B)
    description: "Fund the estimated amount needed via UN programs to tackle severe global hunger for a full year. Millions fed, lives saved.",
    sourceHint: "(Source: UN WFP budgets & Ceres 2030 estimates)",
    icon: HandHeart,
  },
  {
    id: 'b_power_up_100m',
    name: "Power Up 100 Million Lives 💡",
    scale: 'billionaire',
    category: 'socialGood',
    cost: 30, // $30B
    description: "Bring 24/7 reliable electricity (via grid/solar) to 100 million people currently facing outages in regions across Africa and Asia.",
    sourceHint: "(Source: IEA/World Bank access cost estimates)",
    icon: Zap,
  },
  {
    id: 'b_unlock_1m_futures',
    name: "Unlock 1 Million Futures 🎓",
    scale: 'billionaire',
    category: 'socialGood',
    cost: 15, // $15B
    description: "Fund full university scholarships (tuition + living costs) for 1 million bright students from low-income backgrounds globally.",
    sourceHint: "(Source: Estimated avg. global university costs & aid models)",
    icon: GraduationCap,
  },
   {
    id: 'b_clean_water_50m',
    name: "Deliver Clean Water & Dignity 💧",
    scale: 'billionaire',
    category: 'socialGood',
    cost: 12, // $12B
    description: "Provide safe, piped water and proper sanitation facilities for 50 million people in underserved communities.",
    sourceHint: "(Source: WHO/UNICEF WASH cost estimates)",
    icon: Droplets,
  },
  {
    id: 'b_build_100_hospitals',
    name: "Build 100 Modern Hospitals 🏥",
    scale: 'billionaire',
    category: 'socialGood',
    cost: 20, // $20B
    description: "Construct and equip 100 state-of-the-art hospitals in regions desperately lacking quality healthcare access.",
    sourceHint: "(Source: Generalized modern hospital construction cost estimates)",
    icon: Building, // Using Building for infrastructure
  },
  {
    id: 'b_vaccinate_kids_globally',
    name: "Vaccinate the World's Children (1 Year) 🛡️",
    scale: 'billionaire',
    category: 'socialGood',
    cost: 8, // $8B
    description: "Cover the cost for a year's worth of basic childhood immunizations in low-income countries via GAVI/WHO efforts.",
    sourceHint: "(Source: GAVI / WHO funding reports)",
    icon: ShieldCheck,
  },
  {
    id: 'b_fund_entrepreneurs_5m',
    name: "Launch 5 Million Entrepreneurs 🚀",
    scale: 'billionaire',
    category: 'socialGood',
    cost: 10, // $10B (Initial Capital)
    description: "Create a massive fund providing low-interest micro-loans and seed capital to 5 million aspiring small business owners in developing economies.",
    sourceHint: "(Source: Microfinance institution models)",
    icon: Briefcase,
  },
  {
    id: 'b_cancel_medical_debt_100b',
    name: "Wipe Out $100B in Medical Debt 🙏",
    scale: 'billionaire',
    category: 'socialGood',
    cost: 1, // $1B (Leveraged)
    description: "Partner with charities to abolish roughly $100 Billion worth of crushing medical debt for families (buying it for pennies on the dollar).",
    sourceHint: "(Source: Based on RIP Medical Debt's reported leverage)",
    icon: HeartPulse,
  },

  // --- Luxury / Absurd ---
  {
    id: 'b_buy_ipl',
    name: "Own Global Cricket: Buy the IPL! 🏏",
    scale: 'billionaire',
    category: 'luxuryAbsurd',
    cost: 60, // $60B (Lower end of estimate)
    description: "Attempt gaining controlling interest in the entire Indian Premier League. Command the passion of billions!",
    sourceHint: "(Source: Speculative based on soaring sports league valuations)",
    icon: Crown,
  },
  {
    id: 'b_gigayacht_fleet',
    name: "Rule the Waves: Fleet of 10 Gigayachts 🛥️",
    scale: 'billionaire',
    category: 'luxuryAbsurd',
    cost: 7, // $7B
    description: "Why have one when you can have ten? Acquire a fleet of the world's most luxurious gigayachts.",
    sourceHint: "(Source: Luxury yacht market reports)",
    icon: Ship,
  },
  {
    id: 'b_private_islands',
    name: "Your Own Kingdom: 100 Private Islands 🏝️", // Re-added Island
    scale: 'billionaire',
    category: 'luxuryAbsurd',
    cost: 10, // $10B
    description: "Create a personal global archipelago. Purchase 100 exclusive private islands around the world.",
    sourceHint: "(Source: High-end luxury real estate estimates)",
    icon: TreeDeciduous, // Using TreeDeciduous for Island/Nature
  },
   {
    id: 'b_buy_twitter_again',
    name: "Buy Twitter/X (Again?) 🤳",
    scale: 'billionaire',
    category: 'luxuryAbsurd',
    cost: 44, // $44B
    description: "Control the conversation. Acquire the global social media platform X.",
    sourceHint: "(Source: Reported 2022 acquisition price)",
    icon: Twitter,
  },
  {
    id: 'b_own_landmark_symbolic',
    name: '"Own" a World Wonder (Symbolically) 🏛️',
    scale: 'billionaire',
    category: 'luxuryAbsurd',
    cost: 50, // $50B+ (Illustrative Cost)
    description: "Make an unparalleled statement. Attempt to secure exclusive naming rights or permanent sponsorship of a globally revered landmark. *Legally dubious, absurdly expensive!*",
    sourceHint: "(Concept Cost Only - illustrates scale)",
    icon: Landmark,
  },
  {
    id: 'b_space_trips_100k',
    name: "Space Trips for a Small City 🚀",
    scale: 'billionaire',
    category: 'luxuryAbsurd',
    cost: 50, // $50B
    description: "Buy ~100,000 tickets for suborbital space tourism flights. Offer a quick trip to the edge of space for a town's worth of people.",
    sourceHint: "(Source: Based on ~$500k/ticket estimate)",
    icon: Rocket,
  },
  {
    id: 'b_nfl_team_fleet', // Renamed for clarity
    name: "Buy Every NFL Team 🏈",
    scale: 'billionaire',
    category: 'luxuryAbsurd',
    cost: 170, // $170B (Approximate total)
    description: "Purchase all 32 NFL franchises based on current valuations. Dominate American football.",
    sourceHint: "(Source: Forbes/Sportico team valuations)",
    icon: Crown, // Using Crown again for ultimate ownership
  },
   {
    id: 'b_lifetime_avocado_toast_swiss',
    name: "Lifetime Avocado Toast (for Switzerland) 🥑",
    scale: 'billionaire',
    category: 'luxuryAbsurd',
    cost: 18, // $18B (Illustrative calc)
    description: "Absurdly provide a daily avocado toast to everyone in Switzerland (~8.7M people) for one year.",
    sourceHint: "(Source: Purely illustrative calculation)",
    icon: HelpCircle, // Placeholder icon for absurdity
  },
];

// --- Company Scale Choices ---
// Expanded list with more options for variety
export const companyChoices: PlaygroundChoice[] = [
  // --- Social Good ---
  {
    id: 'c_end_extreme_poverty',
    name: "End Extreme Poverty, Globally 🙌",
    scale: 'company',
    category: 'socialGood',
    cost: 1500, // $1.5 Trillion
    description: "Fund the multi-year global effort needed (via cash transfers, aid) to lift *everyone* above the $2.15/day extreme poverty line.",
    sourceHint: "(Source: UN SDG Goal 1 / World Bank annual cost estimates over several years)",
    icon: HandHeart,
  },
  {
    id: 'c_green_energy_revolution',
    name: "Launch Global Green Energy Revolution ☀️💨",
    scale: 'company',
    category: 'socialGood',
    cost: 1000, // $1 Trillion
    description: "Massively accelerate the climate transition. Fund 1,000+ giant solar & wind farms globally.",
    sourceHint: "(Source: Large-scale renewable project cost data, e.g., ~$1B/GW scale project)",
    icon: SunMedium,
  },
  {
    id: 'c_defeat_diseases',
    name: "Defeat Diseases: Eradicate Polio & Fight Malaria 🦟",
    scale: 'company',
    category: 'socialGood',
    cost: 750, // $750 Billion
    description: "Commit the funds over years to fully fund the global programs aiming to eradicate Polio and make Malaria history.",
    sourceHint: "(Source: WHO / Global Fund eradication/control program estimates)",
    icon: Atom, // Using Atom for scientific breakthrough/eradication
  },
   {
    id: 'c_global_university_network',
    name: 'Build a Global "Ivy League" Network 🏛️',
    scale: 'company',
    category: 'socialGood',
    cost: 1000, // $1 Trillion
    description: "Build and fully endow 25 world-class universities focused on science and innovation across developing nations.",
    sourceHint: "(Source: Costs of establishing & endowing major research universities)",
    icon: School,
  },
  {
    id: 'c_modernize_africa_infra',
    name: "Modernize Infrastructure Across Africa 🌍",
    scale: 'company',
    category: 'socialGood',
    cost: 2000, // $2 Trillion
    description: "Fund a decade-long coordinated plan for modern transport, energy, and digital infrastructure across large parts of Africa.",
    sourceHint: "(Source: African Development Bank / Infrastructure gap reports)",
    icon: Network, // Using Network for broad infrastructure
  },
   {
    id: 'c_global_reforestation',
    name: "Global Reforestation & Ecosystem Rescue 🌳",
    scale: 'company',
    category: 'socialGood',
    cost: 800, // $800 Billion
    description: "Fund the restoration of degraded ecosystems (forests, wetlands, mangroves) on a planetary significant scale (hundreds of millions of hectares).",
    sourceHint: "(Source: Global restoration initiative cost estimates)",
    icon: Seedling,
  },
  {
    id: 'c_universal_internet_access',
    name: "Connect Everyone: Universal Internet 🌐",
    scale: 'company',
    category: 'socialGood',
    cost: 1200, // $1.2 Trillion
    description: "Fund the infrastructure cost (cabling, satellites) to connect the remaining ~2.5 billion people to the internet affordably.",
    sourceHint: "(Source: ITU/Broadband Commission reports - estimates vary)",
    icon: Globe,
  },
  {
     id: 'c_basic_income_pilot_national',
     name: "National Basic Income Trial (x3 Nations) 💰",
     scale: 'company',
     category: 'socialGood',
     cost: 1500, // $1.5 Trillion
     description: "Fund 5-year Universal Basic Income (UBI) pilot programs covering the entire adult population of three medium-sized developing nations.",
     sourceHint: "(Source: Extrapolated from UBI pilot program cost analyses)",
     icon: Gift, // Using Gift for distribution/basic income
  },

  // --- Luxury / Absurd ---
  {
    id: 'c_build_private_cities',
    name: "Build & Rule Your Own Private Cities 🏙️",
    scale: 'company',
    category: 'luxuryAbsurd',
    cost: 1000, // $1 Trillion+
    description: "Design, construct, and operate 5+ brand-new, high-tech 'charter cities' under your rules.",
    sourceHint: "(Source: Estimates for large-scale 'smart city' development projects)",
    icon: Landmark,
  },
  {
    id: 'c_mars_colony_mission',
    name: "Launch Your Private Mars Colony Mission 👽",
    scale: 'company',
    category: 'luxuryAbsurd',
    cost: 2000, // $2 Trillion+
    description: "Bankroll a dedicated, private multi-decade mission to establish a self-sustaining colony on Mars.",
    sourceHint: "(Source: Speculative long-term Mars colonization cost estimates)",
    icon: Rocket,
  },
   {
    id: 'c_global_cash_drop',
    name: "Global Cash Drop: $100 for Everyone 💸",
    scale: 'company',
    category: 'luxuryAbsurd',
    cost: 800, // $800 Billion
    description: "Rain money on the world! Distribute $100 to every person on Earth (~8 billion people).",
    sourceHint: "(Calculation: $100 x ~8 billion people)",
    icon: Coins, // Using Coins for cash drop
  },
  {
    id: 'c_moon_base_permanent',
    name: "Establish Permanent Human Moon Base 🌕",
    scale: 'company',
    category: 'luxuryAbsurd',
    cost: 1000, // $1 Trillion+
    description: "Fund a major program to build a sustainable human outpost on the Moon within 15-20 years.",
    sourceHint: "(Source: Scaled-up NASA Artemis program goals / space expert projections)",
    icon: Moon,
  },
  {
    id: 'c_control_cobalt_market',
    name: "Corner the Market: Control Global Cobalt Supply 💎",
    scale: 'company',
    category: 'luxuryAbsurd',
    cost: 500, // $500 Billion+
    description: "Attempt to acquire controlling stakes in the global supply chain of Cobalt (vital for batteries). Dictate terms to entire industries.",
    sourceHint: "(Source: Speculative estimate based on market cap of major mining concerns)",
    icon: Factory, // Using Factory for industrial control
  },
  {
    id: 'c_buy_every_private_jet',
    name: "Buy Every Private Jet Worldwide ✈️",
    scale: 'company',
    category: 'luxuryAbsurd',
    cost: 250, // $250 Billion
    description: "Acquire the entire global fleet of private jets (~20,000+). Ultimate travel convenience, zero airport lines.",
    sourceHint: "(Source: Aviation industry reports / fleet size * avg cost)",
    icon: Plane,
  },
  {
    id: 'c_pay_off_argentina_debt',
    name: "Pay Off Argentina's National Debt 🇦🇷",
    scale: 'company',
    category: 'luxuryAbsurd', // Controversial placement, but it's a financial act not direct social good program
    cost: 400, // ~$400 Billion
    description: "Eliminate the entire national debt of Argentina outright with a single cheque.",
    sourceHint: "(Source: World Bank / IMF debt figures - approx)",
    icon: HelpCircle, // Placeholder - maybe find a better icon?
  },
  {
    id: 'c_artificial_weather_control_rd',
    name: "Fund Artificial Weather Control R&D 🌦️",
    scale: 'company',
    category: 'luxuryAbsurd',
    cost: 1000, // $1 Trillion (Speculative R&D)
    description: "Massively fund R&D into (currently fictional) large-scale weather modification tech. Guaranteed sunshine? Maybe!",
    sourceHint: "(Source: Completely Speculative R&D estimate)",
    icon: CloudRain,
  }
];
