
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Car, Clock, Database, Target, Download, Share2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const TrafficSignResults = ({ results, onNewAnalysis }) => {
  if (!results) return null;

  const getCategoryColor = (category) => {
    const colors = {
      'Regulatory': 'bg-red-100 text-red-800 border-red-200',
      'Warning': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Directional': 'bg-blue-100 text-blue-800 border-blue-200',
      'Information': 'bg-green-100 text-green-800 border-green-200',
      'Other': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[category] || colors['Other'];
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return 'text-green-600';
    if (confidence >= 0.7) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <Card className="border-l-4 border-l-orange-500">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
              Traffic Sign Classification
            </div>
            <Badge className={getCategoryColor(results.classifications[0]?.category)}>
              {results.classifications[0]?.category}
            </Badge>
          </CardTitle>
          <CardDescription>CNN-based classification results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <img 
                src={results.image} 
                alt="Analyzed traffic sign" 
                className="w-full max-w-sm mx-auto rounded-lg shadow-md border"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-orange-600 mb-2">
                  {results.prediction}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm text-gray-600">Confidence:</span>
                  <span className={`font-semibold ${getConfidenceColor(results.confidence)}`}>
                    {(results.confidence * 100).toFixed(1)}%
                  </span>
                </div>
                <Progress 
                  value={results.confidence * 100} 
                  className="h-3"
                />
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Driving Recommendations
                </h4>
                <ul className="space-y-1">
                  {results.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Classification Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Classification Breakdown</CardTitle>
          <CardDescription>Top predictions from the CNN model</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {results.classifications.slice(0, 5).map((classification, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-900">
                    {classification.name}
                  </span>
                  <Badge className={getCategoryColor(classification.category)} variant="outline">
                    {classification.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Progress 
                    value={classification.probability * 100} 
                    className="w-24 h-2"
                  />
                  <span className="text-sm font-medium min-w-12">
                    {(classification.probability * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technical Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Technical Specifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="font-semibold text-blue-600">{results.metadata.modelVersion}</div>
              <div className="text-sm text-gray-600">Model</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="font-semibold text-green-600">{results.metadata.accuracy}</div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="font-semibold text-purple-600">{results.metadata.imageSize}</div>
              <div className="text-sm text-gray-600">Input Size</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="font-semibold text-orange-600">{results.metadata.processingTime}</div>
              <div className="text-sm text-gray-600">Processing</div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium">Analysis completed:</span>
            </div>
            <span className="text-sm text-gray-600">
              {new Date(results.timestamp).toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-3">
            <Button onClick={onNewAnalysis} className="bg-orange-600 hover:bg-orange-700">
              <Car className="h-4 w-4 mr-2" />
              Analyze Another Sign
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Results
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share Analysis
            </Button>
          </div>
          
          <Alert className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              This traffic sign recognition system is designed for autonomous vehicle development. 
              Always verify results and comply with local traffic regulations.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrafficSignResults;
