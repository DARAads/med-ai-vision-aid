
import React, { useState, useCallback } from 'react';
import { Upload, Image, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

const ImageUpload = ({ onDiagnosisComplete }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

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
      
      // Create preview
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

  const simulateAIAnalysis = async () => {
    setIsAnalyzing(true);
    setProgress(0);

    // Simulate AI processing with progress updates
    const progressSteps = [
      { step: 10, message: 'Preprocessing image...' },
      { step: 30, message: 'Loading CNN model...' },
      { step: 50, message: 'Extracting features...' },
      { step: 70, message: 'Running inference...' },
      { step: 90, message: 'Analyzing results...' },
      { step: 100, message: 'Complete!' }
    ];

    for (const { step } of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProgress(step);
    }

    // Simulate diagnosis results
    const mockResults = {
      prediction: 'Normal',
      confidence: 0.892,
      conditions: [
        { name: 'Normal', probability: 0.892, severity: 'none' },
        { name: 'Pneumonia', probability: 0.087, severity: 'moderate' },
        { name: 'Other Pathology', probability: 0.021, severity: 'low' }
      ],
      recommendations: [
        'No immediate concerns detected in this chest X-ray',
        'Regular monitoring recommended for optimal health',
        'Consult with healthcare provider for comprehensive evaluation'
      ],
      technicalDetails: {
        model: 'ChestX-CNN v2.1',
        inputSize: '224x224',
        processingTime: '2.3s',
        datasetTrained: '112,000+ chest X-rays'
      },
      image: imagePreview,
      timestamp: new Date().toISOString()
    };

    await new Promise(resolve => setTimeout(resolve, 500));
    setIsAnalyzing(false);
    onDiagnosisComplete(mockResults);
  };

  const supportedFormats = ['DICOM', 'PNG', 'JPEG', 'TIFF'];

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card className="border-2 border-dashed transition-all duration-200 hover:border-blue-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            Medical Image Upload
          </CardTitle>
          <CardDescription>
            Upload chest X-rays, MRI scans, or CT images for AI-powered diagnosis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`relative p-8 text-center border-2 border-dashed rounded-lg transition-all duration-200 ${
              dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
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
                  alt="Medical scan preview" 
                  className="max-h-64 mx-auto rounded-lg shadow-md"
                />
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-600 font-medium">Image loaded successfully</span>
                </div>
                <Button onClick={() => {setSelectedFile(null); setImagePreview(null);}} variant="outline">
                  Choose Different Image
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium">Drop your medical image here</p>
                  <p className="text-gray-500">or click to browse files</p>
                </div>
                <input
                  type="file"
                  accept="image/*,.dcm"
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

      {/* Analysis Section */}
      {selectedFile && (
        <Card>
          <CardHeader>
            <CardTitle>AI Analysis</CardTitle>
            <CardDescription>
              Deep learning model will analyze your medical image for potential conditions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isAnalyzing ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                  <span className="font-medium">Analyzing image with AI...</span>
                </div>
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-gray-600 text-center">
                  Processing time: ~3-5 seconds
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    This AI diagnosis tool is for educational and research purposes. 
                    Always consult with qualified healthcare professionals for medical decisions.
                  </AlertDescription>
                </Alert>
                <Button 
                  onClick={simulateAIAnalysis} 
                  className="w-full" 
                  size="lg"
                >
                  <Brain className="h-5 w-5 mr-2" />
                  Start AI Diagnosis
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImageUpload;
