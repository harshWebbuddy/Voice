export const modernCardClass = `
  group relative
  before:absolute before:inset-0 
  before:bg-gradient-to-r before:from-purple-500/10 before:to-pink-500/10 
  before:rounded-2xl before:opacity-0 before:transition-opacity
  hover:before:opacity-100
`;

export const cardInnerClass = `
  relative bg-white/5 
  backdrop-blur-sm 
  rounded-2xl 
  border border-white/10
  shadow-sm
  transition-all duration-300
  hover:border-purple-500/20
  hover:translate-y-[-2px]
  hover:shadow-md hover:shadow-purple-500/10
`;

export const glowClass = `
  absolute inset-0 
  bg-gradient-to-r from-purple-500/20 to-pink-500/20 
  rounded-2xl blur-xl 
  opacity-0 
  transition-opacity 
  group-hover:opacity-20
`; 