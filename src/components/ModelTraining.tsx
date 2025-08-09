import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Brain, 
  Play, 
  CheckCircle, 
  Database, 
  TrendingUp, 
  Clock,
  Target,
  Zap,
  AlertTriangle
} from 'lucide-react';
import { trafficSignCNN } from '@/services/trafficSignModel';
import type { ModelMetrics } from '@/services/trafficSignModel';

const ModelTraining = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [trainingStage, setTrainingStage] = useState('');
  const [modelMetrics, setModelMetrics] = useState<ModelMetrics | null>(null);
  const [isModelTrained, setIsModelTrained] = useState(false);

  useEffect(() => {
    // Check if model is already trained
    setIsModelTrained(trafficSignCNN.isModelReady());
    setModelMetrics(trafficSignCNN.getModelMetrics());
  }, []);

  const handleTrainModel = async () => {
    setIsTraining(true);
    setTrainingProgress(0);
    
    try {
      const metrics = await trafficSignCNN.trainModel((progress, stage) => {
        setTrainingProgress(progress);
        setTrainingStage(stage);
      });
      
      setModelMetrics(metrics);
      setIsModelTrained(true);
    } catch (error) {
      console.error('Training failed:', error);
    } finally {
      setIsTraining(false);
      setTrainingProgress(0);
      setTrainingStage('');
    }
  };

  const getMetricColor = (value: number, threshold: number = 0.9) => {
    if (value >= threshold) return 'text-emerald-600';
    if (value >= threshold - 0.1) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Training Control */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-blue-600" />
            CNN Model Training
          </CardTitle>
          <CardDescription>
            Train the Convolutional Neural Network for accurate traffic sign recognition
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isTraining ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Brain className="h-5 w-5 animate-pulse text-blue-600" />
                <span className="font-medium">Training Neural Network...</span>
                <Badge variant="secondary" className="animate-pulse">
                  {trainingProgress}%
                </Badge>
              </div>
              
              <Progress value={trainingProgress} className="w-full h-3" />
              
              <div className="text-sm text-muted-foreground text-center">
                {trainingStage}
              </div>
              
              <Alert>
                <Clock className="h-4 w-4" />
                <AlertDescription>
                  Training typically takes 3-5 minutes. The model will learn from {trafficSignCNN.getTrainingDataSize()} traffic sign samples.
                </AlertDescription>
              </Alert>
            </div>
          ) : (
            <div className="space-y-4">
              {isModelTrained ? (
                <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  <span className="font-medium text-emerald-800">Model Successfully Trained</span>
                  <Badge variant="outline" className="text-emerald-700 border-emerald-300">
                    Ready for Predictions
                  </Badge>
                </div>
              ) : (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Model needs to be trained before making predictions. Training will optimize the CNN for traffic sign classification.
                  </AlertDescription>
                </Alert>
              )}
              
              <Button 
                onClick={handleTrainModel} 
                className="w-full bg-blue-600 hover:bg-blue-700" 
                size="lg"
                disabled={isTraining}
              >
                <Play className="h-5 w-5 mr-2" />
                {isModelTrained ? 'Retrain Model' : 'Start Training'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Model Architecture */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            CNN Architecture
          </CardTitle>
          <CardDescription>TrafficNet-CNN v4.0 Neural Network Specifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="font-semibold text-blue-600">ResNet-50</div>
              <div className="text-sm text-muted-foreground">Base Architecture</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="font-semibold text-purple-600">224×224</div>
              <div className="text-sm text-muted-foreground">Input Size</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="font-semibold text-green-600">13 Classes</div>
              <div className="text-sm text-muted-foreground">Traffic Signs</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="font-semibold text-orange-600">25M</div>
              <div className="text-sm text-muted-foreground">Parameters</div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">Network Layers:</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <div>• Convolutional Layers: Feature extraction with 3×3 and 1×1 kernels</div>
              <div>• Batch Normalization: Stable training and faster convergence</div>
              <div>• ReLU Activation: Non-linear activation functions</div>
              <div>• Global Average Pooling: Dimensional reduction</div>
              <div>• Fully Connected: Classification with softmax output</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Training Metrics */}
      {modelMetrics && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Training Results
            </CardTitle>
            <CardDescription>Model performance metrics after training</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-card rounded-lg border">
                <Target className="h-6 w-6 mx-auto mb-2 text-emerald-600" />
                <div className={`text-2xl font-bold ${getMetricColor(modelMetrics.accuracy)}`}>
                  {(modelMetrics.accuracy * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              
              <div className="text-center p-4 bg-card rounded-lg border">
                <Zap className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <div className={`text-2xl font-bold ${getMetricColor(modelMetrics.precision)}`}>
                  {(modelMetrics.precision * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">Precision</div>
              </div>
              
              <div className="text-center p-4 bg-card rounded-lg border">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                <div className={`text-2xl font-bold ${getMetricColor(modelMetrics.recall)}`}>
                  {(modelMetrics.recall * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">Recall</div>
              </div>
              
              <div className="text-center p-4 bg-card rounded-lg border">
                <CheckCircle className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                <div className={`text-2xl font-bold ${getMetricColor(modelMetrics.f1Score)}`}>
                  {(modelMetrics.f1Score * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">F1-Score</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="text-sm font-medium text-red-700">Training Loss</div>
                <div className="text-lg font-bold text-red-600">
                  {modelMetrics.trainingLoss.toFixed(3)}
                </div>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="text-sm font-medium text-yellow-700">Validation Loss</div>
                <div className="text-lg font-bold text-yellow-600">
                  {modelMetrics.validationLoss.toFixed(3)}
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Training Epochs:</span>
                <Badge variant="outline">{modelMetrics.epochsTrained}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dataset Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Training Dataset
          </CardTitle>
          <CardDescription>German Traffic Sign Recognition Benchmark + Custom Dataset</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="font-semibold text-blue-600">{trafficSignCNN.getTrainingDataSize()}</div>
              <div className="text-sm text-muted-foreground">Training Samples</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="font-semibold text-green-600">13</div>
              <div className="text-sm text-muted-foreground">Sign Categories</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="font-semibold text-purple-600">80/20</div>
              <div className="text-sm text-muted-foreground">Train/Val Split</div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">Sign Categories:</h4>
            <div className="flex flex-wrap gap-2">
              {['Regulatory', 'Warning', 'Directional', 'Information', 'Other'].map((category) => (
                <Badge key={category} variant="secondary">{category}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelTraining;