
import React, { useState, useCallback } from 'react';
import { Upload, Camera, AlertTriangle, CheckCircle, Loader2, Car, Play, Square } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TrafficSignUpload = ({ onClassificationComplete }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');
  const [isRealTimeActive, setIsRealTimeActive] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const simulateCNNClassification = async () => {
    setIsAnalyzing(true);
    setProgress(0);

    const progressSteps = [
      { step: 15, message: 'Preprocessing image...' },
      { step: 35, message: 'Loading CNN model...' },
      { step: 55, message: 'Feature extraction...' },
      { step: 75, message: 'Running classification...' },
      { step: 95, message: 'Analyzing confidence...' },
      { step: 100, message: 'Complete!' }
    ];

    for (const { step } of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setProgress(step);
    }

    const trafficSigns = [
      'Stop Sign', 'Speed Limit 30', 'Speed Limit 50', 'Speed Limit 70',
      'Yield', 'No Entry', 'Turn Right', 'Turn Left', 'Pedestrian Crossing',
      'School Zone', 'Construction', 'Parking', 'One Way'
    ];

    const randomSign = trafficSigns[Math.floor(Math.random() * trafficSigns.length)];
    const confidence = 0.85 + Math.random() * 0.14;

    const mockResults = {
      prediction: randomSign,
      confidence: confidence,
      classifications: trafficSigns.map(sign => ({
        name: sign,
        probability: sign === randomSign ? confidence : Math.random() * 0.15,
        category: getSignCategory(sign)
      })).sort((a, b) => b.probability - a.probability),
      metadata: {
        imageSize: '224x224',
        processingTime: '1.2s',
        modelVersion: 'TrafficNet-CNN v3.0',
        dataset: 'German Traffic Sign Recognition Benchmark',
        accuracy: '98.4%'
      },
      recommendations: getSignRecommendations(randomSign),
      image: imagePreview,
      timestamp: new Date().toISOString()
    };

    await new Promise(resolve => setTimeout(resolve, 300));
    setIsAnalyzing(false);
    onClassificationComplete(mockResults);
  };

  const getSignCategory = (sign) => {
    if (sign.includes('Speed Limit')) return 'Regulatory';
    if (['Stop Sign', 'Yield', 'No Entry'].includes(sign)) return 'Warning';
    if (['Turn Right', 'Turn Left', 'One Way'].includes(sign)) return 'Directional';
    if (['Pedestrian Crossing', 'School Zone'].includes(sign)) return 'Information';
    return 'Other';
  };

  const getSignRecommendations = (sign) => {
    const recommendations = {
      'Stop Sign': ['Complete stop required', 'Check all directions', 'Proceed when safe'],
      'Speed Limit 30': ['Reduce speed to 30 km/h', 'School or residential zone', 'Increased pedestrian activity'],
      'Yield': ['Give way to oncoming traffic', 'Proceed when safe', 'Reduce speed'],
      'Pedestrian Crossing': ['Reduce speed', 'Watch for pedestrians', 'Be prepared to stop']
    };
    return recommendations[sign] || ['Follow traffic regulations', 'Drive safely', 'Observe road conditions'];
  };

  const toggleRealTimeDetection = () => {
    setIsRealTimeActive(!isRealTimeActive);
    if (!isRealTimeActive) {
      // Simulate real-time detection
      console.log('Starting real-time traffic sign detection...');
    } else {
      console.log('Stopping real-time detection...');
    }
  };

  const supportedFormats = ['JPEG', 'PNG', 'BMP', 'TIFF'];

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Image Upload</TabsTrigger>
          <TabsTrigger value="realtime">Real-time Detection</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <Card className="border-2 border-dashed transition-all duration-200 hover:border-orange-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Traffic Sign Recognition
              </CardTitle>
              <CardDescription>
                Upload traffic sign images for CNN-based classification and autonomous driving analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`relative p-8 text-center border-2 border-dashed rounded-lg transition-all duration-200 ${
                  dragActive ? 'border-orange-400 bg-orange-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {imagePreview ? (
                  <div className="space-y-4">
                    <img 
                      src={imagePreview} 
                      alt="Traffic sign preview" 
                      className="max-h-64 mx-auto rounded-lg shadow-md border"
                    />
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-green-600 font-medium">Traffic sign image loaded</span>
                    </div>
                    <Button onClick={() => {setSelectedFile(null); setImagePreview(null);}} variant="outline">
                      Choose Different Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-lg font-medium">Drop traffic sign image here</p>
                      <p className="text-gray-500">or click to browse files</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm text-gray-500">Supported formats:</span>
                {supportedFormats.map((format) => (
                  <Badge key={format} variant="secondary">{format}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {selectedFile && (
            <Card>
              <CardHeader>
                <CardTitle>CNN Classification</CardTitle>
                <CardDescription>
                  Convolutional Neural Network will classify the traffic sign for autonomous driving
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isAnalyzing ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Loader2 className="h-5 w-5 animate-spin text-orange-600" />
                      <span className="font-medium">Running CNN classification...</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                    <p className="text-sm text-gray-600 text-center">
                      Processing time: ~2-3 seconds
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        This traffic sign recognition system is designed for autonomous driving applications. 
                        Results should be validated in real-world scenarios.
                      </AlertDescription>
                    </Alert>
                    <Button 
                      onClick={simulateCNNClassification} 
                      className="w-full bg-orange-600 hover:bg-orange-700" 
                      size="lg"
                    >
                      <Car className="h-5 w-5 mr-2" />
                      Classify Traffic Sign
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="realtime" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Real-time Traffic Sign Detection
              </CardTitle>
              <CardDescription>
                Simulate live camera feed for continuous traffic sign recognition
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-100 border-2 border-dashed rounded-lg p-8 text-center min-h-64 flex flex-col items-center justify-center">
                {isRealTimeActive ? (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                      <Camera className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-lg font-medium">Real-time Detection Active</p>
                    <p className="text-gray-600">Scanning for traffic signs...</p>
                    <Badge variant="destructive" className="animate-pulse">LIVE</Badge>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Camera className="h-16 w-16 text-gray-400 mx-auto" />
                    <p className="text-lg font-medium">Camera Feed Inactive</p>
                    <p className="text-gray-600">Start detection to begin scanning</p>
                  </div>
                )}
              </div>

              <Button 
                onClick={toggleRealTimeDetection}
                variant={isRealTimeActive ? "destructive" : "default"}
                className="w-full"
                size="lg"
              >
                {isRealTimeActive ? (
                  <>
                    <Square className="h-5 w-5 mr-2" />
                    Stop Detection
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5 mr-2" />
                    Start Real-time Detection
                  </>
                )}
              </Button>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Real-time detection requires camera access. This demo simulates the detection process.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrafficSignUpload;
