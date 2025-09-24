'use client'

import { useState, useEffect } from 'react';

export default function Portfolio() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define a specific type for the bubble's properties
  type Bubble = {
    left: string;
    size: string;
    animationDuration: string;
    animationDelay: string;
  };

  // Add this new state for the bubbles
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  // Load theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  // Save theme preference when changed
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsNavScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const bubblesArray = Array.from({ length: 15 }).map(() => ({
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 60 + 20}px`,
      animationDuration: `${Math.random() * 15 + 10}s`,
      animationDelay: `${Math.random() * 10}s`,
    }));
    setBubbles(bubblesArray);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // This is correct
  setIsSubmitting(true);

  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  setIsSubmitting(false);
  setFormData({ name: '', email: '', subject: '', message: '' });
  alert('Message sent successfully!');
  };

  const skills = [
    {
      category: '🎨 Frontend Development',
      items: ['React.js / Next.js', 'Vue.js / Nuxt.js', 'TypeScript / JavaScript', 'HTML5 / CSS3 / SASS', 'Tailwind CSS', 'Responsive Design']
    },
    {
      category: '⚙️ Backend Development',
      items: ['Node.js / Express.js', 'Python / Django / Flask', 'Java / Spring Boot', 'C# / .NET Core', 'RESTful APIs / GraphQL', 'Microservices Architecture']
    },
    {
      category: '🗄️ Database & Storage',
      items: ['PostgreSQL / MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Database Design', 'Query Optimization']
    },
    {
      category: '☁️ DevOps & Cloud',
      items: ['AWS / Azure / GCP', 'Docker / Kubernetes', 'CI/CD Pipelines', 'GitHub Actions', 'Terraform', 'Monitoring & Logging']
    }
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      icon: '🛒',
      description: 'Full-stack e-commerce solution with user authentication, payment processing, inventory management, and admin dashboard.',
      techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe API'],
      demoLink: '#',
      codeLink: '#'
    },
    {
      title: 'Analytics Dashboard',
      icon: '📊',
      description: 'Real-time data visualization dashboard with interactive charts, filters, and export functionality for business intelligence.',
      techStack: ['Vue.js', 'D3.js', 'Python', 'FastAPI'],
      demoLink: '#',
      codeLink: '#'
    },
    {
      title: 'Real-time Chat App',
      icon: '💬',
      description: 'Scalable chat application with real-time messaging, file sharing, user presence, and room management features.',
      techStack: ['Socket.io', 'Express', 'MongoDB', 'Redis'],
      demoLink: '#',
      codeLink: '#'
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100' 
        : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-gray-800'
    }`}>
      {/* Rising Bubbles Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {bubbles.map((bubble, i) => (
          <div
            key={i}
            className={`absolute bottom-0 rounded-full animate-rise ${
              isDarkMode ? 'bg-indigo-400/10' : 'bg-white/10'
            }`}
            style={{
              left: bubble.left,
              width: bubble.size,
              height: bubble.size,
              animationDuration: bubble.animationDuration,
              animationDelay: bubble.animationDelay,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isNavScrolled 
          ? (isDarkMode ? 'bg-slate-900/95 shadow-xl' : 'bg-white/95 shadow-xl')
          : 'bg-transparent'
      } backdrop-blur-sm`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className={`text-xl font-bold ${
              isDarkMode ? 'text-indigo-400' : 'text-gray-800'
            }`}>
              GilmarLP.dev
            </div>
            
            <div className="flex items-center space-x-8">
              <div className="hidden md:flex space-x-6">
                {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`font-medium transition-colors duration-200 hover:text-indigo-500 ${
                      isDarkMode ? 'text-slate-100' : 'text-gray-800'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full border-2 transition-all duration-200 ${
                  isDarkMode 
                    ? 'border-slate-400 text-slate-100 hover:bg-indigo-500/20' 
                    : 'border-gray-600 text-gray-800 hover:bg-indigo-500/20'
                }`}
              >
                <span>{isDarkMode ? '☀️' : '🌙'}</span>
                <span className="text-sm">{isDarkMode ? 'Light' : 'Dark'}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center text-center relative z-10">
        <div className="max-w-4xl mx-auto px-4 z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
            Your Name
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in-up animation-delay-200">
            Full Stack Developer & Problem Solver
          </p>
          <button
            onClick={() => scrollToSection('projects')}
            className="inline-block px-8 py-4 bg-white/20 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-indigo-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl animate-fade-in-up animation-delay-400"
          >
            View My Work
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 ${
        isDarkMode ? 'bg-slate-800' : 'bg-white'
      }`}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            About Me
            <div className="w-16 h-1 bg-indigo-500 mx-auto mt-4"></div>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-6xl">
                👨‍💻
              </div>
            </div>
            
            <div className="space-y-6 text-lg">
              <p>
                Teste de texto 1
              </p>
              <p>
                Teste de texto 2
              </p>
              <p>
                Teste de texto 3
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 ${
        isDarkMode ? 'bg-slate-900' : 'bg-gray-50'
      }`}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Technical Skills
            <div className="w-16 h-1 bg-indigo-500 mx-auto mt-4"></div>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skillGroup, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 ${
                  isDarkMode 
                    ? 'bg-slate-800 border border-slate-700' 
                    : 'bg-white'
                }`}
              >
                <h3 className="text-lg font-semibold text-indigo-500 mb-4">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <li
                      key={skillIndex}
                      className={`py-2 border-b last:border-b-0 ${
                        isDarkMode ? 'border-slate-700' : 'border-gray-200'
                      }`}
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 ${
        isDarkMode ? 'bg-slate-800' : 'bg-white'
      }`}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Featured Projects
            <div className="w-16 h-1 bg-indigo-500 mx-auto mt-4"></div>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl ${
                  isDarkMode 
                    ? 'bg-slate-900 border border-slate-700' 
                    : 'bg-white'
                }`}
              >
                <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl">
                  {project.icon}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">
                    {project.title}
                  </h3>
                  <p className={`mb-4 ${
                    isDarkMode ? 'text-slate-300' : 'text-gray-600'
                  }`}>
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`px-3 py-1 text-sm rounded-full ${
                          isDarkMode 
                            ? 'bg-slate-700 text-slate-300' 
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3">
                    <a
                      href={project.demoLink}
                      className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200"
                    >
                      Live Demo
                    </a>
                    <a
                      href={project.codeLink}
                      className="px-4 py-2 border-2 border-indigo-500 text-indigo-500 rounded-lg hover:bg-indigo-500 hover:text-white transition-all duration-200"
                    >
                      View Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {/* <section id="contact" className={`py-20 ${
        isDarkMode ? 'bg-slate-900' : 'bg-gray-50'
      }`}>
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Get In Touch
            <div className="w-16 h-1 bg-indigo-500 mx-auto mt-4"></div>
          </h2>
          
          <div className="text-center mb-8">
            <p className="text-lg">
              I'm always interested in new opportunities and exciting projects. 
              Let's discuss how we can work together to bring your ideas to life!
            </p>
          </div>
          
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 ${
                    isDarkMode 
                      ? 'bg-slate-800 border-slate-600 text-white focus:border-indigo-500' 
                      : 'bg-white border-gray-300 focus:border-indigo-500'
                  } focus:outline-none`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 ${
                    isDarkMode 
                      ? 'bg-slate-800 border-slate-600 text-white focus:border-indigo-500' 
                      : 'bg-white border-gray-300 focus:border-indigo-500'
                  } focus:outline-none`}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleFormChange}
                required
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-slate-800 border-slate-600 text-white focus:border-indigo-500' 
                    : 'bg-white border-gray-300 focus:border-indigo-500'
                } focus:outline-none`}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                required
                rows={6}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 resize-vertical ${
                  isDarkMode 
                    ? 'bg-slate-800 border-slate-600 text-white focus:border-indigo-500' 
                    : 'bg-white border-gray-300 focus:border-indigo-500'
                } focus:outline-none`}
              />
            </div>
            
            <div className="text-center">
              <button
                onClick={handleFormSubmit}
                disabled={isSubmitting}
                className="px-8 py-4 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-1"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </section> */}

      {/* Footer */}
      <footer className={`py-12 ${
        isDarkMode ? 'bg-slate-800 border-t border-slate-700' : 'bg-gray-800'
      }`}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-6">
            {['📧', '💼', '🐙', '🐦'].map((icon, index) => (
              <a
                key={index}
                href="#"
                className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xl hover:bg-indigo-600 transition-all duration-200 transform hover:-translate-y-1"
              >
                {icon}
              </a>
            ))}
          </div>
          <p className="text-white">
            &copy; 2025 Your Name. All rights reserved.
          </p>
        </div>
      </footer>

      <style jsx>{`
    @keyframes rise {
      from {
        transform: translateY(0);
        opacity: 0.5;
      }
      to {
        transform: translateY(-100vh);
        opacity: 0;
      }
    }
    
    .animate-rise {
      animation: rise linear infinite;
    }
    
    /* You can keep your fade-in-up animations here too */
    @keyframes fade-in-up {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .animate-fade-in-up {
      animation: fade-in-up 1s ease-out;
    }
    
    .animation-delay-200 {
      animation-delay: 200ms;
    }
    
    .animation-delay-400 {
      animation-delay: 400ms;
    }
  `}</style>
    </div>
  );
}