import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Search, 
  TrendingUp, 
  Award, 
  Check, 
  ChevronRight 
} from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Optimize Your Resume for ATS Success
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Our AI-powered resume analyzer helps you pass the Applicant Tracking Systems and land more interviews.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/resume-analyzer">
                  <Button className="bg-white text-blue-600 hover:bg-blue-50 font-medium text-lg px-6 py-3">
                    Analyze My Resume
                  </Button>
                </Link>
                <Button variant="outline" className="border-white text-white hover:bg-blue-700 font-medium text-lg px-6 py-3">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/20 max-w-md">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center mr-3">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">ATS-Optimized Resume</h3>
                    <p className="text-blue-100">Score higher on applicant tracking systems</p>
                  </div>
                </div>
                <div className="bg-white/20 h-2 rounded-full mb-6">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-300 mr-2 mt-0.5" />
                    <span>Keyword optimization for your industry</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-300 mr-2 mt-0.5" />
                    <span>Content analysis against job market standards</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-300 mr-2 mt-0.5" />
                    <span>Format recommendations for ATS readability</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-300 mr-2 mt-0.5" />
                    <span>Specific actionable improvement suggestions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Our ATS Resume Analyzer Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI-powered tool analyzes your resume against the requirements of modern Applicant Tracking Systems to maximize your chances of getting noticed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Your Resume</h3>
              <p className="text-gray-600">
                Simply upload your resume in PDF or DOCX format. Our secure system will process your document quickly.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
              <p className="text-gray-600">
                Our AI analyzes your resume for ATS compatibility, checking keywords, formatting, content quality, and more.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Detailed Results</h3>
              <p className="text-gray-600">
                Receive a comprehensive analysis with your ATS score and specific recommendations for improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-md p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="md:w-2/3 mb-6 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">Ready to improve your resume?</h2>
                <p className="text-gray-600">
                  Increase your chances of landing interviews by ensuring your resume passes ATS screening.
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center md:justify-end">
                <Link href="/resume-analyzer">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3">
                    Analyze My Resume <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of job seekers who have improved their resumes with our ATS analyzer.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <Award className="h-5 w-5 text-yellow-500 mr-1" />
                <Award className="h-5 w-5 text-yellow-500 mr-1" />
                <Award className="h-5 w-5 text-yellow-500 mr-1" />
                <Award className="h-5 w-5 text-yellow-500 mr-1" />
                <Award className="h-5 w-5 text-yellow-500" />
              </div>
              <p className="text-gray-600 mb-4">
                "After using ResumeCraft's analyzer, I fixed the issues in my resume and landed interviews at 3 companies within a week!"
              </p>
              <div className="font-medium">Michael T., Software Engineer</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <Award className="h-5 w-5 text-yellow-500 mr-1" />
                <Award className="h-5 w-5 text-yellow-500 mr-1" />
                <Award className="h-5 w-5 text-yellow-500 mr-1" />
                <Award className="h-5 w-5 text-yellow-500 mr-1" />
                <Award className="h-5 w-5 text-yellow-500" />
              </div>
              <p className="text-gray-600 mb-4">
                "I was applying to jobs for months with no response. The ATS analyzer showed me exactly what was wrong with my resume. Now I'm employed!"
              </p>
              <div className="font-medium">Sarah K., Marketing Specialist</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <Award className="h-5 w-5 text-yellow-500 mr-1" />
                <Award className="h-5 w-5 text-yellow-500 mr-1" />
                <Award className="h-5 w-5 text-yellow-500 mr-1" />
                <Award className="h-5 w-5 text-yellow-500 mr-1" />
                <Award className="h-5 w-5 text-gray-300" />
              </div>
              <p className="text-gray-600 mb-4">
                "The detailed feedback was incredibly helpful. I improved my resume's ATS score from 65 to 92 and started getting callbacks!"
              </p>
              <div className="font-medium">David L., Project Manager</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
