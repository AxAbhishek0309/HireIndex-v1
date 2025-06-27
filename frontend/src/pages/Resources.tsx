import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  BookOpen, 
  Play, 
  FileDown, 
  Search, 
  Filter, 
  Briefcase,
  GraduationCap,
  Edit3,
  Award,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

// Resource item interface
interface ResourceItem {
  id: number;
  title: string;
  description: string;
  url: string;
  type: 'article' | 'template' | 'video' | 'tool';
  tags: string[];
  category: string;
  featured?: boolean;
}

const Resources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Sample resources data with actual working external links
  const resourcesData: ResourceItem[] = [
    {
      id: 1,
      title: "Resume Writing Best Practices for 2024",
      description: "Learn the latest trends and best practices for creating an effective resume that stands out to both recruiters and ATS systems.",
      url: "https://www.indeed.com/career-advice/resumes-cover-letters/best-resume-format",
      type: "article",
      tags: ["resume writing", "best practices", "ATS"],
      category: "guides",
      featured: true
    },
    {
      id: 2,
      title: "Professional Resume Template",
      description: "A clean, professional resume template optimized for ATS with proper formatting and sections.",
      url: "https://www.canva.com/resumes/templates/professional/",
      type: "template",
      tags: ["template", "professional", "ATS-friendly"],
      category: "templates"
    },
    {
      id: 3,
      title: "How to Write Achievement-Based Bullet Points",
      description: "Tutorial on creating powerful achievement-based bullet points that showcase your impact.",
      url: "https://www.youtube.com/watch?v=J3ko5MySuY8",
      type: "video",
      tags: ["bullet points", "achievements", "impact"],
      category: "tutorials"
    },
    {
      id: 4,
      title: "ATS Keywords Checker",
      description: "Tool to check if your resume contains the right keywords for your target job posting.",
      url: "https://www.jobscan.co/",
      type: "tool",
      tags: ["keywords", "ATS", "optimization"],
      category: "tools",
      featured: true
    },
    {
      id: 5,
      title: "Resume Action Verbs List",
      description: "Comprehensive list of powerful action verbs to make your resume more dynamic and engaging.",
      url: "https://www.themuse.com/advice/185-powerful-verbs-that-will-make-your-resume-awesome",
      type: "article",
      tags: ["action verbs", "writing", "language"],
      category: "guides"
    },
    {
      id: 6,
      title: "Technical Skills Resume Template",
      description: "Resume template specifically designed for technical roles with appropriate sections for skills and projects.",
      url: "https://www.overleaf.com/latex/templates/tagged/cv",
      type: "template",
      tags: ["template", "technical", "IT"],
      category: "templates"
    },
    {
      id: 7,
      title: "Resume Formatting Tutorial",
      description: "Video guide on properly formatting your resume for maximum readability and ATS compatibility.",
      url: "https://www.youtube.com/watch?v=Tt08KmFfIYQ",
      type: "video",
      tags: ["formatting", "design", "layout"],
      category: "tutorials"
    },
    {
      id: 8,
      title: "Cover Letter Generator",
      description: "AI-powered tool to help you create customized cover letters for different job applications.",
      url: "https://resumeworded.com/cover-letter-generator",
      type: "tool",
      tags: ["cover letter", "generator", "customization"],
      category: "tools"
    },
    {
      id: 9,
      title: "Industry-Specific Resume Examples",
      description: "Collection of sample resumes for various industries with annotations explaining effective elements.",
      url: "https://www.resume.com/career-advice/resumes/resume-examples-by-industry/",
      type: "article",
      tags: ["examples", "industry-specific", "samples"],
      category: "guides",
      featured: true
    },
    {
      id: 10,
      title: "Entry-Level Resume Template",
      description: "Resume template designed for recent graduates and those with limited work experience.",
      url: "https://novoresume.com/resume-templates/college-student",
      type: "template",
      tags: ["template", "entry-level", "graduates"],
      category: "templates"
    },
    {
      id: 11,
      title: "Handling Employment Gaps in Your Resume",
      description: "Expert advice on how to address employment gaps in your resume effectively.",
      url: "https://www.youtube.com/watch?v=_0fjKarINXE",
      type: "video",
      tags: ["employment gaps", "challenges", "explanations"],
      category: "tutorials"
    },
    {
      id: 12,
      title: "LinkedIn Profile Optimizer",
      description: "Tool to analyze and improve your LinkedIn profile to complement your resume.",
      url: "https://www.linkedin.com/learning/learning-linkedin-for-students",
      type: "tool",
      tags: ["LinkedIn", "social media", "networking"],
      category: "tools"
    }
  ];

  // Filter resources based on search term and category filter
  const filteredResources = resourcesData.filter(resource => {
    const matchesSearch = searchTerm === '' || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = activeFilter === 'all' || 
      (activeFilter === 'featured' && resource.featured) ||
      resource.category === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  // Function to render appropriate icon based on resource type
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <BookOpen className="h-5 w-5" />;
      case 'template':
        return <FileDown className="h-5 w-5" />;
      case 'video':
        return <Play className="h-5 w-5" />;
      case 'tool':
        return <FileText className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  // Generate CSS class for type badge
  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case 'article':
        return 'bg-blue-100 text-blue-800';
      case 'template':
        return 'bg-green-100 text-green-800';
      case 'video':
        return 'bg-red-100 text-red-800';
      case 'tool':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4 text-center text-blue-700 dark:text-purple-400">
          Resume Building Resources
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 text-center max-w-3xl mx-auto">
          Explore our curated collection of resume templates, guides, tutorials, and tools to help you create an outstanding resume that gets you noticed.
        </p>
        
        {/* Search and Filter */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-300" />
            <Input
              type="text"
              placeholder="Search for resources..."
              className="pl-10 py-6 text-lg bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="mb-12">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button 
            variant={activeFilter === 'all' ? 'default' : 'outline'} 
            onClick={() => setActiveFilter('all')}
            className={`rounded-full bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 ${activeFilter === 'all' ? 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-white' : ''}`}
          >
            All Resources
          </Button>
          <Button 
            variant={activeFilter === 'featured' ? 'default' : 'outline'} 
            onClick={() => setActiveFilter('featured')}
            className={`rounded-full bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 ${activeFilter === 'featured' ? 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-white' : ''}`}
          >
            <Award className="mr-2 h-4 w-4" /> Featured
          </Button>
          <Button 
            variant={activeFilter === 'guides' ? 'default' : 'outline'} 
            onClick={() => setActiveFilter('guides')}
            className={`rounded-full bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 ${activeFilter === 'guides' ? 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-white' : ''}`}
          >
            <BookOpen className="mr-2 h-4 w-4" /> Guides
          </Button>
          <Button 
            variant={activeFilter === 'templates' ? 'default' : 'outline'} 
            onClick={() => setActiveFilter('templates')}
            className={`rounded-full bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 ${activeFilter === 'templates' ? 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-white' : ''}`}
          >
            <FileDown className="mr-2 h-4 w-4" /> Templates
          </Button>
          <Button 
            variant={activeFilter === 'tutorials' ? 'default' : 'outline'} 
            onClick={() => setActiveFilter('tutorials')}
            className={`rounded-full bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 ${activeFilter === 'tutorials' ? 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-white' : ''}`}
          >
            <Play className="mr-2 h-4 w-4" /> Tutorials
          </Button>
          <Button 
            variant={activeFilter === 'tools' ? 'default' : 'outline'} 
            onClick={() => setActiveFilter('tools')}
            className={`rounded-full bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 ${activeFilter === 'tools' ? 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-white' : ''}`}
          >
            <FileText className="mr-2 h-4 w-4" /> Tools
          </Button>
        </div>
      </section>

      {/* Resource Listings */}
      <section>
        {filteredResources.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold mb-2">No resources found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white dark:bg-[#232329] rounded-xl shadow-md p-6 flex flex-col justify-between border border-gray-200 dark:border-[#232329] transition-colors duration-200"
              >
                <div className="flex items-center mb-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full mr-3 text-lg bg-gray-100 dark:bg-[#18181b] text-blue-600 dark:text-blue-400">
                    {getResourceIcon(resource.type)}
                  </span>
                  <span className={`text-sm font-semibold px-2 py-1 rounded-full ${resource.type === 'article' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : resource.type === 'template' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : resource.type === 'tool' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'}`}>{resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</span>
                </div>
                <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{resource.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{resource.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.tags.map((tag) => (
                    <span key={tag} className="bg-gray-200 dark:bg-gray-800 text-xs px-2 py-1 rounded-full text-gray-700 dark:text-gray-300">{tag}</span>
                  ))}
                </div>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-auto px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                >
                  View Resource <span className="ml-1">↗</span>
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Job Search Tips Section */}
      <section className="mt-20 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Beyond the Resume: Job Search Strategy
            </h2>
            <p className="text-gray-700 mb-6">
              A great resume is just one part of a successful job search. Explore our holistic approach to landing your dream job with these additional resources.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 p-2 rounded-lg mr-4">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Interview Preparation</h3>
                  <p className="text-gray-600 text-sm">Comprehensive guides to help you ace your job interviews</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-100 p-2 rounded-lg mr-4">
                  <GraduationCap className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Skill Development</h3>
                  <p className="text-gray-600 text-sm">Resources to help you acquire in-demand skills for your career</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-purple-100 p-2 rounded-lg mr-4">
                  <Edit3 className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Cover Letter Writing</h3>
                  <p className="text-gray-600 text-sm">Templates and guides for creating compelling cover letters</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="bg-white p-6 rounded-xl shadow-lg relative z-10">
              <h3 className="text-xl font-semibold mb-4 text-center">Weekly Job Search Checklist</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <ChevronRight className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Update your resume with new skills & experiences</span>
                </li>
                <li className="flex items-center">
                  <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <ChevronRight className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Research target companies and their culture</span>
                </li>
                <li className="flex items-center">
                  <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <ChevronRight className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Tailor your resume for specific job applications</span>
                </li>
                <li className="flex items-center">
                  <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <ChevronRight className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Expand your professional network</span>
                </li>
                <li className="flex items-center">
                  <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <ChevronRight className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Practice interview questions and responses</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Sign Up */}
      <section className="mt-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Stay Updated with New Resources</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Subscribe to our newsletter to receive the latest resume trends, job search strategies, and exclusive content directly to your inbox.
        </p>
        <div className="flex max-w-md mx-auto">
          <Input 
            type="email" 
            placeholder="Your email address" 
            className="rounded-full bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 h-12 flex-1"
          />
          <Button className="rounded-full h-12 px-6 ml-2 bg-blue-600 text-white font-semibold hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 dark:text-white">
            Subscribe
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Resources;