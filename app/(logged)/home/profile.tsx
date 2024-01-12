import { Typography, SafeView } from "@/components";
import { useGetProfile } from "@/hooks";

export default function Profile() {
  const { data } = useGetProfile();

  const correctAnswers = data?.correct_answers || 0;
  const wrongAnswers = data?.wrong_answers || 0;

  const rate = (correctAnswers / (correctAnswers + wrongAnswers)) * 100;

  return (
    <SafeView>
      <Typography>Profile</Typography>
      <Typography>Correct Answers: {correctAnswers}</Typography>
      <Typography>Wrong Answers: {wrongAnswers}</Typography>
      <Typography>Rate: {rate}%</Typography>
    </SafeView>
  );
}
