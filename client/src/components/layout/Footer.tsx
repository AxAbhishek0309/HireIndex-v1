import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Send 
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ResumeCraft</h3>
            <p className="text-gray-300 mb-4">
              Helping job seekers improve their resumes and increase their chances of landing interviews in today's competitive job market.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <Linkedin size={20} />
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              <li><Link href="/resume-analyzer" className="text-gray-300 hover:text-white">Resume Analyzer</Link></li>
              <li><a href="https://www.jobscan.co/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">ATS Optimization</a></li>
              <li><Link href="/resources" className="text-gray-300 hover:text-white">Career Resources</Link></li>
              <li><a href="https://www.canva.com/resumes/templates/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Resume Templates</a></li>
              <li><a href="https://www.indeed.com/career-advice" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Career Coaching</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white">Our Team</Link></li>
              <li><a href="https://www.trustpilot.com/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Testimonials</a></li>
              <li><a href="https://medium.com/career-advice" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Blog</a></li>
              <li><a href="mailto:contact@resumeanalyzer.com" className="text-gray-300 hover:text-white">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="https://www.themuse.com/advice" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Blog Articles</a></li>
              <li><a href="https://www.indeed.com/career-advice/resumes-cover-letters" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Resume Tips</a></li>
              <li><a href="https://www.glassdoor.com/blog/interview-questions-and-answers/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Interview Prep</a></li>
              <li><a href="https://www.linkedin.com/learning/topics/career-development" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Career Guides</a></li>
              <li><a href="https://www.monster.com/career-advice/job-search" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Job Search Tools</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} ResumeCraft. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6 text-sm text-gray-400">
            <a href="https://www.privacypolicygenerator.info/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Privacy Policy</a>
            <a href="https://www.termsandconditionsgenerator.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Terms of Service</a>
            <a href="https://www.cookiepolicygenerator.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Cookies Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
