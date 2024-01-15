export interface Question {
  answer: string;
  created_at: string;
  id: number;
  img_url: string;
  level: number;
  opt_one: string;
  opt_two: string;
  opt_three: string;
  opt_four: string;
  title: string;
  type: string;
}

export interface User {
  id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  username: string | null;
  correct_answers: number;
  wrong_answers: number;
  streak: number;
  badges: string[] | null;
  free_coins: number;
  paid_coins: number;
}
