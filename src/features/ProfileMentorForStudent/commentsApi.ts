// API for comments related to mentor reviews

export type CommentRequest = {
  content: string;
  rating: number;
  teacherId: string;
  studentId: string;
};

export type CommentResponse = {
  id: string;
  content: string;
  rating: number;
  teacherId: string;
  studentId: string;
  createdAt: string;
  updatedAt: string;
};

// Base API URL - adjust this to match your backend URL
const API_BASE_URL = 'http://localhost:3000'; // Change this to your actual API base URL

// Send comment to API
export async function addComment(commentData: CommentRequest): Promise<CommentResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if needed
        // 'Authorization': `Bearer ${token}`,
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
export async function getCommentsByTeacher(teacherId: string): Promise<CommentResponse[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/comments?teacherId=${teacherId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if needed
        // 'Authorization': `Bearer ${token}`,
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

