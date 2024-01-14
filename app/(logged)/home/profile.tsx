import { Typography, SafeView } from "@/components";
import { useGetProfile } from "@/hooks";

export default function Profile() {
  const { data, isLoading } = useGetProfile();

  const correctAnswers = data?.correct_answers || 0;
  const wrongAnswers = data?.wrong_answers || 0;
  const streak = data?.streak || 0;
  const badges = data?.badges || [];

  const rate = (correctAnswers / (correctAnswers + wrongAnswers)) * 100;

  if (isLoading) {
    return (
      <SafeView>
        <Typography>Loading...</Typography>
      </SafeView>
    );
  }

  return (
    <SafeView paddingHorizontal={24}>
      <Typography>Profile</Typography>
      <Typography>Correct Answers: {correctAnswers}</Typography>
      <Typography>Wrong Answers: {wrongAnswers}</Typography>
      <Typography>Correct Answers Rate: {rate}</Typography>
      <Typography>Streak: {streak}</Typography>
      <Typography>Badges: {badges.map((badge) => `${badge} `)}</Typography>
    </SafeView>
  );
}
