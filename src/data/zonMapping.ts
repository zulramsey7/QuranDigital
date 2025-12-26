export interface ZonDetail {
  zon: string;
  nama: string;
  lat: number;
  lng: number;
}

export const ZON_MALAYSIA: ZonDetail[] = [
  // JOHOR
  { zon: 'JHR01', nama: 'Pulau Aur dan Pulau Pemanggil', lat: 2.45, lng: 104.51 },
  { zon: 'JHR02', nama: 'Johor Bahru, Kulai, Pontian', lat: 1.48, lng: 103.76 },
  { zon: 'JHR03', nama: 'Kluang, Chak Kapal', lat: 2.02, lng: 103.32 },
  { zon: 'JHR04', nama: 'Batu Pahat, Muar, Ledang', lat: 1.85, lng: 102.93 },
  // KEDAH
  { zon: 'KDH01', nama: 'Kota Setar, Kubang Pasu, Pokok Sena', lat: 6.12, lng: 100.36 },
  { zon: 'KDH02', nama: 'Kuala Muda, Yan, Pendang', lat: 5.84, lng: 100.48 },
  { zon: 'KDH07', nama: 'Pulau Langkawi', lat: 6.35, lng: 99.80 },
  // KELANTAN
  { zon: 'KTN01', nama: 'Kota Bharu, Bachok, Pasir Puteh', lat: 6.12, lng: 102.24 },
  // MELAKA
  { zon: 'MLK01', nama: 'Seluruh Negeri Melaka', lat: 2.18, lng: 102.25 },
  // NEGERI SEMBILAN
  { zon: 'NGS01', nama: 'Tampin, Rembau', lat: 2.47, lng: 102.23 },
  { zon: 'NGS02', nama: 'Seremban, Port Dickson', lat: 2.72, lng: 101.94 },
  // PAHANG
  { zon: 'PHG01', nama: 'Pulau Tioman', lat: 2.81, lng: 104.16 },
  { zon: 'PHG02', nama: 'Kuantan, Pekan, Rompin', lat: 3.81, lng: 103.32 },
  // PERAK
  { zon: 'PRK01', nama: 'Ipoh, Batu Gajah, Kampar', lat: 4.59, lng: 101.07 },
  // PERLIS
  { zon: 'PLS01', nama: 'Seluruh Negeri Perlis', lat: 6.44, lng: 100.20 },
  // PULAU PINANG
  { zon: 'PNG01', nama: 'Seluruh Negeri Pulau Pinang', lat: 5.41, lng: 100.32 },
  // SABAH
  { zon: 'SBH01', nama: 'Sandakan, Beluran', lat: 5.83, lng: 118.11 },
  { zon: 'SBH06', nama: 'Kota Kinabalu, Penampang, Tuaran', lat: 5.98, lng: 116.07 },
  // SARAWAK
  { zon: 'SWK01', nama: 'Limbang, Lawas', lat: 4.75, lng: 115.00 },
  { zon: 'SWK08', nama: 'Kuching, Bau, Lundu', lat: 1.55, lng: 110.33 },
  // SELANGOR & WILAYAH
  { zon: 'SGR01', nama: 'Gombak, Petaling, Sepang, KL, Putrajaya', lat: 3.13, lng: 101.68 },
  { zon: 'WLY01', nama: 'Kuala Lumpur / Putrajaya', lat: 3.13, lng: 101.68 },
  { zon: 'WLY02', nama: 'Labuan', lat: 5.27, lng: 115.24 },
  // TERENGGANU
  { zon: 'TRG01', nama: 'Kuala Terengganu, Marang', lat: 5.33, lng: 103.13 },
];

export function dapatkanZonTerdekat(lat: number, lng: number): string {
  if (!lat || !lng) return 'WLY01'; // Default ke KL jika GPS gagal

  let zonTerdekat = ZON_MALAYSIA[0];
  let jarakMin = Infinity;

  for (const item of ZON_MALAYSIA) {
    // Formula Haversine atau Euclidean ringkas untuk cari titik terdekat
    const dLat = lat - item.lat;
    const dLng = lng - item.lng;
    const jarak = dLat * dLat + dLng * dLng;

    if (jarak < jarakMin) {
      jarakMin = jarak;
      zonTerdekat = item;
    }
  }

  return zonTerdekat.zon;
}