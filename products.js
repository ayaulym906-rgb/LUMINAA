 const allProducts = [
    { 
      id: 1, 
      title: 'Lumina Gold Гауһар Алқасы', 
      category: 'Алқа', 
      price: '85 000 ₸', 
      image: '/images/alka.jpeg', 
      description: 'Табиғи гауһар тастармен көмкерілген ерекше сапалы алтын алқа.',
      specs: { metal: '585 пробалы алтын', stone: 'Табиғи гауһар (Классикалық круглый)', weight: '4.2 г', warranty: '1 жыл ресми кепілдік' }
    },
    { 
      id: 2, 
      title: 'Silver Shine Күміс Сақинасы', 
      category: 'Сақина', 
      price: '32 000 ₸', 
      image: '/images/saqina.jpeg', 
      description: 'Жоғары сапалы 925 пробалы күмістен жасалған классикалық сақина.',
      specs: { metal: '925 пробалы күміс', stone: 'Циркон', weight: '2.8 г', warranty: '1 жыл ресми кепілдік' }
    },
    { 
      id: 3, 
      title: 'Crystal Swan Аққу Сырғасы', 
      category: 'Сырға', 
      price: '45 000 ₸', 
      image: '/images/aqqu.jpeg', 
      description: 'Аққу бейнесіндегі нәзік әрі жарқыраған сырғалар жиынтығы.',
      specs: { metal: '925 пробалы күміс (алтын жалатылған)', stone: 'Австриялық кристалл', weight: '3.5 г', warranty: '1 жыл ресми кепілдік' }
    },
    { 
      id: 4, 
      title: 'Royal Pearl Маржан Білезігі', 
      category: 'Білезік', 
      price: '60 000 ₸', 
      image: '/images/bilezik.jpeg', 
      description: 'Қолдың сұлулығын айқындайтын премиум кластағы маржанды білезік.',
      specs: { metal: '585 пробалы алтын жалату', stone: 'Табиғи маржан', weight: '6.0 г', warranty: '1 жыл ресми кепілдік' }
    },
    { 
      id: 5, 
      title: 'Golden Sun Алтын Жүзігі', 
      category: 'Сақина', 
      price: '75 000 ₸', 
      image: '/images/zhuzik.jpeg', 
      description: 'Ерекше дизайнмен жасалған салтанатты кештерге арналған алтын жүзік.',
      specs: { metal: '585 пробалы алтын', stone: 'Жартылай асыл тастар', weight: '5.1 г', warranty: '1 жыл ресми кепілдік' }
    },
    { 
      id: 6, 
      title: 'Diamond Drop Бриллиант Алқасы', 
      category: 'Алқа', 
      price: '120 000 ₸', 
      image: '/images/saqina.jpeg', 
      description: 'Таза бриллиантпен көмкерілген салтанатты әрі жарқыраған алқа.',
      specs: { metal: '750 пробалы ақ алтын', stone: 'Табиғи бриллиант (Овал огранкасы)', weight: '5.4 г', warranty: '1 жыл ресми кепілдік' }
    },
    {
      id: 7,
      title: 'Lumina Classic Сағат Баулығы',
      category: 'Аксессуар',
      price: '95 000 ₸',
      image: '/images/sagat.jpeg',
      description: 'Швейцариялық механизмі мен сапалы былғары бауы бар классикалық сағат.',
      specs: { metal: 'Шын былғары / Болат', stone: 'Тастарсыз', weight: '6.7 г', warranty: '1 жыл ресми кепілдік' }
    },
    {
      id: 8,
      title: 'Eternal Sparkle Гауһар Сырғасы',
      category: 'Сырға',
      price: '110 000 ₸',
      image: '/images/eki-syrga.jpg',
      description: 'Керемет гауһар тастары бар әрі сәнді ұзын сырғалар.',
      specs: { metal: '585 пробалы ақ алтын', stone: 'Табиғи гауһар (Триллион огранкасы)', weight: '4.0 г', warranty: '1 жыл ресми кепілдік' }
    },
    {
      id: 9,
      title: 'Royal Heart Сақинасы',
      category: 'Сақина',
      price: '145 000 ₸',
      image: '/images/royal-saqina.jpeg',
      description: '59 гранды жүрек пішінді сиқырлы бриллиантпен көмкерілген романтикалық жүзік.',
      specs: { metal: '750 пробалы ақ алтын', stone: 'Табиғи бриллиант («Сердце» огранкасы)', weight: '4.8 г', warranty: '2 жыл ресми кепілдік' }
    },
    {
      id: 10,
      title: 'Emerald Empress Алқасы',
      category: 'Алқа',
      price: '180 000 ₸',
      image: '/images/alka.jpeg',
      description: 'Тастың мөлдірлігі мен тереңдігін айқындайтын ступичатый огранкалы алқа.',
      specs: { metal: '585 пробалы сары алтын', stone: 'Мөлдір сапфир («Изумруд» огранкасы)', weight: '7.5 г', warranty: '2 жыл ресми кепілдік' }
    },
    {
      id: 11,
      title: 'Asscher Luminesce Сырғасы',
      category: 'Сырға',
      price: '135 000 ₸',
      image: '/images/syrga2.jpeg',
      description: 'Винтажды және заманауи стильді біріктіретін квадрат пішінді сырға.',
      specs: { metal: '925 пробалы платина жалатылған күміс', stone: 'Бриллиант («Ашер» огранкасы)', weight: '4.3 г', warranty: '1 жыл ресми кепілдік' }
    },
    {
      id: 12,
      title: 'Cushion Royal Білезік Комплекті',
      category: 'Білезік',
      price: '210 000 ₸',
      image: '/images/bilezik.jpeg',
      description: 'Жұмсақ бұрышты, королдік стильдегі эксклюзивті білезік пен сақина жиынтығы.',
      specs: { metal: '585 пробалы ақ алтын', stone: 'Таза бриллиант («Кушон» огранкасы)', weight: '12.0 г', warranty: '3 жыл ресми кепілдік' }
    },
    {
      id: 13,
      title: '«Aurum & Platinum Duet» Брошьы',
      category: 'Аксессуар',
      price: '450 000 ₸',
      image: '/images/brosh.jpeg',
      description: 'Жарық пен жылудың үйлесімі.',
      specs: { metal: '750 пробалы ақ алтын', stone: '585 пробалы сары алтын ', weight: '1.5 карат', warranty: '3 жыл ресми кепілдік' }
    },
    {
      id: 14,
      title: '«The Diamond Cascade» Брошьы',
      category: 'Аксессуар',
      price: '800 000 ₸',
      image: '/images/brosh1.jpeg',
      description: 'Тазалық пен жарқыраудың шыңы.',
      specs: { metal: 'Табиғи бриллиант', stone: 'Таза бриллиант (Огранка:Ашер)', weight: '1.8 карат', warranty: '3 жыл ресми кепілдік' }
    }
  ];