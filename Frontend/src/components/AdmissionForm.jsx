import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// ✅ Get backend URL from environment variable
const API_BASE_URL = import.meta.env.VITE_BACKEND_URI;

// ✅ Only 2 services now
const services = [
  "Assistant Nursing",
  "Midwifery Course",
];

// ✅ Coaching Centers with fees
const coachingCenters = [
  { id: "uchhal_prabaha", name: "Uchhal Prabaha - Asapur", fee: 20000 },
  { id: "rcs_canning", name: "RCS - Canning", fee: 30000 },
];

// ✅ Updated courseTypeMap with only 2 mappings
const courseTypeMap = {
  "Assistant Nursing": "ASSISTANT_NURSING",
  "Midwifery Course": "MIDWIFERY",
};

// ✅ Hardcoded coachingCourseId mapping
const coachingCourseIdMap = {
  "uchhal_prabaha": 1,
  "rcs_canning": 2,
};

const buildPayload = (form) => {
  const selectedCenter = coachingCenters.find(c => c.id === form.coachingCenter);
  
  return {
    fullName: form.fullName,
    email: form.email,
    courseType: courseTypeMap[form.service],
    coachingCenter: selectedCenter?.name || "",
    courseFee: selectedCenter?.fee || 0,
    dateOfBirth: form.dob,
    gender: form.gender,
    fatherOrMotherName: form.parentName,
    phoneNumber: form.phone,
    alternatePhoneNumber: form.altPhone,
    aadharNumber: form.aadhar,
    permanentAddress: form.permanentAddress,

    // ✅ Hardcoded coachingCourseId based on selected center
    coachingCourseId: coachingCourseIdMap[form.coachingCenter],

    educations: form.education.map((e) => ({
      degreeOrClass: e.className,
      institute: e.institute,
      boardOrUniversity: e.board,
      passingYear: Number(e.year),
      marksOrGrade: e.marks,
      stream: e.stream,
    })),

    workExperiences: form.experience.map((e) => ({
      companyName: e.company,
      designation: e.designation,
      reportingPerson: e.reportingPerson,
      reportingContact: e.address || "",
      jobResponsibilities: e.responsibilities,
    })),
  };
};


export default function AdmissionForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    service: services[0],
    coachingCenter: coachingCenters[0].id,
    fullName: "",
    dob: "",
    gender: "",
    parentName: "",
    permanentAddress: "",
    presentAddress: "",
    phone: "",
    altPhone: "",
    email: "",
    aadhar: "",
    education: [{ id: Date.now(), className: "", institute: "", board: "", year: "", marks: "", stream: "" }],
    experience: [{ id: Date.now(), company: "", address: "", designation: "", reportingPerson: "", responsibilities: "" }],
    agreed: false
  });

  // ✅ Get current selected center fee
  const selectedCenter = coachingCenters.find(c => c.id === form.coachingCenter);
  const courseFee = selectedCenter?.fee || 0;

  // ✅ Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const stateService = location.state?.selectedService;
    const urlParams = new URLSearchParams(location.search);
    const queryService = urlParams.get("service");
    const sessionService = sessionStorage.getItem("selectedService");
    const resolved = stateService || queryService || sessionService;
    if (resolved && services.includes(resolved)) {
      setForm((f) => ({ ...f, service: resolved }));
      sessionStorage.setItem("selectedService", resolved);
    }
  }, [location.search, location.state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const addEducation = () => setForm({ ...form, education: [...form.education, { id: Date.now(), className: "", institute: "", board: "", year: "", marks: "", stream: "" }] });
  const removeEducation = (id) => setForm({ ...form, education: form.education.filter(e => e.id !== id) });
  const handleEduChange = (id, e) => {
    const { name, value } = e.target;
    setForm({ ...form, education: form.education.map(item => item.id === id ? { ...item, [name]: value } : item) });
  };

  const addExperience = () => setForm({ ...form, experience: [...form.experience, { id: Date.now(), company: "", address: "", designation: "", reportingPerson: "", responsibilities: "" }] });
  const removeExperience = (id) => setForm({ ...form, experience: form.experience.filter(e => e.id !== id) });
  const handleExpChange = (id, e) => {
    const { name, value } = e.target;
    setForm({ ...form, experience: form.experience.map(item => item.id === id ? { ...item, [name]: value } : item) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.agreed) {
      alert("Please accept the Terms & Conditions");
      return;
    }

    const payload = buildPayload(form);
    
    // ✅ Log payload for debugging
    console.log("Submitting payload:", payload);

    try {
      const res = await fetch(`${API_BASE_URL}/api/students/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
      }

      const data = await res.json();
      console.log("Registration Success:", data);

      alert("Admission Form Submitted Successfully!");
      navigate("/");
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  // Reusable Professional Styles
  const inputClass = "w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-xl outline-none transition-all duration-200 hover:border-[#4B9B6E] focus:border-[#4B9B6E] focus:ring-4 focus:ring-[#4B9B6E]/10 placeholder:text-gray-400";
  const labelClass = "block mb-1.5 text-xs font-bold text-gray-600 uppercase tracking-wider ml-1";
  const sectionTitleClass = "flex items-center text-xl font-bold text-gray-800 mb-6";
  const cardClass = "p-6 bg-gray-50/50 rounded-[24px] border border-gray-100 relative mb-4";
  const addButtonClass = "w-full py-3 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 font-bold text-sm hover:border-[#4B9B6E] hover:text-[#4B9B6E] hover:bg-[#4B9B6E]/5 transition-all duration-200 flex items-center justify-center gap-2";

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 font-dmsans">
      <div className="max-w-4xl mx-auto bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[32px] overflow-hidden border border-gray-100">

        {/* Header */}
        <div className="bg-[#4B9B6E] px-8 py-10 text-white text-center relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-extrabold tracking-tight uppercase">Admission Application</h1>
            <p className="text-sm font-medium opacity-80 mt-2 italic">Rudraksh Foundation Health Care Training</p>
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-12">

          {/* Course Selection */}
          <section>
            <h2 className={sectionTitleClass}>
              <span className="w-2 h-8 bg-[#4B9B6E] rounded-full mr-3"></span>
              Course Selection
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Assistant Nursing Tile */}
              <div
                onClick={() => setForm({ ...form, service: "Assistant Nursing" })}
                className={`relative cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300 hover:shadow-lg ${
                  form.service === "Assistant Nursing"
                    ? 'border-[#4B9B6E] bg-[#4B9B6E]/5 shadow-md'
                    : 'border-gray-200 bg-white hover:border-[#4B9B6E]/50'
                }`}
              >
                {/* Selected Indicator */}
                <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  form.service === "Assistant Nursing"
                    ? 'border-[#4B9B6E] bg-[#4B9B6E]'
                    : 'border-gray-300 bg-white'
                }`}>
                  {form.service === "Assistant Nursing" && (
                    <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  )}
                </div>

                {/* Course Icon */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${
                  form.service === "Assistant Nursing"
                    ? 'bg-[#4B9B6E] text-white'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                  </svg>
                </div>

                {/* Course Name */}
                <h3 className={`font-bold text-xl mb-2 transition-colors duration-300 ${
                  form.service === "Assistant Nursing" ? 'text-[#4B9B6E]' : 'text-gray-800'
                }`}>
                  Assistant Nursing
                </h3>

                {/* Course Description */}
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                  Learn essential nursing skills including patient care, medical procedures, and healthcare assistance.
                </p>

                {/* Course Duration Badge */}
                <div className="flex items-center gap-3">
                  <div className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                    form.service === "Assistant Nursing"
                      ? 'bg-[#4B9B6E]/20 text-[#4B9B6E]'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    12 Months
                  </div>
                  <div className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                    form.service === "Assistant Nursing"
                      ? 'bg-[#4B9B6E]/20 text-[#4B9B6E]'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    Certified
                  </div>
                </div>
              </div>

              {/* Midwifery Course Tile */}
              <div
                onClick={() => setForm({ ...form, service: "Midwifery Course" })}
                className={`relative cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300 hover:shadow-lg ${
                  form.service === "Midwifery Course"
                    ? 'border-[#4B9B6E] bg-[#4B9B6E]/5 shadow-md'
                    : 'border-gray-200 bg-white hover:border-[#4B9B6E]/50'
                }`}
              >
                {/* Selected Indicator */}
                <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  form.service === "Midwifery Course"
                    ? 'border-[#4B9B6E] bg-[#4B9B6E]'
                    : 'border-gray-300 bg-white'
                }`}>
                  {form.service === "Midwifery Course" && (
                    <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  )}
                </div>

                {/* Course Icon */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${
                  form.service === "Midwifery Course"
                    ? 'bg-[#4B9B6E] text-white'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </div>

                {/* Course Name */}
                <h3 className={`font-bold text-xl mb-2 transition-colors duration-300 ${
                  form.service === "Midwifery Course" ? 'text-[#4B9B6E]' : 'text-gray-800'
                }`}>
                  Midwifery Course
                </h3>

                {/* Course Description */}
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                  Specialized training in maternal and newborn care, childbirth assistance, and prenatal support.
                </p>

                {/* Course Duration Badge */}
                <div className="flex items-center gap-3">
                  <div className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                    form.service === "Midwifery Course"
                      ? 'bg-[#4B9B6E]/20 text-[#4B9B6E]'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    12 Months
                  </div>
                  <div className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                    form.service === "Midwifery Course"
                      ? 'bg-[#4B9B6E]/20 text-[#4B9B6E]'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    Certified
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Course Summary */}
            <div className="mt-6 p-5 bg-gradient-to-r from-[#4B9B6E]/10 to-[#4B9B6E]/5 border border-[#4B9B6E]/20 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#4B9B6E] flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Selected Course</p>
                <p className="text-lg font-bold text-[#4B9B6E]">{form.service}</p>
              </div>
            </div>
          </section>

          {/* Coaching Center Selection */}
          <section>
            <h2 className={sectionTitleClass}>
              <span className="w-2 h-8 bg-[#4B9B6E] rounded-full mr-3"></span>
              Coaching Center
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coachingCenters.map(center => (
                <div
                  key={center.id}
                  onClick={() => setForm({ ...form, coachingCenter: center.id })}
                  className={`relative cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300 hover:shadow-lg ${
                    form.coachingCenter === center.id
                      ? 'border-[#4B9B6E] bg-[#4B9B6E]/5 shadow-md'
                      : 'border-gray-200 bg-white hover:border-[#4B9B6E]/50'
                  }`}
                >
                  {/* Selected Indicator */}
                  <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    form.coachingCenter === center.id
                      ? 'border-[#4B9B6E] bg-[#4B9B6E]'
                      : 'border-gray-300 bg-white'
                  }`}>
                    {form.coachingCenter === center.id && (
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    )}
                  </div>

                  {/* Location Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                    form.coachingCenter === center.id
                      ? 'bg-[#4B9B6E] text-white'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>

                  {/* Center Name */}
                  <h3 className={`font-bold text-lg mb-1 transition-colors duration-300 ${
                    form.coachingCenter === center.id ? 'text-[#4B9B6E]' : 'text-gray-800'
                  }`}>
                    {center.name}
                  </h3>

                  {/* Courses Offered */}
                  <p className="text-xs text-gray-500 mb-4">Assistant Nursing • Midwifery</p>

                  {/* Fee Display */}
                  <div className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                    form.coachingCenter === center.id
                      ? 'bg-[#4B9B6E] text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    <span className="mr-1">₹</span>
                    <span>{center.fee.toLocaleString('en-IN')}</span>
                    <span className="ml-1 font-normal opacity-80">/ course</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Center Summary */}
            <div className="mt-6 p-5 bg-gradient-to-r from-[#4B9B6E]/10 to-[#4B9B6E]/5 border border-[#4B9B6E]/20 rounded-2xl flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#4B9B6E] flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Selected Center</p>
                  <p className="text-sm font-bold text-gray-800">{selectedCenter?.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Course Fee</p>
                <p className="text-2xl font-extrabold text-[#4B9B6E]">₹{courseFee.toLocaleString('en-IN')}</p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-sm text-amber-800 flex items-start gap-2">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                <span><strong>Note:</strong> Both centers offer Assistant Nursing and Midwifery courses. Fee varies by center location.</span>
              </p>
            </div>
          </section>

          {/* Personal Details */}
          <section>
            <h2 className={sectionTitleClass}>
              <span className="w-2 h-8 bg-[#4B9B6E] rounded-full mr-3"></span>
              Personal Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Full Name</label>
                <input name="fullName" placeholder="Full Name" onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Date of Birth</label>
                <input name="dob" type="date" onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Gender</label>
                <select name="gender" onChange={handleChange} required className={inputClass}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Father's / Mother's Name</label>
                <input name="parentName" placeholder="Guardian Name" onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Phone Number</label>
                <input name="phone" placeholder="Primary Contact" onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Alternate Phone Number</label>
                <input name="altPhone" placeholder="Secondary Contact" onChange={handleChange} className={inputClass} />
              </div>
              <div className="md:col-span-1">
                <label className={labelClass}>Email ID</label>
                <input name="email" type="email" placeholder="example@mail.com" onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Aadhar Number</label>
                <input name="aadhar" placeholder="12 Digit Aadhar" onChange={handleChange} required className={inputClass} />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Permanent Address</label>
                <textarea name="permanentAddress" placeholder="Full Address" onChange={handleChange} required className={`${inputClass} h-24 resize-none`} />
              </div>
            </div>
          </section>

          {/* Educational Details */}
          <section>
            <h2 className={sectionTitleClass}>
              <span className="w-2 h-8 bg-[#4B9B6E] rounded-full mr-3"></span>
              Educational Details
            </h2>

            {form.education.map((edu, index) => (
              <div key={edu.id} className={cardClass}>
                {form.education.length > 1 && (
                  <button type="button" onClick={() => removeEducation(edu.id)} className="absolute top-4 right-4 text-red-400 hover:text-red-600 text-xs font-bold bg-white px-2 py-1 rounded-lg border">Remove</button>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className={labelClass}>Class / Degree</label>
                    <input name="className" placeholder="e.g. 10th / 12th" onChange={(e) => handleEduChange(edu.id, e)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>School / Institute</label>
                    <input name="institute" placeholder="Name of School" onChange={(e) => handleEduChange(edu.id, e)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Board / University</label>
                    <input name="board" placeholder="e.g. CBSE / State Board" onChange={(e) => handleEduChange(edu.id, e)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Passing Year</label>
                    <input name="year" placeholder="YYYY" onChange={(e) => handleEduChange(edu.id, e)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Marks / Grade</label>
                    <input name="marks" placeholder="Percentage or GPA" onChange={(e) => handleEduChange(edu.id, e)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Stream</label>
                    <input name="stream" placeholder="Arts / Science / Comm" onChange={(e) => handleEduChange(edu.id, e)} className={inputClass} />
                  </div>
                </div>
              </div>
            ))}

            <button type="button" onClick={addEducation} className={addButtonClass}>
              <span>+</span> Add Another Qualification
            </button>
          </section>

          {/* Working Experience */}
          <section>
            <h2 className={sectionTitleClass}>
              <span className="w-2 h-8 bg-[#4B9B6E] rounded-full mr-3"></span>
              Working Experience
            </h2>

            {form.experience.map((exp) => (
              <div key={exp.id} className={cardClass}>
                {form.experience.length > 1 && (
                  <button type="button" onClick={() => removeExperience(exp.id)} className="absolute top-4 right-4 text-red-400 hover:text-red-600 text-xs font-bold bg-white px-2 py-1 rounded-lg border">Remove</button>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>Name of Company</label>
                    <input name="company" placeholder="Organization Name" onChange={(e) => handleExpChange(exp.id, e)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Designation</label>
                    <input name="designation" placeholder="Job Role" onChange={(e) => handleExpChange(exp.id, e)} className={inputClass} />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>Reporting Person & Contact</label>
                    <input name="reportingPerson" placeholder="Manager Name and Phone" onChange={(e) => handleExpChange(exp.id, e)} className={inputClass} />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>Job Responsibilities</label>
                    <textarea name="responsibilities" placeholder="Key tasks performed..." onChange={(e) => handleExpChange(exp.id, e)} className={`${inputClass} h-24 resize-none`} />
                  </div>
                </div>
              </div>
            ))}

            <button type="button" onClick={addExperience} className={addButtonClass}>
              <span>+</span> Add Another Experience
            </button>
          </section>

          {/* Terms & Conditions */}
          <section className="bg-[#F1F5F9] p-8 rounded-[32px] border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4 uppercase tracking-wider">Declaration</h2>
            <div className="text-[12px] text-gray-500 space-y-3 h-32 overflow-y-auto pr-4 leading-relaxed custom-scrollbar">
              <p>I certify that the information furnished in this application form is true, I authorize the trust to carry out any kind of verification for my candidature.</p>
              <p>The course fee is non‑refundable once admission is confirmed.</p>
              <p>Students must maintain at least 75% attendance in classroom sessions.</p>
              <p>Hospital internship is compulsory and may be paid or unpaid depending on hospital policy.</p>
              <p>Certification will be provided only after successful completion of 6 months theory + 6 months internship.</p>
            </div>
            <label className="flex items-center gap-4 mt-6 cursor-pointer group">
              <input type="checkbox" name="agreed" checked={form.agreed} onChange={handleChange} required className="h-6 w-6 rounded-lg border-gray-300 text-[#4B9B6E] focus:ring-[#4B9B6E] cursor-pointer" />
              <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">I agree to the terms and conditions mentioned above</span>
            </label>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 pt-4">
            <button type="submit" className="flex-[2] bg-[#4B9B6E] text-white font-bold py-4 rounded-2xl shadow-xl hover:shadow-[#4B9B6E]/30 hover:scale-[1.01] active:scale-95 transition-all duration-300">
              Submit Application
            </button>
            <button type="button" onClick={() => navigate(-1)} className="flex-1 px-8 py-4 border-2 border-gray-200 text-gray-500 font-bold rounded-2xl hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}