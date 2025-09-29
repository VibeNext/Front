import { create } from 'zustand';

const useArticleStore = create((set) => ({
  title: '',
  content: '',
  setArticle: (title, content) => set({ title, content }),
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
}));

const useCommentStore = create((set) => ({
  content: '',
  setContent: (content) => set({ content }),
}));

export { useArticleStore, useCommentStore };
