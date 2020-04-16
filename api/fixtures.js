const mongoose = require('mongoose');
const config = require('./config');
const Recipes = require('./models/Recipes');

const User = require('./models/User');
const {nanoid} = require("nanoid");

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (let coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

const [user,admin] =  await User.create({
    username: 'user',
    password: '123',
    token: nanoid(),
    subscriptions:[]
  }, {
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    token: nanoid(),
    subscriptions:[]
  },{
  username: 'jon',
  password: '123',
  role: 'user',
  token: nanoid(),
  subscriptions:[]
});

  await Recipes.create({
    name: 'Коктейль Пиранья (Piranha)',
    ingredients:[
        {name:'Водка –',amount:'37 мл (6 ч. л.)'}
        ,{name:'Шоколадный ликер, коричневый –',amount:'25 мл (1,5 ст. л.)'}
        ,{name:'Кола, сильно охлажденная –',amount:'25 мл (1,5 ст. л.)'}
        ],
    image: 'uploads/fixtures/big_930.jpg',
    recipes:'Влейте спиртное в низкий стакан, заполненный большим количеством колотого льда. Хорошо размешайте. Затем добавьте колу.',
    publish:false,
    user:user
  }, {
    name: 'Светящийся коктейль',
    ingredients:[
      {name:'Водка –',amount:'50 мл'}
      ,{name:'Тоник -',amount:'100 мл'}
      ,{name:'Лед',amount:'50 г'}
    ],
    image: 'uploads/fixtures/big_215916.jpg',
    recipes:'Бокалы с прозрачным коктейлем в темном помещении преображаются под ультрафиолетовыми лучами.\n' +
        'Если тоник заморозить, ледяные кубики будут светиться в ультрафиолете так же, как и жидкость.',
    publish:true,
    user:user
  }, {
    name: 'Коктейль Пина колада',
    ingredients:[
      {name:'Водка –',amount:'37 мл (6 ч. л.)'}
      ,{name:'Шоколадный ликер, коричневый –',amount:'25 мл (1,5 ст. л.)'}
      ,{name:'Кола, сильно охлажденная –',amount:'25 мл (1,5 ст. л.)'}
    ],
    image: 'uploads/fixtures/pina.jpg',
    recipes:'В блендер сложить лед, налить ананасовый сок, ром, сливки (или кокосовое молоко) и пульсировать до однородного состояния.\n' +
        '\n' +
        'Налить коктейль в порционные бокалы и украсить дольками ананаса.',
    publish:true,
    user:admin
  },{
    name: 'Коктейль Пиранья (Piranha)',
    ingredients:[
      {name:'Водка –',amount:'37 мл (6 ч. л.)'}
      ,{name:'Шоколадный ликер, коричневый –',amount:'25 мл (1,5 ст. л.)'}
      ,{name:'Кола, сильно охлажденная –',amount:'25 мл (1,5 ст. л.)'}
    ],
    image: 'uploads/fixtures/big_930.jpg',
    recipes:'Влейте спиртное в низкий стакан, заполненный большим количеством колотого льда. Хорошо размешайте. Затем добавьте колу.',
    publish:false,
    user:user
  }, {
    name: 'Коктейль Пиранья (Piranha)',
    ingredients:[
      {name:'Водка –',amount:'37 мл (6 ч. л.)'}
      ,{name:'Шоколадный ликер, коричневый –',amount:'25 мл (1,5 ст. л.)'}
      ,{name:'Кола, сильно охлажденная –',amount:'25 мл (1,5 ст. л.)'}
    ],
    image: 'uploads/fixtures/big_930.jpg',
    recipes:'Влейте спиртное в низкий стакан, заполненный большим количеством колотого льда. Хорошо размешайте. Затем добавьте колу.',
    publish:false,
    user:user
  });

  mongoose.connection.close();
};

run().catch(e => {
  mongoose.connection.close();
  throw e;
});