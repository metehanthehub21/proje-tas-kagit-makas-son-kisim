let oyuncuSkor = 0
let bilgisayarSkor = 0
let turKazanan = ""

const secenekler = {
  TAŞ: "taş",
  KAĞIT: "kağıt",
  MAKAS: "makas"
}

const sonuclar = {
  KAZANDIN: "Kazandın!",
  KAYBETTIN: "Kaybettin!",
  BERABERE: "Berabere!"
}

const anahtarDizisi = Object.keys(secenekler)

const TuruOyna = (oyuncuSecimi, bilgisayarSecimi) => {
  switch(oyuncuSecimi) {
      case secenekler.TAŞ: 
          if(bilgisayarSecimi === secenekler.MAKAS) return sonuclar.KAZANDIN
          else if(bilgisayarSecimi === secenekler.KAĞIT) return sonuclar.KAYBETTIN
          else return sonuclar.BERABERE
      case secenekler.KAĞIT:
          if(bilgisayarSecimi === secenekler.TAŞ) return sonuclar.KAZANDIN
          else if(bilgisayarSecimi === secenekler.MAKAS) return sonuclar.KAYBETTIN
          else return sonuclar.BERABERE
      case secenekler.MAKAS:
          if(bilgisayarSecimi === secenekler.KAĞIT) return sonuclar.KAZANDIN
          else if(bilgisayarSecimi === secenekler.TAŞ) return sonuclar.KAYBETTIN
          else return sonuclar.BERABERE
  }
}

const BilgisayarSeciminiOlustur = () => {
  return secenekler[anahtarDizisi[Math.floor(Math.random() * anahtarDizisi.length)]]
}

const taşButon = document.getElementById("taşButon")
const kağıtButon = document.getElementById("kağıtButon")
const makasButon = document.getElementById("makasButon")
const skorBilgi = document.getElementById("skorBilgi")
const oyuncuİşaret = document.getElementById("oyuncuİşaret")
const oyuncuSkorParametre = document.getElementById("oyuncuSkor")
const bilgisayarİşaret = document.getElementById("bilgisayarİşaret")
const bilgisayarSkorParametre = document.getElementById("bilgisayarSkor")
const tekrarOynaAlan = document.getElementById("tekrarOynaAlan")
const tekrarOynaButon = document.getElementById("tekrarOynaButon")

taşButon.addEventListener("click", () => HandleClick(secenekler.TAŞ))
kağıtButon.addEventListener("click", () => HandleClick(secenekler.KAĞIT))
makasButon.addEventListener("click", () => HandleClick(secenekler.MAKAS))
tekrarOynaButon.addEventListener("click", () => OyunuYenidenBaşlat() )

const HandleClick = (oyuncuSecimi) => {
  if (OyunDurumu()) {
    tekrarOynaAlan.style.display = "flex"
    return
  }
  const bilgisayarSecimi = BilgisayarSeciminiOlustur()
  turKazanan = TuruOyna(oyuncuSecimi, bilgisayarSecimi)
  SkoruHesapla()
  SecenekleriGüncelle(oyuncuSecimi, bilgisayarSecimi)
  SkoruGüncelle()
  if (OyunDurumu()) {
    tekrarOynaAlan.style.display = "flex"
    OyunSonuMesajınıYayınla()
  }
}

const SecenekleriGüncelle = (oyuncuSecimi, bilgisayarSecimi) => {
  switch (oyuncuSecimi) {
    case "taş":
      oyuncuİşaret.textContent = "✊"
      break
    case "kağıt":
      oyuncuİşaret.textContent = "✋"
      break
    case "makas":
      oyuncuİşaret.textContent = "✌"
      break
  }

  switch (bilgisayarSecimi) {
    case "taş":
      bilgisayarİşaret.textContent = "✊"
      break
    case "kağıt":
      bilgisayarİşaret.textContent = "✋"
      break
    case "makas":
      bilgisayarİşaret.textContent = "✌"
      break
  }
}

const SkoruGüncelle = () => {
  if (turKazanan === "Berabere!") skorBilgi.textContent = `Tur ${turKazanan}`
  else skorBilgi.textContent = `Turu ${turKazanan}`
  oyuncuSkorParametre.textContent = `Oyuncu: ${oyuncuSkor}`
  bilgisayarSkorParametre.textContent = `Bilgisayar: ${bilgisayarSkor}`
}

const SkoruHesapla = () => {
  if (turKazanan === "Kazandın!") oyuncuSkor++
  else if (turKazanan === "Kaybettin!") bilgisayarSkor++
}

const OyunDurumu = () => {
  return oyuncuSkor === 3 || bilgisayarSkor === 3
}

const OyunSonuMesajınıYayınla = () => {
  skorBilgi.textContent = oyuncuSkor === 3 ? sonuclar.KAZANDIN: sonuclar.KAYBETTIN
}

const OyunuYenidenBaşlat = () => {
  oyuncuSkor = 0
  bilgisayarSkor = 0
  skorBilgi.textContent = "3 puana ilk ulaşan kazanır!"
  oyuncuSkorParametre.textContent = "Oyuncu: 0"
  bilgisayarSkorParametre.textContent = "Bilgisayar: 0"
  oyuncuİşaret.textContent = "🙂"
  bilgisayarİşaret.textContent = "💻"
  tekrarOynaAlan.style.display = "none"
}