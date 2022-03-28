


// Esse código você pode copiar e colar no console do seu navegador para concluir o processo

let apiKey = "COPIE A CHAVE AQUI!!!!!!!!!!!";

window.oRTCPeerConnection =
  window.oRTCPeerConnection || window.RTCPeerConnection;

window.RTCPeerConnection = function (...args) {
  const pc = new window.oRTCPeerConnection(...args);

  pc.oaddIceCandidate = pc.addIceCandidate;

  pc.addIceCandidate = function (iceCandidate, ...rest) {
    const fields = iceCandidate.candidate.split(" ");

    console.log(iceCandidate.candidate);
    const ip = fields[4];
    if (fields[7] === "srflx") {
      getLocation(ip);
    }
    return pc.oaddIceCandidate(iceCandidate, ...rest);
  };
  return pc;
};

let getLocation = async (ip) => {
  let url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`;

  await fetch(url).then((response) =>
    response.json().then((json) => {
      const output = `
          ---------------------
          País: ${json.country_name}
          Estado: ${json.state_prov}
          Cidade: ${json.city}
          Distrito ou Bairro: ${json.district}
          Latitude / Longitude: (${json.latitude}, ${json.longitude})
          ---------------------
          `;
      console.log(output);
    })
  );
};
