
import React from 'react';
import { BarChart3, TrendingUp, Users, Activity, Calendar, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const Dashboard = () => {
  // Mock data for charts
  const weeklyAnalysis = [
    { day: 'Mon', scans: 45, normal: 38, abnormal: 7 },
    { day: 'Tue', scans: 52, normal: 44, abnormal: 8 },
    { day: 'Wed', scans: 38, normal: 31, abnormal: 7 },
    { day: 'Thu', scans: 61, normal: 53, abnormal: 8 },
    { day: 'Fri', scans: 55, normal: 48, abnormal: 7 },
    { day: 'Sat', scans: 28, normal: 25, abnormal: 3 },
    { day: 'Sun', scans: 35, normal: 31, abnormal: 4 }
  ];

  const conditionDistribution = [
    { name: 'Normal', value: 78, color: '#10B981' },
    { name: 'Pneumonia', value: 15, color: '#EF4444' },
    { name: 'Other', value: 7, color: '#F59E0B' }
  ];

  const accuracyTrend = [
    { month: 'Jan', accuracy: 94.2 },
    { month: 'Feb', accuracy: 95.1 },
    { month: 'Mar', accuracy: 96.8 },
    { month: 'Apr', accuracy: 97.2 },
    { month: 'May', accuracy: 98.1 }
  ];

  const recentAnalyses = [
    { id: 1, patient: 'Patient #1247', condition: 'Normal', confidence: 94.2, timestamp: '2 hours ago' },
    { id: 2, patient: 'Patient #1248', condition: 'Pneumonia', confidence: 87.6, timestamp: '3 hours ago' },
    { id: 3, patient: 'Patient #1249', condition: 'Normal', confidence: 91.8, timestamp: '4 hours ago' },
    { id: 4, patient: 'Patient #1250', condition: 'Other', confidence: 76.4, timestamp: '5 hours ago' }
  ];

  const systemMetrics = [
    { label: 'Model Accuracy', value: 98.1, change: '+2.3%', trend: 'up' },
    { label: 'Processing Speed', value: 2.1, unit: 's', change: '-0.4s', trend: 'up' },
    { label: 'Daily Scans', value: 314, change: '+12%', trend: 'up' },
    { label: 'System Uptime', value: 99.9, unit: '%', change: '+0.1%', trend: 'up' }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
              {metric.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-600" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metric.value}{metric.unit}
              </div>
              <p className="text-xs text-green-600 font-medium">
                {metric.change} from last week
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Analysis Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Weekly Analysis Volume
            </CardTitle>
            <CardDescription>Number of scans processed daily</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyAnalysis}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="normal" stackId="a" fill="#10B981" name="Normal" />
                <Bar dataKey="abnormal" stackId="a" fill="#EF4444" name="Abnormal" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Condition Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Condition Distribution</CardTitle>
            <CardDescription>Breakdown of diagnosis results</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={conditionDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {conditionDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {conditionDistribution.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Accuracy Trend & Recent Analyses */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Model Accuracy Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Model Accuracy Trend</CardTitle>
            <CardDescription>Monthly accuracy improvements</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={accuracyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="accuracy" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Analyses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Analyses
            </CardTitle>
            <CardDescription>Latest diagnostic results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAnalyses.map((analysis) => (
                <div key={analysis.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{analysis.patient}</p>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={analysis.condition === 'Normal' ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {analysis.condition}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {analysis.confidence}% confidence
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{analysis.timestamp}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            System Status
          </CardTitle>
          <CardDescription>Current system health and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">CPU Usage</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <Progress value={45} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Memory Usage</span>
                <span className="text-sm font-medium">62%</span>
              </div>
              <Progress value={62} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Model Load</span>
                <span className="text-sm font-medium">78%</span>
              </div>
              <Progress value={78} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
