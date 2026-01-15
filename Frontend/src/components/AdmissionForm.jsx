import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const services = [
  "Nursing Asst. Female",
  "Nursing Asst. Male",
  "Health Technician",
];

const courseTypeMap = {
  "Nursing Asst. Female": "NURSING_ASST_FEMALE",
  "Nursing Asst. Male": "NURSING_ASST_MALE",
  "Health Technician": "HEALTH_TECHNICIAN",
};

const buildPayload = (form) => ({
  fullName: form.fullName,
  email: form.email,
  courseType: courseTypeMap[form.service],
  dateOfBirth: form.dob,
  gender: form.gender,
  fatherOrMotherName: form.parentName,
  phoneNumber: form.phone,
  alternatePhoneNumber: form.altPhone,
  aadharNumber: form.aadhar,
  permanentAddress: form.permanentAddress,

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
    reportingContact: e.address || "", // backend expects string
    jobResponsibilities: e.responsibilities,
  })),
});


export default function AdmissionForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    service: services[0],
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

    try {
      const res = await fetch("http://localhost:8080/api/students/register", {
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
            <div>
              <label className={labelClass}>Applied Service</label>
              <select name="service" value={form.service} onChange={handleChange} className={inputClass}>
                {services.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
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

            {/* Add Button Moved to Bottom */}
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

            {/* Add Button Moved to Bottom */}
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