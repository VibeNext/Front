// src/stores/useAuthStore.js
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// 이미지로 쓸 거니까 ?react 붙이면 안 됨
import avatar1 from '../assets/icons/profile/avatar1.svg';
import avatar2 from '../assets/icons/profile/avatar2.svg';
import avatar3 from '../assets/icons/profile/avatar3.svg';
import avatar4 from '../assets/icons/profile/avatar4.svg';

const avatars = [avatar1, avatar2, avatar3, avatar4];

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null, // { name, email?, avatar }
      isAuthenticated: false,

      // 회원가입: 여기서 단 한 번 랜덤 아바타 부여
      registerUser: ({ name, email }) => {
        const avatar = avatars[Math.floor(Math.random() * avatars.length)];
        set({ user: { name, email, avatar }, isAuthenticated: false });
        // 회원가입 직후 바로 로그인 상태로 만들고 싶으면 true로 변경
      },

      // 로그인: 절대 이름/아바타를 덮어쓰지 말 것!
      // 백엔드가 유저 프로필 내려주면 그때만 갱신하도록 분리
      login: () => {
        const u = get().user;
        // 회원가입 없이 바로 로그인하는 플로우라면 여기서 user를 세팅해야 함(백엔드 응답 사용).
        set({ user: u, isAuthenticated: true });
      },

      // 로그아웃: 전부 초기화
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
      // 필요하면 부분만 저장하도록 whitelist 가능: partialize: (s) => ({ user: s.user })
    },
  ),
);

export default useAuthStore;
