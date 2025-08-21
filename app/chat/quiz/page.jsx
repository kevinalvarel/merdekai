"use client";
import React, { useState } from "react";
import {
  IconBrain,
  IconFlag,
  IconBook,
  IconGlobe,
  IconStar,
  IconTrophy,
} from "@tabler/icons-react";
import QuizChatArea from "@/components/chat/QuizChatArea";

const QuizPage = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <>
      {/* QUIZ SELECTION AREA */}
      {!selectedQuiz ? (
        <QuizSelection onSelectQuiz={setSelectedQuiz} />
      ) : (
        <QuizChatArea
          quizType={selectedQuiz}
          onBackToSelection={() => setSelectedQuiz(null)}
        />
      )}
    </>
  );
};

// Quiz Selection Component
const QuizSelection = ({ onSelectQuiz }) => {
  const quizTypes = [
    {
      id: "sejarah-indonesia",
      title: "Sejarah Indonesia",
      description:
        "Quiz tentang sejarah kemerdekaan dan perjuangan bangsa Indonesia",
      icon: <IconFlag className="h-8 w-8" />,
      color: "from-red-500 to-red-600",
      difficulty: "Mudah - Sedang",
    },
    {
      id: "budaya-nusantara",
      title: "Budaya Nusantara",
      description:
        "Quiz tentang kebudayaan, tradisi, dan kearifan lokal Indonesia",
      icon: <IconBook className="h-8 w-8" />,
      color: "from-blue-500 to-blue-600",
      difficulty: "Mudah - Sulit",
    },
    {
      id: "geografi-indonesia",
      title: "Geografi Indonesia",
      description:
        "Quiz tentang wilayah, alam, dan kekayaan geografis Indonesia",
      icon: <IconGlobe className="h-8 w-8" />,
      color: "from-green-500 to-green-600",
      difficulty: "Sedang",
    },
    {
      id: "pahlawan-nasional",
      title: "Pahlawan Nasional",
      description: "Quiz tentang tokoh-tokoh pahlawan dan pejuang kemerdekaan",
      icon: <IconStar className="h-8 w-8" />,
      color: "from-yellow-500 to-yellow-600",
      difficulty: "Sedang - Sulit",
    },
    {
      id: "pancasila-uud",
      title: "Pancasila & UUD 1945",
      description:
        "Quiz tentang dasar negara dan undang-undang dasar Indonesia",
      icon: <IconTrophy className="h-8 w-8" />,
      color: "from-purple-500 to-purple-600",
      difficulty: "Sedang - Sulit",
    },
    {
      id: "umum-indonesia",
      title: "Pengetahuan Umum",
      description: "Quiz campuran tentang berbagai aspek Indonesia secara umum",
      icon: <IconBrain className="h-8 w-8" />,
      color: "from-indigo-500 to-indigo-600",
      difficulty: "Mudah - Sulit",
    },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="border-b bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                <IconBrain className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Quiz Nasional Indonesia
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Selamat datang di Quiz! Silakan pilih jenis permainan apa yang
              kamu inginkan untuk menguji pengetahuan kamu tentang Indonesia.
            </p>
          </div>
        </div>
      </div>

      {/* Quiz Options */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizTypes.map((quiz) => (
              <div
                key={quiz.id}
                onClick={() => onSelectQuiz(quiz)}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl border border-gray-200 overflow-hidden h-full">
                  {/* Quiz Icon Header */}
                  <div
                    className={`bg-gradient-to-r ${quiz.color} p-6 text-white relative overflow-hidden`}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {quiz.icon}
                        <h3 className="text-xl font-bold">{quiz.title}</h3>
                      </div>
                      <div className="opacity-70">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Quiz Content */}
                  <div className="p-6">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {quiz.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-500">
                          {quiz.difficulty}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-gray-700 group-hover:text-red-600 transition-colors">
                        Mulai Quiz →
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Cara Bermain
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold text-lg">1</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Pilih Quiz
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Pilih jenis quiz yang ingin kamu mainkan dari kategori yang
                    tersedia
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 font-bold text-lg">2</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Mulai Bermain
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Bot akan memberikan pertanyaan dan pilihan jawaban yang
                    harus kamu pilih
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-purple-600 font-bold text-lg">3</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Lihat Skor
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Dapatkan skor dan penjelasan untuk setiap jawaban yang kamu
                    berikan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
