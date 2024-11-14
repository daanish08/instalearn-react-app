export interface IEnrollment {
  enrollmentId: number;
  user: {
    userId: number;
    userName: string;
    password: string;
    phone: string;
    email: string;
  };
  course: {
    courseId: number;
    courseName: string;
  };
  status: "APPROVED" | "PENDING" | "REJECTED";
}
