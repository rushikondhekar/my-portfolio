import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Database, 
  LineChart, 
  Search, 
  Award, 
  Briefcase, 
  Mail, 
  Linkedin, 
  Github, 
  ExternalLink, 
  ChevronRight, 
  Menu, 
  X,
  FileText,
  PieChart,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Brain,
  Users,
  TrendingUp,
  Phone,
  Trophy,
  Target,
  Zap
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { cn } from './lib/utils';

// --- Types ---
interface Project {
  title: string;
  domain: string;
  tools: string[];
  dataset: string;
  highlights: string[];
  impact: string;
  image: string;
  link?: string;
}

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  badge: string;
  link?: string;
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    title: "Credit Risk & Loan Default Prediction",
    domain: "Banking Domain",
    tools: ["Python", "SQL", "Power BI"],
    dataset: "1,00,000+ loan records",
    highlights: [
      "Engineered end-to-end data pipeline processing 1,00,000+ banking records; resolved 12% missing values and 3,200+ duplicate entries, reducing dataset noise by 94% prior to modelling.",
      "Conducted EDA to identify 8 key default-driver features (debt-to-income ratio, credit utilization, employment tenure); built logistic regression model achieving 87.4% accuracy, cutting undetected defaults from 18% to 6.2%.",
      "Designed 5-page interactive Power BI dashboard tracking loan portfolio health, risk tier distribution, and NPA trends; SQL segmentation identified high-risk segment (22% of portfolio) responsible for 68% of projected NPAs."
    ],
    impact: "Risk flagging model projected reduction of default losses by ~INR 4.2 Cr annually on a simulated INR 500 Cr loan book; dashboard cut manual reporting effort by ~6 hours/week.",
    image: "https://cdn.pixabay.com/photo/2019/02/22/12/04/investing-4013413_1280.jpg",
    link: "https://zoomcharts.com/en/microsoft-power-bi-custom-visuals/dashboard-and-report-examples/view/power-bi-banking-dashboard-by-okeh-dono-efasa"
  },
  {
    title: "Patient Readmission & Hospital Operational Efficiency",
    domain: "Healthcare Domain",
    tools: ["Python", "SQL", "Power BI", "MS Excel"],
    dataset: "80,000+ patient records",
    highlights: [
      "Analysed 80,000+ patient records across 14 hospital departments; cohort analysis revealed patients aged 55–70 with chronic conditions had 2.3× higher 30-day readmission rates vs average.",
      "Identified top 3 readmission drivers — diabetes management gaps (31%), post-surgical complications (24%), medication non-adherence (19%); built SQL queries joining 6 relational tables for department-level KPIs.",
      "Developed real-time Power BI KPI dashboard tracking OPD/IPD patient flow, bed utilization (target: 85%), and ER wait time; reduced report generation time by 70% and improved data visibility for clinical teams."
    ],
    impact: "Data-driven discharge protocol reduced projected average LOS by 0.8 days (INR 1.1 Cr annual saving); readmission prediction model reduced 30-day readmission rate from 14.7% to 9.3%.",
    image: "https://cdn.pixabay.com/photo/2024/12/31/06/47/ambulance-9301630_1280.jpg",
    link: "https://zoomcharts.com/en/microsoft-power-bi-custom-visuals/dashboard-and-report-examples/view/health-care-analysis"
  }
];

const EXPERIENCES: Experience[] = [
  {
    role: "Team Leader – Operations & Logistics",
    company: "AP Logistics | Pune, Maharashtra",
    period: "April 2023 – Present",
    description: [
      "Led and managed a cross-functional team of 20+ associates, consistently achieving 98.5% of daily throughput targets.",
      "Implemented real-time performance tracking using MS Excel dashboards monitoring 12 KPIs, improving overall team productivity by 23%.",
      "Reduced order processing from 4.2 hours to 2.9 hours through process re-engineering and dynamic shift allocation."
    ]
  },
  {
    role: "Quality Inspector – NDT & Process Quality",
    company: "SG Engineers Pvt. Ltd. | Pune, Maharashtra",
    period: "February 2022 – March 2023",
    description: [
      "Implemented Six Sigma framework across 3 critical manufacturing processes, improving process Cpk from 0.82 to 1.48.",
      "Performed and supervised 4 NDT methods (UT, PT, MT, VI) on 200+ components monthly.",
      "Used Fishbone diagrams and Pareto Analysis to eliminate root causes of 12 recurring defect types, reducing customer rejections by 78%."
    ]
  },
  {
    role: "Graduate Engineer Trainee – Production",
    company: "Kranti Industries | Pune, Maharashtra",
    period: "November 2020 – January 2022",
    description: [
      "Consistently achieved 147% of assigned production targets for 6 consecutive months under zero-tolerance quality policy.",
      "Maintained OEE above 88% on CNC machines by applying SMED to reduce changeover time by 35%.",
      "Contributed 4 Kaizen improvement ideas reducing raw material wastage by 9%, saving ~INR 1.1 Lakh/month."
    ]
  }
];

const CERTIFICATIONS: Certification[] = [
  {
    name: "AWS Certified Cloud Practitioner (CLF-C02)",
    issuer: "Amazon Web Services",
    date: "2023",
    badge: "https://cdn-icons-png.flaticon.com/128/14777/14777106.png",
    link: "https://drive.google.com/file/d/1ZFXw8dtqsjEaQAgn0jbeExch-4Cc04dh/view?usp=sharing"
  },
  {
    name: "Microsoft Power BI Data Analyst Associate (PL-300)",
    issuer: "Microsoft",
    date: "2022",
    badge: "https://cdn-icons-png.flaticon.com/128/732/732221.png",
    link: "https://drive.google.com/file/d/1OLubvT0217Ogee8UhS-bLV94b6If1PhU/view?usp=sharing"
  },
  {
    name: "NDT Level II – UT, PT, MT, VI",
    issuer: "ASNT / PCN Certifying Authority",
    date: "2022",
    badge: "https://cdn.vectorstock.com/i/500p/90/54/ndt-letter-logo-design-on-black-background-vector-41859054.avif",
    link: "https://drive.google.com/file/d/1xvxFfX7NuVLYDKOqXMo0_znTDBsl4Aps/view?usp=sharing"
  }
];

const ACHIEVEMENTS = [
  {
    title: "Runner-Up, IIT Bombay Agriculture Expo 2020",
    desc: "Jowar harvesting automation project selected among top 8 from 120+ entries across India.",
    icon: <Trophy className="text-primary" size={24} />,
    color: "bg-primary/10"
  },
  {
    title: "147% Production Target Achievement",
    desc: "Ranked #2 trainee among 12 peers at Kranti Industries for 6 consecutive months with zero quality rejections.",
    icon: <Target className="text-accent" size={24} />,
    color: "bg-accent/10"
  },
  {
    title: "Six Sigma Champion",
    desc: "Reduced defect rate from 4.8% to 0.6% at SG Engineers in 9 months, saving INR 2.8 Lakh/quarter in rework costs.",
    icon: <Zap className="text-secondary" size={24} />,
    color: "bg-secondary/10"
  }
];

const CHART_DATA = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Experience', href: '#experience' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-black/80 backdrop-blur-md shadow-[0_4px_30px_rgba(212,175,55,0.1)] border-b border-primary/10" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.5)] group-hover:scale-110 transition-transform">R</div>
          <span className="text-white font-display font-bold text-xl tracking-tight group-hover:text-primary transition-colors">Rushikesh Kondehkar</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-white/70 hover:text-primary font-medium transition-all hover:tracking-widest"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-navy"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl p-6 md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-text/80 hover:text-primary font-medium text-lg"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-black perspective-1000">
      {/* Background Decoration */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#D4AF37 0.5px, transparent 0.5px)', backgroundSize: '50px 50px' }} />
        
        {/* Dashboard Backgrounds */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.03]">
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1920" 
            alt="Dashboard Background" 
            className="absolute top-0 left-0 w-full h-full object-cover gold-filter scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50, rotateY: -20 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.8 }}
          className="preserve-3d"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-sm mb-8 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
            <ShieldCheck size={16} />
            <span className="tracking-widest uppercase text-xs">Certified Data Analyst</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-bold text-white leading-[0.9] mb-8">
            Hello, I’m a <br />
            <span className="gold-text-gradient">Data Analyst</span>
          </h1>
          <p className="text-xl text-white/60 mb-10 max-w-lg leading-relaxed font-light">
            Transforming complex datasets into actionable business intelligence. Specialized in financial analytics, Power BI, and SQL optimization.
          </p>
          <div className="flex flex-wrap gap-6">
            <a href="#projects" className="gold-gradient text-black px-10 py-5 rounded-2xl font-black hover:scale-105 transition-all shadow-[0_10px_30px_rgba(212,175,55,0.3)] flex items-center gap-2 uppercase tracking-tighter">
              View Projects <ChevronRight size={20} />
            </a>
            <a 
              href="https://drive.google.com/file/d/1zZShAjN4vKfIAa9qlnSBI88aaRkqtm9F/view?usp=drive_link" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/5 text-white border border-white/10 px-10 py-5 rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center gap-2 backdrop-blur-sm"
            >
              <FileText size={20} /> Resume
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative preserve-3d"
        >
          <div className="bg-navy p-12 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/5 card-3d">
            <h3 className="font-display font-bold text-primary text-3xl mb-10 text-center tracking-tight">Core Competencies</h3>
            <div className="grid grid-cols-1 gap-10">
              <div className="flex items-center gap-8 group">
                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500">
                  <Brain size={40} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-xl mb-1">Critical Thinking</h4>
                  <p className="text-white/40 text-sm font-light">Strategic problem solving and logical reasoning</p>
                </div>
              </div>
              <div className="flex items-center gap-8 group">
                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500">
                  <Search size={40} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-xl mb-1">Root Cause Analysis</h4>
                  <p className="text-white/40 text-sm font-light">In-depth investigation and data-driven solutions</p>
                </div>
              </div>
              <div className="flex items-center gap-8 group">
                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500">
                  <Users size={40} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-xl mb-1">Team Leadership</h4>
                  <p className="text-white/40 text-sm font-light">Collaborative management and strategic guidance</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skills = [
    { icon: <Database className="text-primary" />, title: "Data Cleansing", desc: "Expert in ETL processes, handling messy datasets and ensuring high data integrity." },
    { icon: <BarChart3 className="text-primary" />, title: "Data Visualization", desc: "Creating intuitive dashboards in Power BI and Tableau that tell a clear story." },
    { icon: <Search className="text-primary" />, title: "Data Exploration", desc: "Uncovering hidden patterns and correlations using advanced statistical methods." },
    { icon: <Cpu className="text-primary" />, title: "Tools & Tech", desc: "Proficient in SQL, Python (Pandas/NumPy), Excel VBA, and AWS Cloud." }
  ];

  return (
    <section id="skills" className="py-24 bg-navy perspective-1000">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-primary mb-4">Core Competencies</h2>
          <div className="w-20 h-1.5 gold-gradient mx-auto rounded-full" />
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {skills.map((skill, idx) => {
            const animations = [
              { initial: { opacity: 0, x: -50 }, whileInView: { opacity: 1, x: 0 } },
              { initial: { opacity: 0, x: 50 }, whileInView: { opacity: 1, x: 0 } },
              { initial: { opacity: 0, y: -50 }, whileInView: { opacity: 1, y: 0 } },
              { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 } },
            ];
            const animation = animations[idx % animations.length];

            return (
              <motion.div
                key={skill.title}
                initial={animation.initial}
                whileInView={animation.whileInView}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: idx * 0.2,
                  ease: [0.21, 0.47, 0.32, 0.98] 
                }}
                className="p-8 rounded-3xl bg-black border border-white/5 hover:border-primary/30 transition-all group card-3d"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-black transition-all">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3">{skill.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed font-light">{skill.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 hover:opacity-100 transition-all duration-500"
        >
          {[
            "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/power-bi-icon.png",
            "https://uxwing.com/wp-content/themes/uxwing/download/file-and-folder-type/file-sql-color-red-icon.png",
            "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/python-programming-language-icon.png",
            "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/microsoft-excel-icon.png"
          ].map((url, i) => (
            <motion.img 
              key={i}
              src={url} 
              alt="Tool Icon" 
              className="h-12 md:h-16 w-auto object-contain gold-filter"
              referrerPolicy="no-referrer"
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 0.5
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-black overflow-hidden perspective-1000 relative">
      {/* Background Dashboard */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=1920" 
          alt="Dashboard Background" 
          className="absolute bottom-0 right-0 w-full h-full object-cover gold-filter"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50, rotateY: -10 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true }}
          className="relative preserve-3d"
        >
          {/* Decorative background elements */}
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-[100px] z-0" />
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary/5 rounded-full blur-[80px] z-0" />
          
          <div className="relative z-10 aspect-[2/3] rounded-[3rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)] bg-navy p-3 border border-white/10 card-3d">
            <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
              <img 
                src="https://images.pexels.com/photos/7947844/pexels-photo-7947844.jpeg?_gl=1*2jai4q*_ga*NTE4NDE0NTAuMTc3MDQ3MDEyMA..*_ga_8JE65Q40S6*czE3NzQ4OTU5NjEkbzIkZzEkdDE3NzQ4OTYwNDgkajMzJGwwJGgw" 
                alt="Vertical Power BI Dashboard" 
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-display font-bold text-primary mb-8 tracking-tight">About Me</h2>
          <p className="text-xl text-white/70 mb-8 leading-relaxed font-light">
            I am a results-driven Data Analyst with a passion for turning raw data into strategic assets. With a background in finance and a deep understanding of statistical modeling, I bridge the gap between technical complexity and business value.
          </p>
          <p className="text-xl text-white/70 mb-10 leading-relaxed font-light">
            My approach is rooted in the Six Sigma philosophy: continuous improvement through rigorous measurement and analysis. Whether it's optimizing a supply chain or predicting market trends, I focus on delivering measurable impact.
          </p>
          
          <div className="space-y-6">
            {[
              "AWS Certified Cloud Practitioner (CLF-C02)",
              "Microsoft Power BI Data Analyst Associate (PL-300)"
            ].map((item) => (
              <div key={item} className="flex items-center gap-4 group">
                <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-all">
                  <CheckCircle2 className="text-primary group-hover:text-black" size={18} />
                </div>
                <span className="font-medium text-white/90 text-lg group-hover:text-primary transition-colors">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-navy perspective-1000 relative overflow-hidden">
      {/* Background Dashboard */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1920" 
          alt="Dashboard Background" 
          className="absolute top-0 left-0 w-full h-full object-cover gold-filter"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-4">
          <div>
            <h2 className="text-5xl font-display font-bold text-primary mb-4 tracking-tight">Featured Projects</h2>
            <p className="text-white/50 max-w-md font-light">A selection of my recent work in data analysis and business intelligence.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-black rounded-[3.5rem] overflow-hidden border border-white/5 hover:border-primary/20 transition-all group flex flex-col card-3d shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <div className="h-72 overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-8 right-8 gold-gradient px-6 py-2 rounded-full text-[10px] font-black text-black shadow-xl uppercase tracking-widest">
                  {project.domain}
                </div>
              </div>
              <div className="p-12 flex-grow flex flex-col">
                <div className="mb-8">
                  <h3 className="text-3xl font-display font-bold text-white mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-primary/40 text-[10px] font-black uppercase tracking-[0.2em]">Dataset: {project.dataset}</p>
                </div>
                
                <div className="space-y-5 mb-10 flex-grow">
                  {project.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex gap-4">
                      <div className="w-2 h-2 rounded-full gold-gradient mt-2 flex-shrink-0 shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                      <p className="text-white/60 text-sm leading-relaxed font-light">{highlight}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-white/5 p-8 rounded-3xl mb-10 border border-white/5">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp size={20} className="text-primary" />
                    <span className="text-xs font-black text-primary uppercase tracking-widest">Business Impact</span>
                  </div>
                  <p className="text-white/80 font-medium text-base leading-relaxed">{project.impact}</p>
                </div>

                <div className="flex flex-wrap gap-3 mb-10">
                  {project.tools.map(tool => (
                    <span key={tool} className="px-4 py-2 bg-navy border border-white/10 text-white/80 text-[10px] font-bold uppercase tracking-widest rounded-lg group-hover:border-primary/30 transition-colors">
                      {tool}
                    </span>
                  ))}
                </div>
                
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-5 rounded-2xl gold-gradient text-black font-black hover:scale-[1.02] transition-all flex items-center justify-center gap-3 shadow-[0_10px_20px_rgba(212,175,55,0.2)] uppercase tracking-tighter"
                >
                  View Dashboard <ExternalLink size={20} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Certifications = () => {
  return (
    <section id="certifications" className="py-24 bg-black text-white overflow-hidden relative perspective-1000">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 skew-x-12 transform origin-top-right" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4 gold-text-gradient">Professional Certifications</h2>
          <p className="text-white/60">Validated expertise in industry-standard tools and methodologies.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="card-3d"
            >
              <a 
                href={cert.link || "#"} 
                target={cert.link ? "_blank" : undefined}
                rel={cert.link ? "noopener noreferrer" : undefined}
                className={cn(
                  "bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl flex items-center gap-6 transition-all block group h-full",
                  cert.link ? "hover:bg-white/10 cursor-pointer" : "cursor-default"
                )}
              >
                <div className="w-20 h-20 bg-white rounded-2xl p-2 flex-shrink-0 group-hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                  <img 
                    src={cert.badge} 
                    alt={cert.issuer} 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display font-bold text-lg group-hover:text-primary transition-colors">{cert.name}</h3>
                    {cert.link && <ExternalLink size={14} className="text-white/40 group-hover:text-primary transition-colors" />}
                  </div>
                  <p className="text-white/60 text-sm mb-2">{cert.issuer}</p>
                  <span className="text-primary text-xs font-bold px-2 py-0.5 bg-primary/10 rounded-full border border-primary/20">{cert.date}</span>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-black text-white perspective-1000">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold gold-text-gradient mb-4">Work Experience</h2>
          <div className="w-20 h-1.5 gold-gradient mx-auto rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={exp.role + exp.company}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-12 pb-12 last:pb-0 group"
            >
              {/* Timeline Line */}
              <div className="absolute left-[19px] top-2 bottom-0 w-0.5 bg-primary/20 group-last:hidden" />
              {/* Timeline Dot */}
              <div className="absolute left-0 top-2 w-10 h-10 rounded-full bg-black border-4 border-primary flex items-center justify-center z-10 shadow-lg shadow-primary/20">
                <Briefcase size={16} className="text-primary" />
              </div>

              <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-primary/30 transition-all card-3d">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-primary transition-colors">{exp.role}</h3>
                    <p className="text-primary font-bold">{exp.company}</p>
                  </div>
                  <span className="px-4 py-1 gold-gradient text-black rounded-full text-sm font-bold shadow-lg shadow-primary/20">
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-3">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/70 text-sm leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Achievements = () => {
  return (
    <section id="achievements" className="py-24 bg-black text-white perspective-1000">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold gold-text-gradient mb-4">Key Achievements</h2>
          <p className="text-white/60">Milestones that define my professional journey and commitment to excellence.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {ACHIEVEMENTS.map((achievement, idx) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl border border-white/10 bg-white/5 hover:border-primary/30 transition-all group card-3d"
            >
              <div className={`w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-primary/10`}>
                {React.cloneElement(achievement.icon as React.ReactElement, { className: "text-primary" })}
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-primary transition-colors">{achievement.title}</h3>
              <p className="text-white/70 leading-relaxed">{achievement.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-black text-white perspective-1000">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-16 flex justify-center"
          >
            <div className="relative group">
              {/* Main Glow */}
              <div className="absolute -inset-8 rounded-full bg-primary/20 blur-3xl group-hover:bg-primary/40 transition-all duration-1000 animate-pulse" />
              
              {/* Circular Border with Glow */}
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full border border-primary/30 p-1.5 shadow-[0_0_40px_rgba(212,175,55,0.15)] overflow-hidden bg-navy/30 backdrop-blur-md">
                <div className="w-full h-full rounded-full overflow-hidden border border-white/10 relative">
                  <img 
                    src="https://lh3.googleusercontent.com/d/1Hhp6bXVh6mns1U56KiDILWdH2IAP0gcy" 
                    alt="Rushikesh Kondehkar" 
                    className="w-full h-full object-cover object-[50%_15%] grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 scale-125 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle professional overlays */}
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-1000" />
                  <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] pointer-events-none" />
                </div>
              </div>

              {/* Floating accent dots */}
              <div className="absolute top-0 right-0 w-3 h-3 bg-primary rounded-full blur-sm animate-ping" />
              <div className="absolute bottom-6 left-0 w-2 h-2 bg-secondary rounded-full blur-sm animate-pulse" />
            </div>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-display font-bold gold-text-gradient mb-8 tracking-tight">Let’s Work Together</h2>
          <p className="text-xl text-white/60 mb-20 leading-relaxed max-w-2xl mx-auto font-light">
            Interested in collaborating or have a data-related challenge? I'm always open to discussing new projects and opportunities.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <a 
              href="mailto:rushikondhekar@gmail.com"
              className="flex items-center gap-4 group hover:bg-primary/10 p-6 rounded-3xl border border-white/10 transition-all shadow-lg hover:shadow-primary/10 card-3d"
            >
              <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                <Mail size={28} />
              </div>
              <div className="text-left">
                <p className="text-xs text-white/50 font-bold uppercase tracking-wider mb-1">Email Me</p>
                <p className="text-white font-bold text-sm break-all group-hover:text-primary transition-colors">rushikondhekar@gmail.com</p>
              </div>
            </a>
            <a 
              href="tel:+918482860104"
              className="flex items-center gap-4 group hover:bg-primary/10 p-6 rounded-3xl border border-white/10 transition-all shadow-lg hover:shadow-primary/10 card-3d"
            >
              <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                <Phone size={28} />
              </div>
              <div className="text-left">
                <p className="text-xs text-white/50 font-bold uppercase tracking-wider mb-1">Call Me</p>
                <p className="text-white font-bold text-lg group-hover:text-primary transition-colors">+91 8482860104</p>
              </div>
            </a>
            <a 
              href="https://www.linkedin.com/in/rushikesh-kondhekar-91b7a73b4" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 group hover:bg-primary/10 p-6 rounded-3xl border border-white/10 transition-all shadow-lg hover:shadow-primary/10 card-3d"
            >
              <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                <Linkedin size={28} />
              </div>
              <div className="text-left">
                <p className="text-xs text-white/50 font-bold uppercase tracking-wider mb-1">LinkedIn</p>
                <p className="text-white font-bold text-sm group-hover:text-primary transition-colors">rushikesh-kondhekar</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black py-12 text-white/60 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 gold-gradient rounded-lg flex items-center justify-center text-black font-bold shadow-lg shadow-primary/20">R</div>
          <span className="text-white font-display font-bold text-xl tracking-tight">Rushikesh Kondehkar</span>
        </div>

        <div className="flex gap-8 text-sm font-medium">
          <a href="#home" className="hover:text-primary transition-colors">Home</a>
          <a href="#about" className="hover:text-primary transition-colors">About</a>
          <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
          <a href="#certifications" className="hover:text-primary transition-colors">Certifications</a>
          <a href="#experience" className="hover:text-primary transition-colors">Experience</a>
          <a href="#achievements" className="hover:text-primary transition-colors">Achievements</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
        </div>

        <div className="flex gap-4">
          <a 
            href="https://www.linkedin.com/in/rushikesh-kondhekar-91b7a73b4" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-all group"
          >
            <Linkedin size={18} className="text-white group-hover:text-black transition-colors" />
          </a>
          <a 
            href="https://github.com/rushikondhekar" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-all group"
          >
            <Github size={18} className="text-white group-hover:text-black transition-colors" />
          </a>
          <a 
            href="tel:+918482860104" 
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-all group"
          >
            <Phone size={18} className="text-white group-hover:text-black transition-colors" />
          </a>
          <a 
            href="mailto:rushikondhekar@gmail.com" 
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-all group"
          >
            <Mail size={18} className="text-white group-hover:text-black transition-colors" />
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/10 text-center text-xs">
        <p>© {new Date().getFullYear()} Rushikesh Kondehkar. All rights reserved. Built with precision and data.</p>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen bg-black selection:bg-primary/30 selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <About />
        <Projects />
        <Certifications />
        <Experience />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
