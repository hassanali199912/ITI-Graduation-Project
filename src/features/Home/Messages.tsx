import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import SelectInput from "../Auth/RegisterMentor/MainForm/components/SelectInput";
import { useLazyGetMentorsQuery } from "../Auth/api/mentorsApi";
import { useLazyGetStudentsQuery } from "../Auth/api/dashboard";
import { useLazyGetMessagesForChatQuery } from "../Chat/apis/chat";

export const Messages = () => {
    const { register, watch, setValue } = useForm();
    const [getMentors, { data: mentorsData }] = useLazyGetMentorsQuery();
    const [getStudents, { data: studentsData }] = useLazyGetStudentsQuery();
    const [getMessages, { data: messagesData, isFetching }] = useLazyGetMessagesForChatQuery();

    // Fetch mentors and students on mount
    useEffect(() => {
        getMentors({ pageNumber: 1, pageSize: 100 });
        getStudents({ pageNumber: 1, pageSize: 100 });
    }, []);

    // Watch for dropdown changes
    const selectedMentor = watch("mentorId");
    const selectedStudent = watch("studentId");

    // Fetch messages when both are selected
    useEffect(() => {
        if (selectedMentor && selectedStudent) {
            getMessages({ currentUserId: selectedStudent, otherUserId: selectedMentor });
        }
    }, [selectedMentor, selectedStudent]);

    // Prepare dropdown options
    const mentorOptions = mentorsData?.data?.teachers?.map(m => ({
        id: m?.userId,
        name: `${m.firstName} ${m.lastName}`,
    })) || [];

    const studentOptions = studentsData?.data?.students?.map((s: any) => ({
        id: s?.userId,
        name: `${s.firstName} ${s.lastName}`,
    })) || [];

    return (
        <div>
            <h1>Messages</h1>
            <form className="flex gap-4 mb-6">
                <SelectInput
                    id="mentorId"
                    label="اختر المرشد"
                    options={mentorOptions}
                    register={register}
                />
                <SelectInput
                    id="studentId"
                    label="اختر الطالب"
                    options={studentOptions}
                    register={register}
                />
            </form>
            {selectedMentor && selectedStudent && (
                <div>
                    <h2 className="mb-4 text-lg font-bold">الرسائل بين الطالب والمرشد</h2>
                    {isFetching ? (
                        <p>جاري التحميل...</p>
                    ) : (
                        <div className="max-h-[400px] overflow-y-auto bg-gray-50 rounded-lg p-4 border border-gray-200">
                            {(messagesData?.data?.value || []).length === 0 ? (
                                <p className="text-center text-gray-400">لا توجد رسائل بين الطالب والمرشد.</p>
                            ) : (
                                <ul className="space-y-3">
                                    {(messagesData?.data?.value || []).map((msg: any) => {
                                        const isStudent = msg.senderId === selectedStudent;
                                        return (
                                            <li
                                                key={msg.id}
                                                className={`flex ${isStudent ? 'justify-start' : 'justify-end'}`}
                                            >
                                                <div
                                                    className={`max-w-[70%] px-4 py-2 rounded-lg shadow-md relative ${isStudent
                                                            ? 'bg-blue-100 text-blue-900 self-start rounded-bl-none'
                                                            : 'bg-green-100 text-green-900 self-end rounded-br-none'
                                                        }`}
                                                >
                                                    <div className="text-xs font-bold mb-1">
                                                        {isStudent ? 'الطالب' : 'المرشد'}
                                                        <span className="ml-2 text-gray-400 font-normal">
                                                            {msg.sentAt ? new Date(msg.sentAt).toLocaleString() : ''}
                                                        </span>
                                                    </div>
                                                    <div className="whitespace-pre-line break-words">{msg.messageText}</div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
