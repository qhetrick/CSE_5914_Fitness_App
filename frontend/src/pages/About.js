import React from "react";
import { Box, Typography, Container } from "@mui/material";
import Navbar from "../components/Navbar";
import "../css/App.css";
import "../css/VideoCard.css";

const About = () => {
  return (
    <div className="About">
      <Navbar />
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" color="primary" align="center" gutterBottom>
            Slogan
          </Typography>
          <Typography variant="h6" color="white" align="center" paragraph>
            "FitFriend: Where Strength Meets Balance."
          </Typography>

          <Box sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h3" color="primary" align="center" gutterBottom>
              Mission Statement
            </Typography>
            <Typography variant="h6" color="white" align="justify" paragraph>
              At FitFriend, we champion a holistic approach to fitness. Our commitment is to guide you on a transformative journey that nurtures every facet of your well-being. With a keen focus on resistance training, we ensure that every lift, every set, and every workout is a step towards your personal best. Join us in redefining fitness, where every workout contributes to a healthier, more holistic you.
            </Typography>
          </Box>

          <Box sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h3" color="primary" align="center" gutterBottom>
              Our Core Values
            </Typography>
            <Typography variant="h6" color="white" align="justify" paragraph>
              <strong>Continuous Growth</strong>: We believe in the power of evolution. With FitFriend, you're always progressing, always evolving, and always moving forward. <br />
              <br />
              <strong>Balance</strong>: A well-rounded fitness routine is essential for overall health. We ensure that every muscle, every movement, and every moment counts. <br />
              <br />
              <strong>Strength & Mastery</strong>: Building foundational strength and mastering techniques are at the heart of effective resistance training. We prioritize proper form and technique to maximize gains and minimize injuries. <br />
            </Typography>
          </Box>

          <Box sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h3" color="primary" align="center" gutterBottom>
              Why We Are Better
            </Typography>
            <Typography variant="h6" color="white" align="justify" paragraph>
              <strong>Holistic Health Focus</strong>: Beyond just workouts, FitFriend emphasizes the importance of mental and nutritional well-being. Our platform offers mindfulness exercises, nutritional guidance, and recovery techniques, ensuring a 360-degree approach to your health. <br />
              <br />
              <strong>Performance-Driven Analytics</strong>: Our advanced analytics allow you to track your performance over time, set personal records, and understand your strengths and areas for improvement. Every workout is data-backed, ensuring you're always on the path to your personal best. <br />
              <br />
              <strong>Expertise in Resistance Training</strong>: With a specialized focus on lifting and resistance training, FitFriend provides detailed video tutorials, form checks, and foundational exercises, ensuring you're lifting safely and effectively. <br />
              <br />
              <strong>Adaptive Workouts</strong>: Life is dynamic, and so are our workout plans. FitFriend understands the challenges of a busy schedule. We adapt your fitness routine to fit seamlessly into your life, making it sustainable and achievable. <br />
              <br />
              <strong>Community & Support</strong>: Join a community of like-minded individuals, where you can share experiences, seek advice, and celebrate victories. Our expert trainers are also on hand to provide guidance, motivation, and support every step of the way. <br />
            </Typography>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default About;
