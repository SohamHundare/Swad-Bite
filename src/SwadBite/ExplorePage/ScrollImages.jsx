import React from 'react';
import './ScrollImages.css';

const images = [
  'https://c.ndtvimg.com/2019-04/tgoepg6_summer-2019-vegetarian-recipes_625x300_10_April_19.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpICYrT7YCpSefG3ivHfR756cRJbu1u7WFsg&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVsxYayzoHoxY-BgXaO3xamta-nzwPJ-8drRt-YW-6SFNzgoqFDeS1oQLRgttGZL79DE8&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUBgOS-412VK9M0G7S_wSjnXHDpkrfHMu95g&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSDRhLe47ebu5BwYevDbb3f4yEymfVZRIXYw&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx0xlisCKZZRE7WJnPHYwp6sEranTKyU2Ulg&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxlT4Sx8kQsUbGvG-1SOam9svhom2wjrpj2A&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8eU2ZJHZQ6n1AoCRLt8EvT-wzBUs9Emrt4g&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRTN6Iu6K0YxdfXg649ts5BjEFuoRW8dCZew&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq91UHxc3JXh6ljRGl_bbHk-uLnIa53EbgLw&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQporFMBWgA4DTEXLCSJaB2FSlfToTZdh3ffQ&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu8Bsqv5sTHldrV4KDlHLfWlZ0-lHqZOHk6g&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgr6t9KTpGvHqeCDYVTrvpf6tB-dycc_9Gyw&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2qca9owrAi8nmXp7okMfV1XX2E_BWUXIm0g&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCT8y6iyLxbt55b8-OAx-Slxlo88yoNHomoQ&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGlYjXallIbC1Vc0ck5EDlOpPsK4Q8Crtdig&s',

];

const ScrollImages = () => {
  return (
    <div className="scroll-grid">
      {images.map((src, i) => (
        <img key={i} src={src} alt={`img-${i}`} />
      ))}
    </div>
  );
};

export default ScrollImages;