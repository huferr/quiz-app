export interface Question {
  answer: string;
  created_at: string;
  id: number;
  img_url: string;
  level: number;
  opt_four: string;
  opt_one: string;
  opt_three: string;
  opt_two: string;
  title: string;
  type: string;
}

export interface User {
  correct_answers: number | null;
  email: string | null;
  first_name: string | null;
  id: string;
  last_name: string | null;
  username: string | null;
  wrong_answers: number | null;
}
