
import React, { useState } from 'react';
import { Upload, Brain, Activity, FileText, BarChart3, Stethoscope, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ImageUpload from '@/components/ImageUpload';
import DiagnosisResults from '@/components/DiagnosisResults';
import Dashboard from '@/components/Dashboard';
import { toast } from 'sonner';

const Index = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [diagnosisData, setDiagnosisData] = useState(null);

  const handleDiagnosisComplete = (results) => {
    setDiagnosisData(results);
    setActiveTab('results');
    toast.success('Diagnosis completed successfully!');
  };

  const features = [
    {
      icon: Brain,
      title: 'Deep Learning AI',
      description: 'Advanced convolutional neural networks trained on thousands of medical images'
    },
    {
      icon: Zap,
      title: 'Instant Analysis',
      description: 'Get accurate diagnosis results in seconds, not hours'
    },
    {
      icon: Shield,
      title: 'HIPAA Compliant',
      description: 'Enterprise-grade security and privacy protection'
    },
    {
      icon: BarChart3,
      title: 'Detailed Reports',
      description: 'Comprehensive analysis with confidence scores and recommendations'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">MediAI Diagnosis</h1>
                <p className="text-sm text-gray-600">AI-Powered Medical Image Analysis</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Activity className="h-3 w-3 mr-1" />
              System Online
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Revolutionary Medical 
              <span className="text-blue-600"> AI Diagnosis</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Upload medical images and get instant, accurate AI-powered diagnosis for pneumonia, 
              brain tumors, and other conditions using state-of-the-art deep learning technology.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Badge className="text-sm py-2 px-4">CNN Architecture</Badge>
              <Badge className="text-sm py-2 px-4">TensorFlow Powered</Badge>
              <Badge className="text-sm py-2 px-4">99.2% Accuracy</Badge>
              <Badge className="text-sm py-2 px-4">Real-time Analysis</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Advanced AI Capabilities
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Application */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload & Analyze
              </TabsTrigger>
              <TabsTrigger value="results" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Results
              </TabsTrigger>
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
              <ImageUpload onDiagnosisComplete={handleDiagnosisComplete} />
            </TabsContent>

            <TabsContent value="results">
              <DiagnosisResults data={diagnosisData} />
            </TabsContent>

            <TabsContent value="dashboard">
              <Dashboard />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold">MediAI Diagnosis</h3>
          </div>
          <p className="text-gray-400 mb-4">
            Advancing healthcare through artificial intelligence and deep learning
          </p>
          <p className="text-sm text-gray-500">
            © 2024 MediAI Diagnosis. Built with TensorFlow, React, and medical expertise.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
