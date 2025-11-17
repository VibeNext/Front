const colors = {
  brand: {
    1: '#5C9DFF',
    2: '#7DB1FF',
    3: '#97C1FF',
    4: '#B1D0FF',
    5: '#DEEBFF',
    6: '#EFF5FF',
    7: '#5C7FD0',
  },
  gray: {
    1: '#191927',
    2: '#646879',
    3: '#868BA3',
    4: '#C4C7D3',
    5: '#F1F1F5',
    6: '#F5F5F7',
  },
  success: '#76CA86',
  successText: '#37AF00',
  error: '#FF8A6C',
  errorText: '#FF644F',
  point: { 1: '#78C9CC', 2: '#FBACA2', 3: '#E8E46A', 4: '#C3CBD1' },
};

const fonts = {
  families: {
    body: 'Pretendard',
    display: "'DungGeunMo'",
    hunmin: 'EBSHunminjeongeumSB, sans-serif',
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

const textStyles = {
  gnb: {
    h1: `
      font-family: ${fonts.families.body};
      font-weight: ${fonts.weights.semibold};
      font-size: 24px;
      line-height: 28px;
    `,
    h2: `
      font-family: ${fonts.families.body};
      font-weight: ${fonts.weights.semibold};
      font-size: 20px;
      line-height: 24px;
    `,
    h3: `
      font-family: ${fonts.families.body};
      font-weight: ${fonts.weights.bold};
      font-size: 18px;
      line-height: 20px;
    `,
  },

  // 학습단계
  learnNotice: {
    h1: `
      font-family: ${fonts.families.display};
      font-weight: ${fonts.weights.regular};
      font-size: 44px;
      line-height: 44px;
    `,
    h2: `
      font-family: ${fonts.families.body};
      font-weight: ${fonts.weights.semibold};
      font-size: 28px;
      line-height: 40px;
    `,
    title1: `
      font-family: ${fonts.families.display};
      font-weight: ${fonts.weights.regular};
      font-size: 20px;
      line-height: 24px;
    `,
    title2: `
      font-family: ${fonts.families.display};
      font-weight: ${fonts.weights.regular};
      font-size: 16px;
      line-height: 24px;
    `,
    body1: `
      font-family: ${fonts.families.body};
      font-weight: ${fonts.weights.medium};
      font-size: 15px;
      line-height: 22px;
    `,
    body2: `
      font-family: ${fonts.families.body};
      font-weight: ${fonts.weights.medium};
      font-size: 13px;
      line-height: 20px;
    `,
  },

  // 학습뱃지
  learnAlert: {
    heading: `
      font-family: ${fonts.families.display};
      font-weight: ${fonts.weights.regular};
      font-size: 36px;
      line-height: 44px;
    `,
    title: `
      font-family: ${fonts.families.body};
      font-weight: ${fonts.weights.semibold};
      font-size: 20px;
      line-height: 24px;
    `,
    body: `
      font-family: ${fonts.families.body};
      font-weight: ${fonts.weights.medium};
      font-size: 16px;
      line-height: 24px;
    `,
  },

  // 문제풀이
  content: {
    title1: `
      font-family: ${fonts.families.display};
      font-weight: ${fonts.weights.regular};
      font-size: 30px;
      line-height: 36px;
    `,
    title2: `
      font-family: ${fonts.families.display};
      font-weight: ${fonts.weights.regular};
      font-size: 28px;
      line-height: 36px;
    `,
    title3: `
      font-family: ${fonts.families.body};
      font-weight: ${fonts.weights.medium};
      font-size: 16px;
      line-height: 24px;
    `,
    label: `
      font-family: ${fonts.families.display};
      font-weight: ${fonts.weights.regular};
      font-size: 20px;
      line-height: 28px;
    `,
    head: `
      font-family: ${fonts.families.body};
      font-weight: ${fonts.weights.medium};
      font-size: 20px;
      line-height: 28px;
    `,
    body1: `
      font-family: ${fonts.families.body};
      font-weight: ${fonts.weights.medium};
      font-size: 16px;
      line-height: 24px;
    `,
    body2: `
      font-family: ${fonts.families.body};
      font-weight: ${fonts.weights.medium};
      font-size: 14px;
      line-height: 24px;
    `,
    cap1: `
      font-family: ${fonts.families.body};
      font-weight: ${fonts.weights.regular};
      font-size: 12px;
      line-height: 20px;
    `,
    cap2: `
      font-family: ${fonts.families.body};
      font-weight: ${fonts.weights.medium};
      font-size: 12px;
      line-height: 16px;
    `,
    cap3: `
      font-family: ${fonts.families.body};
      font-weight: ${fonts.weights.bold};
      font-size: 10px;
      line-height: 16px;
    `,
  },
};

// ------------------------------------------
const theme = { colors, fonts, textStyles };
export { theme };

