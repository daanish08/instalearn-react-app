export interface IEnrollment {
  enrollmentId: number; // Or string, depending on your API response
  course: {
    courseId: number; // Or string
    courseName: string;
  };
  status: "APPROVED" | "PENDING" | "REJECTED"; // Enumerate possible statuses
}
