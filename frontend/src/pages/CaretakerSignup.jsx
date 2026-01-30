import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Activity, User, Link2, FileCheck, ArrowLeft, ArrowRight, Users } from "lucide-react";
import { relationships } from "../data/mock";

export const CaretakerSignup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Details
    fullName: "",
    email: "",
    mobile: "",
    gender: "",
    dob: "",
    password: "",
    // Relationship
    relationship: "",
    isPrimary: false,
    availability: "",
    // Patient Linking
    patientId: "",
    patientDob: "",
    patientConsent: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    setIsLoading(true);
    // Simulate signup - will integrate with backend later
    setTimeout(() => {
      setIsLoading(false);
      navigate("/mode-select");
    }, 1500);
  };

  const steps = [
    { number: 1, title: "Details", icon: User },
    { number: 2, title: "Relationship", icon: Users },
    { number: 3, title: "Link Patient", icon: Link2 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 py-8 px-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-100 rounded-full opacity-40 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-100 rounded-full opacity-40 blur-3xl" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate("/role-select")}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-600 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to role selection
          </button>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl shadow-lg shadow-teal-200 mb-4">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800">Caretaker Registration</h1>
          <p className="text-slate-500 mt-2">Create your account to monitor your loved ones</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((s, idx) => {
            const IconComponent = s.icon;
            const isActive = step === s.number;
            const isCompleted = step > s.number;
            return (
              <React.Fragment key={s.number}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                      ? "bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-200"
                      : isCompleted
                      ? "bg-teal-500 text-white"
                      : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {isCompleted ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <IconComponent className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${isActive ? "text-cyan-600" : "text-slate-400"}`}>
                    {s.title}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${isCompleted ? "bg-cyan-500" : "bg-slate-200"}`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <Card className="border-0 shadow-xl shadow-slate-200/50 backdrop-blur-sm bg-white/80">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800">
              {step === 1 && "Personal Details"}
              {step === 2 && "Relationship Information"}
              {step === 3 && "Link to Patient"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Enter your basic information"}
              {step === 2 && "Tell us about your relationship with the patient"}
              {step === 3 && "Connect your account to a patient"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Step 1: Personal Details */}
              {step === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="fullName" className="text-slate-700">Full Name *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="h-11 border-slate-200 focus:border-cyan-400"
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="email" className="text-slate-700">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="h-11 border-slate-200 focus:border-cyan-400"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="mobile" className="text-slate-700">Mobile *</Label>
                      <Input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="h-11 border-slate-200 focus:border-cyan-400"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-slate-700">Gender *</Label>
                      <Select value={formData.gender} onValueChange={(v) => handleSelectChange("gender", v)}>
                        <SelectTrigger className="h-11 border-slate-200">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="dob" className="text-slate-700">Date of Birth *</Label>
                      <Input
                        id="dob"
                        name="dob"
                        type="date"
                        value={formData.dob}
                        onChange={handleChange}
                        className="h-11 border-slate-200 focus:border-cyan-400"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="password" className="text-slate-700">Password *</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Create password"
                        value={formData.password}
                        onChange={handleChange}
                        className="h-11 border-slate-200 focus:border-cyan-400"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Step 2: Relationship Information */}
              {step === 2 && (
                <>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-slate-700">Relationship with Patient *</Label>
                      <Select value={formData.relationship} onValueChange={(v) => handleSelectChange("relationship", v)}>
                        <SelectTrigger className="h-11 border-slate-200">
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          {relationships.map((rel) => (
                            <SelectItem key={rel} value={rel}>{rel}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-start space-x-3 p-4 bg-white rounded-xl border border-slate-200">
                      <Checkbox
                        id="isPrimary"
                        checked={formData.isPrimary}
                        onCheckedChange={(checked) => setFormData({ ...formData, isPrimary: checked })}
                        className="mt-1"
                      />
                      <div>
                        <Label htmlFor="isPrimary" className="text-slate-700 cursor-pointer">
                          Primary Caretaker
                        </Label>
                        <p className="text-sm text-slate-500 mt-1">
                          As primary caretaker, you'll receive all alerts and have full access to patient data.
                        </p>
                      </div>
                    </div>

                    <div>
                      <Label className="text-slate-700">Availability *</Label>
                      <Select value={formData.availability} onValueChange={(v) => handleSelectChange("availability", v)}>
                        <SelectTrigger className="h-11 border-slate-200">
                          <SelectValue placeholder="Select availability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="24/7">24/7 - Always Available</SelectItem>
                          <SelectItem value="daytime">Daytime Only (6AM - 10PM)</SelectItem>
                          <SelectItem value="nighttime">Nighttime Only (10PM - 6AM)</SelectItem>
                          <SelectItem value="weekdays">Weekdays Only</SelectItem>
                          <SelectItem value="weekends">Weekends Only</SelectItem>
                          <SelectItem value="custom">Custom Schedule</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </>
              )}

              {/* Step 3: Link to Patient */}
              {step === 3 && (
                <div className="space-y-5">
                  <div className="p-4 bg-cyan-50 rounded-xl border border-cyan-200">
                    <div className="flex items-start gap-3">
                      <Link2 className="w-5 h-5 text-cyan-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-slate-800">Patient Linking</h3>
                        <p className="text-sm text-slate-600 mt-1">
                          Enter the patient's credentials to link your accounts. The patient must have already registered and provided consent.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="patientId" className="text-slate-700">Patient ID *</Label>
                    <Input
                      id="patientId"
                      name="patientId"
                      placeholder="PAT-2025-XXXX"
                      value={formData.patientId}
                      onChange={handleChange}
                      className="h-11 border-slate-200 focus:border-cyan-400 font-mono"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="patientDob" className="text-slate-700">Patient's Date of Birth *</Label>
                    <Input
                      id="patientDob"
                      name="patientDob"
                      type="date"
                      value={formData.patientDob}
                      onChange={handleChange}
                      className="h-11 border-slate-200 focus:border-cyan-400"
                      required
                    />
                    <p className="text-xs text-slate-500 mt-1">Used for verification purposes</p>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-white rounded-xl border border-slate-200">
                    <Checkbox
                      id="patientConsent"
                      checked={formData.patientConsent}
                      onCheckedChange={(checked) => setFormData({ ...formData, patientConsent: checked })}
                      className="mt-1"
                    />
                    <div>
                      <Label htmlFor="patientConsent" className="text-slate-700 cursor-pointer">
                        Confirm Patient Consent *
                      </Label>
                      <p className="text-sm text-slate-500 mt-1">
                        I confirm that I have the patient's consent to access their health monitoring data and receive alerts about their condition.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-3 pt-4">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    className="flex-1 h-11 border-slate-200"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                )}
                <Button
                  type="submit"
                  className={`flex-1 h-11 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white shadow-lg shadow-teal-200 ${step === 3 && !formData.termsAccepted ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={step === 3 && !formData.patientConsent}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating account...
                    </span>
                  ) : step < 3 ? (
                    <>
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </div>
            </form>

            <p className="text-center text-sm text-slate-500 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-cyan-600 hover:text-cyan-700 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CaretakerSignup;
