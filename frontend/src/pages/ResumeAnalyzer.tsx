import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { FileUpload } from '@/components/ui/file-upload';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Key, Briefcase, Wrench, GraduationCap, 
  FileText, CheckCircle, Download, RefreshCw 
} from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { ResumeAnalysis, ScoreCategory, getScoreColor } from '@/lib/types';

const ResumeAnalyzer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const { toast } = useToast();

  const analyzeResumeMutation = useMutation({
    mutationFn: async (fileToUpload: File) => {
      const formData = new FormData();
      formData.append('file', fileToUpload);
      const response = await apiRequest('POST', '/api/resume/analyze', undefined, formData);
      return await response.json() as ResumeAnalysis;
    },
    onSuccess: (data) => {
      setAnalysis(data);
      toast({
        title: "Analysis Complete",
        description: "Your resume has been analyzed successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze resume. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleFileSelected = (selectedFile: File) => {
    setFile(selectedFile);
    analyzeResumeMutation.mutate(selectedFile);
  };

  const handleReanalyze = () => {
    if (file) {
      analyzeResumeMutation.mutate(file);
    } else {
      toast({
        title: "No File Selected",
        description: "Please upload a resume file to analyze.",
        variant: "destructive",
      });
    }
  };

  const handleExport = () => {
    if (!analysis) return;
    
    // Create a formatted report text
    const reportText = `
      # Resume Analysis Report
      
      ## Overall Score: ${analysis.overallScore}/100
      
      ## Category Scores:
      - Keywords & Phrases: ${analysis.keywordsScore}/100
      - Work Experience: ${analysis.experienceScore}/100
      - Skills Match: ${analysis.skillsScore}/100
      - Education: ${analysis.educationScore}/100
      - Formatting & Structure: ${analysis.formattingScore}/100
      
      ## Feedback:
      
      ### Keywords & Phrases
      ${analysis.feedback.keywords}
      
      ### Work Experience
      ${analysis.feedback.experience}
      
      ### Skills Match
      ${analysis.feedback.skills}
      
      ### Education
      ${analysis.feedback.education}
      
      ### Formatting & Structure
      ${analysis.feedback.formatting}
      
      ## Improvement Suggestions:
      ${analysis.improvementSuggestions.map(suggestion => `- ${suggestion}`).join('\n')}
      
      Report generated on ${new Date().toLocaleString()}
    `;
    
    // Create a blob and download it
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume-analysis-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white dark:bg-gray-950 rounded-xl shadow-lg">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Resume ATS Checker</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Upload your resume to check its compatibility with Applicant Tracking Systems
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <FileUpload 
            onFileSelected={handleFileSelected} 
            isLoading={analyzeResumeMutation.isPending}
            error={analyzeResumeMutation.error instanceof Error ? analyzeResumeMutation.error.message : undefined}
          />
        </div>
        
        <div className="lg:col-span-7">
          {analyzeResumeMutation.isPending && (
            <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <CardContent className="py-8">
                <div className="flex flex-col items-center justify-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-2">Analyzing Your Resume</h3>
                  <div className="w-full max-w-md bg-gray-200 dark:bg-gray-800 rounded-full h-2.5 mb-4">
                    <div className="bg-blue-500 h-2.5 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                  </div>
                  <p className="text-gray-500 dark:text-gray-300">We're checking your resume against ATS requirements...</p>
                </div>
              </CardContent>
            </Card>
          )}
          
          {!analyzeResumeMutation.isPending && analysis && (
            <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <CardContent className="p-6">
                <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      {file?.name} - ATS Score
                    </h3>
                    <div className="flex space-x-2">
                      <Button 
                        onClick={handleExport}
                        variant="outline" 
                        className="text-blue-500 border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-800 text-sm"
                      >
                        <Download className="h-4 w-4 mr-1" /> Export
                      </Button>
                      <Button 
                        onClick={handleReanalyze}
                        variant="outline" 
                        className="text-gray-500 border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
                      >
                        <RefreshCw className="h-4 w-4 mr-1" /> Re-analyze
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="md:w-1/3 mb-4 md:mb-0">
                      <div className="text-center p-4">
                        <div className="text-5xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                          <span>{analysis.overallScore}</span>
                          <span className="text-2xl text-gray-500 dark:text-gray-300">/100</span>
                        </div>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">Overall ATS Score</div>
                      </div>
                    </div>
                    
                    <div className="md:w-2/3">
                      <div className="mb-4">
                        <ProgressBar 
                          score={analysis.overallScore} 
                          label="Overall Score" 
                        />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {analysis.overallScore >= 85 ? (
                          "Your resume scores well against ATS systems! Check the detailed analysis for any minor improvements."
                        ) : analysis.overallScore >= 70 ? (
                          "Your resume is good but has room for improvement. Check the detailed analysis below."
                        ) : (
                          "Your resume needs significant improvements to pass ATS systems. Check the detailed analysis below."
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-4">Detailed Analysis</h4>
                  
                  {/* Category: Keywords & Phrases */}
                  <div className="mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                      <div className="flex items-center mb-2 sm:mb-0">
                        <Key className="text-blue-500 mr-3 h-5 w-5" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Keywords & Phrases</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">{analysis.keywordsScore}</span>
                        <div className="w-32">
                          <ProgressBar score={analysis.keywordsScore} showValue={false} size="sm" />
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 ml-8">
                      {analysis.feedback.keywords}
                    </p>
                  </div>
                  
                  {/* Category: Work Experience */}
                  <div className="mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                      <div className="flex items-center mb-2 sm:mb-0">
                        <Briefcase className="text-blue-500 mr-3 h-5 w-5" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Work Experience</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">{analysis.experienceScore}</span>
                        <div className="w-32">
                          <ProgressBar score={analysis.experienceScore} showValue={false} size="sm" />
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 ml-8">
                      {analysis.feedback.experience}
                    </p>
                  </div>
                  
                  {/* Category: Skills Match */}
                  <div className="mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                      <div className="flex items-center mb-2 sm:mb-0">
                        <Wrench className="text-blue-500 mr-3 h-5 w-5" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Skills Match</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">{analysis.skillsScore}</span>
                        <div className="w-32">
                          <ProgressBar score={analysis.skillsScore} showValue={false} size="sm" />
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 ml-8">
                      {analysis.feedback.skills}
                    </p>
                  </div>
                  
                  {/* Category: Education */}
                  <div className="mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                      <div className="flex items-center mb-2 sm:mb-0">
                        <GraduationCap className="text-blue-500 mr-3 h-5 w-5" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Education</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">{analysis.educationScore}</span>
                        <div className="w-32">
                          <ProgressBar score={analysis.educationScore} showValue={false} size="sm" />
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 ml-8">
                      {analysis.feedback.education}
                    </p>
                  </div>
                  
                  {/* Category: Formatting */}
                  <div className="mb-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                      <div className="flex items-center mb-2 sm:mb-0">
                        <FileText className="text-blue-500 mr-3 h-5 w-5" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Formatting & Structure</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">{analysis.formattingScore}</span>
                        <div className="w-32">
                          <ProgressBar score={analysis.formattingScore} showValue={false} size="sm" />
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 ml-8">
                      {analysis.feedback.formatting}
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-3">Recommended Actions</h4>
                    <ul className="ml-5 text-sm text-gray-600 dark:text-gray-300 space-y-2">
                      {analysis.improvementSuggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="text-green-500 mt-1 mr-2 h-4 w-4" />
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Button 
                        onClick={handleExport}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        Download Detailed Report
                      </Button>
                      <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
                        Schedule Expert Review
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {!analyzeResumeMutation.isPending && !analysis && !file && (
            <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <CardContent className="p-8 text-center">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-100 mb-2">No Resume Analyzed Yet</h3>
                <p className="text-gray-500 dark:text-gray-300 mb-6">
                  Upload your resume to get a detailed ATS compatibility analysis and improvement suggestions.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
