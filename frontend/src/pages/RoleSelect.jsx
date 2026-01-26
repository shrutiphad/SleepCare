import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Activity, User, Users, ArrowRight, Shield, HeartPulse } from "lucide-react";

export const RoleSelect = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: "patient",
      title: "Patient",
      description: "Monitor your own health metrics and sleep patterns",
      icon: User,
      features: ["Personal health dashboard", "Real-time vital monitoring", "Sleep analysis reports"],
      gradient: "from-teal-500 to-cyan-500",
      shadowColor: "shadow-teal-200",
      bgHover: "hover:border-teal-300",
      route: "/signup/patient"
    },
    {
      id: "caretaker",
      title: "Caretaker",
      description: "Monitor and care for your loved ones remotely",
      icon: Users,
      features: ["Remote patient monitoring", "Alert notifications", "Health reports access"],
      gradient: "from-cyan-500 to-blue-500",
      shadowColor: "shadow-cyan-200",
      bgHover: "hover:border-cyan-300",
      route: "/signup/caretaker"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-teal-100 rounded-full opacity-30 blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-cyan-100 rounded-full opacity-30 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-50 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="w-full max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl shadow-xl shadow-teal-200 mb-6">
            <Activity className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-3">Choose Your Role</h1>
          <p className="text-lg text-slate-500 max-w-md mx-auto">
            Select how you'll be using SleepCare to get started with personalized features
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <Card
                key={role.id}
                onClick={() => navigate(role.route)}
                className={`group cursor-pointer border-2 border-slate-100 ${role.bgHover} bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <CardHeader className="pb-4">
                  <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${role.gradient} rounded-2xl ${role.shadowColor} shadow-lg mb-4`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-slate-800 flex items-center justify-between">
                    {role.title}
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-teal-500 group-hover:translate-x-1 transition-all duration-200" />
                  </CardTitle>
                  <CardDescription className="text-slate-500 text-base">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {role.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-slate-600">
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${role.gradient} flex items-center justify-center`}>
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-slate-400">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <span className="text-sm">HIPAA Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <HeartPulse className="w-5 h-5" />
            <span className="text-sm">Medical Grade Monitoring</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            <span className="text-sm">Real-time Analytics</span>
          </div>
        </div>

        <p className="text-center text-sm text-slate-400 mt-8">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="text-teal-600 hover:text-teal-700 font-medium transition-colors">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default RoleSelect;
