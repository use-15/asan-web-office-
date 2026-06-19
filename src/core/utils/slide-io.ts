import pptx from 'pptxgenjs';

export async function exportToPptx(slides: any[], filename: string = 'presentation.pptx') {
  const pres = new pptx();

  slides.forEach(slideData => {
    const slide = pres.addSlide();
    slideData.elements.forEach((el: any) => {
      if (el.type === 'text') {
        slide.addText(el.value, {
          x: el.x / 100, // Conversion needed for proper scaling
          y: el.y / 100,
          w: el.width / 100,
          h: el.height / 100,
          fontSize: 24,
          align: 'center'
        });
      } else if (el.type === 'shape') {
        slide.addShape(pres.ShapeType.rect, {
          x: el.x / 100,
          y: el.y / 100,
          w: el.width / 100,
          h: el.height / 100,
          fill: { color: 'E9F2EB' },
          line: { color: '217346', width: 1 }
        });
      }
    });
  });

  await pres.writeFile({ fileName: filename });
}
