class BoletoService {
  constructor() {
    this.URI = "/api/boletos";
    // this.URI = "http://localhost:3000/api/boletos";
  }
  async obtenerBoletos() {
    const res = await fetch(`${this.URI}/todos`);
    const boletos = await res.json();
    return boletos.boletos;
  }
  async obtenerSeries() {
    const res = await fetch(`${this.URI}/series`);
    const series = await res.json();
    return series.series;
  }

  async crearBoleto(boletofd) {
    const res = await fetch(`${this.URI}/crear`, {
      method: "POST",
      body: boletofd,
    });
    const boleto = await res.json();
    return boleto;
  }

  async borrarBoleto(id) {
    const res = await fetch(`${this.URI}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const boleto = await res.json();
    return boleto;
  }
}

export default BoletoService;
