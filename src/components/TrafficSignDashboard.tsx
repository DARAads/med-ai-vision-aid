
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Car, TrendingUp, Users, Database, Clock } from 'lucide-react';
import TrafficSignUpload from './TrafficSignUpload';
import TrafficSignResults from './TrafficSignResults';

const TrafficSignDashboard = () => {
  const [currentResults, setCurrentResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleClassificationComplete = (results) => {
    console.log('Traffic sign classification completed:', results);
    setCurrentResults(results);
    setShowResults(true);
  };

  const handleNewAnalysis = () => {
    setShowResults(false);
    setCurrentResults(null);
  };

  const mockStats = {
    totalAnalyses: 2847,
    accuracy: 98.4,
    avgProcessingTime: 1.2,
    activeUsers: 156
  };

  const recentAnalyses = [
    { sign: 'Stop Sign', confidence: 0.96, time: '2 min ago', category: 'Regulatory' },
    { sign: 'Speed Limit 50', confidence: 0.92, time: '5 min ago', category: 'Regulatory' },
    { sign: 'Yield', confidence: 0.89, time: '8 min ago', category: 'Warning' },
    { sign: 'Pedestrian Crossing', confidence: 0.94, time: '12 min ago', category: 'Information' }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      'Regulatory': 'bg-red-100 text-red-800',
      'Warning': 'bg-yellow-100 text-yellow-800',
      'Directional': 'bg-blue-100 text-blue-800',
      'Information': 'bg-green-100 text-green-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (showResults) {
    return <TrafficSignResults results={currentResults} onNewAnalysis={handleNewAnalysis} />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-orange-100 rounded-full">
            <AlertTriangle className="h-8 w-8 text-orange-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Traffic Sign Recognition</h1>
            <p className="text-xl text-gray-600 mt-2">
              CNN-powered classification for autonomous driving systems
            </p>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <Badge variant="secondary" className="px-3 py-1">
            <Car className="h-4 w-4 mr-1" />
            Autonomous Driving
          </Badge>
          <Badge variant="secondary" className="px-3 py-1">
            <Database className="h-4 w-4 mr-1" />
            Deep Learning
          </Badge>
          <Badge variant="secondary" className="px-3 py-1">
            <TrendingUp className="h-4 w-4 mr-1" />
            98.4% Accuracy
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="classify" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="classify">Classification</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        </TabsList>

        <TabsContent value="classify">
          <TrafficSignUpload onClassificationComplete={handleClassificationComplete} />
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Analyses</p>
                    <p className="text-2xl font-bold text-orange-600">{mockStats.totalAnalyses.toLocaleString()}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Model Accuracy</p>
                    <p className="text-2xl font-bold text-green-600">{mockStats.accuracy}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Processing</p>
                    <p className="text-2xl font-bold text-blue-600">{mockStats.avgProcessingTime}s</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Users</p>
                    <p className="text-2xl font-bold text-purple-600">{mockStats.activeUsers}</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Analyses */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Classifications</CardTitle>
              <CardDescription>Latest traffic sign recognition results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentAnalyses.map((analysis, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="font-medium">{analysis.sign}</p>
                        <p className="text-sm text-gray-600">{analysis.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getCategoryColor(analysis.category)} variant="outline">
                        {analysis.category}
                      </Badge>
                      <span className="text-sm font-medium text-green-600">
                        {(analysis.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Information */}
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>CNN model and dataset details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Model Architecture:</span>
                    <span className="font-medium">Convolutional Neural Network</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Framework:</span>
                    <span className="font-medium">TensorFlow/Keras</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Input Resolution:</span>
                    <span className="font-medium">224x224 pixels</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Training Dataset:</span>
                    <span className="font-medium">German Traffic Sign Recognition</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Classes:</span>
                    <span className="font-medium">43 Traffic Sign Types</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Model Version:</span>
                    <span className="font-medium">TrafficNet-CNN v3.0</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrafficSignDashboard;
