import { PlaygroundChoice } from '../types';
// Importing used icons
import {
  Globe, Zap, GraduationCap, Droplets, HeartPulse, Ship, Crown, Palmtree, Twitter, Landmark, HandHeart, SunMedium, School, Rocket, Building2, Coins, Trees, PiggyBank, Drama, Train, Diamond, Satellite, CloudCog, ShieldCheck, Briefcase, Cloud,/* Added icons */ Building, Network, Car, Atom, Factory, Plane, Moon, Bitcoin, HelpCircle, Gift, TreeDeciduous
} from 'lucide-react';

// --- Billionaire Scale Choices ---
export const billionaireChoices: PlaygroundChoice[] = [
  // --- Social Good ---
  {
    id: 'b_feed_world_1y',
    name: "Feed the World (for 1 Year) 🌍",
    scale: 'billionaire', category: 'socialGood', cost: 45,
    description: "Fund the estimated amount needed via UN programs to tackle severe global hunger for a full year. Millions fed, lives saved.",
    sourceHint: "(Source Hint: Based on UN WFP budgets & Ceres 2030 estimates)",
    icon: HandHeart, imageUrl: 'https://images.unsplash.com/photo-1472141521881-95d0e87e2e39?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    shareText: "Just dropped $45B of [NAME]'s $[FORTUNE]B fortune to feed the world for a year. Cheaper than buying *another* social network? 🤔 #WealthPlayground [Link]"
  },
  {
    id: 'b_power_up_100m',
    name: "Power Up 100 Million Lives 💡",
    scale: 'billionaire', category: 'socialGood', cost: 30,
    description: "Bring 24/7 reliable electricity (via grid/solar) to 100 million people currently in the dark or facing constant outages in regions across Africa and Asia.",
    sourceHint: "(Source Hint: Based on IEA/World Bank access cost estimates)",
    icon: Zap, imageUrl: 'https://images.unsplash.com/photo-1610028290816-5d937a395a49?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    shareText: "$30B from [NAME] to turn the lights on for 100M people. Less flashy than a rocket launch, but hey. 💡 #WealthPlayground [Link]"
  },
  {
    id: 'b_unlock_1m_futures',
    name: "Unlock 1 Million Futures 🎓",
    scale: 'billionaire', category: 'socialGood', cost: 15,
    description: "Fund full university scholarships (tuition + living costs) for 1 million bright students from low-income backgrounds in countries like India, Nigeria, Brazil.",
    sourceHint: "(Source Hint: Based on estimated avg. global university costs & aid models)",
    icon: GraduationCap, imageUrl: 'https://images.unsplash.com/photo-1584568518279-d781778d1481?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    shareText: "Spent $15B of [NAME]'s cash on 1M university scholarships. Investing in people, what a concept! 🎓 #WealthPlayground [Link]"
  },
   {
    id: 'b_clean_water_50m',
    name: "Deliver Clean Water & Dignity 💧",
    scale: 'billionaire', category: 'socialGood', cost: 12,
    description: "Provide safe, piped water and proper sanitation facilities for 50 million people in underserved communities.",
    sourceHint: "(Source Hint: Based on WHO/UNICEF WASH cost estimates)",
    icon: Droplets, imageUrl: 'https://images.unsplash.com/photo-1596787474386-791461ec4bba?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    shareText: "Only $12B of [NAME]'s ($[FORTUNE]B!) for clean water for 50M people. Seems like a bargain? 💧 #WealthPlayground [Link]"
  },
   {
    id: 'b_build_100_hospitals',
    name: "Build 100 Modern Hospitals 🏥",
    scale: 'billionaire', category: 'socialGood', cost: 20,
    description: "Construct and equip 100 state-of-the-art hospitals in regions desperately lacking quality healthcare access.",
    sourceHint: "(Source Hint: Based on generalized modern hospital construction cost estimates)",
    icon: Building, imageUrl: 'https://images.unsplash.com/photo-1512677859289-868722942457?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    shareText: "Built 100 hospitals ($20B) with [NAME]'s money. Access to critical care vs. personal high-speed rail? Easy choice. 🏥 #WealthPlayground [Link]"
  },
   {
    id: 'b_connect_nation_internet',
    name: "Connect a Nation Online 💻",
    scale: 'billionaire', category: 'socialGood', cost: 40,
    description: "Fund affordable high-speed internet infrastructure to cover every town and village in a large nation like Kenya or the Philippines.",
    sourceHint: "(Source Hint: Based on ITU/Broadband development cost reports)",
    icon: Network, imageUrl: 'https://images.unsplash.com/photo-1564760290292-23341e4df6ec?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    shareText: "$40B from [NAME] to bridge the digital divide for a whole country. Better than buying *another* social media site? 💻 #WealthPlayground [Link]"
  },
  {
    id: 'b_small_business_fund_5m',
    name: "Launch 5 Million Entrepreneurs 🚀",
    scale: 'billionaire', category: 'socialGood', cost: 10,
    description: "Create a massive fund providing low-interest micro-loans and seed capital to ~5 million aspiring small business owners in developing economies.",
    sourceHint: "(Source Hint: Based on microfinance reports/models)",
    icon: Briefcase, imageUrl: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    shareText: "Empowering 5M entrepreneurs ($10B) with [NAME]'s capital. Maybe they'll build something useful! 🚀 #WealthPlayground [Link]"
  },
  {
    id: 'b_clean_air_5_cities',
    name: "Clean the Air in 5 Megacities 🌬️",
    scale: 'billionaire', category: 'socialGood', cost: 25,
    description: "Fund large-scale initiatives (EV subsidies, industrial scrubbers, green spaces) to significantly reduce air pollution in 5 of the world's most polluted major cities.",
    sourceHint: "(Source Hint: Based on air quality program cost estimates)",
    icon: Cloud, imageUrl: 'https://images.unsplash.com/photo-1612271137038-dc4ae60a63b0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    shareText: "Spending $25B of [NAME]'s fortune so people in 5 megacities can breathe easier. Radical, I know. 🌬️ #WealthPlayground [Link]"
  },
   {
     id: 'b_vaccinate_kids_globally',
     name: "Vaccinate the World's Children (1 Year) 🛡️",
     scale: 'billionaire', category: 'socialGood', cost: 8,
     description: "Cover the cost for a year's worth of basic childhood immunizations in low-income countries via GAVI/WHO efforts.",
     sourceHint: "(Source: GAVI / WHO funding reports)",
     icon: ShieldCheck, imageUrl: 'https://images.unsplash.com/photo-1615868167768-6fe2e8eaacd8?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
     shareText: "Protected kids globally with vaccines ($8B) using [NAME]'s funds. Better than another yacht? Probably. 🛡️ #WealthPlayground [Link]",
   },

  // --- Luxury / Absurd ---
  {
    id: 'b_buy_ipl',
    name: "Own Global Cricket: Buy the IPL! 🏏",
    scale: 'billionaire', category: 'luxuryAbsurd', cost: 60,
    description: "Attempt gaining controlling interest in the entire Indian Premier League. Command the passion of billions!",
    sourceHint: "(Source Hint: Speculative based on soaring sports league valuations)",
    icon: Crown, imageUrl: 'https://images.unsplash.com/photo-1652513842544-ca66b676757a?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    shareText: "Casually added the entire IPL (est. $60B) to [NAME]'s shopping cart. Hope they like cricket! 🏏 #WealthPlayground [Link]"
  },
  {
    id: 'b_gigayacht_fleet',
    name: "Rule the Waves: Fleet of 10 Gigayachts 🛥️",
    scale: 'billionaire', category: 'luxuryAbsurd', cost: 7,
    description: "Why have one when you can have ten? Acquire a fleet of the world's most luxurious gigayachts.",
    sourceHint: "(Source Hint: Based on luxury yacht market reports)",
    icon: Ship, imageUrl: 'https://images.unsplash.com/photo-1562281302-809108fd533c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    shareText: "Splurged on 10 gigayachts for [NAME] ($7B)! That's... *checks notes* ...a tiny fraction of their $[FORTUNE]B fortune. Essentials only! 🛥️ #WealthPlayground [Link]"
  },
  {
    id: 'b_private_islands',
    name: "Your Own Kingdom: 100 Private Islands 🏝️",
    scale: 'billionaire', category: 'luxuryAbsurd', cost: 10,
    description: "Create a personal global archipelago. Purchase 100 exclusive private islands around the world.",
    sourceHint: "(Source Hint: Based on high-end luxury real estate estimates)",
    icon: TreeDeciduous, imageUrl: 'https://images.unsplash.com/photo-1599832976672-5923b10683d4?q=80&w=3133&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    shareText: "Picked up 100 private islands for [NAME] ($10B). Needed space to think, y'know? 🏝️ #WealthPlayground [Link]"
  },
   {
    id: 'b_buy_twitter_again',
    name: "Buy Twitter/X (Again?) 🤳",
    scale: 'billionaire', category: 'luxuryAbsurd', cost: 44,
    description: "Control the conversation. Acquire the global social media platform X.",
    sourceHint: "(Source Hint: Based on reported 2022 acquisition price)",
    icon: Twitter, imageUrl: 'https://images.unsplash.com/photo-1690883794145-e96486fbe66b?q=80&w=2932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    shareText: "Couldn't resist adding Twitter/X ($44B) to [NAME]'s cart. Maybe this time will be different? 🤷‍♀️ #WealthPlayground [Link]"
  },
  {
    id: 'b_own_wonder',
    name: '"Own" a World Wonder (Symbolically) 🏛️',
    scale: 'billionaire', category: 'luxuryAbsurd', cost: 50,
    description: "Make an unparalleled statement. Spend $50B+ trying to secure exclusive naming rights or permanent sponsorship of a globally revered landmark (Machu Picchu, Colosseum).",
    sourceHint: "(Concept Cost Only - illustrates scale)",
    icon: Landmark, imageUrl: 'https://images.unsplash.com/photo-1491566102020-21838225c3c8?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    shareText: "[NAME]'s name etched (maybe?) near history ($50B+) vs. history-making global health investment? 🤔 #WealthPlayground [Link]"
  },
  {
    id: 'b_personal_hsr',
    name: "Personal High-Speed Rail Line 🚄",
    scale: 'billionaire', category: 'luxuryAbsurd', cost: 75,
    description: "Build a dedicated high-speed rail line connecting your multiple international homes/palaces.",
    sourceHint: "(Source Hint: Based on HSR construction cost estimates)",
    icon: Train, imageUrl: 'https://images.unsplash.com/photo-1426086800127-2601510ca027?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    shareText: "Why fly commercial? Building a personal high-speed rail ($75B) with [NAME]'s money. 🚄 #WealthPlayground [Link]"
  },
  // --- Items starting from here need static URLs ---
  {
    id: 'b_global_festival_tour',
    name: "Extravagant Global Festival Tour 🎉",
    scale: 'billionaire', category: 'luxuryAbsurd', cost: 8,
    description: "Create and fund a year-long, globe-trotting personal festival featuring the world's biggest stars, moving between continents.",
    sourceHint: "(Source Hint: Speculative entertainment production costs)",
    icon: Drama, imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example URL
    shareText: "Year-long personal global festival ($8B) with [NAME]'s cash. Because why not? 🎉 #WealthPlayground [Link]"
  },
   {
     id: 'b_solid_gold_toilet',
     name: "Solid Gold Toilet (x 1000) 🚽",
     scale: 'billionaire', category: 'luxuryAbsurd', cost: 1,
     description: "Outfit all your mansions (and maybe your jet?) with solid gold toilets. Peak luxury achieved?",
     sourceHint: "(Source: Extreme Luxury Item Speculation)",
     icon: HelpCircle, imageUrl: 'https://images.unsplash.com/photo-1604351872870-66c634f61f6f?q=80&w=2806&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example URL (using 'gold')
     shareText: "Decked out [NAME]'s bathrooms with 1000 solid gold toilets ($1B). Basic necessities covered. 🚽 #WealthPlayground [Link]",
   },
  // --- Sponsored Content Example ---
  {
    id: 'b_sponsored_mars_trip',
    name: "Weekend Trip to Mars (Sponsored by MarsLyfe™) 🚀✨",
    scale: 'billionaire', category: 'sponsored', cost: 5, // Relatively cheap to make it attractive
    description: "Experience the Red Planet! A luxury weekend getaway, including gourmet space food and a selfie with Olympus Mons. This trip is brought to you by MarsLyfe™, pioneering interplanetary tourism.",
    sourceHint: "(Fictional Sponsored Content)",
    icon: Rocket, imageUrl: 'https://images.unsplash.com/photo-1630694093411-a6c9c735bc18?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    shareText: "Just booked a Mars weekend ($5B) via MarsLyfe™ with [NAME]'s money! Hope the Wi-Fi is good. #Sponsored #MarsLyfe #WealthPlayground [Link]"
  },
];

// --- Company Scale Choices ---
export const companyChoices: PlaygroundChoice[] = [
  // --- Social Good ---
  {
    id: 'c_end_extreme_poverty',
    name: "End Extreme Poverty, Globally 🙌",
    scale: 'company', category: 'socialGood', cost: 1500,
    description: "Fund the multi-year global effort needed (via cash transfers, aid) to lift *everyone* above the $2.15/day extreme poverty line.",
    sourceHint: "(Source Hint: Based on UN SDG Goal 1 / World Bank annual cost estimates over several years)",
    icon: HandHeart, imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example URL
    shareText: "Threw $1.5T of [NAME]'s money in the cart to end extreme poverty globally. Let's see if the shareholders notice. 😉 #WealthPlayground [Link]"
  },
  {
    id: 'c_green_energy_revolution',
    name: "Launch Global Green Energy Revolution ☀️💨",
    scale: 'company', category: 'socialGood', cost: 1000,
    description: "Massively accelerate the climate transition. Fund 1,000+ giant solar & wind farms globally.",
    sourceHint: "(Source Hint: Based on large-scale renewable project cost data, e.g., ~$1B/GW scale project)",
    icon: SunMedium, imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a796?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example URL
    shareText: "$1T from [NAME] for 1000+ massive green energy farms. Trying to save the planet, might delete later. ☀️ #WealthPlayground [Link]"
  },
  {
    id: 'c_defeat_diseases',
    name: "Defeat Diseases: Eradicate Polio & Fight Malaria 🦟",
    scale: 'company', category: 'socialGood', cost: 750,
    description: "Commit the funds over years to fully fund the global programs aiming to eradicate Polio and make Malaria history.",
    sourceHint: "(Source Hint: Based on WHO / Global Fund eradication/control program estimates)",
    icon: Atom, imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example URL
    shareText: "Ending ancient scourges ($750B) with [NAME]'s cash vs. developing another addictive app? 🤔 #WealthPlayground [Link]"
  },
   {
    id: 'c_global_university_network',
    name: 'Build a Global "Ivy League" Network 🏛️',
    scale: 'company', category: 'socialGood', cost: 1000,
    description: "Build and fully endow 25 world-class universities focused on science and innovation across developing nations.",
    sourceHint: "(Source Hint: Based on costs of establishing & endowing major research universities)",
    icon: School, imageUrl: 'https://images.unsplash.com/photo-1506467493604-95676869b474?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example URL
    shareText: "Investing $1T of [NAME]'s funds in global human potential via new universities. Better than acquiring every competitor? 🎓 #WealthPlayground [Link]"
  },
   {
    id: 'c_modernize_africa_infra',
    name: "Modernize Infrastructure Across Africa 🌍",
    scale: 'company', category: 'socialGood', cost: 2000,
    description: "Fund a decade-long coordinated plan for modern transport, energy, and digital infrastructure across large parts of Africa.",
    sourceHint: "(Source Hint: Based on African Development Bank / Infrastructure gap reports)",
    icon: Network, imageUrl: 'https://images.unsplash.com/photo-1635067940726-9a03c4e1e99e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example URL
    shareText: "Building foundations for African prosperity ($2T) with [NAME]'s resources instead of more ad data centers? Seems fair. 🌍 #WealthPlayground [Link]"
  },
  {
    id: 'c_global_reforestation',
    name: "Global Reforestation & Ecosystem Restore 🌳",
    scale: 'company', category: 'socialGood', cost: 750,
    description: "Fund the restoration of degraded ecosystems (forests, wetlands, mangroves) on a planetary significant scale (hundreds of millions of hectares).",
    sourceHint: "(Source Hint: Based on large-scale ecological restoration cost estimates)",
    icon: Trees, imageUrl: 'https://images.unsplash.com/photo-1444011283387-7b0f76371f12?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example URL
    shareText: "Planting trillions of trees ($750B) with [NAME]'s money. Because maybe the planet is worth more than quarterly earnings? 🌳 #WealthPlayground [Link]"
  },
  {
    id: 'c_ubi_pilots',
    name: "National Scale UBI Pilots 💰",
    scale: 'company', category: 'socialGood', cost: 1500,
    description: "Fund 5-year Universal Basic Income (UBI) pilot programs covering the entire adult population of several medium-sized developing nations.",
    sourceHint: "(Source Hint: Based on UBI pilot program cost projections)",
    icon: Gift, imageUrl: 'https://images.unsplash.com/photo-1641894158791-2899b345c4b2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example URL
    shareText: "Testing UBI for whole countries ($1.5T) using [NAME]'s cash. What could possibly go wrong? 💰 #WealthPlayground [Link]"
  },

  // --- Luxury / Absurd ---
  {
    id: 'c_build_private_cities',
    name: "Build & Rule Your Own Private Cities 🏙️",
    scale: 'company', category: 'luxuryAbsurd', cost: 1000,
    description: "Design, construct, and operate 5+ brand-new, high-tech 'charter cities' under your rules.",
    sourceHint: "(Source Hint: Based on estimates for large-scale 'smart city' development projects)",
    icon: Building2, imageUrl: 'https://images.unsplash.com/photo-1551829149-a2a633042777?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example URL
    shareText: "Creating private utopias ($1T+) with [NAME]'s money instead of fixing existing cities... bold move! 🏙️ #WealthPlayground [Link]"
  },
  {
    id: 'c_moon_base',
    name: "Establish Permanent Human Moon Base 🌕",
    scale: 'company', category: 'luxuryAbsurd', cost: 1000,
    description: "Fund a major program to build a sustainable human outpost on the Moon within 15-20 years.",
    sourceHint: "(Source Hint: Based on scaled-up NASA Artemis program goals / space expert projections)",
    icon: Moon, imageUrl: 'https://images.unsplash.com/photo-1522030299830-16b8fed37cc4?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example URL
    shareText: "A city on the Moon ($1T+) funded by [NAME]? Tackling rising sea levels is *so* last century. 🌕 #WealthPlayground [Link]"
  },
  {
    id: 'c_mars_colony_mission',
    name: "Launch Your Private Mars Colony Mission 👽",
    scale: 'company', category: 'luxuryAbsurd', cost: 2000,
    description: "Bankroll a dedicated, private multi-decade mission to establish a self-sustaining colony on Mars.",
    sourceHint: "(Source Hint: Based on speculative long-term Mars colonization cost estimates)",
    icon: Rocket, imageUrl: 'https://images.unsplash.com/photo-1630694093411-a6c9c735bc18?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example URL
    shareText: "Escaping Earth's problems with [NAME]'s private Mars Colony ($2T+). Sensible! 🚀 #WealthPlayground [Link]"
  },
   {
    id: 'c_global_cash_drop',
    name: "Global Cash Drop: $100 for Everyone 💸",
    scale: 'company', category: 'luxuryAbsurd', cost: 800,
    description: "Rain money on the world! Distribute $100 to every person on Earth (~8 billion people).",
    sourceHint: "(Calculation: $100 x ~8 billion people)",
    icon: Coins, imageUrl: 'https://images.unsplash.com/photo-1606100664408-8e3b3a81e1fd?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example URL
    shareText: "Giving everyone on Earth $100 ($800B total) from [NAME]'s wallet. Don't spend it all in one place! 💸 #WealthPlayground [Link]"
  },
  {
    id: 'c_privatize_infrastructure',
    name: "Privatize Global Infrastructure? 🛰️",
    scale: 'company', category: 'luxuryAbsurd', cost: 1500,
    description: "Attempt to 'buy' or gain controlling stakes in major global shipping lanes, satellite networks, or undersea internet cables.",
    sourceHint: "(Concept Cost Only - Geopolitically Impossible)",
    icon: Satellite, imageUrl: 'https://images.unsplash.com/photo-1543312390-d70a797b4c1a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example URL
    shareText: "Buying the internet's plumbing ($1.5T+) with [NAME]'s money. What could go wrong? 🛰️ #WealthPlayground [Link]"
  },
  {
    id: 'c_control_weather',
    name: "Personal Weather Control System 🌦️",
    scale: 'company', category: 'luxuryAbsurd', cost: 1000,
    description: "Fund massive R&D and deployment of (currently fictional) large-scale weather modification systems for personal benefit.",
    sourceHint: "(Completely Speculative R&D Cost)",
    icon: CloudCog, imageUrl: 'https://images.unsplash.com/photo-1580462611434-39c04c37012c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example URL
    shareText: "Guaranteed sunshine for [NAME]'s properties ($1T+ R&D). Because adapting to climate change is for the poors. 🌦️ #WealthPlayground [Link]"
  },
  {
    id: 'c_corner_cobalt',
    name: "Corner the Cobalt Market 💎",
    scale: 'company', category: 'luxuryAbsurd', cost: 500,
    description: "Attempt to acquire controlling stakes in the global supply chain of Cobalt (vital for batteries). Dictate terms to entire industries.",
    sourceHint: "(Source Hint: Speculative estimate based on mining concerns)",
    icon: Diamond, imageUrl: 'https://images.unsplash.com/photo-1643100526631-e8a00e1f4e87?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example URL
    shareText: "Controlling the world's Cobalt supply ($500B+) with [NAME]'s cash. Your phone battery answers to them now. 💎 #WealthPlayground [Link]"
  },
  {
    id: 'c_buy_all_bitcoin',
    name: "Attempt to Buy ALL Bitcoin ₿",
    scale: 'company', category: 'luxuryAbsurd', cost: 1300,
    description: "Try to acquire every single Bitcoin in existence. Good luck with that!",
    sourceHint: "(Source: Based on total Bitcoin market cap)",
    icon: Bitcoin, imageUrl: 'https://images.unsplash.com/photo-1621418239047-b1f04d74a7b7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example URL
    shareText: "Using [NAME]'s $[FORTUNE]T+ to try and buy ALL the Bitcoin ($1.3T+). What could be more stable? ₿ #WealthPlayground [Link]",
  },
];
