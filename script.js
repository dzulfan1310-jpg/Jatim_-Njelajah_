// ==================== DATA ==================== //

console.log('Script.js loaded successfully');

// Track recently viewed regions
let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];

// Featured regions (monthly featured)
const FEATURED_REGIONS = ['Malang', 'Surabaya', 'Banyuwangi', 'Ponorogo'];

// Dashboard feature removed — carousel and related handlers deleted

// Sample dataset (static)
const REGIONS = {
  'Surabaya': {
    foods: ['Lontong Kupang', 'Sate Klopo', 'Rawon', 'Perkedel Goreng', 'Tahu Goreng'],
    traditions: ['Festival Pahlawan', 'Perayaan Kemerdekaan', 'Hari Jadi Surabaya', 'Pawai Budaya'],
    clothing: 'Baju Cak & Ning Surabaya',
    trivia: 'Kota terbesar di Jatim, pusat sejarah, ekonomi, dan pendidikan. Dikenal dengan semangat kepahlawanan dan inovasi kuliner.',
    history: 'Surabaya berkembang sejak era Majapahit, menjadi pusat perdagangan dan pelabuhan penting di Jawa Timur.',
    population: '≈ 2.9 juta (perk.)',
    area: '350 km²',
    attractions: ['Tugu Pahlawan', 'Kebun Binatang Surabaya', 'Jalan Tunjungan'],
    website: 'https://surabaya.go.id'
  },
  'Sidoarjo': { foods: ['Tahu Tek', 'Tahu Campur', 'Bakso Tahu', 'Tahu Goreng Pedas', 'Lumpia Tahu'], traditions: ['Festival Tahu', 'Pameran Produk Tahu', 'Upacara Syukuran Pengrajin'], clothing: 'Baju Adat Sidoarjo', trivia: 'Terkenal sebagai sentra produksi tahu terbesar di Indonesia dengan ratusan pengrajin.', history: 'Sidoarjo berkembang sebagai pusat industri tahu sejak awal abad ke-20 dan dikenal dengan lumpur Lapindo.' },
  'Gresik': { foods: ['Otak-otak', 'Lontong Kupang', 'Kue Lapis', 'Petis', 'Ikan Bakar'], traditions: ['Festival Nelayan', 'Tradisi Istana', 'Ziarah Makam'], clothing: 'Baju Adat Gresik', trivia: 'Kota pelabuhan dengan sejarah maritim yang kaya sejak zaman Sunan Giri.', history: 'Gresik adalah pelabuhan penting sejak abad ke-14 dan menjadi pusat penyebaran Islam di Jawa Timur.' },
  'Lamongan': { foods: ['Soto Lamongan', 'Wingko Babat', 'Soto Koya', 'Udang Goreng', 'Tinutuan'], traditions: ['Sedekah Bumi', 'Festival Budaya Pesisir', 'Tradisi Masyarakat Nelayan', 'Perayaan Hari Kemerdekaan'], trivia: 'Pelabuhan pesisir dengan kuliner khas Soto Lamongan yang terkenal, tradisi syukuran panen laut yang kuat.', history: 'Lamongan dikenal sejak masa kerajaan Majapahit dan berkembang sebagai kota pesisir dan kuliner.' },
  'Tuban': { foods: ['Bandeng Presto', 'Geger Pamanukan', 'Ikan Bakar', 'Gabus Goreng', 'Nasi Kuning Tuban'], traditions: ['Tradisi Nelayan', 'Festival Laut', 'Ritual Keselamatan Berlayar'], trivia: 'Pelabuhan tua dengan produksi bandeng berkualitas tinggi dan warisan maritim turun-temurun.', history: 'Tuban adalah pelabuhan kuno yang menjadi jalur perdagangan utama di pesisir utara Jawa Timur.' },
  'Bojonegoro': { foods: ['Sego Tempong', 'Sate Ayam', 'Nasi Kuning', 'Tempe Goreng', 'Bakso'], traditions: ['Ritual Panen', 'Upacara Desa', 'Perayaan Hasil Bumi'], trivia: 'Daerah agraris dengan tradisi panen yang kuat dan penghasil minyak bumi.', history: 'Bojonegoro dikenal sebagai daerah penghasil minyak bumi dan pertanian sejak masa kolonial.' },
  'Mojokerto': { foods: ['Lontong Balap', 'Sate Mozok', 'Perkedel', 'Tahu Goreng', 'Nasi Campur'], traditions: ['Festival Lokal', 'Perayaan Sejarah Majapahit', 'Upacara Budaya'], trivia: 'Kota bersejarah dekat situs Candi Majapahit dengan kuliner tradisional yang autentik.', history: 'Mojokerto adalah pusat kerajaan Majapahit, salah satu kerajaan terbesar di Nusantara.' },
  'Malang': {
    foods: ['Bakso Malang', 'Pecel Malang', 'Apel Malang', 'Biji Salak', 'Perkedel Kentang'],
    traditions: ['Festival Apel', 'Grebeg Malang', 'Festival Bunga', 'Hari Jadi Kota'],
    trivia: 'Dataran tinggi dengan pariwisata berkembang, pusat produksi apel, dan budaya yang dinamis.',
    history: 'Malang dahulu merupakan bagian dari Kerajaan Kanjuruhan dan berkembang pesat pada masa kolonial Belanda sebagai kota pendidikan dan wisata.',
    population: '≈ 862.000 (perk.)',
    area: '145 km²',
    attractions: ['Jatim Park', 'Alun-Alun Malang', 'Kebun Apel'],
    website: 'https://malangkota.go.id'
  },
  'Batu': { foods: ['Apel Batu', 'Oleh-oleh Apel', 'Kue Apel', 'Jus Buah Segar', 'Perkedel'], traditions: ['Festival Buah Apel', 'Perayaan Musim Panen', 'Pameran Produk Lokal'], trivia: 'Kota wisata dataran tinggi terkenal sebagai penghasil apel terbaik dengan pemandangan indah.', history: 'Batu berkembang sebagai kota wisata sejak masa kolonial Belanda dan terkenal dengan agrowisata apel.' },
  'Lumajang': { foods: ['Tape Lumajang', 'Ikan Segar', 'Jamur Tiram', 'Nasi Kuning', 'Empal'], traditions: ['Festival Bunga', 'Upacara Adat', 'Perayaan Panen'], trivia: 'Gerbang masuk ke kawasan Bromo dengan tradisi kuliner tape yang terkenal.', history: 'Lumajang merupakan daerah agraris yang berkembang sejak masa kerajaan Mataram Kuno.' },
  'Probolinggo': { foods: ['Rujak Cingur', 'Ikan Laut Segar', 'Ikan Bakar', 'Tinutuan', 'Cakalang'], traditions: ['Pesta Laut', 'Festival Budaya Pesisir', 'Tradisi Nelayan'], trivia: 'Dekat Gunung Bromo dengan pesisir timur yang indah dan budaya nelayan yang kental.', history: 'Probolinggo berkembang sebagai kota pelabuhan dan pintu gerbang ke Gunung Bromo.' },
  'Pasuruan': { foods: ['Tahu Pasuruan', 'Gurita Bakar', 'Ikan Bakar', 'Nasi Ulam', 'Rempeyek'], traditions: ['Wisata Bromo', 'Festival Budaya', 'Perayaan Idul Fitri'], trivia: 'Gerbang menuju Bromo dengan kuliner khas dan pariwisata yang menarik.', history: 'Pasuruan adalah kota pelabuhan kuno dan jalur utama menuju kawasan wisata Bromo.' },
  'Kediri': { foods: ['Pecel Kediri', 'Tape Kediri', 'Gethuk', 'Bakso', 'Lumpia'], traditions: ['Festival Keraton', 'Perayaan Keagamaan', 'Upacara Budaya'], clothing: 'Baju Adat Kediri', trivia: 'Kota pendidikan dengan sejarah yang kaya, dikenal sebagai kota literasi dan tradisi pesantren.' },
  'Blitar': { foods: ['Pecel Blitar', 'Pisang Goreng', 'Bakso Blitar', 'Gethuk', 'Tempe Goreng'], traditions: ['Ziarah Makam Bung Karno', 'Festival Budaya', 'Perayaan Kemerdekaan'], clothing: 'Baju Adat Blitar', trivia: 'Lokasi makam Bung Karno (Presiden RI pertama) dengan warisan sejarah yang mendalam.' },
  'Jombang': { foods: ['Soto Jombang', 'Empal Gentong', 'Pecel', 'Bakso Kuning', 'Gethuk'], traditions: ['Tradisi Pesantren', 'Festival Keagamaan', 'Upacara Desa'], clothing: 'Baju Adat Jombang', trivia: 'Kota santri dengan tradisi pesantren yang kuat, pusat pendidikan agama Islam yang terkenal.' },
  'Nganjuk': { foods: ['Ayam Goreng Nganjuk', 'Soto Ayam', 'Pecel', 'Nasi Kuning', 'Bakso'], traditions: ['Upacara Desa', 'Festival Budaya', 'Perayaan Panen'], clothing: 'Baju Adat Nganjuk', trivia: 'Daerah pegunungan dengan pertanian yang subur dan ayam goreng yang terkenal.' },
  'Madiun': { foods: ['Pecel Madiun', 'Gethuk', 'Nasi Goreng', 'Tempe Goreng', 'Soto Banjar'], traditions: ['Grebeg Madiun', 'Perayaan Budaya Lokal', 'Upacara Adat'], clothing: 'Baju Adat Madiun', trivia: 'Kota kecil dengan kuliner khas yang autentik dan budaya lokal yang kuat.' },
  'Magetan': { foods: ['Sate Magetan', 'Bakso Magetan', 'Pecel', 'Gethuk', 'Nasi Kuning'], traditions: ['Festival Lokal', 'Perayaan Keagamaan', 'Upacara Budaya'], clothing: 'Baju Adat Magetan', trivia: 'Dekat dengan Gunung Lawu yang indah dengan tradisi budaya yang mendalam.' },
  'Ngawi': { foods: ['Ikan Sungai Segar', 'Tempe', 'Bakso', 'Pecel', 'Gethuk'], traditions: ['Ritual Panen', 'Upacara Adat', 'Perayaan Budaya'], clothing: 'Baju Adat Ngawi', trivia: 'Terletak di tepi Bengawan Solo dengan tradisi pertanian dan nelayan yang kuat.' },
  'Banyuwangi': {
    foods: ['Rujak Cingur', 'Bebek Goreng Osing', 'Tinutuan', 'Ikan Bakar', 'Cakalang'],
    traditions: ['Gandrung (Tari Tradisional)', 'Festival Budaya Osing', 'Perayaan Kemerdekaan', 'Upacara Adat'],
    trivia: 'Budaya Osing yang khas, pintu gerbang menuju Bali dengan tradisi yang autentik dan kulinari yang unik.',
    history: 'Banyuwangi dikenal sebagai tanah Blambangan, kerajaan terakhir di Jawa Timur sebelum jatuh ke tangan Mataram dan Belanda.',
    population: '≈ 1.6 juta (kabupaten, perk.)',
    area: '5,782 km² (kabupaten)',
    attractions: ['Ijen Crater', 'Pantai Pulau Merah', 'Taman Blambangan'],
    website: 'https://banyuwangikab.go.id'
  },
  'Bondowoso': { foods: ['Tape Bondowoso', 'Kue Tradisional', 'Bakso', 'Nasi Kuning', 'Kopi Lokal'], traditions: ['Ritual Lokal', 'Upacara Adat', 'Festival Budaya'], clothing: 'Baju Adat Bondowoso', trivia: 'Pegunungan dengan produksi kopi lokal yang berkualitas dan tradisi kerajinan tangan.' },
  'Situbondo': { foods: ['Ikan Laut Segar', 'Rujak Sitinggil', 'Ikan Bakar', 'Tinutuan', 'Bakso Laut'], traditions: ['Pesta Laut', 'Festival Budaya Pesisir', 'Tradisi Nelayan'], clothing: 'Baju Adat Situbondo', trivia: 'Pesisir utara Jatim dengan tradisi nelayan yang kuat dan keindahan alam yang memukau.' },
  'Jember': {
    foods: ['Tape Ketan Jember', 'Rujak Jember', 'Bakso', 'Nasi Kuning', 'Tempe Goreng'],
    traditions: ['Jember Fashion Carnaval', 'Festival Budaya', 'Perayaan Lokal'],
    clothing: 'Baju Adat Jember',
    trivia: 'Kota kreatif dengan festival besar Jember Fashion Carnaval yang terkenal internasional.',
    history: 'Jember berkembang sebagai pusat budaya dan festival regional.',
    population: '≈ 1.3 juta (kabupaten, perk.)',
    area: '1,200 km² (kabupaten)',
    attractions: ['Pantai Papuma', 'Jember Fashion Carnaval', 'Taman Botani Sukorambi'],
    website: 'https://jemberkab.go.id'
  },
  'Ponorogo': { foods: ['Sate Ponorogo', 'Bakso', 'Pecel', 'Gethuk', 'Nasi Kuning'], traditions: ['Reog Ponorogo (Tari Epik)', 'Festival Reog', 'Upacara Budaya'], trivia: 'Pusat seni Reog yang terkenal dengan kesenian tradisional yang spektakuler dan bersejarah.', history: 'Ponorogo dikenal sebagai asal mula kesenian Reog, yang telah ada sejak abad ke-15 dan menjadi simbol perlawanan rakyat terhadap penguasa.' },
  'Pacitan': { foods: ['Ikan Laut Segar', 'Seafood Bakar', 'Ikan Asin', 'Tinutuan', 'Cakalang'], traditions: ['Festival Pantai', 'Perayaan Lokal', 'Upacara Budaya'], clothing: 'Baju Adat Pacitan', trivia: 'Pesisir selatan dengan pantai indah dan pariwisata yang berkembang serta nelayan tradisional.' },
  'Trenggalek': { foods: ['Ikan Laut', 'Kue Tradisional', 'Bakso', 'Pecel', 'Nasi Kuning'], traditions: ['Festival Budaya', 'Upacara Adat', 'Perayaan Lokal'], clothing: 'Baju Adat Trenggalek', trivia: 'Perpaduan pesisir dan pegunungan dengan tradisi budaya yang unik dan keindahan alam.' },
  'Tulungagung': { foods: ['Gethuk Tulungagung', 'Ikan Laut', 'Bakso', 'Pecel', 'Nasi Kuning'], traditions: ['Perayaan Lokal', 'Upacara Adat', 'Festival Budaya'], clothing: 'Baju Adat Tulungagung', trivia: 'Dikenal dengan produksi marmer berkualitas tinggi dan warisan seni tradisional yang kaya.' },
  'Sampang': { foods: ['Sate Madura', 'Lontong', 'Ikan Bakar', 'Bakso Madura', 'Cakalang'], traditions: ['Tradisi Madura', 'Perayaan Budaya', 'Upacara Adat'], clothing: 'Baju Adat Sampang', trivia: 'Kabupaten di Pulau Madura dengan budaya lokal yang kuat dan tradisi kuliner autentik.' },
  'Pamekasan': { foods: ['Brem Banyakan', 'Rujak Madura', 'Sate Madura', 'Bakso', 'Ikan Asap'], traditions: ['Karapan Sapi Madura', 'Festival Budaya', 'Perayaan Lokal'], clothing: 'Baju Adat Pamekasan', trivia: 'Salah satu pusat tradisi Madura dengan Karapan Sapi yang terkenal sebagai warisan budaya.' },
  'Sumenep': { foods: ['Ikan Laut Segar', 'Bubur Madura', 'Sate Madura', 'Bakso', 'Cakalang'], traditions: ['Festival Budaya Madura', 'Perayaan Lokal', 'Upacara Adat'], clothing: 'Baju Adat Sumenep', trivia: 'Madura bagian timur dengan budaya yang kuat, keindahan alam pantai, dan tradisi nelayan.' },

};

// Insert realistic-estimate summaries for each region so the info panel shows data directly.
const REGION_ESTIMATES = {
  // Madura
  'Bangkalan': {
    foods: ['Nasi Serpang','Soto Mata Sapi','Bebek Sinjay'],
    traditions: ['Karapan Sapi','Rokat Tase (petik laut)'],
    clothing: 'Baju Pesa\'an (pria), kebaya (wanita)',
    history: 'Pusat sejarah Madura bagian barat; pusat kekuasaan lokal sejak abad ke-16.'
  },
  
  // Updated with detailed potensi, makanan, tradisi, pakaian, sejarah (user-provided)
  'Bangkalan': {
    attractions: ['Jembatan Suramadu','Wisata Religi','Batik Tulis Madura','Tambak Garam'],
    foods: ['Soto Bangkalan','Bebek Sinjay','Lorjuk'],
    traditions: ['Karapan Sapi','Musik Saronen','Haul Ulama'],
    clothing: 'Baju Sakera dan Kebaya Madura dengan warna mencolok dan sarung kotak',
    history: 'Bangkalan merupakan pintu gerbang Pulau Madura dari arah Surabaya. Sejak zaman kerajaan, wilayah ini telah menjadi pusat pemerintahan lokal dan penyebaran Islam. Salah satu tokoh penting adalah Syaikhona Kholil, ulama besar yang berpengaruh di Nusantara. Pada masa kolonial, Bangkalan menjadi pusat pertanian garam dan perdagangan hasil laut. Belanda membangun pelabuhan dan infrastruktur untuk mendukung ekspor. Kini, Bangkalan berkembang sebagai kawasan industri dan wisata religi. Jembatan Suramadu mempercepat konektivitas dengan Surabaya, menjadikan Bangkalan lebih terbuka terhadap investasi dan pariwisata.'
  },
  'Pamekasan': {
    foods: ['Sate Laler','Soto Pamekasan','Lorjuk'],
    traditions: ['Karapan Sapi','Ojhung (adu rotan)'],
    clothing: 'Baju Pesa\'an / Baju Marlena untuk wanita',
    history: 'Pamekasan dikenal sebagai pusat tradisi Madura dan penyebaran Islam di pulau tersebut.'
  },
  'Sampang': {
    foods: ['Kaldu Kokot','Nasi Ghule','Rujak Selingkuh'],
    traditions: ['Karapan Sapi','Mamaca (membaca hikayat)'],
    clothing: 'Baju Pesa\'an',
    history: 'Memiliki sejarah kepangeranan lokal dan pengaruh ulama yang kuat.'
  },
  'Sumenep': {
    foods: ['Soto Jamur','Kaldu Soto','Kue Otok'],
    traditions: ['Karapan Sapi','Mondhug Tasek (petik laut)'],
    clothing: 'Baju Pesa\'an dengan modifikasi Keraton Sumenep',
    history: 'Bekas pusat Kerajaan Sumenep dengan keraton dan situs bersejarah.'
  },

  // Jawa Timur daratan
  'Banyuwangi': {
    attractions: ['Gunung Ijen (Ijen Crater)','Pantai Pulau Merah','Pantai Boom','Taman Blambangan','Desa Adat Kemiren (komunitas Osing)'],
    foods: ['Rujak Soto','Sego Tempong','Bebek Goreng Osing','Ikan Bakar Sambal Osing','Tinutuan (bubur Manado varian lokal)'],
    traditions: ['Gandrung (tari tradisional Osing)','Banyuwangi Ethno Carnival','Festival Gandrung Sewu','Upacara Petik Laut dan Larung Sesaji'],
    clothing: 'Pakaian adat Osing: kebaya dan batik khas untuk perempuan; surjan/beskap dipadukan sarung untuk pria, sering berornamen lokal Osing',
    history: 'Banyuwangi merupakan bekas Kerajaan Blambangan, salah satu kerajaan terakhir yang bertahan selepas runtuhnya kekuasaan Majapahit. Wilayah ini dikenal dengan keberagaman budaya Osing yang unik, yang mempertahankan bahasa, tarian, dan ritual sendiri. Pada masa kolonial, pesisir Banyuwangi menjadi pelabuhan dan pusat perdagangan, sedangkan daerah pegunungan berkembang sebagai kawasan pertanian. Kini Banyuwangi memadukan ekowisata (seperti Kawah Ijen), wisata pantai, dan pelestarian budaya Osing sebagai daya tarik utama pariwisata.'
  },
  'Blitar': {
    attractions: ['Makam Bung Karno (Kampoeng Merdeka)','Candi Penataran','Pantai Serang','Sumber Ubalan','Museum Bung Karno'],
    foods: ['Pecel Blitar','Wajik Kletik','Sate Kelinci (lokal)','Nasi Pecel dengan sambal khas'],
    traditions: ['Ziarah Makam Proklamator (ritual peringatan)','Larung Sesaji di pantai','Festival Kebudayaan Blitar','Pasar Rakyat & Kirab'],
    clothing: 'Pakaian adat Jawa Timuran (varian Mataraman); sarung, beskap, dan kebaya untuk acara adat',
    history: 'Blitar memiliki peran penting dalam sejarah nasional karena makam Presiden Soekarno yang menjadi titik ziarah dan identitas kota. Wilayah ini juga kaya situs sejarah dari masa Majapahit seperti Candi Penataran yang menunjukkan peran penting Blitar dalam peradaban kuno. Pada era kolonial, Blitar berkembang sebagai pusat pertanian dan pemerintahan lokal. Saat ini Blitar memadukan jejak sejarah, wisata religi, dan budaya lokal dalam kegiatan pariwisata dan edukasi.'
  },
  'Bojonegoro': {
    attractions: ['Sungai Bengawan Solo & Tepiannya','Wisata Kebun & Agrowisata lokal','Geopark/area geologi setempat','Monumen & museum lokal'],
    foods: ['Sego Tempong (varian lokal)','Nasi Fluk','Ledre','Olahan ikan sungai lokal'],
    traditions: ['Sedekah Bumi (ritual panen)','Wayang Thengul dan pagelaran wayang lokal','Kirab budaya desa'],
    clothing: 'Pakaian adat setempat dengan pengaruh lokal (baju tradisional petani dan busana upacara dengan tenun khas)',
    history: 'Bojonegoro adalah wilayah agraris yang sejak lama dikenal sebagai lumbung pertanian, juga memiliki cadangan energi (minyak) yang memengaruhi perkembangan ekonomi. Daerah ini kaya tradisi lokal termasuk ritual panen dan kesenian wayang yang diwarisi secara turun-temurun. Pada masa kolonial dan pasca-kolonial, Bojonegoro berkembang menjadi pusat komoditas pertanian dan industri kecil, sambil mempertahankan praktik budaya tradisional desa.'
  },
  'Bondowoso': {
    attractions: ['Gunung Raung (viewpoint & trekking access)','Agrowisata perkebunan kopi dan hasil pertanian lokal','Situs megalitik & cagar budaya','Air terjun & jalur alam pedesaan'],
    foods: ['Tape Manis Bondowoso','Nasi Kawul','Singkong Keju','Olahan kopi lokal'],
    traditions: ['Tari Singo Ulung','Gandrung','Ritual panen & upacara adat desa'],
    clothing: 'Pakaian adat Jawa Timur dengan variasi lokal (busana upacara dan busana petani untuk festival pertanian)',
    history: 'Bondowoso dikenal sebagai kawasan agraris dan penghasil tape tradisional yang menjadi ciri kuliner lokal. Wilayah ini memiliki jejak budaya kuno berupa situs megalitik dan merupakan pintu masuk bagi pendaki Gunung Raung yang menawarkan pemandangan pegunungan dan ekowisata. Perpaduan tradisi pertanian dan ritual adat masih kuat di desa-desa sekitar.',
    trivia: 'Terkenal dengan tape manisnya dan komunitas petani kopi/pertanian skala kecil yang menyelenggarakan pasar musiman.'
  },
  'Gresik': {
    attractions: ['Makam Wali & situs ziarah (kawasan bersejarah)','Pelabuhan lama & kawasan pesisir','Mangrove dan wisata bahari lokal','Museum & situs kolonial kecil'],
    foods: ['Nasi Krawu','Otak-otak Bandeng','Pudak','Kuliner pesisir bandeng & ikan asap'],
    traditions: ['Rebo Wekasan','Ziarah makam wali lokal','Pasar tradisional & festival laut'],
    clothing: 'Pakaian pesisir Jawa: perpaduan busana Jawa dan ornamen pesisir untuk acara adat',
    history: 'Gresik adalah salah satu pelabuhan tua di pesisir Jawa Timur yang berperan penting dalam penyebaran agama dan perdagangan sejak masa klasik hingga era kolonial. Kota ini juga menjadi pusat awal penyebaran Islam di kawasan pantai utara Jawa Timur, dengan jejak ziarah dan situs bersejarah yang masih dikunjungi hingga kini.',
    trivia: 'Gresik menggabungkan tradisi pelabuhan, kuliner bandeng khas, dan perkembangan industri di pinggir pantai.'
  },
  'Jember': {
    attractions: ['Pantai Papuma','Taman Botani Sukorambi','Kebun & Agrowisata tembakau','Alun-alun & pusat budaya kota','Festival Jember Fashion Carnaval (JFC)'],
    foods: ['Suwar-Suwir','Prol Tape','Edamame','Rujak Petis & jajanan pasar lokal','Olahan kopi dan makanan dari kebun lokal'],
    traditions: ['Jember Fashion Carnaval (JFC)','Larung Sesaji & upacara pantai di komunitas pesisir','Festival panen & pasar rakyat'],
    clothing: 'Pakaian adat campuran Jawa dan pengaruh pesisir; busana cerimonial untuk acara JFC dan festival lokal',
    history: 'Jember berkembang sebagai pusat perkebunan (termasuk tembakau) sejak era kolonial dan kemudian menjadi pusat kultural di bagian selatan Jawa Timur. Keberadaan perkebunan memengaruhi pola ekonomi lokal dan persinggahan budaya dari berbagai komunitas pesisir dan pegunungan. Sejak akhir abad ke-20, Jember dikenal secara internasional lewat Jember Fashion Carnaval yang menarik partisipasi desainer dan pengunjung luar negeri, sambil tetap mempertahankan tradisi lokal dan kegiatan pertanian sebagai penggerak ekonomi.',
    trivia: 'Jember dikenal berkat JFC yang berskala internasional dan produksi edamame serta produk perkebunan lain yang sering dipasarkan di festival lokal.'
  },
  'Jombang': {
    attractions: ['Pesantren Tebuireng (ziarah & jejak keilmuan)','Alun-alun & pasar tradisional','Situs-situs Majapahit kecil di area sekitarnya','Rute kuliner lokal dan warung tradisional'],
    foods: ['Es Degan','Sate Bandeng','Tahu Pong','Nasi Pecel Jombang','Ketan & kue pasar lokal'],
    traditions: ['Peringatan hari pesantren & haul ulama','Gelar Budaya Majapahit (kegiatan lokal)','Ujung (adu rotan dan permainan tradisional)'],
    clothing: 'Pakaian adat Jawa Timuran; busana santri tradisional untuk acara keagamaan dan pakaian adat untuk upacara komunitas',
    history: 'Jombang dikenal sebagai kota santri dengan sejarah pesantren yang panjang, termasuk Pesantren Tebuireng yang berdiri sejak awal abad ke-20 dan menjadi pusat pengajaran Islam di Jawa Timur. Selain peran religius, wilayah ini juga memiliki jejak aktivitas perdagangan dan kebudayaan yang menghubungkan komunitas pesisir dan pedalaman. Tradisi keagamaan dan pasar rakyat masih menjadi bagian penting kehidupan sosial setempat.',
    trivia: 'Jombang sering dijuluki kota santri dan menjadi tujuan studi serta ziarah bagi pelajar dan pelancong yang tertarik dengan sejarah pesantren dan tradisi keagamaan.'
  },
  'Kediri': {
    attractions: ['Candi Tegowangi & situs purbakala','Akses ke Gunung Kelud (viewpoint & aktivitas pendakian)','Wisata arkeologi dan rute jejak Kerajaan Kediri (Panjalu)','Alun-alun & pasar tradisional kota'],
    foods: ['Tahu Takwa','Getuk Pisang','Stik Tahu','Sego Pecel Kediri','Jajanan pasar lokal'],
    traditions: ['Grebeg Suro','Larung Sesaji lokal (ritual masyarakat pesisir/daerah aliran sungai)','Festival kebudayaan daerah dan pasar rakyat'],
    clothing: 'Pakaian adat Jawa (varian Mataraman) untuk acara resmi; berpakaian tradisional masyarakat pedesaan pada upacara adat',
    history: 'Kediri merupakan salah satu pusat peradaban Jawa kuno, dikenal sebagai Kerajaan Kediri (Panjalu) yang meninggalkan jejak arkeologis penting. Pada masa klasik dan pertengahan, Kediri memainkan peran kultural dan politik, dengan situs-situs bersejarah yang tersebar di wilayah sekitarnya. Perdagangan dan pertanian menguatkan posisi kota ini sepanjang sejarah, sementara tradisi lokal terus dilestarikan dalam upacara dan festival.',
    trivia: 'Identik dengan produksi tahu khas dan jejak sejarah Kerajaan Kediri; banyak situs purbakala yang menarik minat peneliti dan wisatawan.'
  },
  'Lamongan': {
    attractions: ['Soto Lamongan Trail & Warung Tradisional','Wisata Bahari dan Pelabuhan Kecil','Makam Sunan Drajat & situs ziarah','Taman Rekreasi dan pasar ikan pesisir'],
    foods: ['Soto Lamongan (varian asli)','Wingko Babat','Nasi Boranan','Olahan Udang & seafood lokal'],
    traditions: ['Tari Boran (kesenian tradisional)','Jejak Budaya Sunan Drajat (ziarah & ritual)','Sedekah Laut dan festival pesisir'],
    clothing: 'Pakaian adat pesisir Jawa (gaya pesisir), busana adat untuk upacara keagamaan dan tradisi lokal',
    history: 'Lamongan berkembang sebagai pusat pesisir yang menghubungkan jalur perdagangan laut dan darat sejak masa kerajaan. Kota ini dikenal karena peranannya dalam penyebaran Islam di pesisir utara Jawa Timur melalui tokoh-tokoh wali dan situs ziarah. Perpaduan budaya pesisir dan tradisi agraris menghasilkan kuliner khas dan festival lokal yang menarik wisatawan.',
    trivia: 'Soto Lamongan adalah ikon kuliner kota ini; Lamongan juga dikenal sebagai pusat ziarah Sunan Drajat dan festival pesisir.'
  },
  'Lumajang': {
    attractions: ['Gunung Semeru (akses & viewpoint nearby)','Rute ke Gunung Bromo (akses dan wisata alam)','Air Terjun dan jalur treking lokal','Kebun & pasar hasil pertanian setempat','Taman wisata desa & homestay agrowisata'],
    foods: ['Pisang Agung Lumajang','Rujak Cingur Lumajang','Pecel Lele','Olahan singkong & kue pasar lokal'],
    traditions: ['Tari Godril','Jaran Kencak','Ritual panen dan sedekah bumi desa'],
    clothing: 'Pakaian adat khas pegunungan Jawa Timur untuk upacara adat dan pakaian tradisional masyarakat agraris',
    history: 'Lumajang merupakan gerbang menuju kawasan Bromo dan mempunyai sejarah lokal yang terkait dengan kerajaan regional dan pemanfaatan agraris pegunungan. Sejak masa kolonial, daerah ini berkembang sebagai kawasan pertanian dan perdagangan hasil kebun. Keunikan geologi serta tradisi masyarakat pegunungan menjadi daya tarik tersendiri bagi wisatawan dan peneliti.',
    trivia: 'Terkenal sebagai pintu gerbang Bromo dengan produk pertanian khas seperti Pisang Agung dan kegiatan agrowisata yang berkembang.'
  },
  'Madiun': {
    attractions: ['Alun-Alun & Kawasan Kota Tua','Museum Peristiwa Madiun (site sejarah)','Rute kuliner Pecel & pasar tradisional lokal'],
    foods: ['Pecel Madiun','Nasi Pecel Madiun','Brem Madiun','Bluder Cokro'],
    traditions: ['Grebeg Maulud','Dongkrek','Kirab Hari Jadi Kota'],
    clothing: 'Pakaian adat Madiun (varian Mataraman): sarung, beskap, dan kebaya untuk upacara adat',
    history: 'Madiun dikenal karena peran historisnya pada abad ke-20, termasuk Peristiwa Madiun 1948. Selain itu kota ini memiliki tradisi pesantren dan pusat perdagangan kecil yang berkembang sejak masa kolonial. Identitas kuliner (pecel) dan produksi brem menjadi bagian penting kehidupan ekonomi lokal.',
    trivia: 'Terkenal dengan pecel Madiun dan brem tradisional; memiliki situs sejarah yang menarik bagi penelusuran peristiwa nasional.'
  },
  'Magetan': {
    attractions: ['Telaga Sarangan (viewpoint & boating)','Gunung Lawu foothills routes','Pasar Tradisional Maospati & festival lokal'],
    foods: ['Jeruk Pamelo','Pia Magetan','Tape Ketan','Sate Maranggi (varian lokal)'],
    traditions: ['Merti Desa','Genduri','Kirab Hari Jadi & upacara panen'],
    clothing: 'Pakaian adat Magetan (varian Mataraman): sarung, kebaya, dan batik lokal untuk upacara',
    history: 'Magetan berkembang sebagai kota pegunungan dan agraris dengan sejarah pesantren dan pusat perdagangan lokal. Telaga Sarangan menjadi ikon wisata sejak masa kolonial dan mendorong pertumbuhan ekonomi pariwisata di sekitarnya.',
    trivia: 'Terkenal dengan Jeruk Pamelo dan pasar Maospati; Telaga Sarangan populer untuk wisata keluarga dan kegiatan outbound.',
    population: '670.000 jiwa',
    area: '688 km²'
  },
  'Malang': {
    foods: ['Bakso Malang','Cwie Mie','Apel Malang'],
    traditions: ['Bantengan','Tradisi Tengger'],
    clothing: 'Pakaian adat Malangan (perpaduan Mataraman & pesisir)',
    history: 'Bekas pusat Kerajaan Singhasari dengan banyak situs purbakala.'
  },
  'Mojokerto': {
    foods: ['Onde-Onde','Kerupuk Rambak','Sambel Wader'],
    traditions: ['Grebeg Suro','Pencak Macan'],
    clothing: 'Pakaian adat Mojokerto (motif Majapahit)',
    history: 'Pusat peradaban Majapahit (Trowulan) dengan banyak situs arkeologis.'
  },
  'Nganjuk': {
    foods: ['Nasi Becek','Dumbleg','Bawang Merah lokal'],
    traditions: ['Tari Lenggo-Lenggok','Sedekah Bumi'],
    clothing: 'Pakaian adat Nganjuk',
    history: 'Terkait legenda Panji dan pusat pertanian lokal.'
  },
  'Ngawi': {
    foods: ['Tepo Tahu','Lethok','Keripik Tempe'],
    traditions: ['Grebeg Suran','Tari Orek-Orek'],
    clothing: 'Pakaian adat Ngawi',
    history: 'Daerah tepi Bengawan Solo dengan warisan agraris dan sejarah lokal.'
  },
  'Pacitan': {
    foods: ['Nasi Tiwul','Sale Pisang','Kerupuk Ikan'],
    traditions: ['Grebeg Suro di Goa Gong','Larung Sesaji'],
    clothing: 'Pakaian adat Pacitan (pesisir selatan)',
    history: 'Kota kelahiran tokoh nasional dan terkenal dengan geologi goa serta pantai.'
  },
  'Pasuruan': {
    foods: ['Bipang Jipang','Sate Komoh','Rawon Pasuruan'],
    traditions: ['Grebeg Suran','Tradisi Tengger'],
    clothing: 'Pakaian adat Pasuruan (pengaruh pesisir & Tengger)',
    history: 'Pelabuhan penting sejak kolonial dan akses menuju Bromo.'
  },
  'Ponorogo': {
    foods: ['Sate Ponorogo','Dawet Jabung','Tiwul Getuk'],
    traditions: ['Reog Ponorogo','Grebeg Suro'],
    clothing: 'Pakaian Warok dan kostum Jathil',
    history: 'Asal seni Reog, bagian penting budaya dan sejarah lokal.'
  },
  'Probolinggo': {
    foods: ['Anggur Probolinggo','Mangga Manalagi','Soto Kraksaan'],
    traditions: ['Grebeg Suro','Tradisi Tengger'],
    clothing: 'Pakaian adat Probolinggo (pesisir & Tengger)',
    history: 'Kawasan pertanian kuat dan pintu gerbang ke Bromo.'
  },
  'Situbondo': {
    foods: ['Soto Kikil','Nasi Karak','Tajin Palappa'],
    traditions: ['Petik Laut','Upacara Nelayan'],
    clothing: 'Pakaian adat Situbondo (pesisir & Madura pengaruh)',
    history: 'Bagian Tapal Kuda dengan tradisi bahari dan konservasi alam.'
  },
  'Trenggalek': {
    foods: ['Nasi Gegok','Ayam Lodho','Alen-Alen'],
    traditions: ['Larung Sesaji Pantai Prigi'],
    clothing: 'Pakaian adat Trenggalek',
    history: 'Daerah pegunungan dan pantai selatan dengan peninggalan budaya lokal.'
  },
  'Tuban': {
    foods: ['Kare Rajungan','Ampo','Krupuk Rambak'],
    traditions: ['Tayuban','Sedekah Bumi'],
    clothing: 'Pakaian adat pesisir Tuban',
    history: 'Dikenal sebagai Bumi Wali dan pelabuhan penting pada masa Majapahit.'
  },
  'Tulungagung': {
    foods: ['Nasi Lodho','Kopi Ijo','Getuk Pisang'],
    traditions: ['Ujung (adu rotan)','Nyadran'],
    clothing: 'Pakaian adat Tulungagung',
    history: 'Pusat kerajinan marmer dengan sejarah budaya Mataram Kuno.'
  },

  // Kota besar
  'Surabaya': {
    foods: ['Rujak Cingur','Lontong Balap','Tahu Tek'],
    traditions: ['Kenduren','Perayaan Hari Pahlawan'],
    clothing: 'Pakaian adat Suroboyoan (Baju Pencak & Kebaya)',
    history: 'Kota Pahlawan; pelabuhan penting sejak era Majapahit dan pusat perjuangan 10 November 1945.'
  },
  'Batu': {
    attractions: ['Kebun Apel & Petik Apel','Jatim Park (Jatim Park 2 & Batu Secret Zoo)','Museum Angkut','Selecta','Gunung Panderman','Alun-alun Kota Batu'],
    foods: ['Apel Batu','Susu Segar & Olahan Susu','Keripik Buah','Bakso Malang (varian lokal)'],
    traditions: ['Petik Apel (panen bersama & festival lokal)','Festival Apel & Produk Pertanian','Seni Bantengan (tradisi kesenian)'],
    clothing: 'Pakaian adat Malangan (varian Mataraman) untuk acara resmi; busana rakyat petani dalam kegiatan pertanian apel',
    history: 'Batu merupakan kota dataran tinggi yang dimekarkan dari Kabupaten Malang pada awal abad ke-21 untuk mendukung pengelolaan pariwisata dan pertanian. Sejak era kolonial, kawasan ini dikenal sebagai daerah perkebunan dan tempat peristirahatan dataran tinggi. Perkembangan wisata modern (seperti taman rekreasi, museum, dan agrowisata) menjadikan Batu sebagai destinasi wisata keluarga dan agro-ekowisata yang penting di Jawa Timur. Infrastruktur pariwisata terus berkembang untuk menunjang arus pengunjung domestik dan internasional.',
    trivia: 'Kota Batu terkenal dengan produksi apel berkualitas yang dipasarkan ke seluruh Jawa, serta festival dan pasar agrikultur musiman.'
  }
};

// Merge estimates into REGIONS; where estimate exists, overwrite or add fields.
Object.keys(REGIONS).forEach(region => {
  const entry = REGIONS[region];
  const est = REGION_ESTIMATES[region];
  if (est) {
    entry.population = est.population || entry.population || 'Informasi populasi tidak tersedia';
    entry.area = est.area || entry.area || 'Informasi luas tidak tersedia';
    entry.attractions = est.attractions && est.attractions.length ? est.attractions : (entry.attractions && entry.attractions.length ? entry.attractions : ['Atraksi lokal tidak tersedia']);
    entry.website = est.website || entry.website || '';
  } else {
    // For regions without a detailed estimate, keep existing or provide a concise generic summary
    if (!entry.population) entry.population = 'Perkiraan populasi wilayah (data ringkasan)';
    if (!entry.area) entry.area = 'Perkiraan luas wilayah (km²)';
    if (!entry.attractions || !Array.isArray(entry.attractions) || entry.attractions.length === 0) entry.attractions = ['Atraksi lokal tidak tersedia'];
    if (!entry.website) entry.website = '';
  }
});

// --- Insert 2025 area & population estimates provided by the user ---
// These are merged into REGION_ESTIMATES so the UI shows the requested values.
const NUMERIC_ESTIMATES_2025 = {
  'Bangkalan': { area: '1.260 km²', population: '1.080.000 jiwa' },
  'Banyuwangi': { area: '5.782 km²', population: '1.735.000 jiwa' },
  'Blitar': { area: '1.558 km²', population: '1.180.000 jiwa' },
  'Bojonegoro': { area: '2.307 km²', population: '1.320.000 jiwa' },
  'Bondowoso': { area: '1.560 km²', population: '780.000 jiwa' },
  'Gresik': { area: '1.191 km²', population: '1.390.000 jiwa' },
  'Jember': { area: '3.293 km²', population: '2.556.000 jiwa' },
  'Jombang': { area: '1.159 km²', population: '1.330.000 jiwa' },
  'Kediri': { area: '1.563 km²', population: '1.620.000 jiwa' },
  'Lamongan': { area: '1.812 km²', population: '1.390.000 jiwa' },
  'Lumajang': { area: '1.790 km²', population: '1.130.000 jiwa' },
  'Madiun': { area: '1.010 km²', population: '760.000 jiwa' },
  'Magetan': { area: '688 km²', population: '670.000 jiwa' },
  'Malang': { area: '3.534 km²', population: '2.663.000 jiwa' },
  'Mojokerto': { area: '969 km²', population: '1.180.000 jiwa' },
  'Nganjuk': { area: '1.224 km²', population: '1.110.000 jiwa' },
  'Ngawi': { area: '1.394 km²', population: '870.000 jiwa' },
  'Pacitan': { area: '1.389 km²', population: '610.000 jiwa' },
  'Pamekasan': { area: '792 km²', population: '890.000 jiwa' },
  'Pasuruan': { area: '1.474 km²', population: '1.660.000 jiwa' },
  'Ponorogo': { area: '1.371 km²', population: '950.000 jiwa' },
  'Probolinggo': { area: '1.696 km²', population: '1.160.000 jiwa' },
  'Sampang': { area: '1.233 km²', population: '960.000 jiwa' },
  'Sidoarjo': { area: '719 km²', population: '2.120.000 jiwa' },
  'Situbondo': { area: '1.638 km²', population: '670.000 jiwa' },
  'Sumenep': { area: '2.093 km²', population: '1.150.000 jiwa' },
  'Trenggalek': { area: '1.261 km²', population: '730.000 jiwa' },
  'Tuban': { area: '1.834 km²', population: '1.180.000 jiwa' },
  'Tulungagung': { area: '1.144 km²', population: '1.110.000 jiwa' },
  'Batu': { area: '199 km²', population: '230.000 jiwa' },
  'Surabaya': { area: '350 km²', population: '3.050.000 jiwa' }
};

Object.keys(NUMERIC_ESTIMATES_2025).forEach(r => {
  REGION_ESTIMATES[r] = REGION_ESTIMATES[r] || {};
  REGION_ESTIMATES[r].area = NUMERIC_ESTIMATES_2025[r].area;
  REGION_ESTIMATES[r].population = NUMERIC_ESTIMATES_2025[r].population;
});

// Ensure regions listed in REGION_ESTIMATES are also present in REGIONS
// This makes sure places like 'Bangkalan' (which may only exist in REGION_ESTIMATES)
// are included in the city grid and get map markers.
Object.keys(REGION_ESTIMATES).forEach(r => {
  if(!REGIONS[r]) REGIONS[r] = {};
  const est = REGION_ESTIMATES[r] || {};
  REGIONS[r].foods = REGIONS[r].foods || est.foods || [];
  REGIONS[r].traditions = REGIONS[r].traditions || est.traditions || [];
  REGIONS[r].clothing = REGIONS[r].clothing || est.clothing || '';
  REGIONS[r].trivia = REGIONS[r].trivia || est.trivia || '';
  REGIONS[r].history = REGIONS[r].history || est.history || '';
  REGIONS[r].population = REGIONS[r].population || est.population || '';
  REGIONS[r].area = REGIONS[r].area || est.area || '';
  REGIONS[r].attractions = REGIONS[r].attractions || est.attractions || [];
  REGIONS[r].website = REGIONS[r].website || est.website || '';
});

// Traditional calendar / annual events per region
// Dates that follow the Hijri or Javanese calendar are given as estimates and may shift yearly.
const REGION_CALENDAR = {
  'Bangkalan': [
    { date: 'Agustus - Oktober (musim kemarau)', title: 'Karapan Sapi (seri & final)', desc: 'Musim pertandingan Karapan Sapi; final nasional bergeser setiap tahun.' }
  ],
  'Banyuwangi': [
    { date: 'Sepanjang tahun (rangkaian)', title: 'Banyuwangi Festival (B-Fest)', desc: 'Rangkaian event pariwisata dan budaya.' },
    { date: 'Juli (contoh: 12-13 Juli 2025)', title: 'Banyuwangi Ethno Carnival (BEC)', desc: 'Karnaval etnik dan budaya lokal (tanggal bisa berubah).' },
    { date: 'Oktober (contoh: 23-25 Oktober 2025)', title: 'Festival Gandrung Sewu', desc: 'Tari kolosal Gandrung di Pantai Boom dan area publik lainnya.' }
  ],
  'Blitar': [
    { date: '1 Suro (perkiraan)', title: 'Larung Sesaji (Pantai Serang)', desc: 'Upacara adat larung sesaji; 1 Suro mengikuti kalender Jawa/Hijri.' }
  ],
  'Bojonegoro': [
    { date: 'Mei - Juni', title: 'Festival Geopark Bojonegoro', desc: 'Rangkaian acara alam dan budaya (festival geowisata).'}
  ],
  'Bondowoso': [
    { date: 'Bulan Safar (perkiraan)', title: 'Tajin Safar (Asafar)', desc: 'Rangkaian ritual dan acara tradisi yang mengikuti bulan Safar.' }
  ],
  'Gresik': [
    { date: '25 Ramadan (Malam Selawe)', title: 'Malam Selawe', desc: 'Malam ke-25 Ramadan tradisi lokal (tanggal Hijri bergeser tiap tahun).' },
    { date: 'Menjelang Idulfitri', title: 'Pasar Bandeng', desc: 'Pekan kuliner dan penjualan makanan khas menjelang Lebaran.' },
    { date: 'Safar akhir (bergantung kalender)', title: 'Rebo Wekasan Desa Suci', desc: 'Ritual tradisional yang mengikuti kalender lokal.' }
  ],
  'Jember': [
    { date: 'Agustus (contoh: 23 Agustus 2025)', title: 'Gerak Jalan Tajemtra (Tanggul-Jember)', desc: 'Kirab jalan kaki massal dan kegiatan kemasyarakatan.' },
    { date: 'Agustus', title: 'Jember Fashion Carnaval (JFC)', desc: 'Parade kostum internasional dan acara kreatif tahunan.' }
  ],
  'Jombang': [
    { date: 'Mei (perkiraan)', title: 'Riyaya Undhuh-Undhuh (Mojowarno)', desc: 'Panen padi dan acara adat lokal; tanggal tahunan dapat berubah.' }
  ],
  'Kediri': [
    { date: '1 Suro (perkiraan)', title: 'Tradisi Satu Suro', desc: 'Peringatan 1 Muharram menurut kalender Jawa/Hijri; acara ritual dan kirab.' }
  ],
  'Lamongan': [
    { date: 'Akhir Mei (tahunannya)', title: 'Hari Jadi Lamongan', desc: 'Perayaan hari jadi kabupaten dengan kirab dan pagelaran seni.' }
  ],
  'Nganjuk': [
    { date: '15 Muharram (perkiraan)', title: 'Siraman Sedudo', desc: 'Ritual tradisional Siraman Sedudo; tanggal mengikuti kalender Jawa/Hijri.' }
  ],
  'Pacitan': [
    { date: 'Dzulqa\'dah (Senin Kliwon, perkiraan Mei/Juni)', title: 'Upacara Adat Ceprotan', desc: 'Ritual lokal yang mengikuti pentas kalender tradisi; tanggal dapat bergeser.' }
  ],
  'Pasuruan': [
    { date: '14 Kasada (Kalender Tengger, perkiraan awal Juni)', title: 'Yadnya Kasada (Bromo)', desc: 'Upacara besar suku Tengger, puncak ritual pada tanggal Kasada.' }
  ],
  'Probolinggo': [
    { date: '14 Kasada (Kalender Tengger, perkiraan awal Juni)', title: 'Yadnya Kasada (Bromo - wilayah pengiring)', desc: 'Upacara Tengger yang juga mempengaruhi daerah akses Bromo.' }
  ],
  'Ponorogo': [
    { date: '1 Suro (perkiraan)', title: 'Grebeg Suro & Festival Reog', desc: 'Rangkaian Grebeg Suro dan festival Reog sebagai acara budaya utama.' }
  ],
  'Surabaya': [
    { date: 'Mei', title: 'Parade Bunga dan Budaya (HJKS)', desc: 'Parade dan pameran dalam rangka Hari Jadi Kota Surabaya.' }
  ],

  // Events with shifting dates (announced yearly by local government)
  'Lumajang': [ { date: 'Februari (tanggal bergeser)', title: 'Patrol Musik Festival', desc: 'Festival musik lokal/pertunjukan; tanggal ditetapkan tiap tahun.' } ],
  'Madiun': [ { date: 'Bulan Suro / Juli (bergantung acara)', title: 'Suronan / Hari Jadi Madiun', desc: 'Tradisi Suronan (Suro) dan peringatan Hari Jadi; tanggal dapat berubah.' } ],
  'Magetan': [ { date: 'Desember - Januari (bergeser)', title: 'Kirab Budaya "Boyong Kantor"', desc: 'Kirab dan acara budaya tahunan saat pemindahan kantor atau perayaan daerah.' } ],
  'Malang': [ { date: 'Oktober - November (bergeser)', title: 'Festival Bantengan & Gebyak Wayang Topeng', desc: 'Rangkaian festival seni tradisional dan topeng Malangan.' } ],
  'Mojokerto': [ { date: 'Mei (bergeser)', title: 'Parade Tumpeng & Majapahit Travel Fair', desc: 'Acara kuliner dan promosi warisan Majapahit.' } ],
  'Ngawi': [ { date: 'Tanggal bergeser', title: 'Ngawi Agri Expo', desc: 'Pameran pertanian dan expo komoditas lokal; tanggal variatif.' } ],
  'Pamekasan': [ { date: 'Agustus - Oktober', title: 'Karapan Sapi (Penyisihan)', desc: 'Babak penyisihan Karapan Sapi sebelum musim final.' } ],
  'Sampang': [ { date: 'Agustus - Oktober', title: 'Karapan Sapi (Penyisihan)', desc: 'Sesi kualifikasi Karapan Sapi tingkat kabupaten.' } ],
  'Sumenep': [ { date: 'Agustus - Oktober', title: 'Karapan Sapi (Penyisihan)', desc: 'Serangkaian pertandingan Karapan Sapi lokal.' } ],
  'Sidoarjo': [ { date: 'Tanggal bergeser', title: 'Festival Gelar Budaya Kota Udang', desc: 'Festival budaya dan kuliner, tanggal diumumkan oleh pemda.' } ],
  'Situbondo': [ { date: 'Syawal / musim (bergeser)', title: 'Petik Laut / Larung Sesaji', desc: 'Ritual nelayan; tanggal menyesuaikan musim dan kalender lokal.' } ],
  'Tuban': [ { date: 'Syawal / musim (bergeser)', title: 'Petik Laut / Larung Sesaji', desc: 'Upacara laut tahunan di komunitas pesisir Tuban.' } ],
  'Trenggalek': [ { date: 'Tanggal bergeser', title: 'Upacara Adat Longkangan / Uluk-Uluk', desc: 'Ritual adat lokal dengan tanggal yang tidak tetap.' } ],
  'Tulungagung': [ { date: 'Tanggal bergeser', title: 'Upacara Adat Longkangan / Uluk-Uluk', desc: 'Rangkaian upacara adat yang bergeser tiap tahun.' } ],
  'Batu': [ { date: 'Sepanjang tahun (festival berkala)', title: 'Batu Art and Culture Festival (BACF)', desc: 'Serangkaian acara seni dan budaya yang diselenggarakan sepanjang tahun.' } ]
};

// Ensure every region has at least example calendar entries so the UI
// never shows an empty placeholder. These are benign example entries
// (month names and short descriptions) to make the calendar feel filled.
Object.keys(REGIONS).forEach(region => {
  if (!REGION_CALENDAR[region]) {
    REGION_CALENDAR[region] = [
      { date: 'Agustus', title: 'Peringatan Kemerdekaan', desc: `Upacara, lomba rakyat, dan kegiatan komunitas di ${region}.` },
      { date: 'September', title: 'Festival Budaya Lokal', desc: `Pameran seni tradisional, kuliner, dan produk kerajinan dari ${region}.` }
    ];
  }
});

function renderCalendar(){
  const container = document.getElementById('calendar-list');
  if(!container) return;
  const regions = Object.keys(REGIONS).sort();
  container.innerHTML = regions.map(r=>{
    const events = REGION_CALENDAR[r] || [];
    const eventsHtml = events.length ? `<ul>${events.map(ev=>`<li><strong>${ev.date}</strong> — <em>${ev.title}</em><div class="small">${ev.desc}</div></li>`).join('')}</ul>` : `<div class="small">Belum ada data kalender tradisi terperinci.</div>`;
    return `<div class="card" style="padding:12px"><strong style="color:#e6eef8">${r}</strong><div class="mt-6 small">${eventsHtml}</div></div>`;
  }).join('');
}

// Show a fullscreen page for a single section (Atraksi, Makanan, Tradisi, Pakaian, Sejarah)
function showSectionFullScreen(region, section){
  if(!region || !section) return;
  const est = (typeof REGION_ESTIMATES !== 'undefined' && REGION_ESTIMATES[region]) ? REGION_ESTIMATES[region] : (REGIONS[region] || {});
  const titleMap = {
    'attractions':'Potensi Unggulan',
    'foods':'Makanan Khas',
    'traditions':'Tradisi Lokal',
    'clothing':'Pakaian Adat',
    'history':'Sejarah Singkat'
  };
  const title = titleMap[section] || section;
  // Build a simple list of items for the requested section (foods, traditions, etc.)
  const sectionItems = est[section] || (REGIONS[region] && REGIONS[region][section]) || [];
  let itemsHtml = (sectionItems && sectionItems.length) ? sectionItems.map(i=>`<div class="small">• ${i}</div>`).join('') : '<div class="small">Tidak tersedia</div>';

  const content = `
    <div style="padding:20px;max-width:1100px;margin:0 auto;color:#e6eef8;">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <h2 style="margin:0">${title}</h2>
        <div><button id="section-fullscreen-close" class="btn">Tutup</button></div>
      </div>
      <div style="margin-top:12px">${itemsHtml}</div>
    </div>`;

  let overlay = document.getElementById('section-fullscreen-overlay');
  if(!overlay){
    overlay = document.createElement('div');
    overlay.id = 'section-fullscreen-overlay';
    overlay.className = 'section-fullscreen-overlay';
    overlay.innerHTML = `<div class="section-fullscreen-panel">${content}</div>`;
    document.body.appendChild(overlay);
  } else {
    const panel = overlay.querySelector('.section-fullscreen-panel');
    if(panel) panel.innerHTML = content;
  }

  overlay.style.display = 'flex';
  overlay.classList.remove('closing');
  document.body.classList.add('modal-open');
  const panel = overlay.querySelector('.section-fullscreen-panel');
  requestAnimationFrame(()=> overlay.classList.add('open'));

  function closeSectionOverlay(){
    if(!overlay) return;
    overlay.classList.remove('open');
    overlay.classList.add('closing');
    const onEnd = function(ev){ if(ev && ev.target !== panel) return; try{ panel.removeEventListener('transitionend', onEnd); }catch(e){} overlay.style.display='none'; overlay.classList.remove('closing'); document.body.classList.remove('modal-open'); };
    panel.addEventListener('transitionend', onEnd);
    setTimeout(()=>{ if(overlay && overlay.style.display !== 'none'){ try{ panel.removeEventListener('transitionend', onEnd); }catch(e){} overlay.style.display='none'; overlay.classList.remove('closing'); document.body.classList.remove('modal-open'); } }, 500);
  }

  // attach close handlers
  const closeBtn = overlay.querySelector('#section-fullscreen-close');
  if(closeBtn){
    try{ closeBtn.removeEventListener('click', overlay._closeFnSection); }catch(e){}
    overlay._closeFnSection = function(){ closeSectionOverlay(); };
    closeBtn.addEventListener('click', overlay._closeFnSection);
  }
  if(overlay._overlayClickSection) try{ overlay.removeEventListener('click', overlay._overlayClickSection); }catch(e){}
  overlay._overlayClickSection = function(e){ if(e.target === overlay){ closeSectionOverlay(); } };
  overlay.addEventListener('click', overlay._overlayClickSection);

  if(overlay._escSection && typeof overlay._escSection === 'function') try{ document.removeEventListener('keydown', overlay._escSection); }catch(e){}
  overlay._escSection = function(ev){ if(ev.key === 'Escape'){ closeSectionOverlay(); } };
  document.addEventListener('keydown', overlay._escSection);

  // Attach media thumbnail handlers for section overlay (if any)
  try{
    const mediaThumbs = overlay.querySelectorAll('.media-thumb');
    mediaThumbs.forEach(thumb => {
      if(thumb._click && typeof thumb._click === 'function') try{ thumb.removeEventListener('click', thumb._click); }catch(e){}
      thumb._click = function(){
        const src = thumb.getAttribute('data-src');
        const type = thumb.getAttribute('data-type');
        mediaThumbs.forEach(t=>t.classList.remove('active'));
        thumb.classList.add('active');
        const parent = overlay.querySelector('.media-main');
        if(!parent) return;
        if(type === 'video'){
          parent.innerHTML = `<video class="media-main-element" controls src="${src}">Your browser doesn't support video</video>`;
        } else {
          parent.innerHTML = `<img class="media-main-element" src="${src}" alt="${title} photo">`;
        }
      };
      thumb.addEventListener('click', thumb._click);
    });
  }catch(e){ /* ignore */ }
}

// Region images (now stored in `foto/` folder)
const REGION_IMAGES = {
  'Surabaya': 'foto/surabaya.jpg',
  'Batu': 'foto/batu.jpg',
  'Malang': 'foto/malang.jpg',
  'Banyuwangi': 'foto/banyuwangi.jpg',
  'Jember': 'foto/jember.jpg',
  'Bandung': 'foto/bandung.jpg',
  'Sidoarjo': 'foto/sidoarjo.jpg',
  'Gresik': 'foto/gresik.webp',
  'Lamongan': 'foto/lamongan.webp',
  'Tuban': 'foto/tuban.jpg',
  'Bojonegoro': 'foto/bojonegoro.jpg',
  'Nganjuk': 'foto/nganjuk.webp',
  'Jombang': 'foto/jombang.webp',
  'Mojokerto': 'foto/mojokerto.jpeg',
  'Kediri': 'foto/kediri.jpg',
  'Blitar': 'foto/blitar.webp',
  'Tulungagung': 'foto/tulungagung.jpg',
  'Trenggalek': 'foto/trenggalek.webp',
  'Ponorogo': 'foto/ponorogo.png',
  'Pacitan': 'foto/pacitan.jpg',
  'Magetan': 'foto/magetan.jpg',
  'Ngawi': 'foto/Ngawi.jpg',
  'Madiun': 'foto/madiun.jpg',
  'Pamekasan': 'foto/pamekasan.jpg',
  'Sumenep': 'foto/sumenep.webp',
  'Sampang': 'foto/sampang.jpg',
  'Bangkalan': 'foto/bangkalan.jpg',
  'Probolinggo': 'foto/probolinggo.webp',
  'Lumajang': 'foto/lumajang.jpg',
  'Situbondo': 'foto/situbondo.webp',
  'Bondowoso': 'foto/bondowoso.webp',
  'Pasuruan': 'foto/pasuruan.webp'
};

// Optional media (images/videos) per region. Add paths here to enable gallery/video in overlays.
// I've populated some example entries based on files in `foto/` so section pages
// can show real thumbnails immediately. You can edit or expand these lists.
const REGION_MEDIA = {
  'Malang': {
    images: ['foto/malang.jpg','foto/batu.jpg'],
    videos: [],
    sections: {
      attractions: { images: ['foto/malang.jpg','foto/batu.jpg'], videos: [] },
      foods: { images: ['foto/malang.jpg'], videos: [] },
      traditions: { images: ['foto/malang.jpg'], videos: [] },
      clothing: { images: ['foto/malang.jpg'], videos: [] },
      history: { images: ['foto/malang.jpg'], videos: [] }
    }
  },
  'Surabaya': {
    images: ['foto/surabaya.jpg'],
    videos: [],
    sections: {
      attractions: { images: ['foto/surabaya.jpg'], videos: [] },
      foods: { images: ['foto/surabaya.jpg'], videos: [] },
      traditions: { images: ['foto/surabaya.jpg'], videos: [] },
      clothing: { images: ['foto/surabaya.jpg'], videos: [] },
      history: { images: ['foto/surabaya.jpg'], videos: [] }
    }
  },
  'Banyuwangi': {
    images: ['foto/banyuwangi.jpg'],
    videos: [],
    sections: {
      attractions: { images: ['foto/banyuwangi.jpg'], videos: [] },
      foods: { images: ['foto/banyuwangi.jpg'], videos: [] },
      traditions: { images: ['foto/banyuwangi.jpg'], videos: [] },
      clothing: { images: ['foto/banyuwangi.jpg'], videos: [] },
      history: { images: ['foto/banyuwangi.jpg'], videos: [] }
    }
  },
  'Jember': {
    images: ['foto/jember.jpg'],
    videos: [],
    sections: {
      attractions: { images: ['foto/jember.jpg'], videos: [] },
      foods: { images: ['foto/jember.jpg'], videos: [] },
      traditions: { images: ['foto/jember.jpg'], videos: [] },
      clothing: { images: ['foto/jember.jpg'], videos: [] },
      history: { images: ['foto/jember.jpg'], videos: [] }
    }
  },
  'Kediri': {
    images: ['foto/kediri.jpg'],
    videos: [],
    sections: {
      attractions: { images: ['foto/kediri.jpg'], videos: [] },
      foods: { images: ['foto/kediri.jpg'], videos: [] },
      traditions: { images: ['foto/kediri.jpg'], videos: [] },
      clothing: { images: ['foto/kediri.jpg'], videos: [] },
      history: { images: ['foto/kediri.jpg'], videos: [] }
    }
  },
  'Lamongan': {
    images: ['foto/lamongan.webp'],
    videos: [],
    sections: {
      attractions: { images: ['foto/lamongan.webp'], videos: [] },
      foods: { images: ['foto/lamongan.webp'], videos: [] },
      traditions: { images: ['foto/lamongan.webp'], videos: [] },
      clothing: { images: ['foto/lamongan.webp'], videos: [] },
      history: { images: ['foto/lamongan.webp'], videos: [] }
    }
  },
  'Jombang': {
    images: ['foto/jombang.webp'],
    videos: [],
    sections: {
      attractions: { images: ['foto/jombang.webp'], videos: [] },
      foods: { images: ['foto/jombang.webp'], videos: [] },
      traditions: { images: ['foto/jombang.webp'], videos: [] },
      clothing: { images: ['foto/jombang.webp'], videos: [] },
      history: { images: ['foto/jombang.webp'], videos: [] }
    }
  },
  'Gresik': {
    images: ['foto/gresik.webp'],
    videos: [],
    sections: {
      attractions: { images: ['foto/gresik.webp'], videos: [] },
      foods: { images: ['foto/gresik.webp'], videos: [] },
      traditions: { images: ['foto/gresik.webp'], videos: [] },
      clothing: { images: ['foto/gresik.webp'], videos: [] },
      history: { images: ['foto/gresik.webp'], videos: [] }
    }
  },
  'Bondowoso': {
    images: ['foto/bondowoso.webp'],
    videos: [],
    sections: {
      attractions: { images: ['foto/bondowoso.webp'], videos: [] },
      foods: { images: ['foto/bondowoso.webp'], videos: [] },
      traditions: { images: ['foto/bondowoso.webp'], videos: [] },
      clothing: { images: ['foto/bondowoso.webp'], videos: [] },
      history: { images: ['foto/bondowoso.webp'], videos: [] }
    }
  }
  ,
  'Lumajang': {
    images: ['foto/lumajang.jpg'],
    videos: [],
    sections: {
      attractions: { images: ['foto/lumajang.jpg'], videos: [] },
      foods: { images: ['foto/lumajang.jpg'], videos: [] },
      traditions: { images: ['foto/lumajang.jpg'], videos: [] },
      clothing: { images: ['foto/lumajang.jpg'], videos: [] },
      history: { images: ['foto/lumajang.jpg'], videos: [] }
    }
  }
  ,
  'Magetan': {
    images: ['foto/magetan.jpg'],
    videos: [],
    sections: {
      attractions: { images: ['foto/magetan.jpg'], videos: [] },
      foods: { images: ['foto/magetan.jpg'], videos: [] },
      traditions: { images: ['foto/magetan.jpg'], videos: [] },
      clothing: { images: ['foto/magetan.jpg'], videos: [] },
      history: { images: ['foto/magetan.jpg'], videos: [] }
    }
  }
  ,
  'Batu': {
    images: ['foto/batu.jpg'],
    videos: [],
    sections: {
      attractions: { images: ['foto/batu.jpg'], videos: [] },
      foods: { images: ['foto/batu.jpg'], videos: [] },
      traditions: { images: ['foto/batu.jpg'], videos: [] },
      clothing: { images: ['foto/batu.jpg'], videos: [] },
      history: { images: ['foto/batu.jpg'], videos: [] }
    }
  }
};

// Rekomendasi wisata feature removed — related data omitted.

// Dialect clues (reloaded from user-provided lexicon)
const DIALECT_CLUES = [
  {
    dialect: 'Jawa Arekan (Surabaya, Sidoarjo, Gresik, Mojokerto, Malang, Batu, Pasuruan, Probolinggo, Lumajang, Jember)',
    keywords: [
      'rek','cak','cuk','ngene','ngendi','teko','wes','durung','nang','arep','ngombe','mangan','ngerti','ngajak','ngene lho'
    ]
  },
  {
    dialect: 'Jawa Mataraman (Madiun, Magetan, Ngawi, Ponorogo, Trenggalek, Tulungagung, Blitar, Kediri, Nganjuk, Jombang, Pacitan)',
    keywords: [
      'kulo','panjenengan','ajeng','tindak','sekedap','nyuwun sewu','mboten','sampun','dereng','pangapunten','dhahar','ngunjuk','rawuh'
    ]
  },
  {
    dialect: 'Jawa Aneman (Bojonegoro, Tuban, Lamongan)',
    keywords: [
      'butoh','mangon','teko','banyu','ngendi','kowe','opo','turu','ngombe','nggo','nek','kok'
    ]
  },
  {
    dialect: 'Madura (Bangkalan, Sampang, Pamekasan, Sumenep, Bondowoso, Situbondo)',
    keywords: [
      'kau','kau’','engkok','baba','bâbâ','sadhaja','ka mana','bade','melle','mangan','ngakan','banyu','sakola','taretan','kancah'
    ]
  },
  {
    dialect: 'Osing (Banyuwangi)',
    keywords: [
      'arep','lunga','nang','teko','ngombe','mangan','ngendi','kowe','aku','dalane','saking','ngomong'
    ]
  }
];

// Foods
const FOODS = [
  {name:'Soto Lamongan',mood:['hangat','pedas']},
  {name:'Lontong Kupang (Surabaya)',mood:['hangat','ringan']},
  {name:'Rawon Surabaya',mood:['hangat','pedas']},
  {name:'Perkedel Goreng (Surabaya)',mood:['ringan','manis']},
  {name:'Tahu Goreng Sidoarjo',mood:['pedas','ringan']},
  {name:'Bakso Malang',mood:['hangat','ringan']},
  {name:'Biji Salak Malang',mood:['manis','ringan']},
  {name:'Apel Malang',mood:['manis','ringan']},
  {name:'Perkedel Kentang Malang',mood:['ringan','pedas']},
  {name:'Rujak Cingur',mood:['pedas','manis']},
  {name:'Ikan Bakar Banyuwangi',mood:['pedas','hangat']},
  {name:'Tinutuan Banyuwangi',mood:['hangat','ringan']},
  {name:'Cakalang Fufu',mood:['pedas','hangat']},
  {name:'Nasi Kuning Jember',mood:['hangat','pedas']},
  {name:'Telur Asin Jember',mood:['manis','ringan']},
  {name:'Rengginang Jember',mood:['pedas','ringan']},
  {name:'Kacang Goreng Jember',mood:['pedas','ringan']},
  {name:'Bandrek Bandung',mood:['hangat','manis']},
  {name:'Oncom Goreng Bandung',mood:['pedas','ringan']},
  {name:'Tahu Goreng Bandung',mood:['pedas','ringan']},
  {name:'Tahu Campur Gresik',mood:['hangat','pedas']},
  {name:'Petis Gresik',mood:['pedas','manis']},
  {name:'Wingko Babat',mood:['manis','ringan']},
  {name:'Kue Lapis Gresik',mood:['manis','ringan']},
  {name:'Nasi Kuning Jombang',mood:['hangat','pedas']},
  {name:'Perkedel Goreng Jombang',mood:['ringan','manis']},
  {name:'Bakso Kuning Jombang',mood:['hangat','pedas']},
  {name:'Gethuk Kediri',mood:['manis','ringan']},
  {name:'Singkong Goreng Kediri',mood:['pedas','ringan']},
  {name:'Bubur Manado Kediri',mood:['hangat','pedas']},
  {name:'Pecel Madiun',mood:['pedas','hangat']},
  {name:'Nasi Goreng Madiun',mood:['pedas','hangat']},
  {name:'Tempe Goreng Madiun',mood:['pedas','ringan']},
  {name:'Tahu Sumedang',mood:['hangat','ringan']},
  {name:'Nasi Ulam Pasuruan',mood:['pedas','hangat']},
  {name:'Ikan Campur Pasuruan',mood:['hangat','pedas']},
  {name:'Rempeyek Pasuruan',mood:['pedas','ringan']},
  {name:'Bakso Lumajang',mood:['hangat','ringan']},
  {name:'Nasi Campur Lumajang',mood:['hangat','pedas']},
  {name:'Tempe Goreng Lumajang',mood:['pedas','ringan']},
  {name:'Pecel Probolinggo',mood:['pedas','hangat']},
  {name:'Gado-gado Probolinggo',mood:['pedas','hangat']},
  {name:'Ikan Bakar Probolinggo',mood:['pedas','hangat']},
  {name:'Soto Madura',mood:['hangat','pedas']},
  {name:'Ikan Asap Madura',mood:['pedas','hangat']},
  {name:'Bakso Madura',mood:['hangat','ringan']},
  {name:'Tahu Goreng Madura',mood:['pedas','ringan']},
  {name:'Nasi Kuning Tuban',mood:['hangat','pedas']},
  {name:'Ikan Bakar Tuban',mood:['pedas','hangat']},
  {name:'Gabus Goreng Tuban',mood:['pedas','ringan']},
  {name:'Nasi Goreng Blitar',mood:['pedas','hangat']},
  {name:'Tempe Goreng Blitar',mood:['pedas','ringan']},
  {name:'Bakso Blitar',mood:['hangat','ringan']},
  {name:'Nasi Ulam Ponorogo',mood:['pedas','hangat']},
  {name:'Pecel Ponorogo',mood:['pedas','hangat']},
  {name:'Gado-gado Ponorogo',mood:['pedas','hangat']},
  {name:'Tinutuan Situbondo',mood:['hangat','ringan']},
  {name:'Ikan Bakar Situbondo',mood:['pedas','hangat']},
  {name:'Bakso Situbondo',mood:['hangat','ringan']},
  {name:'Nasi Kuning Bondowoso',mood:['hangat','pedas']},
  {name:'Pecel Bondowoso',mood:['pedas','hangat']},
  {name:'Ikan Asap Bondowoso',mood:['pedas','hangat']},
  {name:'Bakso Bojonegoro',mood:['hangat','ringan']},
  {name:'Nasi Goreng Bojonegoro',mood:['pedas','hangat']},
  {name:'Tempe Goreng Bojonegoro',mood:['pedas','ringan']},
  {name:'Nasi Kuning Nganjuk',mood:['hangat','pedas']},
  {name:'Pecel Nganjuk',mood:['pedas','hangat']},
  {name:'Bakso Nganjuk',mood:['hangat','ringan']}
];

// ===== User-provided kuliner per daerah (dibawa dari input user) =====
const USER_KULINER_BY_REGION = {
  'Bangkalan': ['Nasi Serpang','Topak Ladeh','Soto Tongkol','Tajin Sobih','Rek Kerrek Kamal','Sewel Socah','Bongko Arosbaya','Ledre Sepuluh','Kaldu Kokot'],
  'Banyuwangi': ['Sego Tempong','Sego Cawuk','Pecel Pitik','Rujak Soto','Uyah Asem Pitik','Pindang Koyong','Botok Tawon','Sup Kesrut','Bagiak','Dodol Salak','Sale Pisang','Jenang','Sumping'],
  'Blitar': ['Tahu Bumbu Lawu','Nasi Pecel','Soto Daging Bok Ireng','Nasi Ampok','Wajik Klethik','Es Pleret','Uceng Goreng','Geti','Es Drop','Rujak Petis','Sayur Tewel','Peyek Uceng'],
  'Bojonegoro': ['Ledre Pisang','Nasi Flambe','Sego Mawut','Peyek Bayam','Balung Kuwuk','Gethuk','Keripik Jahe'],
  'Bondowoso': ['Nasi Mamong','Tape Singkong Bondowoso','Sate Ayam Bondowoso','Sate Lalat','Ikan Wader Goreng','Soto Mi Bondowoso'],
  'Gresik': ['Nasi Krawu','Pudak','Sego Roomo','Jubung','Otak-otak Bandeng','Sanggring','Bonggolan','Sego Karak','Sego Menir','Martabak Usus'],
  'Jember': ['Pecel Gudeg','Prol Tape','Bakso Kabut','Suwar-Suwir','Pia Tape','Tape Manis','Pecel Pincuk','Nasi Langgi','Lontong Kupang'],
  'Jombang': ['Nasi Kikil','Rawon Jombang','Sego Abang','Onde-onde','Kerupuk Samiler','Lontong Kikil','Sate Ringin Contong'],
  'Kediri': ['Tahu Takwa','Sate Bekicot','Nasi Pecel Kediri','Soto Kediri','Getuk Pisang','Gethuk Lindri','Stik Tahu'],
  'Lamongan': ['Soto Lamongan','Pecel Lele','Nasi Boran','Rawon Lamongan','Asem Bandeng','Wingko Babat','Dawet Siwalan','Jumbrek'],
  'Lumajang': ['Tape Pisang','Pisang Agung','Nasi Serpang Lumajang','Lontong Petis','Rujak Lumajang','Jenang Kelapa'],
  'Madiun': ['Pecel Madiun','Brem','Bluder Cokro','Kue Manco','Madumongso','Lontong Tahu Telur','Soto Madiun'],
  'Magetan': ['Ayam Panggang Gandu','Sate Lawu','Tepo Tahu','Getuk Lindri','Jenang Cemplon','Soto Magetan'],
  'Malang': ['Bakso Malang','Bakso Bakar','Rawon Nguling','Sego Resek','Pos Ketan Legenda','Strudel Malang','Keripik Buah Apel','Pia Mangkok'],
  'Mojokerto': ['Onde-onde Mojokerto','Sate Keong','Gulai Menthok','Bubur Sruntul','Es Gronjongan Majapahit','Sinom Mojokerto','Sambal Wader'],
  'Nganjuk': ['Nasi Becek','Dumbleg','Sego Banting','Sego Jagung','Tepo Tahu','Kerupuk Upil'],
  'Ngawi': ['Tepo Tahu','Wedang Cemue','Intip Ketan','Keripik Tempe','Ayam Panggang Ndeso','Lethok'],
  'Pacitan': ['Tiwul','Punten','Soto Pacitan','Otak-otak Tuna','Nasi Thiwul','Sego Gobyos'],
  'Pamekasan': ['Sate Lalat','Campor Lorjuk','Pecong','Kaldu Kokot','Nasi Serpang Pamekasan'],
  'Pasuruan': ['Lontong Kupang Kraton','Sate Kerang','Nasi Punel','Bandeng Jelak','Soto Pasuruan','Bipang Jangkar'],
  'Ponorogo': ['Sate Ayam Ponorogo','Sego Tahu','Rujak Petis Welirang','Pecel Sayur','Dawet Jabung'],
  'Probolinggo': ['Soto Kraksaan','Kepiting Olok','Nasi Glepungan','Ketan Kratok','Nasi Jagung'],
  'Sampang': ['Bebek Songkem','Sate Sampang','Cager Telur','Dhun Adun','Nasi Kobel'],
  'Sidoarjo': ['Lontong Kupang','Bandeng Presto','Otak-otak Bandeng','Ote-ote Porong','Petis Udang','Telur Asin'],
  'Situbondo': ['Nasi Sodu','Tajin Palappa','Tajin Sobih','Soto Situbondo','Ikan Bakar Baluran'],
  'Sumenep': ['Campor Sumenep','Soto Sabrang','Pentol Gape','Sate Lalat','Kaldu Kokot'],
  'Trenggalek': ['Nasi Gegok','Alen-alen','Ikan Asap','Sego Gegok','Jenang Trenggalek'],
  'Tuban': ['Ampo','Rajungan Remason','Dumbek','Sego Dupak','Rujak Engos-engos','Sate Bekicot'],
  'Tulungagung': ['Nasi Lodho','Ayam Lodho','Sate Ayam Tulungagung','Jenang Grendul','Gethuk Lindri','Nasi Pecel'],
  'Batu': ['Apel Batu','Susu Batu','Pos Ketan Legenda','Sate Kelinci','Keripik Apel','Olahan Susu Segar'],
  'Surabaya': ['Rujak Cingur','Lontong Balap','Lontong Kupang','Tahu Campur','Bebek Goreng','Pecel Semanggi','Sate Klopo','Nasi Empal']
};

// Merge user-provided kuliner into REGIONS and FOODS (avoid duplicates)
Object.keys(USER_KULINER_BY_REGION).forEach(region => {
  const items = USER_KULINER_BY_REGION[region].slice();
  // ensure region exists
  if(!REGIONS[region]) REGIONS[region] = {};
  REGIONS[region].foods = Array.from(new Set([].concat(REGIONS[region].foods || [], items)));
  // add to FOODS master list if missing
  items.forEach(name => {
    const exists = FOODS.some(f => (f.name || '').toLowerCase() === name.toLowerCase());
    if(!exists) FOODS.push({ name: name, mood: [] });
  });
});

// End of user kuliner import

// ==================== FUNCTIONS ==================== //

// Recommended kuliner (31 items) — rendered under Kuliner Finder
const RECOMMENDED_FOODS = [
  { region: 'Bangkalan', name: 'Topak Ladeh' },
  { region: 'Banyuwangi', name: 'Sego Tempong' },
  { region: 'Blitar', name: 'Es Pleret' },
  { region: 'Bojonegoro', name: 'Ledre Pisang' },
  { region: 'Bondowoso', name: 'Tape Singkong Bondowoso' },
  { region: 'Gresik', name: 'Nasi Krawu' },
  { region: 'Jember', name: 'Suwar-Suwir' },
  { region: 'Jombang', name: 'Lontong Kikil' },
  { region: 'Kediri', name: 'Tahu Takwa' },
  { region: 'Lamongan', name: 'Soto Lamongan' },
  { region: 'Lumajang', name: 'Tape Pisang' },
  { region: 'Madiun', name: 'Pecel Madiun' },
  { region: 'Magetan', name: 'Ayam Panggang Gandu' },
  { region: 'Malang', name: 'Bakso Malang' },
  { region: 'Mojokerto', name: 'Onde-onde Mojokerto' },
  { region: 'Nganjuk', name: 'Nasi Becek' },
  { region: 'Ngawi', name: 'Wedang Cemue' },
  { region: 'Pacitan', name: 'Tiwul' },
  { region: 'Pamekasan', name: 'Sate Lalat' },
  { region: 'Pasuruan', name: 'Lontong Kupang' },
  { region: 'Ponorogo', name: 'Sate Ayam Ponorogo' },
  { region: 'Probolinggo', name: 'Soto Kraksaan' },
  { region: 'Sampang', name: 'Bebek Songkem' },
  { region: 'Sidoarjo', name: 'Lontong Kupang' },
  { region: 'Situbondo', name: 'Tajin Sobih' },
  { region: 'Sumenep', name: 'Kaldu Kokot' },
  { region: 'Trenggalek', name: 'Nasi Gegok' },
  { region: 'Tuban', name: 'Ampo' },
  { region: 'Tulungagung', name: 'Ayam Lodho' },
  { region: 'Batu', name: 'Sate Kelinci' },
  { region: 'Surabaya', name: 'Rujak Cingur' }
];

// ===== Rekomendasi Wisata (user-provided) =====
const TOURISM_RECOMMENDATIONS = {
  'Bangkalan': ['Bukit Jaddih','Bukit Arosbaya (Pelalangan)','Mercusuar Sembilangan','Bebek Sinjay'],
  'Banyuwangi': ['Kawah Ijen','Taman Nasional Baluran','Hutan Djawatan Benculuk','Pantai Pulau Merah','Teluk Ijo (Green Bay)'],
  'Blitar': ['Makam Bung Karno & Istana Gebang','Candi Penataran','Kampung Coklat','Pantai Tambakrejo'],
  'Bojonegoro': ['Kayangan Api','Teksas Wonocolo','Waduk Pacal','Negeri Atas Angin'],
  'Bondowoso': ['Kawah Wurung','Batu So’on (Solor)','Kawah Ijen (Via Paltuding)','Air Terjun Tancak'],
  'Gresik': ['Pulau Bawean (Danau Kastoba)','Makam Sunan Giri & Sunan Maulana Malik Ibrahim','Wisata Alam Setigi','Pantai Delegan'],
  'Jember': ['Pantai Tanjung Papuma','Teluk Love (Pantai Payangan)','Puncak Rembangan','Taman Botani Sukorambi'],
  'Jombang': ['Makam Gus Dur (Tebuireng)','Wana Wisata Sumberboto','Bale Tani','Air Terjun Tretes'],
  'Kediri': ['Monumen Simpang Lima Gumul (SLG)','Gunung Kelud','Kampung Inggris Pare','Goa Selomangleng'],
  'Lamongan': ['WBL (Wisata Bahari Lamongan)','Maharani Zoo & Goa','Makam Sunan Drajat','Waduk Gondang'],
  'Lumajang': ['Air Terjun Tumpak Sewu','Puncak B-29','Ranu Kumbolo (Gunung Semeru)','Kebun Teh Kertowono'],
  'Madiun': ['Pahlawan Street Center','Waduk Bening Widas','Hutan Pinus Nongko Ijo'],
  'Magetan': ['Telaga Sarangan','Mojosemi Forest Park','Jalan Tembus Sarangan-Cemorosewu'],
  'Malang': ['Pantai Selatan (Balekambang, Tiga Warna, Goa Cina)','Kampung Warna Warni Jodipan','Coban Rondo & Taman Labirin','Candi Singosari'],
  'Mojokerto': ['Kawasan Trowulan (Museum Majapahit, Candi Tikus, Bajang Ratu)','Pemandian Air Panas Padusan Pacet','Patung Buddha Tidur (Maha Vihara Mojopahit)','Ranu Manduro'],
  'Nganjuk': ['Air Terjun Sedudo','Air Terjun Roro Kuning','Waduk Semantok'],
  'Ngawi': ['Benteng Van Den Bosch (Benteng Pendem)','Kebun Teh Jamus','Museum Trinil','Srambang Park'],
  'Pacitan': ['Goa Gong','Pantai Klayar','Sungai Maron','Pantai Kasap'],
  'Pamekasan': ['Api Tak Kunjung Padam','Pantai Jumiang','Vihara Avalokitesvara','Kampung Batik Klampar'],
  'Pasuruan': ['Taman Safari Prigen','Cimory Dairyland','Masjid Cheng Ho','Gunung Bromo (Via Tosari/Penanjakan)'],
  'Ponorogo': ['Telaga Ngebel','Air Terjun Pletuk','Bukit Teletubbies (Gunung Masjid)','Pentas Reog Ponorogo'],
  'Probolinggo': ['Gunung Bromo (Lautan Pasir, Kawah)','Air Terjun Madakaripura','Gili Ketapang','BeeJay Bakau Resort (BJBR)'],
  'Sampang': ['Air Terjun Toroan','Pantai Camplong','Pulau Mandangin','Hutan Kera Nepa'],
  'Sidoarjo': ['Lumpur Lapindo (Lusi)','Pulau Lusi (Wisata Bahari Tlocor)','Museum Mpu Tantular','Candi Pari'],
  'Situbondo': ['Taman Nasional Baluran (Savana Bekol & Pantai Bama)','Pantai Pasir Putih','Kampung Blekok','Pantai Tampora'],
  'Sumenep': ['Gili Iyang','Gili Labak','Keraton Sumenep & Museum','Pantai Lombang'],
  'Trenggalek': ['Pantai Prigi','Pantai Pasir Putih Karanggongso','Goa Lowo','Hutan Mangrove Pancer Cengkrong'],
  'Tuban': ['Goa Akbar','Makam Sunan Bonang','Pantai Kelapa','Air Terjun Nglirip'],
  'Tulungagung': ['Pantai Kedung Tumpang','Pantai Gemah','Waduk Wonorejo','Gunung Budheg'],
  'Batu': ['Jatim Park 1, 2, 3','Museum Angkut','Batu Night Spectacular (BNS)','Alun-Alun Kota Batu'],
  'Surabaya': ['Kawasan Kota Tua (Jembatan Merah)','Tugu Pahlawan & Museum 10 November','Kenjeran Park (Klenteng Sanggar Agung)','Surabaya North Quay']
};

// Detailed tourism spot data (ticket, hours, accessibility).
// Maps URL will be generated dynamically using the spot name + region so links remain query-based.
const TOURISM_DETAILS = {
  // Bangkalan
  'Bukit Jaddih': { ticket: 'Rp 10.000', hours: '07.00 - 17.00', access: 'Sedang (Jalan berdebu/kapur)' },
  'Bukit Arosbaya (Pelalangan)': { ticket: 'Rp 5.000 - Rp 10.000', hours: '09.00 - 17.00', access: 'Sedang (Banyak tangga)' },
  'Mercusuar Sembilangan': { ticket: 'Rp 5.000', hours: '08.00 - 16.00', access: 'Mudah' },
  'Bebek Sinjay': { ticket: 'Harga makanan ~Rp 30.000', hours: '07.00 - 21.00', access: 'Mudah' },

  // Banyuwangi
  'Kawah Ijen': { ticket: 'Rp 5.000 - Rp 7.500 (WNI)', hours: '02.00 - 12.00 (varies)', access: 'Sulit (Mendaki 2-3 jam)' },
  'Taman Nasional Baluran': { ticket: 'Rp 15.000 - Rp 17.500', hours: '07.30 - 16.00', access: 'Mudah (mobil sampai savana)' },
  'Hutan Djawatan Benculuk': { ticket: 'Rp 7.500', hours: '07.00 - 17.30', access: 'Mudah' },
  'Pantai Pulau Merah': { ticket: 'Rp 10.000', hours: '24 Jam', access: 'Mudah' },
  'Teluk Ijo (Green Bay)': { ticket: 'Gratis (Perahu ~Rp 35.000)', hours: '07.00 - 16.00', access: 'Sedang (Naik perahu atau trekking 1 km)' },

  // Blitar
  'Makam Bung Karno & Istana Gebang': { ticket: 'Gratis / Donasi (Istana Gebang Rp 3.000)', hours: '07.00 - 17.00', access: 'Mudah' },
  'Candi Penataran': { ticket: 'Rp 5.000', hours: '08.00 - 17.00', access: 'Mudah' },
  'Kampung Coklat': { ticket: 'Rp 20.000', hours: '08.00 - 16.30', access: 'Mudah' },
  'Pantai Tambakrejo': { ticket: 'Rp 10.000', hours: '24 Jam', access: 'Mudah' },

  // Bojonegoro
  'Kayangan Api': { ticket: 'Rp 8.500', hours: '24 Jam', access: 'Mudah' },
  'Teksas Wonocolo': { ticket: 'Gratis / Donasi', hours: '08.00 - 17.00', access: 'Sedang (jalan desa/tambang)' },
  'Waduk Pacal': { ticket: 'Rp 5.000', hours: '08.00 - 16.00', access: 'Mudah' },
  'Negeri Atas Angin': { ticket: 'Rp 5.000 - Rp 10.000', hours: '24 Jam', access: 'Sedang (menanjak)' },

  // Bondowoso
  'Kawah Wurung': { ticket: 'Rp 5.000', hours: '08.00 - 16.00', access: 'Mudah (mobil sampai parkiran atas)' },
  'Batu So’on (Solor)': { ticket: 'Rp 5.000', hours: '06.00 - 17.00', access: 'Sedang (jalan agak sempit)' },
  'Air Terjun Tancak': { ticket: 'Gratis / Parkir', hours: '07.00 - 16.00', access: 'Sulit (trekking / ojek)' },

  // Gresik
  'Pulau Bawean (Danau Kastoba)': { ticket: 'Rp 5.000 (tiket kapal ~Rp 200.000)', hours: '08.00 - 17.00', access: 'Sulit (kapal + trekking)' },
  'Makam Sunan Giri & Sunan Maulana Malik Ibrahim': { ticket: 'Gratis / Donasi', hours: '24 Jam', access: 'Sedang (naik tangga/ojek)' },
  'Wisata Alam Setigi': { ticket: 'Rp 15.000 - Rp 20.000', hours: '07.00 - 17.00', access: 'Mudah' },
  'Pantai Delegan': { ticket: 'Rp 10.000', hours: '07.00 - 17.00', access: 'Mudah' },

  // Jember
  'Pantai Tanjung Papuma': { ticket: 'Rp 15.000 - Rp 25.000', hours: '24 Jam', access: 'Mudah' },
  'Teluk Love (Pantai Payangan)': { ticket: 'Rp 7.500', hours: '06.00 - 18.00', access: 'Sedang (naik bukit)' },
  'Puncak Rembangan': { ticket: 'Rp 10.000', hours: '24 Jam', access: 'Mudah' },
  'Taman Botani Sukorambi': { ticket: 'Rp 20.000', hours: '07.00 - 16.00 (Jumat libur)', access: 'Mudah' },

  // Jombang
  'Makam Gus Dur (Tebuireng)': { ticket: 'Gratis', hours: '08.00 - 16.00', access: 'Mudah' },
  'Wana Wisata Sumberboto': { ticket: 'Rp 10.000', hours: '07.00 - 16.00', access: 'Mudah' },
  'Bale Tani': { ticket: 'Rp 10.000', hours: '08.00 - 16.00', access: 'Mudah' },
  'Air Terjun Tretes': { ticket: 'Rp 10.000', hours: '08.00 - 16.00', access: 'Sulit (trekking 2-3 km)' },

  // Kediri
  'Monumen Simpang Lima Gumul (SLG)': { ticket: 'Gratis', hours: '24 Jam', access: 'Mudah' },
  'Gunung Kelud': { ticket: 'Rp 10.000', hours: '07.00 - 16.00', access: 'Mudah (ojek sampai kawah)' },
  'Kampung Inggris Pare': { ticket: 'Gratis', hours: '08.00 - 17.00', access: 'Mudah' },
  'Goa Selomangleng': { ticket: 'Rp 4.000', hours: '07.30 - 16.00', access: 'Sedang (naik tangga sedikit)' },

  // Lamongan
  'WBL (Wisata Bahari Lamongan)': { ticket: 'Rp 85.000 - Rp 110.000', hours: '08.30 - 16.30', access: 'Mudah' },
  'Maharani Zoo & Goa': { ticket: 'Rp 40.000 - Rp 50.000', hours: '08.30 - 16.30', access: 'Mudah' },
  'Makam Sunan Drajat': { ticket: 'Gratis / Donasi', hours: '24 Jam', access: 'Mudah' },
  'Waduk Gondang': { ticket: 'Rp 5.000', hours: '07.00 - 17.00', access: 'Mudah' },

  // Lumajang
  'Air Terjun Tumpak Sewu': { ticket: 'Rp 10.000 - Rp 20.000', hours: '07.00 - 15.00', access: 'Sedang/Sulit (tergantung rute)' },
  'Puncak B-29': { ticket: 'Rp 5.000 - Rp 10.000', hours: '24 Jam', access: 'Sedang (tanjakan curam)' },
  'Ranu Kumbolo (Gunung Semeru)': { ticket: 'Rp 19.000 - Rp 24.000', hours: '24 Jam (cek status pendakian)', access: 'Sulit (hiking 4-5 jam)' },
  'Kebun Teh Kertowono': { ticket: 'Rp 5.000', hours: '08.00 - 17.00', access: 'Mudah' },

  // Madiun
  'Pahlawan Street Center': { ticket: 'Gratis', hours: '24 Jam', access: 'Mudah' },
  'Waduk Bening Widas': { ticket: 'Rp 7.500', hours: '07.00 - 17.00', access: 'Mudah' },
  'Hutan Pinus Nongko Ijo': { ticket: 'Rp 5.000', hours: '08.00 - 16.00', access: 'Mudah' },

  // Magetan
  'Telaga Sarangan': { ticket: 'Rp 20.000', hours: '24 Jam', access: 'Mudah' },
  'Mojosemi Forest Park': { ticket: 'Rp 35.000 - Rp 50.000', hours: '08.00 - 16.00', access: 'Mudah' },
  'Jalan Tembus Sarangan-Cemorosewu': { ticket: 'Gratis', hours: '24 Jam', access: 'Mudah' },

  // Malang
  'Pantai Selatan (Balekambang, Tiga Warna, Goa Cina)': { ticket: 'Rp 15.000 - Rp 20.000', hours: '24 Jam', access: 'Mudah' },
  'Kampung Warna Warni Jodipan': { ticket: 'Rp 5.000', hours: '07.00 - 17.00', access: 'Sedang (banyak tangga)' },
  'Coban Rondo & Taman Labirin': { ticket: 'Rp 35.000 - Rp 40.000', hours: '08.00 - 16.00', access: 'Mudah' },
  'Candi Singosari': { ticket: 'Sukarela', hours: '07.00 - 16.00', access: 'Mudah' },

  // Mojokerto
  'Kawasan Trowulan': { ticket: 'Rp 3.000 - Rp 5.000 per situs', hours: '07.00 - 16.00', access: 'Mudah' },
  'Pemandian Air Panas Padusan Pacet': { ticket: 'Rp 15.000 (area) + Rp 10.000 (kolam)', hours: '24 Jam', access: 'Mudah' },
  'Patung Buddha Tidur': { ticket: 'Rp 5.000', hours: '07.00 - 17.00', access: 'Mudah' },
  'Ranu Manduro': { ticket: 'Rp 5.000 - Rp 10.000', hours: '06.00 - 17.00', access: 'Sedang (jalan bebatuan)' },

  // Nganjuk
  'Air Terjun Sedudo': { ticket: 'Rp 10.000 - Rp 15.000', hours: '07.00 - 16.00', access: 'Mudah' },
  'Air Terjun Roro Kuning': { ticket: 'Rp 5.000', hours: '08.00 - 16.00', access: 'Mudah' },
  'Waduk Semantok': { ticket: 'Gratis / Parkir', hours: '08.00 - 17.00', access: 'Mudah' },

  // Ngawi
  'Benteng Van Den Bosch (Benteng Pendem)': { ticket: 'Rp 10.000', hours: '08.00 - 17.00', access: 'Mudah' },
  'Kebun Teh Jamus': { ticket: 'Rp 15.000', hours: '07.00 - 17.00', access: 'Mudah' },
  'Museum Trinil': { ticket: 'Rp 3.000', hours: '08.00 - 15.00 (Senin libur)', access: 'Mudah' },
  'Srambang Park': { ticket: 'Rp 20.000', hours: '08.00 - 17.00', access: 'Sedang' },

  // Pacitan
  'Goa Gong': { ticket: 'Rp 20.000', hours: '07.00 - 16.00', access: 'Sedang (banyak tangga)' },
  'Pantai Klayar': { ticket: 'Rp 15.000', hours: '24 Jam', access: 'Mudah' },
  'Sungai Maron': { ticket: 'Rp 5.000 (sewa perahu ~Rp 100.000/perahu)', hours: '07.00 - 17.00', access: 'Mudah' },
  'Pantai Kasap': { ticket: 'Rp 10.000', hours: '07.00 - 17.00', access: 'Sedang (jalan ke bukit)' },

  // Pamekasan
  'Api Tak Kunjung Padam': { ticket: 'Rp 5.000', hours: '24 Jam', access: 'Mudah' },
  'Pantai Jumiang': { ticket: 'Rp 5.000', hours: '06.00 - 17.00', access: 'Mudah' },
  'Vihara Avalokitesvara': { ticket: 'Gratis / Donasi', hours: '07.00 - 17.00', access: 'Mudah' },
  'Kampung Batik Klampar': { ticket: 'Gratis', hours: '08.00 - 16.00', access: 'Mudah' },

  // Pasuruan
  'Taman Safari Prigen': { ticket: 'Rp 135.000 - Rp 185.000', hours: '08.30 - 16.00', access: 'Mudah (drive-thru)' },
  'Cimory Dairyland': { ticket: 'Rp 35.000 - Rp 50.000', hours: '08.00 - 17.00', access: 'Mudah' },
  'Masjid Cheng Ho': { ticket: 'Gratis', hours: '24 Jam', access: 'Mudah' },
  'Gunung Bromo (Via Tosari/Penanjakan)': { ticket: 'Rp 29.000 - Rp 34.000', hours: '24 Jam (umumnya dini hari)', access: 'Mudah (sewa jeep disarankan)' },

  // Ponorogo
  'Telaga Ngebel': { ticket: 'Rp 15.000', hours: '24 Jam', access: 'Mudah' },
  'Air Terjun Pletuk': { ticket: 'Rp 5.000', hours: '08.00 - 16.00', access: 'Sedang' },
  'Bukit Teletubbies (Gunung Masjid)': { ticket: 'Gratis / Parkir', hours: '07.00 - 17.00', access: 'Sedang' },
  'Pentas Reog Ponorogo (Padepokan Reog)': { ticket: 'Varying (event)', hours: 'Sesuai jadwal event', access: 'Mudah' },

  // Probolinggo
  'Gunung Bromo (Lautan Pasir)': { ticket: 'Rp 29.000 - Rp 34.000', hours: '24 Jam', access: 'Sedang (berpasir)' },
  'Air Terjun Madakaripura': { ticket: 'Rp 22.000 + ojek', hours: '07.00 - 16.00', access: 'Sedang (jalan kaki 1 km)' },
  'Gili Ketapang': { ticket: 'Paket snorkeling ~Rp 100.000', hours: '06.00 - 16.00', access: 'Sedang (kapal)' },
  'BeeJay Bakau Resort (BJBR)': { ticket: 'Rp 30.000 - Rp 60.000', hours: '08.00 - 22.00', access: 'Mudah' },

  // Sampang
  'Air Terjun Toroan': { ticket: 'Rp 5.000', hours: '06.00 - 17.00', access: 'Mudah' },
  'Pantai Camplong': { ticket: 'Rp 10.000', hours: '07.00 - 17.00', access: 'Mudah' },
  'Pulau Mandangin': { ticket: 'Gratis (perahu ~Rp 15.000)', hours: '24 Jam', access: 'Sedang (penyeberangan perahu)' },
  'Hutan Kera Nepa': { ticket: 'Rp 5.000', hours: '07.00 - 17.00', access: 'Mudah' },

  // Sidoarjo
  'Lumpur Lapindo (Lusi)': { ticket: 'Rp 10.000 (parkir/ojek)', hours: '06.00 - 17.00', access: 'Mudah (naik tangga ke tanggul)' },
  'Pulau Lusi (Wisata Bahari Tlocor)': { ticket: 'Rp 5.000 (perahu ~Rp 25.000)', hours: '07.00 - 16.00', access: 'Mudah' },
  'Museum Mpu Tantular': { ticket: 'Rp 4.000', hours: '08.00 - 15.00 (Senin libur)', access: 'Mudah' },
  'Candi Pari': { ticket: 'Gratis / isi buku tamu', hours: '07.00 - 16.00', access: 'Mudah' },

  // Situbondo
  'Taman Nasional Baluran (Bekol/Bama)': { ticket: 'Rp 16.000 - Rp 18.500', hours: '07.30 - 16.00', access: 'Mudah' },
  'Pantai Pasir Putih': { ticket: 'Rp 10.000', hours: '07.00 - 17.00', access: 'Mudah' },
  'Kampung Blekok': { ticket: 'Rp 5.000', hours: '08.00 - 17.00', access: 'Mudah' },
  'Pantai Tampora': { ticket: 'Rp 5.000', hours: '07.00 - 17.00', access: 'Sedang' },

  // Sumenep
  'Gili Iyang': { ticket: 'Gratis (penyeberangan berbayar)', hours: '07.00 - 15.00', access: 'Sedang (kapal ~45 menit)' },
  'Gili Labak': { ticket: 'Gratis (sewa perahu Rp 300.000-600.000)', hours: '06.00 - 16.00', access: 'Sedang (perjalanan laut 2 jam)' },
  'Keraton Sumenep & Museum': { ticket: 'Rp 5.000', hours: '07.00 - 15.30', access: 'Mudah' },
  'Pantai Lombang': { ticket: 'Rp 5.000 - Rp 10.000', hours: '07.00 - 17.00', access: 'Mudah' },

  // Trenggalek
  'Pantai Prigi': { ticket: 'Rp 10.000', hours: '24 Jam', access: 'Mudah' },
  'Pantai Pasir Putih Karanggongso': { ticket: 'Rp 10.000 - Rp 15.000', hours: '24 Jam', access: 'Mudah' },
  'Goa Lowo': { ticket: 'Rp 10.000', hours: '08.00 - 16.00', access: 'Mudah' },
  'Hutan Mangrove Pancer Cengkrong': { ticket: 'Rp 5.000', hours: '08.00 - 17.00', access: 'Mudah' },

  // Tuban
  'Goa Akbar': { ticket: 'Rp 10.000', hours: '07.00 - 17.00', access: 'Mudah' },
  'Makam Sunan Bonang': { ticket: 'Gratis / Donasi', hours: '24 Jam', access: 'Mudah' },
  'Pantai Kelapa': { ticket: 'Rp 10.000', hours: '07.00 - 17.00', access: 'Mudah' },
  'Air Terjun Nglirip': { ticket: 'Rp 5.000 - Rp 8.000', hours: '07.00 - 16.30', access: 'Mudah' },

  // Tulungagung
  'Pantai Kedung Tumpang': { ticket: 'Rp 5.000', hours: '24 Jam', access: 'Sulit (curam, licin)' },
  'Pantai Gemah': { ticket: 'Rp 10.000', hours: '24 Jam', access: 'Mudah' },
  'Waduk Wonorejo': { ticket: 'Rp 10.000', hours: '08.00 - 17.00', access: 'Mudah' },
  'Gunung Budheg': { ticket: 'Gratis / Parkir', hours: '24 Jam', access: 'Sedang' },

  // Batu
  'Jatim Park 1, 2, 3': { ticket: 'Rp 100.000 - Rp 170.000', hours: '11.00/12.00 - 20.00', access: 'Mudah' },
  'Museum Angkut': { ticket: 'Rp 100.000 - Rp 120.000', hours: '12.00 - 20.00', access: 'Mudah' },
  'Batu Night Spectacular (BNS)': { ticket: 'Rp 35.000 - Rp 40.000', hours: '15.00 - 23.00', access: 'Mudah' },
  'Alun-Alun Kota Batu': { ticket: 'Gratis (bianglala Rp 5.000)', hours: '24 Jam', access: 'Mudah' },

  // Surabaya
  'Kawasan Kota Tua (Jembatan Merah)': { ticket: 'Gratis', hours: '24 Jam', access: 'Mudah' },
  'Tugu Pahlawan & Museum 10 November': { ticket: 'Rp 5.000 - Rp 8.000', hours: '08.00 - 15.00', access: 'Mudah' },
  'Kenjeran Park (Klenteng Sanggar Agung)': { ticket: 'Rp 15.000', hours: '07.00 - 17.00', access: 'Mudah' },
  'Surabaya North Quay': { ticket: 'Rp 10.000 (voucher makan)', hours: '12.00 - 20.00 (Senin tutup)', access: 'Mudah' }
};

function renderTourismRecommendations(filter){
  const container = document.getElementById('tourism-list');
  if(!container) return;
  const q = (filter || '').toLowerCase().trim();
  const keys = Object.keys(TOURISM_RECOMMENDATIONS).sort();
  const filtered = keys.filter(k => {
    if(!q) return true;
    const kn = k.toLowerCase();
    return kn.includes(q) || TOURISM_RECOMMENDATIONS[k].some(s=> s.toLowerCase().includes(q));
  });
  if(filtered.length === 0){
    container.innerHTML = `<div class="small">Tidak ditemukan rekomendasi untuk "${filter}".</div>`;
    return;
  }
  container.innerHTML = filtered.map(region => {
    const spots = TOURISM_RECOMMENDATIONS[region].map(s=>{
      const safeSpot = s.replace(/"/g,'&quot;');
      return `<li><a href="#" class="tourism-spot" data-region="${region}" data-spot="${safeSpot}" tabindex="0">${s}</a></li>`;
    }).join('');
    return `
      <div class="tourism-card" data-region="${region}">
        <h4>${region}</h4>
        <ul class="small" style="margin:6px 0 0 18px">${spots}</ul>
      </div>`;
  }).join('');
}

// Show fullscreen info for a single tourism spot (reuses region fullscreen overlay CSS)
function showTourismSpotFullScreen(spot, region){
  if(!spot) return;
  region = region || '';
  const details = (TOURISM_DETAILS && TOURISM_DETAILS[spot]) ? TOURISM_DETAILS[spot] : { ticket: 'Tidak tersedia', hours: 'Tidak tersedia', access: 'Tidak tersedia' };
  const coords = (window._REGION_COORDS && window._REGION_COORDS[region]) || null;
  const mapsQuery = encodeURIComponent(spot + (region ? (' ' + region) : ''));
  // Embed-friendly src (uses output=embed so no API key required)
  const embedSrc = coords ? `https://www.google.com/maps?q=${coords.lat},${coords.lng}&z=13&output=embed` : `https://www.google.com/maps?q=${mapsQuery}&z=13&output=embed`;

  const content = `
    <div style="position:relative;padding:12px 18px;max-width:1400px;margin:0 auto;color:#e6eef8;width:100%;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <h2 style="margin:0">${spot}</h2>
        <div><button id="region-fullscreen-close" class="btn" style="padding:8px 10px">Tutup</button></div>
      </div>

      <div style="position:relative;margin-top:12px">
        <div style="width:100%;height:85vh;max-height:92vh;overflow:hidden;border-radius:8px;background:#000;">
          <iframe src="${embedSrc}" style="border:0;width:100%;height:100%;display:block;" loading="lazy" allowfullscreen></iframe>
        </div>

        <div style="position:absolute;left:18px;top:18px;max-width:380px;background:rgba(8,14,20,0.86);padding:14px;border-radius:10px;backdrop-filter:blur(6px);color:#fff;overflow:auto;max-height:78vh;box-shadow:0 8px 24px rgba(0,0,0,0.6)">
          <div class="small"><strong>Region:</strong> ${region || '—'}</div>
          <div class="small" style="margin-top:8px"><strong>Tiket / Harga:</strong> ${details.ticket}</div>
          <div class="small" style="margin-top:6px"><strong>Jam buka:</strong> ${details.hours}</div>
          <div class="small" style="margin-top:6px"><strong>Akses:</strong> ${details.access}</div>
          <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
            <a class="btn" href="https://www.google.com/maps/search/?api=1&query=${mapsQuery}" target="_blank" rel="noopener noreferrer">Buka di Google Maps</a>
            <button class="btn" onclick="(function(){ const el = document.getElementById('region-fullscreen-overlay'); if(el){ el.style.display='none'; document.body.classList.remove('modal-open'); } })()">Tutup</button>
          </div>
        </div>
      </div>
    </div>
  `;

  let overlay = document.getElementById('region-fullscreen-overlay');
  if(!overlay){
    overlay = document.createElement('div');
    overlay.id = 'region-fullscreen-overlay';
    overlay.className = 'region-fullscreen-overlay';
    overlay.innerHTML = `<div class="region-fullscreen-panel">${content}</div>`;
    document.body.appendChild(overlay);
  } else {
    const panel = overlay.querySelector('.region-fullscreen-panel');
    if(panel) panel.innerHTML = content;
  }

  overlay.style.display = 'flex';
  overlay.classList.remove('closing');
  document.body.classList.add('modal-open');
  const panel = overlay.querySelector('.region-fullscreen-panel');
  requestAnimationFrame(()=>{ overlay.classList.add('open'); });

  // close helpers
  function closeOverlay(){
    try{ overlay.classList.remove('open'); overlay.classList.add('closing'); }catch(e){}
    const onEnd = function(ev){ if(ev && ev.target !== panel) return; try{ panel.removeEventListener('transitionend', onEnd); }catch(e){} overlay.style.display='none'; overlay.classList.remove('closing'); document.body.classList.remove('modal-open'); };
    try{ panel.addEventListener('transitionend', onEnd); }catch(e){}
    setTimeout(()=>{ if(overlay && overlay.style.display !== 'none'){ try{ panel.removeEventListener('transitionend', onEnd); }catch(e){} overlay.style.display='none'; overlay.classList.remove('closing'); document.body.classList.remove('modal-open'); } }, 500);
  }

  // close button
  const closeBtn = overlay.querySelector('#region-fullscreen-close');
  if(closeBtn){
    try{ closeBtn.removeEventListener('click', overlay._closeFn); }catch(e){}
    overlay._closeFn = function(){ closeOverlay(); };
    closeBtn.addEventListener('click', overlay._closeFn);
  }

  // overlay click outside panel
  try{ overlay.removeEventListener('click', overlay._overlayClick); }catch(e){}
  overlay._overlayClick = function(ev){ if(ev.target === overlay){ closeOverlay(); } };
  overlay.addEventListener('click', overlay._overlayClick);

  // ESC to close
  try{ document.removeEventListener('keydown', overlay._escListener); }catch(e){}
  overlay._escListener = function(ev){ if(ev.key === 'Escape'){ closeOverlay(); } };
  document.addEventListener('keydown', overlay._escListener);
}

function attachCardClickHandlersFor(containerEl){
  if(!containerEl) return;
  const items = containerEl.querySelectorAll('.item');
  items.forEach(it=>{
    const link = it.querySelector('a');
    if(!link) return;
    if(!it.hasAttribute('tabindex')) it.setAttribute('tabindex','0');
    // avoid attaching twice
    if(it._cardClickAttached) return;
    it._cardClickAttached = true;
    it.addEventListener('click', function(ev){
      if(ev.target && (ev.target.tagName && ev.target.tagName.toLowerCase() === 'a')) return;
      if(ev.target && ev.target.closest && ev.target.closest('a')) return;
      window.open(link.href, '_blank');
    });
    it.addEventListener('keydown', function(ev){ if(ev.key === 'Enter' || ev.key === ' '){ ev.preventDefault(); window.open(link.href, '_blank'); } });
  });
}

function renderRecommendedFoods(){
  const container = document.getElementById('food-recommend');
  if(!container) return;
  const iconSvg = `<svg class="external-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z"></path><path d="M5 5h5v2H7v10h10v-3h2v5H5V5z"></path></svg>`;
  const header = '';
  const list = RECOMMENDED_FOODS.map(r=>{
    const q = encodeURIComponent(r.name + ' ' + r.region);
    return `<div class="item"><a href="https://www.google.com/search?q=${q}" target="_blank" rel="noopener noreferrer"><div class="food-name">${r.name}${iconSvg}</div><div class="food-region small">${r.region}</div></a></div>`;
  }).join('');
  container.innerHTML = header + list;
  // attach click handlers so the whole box is clickable
  setTimeout(()=> attachCardClickHandlersFor(container), 0);
}

// Render city cards dynamically from REGIONS
// ==================== RENDER FUNCTIONS ==================== //


// Dashboard-related carousel and CTA handlers removed.

// Featured/recent/gallery for dashboard removed (dashboard feature deleted)

function goToRegion(city) {
  showPage('map');
  showRegion(city);
  document.querySelectorAll('nav a').forEach(a=>a.classList.remove('active'));
  document.getElementById('nav-map').classList.add('active');
}

function renderCityGrid(){
  const container = document.getElementById('city-grid');
  if(!container) return;
  const keys = Object.keys(REGIONS).sort();
  container.innerHTML = keys.map(k=>{
    const seed = k.toLowerCase().replace(/\s+/g,'-');
    const fallback = `https://picsum.photos/seed/${seed}/300/180`;
    const imgUrl = REGION_IMAGES[k] || fallback;
    // add onerror fallback to handle missing files in `foto/` folder
    return `<div class="city-card" data-region="${k}"><img src="${imgUrl}" alt="Foto ${k}" loading="lazy" onerror="this.onerror=null;this.src='${fallback}'"><div class="city-label" tabindex="0">${k}</div></div>`
  }).join('');
}

// Search/filter handler for regions
function initRegionSearch(){
  const searchInput = document.getElementById('search-region');
  if(searchInput){
    searchInput.addEventListener('input', function(){
      const query = this.value.toLowerCase().trim();
      const cards = document.querySelectorAll('.city-card');
      let visibleCount = 0;
      cards.forEach(card => {
        const regionName = card.getAttribute('data-region').toLowerCase();
        if(regionName.includes(query)){
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });
      if(visibleCount === 0 && query.length > 0){
        console.info('Tidak ada hasil untuk: ' + query);
      }
    });
  }
}

// Show region info
function showRegion(name){
  // Info daerah tidak lagi ditampilkan di main view, hanya di popup overlay
  // Fungsi ini bisa dikosongkan atau digunakan untuk keperluan lain
  // document.getElementById('region-info').innerHTML = '';
  return;
}

// Pan map to region
function mapPanToRegion(region){
  try{
    const map = window._gmapsMap;
    const coords = window._REGION_COORDS && window._REGION_COORDS[region];
    const polygon = window._eastJatimPolygon;
    const infoWindow = window._infoWindow;
    if(!map || !coords) return;
    const latLng = new google.maps.LatLng(coords.lat, coords.lng);
    if(google.maps.geometry && google.maps.geometry.poly && polygon){
      const inside = google.maps.geometry.poly.containsLocation(latLng, polygon);
      if(!inside){
        if(infoWindow){ infoWindow.setContent('<div class="small">Koordinat berada di luar batas Jawa Timur</div>'); infoWindow.setPosition(latLng); infoWindow.open(map); setTimeout(()=>infoWindow.close(),1500); }
        return;
      }
    }
    map.panTo(latLng);
    map.setZoom(11);
  }catch(e){console.warn('mapPanToRegion error',e)}
}

// Show embedded map for region
function showEmbeddedMapForRegion(region){
  const coords = (window._REGION_COORDS && window._REGION_COORDS[region]) || null;
  let src = '';
  if(coords){
    src = `https://www.google.com/maps?q=${coords.lat},${coords.lng}&z=13&output=embed`;
  } else {
    src = `https://www.google.com/maps?q=${encodeURIComponent(region + ', Jawa Timur')}&z=11&output=embed`;
  }

  const info = (window.REGIONS && window.REGIONS[region]) || null;
  let overlay = document.getElementById('map-iframe-overlay');
  if(overlay){
    const iframe = overlay.querySelector('iframe');
    if(iframe) iframe.src = src;
    const infoNode = overlay.querySelector('.map-iframe-info');
    if(infoNode) infoNode.innerHTML = buildRegionInfoHTML(region, info, coords);
    overlay.style.display = 'flex';
    return;
  }

  overlay = document.createElement('div');
  overlay.id = 'map-iframe-overlay';
  overlay.className = 'map-iframe-overlay';
  overlay.innerHTML = `
    <div class="map-iframe-panel">
      <div class="map-iframe-header">
        <div class="title">Peta: ${region}</div>
        <div>
          <button class="close-btn" id="map-iframe-close">Tutup</button>
        </div>
      </div>
      <div class="map-iframe-content">
        <div class="map-iframe-body"><iframe src="${src}" loading="lazy" allowfullscreen></iframe></div>
        <div class="map-iframe-info">
          ${buildRegionInfoHTML(region, info, coords)}
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  // prevent background scrolling while overlay is open
  document.body.classList.add('modal-open');

  document.getElementById('map-iframe-close').addEventListener('click', function(){
    const el = document.getElementById('map-iframe-overlay');
    if(el) {
      el.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  });
  overlay.addEventListener('click', function(ev){
    if(ev.target === overlay){
      overlay.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  });
}

// Build region info HTML
function buildRegionInfoHTML(region, info, coords){
  // Use REGION_ESTIMATES as the authoritative source for displayed fields.
  const est = (typeof REGION_ESTIMATES !== 'undefined' && REGION_ESTIMATES[region]) ? REGION_ESTIMATES[region] : null;
  // Helper to render list or fallback text for a field
  function renderList(title, items, fallback) {
    if(items && items.length) return `<div class="small" style="margin-top:8px"><strong>${title}:</strong></div><ul>${items.map(i=>`<li>${i}</li>`).join('')}</ul>`;
    return `<div class="small" style="margin-top:8px"><strong>${title}:</strong> ${fallback}</div>`;
  }

  const foods = renderList('Makanan Khas', est && est.foods, `Belum ada data spesifik untuk ${region}`);
  const trad = renderList('Tradisi Lokal', est && est.traditions, `Belum ada data spesifik untuk ${region}`);
  const clothing = est && est.clothing ? `<div class="small" style="margin-top:8px"><strong>Pakaian Adat:</strong></div><ul><li>${est.clothing}</li></ul>` : `<div class="small" style="margin-top:8px"><strong>Pakaian Adat:</strong> Belum ada data spesifik untuk ${region}</div>`;
  const history = est && est.history ? `<div class="small" style="margin-top:8px"><strong>Sejarah:</strong> ${est.history}</div>` : `<div class="small" style="margin-top:8px"><strong>Sejarah:</strong> Ringkasan sejarah singkat ${region} belum tersedia</div>`;
  const trivia = est && est.trivia ? `<div class="small" style="margin-top:6px;color:var(--muted)">${est.trivia}</div>` : '';

  const population = est && est.population ? `<div class="small" style="margin-top:8px"><strong>Populasi:</strong> ${est.population}</div>` : `<div class="small" style="margin-top:8px"><strong>Populasi:</strong> Perkiraan populasi ${region}</div>`;
  const area = est && est.area ? `<div class="small" style="margin-top:6px"><strong>Luas:</strong> ${est.area}</div>` : `<div class="small" style="margin-top:6px"><strong>Luas:</strong> Perkiraan luas wilayah ${region}</div>`;
  const attractions = renderList('Potensi Unggulan', est && est.attractions, `Belum ada daftar atraksi untuk ${region}`);
  const website = est && est.website ? `<div class="small" style="margin-top:8px"><strong>Website/Info:</strong> <a href="${est.website}" target="_blank" rel="noopener noreferrer">${est.website}</a></div>` : `<div class="small" style="margin-top:8px"><strong>Website/Info:</strong> Tidak tersedia</div>`;

  const openHref = coords ? `https://www.google.com/maps?q=${coords.lat},${coords.lng}` : `https://www.google.com/maps?q=${encodeURIComponent(region + ', Jawa Timur')}`;

  return `
    <h3 style="margin-bottom:6px">${region}</h3>
    ${trivia}
    ${population}
    ${area}
    ${attractions}
    ${foods}
    ${trad}
    ${clothing}
    ${history}
    ${website}
    <hr style="margin:14px 0 10px 0;border:0;border-top:1px solid #333;">
    <a class="open-native" href="${openHref}" target="_blank" rel="noopener noreferrer">Buka di Google Maps</a>
  `;
}

// Fullscreen detail overlay for a region (shows population, luas, attractions, foods, traditions, clothing, history)
function showFullScreenRegion(region){
  if(!region) return;
  const info = (typeof REGION_ESTIMATES !== 'undefined' && REGION_ESTIMATES[region]) ? REGION_ESTIMATES[region] : (REGIONS[region] || {});
  const coords = (window._REGION_COORDS && window._REGION_COORDS[region]) || null;
  // Build content (reuse buildRegionInfoHTML where appropriate)
  const mkList = (arr)=> (arr && arr.length) ? arr.map(i=>`<div class="small">• ${i}</div>`).join('') : '<div class="small">Tidak tersedia</div>';

  const content = `
    <div style="padding:20px;max-width:1100px;margin:0 auto;color:#e6eef8;">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
        <h2 style="margin:0">${region}</h2>
        <div><button id="region-fullscreen-close" class="btn" style="padding:8px 10px">Tutup</button></div>
      </div>
      <div style="margin-top:12px;display:grid;grid-template-columns:1fr 340px;gap:18px;align-items:start">
        <div>
          <!-- Media area (image/video) -->
          <div class="region-media">
            <div class="media-main">
              ${ ( (REGION_MEDIA[region] && REGION_MEDIA[region].videos && REGION_MEDIA[region].videos.length) ) ? `<video class="media-main-element" controls src="${REGION_MEDIA[region].videos[0]}">Your browser doesn't support video</video>` : `<img class="media-main-element" src="${REGION_IMAGES[region] || 'https://picsum.photos/seed/'+region.replace(/\s+/g,'-')+'/800/450'}" alt="${region} photo">` }
            </div>
            <div class="media-gallery">
              ${ (REGION_MEDIA[region] && REGION_MEDIA[region].images ? REGION_MEDIA[region].images.map((p,i)=>`<div class="media-thumb ${i===0? 'active':''}" data-src="${p}" data-type="image"><img src="${p}" alt="thumb"></div>`).join('') : '') }
              ${ (REGION_MEDIA[region] && REGION_MEDIA[region].videos ? REGION_MEDIA[region].videos.map((p,i)=>`<div class="media-thumb ${ ( !(REGION_MEDIA[region].images && REGION_MEDIA[region].images.length) && i===0) ? 'active' : '' }" data-src="${p}" data-type="video"><video src="${p}"></video></div>`).join('') : '') }
            </div>
          </div>

          <div style="margin-top:12px;color:var(--muted)"><strong>Ringkasan:</strong> ${info.trivia || (REGIONS[region] && REGIONS[region].trivia) || ''}</div>
          <div style="display:flex;gap:12px;flex-wrap:wrap">
            <div class="card" style="padding:12px;min-width:160px"><strong>Populasi</strong><div class="small mt-6">${info.population || REGIONS[region] && REGIONS[region].population || 'Tidak tersedia'}</div></div>
            <div class="card" style="padding:12px;min-width:160px"><strong>Luas</strong><div class="small mt-6">${info.area || REGIONS[region] && REGIONS[region].area || 'Tidak tersedia'}</div></div>
          </div>

          <div style="margin-top:14px">
            <div class="expandable" data-section="attractions">
              <div tabindex="0" class="expandable-header"><h5>Potensi Unggulan</h5><span class="chev">▾</span></div>
              <div class="expandable-body">${mkList(info.attractions || REGIONS[region] && REGIONS[region].attractions)}</div>
            </div>

            <div class="expandable" data-section="foods">
              <div tabindex="0" class="expandable-header"><h5>Makanan Khas</h5><span class="chev">▾</span></div>
              <div class="expandable-body">${mkList(info.foods || REGIONS[region] && REGIONS[region].foods)}</div>
            </div>

            <div class="expandable" data-section="traditions">
              <div tabindex="0" class="expandable-header"><h5>Tradisi Lokal</h5><span class="chev">▾</span></div>
              <div class="expandable-body">${mkList(info.traditions || REGIONS[region] && REGIONS[region].traditions)}</div>
            </div>

            <div class="expandable" data-section="clothing">
              <div tabindex="0" class="expandable-header"><h5>Pakaian Adat</h5><span class="chev">▾</span></div>
              <div class="expandable-body"><div class="small">${info.clothing || REGIONS[region] && REGIONS[region].clothing || 'Tidak tersedia'}</div></div>
            </div>

            <div class="expandable" data-section="history">
              <div tabindex="0" class="expandable-header"><h5>Sejarah Singkat</h5><span class="chev">▾</span></div>
              <div class="expandable-body"><div class="small">${info.history || REGIONS[region] && REGIONS[region].history || 'Tidak tersedia'}</div></div>
            </div>
          </div>
        </div>
        <aside style="min-width:260px">
          <div class="card">
            <h4 style="margin:0 0 8px 0">Info Cepat</h4>
            <div class="small"><strong>Populasi:</strong> ${info.population || REGIONS[region] && REGIONS[region].population || 'Tidak tersedia'}</div>
            <div class="small" style="margin-top:6px"><strong>Luas:</strong> ${info.area || REGIONS[region] && REGIONS[region].area || 'Tidak tersedia'}</div>
            <div class="small" style="margin-top:6px"><strong>Website:</strong> ${(info.website || REGIONS[region] && REGIONS[region].website) ? `<a href="${info.website || REGIONS[region].website}" target="_blank" rel="noopener noreferrer">${info.website || REGIONS[region].website}</a>` : 'Tidak tersedia'}</div>
            <div style="margin-top:12px"><button class="btn" onclick="(function(r){ if(window._REGION_COORDS && window._REGION_COORDS[r]){ window.open('https://www.google.com/maps?q='+window._REGION_COORDS[r].lat+','+window._REGION_COORDS[r].lng,'_blank') } else { window.open('https://www.google.com/maps?q='+encodeURIComponent(r+', Jawa Timur'),'_blank') } })('${region}')">Buka di Google Maps</button></div>
          </div>
          <div style="margin-top:12px" class="card">
            <h4 style="margin:0 0 8px 0">Kalender Tradisi</h4>
            ${(REGION_CALENDAR[region] || []).map(ev=>`<div class="small"><strong>${ev.date}</strong> — ${ev.title}<div class="small" style="color:var(--muted)">${ev.desc}</div></div>`).join('')}
          </div>
        </aside>
      </div>
    </div>
  `;

  let overlay = document.getElementById('region-fullscreen-overlay');
  if(!overlay){
    overlay = document.createElement('div');
    overlay.id = 'region-fullscreen-overlay';
    overlay.className = 'region-fullscreen-overlay';
    overlay.innerHTML = `<div class="region-fullscreen-panel">${content}</div>`;
    document.body.appendChild(overlay);
  } else {
    // update panel content
    const panel = overlay.querySelector('.region-fullscreen-panel');
    if(panel) panel.innerHTML = content;
  }

  // show overlay and prevent background scroll
  overlay.style.display = 'flex';
  // ensure no lingering classes
  overlay.classList.remove('closing');
  document.body.classList.add('modal-open');

  const panel = overlay.querySelector('.region-fullscreen-panel');
  // trigger open animation
  requestAnimationFrame(()=>{ overlay.classList.add('open'); });

  // helper to close with animation
  function closeRegionOverlay(){
    if(!overlay) return;
    overlay.classList.remove('open');
    overlay.classList.add('closing');
    // wait for transition end on panel before hiding
    const onEnd = function(ev){
      if(ev && ev.target !== panel) return;
      try { panel.removeEventListener('transitionend', onEnd); } catch(e){}
      overlay.style.display = 'none';
      overlay.classList.remove('closing');
      document.body.classList.remove('modal-open');
    };
    // if transitionend doesn't fire (very old browsers), fallback hide after timeout
    panel.addEventListener('transitionend', onEnd);
    setTimeout(()=>{ if(overlay && overlay.style.display !== 'none'){ try { panel.removeEventListener('transitionend', onEnd); } catch(e){} overlay.style.display='none'; overlay.classList.remove('closing'); document.body.classList.remove('modal-open'); } }, 500);
  }

  // Attach (or re-attach) close handlers safely.
  const closeBtn = overlay.querySelector('#region-fullscreen-close');
  if (closeBtn) {
    // remove previous handler if present
    if (overlay._closeFn && typeof overlay._closeFn === 'function') {
      try { closeBtn.removeEventListener('click', overlay._closeFn); } catch (e) {}
    }
    overlay._closeFn = function(){ closeRegionOverlay(); };
    closeBtn.addEventListener('click', overlay._closeFn);
  }

  // overlay click to close (click outside panel)
  if (overlay._overlayClick && typeof overlay._overlayClick === 'function') {
    try { overlay.removeEventListener('click', overlay._overlayClick); } catch (e) {}
  }
  overlay._overlayClick = function(e){ if(e.target === overlay){ closeRegionOverlay(); } };
  overlay.addEventListener('click', overlay._overlayClick);

  // ESC key to close
  if (overlay._escListener && typeof overlay._escListener === 'function') {
    try { document.removeEventListener('keydown', overlay._escListener); } catch (e) {}
  }
  overlay._escListener = function onEsc(ev){ if(ev.key === 'Escape'){ closeRegionOverlay(); } };
  document.addEventListener('keydown', overlay._escListener);

  // Attach expandable toggles
  try{
    const headers = overlay.querySelectorAll('.expandable .expandable-header');
    headers.forEach(h => {
      // remove previous listener if present
      if(h._clickFn && typeof h._clickFn === 'function'){
        try{ h.removeEventListener('click', h._clickFn); h.removeEventListener('keydown', h._clickFnKey); }catch(e){}
      }
      h._clickFn = function(){
        const parent = h.parentElement;
        const body = parent.querySelector('.expandable-body');
        const isExp = parent.classList.toggle('expanded');
        if(isExp){
          // set to measured height for transition
          body.style.maxHeight = body.scrollHeight + 'px';
        } else {
          body.style.maxHeight = '0';
        }
        // open a dedicated fullscreen page for this section (preserve current overlay)
        try{
          const section = parent.getAttribute('data-section');
          if(section) showSectionFullScreen(region, section);
        }catch(e){ console.warn('showSectionFullScreen failed', e) }
      };
      // keyboard support (Enter / Space)
      h._clickFnKey = function(e){ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); h._clickFn(); } };
      h.addEventListener('click', h._clickFn);
      h.addEventListener('keydown', h._clickFnKey);
      // ensure collapsed initial state
      const p = h.parentElement; const b = p.querySelector('.expandable-body'); if(p && b){ p.classList.remove('expanded'); b.style.maxHeight = '0'; }
    });
  }catch(e){ console.warn('attach expandables failed', e) }

  // Attach media thumbnail handlers (switch main media when thumbnail clicked)
  try{
    const mediaThumbs = overlay.querySelectorAll('.media-thumb');
    const mainEl = overlay.querySelector('.media-main .media-main-element');
    mediaThumbs.forEach(thumb => {
      // remove prev listener
      if(thumb._click && typeof thumb._click === 'function') try{ thumb.removeEventListener('click', thumb._click); }catch(e){}
      thumb._click = function(){
        const src = thumb.getAttribute('data-src');
        const type = thumb.getAttribute('data-type');
        mediaThumbs.forEach(t=>t.classList.remove('active'));
        thumb.classList.add('active');
        const parent = overlay.querySelector('.media-main');
        if(!parent) return;
        if(type === 'video'){
          parent.innerHTML = `<video class="media-main-element" controls src="${src}">Your browser doesn't support video</video>`;
        } else {
          parent.innerHTML = `<img class="media-main-element" src="${src}" alt="${region} photo">`;
        }
      };
      thumb.addEventListener('click', thumb._click);
    });
  }catch(e){ /* ignore */ }
}

// Rekomendasi Wisata feature removed — rendering functions deleted.

// Page navigation
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
  document.getElementById('page-' + pageId).style.display = 'block';
}

// Google Maps initialization
function initMap() {
  const centerJatim = { lat: -7.5, lng: 112.5 };
  const mapEl = document.getElementById('map');
  if(!mapEl) return;
  
  const map = new google.maps.Map(mapEl, {
    center: centerJatim,
    zoom: 8
  });
  window._gmapsMap = map;

  const eastJatimCoords = [
    { lat: -6.0500, lng: 111.2000 },
    { lat: -6.2000, lng: 111.6000 },
    { lat: -6.4500, lng: 112.0500 },
    { lat: -6.6500, lng: 112.4500 },
    { lat: -6.9000, lng: 112.8500 },
    { lat: -7.1500, lng: 113.2000 },
    { lat: -7.4000, lng: 113.6000 },
    { lat: -7.6500, lng: 114.0000 },
    { lat: -7.9000, lng: 114.3000 },
    { lat: -8.1500, lng: 114.6500 },
    { lat: -8.4500, lng: 114.9000 },
    { lat: -8.7500, lng: 114.7000 },
    { lat: -9.0500, lng: 114.3500 },
    { lat: -9.3500, lng: 113.9500 },
    { lat: -9.6500, lng: 113.3000 },
    { lat: -9.4000, lng: 112.7000 },
    { lat: -9.0500, lng: 112.2000 },
    { lat: -8.6500, lng: 111.9000 },
    { lat: -8.1500, lng: 111.6500 },
    { lat: -7.6500, lng: 111.5000 },
    { lat: -7.1500, lng: 111.3500 },
    { lat: -6.7000, lng: 111.2500 },
    { lat: -6.2000, lng: 111.2000 }
  ];

  const eastJatimPolygon = new google.maps.Polygon({
    paths: eastJatimCoords,
    strokeColor: '#ffb703',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#ffb703',
    fillOpacity: 0.06,
    clickable: false
  });
  eastJatimPolygon.setMap(map);

  const bounds = new google.maps.LatLngBounds();
  eastJatimCoords.forEach(c => bounds.extend(c));
  map.setOptions({ restriction: { latLngBounds: bounds, strictBounds: true } });
  map.fitBounds(bounds);

  const REGION_COORDS = {
    'Surabaya': { lat: -7.2575, lng: 112.7521 },
    'Sidoarjo': { lat: -7.4461, lng: 112.7181 },
    'Gresik': { lat: -7.1570, lng: 112.6527 },
    'Lamongan': { lat: -7.1283, lng: 112.4246 },
    'Tuban': { lat: -6.8938, lng: 112.0350 },
    'Bojonegoro': { lat: -7.1529, lng: 111.8870 },
    'Mojokerto': { lat: -7.4720, lng: 112.4470 },
    'Malang': { lat: -7.9797, lng: 112.6304 },
    'Batu': { lat: -7.8742, lng: 112.5190 },
    'Lumajang': { lat: -8.1265, lng: 113.2030 },
    'Probolinggo': { lat: -7.7540, lng: 113.2150 },
    'Pasuruan': { lat: -7.6540, lng: 112.9036 },
    'Kediri': { lat: -7.8667, lng: 112.0117 },
    'Blitar': { lat: -8.0946, lng: 112.1507 },
    'Jombang': { lat: -7.5369, lng: 112.2365 },
    'Nganjuk': { lat: -7.5840, lng: 111.9270 },
    'Madiun': { lat: -7.6306, lng: 111.5164 },
    'Magetan': { lat: -7.6627, lng: 111.3276 },
    'Ngawi': { lat: -7.4222, lng: 111.4338 },
    'Banyuwangi': { lat: -8.2196, lng: 114.3698 },
    'Bondowoso': { lat: -7.9420, lng: 114.2410 },
    'Situbondo': { lat: -7.6670, lng: 114.0100 },
    'Jember': { lat: -8.1719, lng: 113.7033 },
    'Ponorogo': { lat: -7.8680, lng: 111.4680 },
    'Pacitan': { lat: -8.2100, lng: 111.1370 },
    'Trenggalek': { lat: -8.0670, lng: 111.6410 },
    'Tulungagung': { lat: -8.0670, lng: 111.6230 },
    'Sampang': { lat: -7.1420, lng: 113.2320 },
    'Pamekasan': { lat: -7.1580, lng: 113.4850 },
    'Sumenep': { lat: -6.9140, lng: 113.9060 },
    'Bangkalan': { lat: -7.0600, lng: 112.1260 }
  };

  window._REGION_COORDS = REGION_COORDS;
  const infoWindow = new google.maps.InfoWindow();
  window._infoWindow = infoWindow;

  Object.keys(REGIONS).forEach(regionName => {
    const coords = REGION_COORDS[regionName];
    if(!coords) return;
    const marker = new google.maps.Marker({
      position: coords,
      map: map,
      title: regionName
    });

    marker.addListener('click', () => {
      const data = REGIONS[regionName];
      const content = `
        <div style="min-width:200px">
          <strong>${regionName}</strong>
          <div class="small" style="margin-top:6px"><strong>Makanan:</strong> ${data.foods.join(', ')}</div>
          <div class="small" style="margin-top:6px"><strong>Tradisi:</strong> ${data.traditions.join(', ')}</div>
          <div class="small" style="margin-top:6px;color:#666">${data.trivia}</div>
        </div>`;
      const markerPos = marker.getPosition();
      let insideMarker = true;
      if(google.maps.geometry && google.maps.geometry.poly) {
        insideMarker = google.maps.geometry.poly.containsLocation(markerPos, eastJatimPolygon);
      }
      if(insideMarker) {
        infoWindow.setContent(content);
        infoWindow.open(map, marker);
      } else {
        infoWindow.setContent('<div class="small">Marker di luar batas Jawa Timur</div>');
        infoWindow.open(map, marker);
        return;
      }

      const container = document.getElementById('region-info');
      if(container) container.innerHTML = `<div class="item"><strong>${regionName}</strong><div class="small">Makanan: ${data.foods.join(', ')}</div><div class="small">Tradisi: ${data.traditions.join(', ')}</div><div class="small" style="margin-top:6px;color:var(--muted)">${data.trivia}</div></div>`;
    });
  });

  window._eastJatimPolygon = eastJatimPolygon;

  document.querySelectorAll('.region-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const region = btn.getAttribute('data-region');
      const coords = REGION_COORDS[region];
      if(coords) {
        const latLng = new google.maps.LatLng(coords.lat, coords.lng);
        let canPan = true;
        if(google.maps.geometry && google.maps.geometry.poly) {
          canPan = google.maps.geometry.poly.containsLocation(latLng, eastJatimPolygon);
        }
        if(canPan) {
          map.panTo(latLng);
          map.setZoom(11);
        } else {
          infoWindow.setContent('<div class="small">Koordinat berada di luar batas Jawa Timur</div>');
          infoWindow.setPosition(latLng);
          infoWindow.open(map);
          setTimeout(()=>infoWindow.close(),1500);
        }
      }
    });
  });
  
  map.addListener('click', (ev) => {
    const latLng = ev.latLng;
    if(google.maps.geometry && google.maps.geometry.poly) {
      const inside = google.maps.geometry.poly.containsLocation(latLng, eastJatimPolygon);
      if(!inside) {
        infoWindow.setContent('<div class="small">Di luar batas Jawa Timur</div>');
        infoWindow.setPosition(latLng);
        infoWindow.open(map);
        setTimeout(()=>infoWindow.close(),1500);
      }
    }
  });

  // Keyboard activation for focused city labels (Enter / Space)
  document.addEventListener('keydown', function(e){
    const t = document.activeElement;
    if(t && t.classList && t.classList.contains('city-label') && (e.key === 'Enter' || e.key === ' ')){
      e.preventDefault();
      const card = t.closest && t.closest('.city-card');
      const region = card && card.dataset && card.dataset.region;
      if(region) showFullScreenRegion(region);
    }
  });
}

// ==================== EVENT LISTENERS ==================== //

// City card clicks
document.addEventListener('click', function(e) {
  // If user clicked the city image, open fullscreen detail and prevent card click behavior
  const img = e.target.closest && e.target.closest('.city-card img');
  if(img){
    e.preventDefault();
    e.stopPropagation();
    const card = img.closest('.city-card');
    const region = card && card.dataset && card.dataset.region;
    if(region) showFullScreenRegion(region);
    return;
  }

  // If user clicked the city name label, open the same fullscreen detail as clicking the image
  const lbl = e.target.closest && e.target.closest('.city-card .city-label') || e.target.closest && e.target.closest('.city-label');
  if(lbl){
    e.preventDefault();
    e.stopPropagation();
    const card = lbl.closest && lbl.closest('.city-card');
    const region = card && card.dataset && card.dataset.region;
    if(region) showFullScreenRegion(region);
    return;
  }

  // If click on a region button (other UI) keep previous behavior
  const btn = e.target.closest && e.target.closest('.region-btn');
  if(btn) {
    const region = btn.getAttribute('data-region');
    showRegion(region);
    return;
  }

  // Clicking elsewhere on the card (not the image) opens the embedded map as before
  const card = e.target.closest && e.target.closest('.city-card');
  if(card && card.dataset && card.dataset.region) {
    const region = card.dataset.region;
    showEmbeddedMapForRegion(region);
    if(typeof mapPanToRegion === 'function') mapPanToRegion(region);
  }
});

// ==================== EVENT LISTENERS (moved inside DOMContentLoaded) ==================== //

function setupEventListeners() {
  // Dialect Analyzer
  const dialectForm = document.getElementById('dialect-form');
  if(dialectForm) {
    dialectForm.addEventListener('submit',function(e){
      e.preventDefault();
      const txt = document.getElementById('txt-sentence').value.toLowerCase()
      const scores = {}
      DIALECT_CLUES.forEach(cl=>{scores[cl.dialect]=0;cl.keywords.forEach(k=>{if(txt.includes(k))scores[cl.dialect]+=1})})
      const sorted = Object.entries(scores).sort((a,b)=>b[1]-a[1])
      const best = sorted[0]
      const result = document.getElementById('dialect-result')
      if(best[1]===0){result.innerHTML=`<div class="small">Tidak terdeteksi: coba kalimat lain atau gunakan kosakata khas.</div>`;return}
      result.innerHTML = `<div class="item"><strong>Prediksi: ${best[0]}</strong><div class="small">Skor kemiripan: ${best[1]}</div><div class="small" style="margin-top:6px">Ciri: ${best[0].split(' ')[0]} biasanya memakai kata-kata khas: ${DIALECT_CLUES.find(d=>d.dialect===best[0]).keywords.join(', ')}</div></div>`
    });
  }

  // Kuliner Finder
  const foodForm = document.getElementById('food-form');
  if(foodForm) {
    foodForm.addEventListener('submit',(e)=>{
      e.preventDefault();
      const queryEl = document.getElementById('food-query');
      const q = (queryEl && queryEl.value) ? queryEl.value.toLowerCase().trim() : '';
      const recommendWrap = document.getElementById('food-recommend-wrap');
      // hide recommendations while there's an active query
      if(recommendWrap) recommendWrap.style.display = q ? 'none' : '';
      const target = document.getElementById('food-result');
      if(!q){
        if(target) target.innerHTML = '<div class="small">Masukkan kata kunci untuk mencari kuliner (nama atau daerah).</div>';
        return;
      }
      // If the query refers to a region, show only foods from that region.
      // Otherwise, match by food name or mood keywords.
      const matchedRegion = Object.keys(REGIONS).find(r => {
        const rn = r.toLowerCase();
        return rn === q || rn.includes(q) || q.includes(rn);
      });

      let matches = [];
      if (matchedRegion) {
        const regionFoods = REGIONS[matchedRegion].foods || [];
        // Try to enrich with existing FOODS entries (to preserve mood info when available)
        matches = regionFoods.map(foodName => {
          const found = FOODS.find(f => {
            const fname = (f.name||'').toLowerCase();
            return fname === foodName.toLowerCase() || fname.includes(foodName.toLowerCase());
          });
          return found || { name: foodName, mood: [] };
        });
      } else {
        // match by food name or mood keyword
        matches = FOODS.filter(f => {
          const name = (f.name||'').toLowerCase();
          const moodMatch = (f.mood||[]).some(m=> m.toLowerCase().includes(q));
          const nameMatch = name.includes(q);
          return nameMatch || moodMatch;
        });
      }
      if(!target) return;
      if(matches.length===0) {
        target.innerHTML = `<div class="small">Tidak ada hasil untuk "${q}". Coba gunakan kata lain atau nama daerah.</div>`;
      } else {
        const regionHint = matchedRegion ? (' ' + matchedRegion) : '';
        const header = `<div class="small" style="margin-bottom:10px;color:var(--accent)"><strong>Ditemukan ${matches.length} hasil untuk "${q}":</strong></div>`;
        const iconSvg = `<svg class="external-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z"></path><path d="M5 5h5v2H7v10h10v-3h2v5H5V5z"></path></svg>`;
        const list = matches.map(m=>{
          const name = m.name || '';
          const query = encodeURIComponent(name + regionHint);
          return `<div class="item"><a href="https://www.google.com/search?q=${query}" target="_blank" rel="noopener noreferrer">${name}${iconSvg}</a></div>`;
        }).join('');
        target.innerHTML = header + list;
        // Make the whole card clickable (not only the anchor text)
        setTimeout(()=>{
          try{
            const items = target.querySelectorAll('.item');
            items.forEach(it=>{
              const link = it.querySelector('a');
              if(!link) return;
              // ensure keyboard focusable
              if(!it.hasAttribute('tabindex')) it.setAttribute('tabindex','0');
              // click anywhere on the card opens the link in a new tab
              if(!it._clickHandler){
                it._clickHandler = function(ev){
                  // allow native link clicks to proceed (or other interactive elements)
                  if(ev.target && (ev.target.tagName && ev.target.tagName.toLowerCase() === 'a')) return;
                  if(ev.target && ev.target.closest && ev.target.closest('a')) return;
                  window.open(link.href, '_blank');
                };
                it.addEventListener('click', it._clickHandler);
              }
              // keyboard activation (Enter / Space)
              if(!it._keyHandler){
                it._keyHandler = function(ev){
                  if(ev.key === 'Enter' || ev.key === ' '){ ev.preventDefault(); window.open(link.href, '_blank'); }
                };
                it.addEventListener('keydown', it._keyHandler);
              }
            });
          }catch(e){ console.warn('attach card click handlers failed', e); }
        },0);
      }
    });
    // live input listener: hide recommendations while user types, show when cleared
    const qInput = document.getElementById('food-query');
    const recommendWrapLive = document.getElementById('food-recommend-wrap');
    if(qInput && recommendWrapLive){
      qInput.addEventListener('input', function(){
        const v = (this.value || '').trim();
        // hide recommendations while there's input; when cleared, remove results and show recommendations
        recommendWrapLive.style.display = v.length ? 'none' : '';
        const target = document.getElementById('food-result');
        if(!v.length){
          if(target) target.innerHTML = '';
        }
      });
    }
  }

  // Quiz feature removed - no start/reload handlers
  // Re-add simple quiz navigation and start handler
  const navQuiz = document.getElementById('nav-quiz');
  if(navQuiz) {
    navQuiz.addEventListener('click', function(e){
      e.preventDefault();
      showPage('quiz');
      document.querySelectorAll('nav a').forEach(a=>a.classList.remove('active'));
      this.classList.add('active');
    });
  }
  const startBtn = document.getElementById('btn-start-quiz');
  if(startBtn){ startBtn.addEventListener('click', function(e){ e.preventDefault(); startQuiz(); }); }

  // Navigation
  const navMap = document.getElementById('nav-map');
  if(navMap) {
    navMap.addEventListener('click',function(e){
      e.preventDefault();
      showPage('map');
      showRegion('Lamongan');
      document.querySelectorAll('nav a').forEach(a=>a.classList.remove('active'));
      this.classList.add('active');
    });
  }

  // nav-wisata removed (rekomendasi wisata feature deleted)

  const navDialect = document.getElementById('nav-dialect');
  if(navDialect) {
    navDialect.addEventListener('click',function(e){
      e.preventDefault();
      showPage('dialect');
      document.getElementById('txt-sentence').focus();
      document.querySelectorAll('nav a').forEach(a=>a.classList.remove('active'));
      this.classList.add('active');
    });
  }

  const navFood = document.getElementById('nav-food');
  if(navFood) {
    navFood.addEventListener('click',function(e){
      e.preventDefault();
      showPage('food');
      const qEl = document.getElementById('food-query'); if(qEl) qEl.focus();
      document.querySelectorAll('nav a').forEach(a=>a.classList.remove('active'));
      this.classList.add('active');
    });
  }

  // Rekomendasi Wisata navigation + search
  const navTourism = document.getElementById('nav-tourism');
  if(navTourism){
    navTourism.addEventListener('click', function(e){
      e.preventDefault();
      showPage('tourism');
      document.querySelectorAll('nav a').forEach(a=>a.classList.remove('active'));
      this.classList.add('active');
      // render all by default and focus input
      renderTourismRecommendations();
      const tq = document.getElementById('tourism-query'); if(tq) tq.focus();
    });
  }

  const tourismQuery = document.getElementById('tourism-query');
  if(tourismQuery){
    tourismQuery.addEventListener('input', function(){ renderTourismRecommendations(this.value); });
  }
  const tourismClear = document.getElementById('tourism-clear');
  if(tourismClear){
    tourismClear.addEventListener('click', function(){ const tq = document.getElementById('tourism-query'); if(tq){ tq.value=''; renderTourismRecommendations(''); tq.focus(); } });
  }

  // Delegated handlers for tourism spot clicks / keyboard activation
  const tourismListEl = document.getElementById('tourism-list');
  if(tourismListEl){
    // click -> open spot fullscreen
    tourismListEl.addEventListener('click', function(e){
      const a = e.target.closest && e.target.closest('.tourism-spot');
      if(a){
        e.preventDefault();
        const spot = a.dataset.spot;
        const region = a.dataset.region || '';
        showTourismSpotFullScreen(spot, region);
      }
    });
    // keyboard activation (Enter / Space)
    tourismListEl.addEventListener('keydown', function(e){
      const t = e.target;
      if(t && t.classList && t.classList.contains('tourism-spot') && (e.key === 'Enter' || e.key === ' ')){
        e.preventDefault();
        showTourismSpotFullScreen(t.dataset.spot, t.dataset.region);
      }
    });
  }

  // Quiz navigation removed

  const navCalendar = document.getElementById('nav-calendar');
  if(navCalendar) {
    navCalendar.addEventListener('click',function(e){
      e.preventDefault();
      showPage('calendar');
      document.querySelectorAll('nav a').forEach(a=>a.classList.remove('active'));
      this.classList.add('active');
    });
  }

  // (AI settings removed)

  // nav-dashboard removed; no handler needed

  // Chart (if exists)
  if(document.getElementById('chartUsage')){
    const ctx = document.getElementById('chartUsage').getContext('2d')
    const chart = new Chart(ctx,{type:'bar',data:{labels:['Dialek','Kuliner','Peta','Quiz'],datasets:[{label:'Hits (sim)',data:[45,30,20,15],tension:0.4}]},options:{scales:{y:{beginAtZero:true}},plugins:{legend:{display:false}}}})
  }
}



// ==================== INITIALIZATION ==================== //

// Initialize when DOM is ready
function initApp() {
  console.log('Initializing app...');
  
  // Default page: show map (dashboard removed)
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('active'));
  const mapPage = document.getElementById('page-map');
  if (mapPage) mapPage.classList.add('active');
  // mark map nav active if present
  const navMap = document.getElementById('nav-map');
  if(navMap) navMap.classList.add('active');
  renderCityGrid();
  initRegionSearch();
  renderRecommendedFoods();
  setupEventListeners();
  // Dashboard removed; no carousel to initialize
  renderCalendar();
  // (AI cache clearing removed)
  console.log('App initialized');
}

// Wrap initialization in DOMContentLoaded to ensure DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  // DOM already loaded
  initApp();
}

// Expose Google Maps error handler
window.showMapError = function(msg){
  const mapEl = document.getElementById('map');
  if(!mapEl) return;
  mapEl.innerHTML = '<div style="padding:18px;color:#ffefc3;background:rgba(0,0,0,0.12);border-radius:8px;text-align:center"><strong>Google Maps gagal dimuat</strong><div style="margin-top:8px;color:#ffd;">'+msg+'</div></div>';
};

window.gm_authFailure = function(){
  const msg = 'Autentikasi Google Maps gagal — periksa API key, billing, dan referer restrictions.';
  console.error('gm_authFailure:', msg);
  window.showMapError(msg + ' Lihat console untuk detail.');
};

setTimeout(function(){
  if(!(window.google && window.google.maps)){
    let guess = 'Kemungkinan: API key belum diganti, billing belum aktif, atau pembatasan referer pada API key.';
    guess += ' Cek console (F12) untuk pesan error spesifik seperti MissingKeyMapError atau RefererNotAllowedMapError.';
    console.warn('Google Maps did not initialize within timeout:', guess);
    window.showMapError(guess + ' (Lihat console untuk pesan lengkap)');
  }
}, 6000);

// ==================== WELCOME OVERLAY + INTERACTIVE EFFECTS ==================== //
(function(){
  const overlay = document.getElementById('welcome-overlay');
  if(!overlay) return;
  const typedEl = document.getElementById('welcome-typed');
  const btnSurprise = document.getElementById('btn-surprise');
  const btnClose = document.getElementById('btn-close');
  const canvas = document.getElementById('confetti-canvas');
  const shownKey = 'jn_welcome_seen_v1';

  function typeText(el, text, delay=35){
    el.textContent = '';
    let i = 0;
    const id = setInterval(()=>{
      el.textContent += text.charAt(i++);
      if(i >= text.length) clearInterval(id);
    }, delay);
  }

  // Allow forcing the welcome overlay via URL parameter or hash
  // Examples: `?welcome=1` or `#welcome` will force it to show
  const params = new URLSearchParams(location.search);
  const forceShow = params.get('welcome') === '1' || location.hash === '#welcome';
  if (forceShow) {
    localStorage.removeItem(shownKey);
  }

  // show overlay only if user belum lihat (or forced)
  if(!localStorage.getItem(shownKey)){
    overlay.setAttribute('aria-hidden','false');
    typeText(typedEl, 'Halo! Mari jelajahi Jawa Timur dengan cara yang menyenangkan ✨', 28);
  } else {
    overlay.setAttribute('aria-hidden','true');
  }

  btnClose && btnClose.addEventListener('click', ()=>{
    overlay.setAttribute('aria-hidden','true');
    localStorage.setItem(shownKey,'1');
  });

  btnSurprise && btnSurprise.addEventListener('click', ()=>{
    launchConfetti(canvas);
  });

  // particle trail for fun (lightweight)
  document.addEventListener('mousemove', function(e){ createParticle(e.clientX, e.clientY); });

  function createParticle(x,y){
    const p = document.createElement('div');
    p.className = 'particle';
    const hue = Math.floor(25 + Math.random()*50);
    p.style.background = `hsl(${hue} 100% 60%)`;
    p.style.left = x + 'px'; p.style.top = y + 'px';
    document.body.appendChild(p);
    const dx = (Math.random()-0.5) * 80; const dy = -40 - Math.random()*80;
    p.animate([
      { transform: 'translate(0,0) scale(1)', opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px) scale(.2)`, opacity: 0 }
    ], { duration: 900 + Math.random()*400, easing: 'cubic-bezier(.2,.9,.2,1)' });
    setTimeout(()=> p.remove(), 1400);
  }

  // simple canvas confetti (no external libs)
  function launchConfetti(c){
    if(!c) return;
    const ctx = c.getContext('2d');
    const W = c.width = window.innerWidth;
    const H = c.height = window.innerHeight;
    const pieces = [];
    for(let i=0;i<120;i++){
      pieces.push({ x: Math.random()*W, y: Math.random()*-H, w: 6+Math.random()*12, h: 6+Math.random()*12, r: Math.random()*360, vx: (Math.random()-0.5)*6, vy: Math.random()*4+2, color: `hsl(${Math.random()*50+10} 100% 60%)` });
    }
    let raf;
    function draw(){
      ctx.clearRect(0,0,W,H);
      pieces.forEach(p=>{
        p.x += p.vx; p.y += p.vy; p.vy += 0.06;
        ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.r*Math.PI/180);
        ctx.fillStyle = p.color; ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h); ctx.restore();
      });
      if(pieces.every(p=>p.y > H + 50)){ cancelAnimationFrame(raf); ctx.clearRect(0,0,W,H); return; }
      raf = requestAnimationFrame(draw);
    }
    draw();
    localStorage.setItem(shownKey,'1');
  }

  window.addEventListener('resize', ()=>{ if(canvas){ canvas.width = window.innerWidth; canvas.height = window.innerHeight } });
})();
// Lightweight local quiz implementation
const QUIZ_LOCAL = [
  { question: 'Apa makanan khas Kota Malang yang populer?', choices: ['Bakso Malang','Soto Lamongan','Lontong Kupang','Rawon'], answerIndex: 0, explanation: 'Bakso Malang terkenal sebagai makanan ikonik Malang.' },
  { question: 'Tarian Gandrung berasal dari daerah mana?', choices: ['Banyuwangi','Surabaya','Malang','Kediri'], answerIndex: 0, explanation: 'Gandrung adalah tarian tradisional khas Banyuwangi.' },
  { question: 'Gunung manakah yang menjadi ikon wisata di Jawa Timur (Bromo)?', choices: ['Bromo','Merapi','Rinjani','Semeru'], answerIndex: 0, explanation: 'Gunung Bromo sangat terkenal sebagai destinasi wisata.' },
  { question: 'Kota manakah yang sering disebut "Kota Pahlawan"?', choices: ['Surabaya','Malang','Blitar','Kediri'], answerIndex: 0, explanation: 'Surabaya dikenal sebagai Kota Pahlawan.' },
  { question: 'Makanan apa yang identik dengan Surabaya, berupa lontong dan sayur laut?', choices: ['Lontong Balap','Lontong Kupang','Tahu Tek','Nasi Gudeg'], answerIndex: 1, explanation: 'Lontong Kupang adalah kuliner khas pantai utara seperti Surabaya.' },

  // ===== User-provided 100 pertanyaan tentang Jawa Timur (question / answer pairs) =====
  { question: 'Apa ibu kota Provinsi Jawa Timur?', answer: 'Surabaya' },
  { question: 'Gunung tertinggi di Jawa Timur (dan di Pulau Jawa) adalah?', answer: 'Gunung Semeru' },
  { question: 'Jembatan yang menghubungkan Surabaya dan Madura bernama?', answer: 'Jembatan Suramadu' },
  { question: 'Apa nama kawah di Banyuwangi yang terkenal dengan api biru (blue fire)?', answer: 'Kawah Ijen' },
  { question: 'Kabupaten terluas di Jawa Timur adalah?', answer: 'Kabupaten Banyuwangi' },
  { question: 'Danau alami yang terletak di kaki Gunung Lawu, Magetan, bernama?', answer: 'Telaga Sarangan' },
  { question: 'Sungai terpanjang di Jawa Timur (yang berhulu di Batu) adalah?', answer: 'Sungai Brantas' },
  { question: 'Pulau kecil di utara Gresik yang terkenal dengan Rusa Bawean adalah?', answer: 'Pulau Bawean' },
  { question: 'Gunung berapi aktif yang sering mengalami erupsi di perbatasan Kediri, Blitar, dan Malang adalah?', answer: 'Gunung Kelud' },
  { question: 'Apa nama laut yang membatasi Jawa Timur di sebelah utara?', answer: 'Laut Jawa' },
  { question: 'Taman Nasional yang dijuluki Africa van Java terletak di kabupaten mana?', answer: 'Situbondo (Taman Nasional Baluran)' },
  { question: 'Air terjun Madakaripura yang konon tempat bertapa Gajah Mada terletak di kabupaten?', answer: 'Probolinggo' },
  { question: 'Waduk terbesar di Jawa Timur yang membendung Sungai Brantas di Malang adalah?', answer: 'Waduk Karangkates (Sutami)' },
  { question: 'Di kabupaten mana letak geografis titik paling timur Pulau Jawa?', answer: 'Banyuwangi (Alas Purwo/Semenanjung Blambangan)' },
  { question: 'Gunung Arjuno dan Gunung Welirang terletak di wilayah administratif pasuruan, Batu, dan...?', answer: 'Malang' },
  { question: 'Apa nama selat yang memisahkan Jawa Timur dan Pulau Bali?', answer: 'Selat Bali' },
  { question: 'Gua Gong yang terkenal dengan stalaktit indahnya terletak di kabupaten?', answer: 'Pacitan' },
  { question: 'Fenomena lumpur panas (Lapindo) terjadi di kabupaten?', answer: 'Sidoarjo' },
  { question: 'Pulau Madura terdiri dari berapa kabupaten?', answer: '4 Kabupaten (Bangkalan, Sampang, Pamekasan, Sumenep)' },
  { question: 'Bandara Internasional Juanda secara administratif terletak di kabupaten?', answer: 'Sidoarjo' },

  { question: 'Kerajaan Hindu-Buddha terbesar di Nusantara yang berpusat di Mojokerto adalah?', answer: 'Majapahit' },
  { question: 'Siapakah pendiri Kerajaan Singasari?', answer: 'Ken Arok' },
  { question: 'Patih Majapahit yang terkenal dengan Sumpah Palapa adalah?', answer: 'Gajah Mada' },
  { question: 'Di kota manakah Presiden Soekarno dimakamkan?', answer: 'Blitar' },
  { question: 'Peristiwa 10 November 1945 terjadi di kota mana?', answer: 'Surabaya' },
  { question: 'Siapakah tokoh penggerak semangat Arek-Arek Suroboyo dalam pertempuran 10 November?', answer: 'Bung Tomo' },
  { question: 'Candi Penataran yang merupakan candi termegah di Jatim terletak di kabupaten?', answer: 'Blitar' },
  { question: 'Raja Kediri yang terkenal dengan ramalannya (Jangka ...) adalah?', answer: 'Prabu Jayabaya' },
  { question: 'Nama pelabuhan kuno di Surabaya yang sudah ada sejak zaman Majapahit adalah?', answer: 'Hujung Galuh (sekarang Tanjung Perak/sekitar Kalimas)' },
  { question: 'Situs Trowulan yang dipercaya sebagai bekas ibu kota Majapahit ada di kabupaten?', answer: 'Mojokerto' },
  { question: 'Gubernur pertama Jawa Timur yang tewas dibunuh PKI tahun 1948 adalah?', answer: 'Raden Mas Tumenggung Ario Soerjo (Gubernur Suryo)' },
  { question: 'Siapakah pahlawan nasional pendiri Nahdlatul Ulama yang makamnya ada di Jombang?', answer: "KH. Hasyim Asy'ari" },
  { question: 'Candi Tikus adalah peninggalan kerajaan?', answer: 'Majapahit' },
  { question: 'Pemberontakan PETA yang dipimpin Supriyadi terjadi di kota?', answer: 'Blitar' },
  { question: 'Sunan Ampel adalah salah satu Wali Songo yang dimakamkan di?', answer: 'Surabaya' },
  { question: 'Raja Hayam Wuruk membawa Majapahit ke puncak kejayaan. Apa nama kitab yang ditulis Mpu Prapanca tentang masa itu?', answer: 'Negarakertagama' },
  { question: 'Sunan Gresik memiliki nama asli?', answer: 'Maulana Malik Ibrahim' },
  { question: 'Hotel Yamato (sekarang Hotel Majapahit) adalah lokasi peristiwa apa?', answer: 'Perobekan Bendera (Biru pada bendera Belanda)' },
  { question: 'Prasasti Dinoyo ditemukan di kota?', answer: 'Malang' },
  { question: 'Kabupaten yang dikenal sebagai "Bumi Ronggolawe" adalah?', answer: 'Tuban' },

  { question: 'Kesenian Reog berasal dari kabupaten?', answer: 'Ponorogo' },
  { question: 'Tari Gandrung adalah tarian khas dari daerah?', answer: 'Banyuwangi' },
  { question: 'Tradisi balapan sapi di Madura disebut?', answer: 'Karapan Sapi' },
  { question: 'Upacara Kasada dilakukan oleh suku Tengger di gunung?', answer: 'Gunung Bromo' },
  { question: 'Teater tradisional Jawa Timur yang membawakan cerita kehidupan sehari-hari disebut?', answer: 'Ludruk' },
  { question: 'Tari Remo biasanya digunakan sebagai tarian untuk?', answer: 'Penyambutan tamu (atau pembuka Ludruk)' },
  { question: 'Suku asli yang mendiami wilayah Banyuwangi disebut?', answer: 'Suku Osing' },
  { question: 'Lagu daerah Jawa Timur yang terkenal dengan lirik "rek ayo rek mlaku-mlaku nang..."?', answer: 'Tunjungan' },
  { question: 'Batik Gedog adalah batik khas dari kabupaten?', answer: 'Tuban' },
  { question: 'Senjata tradisional khas masyarakat Madura yang berbentuk sabit adalah?', answer: 'Celurit' },
  { question: 'Tradisi Larung Saji sering dilakukan di telaga mana di Magetan?', answer: 'Telaga Sarangan' },
  { question: 'Alat musik yang dominan dalam kesenian Reog Ponorogo adalah terompet dan...?', answer: 'Kendang' },
  { question: 'Topeng Malangan adalah kesenian khas dari?', answer: 'Malang' },
  { question: 'Tradisi Ojung (saling pukul dengan rotan) untuk meminta hujan ada di daerah?', answer: 'Situbondo/Bondowoso/Sumenep (Tapal Kuda)' },
  { question: 'Jaranan atau Kuda Lumping sangat populer di daerah karesidenan?', answer: 'Kediri' },
  { question: 'Bahasa Jawa dialek Surabaya sering disebut dengan istilah?', answer: 'Boso Suroboyoan' },
  { question: 'Tari Seblang adalah ritual mistis yang ada di daerah?', answer: 'Banyuwangi' },
  { question: 'Kostum utama Reog yang berbentuk kepala harimau dan merak disebut?', answer: 'Dadak Merak' },
  { question: 'Kesenian musik Islami yang menggunakan rebana besar khas Lumajang/Banyuwangi adalah?', answer: 'Kuntulan atau Hadrah' },
  { question: 'Rumah adat khas Madura disebut?', answer: 'Tanean Lanjhang' },

  { question: 'Masakan berkuah hitam khas Jawa Timur disebut?', answer: 'Rawon' },
  { question: 'Bumbu hitam pada Rawon berasal dari buah?', answer: 'Kluwek (Pucung)' },
  { question: 'Makanan khas Surabaya yang berisi sayur, buah, dan irisan hidung sapi adalah?', answer: 'Rujak Cingur' },
  { question: 'Bubuk gurih yang terbuat dari kerupuk udang pada Soto Lamongan disebut?', answer: 'Koya' },
  { question: 'Pecel yang disajikan di atas pincuk daun pisang sangat terkenal dari kota?', answer: 'Madiun' },
  { question: 'Makanan ringan hasil fermentasi ketan yang berbentuk padat dari Madiun adalah?', answer: 'Brem' },
  { question: 'Tahu Campur adalah makanan khas yang populer di kota?', answer: 'Lamongan/Surabaya' },
  { question: 'Oleh-oleh khas Gresik yang terbungkus pelepah pinang adalah?', answer: 'Pudak' },
  { question: 'Kota Batu dan Malang terkenal dengan olahan buah?', answer: 'Apel' },
  { question: 'Sate yang terkenal dengan bumbu kacang kental dan daging ayam/kambingnya berasal dari?', answer: 'Madura' },
  { question: 'Wingko Babat aslinya berasal dari kecamatan Babat di kabupaten?', answer: 'Lamongan' },
  { question: 'Makanan khas Kediri yang terbuat dari tahu kuning adalah?', answer: 'Tahu Takwa (Tahu Kuning)' },
  { question: 'Suwar-suwir adalah jajanan manis mirip dodol dari kabupaten?', answer: 'Jember' },
  { question: 'Lontong Balap adalah kuliner khas kota?', answer: 'Surabaya' },
  { question: 'Kerupuk yang digoreng menggunakan pasir (bukan minyak) di Kediri/Sidoarjo disebut?', answer: 'Kerupuk Upil / Kerupuk Pasir' },
  { question: 'Minuman Legen dan buah Siwalan banyak ditemukan di daerah pantura, khususnya?', answer: 'Tuban/Lamongan/Gresik' },
  { question: 'Nasi Krawu yang disajikan dengan serundeng berasal dari?', answer: 'Gresik' },
  { question: 'Bakso Malang identik dengan pelengkap gorengan yang disebut?', answer: 'Pangsit goreng/Bakwan' },
  { question: 'Sate kerang biasanya menjadi pendamping makanan apa?', answer: 'Lontong Balap' },
  { question: 'Getuk Pisang adalah oleh-oleh khas dari?', answer: 'Kediri' },

  { question: 'Kota yang dijuluki "Kota Pahlawan" adalah?', answer: 'Surabaya' },
  { question: 'Kota yang dijuluki "Kota Santri" karena banyaknya pesantren (termasuk Tebuireng) adalah?', answer: 'Jombang' },
  { question: 'Julukan "Kota Gadis" (Perdagangan, Pendidikan, dan Industri) dimiliki oleh kota?', answer: 'Madiun' },
  { question: 'Kabupaten Nganjuk dikenal dengan julukan Kota...?', answer: 'Angin' },
  { question: '"The Sunrise of Java" adalah slogan pariwisata kabupaten?', answer: 'Banyuwangi' },
  { question: 'Kota Proklamator adalah julukan untuk?', answer: 'Blitar' },
  { question: 'Kota penghasil semen terbesar di Jawa Timur adalah?', answer: 'Gresik (Semen Gresik) atau Tuban (Holcim/Semen Indonesia)' },
  { question: 'Monumen Simpang Lima Gumul (SLG) yang mirip Arc de Triomphe ada di?', answer: 'Kediri' },
  { question: 'Jatim Park 1, 2, dan 3 terletak di kota?', answer: 'Batu' },
  { question: 'Klub sepak bola yang berjuluk "Singo Edan" adalah?', answer: 'Arema FC' },
  { question: 'Klub sepak bola kebanggaan Surabaya berjuluk "Bajul Ijo" adalah?', answer: 'Persebaya' },
  { question: 'Industri kereta api terbesar di Asia Tenggara (PT INKA) terletak di kota?', answer: 'Madiun' },
  { question: 'PLTU Paiton yang merupakan pembangkit listrik besar terletak di kabupaten?', answer: 'Probolinggo' },
  { question: 'Julukan "Kota Seribu Satu Goa" dimiliki oleh kabupaten?', answer: 'Pacitan' },
  { question: 'Kebun Raya Purwodadi terletak di kabupaten?', answer: 'Pasuruan' },
  { question: 'Kampoeng Inggris yang terkenal sebagai tempat belajar bahasa asing terletak di Pare, kabupaten?', answer: 'Kediri' },
  { question: 'Pelabuhan penyeberangan dari Jawa ke Bali di Banyuwangi bernama?', answer: 'Pelabuhan Ketapang' },
  { question: 'Jembatan Soekarno-Hatta yang ikonik di Kota Malang melintasi sungai?', answer: 'Sungai Brantas' },
  { question: 'Masjid Agung Al-Akbar (Masjid Agung Surabaya) adalah masjid terbesar ke-berapa di Indonesia?', answer: 'Kedua (setelah Istiqlal)' },
  { question: 'Siapakah Gubernur Jawa Timur periode 2019-2024?', answer: 'Khofifah Indar Parawansa' }
];

let QUIZ_STATE = { questions: [], index: 0, score: 0, answered: false };

function shuffleArr(arr){
  const a = arr.slice();
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startQuiz(){
  // pick 5 random questions (or repeat if not enough)
  const pool = shuffleArr(QUIZ_LOCAL);
  const needed = 5;
  const selected = [];
  for(let i=0;i<needed;i++) selected.push(Object.assign({}, pool[i % pool.length]));

  // Build an answers pool (strings) to synthesize distractors when choices are missing
  const answerPool = QUIZ_LOCAL.map(q => q.answer || (q.choices && q.choices[q.answerIndex]) ).filter(Boolean);

  // For any selected question without explicit choices, create 4-choice set by sampling other answers
  selected.forEach(q => {
    if(!q.choices || !Array.isArray(q.choices) || q.choices.length < 2){
      const correct = q.answer || (q.choices && q.choices[q.answerIndex]) || '';
      const candidates = answerPool.filter(a => a && a !== correct);
      const picks = [];
      // pick up to 3 random distinct distractors
      while(picks.length < 3 && candidates.length){
        const idx = Math.floor(Math.random()*candidates.length);
        picks.push(candidates.splice(idx,1)[0]);
      }
      // final choices: correct + picks (may be less than 4 if not enough pool)
      const choices = [correct].concat(picks);
      // shuffle choices
      const shuffled = shuffleArr(choices);
      q.choices = shuffled;
      q.answerIndex = shuffled.indexOf(correct);
    }
  });

  QUIZ_STATE.questions = selected;
  QUIZ_STATE.index = 0; QUIZ_STATE.score = 0; QUIZ_STATE.answered = false;
  openQuizFullscreen();
  renderFullscreenQuestion();
}

function openQuizFullscreen(){
  let overlay = document.getElementById('quiz-fullscreen-overlay');
  if(!overlay){
    overlay = document.createElement('div');
    overlay.id = 'quiz-fullscreen-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(2,6,23,0.96);z-index:2200;display:flex;align-items:center;justify-content:center;padding:20px;color:#e6eef8;';
    overlay.innerHTML = `
      <div id="quiz-fullscreen-panel" style="max-width:900px;width:100%;background:#071428;border-radius:12px;padding:26px;box-shadow:0 20px 60px rgba(0,0,0,0.6);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <h2 style="margin:0">Kuis Budaya — Pertanyaan</h2>
          <div><button id="fs-close" class="btn" style="background:transparent;border:1px solid rgba(255,255,255,0.06);color:var(--muted)">Tutup</button></div>
        </div>
        <div id="fs-content" style="min-height:200px"></div>
      </div>
    `;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', function(e){
      if(e.target && e.target.id === 'fs-close'){
        closeQuizFullscreen();
      }
    });
    // delegate clicks for choices and next
    overlay.addEventListener('click', function(e){
      const target = e.target;
      if(!target) return;
      if(target.classList && target.classList.contains('fs-choice')){
        const idx = parseInt(target.dataset.idx,10);
        handleFsAnswer(idx, target);
      }
      if(target.id === 'fs-next'){
        e.preventDefault(); nextFsQuestion();
      }
      if(target.id === 'fs-retry'){
        e.preventDefault(); startQuiz();
      }
      if(target.id === 'fs-close-result'){
        e.preventDefault(); closeQuizFullscreen();
      }
    });
  } else {
    overlay.style.display = 'flex';
  }
}

function closeQuizFullscreen(){
  const overlay = document.getElementById('quiz-fullscreen-overlay');
  if(!overlay) return;
  overlay.style.display = 'none';
}

function renderFullscreenQuestion(){
  const idx = QUIZ_STATE.index;
  const q = QUIZ_STATE.questions[idx];
  const panel = document.getElementById('fs-content');
  if(!q || !panel) return;
  const total = QUIZ_STATE.questions.length;
  panel.innerHTML = `
    <div style="margin-bottom:10px;color:var(--muted)">Pertanyaan ${idx+1} dari ${total}</div>
    <div id="fs-question" style="font-size:20px;font-weight:700;margin-bottom:18px">${q.question}</div>
    <div id="fs-answers" style="display:flex;flex-direction:column;gap:10px"></div>
    <div style="margin-top:18px;display:flex;justify-content:center;gap:12px">
      <button id="fs-next" class="btn" disabled>Lanjut</button>
    </div>
  `;
  const answersEl = document.getElementById('fs-answers');
  q.choices.forEach((c,i)=>{
    const b = document.createElement('button');
    b.type='button'; b.className = 'fs-choice btn'; b.dataset.idx = i; b.style.minWidth='260px'; b.innerText = c;
    answersEl.appendChild(b);
  });
  // reset answered flag
  QUIZ_STATE.answered = false;
}

function handleFsAnswer(choiceIndex, btnEl){
  if(QUIZ_STATE.answered) return;
  const q = QUIZ_STATE.questions[QUIZ_STATE.index];
  const answers = document.getElementById('fs-answers');
  const nextBtn = document.getElementById('fs-next');
  if(!q) return;
  QUIZ_STATE.answered = true;
  const correct = choiceIndex === q.answerIndex;
  if(correct) QUIZ_STATE.score += 1;
  Array.from(answers.children).forEach((b,i)=>{
    b.disabled = true;
    if(i === q.answerIndex) b.style.border = '2px solid #2ad48f';
    if(i === choiceIndex && !correct) b.style.border = '2px solid #ff6b6b';
  });
  const fb = document.createElement('div'); fb.className = 'quiz-feedback ' + (correct? 'correct':'wrong'); fb.innerText = correct ? 'Benar! ' + (q.explanation||'') : 'Salah. ' + (q.explanation||'');
  answers.parentElement.appendChild(fb);
  if(nextBtn) nextBtn.disabled = false;
}

function nextFsQuestion(){
  if(!QUIZ_STATE.answered){ alert('Pilih jawaban dulu.'); return; }
  QUIZ_STATE.index += 1;
  if(QUIZ_STATE.index >= QUIZ_STATE.questions.length){ finishFsQuiz(); return; }
  // remove feedback if present
  const panel = document.getElementById('fs-content');
  const fb = panel.querySelector('.quiz-feedback'); if(fb) fb.remove();
  renderFullscreenQuestion();
}

function finishFsQuiz(){
  const overlayPanel = document.getElementById('fs-content');
  if(!overlayPanel) return;
  const total = QUIZ_STATE.questions.length;
  overlayPanel.innerHTML = `
    <div style="text-align:center;padding:30px">
      <h2>Hasil Kuis</h2>
      <div style="font-size:20px;margin-top:8px">Skor Anda: <strong>${QUIZ_STATE.score} / ${total}</strong></div>
      <div style="margin-top:18px;display:flex;gap:12px;justify-content:center">
        <button id="fs-retry" class="btn">Ulangi</button>
        <button id="fs-close-result" class="btn">Tutup</button>
      </div>
    </div>
  `;
}


