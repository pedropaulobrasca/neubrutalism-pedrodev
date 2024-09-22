export const getStyles = (isDarkMode: boolean) => ({
  sectionStyle: `mb-8 p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`,
  titleStyle: `text-3xl font-bold mb-4 p-2 inline-block transform -rotate-2 ${isDarkMode ? 'bg-yellow-600' : 'bg-yellow-300'}`,
  subtitleStyle: `text-xl font-semibold mb-2 p-1 inline-block transform rotate-1 ${isDarkMode ? 'bg-green-600' : 'bg-green-300'}`,
  textStyle: "mb-2 last:mb-0",
  badgeStyle: `inline-block font-bold py-1 px-2 m-1 border-2 border-black transform rotate-1 ${isDarkMode ? 'bg-pink-600' : 'bg-pink-300'}`,
  buttonStyle: `p-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`,
});
  