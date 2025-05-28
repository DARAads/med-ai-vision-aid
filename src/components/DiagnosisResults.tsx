
import React from 'react';
import { AlertTriangle, CheckCircle, Info, Download, Share2, Clock, Cpu } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

const DiagnosisResults = ({ data }) => {
  if (!data) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Results Yet</h3>
          <p className="text-gray-500">Upload and analyze a medical image to see results here.</p>
        </CardContent>
      </Card>
    );
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'none': return 'bg-green-100 text-green-800';
      case 'low': return 'bg-yellow-100 text-yellow-800';
      case 'moderate': return 'bg-orange-100 text-orange-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPrimaryResult = () => {
    const primary = data.conditions[0];
    return {
      ...primary,
      isNormal: primary.name === 'Normal' && primary.probability > 0.8
    };
  };

  const primaryResult = getPrimaryResult();

  return (
    <div className="space-y-6">
      {/* Primary Result */}
      <Card className="border-l-4 border-l-blue-600">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {primaryResult.isNormal ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              )}
              <div>
                <CardTitle className="text-xl">Diagnosis Result</CardTitle>
                <CardDescription>AI-powered analysis complete</CardDescription>
              </div>
            </div>
            <Badge className={`text-sm ${getSeverityColor(primaryResult.severity)}`}>
              {(primaryResult.probability * 100).toFixed(1)}% confidence
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {primaryResult.name}
              </h3>
              <Progress 
                value={primaryResult.probability * 100} 
                className="w-full h-3"
              />
            </div>
            
            {primaryResult.isNormal ? (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  No significant abnormalities detected. The chest X-ray appears normal 
                  with clear lung fields and normal cardiac silhouette.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Potential abnormality detected. Please consult with a healthcare 
                  professional for proper evaluation and treatment recommendations.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* All Conditions */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Analysis</CardTitle>
            <CardDescription>Probability breakdown for all conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.conditions.map((condition, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{condition.name}</span>
                    <Badge variant="outline">
                      {(condition.probability * 100).toFixed(1)}%
                    </Badge>
                  </div>
                  <Progress value={condition.probability * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Image Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Analyzed Image</CardTitle>
            <CardDescription>Original medical image</CardDescription>
          </CardHeader>
          <CardContent>
            <img 
              src={data.image} 
              alt="Analyzed medical scan" 
              className="w-full rounded-lg shadow-sm"
            />
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Clinical Recommendations</CardTitle>
          <CardDescription>Suggested next steps based on AI analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {data.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-medium">{index + 1}</span>
                </div>
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Technical Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="h-5 w-5" />
            Technical Details
          </CardTitle>
          <CardDescription>AI model and processing information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Model Version:</span>
                <span className="font-medium">{data.technicalDetails.model}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-gray-600">Input Resolution:</span>
                <span className="font-medium">{data.technicalDetails.inputSize}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-gray-600">Processing Time:</span>
                <span className="font-medium">{data.technicalDetails.processingTime}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Training Dataset:</span>
                <span className="font-medium">{data.technicalDetails.datasetTrained}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-gray-600">Analysis Date:</span>
                <span className="font-medium">
                  {new Date(data.timestamp).toLocaleDateString()}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-gray-600">Analysis Time:</span>
                <span className="font-medium">
                  {new Date(data.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Report
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          Share Results
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Save to History
        </Button>
      </div>
    </div>
  );
};

export default DiagnosisResults;
