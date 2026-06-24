import pptxgen from "pptxgenjs";
import type { Slide } from "./SlideCanvas";

export const exportToPptx = async (slides: Slide[]) => {
  const pres = new pptxgen();

  slides.forEach(slideData => {
    const slide = pres.addSlide();
    slideData.elements.forEach(el => {
      if (el.type === 'text') {
        slide.addText(el.value, {
          x: el.x / 96, // basic px to inches conversion
          y: el.y / 96,
          fontSize: el.fontSize,
          color: "000000",
        });
      }
    });
  });

  await pres.writeFile({ fileName: "presentation.pptx" });
};
