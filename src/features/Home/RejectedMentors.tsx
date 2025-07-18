import { useEffect, useState } from 'react';
import img1 from '../../assets/images/head-shot-portrait-close-smiling-260nw-1714666150.webp';

const RejectedMentors = () => {
    const [mentors, setMentors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedMentor, setSelectedMentor] = useState<any>(null);

    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 6;
    const [totalPages, setTotalPages] = useState(1);

    const fetchMentors = async (page: number) => {
        setLoading(true);
        try {
            const res = await fetch(
                `http://academix1.runasp.net/api/GetTeachers?status=1&pageNumber=${page}&pageSize=${pageSize}`
            );
            const data = await res.json();

            let mentorsList: any[] = [];

            if (Array.isArray(data)) {
                mentorsList = data;
            } else if (Array.isArray(data?.data?.teachers)) {
                mentorsList = data.data.teachers;
                if (data.data.totalPages) {
                    setTotalPages(data.data.totalPages);
                }
            }

            setMentors(mentorsList);
        } catch (err) {
            console.error('Fetch Error:', err);
            setError('فشل تحميل البيانات');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMentors(pageNumber);
    }, [pageNumber]);

    const handleNext = () => {
        if (pageNumber < totalPages) {
            setPageNumber((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (pageNumber > 1) {
            setPageNumber((prev) => prev - 1);
        }
    };

    if (loading) return <p className="text-center p-8 text-gray-500">جاري تحميل البيانات...</p>;
    if (error) return <p className="text-center p-8 text-red-500">{error}</p>;

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" dir="rtl">
                {mentors.map((mentor, i) => (
                    <div
                        key={i}
                        className="bg-white p-5 rounded-lg shadow-sm border hover:shadow-md transition-all duration-300"
                    >
                        <img
                            src={mentor.profilePictureUrl || img1}
                            alt="mentor"
                            className="w-full h-44 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-lg font-bold text-gray-800 mb-1">
                            {mentor.firstName} {mentor.lastName}
                        </h3>
                        <p className="text-sm text-gray-500 mb-3">الحالة: مرفوض</p>
                        <button
                            className="w-full bg-blue-100 hover:bg-blue-200 text-blue-600 py-2 rounded-md font-semibold transition"
                            onClick={() => setSelectedMentor(mentor)}
                        >
                            عرض
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex justify-center items-center gap-2 mt-6" dir="rtl">
                <button
                    className={`px-3 py-2 border rounded ${pageNumber === 1 ? 'text-gray-400 border-gray-300 cursor-not-allowed' : 'text-blue-600 border-gray-400 hover:bg-gray-100'
                        }`}
                    onClick={handlePrev}
                    disabled={pageNumber === 1}
                >
                    «
                </button>

                {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    return (
                        <button
                            key={page}
                            className={`px-3 py-2 border rounded ${pageNumber === page
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'text-blue-600 border-gray-400 hover:bg-gray-100'
                                }`}
                            onClick={() => setPageNumber(page)}
                        >
                            {page}
                        </button>
                    );
                })}

                <button
                    className={`px-3 py-2 border rounded ${pageNumber === totalPages ? 'text-gray-400 border-gray-300 cursor-not-allowed' : 'text-blue-600 border-gray-400 hover:bg-gray-100'
                        }`}
                    onClick={handleNext}
                    disabled={pageNumber === totalPages}
                >
                    »
                </button>
            </div>

            {selectedMentor && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-2xl text-right overflow-y-auto max-h-screen">
                        <h2 className="text-xl font-bold mb-4 text-blue-800">
                            تفاصيل المنتور {selectedMentor.firstName} {selectedMentor.lastName}
                        </h2>

                        {selectedMentor.bio && (
                            <div className="mb-4">
                                <h3 className="font-semibold text-blue-600 mb-2">نبذة تعريفية</h3>
                                <div className="bg-gray-50 p-4 rounded shadow-sm text-sm text-gray-700">
                                    {selectedMentor.bio}
                                </div>
                            </div>
                        )}

                        {selectedMentor.specialists?.length > 0 && (
                            <div className="mb-4">
                                <h3 className="font-semibold text-blue-600 mb-2">المجالات</h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedMentor.specialists.map((spec: any, idx: number) => (
                                        <span key={idx} className="bg-blue-100 text-blue-700 rounded-full px-4 py-1 text-sm">
                                            {spec.nameEn}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {selectedMentor.skills?.length > 0 && (
                            <div className="mb-4">
                                <h3 className="font-semibold text-blue-600 mb-2">المهارات</h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedMentor.skills.map((skill: any, idx: number) => (
                                        <span key={idx} className="bg-blue-100 text-blue-700 rounded-full px-4 py-1 text-sm">
                                            {skill.skillName}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {selectedMentor.certificates?.length > 0 && (
                            <div className="mb-4">
                                <h3 className="font-semibold text-blue-600 mb-2">الشهادات</h3>
                                <div className="space-y-3">
                                    {selectedMentor.certificates.map((cert: any, idx: number) => (
                                        <div
                                            key={idx}
                                            className="flex flex-col md:flex-row md:items-center md:justify-between bg-gray-100 p-4 rounded shadow-md text-sm text-gray-700 gap-2"
                                        >
                                            <span className="md:w-1/3"><strong>الشهادة:</strong> {cert.name || 'غير متوفر'}</span>
                                            <span className="md:w-1/3"><strong>الجهة المانحة:</strong> {cert.issuedBy || 'غير متوفر'}</span>
                                            <span className="md:w-1/3">
                                                <strong>الرابط:</strong>{' '}
                                                {cert.certificateUrl ? (
                                                    <a
                                                        href={cert.certificateUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 underline"
                                                    >
                                                        عرض الشهادة
                                                    </a>
                                                ) : (
                                                    'غير متوفر'
                                                )}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {selectedMentor.teacherEducations?.length > 0 && (
                            <div className="mb-4">
                                <h3 className="font-semibold text-blue-600 mb-2">المؤهلات التعليمية</h3>
                                <div className="space-y-2">
                                    {selectedMentor.teacherEducations.map((edu: any, idx: number) => (
                                        <div
                                            key={idx}
                                            className="flex flex-col md:flex-row md:items-center md:justify-between bg-gray-100 p-3 rounded shadow-md text-sm text-gray-700 gap-2"
                                        >
                                            <span className="md:w-1/3"><strong>المؤسسة:</strong> {edu.institution}</span>
                                            <span className="md:w-1/3"><strong>الدرجة:</strong> {edu.degree}</span>
                                            <span className="md:w-1/3"><strong>التخصص:</strong> {edu.field}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button
                            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded mt-4"
                            onClick={() => setSelectedMentor(null)}
                        >
                            إغلاق
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RejectedMentors;
