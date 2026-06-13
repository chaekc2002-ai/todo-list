import React, { createContext, useState, useContext } from 'react';

const translations = {
  en: {
    appTitle: "Todo Management App",
    teacherLogin: "Teacher Login",
    studentSignup: "Student Signup",
    emailPlaceholder: "Email address",
    passwordPlaceholder: "Password",
    loginBtn: "Login",
    signupBtn: "Sign Up",
    loginSuccess: "Login successful!",
    loginError: "Login failed: ",
    signupSuccess: "Signup successful!",
    signupError: "Signup failed: ",
    tasksTitle: "Tasks to Conquer",
    todoPlaceholder: "What needs to be done?",
    addBtn: "Add",
    doneBtn: "Done",
    undoBtn: "Undo",
    deleteBtn: "Delete",
    noTasks: "No tasks yet. Add one above! ✨",
    toggleLang: "🇰🇷 한국어로 전환"
  },
  ko: {
    appTitle: "할 일 관리 앱",
    teacherLogin: "교사 로그인",
    studentSignup: "학생 회원가입",
    emailPlaceholder: "이메일 주소",
    passwordPlaceholder: "비밀번호",
    loginBtn: "로그인",
    signupBtn: "가입하기",
    loginSuccess: "로그인 성공!",
    loginError: "로그인 실패: ",
    signupSuccess: "가입 성공!",
    signupError: "가입 실패: ",
    tasksTitle: "정복할 할 일들",
    todoPlaceholder: "무엇을 해야 하나요?",
    addBtn: "추가",
    doneBtn: "완료",
    undoBtn: "취소",
    deleteBtn: "삭제",
    noTasks: "아직 할 일이 없습니다. 위에서 추가해보세요! ✨",
    toggleLang: "🇺🇸 Switch to English"
  }
};

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ko');

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ko' : 'en'));
  };

  const t = (key) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
