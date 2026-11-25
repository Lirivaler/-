// Анімація пензлями p5.brush: хвилясті акварельні кола + штрихові лінії
function setup() {
  createCanvas(720, 1280, WEBGL);   // 9:16 під reels
  brush.scaleBrushes(3);
  brush.field("seabed");            // вектор-поле: лінії «пливуть» органічно
}

function draw() {
  background("#f6f1e8");
  const t = frameCount * 0.02;
  randomSeed(7);                    // той самий малюнок кожен кадр, рухається лише t

  for (let i = 0; i < 6; i++) {
    const x = sin(t + i) * 200;
    const y = -450 + i * 180 + cos(t * 0.8 + i) * 40;
    const hue = ["#d96c5f", "#e8a23c", "#6aa6a1", "#5b6fb5", "#b56a9a", "#7aa35a"][i];

    brush.noStroke();
    brush.fill(hue, 110);
    brush.fillBleed(0.3);
    brush.circle(x, y, 90 + 20 * sin(t * 2 + i));

    brush.set("charcoal", "#2f2a26", 1);
    brush.noFill();
    brush.line(x - 150, y + 80, x + 150, y + 80 + sin(t + i) * 30);
  }
}
