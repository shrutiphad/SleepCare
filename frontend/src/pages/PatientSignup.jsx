import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Activity, User, Heart, FileCheck, ArrowLeft, ArrowRight } from "lucide-react";
import { bloodGroups, healthConditions } from "../data/mock";

export const PatientSignup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Personal
    fullName: "",
    email: "",
    dob: "",
    mobile: "",
    gender: "",
    password: "",
    // Health
    height: "",
    weight: "",
    bloodGroup: "",
    conditions: [],
    // Consents
    termsAccepted: false,
    shareWithCaretaker: false
  });

  const [patientId, setPatientId] = useState("");
  const [age, setAge] = useState(null);
  const [bmi, setBmi] = useState(null);

  useEffect(() => {
    // Generate patient ID
    setPatientId(`PAT-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`);
  }, []);

  useEffect(() => {
    // Calculate age
    if (formData.dob) {
      const today = new Date();
      const birthDate = new Date(formData.dob);
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      setAge(calculatedAge);
    }
  }, [formData.dob]);

  useEffect(() => {
    // Calculate BMI
    if (formData.height && formData.weight) {
      const heightM = parseFloat(formData.height) / 100;
      const weightKg = parseFloat(formData.weight);
      const calculatedBmi = (weightKg / (heightM * heightM)).toFixed(1);
      setBmi(calculatedBmi);
    }
  }, [formData.height, formData.weight]);

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

  const handleConditionToggle = (condition) => {
    const conditions = formData.conditions.includes(condition)
      ? formData.conditions.filter((c) => c !== condition)
      : [...formData.conditions, condition];
    setFormData({ ...formData, conditions });
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
    { number: 1, title: "Personal", icon: User },
    { number: 2, title: "Health", icon: Heart },
    { number: 3, title: "Consents", icon: FileCheck }
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
          <h1 className="text-3xl font-bold text-slate-800">Patient Registration</h1>
          <p className="text-slate-500 mt-2">Create your account to start monitoring your health</p>
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
                  <span className={`text-xs mt-2 font-medium ${isActive ? "text-teal-600" : "text-slate-400"}`}>
                    {s.title}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${isCompleted ? "bg-teal-500" : "bg-slate-200"}`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <Card className="border-0 shadow-xl shadow-slate-200/50 backdrop-blur-sm bg-white/80">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800">
              {step === 1 && "Personal Information"}
              {step === 2 && "Health Information"}
              {step === 3 && "Terms & Consents"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Enter your basic personal details"}
              {step === 2 && "Help us understand your health profile"}
              {step === 3 && "Review and accept the terms"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="patientId" className="text-slate-700">Patient ID</Label>
                      <Input
                        id="patientId"
                        value={patientId}
                        disabled
                        className="h-11 bg-slate-50 text-slate-500 font-mono"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="fullName" className="text-slate-700">Full Name *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="h-11 border-slate-200 focus:border-teal-400"
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
                        className="h-11 border-slate-200 focus:border-teal-400"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="dob" className="text-slate-700">Date of Birth *</Label>
                      <Input
                        id="dob"
                        name="dob"
                        type="date"
                        value={formData.dob}
                        onChange={handleChange}
                        className="h-11 border-slate-200 focus:border-teal-400"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-slate-700">Age</Label>
                      <Input
                        value={age !== null ? `${age} years` : "--"}
                        disabled
                        className="h-11 bg-slate-50 text-slate-500"
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
                        className="h-11 border-slate-200 focus:border-teal-400"
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
                    <div className="col-span-2">
                      <Label htmlFor="password" className="text-slate-700">Password *</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Create a secure password"
                        value={formData.password}
                        onChange={handleChange}
                        className="h-11 border-slate-200 focus:border-teal-400"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Step 2: Health Information */}
              {step === 2 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="height" className="text-slate-700">Height (cm) *</Label>
                      <Input
                        id="height"
                        name="height"
                        type="number"
                        placeholder="165"
                        value={formData.height}
                        onChange={handleChange}
                        className="h-11 border-slate-200 focus:border-teal-400"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="weight" className="text-slate-700">Weight (kg) *</Label>
                      <Input
                        id="weight"
                        name="weight"
                        type="number"
                        placeholder="65"
                        value={formData.weight}
                        onChange={handleChange}
                        className="h-11 border-slate-200 focus:border-teal-400"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-slate-700">BMI</Label>
                      <div className="h-11 px-3 py-2 bg-slate-50 rounded-md border border-slate-200 flex items-center">
                        <span className={`font-medium ${bmi ? (bmi < 18.5 ? "text-amber-500" : bmi < 25 ? "text-emerald-500" : "text-rose-500") : "text-slate-400"}`}>
                          {bmi || "--"}
                        </span>
                        {bmi && (
                          <span className="ml-2 text-sm text-slate-400">
                            ({bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese"})
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label className="text-slate-700">Blood Group *</Label>
                      <Select value={formData.bloodGroup} onValueChange={(v) => handleSelectChange("bloodGroup", v)}>
                        <SelectTrigger className="h-11 border-slate-200">
                          <SelectValue placeholder="Select blood group" />
                        </SelectTrigger>
                        <SelectContent>
                          {bloodGroups.map((bg) => (
                            <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-slate-700 mb-3 block">Health Conditions</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {healthConditions.map((condition) => (
                          <div
                            key={condition}
                            onClick={() => handleConditionToggle(condition)}
                            className={`px-3 py-2 rounded-lg border cursor-pointer transition-all duration-200 ${
                              formData.conditions.includes(condition)
                                ? "bg-teal-50 border-teal-300 text-teal-700"
                                : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            <span className="text-sm">{condition}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Step 3: Consents */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h3 className="font-medium text-slate-800 mb-2">Your Information Summary</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-slate-500">Patient ID:</span> <span className="text-slate-700 font-medium">{patientId}</span></div>
                      <div><span className="text-slate-500">Name:</span> <span className="text-slate-700">{formData.fullName || "--"}</span></div>
                      <div><span className="text-slate-500">Age:</span> <span className="text-slate-700">{age || "--"} years</span></div>
                      <div><span className="text-slate-500">BMI:</span> <span className="text-slate-700">{bmi || "--"}</span></div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-4 bg-white rounded-xl border border-slate-200">
                      <Checkbox
                        id="termsAccepted"
                        checked={formData.termsAccepted}
                        onCheckedChange={(checked) => setFormData({ ...formData, termsAccepted: checked })}
                        className="mt-1"
                      />
                      <div>
                        <Label htmlFor="termsAccepted" className="text-slate-700 cursor-pointer">
                          Accept Terms & Conditions *
                        </Label>
                        <p className="text-sm text-slate-500 mt-1">
                          I agree to the Terms of Service, Privacy Policy, and consent to the collection of my health data for monitoring purposes.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-4 bg-white rounded-xl border border-slate-200">
                      <Checkbox
                        id="shareWithCaretaker"
                        checked={formData.shareWithCaretaker}
                        onCheckedChange={(checked) => setFormData({ ...formData, shareWithCaretaker: checked })}
                        className="mt-1"
                      />
                      <div>
                        <Label htmlFor="shareWithCaretaker" className="text-slate-700 cursor-pointer">
                          Share Data with Caretaker
                        </Label>
                        <p className="text-sm text-slate-500 mt-1">
                          Allow a designated caretaker to access my health monitoring data and receive alerts.
                        </p>
                      </div>
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
                  disabled={step === 3 && !formData.termsAccepted}
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
              <Link to="/login" className="text-teal-600 hover:text-teal-700 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientSignup;
