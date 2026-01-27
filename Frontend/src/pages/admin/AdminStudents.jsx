import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Modal State for viewing details
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  // Reset pagination when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/api/students`
      );

      if (response.data.success) {
        setStudents(response.data.data);
      } else {
        setError(response.data.message || 'Failed to fetch students');
      }
    } catch (err) {
      console.error("Error fetching students:", err);
      setError('Error connecting to the server. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(student => {
    const term = searchTerm.toLowerCase();
    return (
      (student.fullName && student.fullName.toLowerCase().includes(term)) ||
      (student.email && student.email.toLowerCase().includes(term)) ||
      (student.phoneNumber && student.phoneNumber.includes(term))
    );
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const openModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 font-literata">Students Management</h1>
          <p className="text-gray-500 mt-1">View and manage student details</p>
        </div>
        <button 
          onClick={fetchStudents} 
          className="px-4 py-2 bg-[#4B9B6E] text-white rounded-lg hover:bg-[#3d825b] transition-colors flex items-center gap-2 shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh Data
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4B9B6E] focus:border-transparent transition-all outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#4B9B6E] border-t-transparent"></div>
            <p className="mt-2 text-gray-500">Loading students...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-500 bg-red-50 m-4 rounded-lg">
            <p className="font-medium">Error</p>
            <p className="text-sm mt-1">{error}</p>
            <button 
              onClick={fetchStudents}
              className="mt-3 text-sm text-[#4B9B6E] hover:underline"
            >
              Try Again
            </button>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p className="mt-4 text-lg font-medium">No students found</p>
            <p className="text-sm">Try adjusting your search.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Student Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Course Info</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Location</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((student) => (
                    <tr key={student.userId} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                            {student.fullName ? student.fullName.slice(0, 2).toUpperCase() : 'NA'}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{student.fullName}</div>
                            <div className="text-xs text-gray-500">{student.gender}, DOB: {student.dateOfBirth}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{student.email}</div>
                        <div className="text-sm text-gray-500">{student.phoneNumber}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.courseType ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {student.courseType}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-500">-</span>
                        )}
                        <div className="text-xs text-gray-500 mt-1">{student.coachingCenterName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.permanentAddress || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => openModal(student)}
                          className="text-[#4B9B6E] hover:text-[#3d825b] hover:bg-green-50 px-3 py-1 rounded transition-colors"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to <span className="font-medium">{Math.min(indexOfLastItem, filteredStudents.length)}</span> of <span className="font-medium">{filteredStudents.length}</span> results
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded border ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, idx) => (
                    <button
                      key={idx + 1}
                      onClick={() => handlePageChange(idx + 1)}
                      className={`px-3 py-1 rounded border ${
                        currentPage === idx + 1
                          ? 'bg-[#4B9B6E] text-white border-[#4B9B6E]'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded border ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Student Details Modal */}
      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              aria-hidden="true"
              onClick={closeModal}
            ></div>

            {/* Modal panel */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center border-b pb-3 mb-4">
                      <h3 className="text-xl leading-6 font-medium text-gray-900" id="modal-title">
                        Student Details
                      </h3>
                      <button onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                      {/* Personal Info */}
                      <div className="col-span-2 bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-semibold text-gray-700 mb-2 border-b border-gray-200 pb-1">Personal Information</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div><span className="text-xs text-gray-500 block">Full Name</span> <span className="text-sm font-medium">{selectedStudent.fullName}</span></div>
                            <div><span className="text-xs text-gray-500 block">Email</span> <span className="text-sm font-medium">{selectedStudent.email}</span></div>
                            <div><span className="text-xs text-gray-500 block">Phone</span> <span className="text-sm font-medium">{selectedStudent.phoneNumber}</span></div>
                            <div><span className="text-xs text-gray-500 block">Alt. Phone</span> <span className="text-sm font-medium">{selectedStudent.alternatePhoneNumber || '-'}</span></div>
                            <div><span className="text-xs text-gray-500 block">Date of Birth</span> <span className="text-sm font-medium">{selectedStudent.dateOfBirth}</span></div>
                            <div><span className="text-xs text-gray-500 block">Gender</span> <span className="text-sm font-medium">{selectedStudent.gender}</span></div>
                            <div><span className="text-xs text-gray-500 block">Parent Name</span> <span className="text-sm font-medium">{selectedStudent.fatherOrMotherName}</span></div>
                            <div><span className="text-xs text-gray-500 block">Aadhar</span> <span className="text-sm font-medium">{selectedStudent.aadharNumber}</span></div>
                            <div className="col-span-2"><span className="text-xs text-gray-500 block">Address</span> <span className="text-sm font-medium">{selectedStudent.permanentAddress}</span></div>
                        </div>
                      </div>

                      {/* Course Info */}
                      <div className="col-span-2 bg-blue-50 p-3 rounded-lg">
                        <h4 className="font-semibold text-gray-700 mb-2 border-b border-blue-200 pb-1">Course & Coaching</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div><span className="text-xs text-gray-500 block">Course Type</span> <span className="text-sm font-medium">{selectedStudent.courseType || 'N/A'}</span></div>
                            <div><span className="text-xs text-gray-500 block">Coaching Center</span> <span className="text-sm font-medium">{selectedStudent.coachingCenterName || 'N/A'}</span></div>
                            <div><span className="text-xs text-gray-500 block">Course Fee</span> <span className="text-sm font-medium">{selectedStudent.courseFee ? `₹${selectedStudent.courseFee}` : 'N/A'}</span></div>
                        </div>
                      </div>

                      {/* Education */}
                      <div className="col-span-2">
                        <h4 className="font-semibold text-gray-700 mb-2">Education History</h4>
                        {selectedStudent.educations && selectedStudent.educations.length > 0 ? (
                            <div className="overflow-x-auto border rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Degree</th>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Institute</th>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Year</th>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {selectedStudent.educations.map((edu, idx) => (
                                            <tr key={idx}>
                                                <td className="px-3 py-2 text-sm">{edu.degreeOrClass}</td>
                                                <td className="px-3 py-2 text-sm">{edu.institute}</td>
                                                <td className="px-3 py-2 text-sm">{edu.passingYear}</td>
                                                <td className="px-3 py-2 text-sm">{edu.marksOrGrade}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 italic">No education details available.</p>
                        )}
                      </div>

                      {/* Work Experience */}
                      <div className="col-span-2">
                        <h4 className="font-semibold text-gray-700 mb-2">Work Experience</h4>
                        {selectedStudent.workExperiences && selectedStudent.workExperiences.length > 0 ? (
                            <div className="space-y-3">
                                {selectedStudent.workExperiences.map((work, idx) => (
                                    <div key={idx} className="border rounded-lg p-3 bg-gray-50">
                                        <div className="flex justify-between">
                                            <h5 className="font-medium text-sm text-gray-900">{work.designation}</h5>
                                            <span className="text-sm text-gray-600">{work.companyName}</span>
                                        </div>
                                        <div className="mt-1 text-xs text-gray-500">
                                            Reporting to: {work.reportingPerson} {work.reportingContact && `(${work.reportingContact})`}
                                        </div>
                                        {work.jobResponsibilities && (
                                            <div className="mt-2 text-xs text-gray-600">
                                                <span className="font-medium">Responsibilities:</span> {work.jobResponsibilities}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 italic">No work experience available.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button 
                  type="button" 
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#4B9B6E] text-base font-medium text-white hover:bg-[#3d825b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStudents;
