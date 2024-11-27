import React from "react";

interface QuestionProps {
  question: string;
  show: boolean;
}

const Question: React.FC<QuestionProps> = ({ question, show }) => {
  return (
    <div
      className={`bg-white/20 backdrop-blur-sm p-6 rounded-lg mb-8 transition-all duration-1000 ${
        show
          ? "opacity-100 transform translate-y-0"
          : "opacity-0 transform translate-y-4"
      }`}
    >
      <p className="text-white text-xl text-center font-medium">{question}</p>
    </div>
  );
};

export default Question;
