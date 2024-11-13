export interface IEnrollment {
  enrollmentId: number; // Or string, depending on your API response
  user: {
    userId: number;
    userName: string;
    password: string;
    phone: string;
    email: string;
  };
  course: {
    courseId: number; // Or string
    courseName: string;
  };
  status: "APPROVED" | "PENDING" | "REJECTED"; // Enumerate possible statuses
}
