import "../css/App.css";
import "../css/VideoCard.css";
import { Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";

function About() {
  return (
    <div className="About">
      <Box sx={{ flexGrow: 1, boxShadow: 3 }}>
        <Navbar />
      </Box>
      <br />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h1" color={"white"} align="center">
          Our Core Values
        </Typography>
        <Typography variant="h4" color={"white"} align="left">
          <strong>Continuous Growth</strong>: We believe in the power of
          evolution. With FitFriend, you're always progressing, always evolving,
          and always moving forward. <br />
          <strong>Balance</strong>: A well-rounded fitness routine is essential
          for overall health. We ensure that every muscle, every movement, and
          every moment counts. <br />
          <strong>Strength & Mastery</strong>: Building foundational strength
          and mastering techniques are at the heart of effective resistance
          training. We prioritize proper form and technique to maximize gains
          and minimize injuries. <br />
          <br />
        </Typography>
        <Typography variant="h1" color={"white"} align="center">
          Why We Are Better <br />
        </Typography>
        <Typography variant="h4" color={"white"} align="left">
          <strong>Holistic Health Focus</strong>: Beyond just workouts,
          FitFriend emphasizes the importance of mental and nutritional
          well-being. Our platform offers mindfulness exercises, nutritional
          guidance, and recovery techniques, ensuring a 360-degree approach to
          your health. <br />
          <strong>Performance-Driven Analytics</strong>: Our advanced analytics
          allow you to track your performance over time, set personal records,
          and understand your strengths and areas for improvement. Every workout
          is data-backed, ensuring you're always on the path to your personal
          best.
          <br />
          <strong>Expertise in Resistance Training</strong>: With a specialized
          focus on lifting and resistance training, FitFriend provides detailed
          video tutorials, form checks, and foundational exercises, ensuring
          you're lifting safely and effectively.
          <br />
          <strong>Adaptive Workouts</strong>: Life is dynamic, and so are our
          workout plans. FitFriend understands the challenges of a busy
          schedule. We adapt your fitness routine to fit seamlessly into your
          life, making it sustainable and achievable. <br />
          <strong>Community & Support</strong>: Join a community of like-minded
          individuals, where you can share experiences, seek advice, and
          celebrate victories. Our expert trainers are also on hand to provide
          guidance, motivation, and support every step of the way. <br />
        </Typography>
      </Box>
    </div>
  );
}

export default About;
