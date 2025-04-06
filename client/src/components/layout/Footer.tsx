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
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              <li><Link href="/resume-analyzer" className="text-gray-300 hover:text-white">Resume Analyzer</Link></li>
              <li><Link href="/" className="text-gray-300 hover:text-white">ATS Optimization</Link></li>
              <li><Link href="/" className="text-gray-300 hover:text-white">Career Resources</Link></li>
              <li><Link href="/" className="text-gray-300 hover:text-white">Resume Templates</Link></li>
              <li><Link href="/" className="text-gray-300 hover:text-white">Career Coaching</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link href="/" className="text-gray-300 hover:text-white">Our Team</Link></li>
              <li><Link href="/" className="text-gray-300 hover:text-white">Testimonials</Link></li>
              <li><Link href="/" className="text-gray-300 hover:text-white">Blog</Link></li>
              <li><Link href="/" className="text-gray-300 hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-gray-300 mb-4">
              Stay updated with the latest job search tips and career resources.
            </p>
            <form className="mb-4">
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-gray-700 text-white rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded-l-none">
                  <Send size={16} />
                </Button>
              </div>
            </form>
            <p className="text-gray-400 text-sm">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} ResumeCraft. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6 text-sm text-gray-400">
            <Link href="/" className="hover:text-white">Privacy Policy</Link>
            <Link href="/" className="hover:text-white">Terms of Service</Link>
            <Link href="/" className="hover:text-white">Cookies Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
