// components/MenteesReviews.tsx
import React from 'react';
import { Avatar, Rating } from '@mui/material';

// Types for API
type CommentRequest = {
  content: string;
  rating: number;
  teacherId: string;
  studentId: string;
};

type CommentResponse = {
  id: string;
  content: string;
  rating: number;
  teacherId: string;
  studentId: string;
  createdAt: string;
  updatedAt: string;
};

// Types for GET comments API response
type Student = {
  id: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
};

type TeacherRating = {
  averageRating: number;
  totalComments: number;
};

type CommentData = {
  id: string;
  content: string;
  rating: number;
  createdAt: string;
  student: Student;
  teacherRating: TeacherRating;
};

type CommentsApiResponse = {
  status: boolean;
  massage: string;
  statusCode: number;
  data: CommentData[];
  validation: null;
  dateTime: string;
  culture: string;
};

// API function
const API_BASE_URL = 'http://academix1.runasp.net'; // Change this to your actual API base URL

async function addComment(commentData: CommentRequest): Promise<CommentResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if needed
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
}

// Get comments for a specific teacher
async function getCommentsByTeacher(teacherId: string): Promise<CommentsApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/comments/teacher/${teacherId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
}

interface MenteesReviewsProps {
  teacherId: string;
  studentId: string;
}

const MenteesReviews: React.FC<MenteesReviewsProps> = ({ teacherId, studentId }) => {
  const [comment, setComment] = React.useState("");
  const [rating, setRating] = React.useState(5);
  const [commentSuccess, setCommentSuccess] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const [comments, setComments] = React.useState<CommentData[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // Get user role from localStorage
  const userRole = localStorage.getItem('role');

  // Don't render anything if user is a teacher
  if (userRole === 'teacher') {
    return null;
  }

  // Fetch comments on component mount
  React.useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const response = await getCommentsByTeacher(teacherId);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setError("حدث خطأ أثناء تحميل التعليقات");
      } finally {
        setIsLoading(false);
      }
    };

    if (teacherId) {
      fetchComments();
    }
  }, [teacherId]);

  const handleCommentSubmit = async () => {
    if (comment.trim() === "") return;
    
    setIsSubmitting(true);
    setError("");
    
    try {
      const commentData: CommentRequest = {
        content: comment.trim(),
        rating: rating,
        teacherId: teacherId,
        studentId: studentId,
      };
      
      await addComment(commentData);
      
      setCommentSuccess(true);
      setComment("");
      setRating(5);
      
      // Refresh comments after adding new one
      const response = await getCommentsByTeacher(teacherId);
      setComments(response.data);
      
      setTimeout(() => setCommentSuccess(false), 3000);
    } catch (error) {
      setError("حدث خطأ أثناء إرسال التعليق. يرجى المحاولة مرة أخرى.");
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div dir="rtl" className="max-w-5xl mx-auto px-4 mt-10">
        <h2 className="text-xl font-bold text-gray-900 mb-6">ماذا يقول المتدربون</h2>
        <div className="text-center py-8">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="max-w-5xl mx-auto px-4 mt-10">
      <h2 className="text-xl font-bold text-gray-900 mb-6">ماذا يقول المتدربون</h2>

      {comments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          لا توجد تعليقات بعد
        </div>
      ) : (
        <div className="space-y-12">
          {comments.map((comment, index) => (
            <div key={comment.id}>
              {/* صورة واسم وتفاصيل */}
              <div className="flex items-start gap-4 mb-2">
                <Avatar
                  src={comment.student.profilePictureUrl}
                  sx={{ width: 80, height: 80 }}
                />
                <div className="flex flex-col text-sm w-full">
                  {/* الاسم */}
                  <span className="font-medium text-gray-900">
                    {comment.student.firstName} {comment.student.lastName}
                  </span>

                  {/* ⭐ التقييم + التاريخ */}
                  <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
                    {/* يمين: تقييم + تاريخ */}
                    <div className="flex items-center gap-2">
                      <Rating 
                        value={comment.rating} 
                        readOnly 
                        size="small" 
                        sx={{ direction: 'ltr' }} 
                      />
                      <span>{formatDate(comment.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* محتوى المراجعة */}
              <p className="text-gray-800 text-sm leading-relaxed mt-2">
                {comment.content}
              </p>

              {/* خط فاصل بعد كل تقييم (ما عدا الأخير) */}
              {index !== comments.length - 1 && (
                <div className="w-full h-[1.5px] bg-gray-200 my-12" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* صندوق إضافة تعليق */}
      <div className="flex flex-col gap-2 mt-8 mb-6">
        <h3 className="text-base font-medium text-gray-900 mb-1">أضف تعليقك</h3>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-gray-600">التقييم:</span>
          <Rating 
            value={rating} 
            onChange={(_, newValue) => setRating(newValue || 5)}
            size="small"
            sx={{ direction: 'ltr' }}
          />
        </div>
        
        <textarea
          className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
          rows={3}
          placeholder="اكتب تعليقك هنا..."
          value={comment}
          onChange={e => setComment(e.target.value)}
          dir="rtl"
          disabled={isSubmitting}
        />
        
        <div className="flex justify-end">
          <button
            className={`px-4 py-1.5 rounded-lg transition text-sm ${
              isSubmitting 
                ? 'bg-gray-400 text-white cursor-not-allowed' 
                : 'bg-blue-700 text-white hover:bg-blue-800'
            }`}
            onClick={handleCommentSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'جاري الإرسال...' : 'إرسال التعليق'}
          </button>
        </div>
        
        {commentSuccess && (
          <div className="text-green-600 mt-2 text-sm text-right">تم إرسال تعليقك بنجاح!</div>
        )}
        
        {error && (
          <div className="text-red-600 mt-2 text-sm text-right">{error}</div>
        )}
      </div>

      {/* زر عرض المزيد */}
      <div className="text-center mt-10">
        <button className="text-sm text-blue-700 underline hover:text-blue-900 mb-4">
          عرض المزيد من المراجعات
        </button>
      </div>
    </div>
  );
};

export default MenteesReviews;


