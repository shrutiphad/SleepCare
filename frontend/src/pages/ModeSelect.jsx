import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Activity, Heart, Brain, Wind, ArrowRight, LogOut, User, Settings, Bell } from "lucide-react";
import { Button } from "../components/ui/button";
import { mockPatient, mockMonitoringModes } from "../data/mock";

export const ModeSelect = () => {
  const navigate = useNavigate();

  const iconMap = {
    Activity: Activity,
    Heart: Heart,
    Brain: Brain,
    Wind: Wind
  };

  const colorMap = {
    emerald: {
      gradient: "from-emerald-500 to-teal-500",
      shadow: "shadow-emerald-200",
      border: "hover:border-emerald-300",
      bg: "bg-emerald-50",
      text: "text-emerald-600"
    },
    rose: {
      gradient: "from-rose-500 to-red-500",
      shadow: "shadow-rose-200",
      border: "hover:border-rose-300",
      bg: "bg-rose-50",
      text: "text-rose-600"
    },
    violet: {
      gradient: "from-indigo-500 to-violet-500",
      shadow: "shadow-indigo-200",
      border: "hover:border-indigo-300",
      bg: "bg-indigo-50",
      text: "text-indigo-600"
    },
    sky: {
      gradient: "from-sky-500 to-blue-500",
      shadow: "shadow-sky-200",
      border: "hover:border-sky-300",
      bg: "bg-sky-50",
      text: "text-sky-600"
    }
  };

  const handleModeSelect = (modeId) => {
    navigate(`/monitor/${modeId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">SleepCare</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {mockPatient.fullName.charAt(0)}
                </div>
                <span className="text-sm font-medium text-slate-700 hidden sm:block">{mockPatient.fullName}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/login")}
                className="text-slate-500 hover:text-slate-700"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Select Detection Mode</h1>
          <p className="text-lg text-slate-500">Choose a monitoring mode based on your health needs</p>
        </div>

        {/* Patient Info Card */}
        <Card className="mb-8 border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                  {mockPatient.fullName.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-800">{mockPatient.fullName}</h2>
                  <p className="text-slate-500">Patient ID: {mockPatient.id}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-800">{mockPatient.age}</p>
                  <p className="text-sm text-slate-500">Age</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-800">{mockPatient.gender}</p>
                  <p className="text-sm text-slate-500">Gender</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-800">{mockPatient.bloodGroup}</p>
                  <p className="text-sm text-slate-500">Blood</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mode Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockMonitoringModes.map((mode) => {
            const IconComponent = iconMap[mode.icon];
            const colors = colorMap[mode.color];
            return (
              <Card
                key={mode.id}
                onClick={() => handleModeSelect(mode.id)}
                className={`group cursor-pointer border-2 border-slate-100 ${colors.border} bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`w-14 h-14 bg-gradient-to-br ${colors.gradient} rounded-2xl ${colors.shadow} shadow-lg flex items-center justify-center`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <ArrowRight className={`w-5 h-5 text-slate-300 group-hover:${colors.text} group-hover:translate-x-1 transition-all duration-200`} />
                  </div>
                  <CardTitle className="text-xl text-slate-800 mt-4">{mode.name}</CardTitle>
                  <CardDescription className="text-slate-500">
                    {mode.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {mode.sensors.map((sensor, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 ${colors.bg} ${colors.text} text-sm rounded-full font-medium`}
                      >
                        {sensor}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Device Status */}
        <Card className="mt-8 border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                    <Activity className="w-6 h-6 text-slate-600" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Smart Health Mat</h3>
                  <p className="text-sm text-slate-500">Device ID: MAT-2025-001</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  Connected
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ModeSelect;
