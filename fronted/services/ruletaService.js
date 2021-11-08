import BoletoService from "./boletoService";
const boletoServ = new BoletoService();

class RuletaService {
  options = [
    "Granizado",
    "Vuelve a intentarlo",
    "Shot",
    "Gorra",
    "Camiseta",
    "Vuelve a intentarlo",
  ];
  startAngle = 0;
  arc = Math.PI / (this.options.length / 2);
  arc = 0;
  spinTimeout = null;
  spinAngleStart = 10;
  spinTime = 0;
  spinTimeTotal = 0;
  ctx;
  constructor() {}

  byte2Hex(n) {
    const nybHexString = "0123456789ABCDEF";
    return (
      String(nybHexString.substr((n >> 4) & 0x0f, 1)) +
      nybHexString.substr(n & 0x0f, 1)
    );
  }

  RGB2Color(r, g, b) {
    return "#" + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
  }

  getColor(item, maxitem) {
    const phase = 0;
    const center = 128;
    const width = 127;
    const frequency = (Math.PI * 2) / maxitem;

    let red = Math.sin(frequency * item + 2 + phase) * width + center;
    let green = Math.sin(frequency * item + 0 + phase) * width + center;
    let blue = Math.sin(frequency * item + 4 + phase) * width + center;

    return this.RGB2Color(red, green, blue);
  }

  drawRouletteWheel() {
    let canvas = document.getElementById("canvas");
    if (canvas.getContext) {
      let outsideRadius = 200;
      let textRadius = 160;
      let insideRadius = 125;

      this.ctx = canvas.getContext("2d");
      this.ctx.clearRect(0, 0, 500, 500);

      this.ctx.strokeStyle = "black";
      this.ctx.lineWidth = 2;

      this.ctx.font = "bold 12px Helvetica, Arial";

      for (let i = 0; i < this.options.length; i++) {
        let angle = this.startAngle + i * this.arc;
        //this.ctx.fillStyle = colors[i];
        this.ctx.fillStyle = this.getColor(i, this.options.length);

        this.ctx.beginPath();
        this.ctx.arc(250, 250, outsideRadius, angle, angle + this.arc, false);
        this.ctx.arc(250, 250, insideRadius, angle + this.arc, angle, true);
        this.ctx.stroke();
        this.ctx.fill();

        this.ctx.save();
        this.ctx.shadowOffsetX = -1;
        this.ctx.shadowOffsetY = -1;
        this.ctx.shadowBlur = 0;
        this.ctx.shadowColor = "rgb(220,220,220)";
        this.ctx.fillStyle = "black";
        this.ctx.translate(
          250 + Math.cos(angle + this.arc / 2) * textRadius,
          250 + Math.sin(angle + this.arc / 2) * textRadius
        );
        this.ctx.rotate(angle + this.arc / 2 + Math.PI / 2);
        let text = this.options[i];
        this.ctx.fillText(text, -this.ctx.measureText(text).width / 2, 0);
        this.ctx.restore();
      }

      //Arrow
      this.ctx.fillStyle = "black";
      this.ctx.beginPath();
      this.ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
      this.ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
      this.ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
      this.ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
      this.ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
      this.ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
      this.ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
      this.ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
      this.ctx.fill();
    }
  }

  async listSeries() {
    this.options = await boletoServ.obtenerSeries();
    this.arc = Math.PI / (this.options.length / 2);
  }

  spin() {
    this.spinAngleStart = Math.random() * 10 + 10;
    this.spinTime = 0;
    this.spinTimeTotal = Math.random() * 3 + 4 * 1000;
    this.rotateWheel();
  }

  rotateWheel() {
    this.spinTime += 30;
    if (this.spinTime >= this.spinTimeTotal) {
      this.stopRotateWheel();
      return;
    }
    let spinAngle =
      this.spinAngleStart -
      this.easeOut(this.spinTime, 0, this.spinAngleStart, this.spinTimeTotal);
    this.startAngle += (spinAngle * Math.PI) / 180;
    this.drawRouletteWheel();
    this.spinTimeout = setTimeout(() => this.rotateWheel(), 30);
  }

  stopRotateWheel() {
    clearTimeout(this.spinTimeout);
    let degrees = (this.startAngle * 180) / Math.PI + 90;
    let arcd = (this.arc * 180) / Math.PI;
    let index = Math.floor((360 - (degrees % 360)) / arcd);
    this.ctx.save();
    this.ctx.font = "bold 30px Helvetica, Arial";
    let text = this.options[index];
    document.querySelector("#win-card").insertAdjacentHTML(
      "beforeend",
      `
      <p>${text}</p>
    `
    );
    this.ctx.fillText(
      text,
      250 - this.ctx.measureText(text).width / 2,
      250 + 10
    );
    this.ctx.restore();
  }

  easeOut(t, b, c, d) {
    let ts = (t /= d) * t;
    let tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  }
}

export default RuletaService;
