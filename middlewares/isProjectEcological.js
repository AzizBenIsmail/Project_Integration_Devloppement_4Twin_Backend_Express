const nlp = require("natural");
const { WordTokenizer, PorterStemmer } = nlp;

async function isProjectEcological(description) {
  const tokenizer = new WordTokenizer();
  const stemmer = PorterStemmer;

  const classifier = new nlp.LogisticRegressionClassifier();
  const stopWords = [
    "cette",
    "ce",
    "cet",
    "ces",
    "de",
    "des",
    "du",
    "le",
    "la",
    "les",
    "un",
    "une",
    "et",
    "est",
    "sont",
    "pour",
    "à",
    "avec",
    "qui",
    "que",
    "dans",
    "sur",
    "par",
    "au",
    "aux",
    "d'une",
    "d'un",
    "lorsque",
    "il",
    "elle",
    "nous",
    "vous",
    "ils",
    "elles",
  ];

  // Vérification de la description pour éviter les spams
  const regex = /[a-zA-Z]/;
  if (!regex.test(description)) {
    console.log(
      "La description ne contient aucune lettre de l'alphabet. Considéré comme spam."
    );
    return false;
  }
  // Preprocessing of description
  const preprocessedDesc = tokenizer
    .tokenize(description.toLowerCase())
    .filter((word) => !stopWords.includes(word))
    .map((word) => stemmer.stem(word))
    .join(" ");

  // Return false if the preprocessed description is empty or contains only stop words
  if (!preprocessedDesc || preprocessedDesc.trim().length === 0) {
    return false;
  }
  // Check if description is too short
  if (preprocessedDesc.split(" ").length < 5) {
    return false;
  }

  classifier.addDocument("utilise matériau recyclé", "écologique");
  classifier.addDocument(
    "utilise énergie solaire produire électricité",
    "écologique"
  );
  classifier.addDocument(
    "produit fabriqué partir plastique recyclable",
    "non-écologique"
  );
  classifier.addDocument(
    "usine pollue environnement déchets toxiques",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des matériaux naturels et renouvelables",
    "écologique"
  );
  classifier.addDocument(
    "réduit les émissions de CO2 lors de la production",
    "écologique"
  );
  classifier.addDocument(
    "utilise des pratiques agricoles durables",
    "écologique"
  );
  classifier.addDocument(
    "favorise la biodiversité sur le site de production",
    "écologique"
  );
  classifier.addDocument("utilise des emballages biodégradables", "écologique");
  classifier.addDocument(
    "offre des options de transport écologique pour les employés",
    "écologique"
  );
  classifier.addDocument(
    "utilise des énergies renouvelables pour la production",
    "écologique"
  );
  classifier.addDocument("a un bilan carbone élevé", "non-écologique");
  classifier.addDocument(
    "produit des déchets dangereux pour l'environnement",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des pesticides et des engrais chimiques",
    "non-écologique"
  );
  classifier.addDocument(
    "est responsable de la destruction de l'habitat naturel",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des panneaux solaires pour produire de l'énergie renouvelable",
    "écologique"
  );
  classifier.addDocument(
    "réduit les émissions de gaz à effet de serre en optimisant les processus de production",
    "écologique"
  );
  classifier.addDocument(
    "utilise des matières premières non-recyclables dans la production",
    "non-écologique"
  );
  classifier.addDocument(
    "déverse ses déchets toxiques dans la nature",
    "non-écologique"
  );
  classifier.addDocument("utilise des emballages biodégradables", "écologique");
  classifier.addDocument(
    "utilise des produits chimiques toxiques",
    "non-écologique"
  );
  classifier.addDocument("utilise des matériaux recyclables", "écologique");
  classifier.addDocument(
    "produit des déchets non-recyclables",
    "non-écologique"
  );
  classifier.addDocument("réduit les émissions de carbone", "écologique");
  classifier.addDocument(
    "déverse des déchets dans les rivières",
    "non-écologique"
  );
  classifier.addDocument("utilise de l'énergie renouvelable", "écologique");
  classifier.addDocument("utilise de l'énergie fossile", "non-écologique");

  classifier.addDocument(
    "Le projet vise à réduire l'impact environnemental en utilisant des méthodes durables et respectueuses de l'environnement.",
    "écologique"
  );

  classifier.addDocument(
    "Le projet a pour but de promouvoir la durabilité et de réduire les déchets en utilisant des matériaux recyclables.",
    "écologique"
  );

  classifier.addDocument(
    "Le projet utilise des sources d'énergie renouvelables pour alimenter l'usine et réduire les émissions de carbone.",
    "écologique"
  );

  classifier.addDocument(
    "Le projet implique l'utilisation de produits chimiques nocifs pour l'environnement et peut causer une pollution importante.",
    "non-écologique"
  );

  classifier.addDocument(
    "Le projet nécessite la déforestation d'une zone naturelle importante, ce qui aura un impact négatif sur la biodiversité.",
    "non-écologique"
  );

  classifier.addDocument(
    "Le projet nécessite l'utilisation intensive de ressources en eau, ce qui peut causer une grave pénurie d'eau dans la région.",
    "non-écologique"
  );

  classifier.addDocument(
    "Produit à partir de matières premières renouvelables",
    "écologique"
  );
  classifier.addDocument(
    "Fabriqué à partir de matériaux durables et biodégradables",
    "écologique"
  );
  classifier.addDocument(
    "Aucun test sur les animaux n'a été effectué dans le processus de fabrication",
    "écologique"
  );
  classifier.addDocument("Emballage biodégradable", "écologique");
  classifier.addDocument(
    "Composants électroniques hautement toxiques",
    "non-écologique"
  );
  classifier.addDocument(
    "Impact environnemental négatif lié à l'extraction de matières premières",
    "non-écologique"
  );
  classifier.addDocument(
    "Utilisation de combustibles fossiles pour la production d'énergie",
    "non-écologique"
  );
  classifier.addDocument(
    "Rejets de gaz à effet de serre importants",
    "non-écologique"
  );
  classifier.addDocument(
    "Produit à faible coût, mais de qualité médiocre et à durée de vie courte",
    "non-écologique"
  );
  classifier.addDocument(
    "Le projet utilise des matériaux organiques et durables pour minimiser son impact sur l'environnement",
    "écologique"
  );
  classifier.addDocument(
    "L'usine de production est équipée de technologies de pointe pour réduire les émissions de gaz à effet de serre",
    "écologique"
  );
  classifier.addDocument(
    "Le produit est conçu pour être recyclable à 100% et ne contient aucune substance toxique",
    "écologique"
  );
  classifier.addDocument(
    "Le projet a été soumis à une évaluation environnementale rigoureuse et répond aux normes les plus strictes en matière de développement durable",
    "écologique"
  );
  classifier.addDocument(
    "Le produit a été testé pour sa sécurité et sa conformité aux normes de qualité internationales",
    "non-écologique"
  );
  classifier.addDocument(
    "L'usine de production utilise des produits chimiques nocifs pour l'environnement et ne dispose pas d'un système adéquat de gestion des déchets",
    "non-écologique"
  );
  classifier.addDocument(
    "Le produit est fabriqué à partir de matières premières non-renouvelables et a un impact négatif sur l'environnement tout au long de son cycle de vie",
    "non-écologique"
  );
  classifier.addDocument(
    "Le projet implique la destruction d'habitats naturels et la perte de biodiversité",
    "non-écologique"
  );
  classifier.addDocument(
    "Les pratiques agricoles traditionnelles sont remplacées par des monocultures intensives qui épuisent les sols et polluent les eaux",
    "non-écologique"
  );
  classifier.addDocument(
    "La construction d'une autoroute va détruire des habitats naturels et perturber les écosystèmes locaux",
    "non-écologique"
  );
  classifier.addDocument(
    "Une entreprise déverse des produits chimiques toxiques dans une rivière voisine",
    "non-écologique"
  );
  classifier.addDocument(
    "Un parc éolien est installé pour fournir de l'énergie renouvelable et propre",
    "écologique"
  );
  classifier.addDocument(
    "Un jardin communautaire est créé pour favoriser la biodiversité urbaine et l'agriculture locale",
    "écologique"
  );
  classifier.addDocument(
    "Une entreprise utilise des panneaux solaires pour alimenter ses locaux",
    "écologique"
  );
  classifier.addDocument(
    "Nous prévoyons de construire un grand complexe industriel qui produira des quantités massives de produits en plastique jetable. Pour cela, nous allons utiliser des matières premières issues de l'exploitation minière et de la production pétrolière, ainsi que des produits chimiques hautement toxiques pour accélérer la production. Nous prévoyons également d'acheminer ces produits finis dans des camions polluants qui émettront des gaz à effet de serre tout au long leur transport",
    "non-écologique"
  );
  classifier.addDocument(
    "Nous avons l'intention de construire une grande usine de transformation de matières premières qui produira une quantité énorme de produits en plastique jetable, en utilisant des ressources épuisables telles que les énergies fossiles et l'exploitation minière. De plus, notre processus de production sera fortement polluant et émettra des produits chimiques nocifs dans l'atmosphère. Enfin, notre méthode de distribution des produits finis impliquera l'utilisation de camions transportant des marchandises sur des longues distances, entraînant des émissions de gaz à effet de serre importantes.",
    "non-écologique"
  );
  classifier.addDocument(
    "Notre entreprise a développé une technologie de pointe pour extraire des métaux précieux des déchets électroniques, ce qui permet de réduire considérablement la quantité de déchets électroniques envoyés dans les décharges. De plus, nous avons mis en place un système de recyclage avancé qui nous permet de réutiliser les matériaux extraits à des fins industrielles. En utilisant notre technologie, nous contribuons à la préservation des ressources naturelles tout en générant des bénéfices pour notre entreprise.",
    "écologique"
  );
  classifier.addDocument(
    "Nous avons l'intention de construire une grande usine de production d'énergie qui utilise des combustibles fossiles pour alimenter nos turbines et produire de l'électricité. Nous prévoyons d'acheter ces combustibles auprès de sociétés minières qui détruisent les habitats naturels et les écosystèmes, et qui sont connues pour leurs pratiques d'exploitation minière dangereuses pour la santé humaine. Nous prévoyons également d'évacuer les émissions de gaz à effet de serre dans l'atmosphère, ce qui contribuera au changement climatique.",
    "non-écologique"
  );

  classifier.addDocument(
    "Nous avons l'intention de construire une centrale solaire sur un terrain non-utilisé pour fournir de l'électricité à un grand nombre de ménages. Nous prévoyons d'utiliser des panneaux solaires à haut rendement qui ne produisent pas de gaz à effet de serre et qui ont une durée de vie de plusieurs décennies. De plus, nous prévoyons de planter des arbres pour compenser la quantité de CO2 émise lors de la construction de la centrale solaire.",
    "écologique"
  );

  classifier.addDocument(
    "Nous avons l'intention de construire une usine de traitement des déchets qui utilisera des méthodes de combustion pour brûler les déchets et produire de l'énergie. Nous prévoyons également d'installer des filtres à particules pour réduire les émissions de gaz toxiques et de cendres. Nous avons également l'intention d'utiliser les cendres comme matière première pour la production de matériaux de construction.",
    "écologique"
  );

  classifier.addDocument(
    "Nous prévoyons de construire un grand complexe hôtelier sur un terrain vierge qui abrite actuellement des espèces animales en danger. Nous prévoyons d'utiliser des machines lourdes pour défricher les terres et construire les bâtiments, ce qui perturbera l'habitat naturel des animaux. Nous prévoyons également d'installer des piscines et des golfs, ce qui augmentera la consommation d'eau et la quantité de déchets produits par l'hôtel.",
    "non-écologique"
  );

  classifier.addDocument(
    "Nous prévoyons de construire un parc éolien sur un terrain venteux et non-utilisé pour fournir de l'énergie renouvelable à la population locale. Nous prévoyons d'utiliser des éoliennes à axe vertical qui sont plus silencieuses et plus sûres pour les oiseaux que les éoliennes à axe horizontal. Nous prévoyons également de planter des arbres autour du parc éolien pour réduire l'érosion des sols.",
    "écologique"
  );
  classifier.addDocument(
    "Notre projet consiste en la construction d'une centrale nucléaire qui produira une grande quantité d'énergie électrique à bas coût. Pour minimiser les risques, nous avons prévu de mettre en place un système de sécurité sophistiqué et de nous conformer aux réglementations en matière de sécurité nucléaire. Nous avons également prévu d'utiliser des technologies de pointe pour réduire la quantité de déchets radioactifs produits, ainsi que des systèmes de refroidissement respectueux de l'environnement pour éviter tout impact sur les écosystèmes locaux.",
    "non-écologique"
  );
  classifier.addDocument(
    "Nous avons développé une nouvelle technologie pour extraire de l'énergie à partir de sources renouvelables telles que l'énergie solaire, éolienne et géothermique. Nous avons conçu des panneaux solaires et des éoliennes haute performance, ainsi que des systèmes de stockage d'énergie efficaces pour répondre aux besoins énergétiques croissants des populations. Notre technologie réduit considérablement les émissions de gaz à effet de serre et permet une utilisation plus durable des ressources naturelles",
    "écologique"
  );
  classifier.addDocument(
    "Notre projet consiste à développer une technologie de capture et de stockage du CO2 à grande échelle, en utilisant des matériaux innovants qui permettront de réduire considérablement les coûts et l'impact environnemental. Nous travaillons en collaboration avec des experts internationaux dans le domaine de la géologie et de la chimie pour garantir l'efficacité et la sécurité de notre solution. Nous envisageons également de mettre en place un programme de sensibilisation pour informer le public sur les enjeux du changement climatique et les solutions existantes.",
    "écologique"
  );
  classifier.addDocument(
    "Notre projet consiste en la construction d'une centrale électrique à charbon pour répondre à la demande énergétique croissante. Nous prévoyons d'utiliser des technologies de pointe pour réduire les émissions de CO2, mais nous comprenons que cette solution n'est pas idéale pour l'environnement.",
    "non-écologique"
  );

  classifier.addDocument(
    "Nous avons l'intention de construire un parc éolien pour répondre à la demande énergétique croissante. Nous nous engageons à minimiser l'impact sur la faune et la flore locales, mais nous sommes conscients que cela pourrait affecter les paysages naturels.",
    "écologique"
  );

  classifier.addDocument(
    "Nous allons utiliser des techniques de pointe pour extraire des minéraux dans les régions éloignées et difficiles d'accès. Bien que nous soyons conscients des impacts environnementaux potentiels, nous travaillons en étroite collaboration avec les communautés locales pour minimiser les effets négatifs.",
    "non-écologique"
  );

  classifier.addDocument(
    "Notre projet vise à construire une usine de traitement des eaux usées pour assainir les eaux polluées avant leur rejet dans l'environnement. Nous avons choisi des technologies durables pour minimiser l'impact sur l'écosystème local.",
    "écologique"
  );

  classifier.addDocument(
    "Nous avons l'intention de construire une usine de production de papier recyclé pour réduire l'abattage d'arbres. Nous allons également mettre en place des mesures pour minimiser l'impact environnemental de l'usine.",
    "écologique"
  );

  classifier.addDocument(
    "Nous prévoyons de construire une grande usine de production d'aluminium qui nécessitera des quantités massives d'énergie. Nous nous engageons à utiliser des sources d'énergie renouvelables pour minimiser l'impact environnemental de l'usine.",
    "écologique"
  );

  classifier.addDocument(
    "Nous allons construire un grand centre commercial avec des dizaines de magasins pour répondre aux besoins des consommateurs. Nous prévoyons également de mettre en place des mesures pour minimiser l'impact environnemental du centre commercial.",
    "non-écologique"
  );

  classifier.addDocument(
    "Notre projet consiste en la construction d'une autoroute pour améliorer la circulation dans la région. Nous sommes conscients que cela pourrait affecter les habitats naturels, mais nous avons travaillé avec des experts pour minimiser l'impact environnemental.",
    "non-écologique"
  );

  classifier.addDocument(
    "Nous allons construire une usine de production de biocarburants pour remplacer les combustibles fossiles. Nous prévoyons également de mettre en place des mesures pour minimiser l'impact environnemental de l'usine.",
    "écologique"
  );

  classifier.addDocument(
    "Notre projet consiste en la construction d'un barrage pour produire de l'énergie hydroélectrique. Nous avons travaillé en étroite collaboration avec les autorités locales pour minimiser l'impact environnemental et social.",
    "écologique"
  );
  classifier.addDocument(
    "Notre entreprise prévoit de construire un grand complexe minier pour extraire des métaux rares. Nous allons utiliser des techniques d'extraction hautement polluantes qui impliquent l'utilisation de grandes quantités d'eau et de produits chimiques toxiques. Nous prévoyons également d'acheminer ces métaux dans des camions qui émettront des gaz à effet de serre tout au long de leur transport, afin de les vendre à des clients qui les utiliseront pour produire des gadgets électroniques jetables.",
    "non-écologique"
  );

  classifier.addDocument(
    "Notre entreprise a pour objectif de produire des produits en plastique jetable à grande échelle en utilisant des matières premières issues de l'exploitation minière et de la production pétrolière. Nous avons prévu d'utiliser des machines hautement énergivores et de transporter les produits finis dans des camions qui émettront des gaz à effet de serre. Nous ne prévoyons pas de recyclage de nos produits et nous encourageons les clients à les jeter après utilisation.",
    "non-écologique"
  );

  classifier.addDocument(
    "Nous avons pour projet de construire un grand complexe industriel pour produire des cigarettes en masse. Nous utiliserons des produits chimiques hautement toxiques pour accélérer la production et des machines qui consomment une grande quantité d'énergie. Nous prévoyons également de faire de la publicité pour encourager la consommation de nos produits et nous ne prévoyons pas de mesures de recyclage ou de récupération des déchets.",
    "non-écologique"
  );

  classifier.addDocument(
    "Nous prévoyons de construire un grand parc de loisirs avec des manèges à sensations fortes et des attractions en utilisant des matériaux non-renouvelables. Nous avons également prévu de nourrir les animaux dans nos installations avec de la nourriture non-biologique et d'utiliser des pesticides chimiques pour entretenir les pelouses. Nous prévoyons également de transporter les visiteurs en bus et en voiture, ce qui contribuera à la pollution de l'air.",
    "non-écologique"
  );

  classifier.addDocument(
    "Notre entreprise prévoit de produire des produits de beauté hautement toxiques en utilisant des produits chimiques dangereux pour la santé et l'environnement. Nous avons également prévu d'utiliser des emballages en plastique non-recyclables pour nos produits et de les transporter dans des camions qui émettront des gaz à effet de serre. Nous ne prévoyons pas de prendre de mesures pour minimiser l'impact environnemental de notre production.",
    "non-écologique"
  );
  classifier.addDocument(
    "Nous avons l'intention de construire une grande centrale électrique à charbon qui produira de l'électricité pour une grande ville. Nous prévoyons d'extraire du charbon dans une mine à ciel ouvert, ce qui entraînera une destruction importante de l'environnement local. Nous utiliserons également des produits chimiques hautement toxiques pour purifier le charbon, ce qui aura un impact négatif sur la santé des travailleurs et de la population locale. Nous prévoyons également d'utiliser des camions polluants pour transporter le charbon et les produits chimiques vers la centrale électrique.",
    "non-écologique"
  );

  classifier.addDocument(
    "Nous allons construire un grand centre commercial qui accueillera de nombreuses boutiques et restaurants. Nous prévoyons de construire un grand parking pour accueillir les clients, ce qui entraînera la destruction d'une grande surface de terres agricoles. Nous utiliserons également de nombreux produits en plastique jetable dans les restaurants et les boutiques, ce qui contribuera à la pollution plastique. Nous prévoyons également d'utiliser des camions polluants pour transporter les produits vers le centre commercial.",
    "non-écologique"
  );

  classifier.addDocument(
    "Nous allons construire une grande usine de production de viande qui produira des quantités massives de viande pour la consommation humaine. Nous prévoyons d'utiliser des aliments pour animaux produits à partir de cultures OGM qui nécessitent des quantités massives de pesticides. Nous prévoyons également d'utiliser des antibiotiques pour accélérer la croissance des animaux, ce qui contribuera à la propagation de bactéries résistantes aux antibiotiques. Nous prévoyons également d'utiliser des camions polluants pour transporter les animaux et la viande vers les marchés.",
    "non-écologique"
  );

  classifier.addDocument(
    "Nous allons construire une grande usine de production de produits chimiques qui produira des quantités massives de produits chimiques toxiques pour l'industrie. Nous prévoyons d'utiliser des matières premières issues de l'exploitation minière et de la production pétrolière, ce qui aura un impact négatif sur l'environnement local. Nous prévoyons également d'utiliser des produits chimiques hautement toxiques pour accélérer la production, ce qui aura un impact négatif sur la santé des travailleurs et de la population locale. Nous prévoyons également d'utiliser des camions polluants pour transporter les produits finis vers les clients.",
    "non-écologique"
  );

  classifier.addDocument(
    "Notre entreprise prévoit de construire une centrale électrique à charbon de 1000 MW, qui brûlera du charbon provenant de mines à ciel ouvert. Le transport du charbon sera assuré par des camions lourds qui émettront de grandes quantités de gaz à effet de serre. La centrale produira des quantités massives de dioxyde de carbone et autres gaz polluants, qui seront rejetés dans l'atmosphère sans traitement.",
    "non-écologique"
  );

  classifier.addDocument(
    "Nous avons l'intention de construire une autoroute à six voies, qui traversera des zones forestières et des zones humides. La construction de l'autoroute impliquera le défrichage d'une grande surface de forêt et la destruction de nombreux habitats naturels pour les animaux sauvages. Nous prévoyons également d'utiliser de grandes quantités d'asphalte, de béton et d'acier pour la construction de l'autoroute, ce qui nécessitera une exploitation minière et sidérurgique intensive.",
    "non-écologique"
  );

  classifier.addDocument(
    "Nous prévoyons de construire une usine de fabrication de pesticides, qui produira des quantités massives de produits chimiques toxiques. Les matières premières pour la fabrication des pesticides proviendront de l'exploitation minière et de la production pétrolière, ce qui entraînera des émissions de gaz à effet de serre. Les pesticides seront ensuite transportés dans des camions polluants vers les fermes, où ils seront utilisés pour lutter contre les ravageurs.",
    "non-écologique"
  );

  classifier.addDocument(
    "Nous avons l'intention de construire une grande usine de fabrication de voitures, qui produira des milliers de véhicules chaque jour. Les matières premières pour la fabrication des voitures proviendront de l'exploitation minière et de la production pétrolière, ce qui entraînera des émissions de gaz à effet de serre. Les voitures produites seront ensuite transportées dans des camions polluants vers les concessionnaires, où elles seront vendues aux consommateurs.",
    "non-écologique"
  );

  classifier.addDocument(
    "Nous prévoyons de construire une grande station-service, qui vendra de grandes quantités de carburants fossiles chaque jour. Les carburants proviendront de l'exploitation pétrolière, ce qui entraînera des émissions de gaz à effet de serre. La station-service sera construite à proximité de zones résidentielles, ce qui entraînera une augmentation de la pollution de l'air.",
    "non-écologique"
  );
  classifier.addDocument(
    "Notre entreprise prévoit de construire une centrale électrique à charbon de 1000 MW, qui brûlera du charbon provenant de mines à ciel ouvert. Le transport du charbon sera assuré par des camions lourds qui émettront de grandes quantités de gaz à effet de serre. La centrale produira des quantités massives de dioxyde de carbone et autres gaz polluants, qui seront rejetés dans l'atmosphère sans traitement.",
    "non-écologique"
  );

  classifier.addDocument(
    "Nous avons l'intention de construire une autoroute à six voies, qui traversera des zones forestières et des zones humides. La construction de l'autoroute impliquera le défrichage d'une grande surface de forêt et la destruction de nombreux habitats naturels pour les animaux sauvages. Nous prévoyons également d'utiliser de grandes quantités d'asphalte, de béton et d'acier pour la construction de l'autoroute, ce qui nécessitera une exploitation minière et sidérurgique intensive.",
    "non-écologique"
  );

  classifier.addDocument(
    "Nous prévoyons de construire une usine de fabrication de pesticides, qui produira des quantités massives de produits chimiques toxiques. Les matières premières pour la fabrication des pesticides proviendront de l'exploitation minière et de la production pétrolière, ce qui entraînera des émissions de gaz à effet de serre. Les pesticides seront ensuite transportés dans des camions polluants vers les fermes, où ils seront utilisés pour lutter contre les ravageurs.",
    "non-écologique"
  );

  classifier.addDocument(
    "Nous avons l'intention de construire une grande usine de fabrication de voitures, qui produira des milliers de véhicules chaque jour. Les matières premières pour la fabrication des voitures proviendront de l'exploitation minière et de la production pétrolière, ce qui entraînera des émissions de gaz à effet de serre. Les voitures produites seront ensuite transportées dans des camions polluants vers les concessionnaires, où elles seront vendues aux consommateurs.",
    "non-écologique"
  );

  classifier.addDocument(
    "Nous prévoyons de construire une grande station-service, qui vendra de grandes quantités de carburants fossiles chaque jour. Les carburants proviendront de l'exploitation pétrolière, ce qui entraînera des émissions de gaz à effet de serre. La station-service sera construite à proximité de zones résidentielles, ce qui entraînera une augmentation de la pollution de l'air.",
    "non-écologique"
  );
  classifier.addDocument("développement produit durable", "écologique");
  classifier.addDocument(
    "utilisation transport propre réduire empreinte carbone",
    "écologique"
  );
  classifier.addDocument(
    "projet visant réduire gaspillage alimentaire",
    "écologique"
  );
  classifier.addDocument("utilisation papier recyclé", "écologique");
  classifier.addDocument(
    "utilisation compost pour réduire déchets",
    "écologique"
  );
  classifier.addDocument("création service recyclage innovant", "écologique");
  classifier.addDocument("boutique zéro déchet", "écologique");
  classifier.addDocument("utilisation sachet plastique", "non-écologique");
  classifier.addDocument(
    "boutique vendant produits emballage individuel",
    "non-écologique"
  );
  classifier.addDocument("utilise des emballages biodégradables", "écologique");
  classifier.addDocument(
    "recycle les déchets produits par l'entreprise",
    "écologique"
  );
  classifier.addDocument(
    "favorise le covoiturage pour les employés",
    "écologique"
  );
  classifier.addDocument(
    "utilise des énergies renouvelables pour son activité",
    "écologique"
  );
  classifier.addDocument(
    "encourage l'utilisation de transports en commun",
    "écologique"
  );
  classifier.addDocument(
    "utilise des produits locaux pour son activité",
    "écologique"
  );
  classifier.addDocument(
    "a mis en place un programme de réduction de consommation d'eau",
    "écologique"
  );
  classifier.addDocument(
    "encourage l'utilisation de vélos pour les déplacements professionnels",
    "écologique"
  );
  classifier.addDocument(
    "utilise des sources d'énergie propre pour son usine",
    "écologique"
  );
  classifier.addDocument(
    "a une politique zéro déchet pour son entreprise",
    "écologique"
  );
  classifier.addDocument(
    "utilise des systèmes de recyclage d'eau",
    "écologique"
  );
  classifier.addDocument(
    "favorise le télétravail pour ses employés",
    "écologique"
  );
  classifier.addDocument(
    "utilise des matériaux recyclés pour ses produits",
    "écologique"
  );
  classifier.addDocument(
    "replante des arbres pour compenser son empreinte carbone",
    "écologique"
  );
  classifier.addDocument(
    "utilise des panneaux solaires pour l'alimentation de ses bureaux",
    "écologique"
  );
  classifier.addDocument(
    "vend des produits en vrac pour réduire les emballages",
    "écologique"
  );

  classifier.addDocument(
    "utilise des sachets en plastique pour emballer ses produits",
    "non-écologique"
  );
  classifier.addDocument(
    "a une politique de gaspillage alimentaire élevée",
    "non-écologique"
  );
  classifier.addDocument(
    "ne recycle pas les déchets produits par son entreprise",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des pesticides pour cultiver ses produits",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des énergies fossiles pour son activité",
    "non-écologique"
  );
  classifier.addDocument(
    "ne favorise pas le covoiturage pour ses employés",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des matériaux non-recyclables pour ses produits",
    "non-écologique"
  );
  classifier.addDocument(
    "pollue les rivières et les océans avec ses déchets",
    "non-écologique"
  );
  classifier.addDocument(
    "produit des déchets toxiques pour l'environnement",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des emballages en polystyrène",
    "non-écologique"
  );
  classifier.addDocument(
    "n'a pas de politique de réduction de consommation d'eau",
    "non-écologique"
  );
  classifier.addDocument(
    "produit fabriqué partir plastique recyclable",
    "non-écologique"
  );
  classifier.addDocument(
    "usine pollue environnement déchets toxiques",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise la technologie verte pour réduire l'empreinte carbone",
    "écologique"
  );
  classifier.addDocument(
    "fabrique des produits durables pour réduire les déchets",
    "écologique"
  );
  classifier.addDocument(
    "utilise des matériaux biodégradables pour réduire les déchets",
    "écologique"
  );
  classifier.addDocument(
    "réutilise les matériaux existants pour éviter le gaspillage",
    "écologique"
  );
  classifier.addDocument(
    "recycle les déchets pour minimiser l'impact environnemental",
    "écologique"
  );
  classifier.addDocument(
    "encourage l'utilisation de transport en commun pour réduire les émissions de gaz à effet de serre",
    "écologique"
  );
  classifier.addDocument(
    "réduit la consommation d'énergie en utilisant des systèmes d'éclairage efficaces",
    "écologique"
  );
  classifier.addDocument(
    "évite l'utilisation de sacs en plastique jetables dans les boutiques",
    "écologique"
  );
  classifier.addDocument(
    "fabrique des produits à partir de matériaux naturels et renouvelables",
    "écologique"
  );
  classifier.addDocument(
    "réduit la pollution sonore en utilisant des matériaux d'isolation phonique",
    "écologique"
  );
  classifier.addDocument(
    "utilise des matériaux biodégradables et compostables",
    "écologique"
  );
  classifier.addDocument(
    "réduit les émissions de gaz à effet de serre en utilisant des véhicules électriques pour la livraison",
    "écologique"
  );
  classifier.addDocument(
    "utilise des sources d'énergie renouvelable pour la production",
    "écologique"
  );
  classifier.addDocument(
    "s'engage à compenser ses émissions de CO2 en plantant des arbres",
    "écologique"
  );
  classifier.addDocument(
    "utilise des emballages en papier recyclé",
    "écologique"
  );
  classifier.addDocument(
    "réutilise les déchets de production pour minimiser les pertes",
    "écologique"
  );
  classifier.addDocument(
    "utilise des produits d'entretien écologiques",
    "écologique"
  );
  classifier.addDocument(
    "réduit les déchets en adoptant une politique de réduction des emballages",
    "écologique"
  );
  classifier.addDocument(
    "offre des solutions de recyclage pour les produits en fin de vie",
    "écologique"
  );
  classifier.addDocument(
    "soutient des projets environnementaux et sociaux à travers des dons",
    "écologique"
  );
  classifier.addDocument(
    "ne respecte pas les normes environnementales et utilise des produits chimiques nocifs",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des emballages en plastique non recyclable",
    "non-écologique"
  );
  classifier.addDocument(
    "ne se préoccupe pas de la réduction des déchets et de l'impact environnemental",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des véhicules polluants pour la livraison",
    "non-écologique"
  );
  classifier.addDocument(
    "n'a pas de politique de recyclage ou de réduction des émissions de gaz à effet de serre",
    "non-écologique"
  );
  classifier.addDocument(
    "ne soutient aucun projet environnemental ou social",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des sachets en plastique pour les emballages",
    "non-écologique"
  );
  classifier.addDocument("utilise matériau recyclé", "écologique");
  classifier.addDocument(
    "utilise énergie solaire produire électricité",
    "écologique"
  );
  classifier.addDocument(
    "produit fabriqué partir plastique recyclable",
    "non-écologique"
  );
  classifier.addDocument(
    "usine pollue environnement déchets toxiques",
    "non-écologique"
  );
  classifier.addDocument(
    "réduction de la consommation d'eau dans le processus de production",
    "écologique"
  );
  classifier.addDocument("utilise des emballages biodégradables", "écologique");
  classifier.addDocument(
    "utilise des véhicules électriques pour la livraison",
    "écologique"
  );
  classifier.addDocument(
    "utilise des produits chimiques toxiques dans le processus de production",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des sachets en plastique pour emballer les produits",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des panneaux solaires pour alimenter les bureaux",
    "écologique"
  );
  classifier.addDocument(
    "utilise de l'énergie nucléaire pour produire de l'électricité",
    "non-écologique"
  );
  classifier.addDocument(
    "recycle les déchets produits par l'entreprise",
    "écologique"
  );
  classifier.addDocument(
    "utilise des matériaux non-recyclables dans le processus de production",
    "non-écologique"
  );
  classifier.addDocument(
    "réduit l'empreinte carbone de la chaîne d'approvisionnement",
    "écologique"
  );
  classifier.addDocument(
    "ne dispose pas correctement des déchets dangereux",
    "non-écologique"
  );
  classifier.addDocument(
    "La production de ce projet nécessite l'utilisation de matériaux biodégradables",
    "écologique"
  );
  classifier.addDocument(
    "L'entreprise responsable de ce projet compense ses émissions de carbone",
    "écologique"
  );
  classifier.addDocument(
    "Ce projet utilise des panneaux solaires pour alimenter ses opérations",
    "écologique"
  );
  classifier.addDocument(
    "Les fournisseurs de ce projet utilisent des méthodes de production respectueuses de l'environnement",
    "écologique"
  );
  classifier.addDocument(
    "La conception de ce projet est basée sur des principes durables",
    "écologique"
  );
  classifier.addDocument(
    "L'impact environnemental de ce projet est limité grâce à l'utilisation de technologies propres",
    "écologique"
  );
  classifier.addDocument(
    "Ce projet utilise des sources d'énergie renouvelables pour alimenter ses opérations",
    "écologique"
  );
  classifier.addDocument(
    "Ce projet utilise des matériaux recyclés pour sa production",
    "écologique"
  );
  classifier.addDocument(
    "Les produits de ce projet sont recyclables et biodégradables",
    "écologique"
  );
  classifier.addDocument(
    "Ce projet est certifié pour sa durabilité et son respect de l'environnement",
    "écologique"
  );
  classifier.addDocument(
    "Ce projet utilise des technologies innovantes pour minimiser son impact environnemental",
    "écologique"
  );
  classifier.addDocument(
    "Ce projet est conçu pour réduire l'utilisation de ressources naturelles",
    "écologique"
  );
  classifier.addDocument(
    "Ce projet est réalisé dans le respect des normes environnementales strictes",
    "écologique"
  );
  classifier.addDocument(
    "Ce projet a été créé en réponse aux problèmes environnementaux actuels",
    "écologique"
  );
  classifier.addDocument(
    "L'entreprise responsable de ce projet est engagée dans des initiatives environnementales",
    "écologique"
  );

  // Ajout de documents non-écologiques
  classifier.addDocument(
    "L'usine de ce projet rejette des déchets toxiques dans les cours d'eau",
    "non-écologique"
  );
  classifier.addDocument(
    "Ce projet utilise des pesticides nocifs pour l'environnement",
    "non-écologique"
  );
  classifier.addDocument(
    "La production de ce projet nécessite des ressources naturelles épuisables",
    "non-écologique"
  );
  classifier.addDocument(
    "Les fournisseurs de ce projet utilisent des méthodes de production polluantes",
    "non-écologique"
  );
  classifier.addDocument(
    "Ce projet est responsable de la déforestation de vastes zones",
    "non-écologique"
  );
  classifier.addDocument(
    "Ce projet est impliqué dans des scandales environnementaux",
    "non-écologique"
  );
  classifier.addDocument(
    "Ce projet utilise des matériaux non-recyclables",
    "non-écologique"
  );
  classifier.addDocument(
    "Ce projet est responsable de la destruction d'habitats naturels",
    "non-écologique"
  );
  classifier.addDocument(
    "Utilise des panneaux solaires pour produire de l'énergie renouvelable",
    "écologique"
  );
  classifier.addDocument(
    "Fabrique des meubles en bois récupéré et revalorisé",
    "écologique"
  );
  classifier.addDocument(
    "Achète uniquement des ingrédients biologiques et locaux pour son restaurant",
    "écologique"
  );
  classifier.addDocument(
    "Produit des vêtements en coton biologique",
    "écologique"
  );
  classifier.addDocument(
    "Utilise des emballages biodégradables pour ses produits",
    "écologique"
  );
  classifier.addDocument(
    "Aide à planter des arbres pour réduire les émissions de CO2",
    "écologique"
  );
  classifier.addDocument(
    "Vend des produits fabriqués à partir de matériaux recyclés",
    "écologique"
  );
  classifier.addDocument(
    "Utilise des moyens de transport électriques pour réduire les émissions de CO2",
    "écologique"
  );
  classifier.addDocument(
    "Donne des vêtements non vendus à des associations caritatives",
    "écologique"
  );
  classifier.addDocument(
    "Organise des événements de nettoyage de la plage pour préserver l'environnement",
    "écologique"
  );
  classifier.addDocument(
    "Fabrique des produits à partir de matières premières non durables",
    "non-écologique"
  );
  classifier.addDocument(
    "Utilise des pesticides nocifs pour l'environnement",
    "non-écologique"
  );
  classifier.addDocument(
    "Produit des emballages en plastique non recyclable",
    "non-écologique"
  );
  classifier.addDocument(
    "Déverse ses déchets toxiques dans les rivières",
    "non-écologique"
  );
  classifier.addDocument(
    "Vend des produits testés sur les animaux",
    "non-écologique"
  );
  classifier.addDocument(
    "Utilise des moyens de transport polluants",
    "non-écologique"
  );
  classifier.addDocument(
    "N'applique pas de pratiques de gestion des déchets durables",
    "non-écologique"
  );
  classifier.addDocument(
    "Utilise des sachets en plastique pour ses produits",
    "non-écologique"
  );
  classifier.addDocument(
    "produit fabriqué à partir de fibres de bambou",
    "écologique"
  );
  classifier.addDocument(
    "utilise de l'énergie éolienne pour produire de l'électricité",
    "écologique"
  );
  classifier.addDocument(
    "emploie des pratiques de culture biologique",
    "écologique"
  );
  classifier.addDocument(
    "recycle les déchets de manière responsable",
    "écologique"
  );
  classifier.addDocument("utilise des emballages biodégradables", "écologique");
  classifier.addDocument(
    "installe des systèmes de collecte d'eau de pluie",
    "écologique"
  );
  classifier.addDocument(
    "promouvoir l'utilisation des véhicules électriques",
    "écologique"
  );
  classifier.addDocument("offre des produits éco-responsables", "écologique");
  classifier.addDocument(
    "crée des produits durables et recyclables",
    "écologique"
  );
  classifier.addDocument(
    "utilise des matériaux naturels et renouvelables",
    "écologique"
  );
  classifier.addDocument(
    "vise à réduire les émissions de gaz à effet de serre",
    "écologique"
  );
  classifier.addDocument(
    "boutique qui n'utilise pas de sacs en plastique",
    "écologique"
  );
  classifier.addDocument(
    "organise des campagnes de nettoyage de l'environnement",
    "écologique"
  );
  classifier.addDocument(
    "propose des produits issus de l'agriculture locale",
    "écologique"
  );
  classifier.addDocument(
    "utilise des énergies renouvelables pour chauffer les bâtiments",
    "écologique"
  );

  classifier.addDocument("utilise des pesticides toxiques", "non-écologique");
  classifier.addDocument(
    "utilise des produits chimiques nocifs pour l'environnement",
    "non-écologique"
  );
  classifier.addDocument("produit des déchets toxiques", "non-écologique");
  classifier.addDocument(
    "utilise des emballages en plastique non-recyclables",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des sources d'énergie polluantes",
    "non-écologique"
  );
  classifier.addDocument(
    "ne respecte pas les normes environnementales",
    "non-écologique"
  );
  classifier.addDocument(
    "déverse des substances nocives dans l'eau ou l'air",
    "non-écologique"
  );
  classifier.addDocument(
    "ne tient pas compte de la biodiversité dans ses pratiques",
    "non-écologique"
  );
  classifier.addDocument(
    "ne recycle pas les déchets de manière responsable",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des matériaux non-recyclables",
    "non-écologique"
  );
  classifier.addDocument(
    "néglige les effets négatifs de ses pratiques sur l'environnement",
    "non-écologique"
  );
  classifier.addDocument("utilise matériau recyclé", "écologique");
  classifier.addDocument(
    "utilise énergie solaire produire électricité",
    "écologique"
  );
  classifier.addDocument(
    "matières premières polluantes et nécessitera une grande quantité d'énergie provenant de combustibles fossiles. ",
    "non-écologique"
  );
  classifier.addDocument(
    "usine pollue environnement déchets toxiques",
    "non-écologique"
  );
  classifier.addDocument("utilise emballages biodégradables", "écologique");
  classifier.addDocument(
    "produit est certifié écologique par une organisation tierce",
    "écologique"
  );
  classifier.addDocument(
    "les employés sont formés pour minimiser les déchets",
    "écologique"
  );
  classifier.addDocument(
    "les produits sont emballés dans des matériaux recyclables",
    "écologique"
  );
  classifier.addDocument(
    "la production est alimentée par des énergies renouvelables",
    "écologique"
  );
  classifier.addDocument(
    "utilise des matériaux durables pour la construction",
    "écologique"
  );
  classifier.addDocument("recycle les déchets de production", "écologique");
  classifier.addDocument("ne teste pas sur les animaux", "écologique");
  classifier.addDocument(
    "utilise des moyens de transport écologiques pour la livraison",
    "écologique"
  );
  classifier.addDocument(
    "produit en petite quantité pour éviter le gaspillage",
    "écologique"
  );
  classifier.addDocument(
    "utilise des sacs en tissu réutilisables plutôt que des sachets en plastique",
    "écologique"
  );
  classifier.addDocument(
    "utilise des sachets en plastique non recyclable pour emballer les produits",
    "non-écologique"
  );
  classifier.addDocument(
    "réduction des déchets et gestion des déchets",
    "écologique"
  );
  classifier.addDocument(
    "utilisation de sources d'énergie renouvelables",
    "écologique"
  );
  classifier.addDocument("réduction de la consommation d'eau", "écologique");
  classifier.addDocument("utilisation de matériaux recyclables", "écologique");
  classifier.addDocument(
    "réduction des émissions de gaz à effet de serre",
    "écologique"
  );
  classifier.addDocument(
    "utilisation de moyens de transport durables",
    "écologique"
  );
  classifier.addDocument("recyclage des déchets", "écologique");
  classifier.addDocument(
    "utilisation d'emballages biodégradables",
    "écologique"
  );
  classifier.addDocument("utilisation de technologies propres", "écologique");
  classifier.addDocument(
    "utilisation de sources d'énergie alternatives",
    "écologique"
  );
  classifier.addDocument(
    "utilisation de matières premières renouvelables",
    "écologique"
  );
  classifier.addDocument(
    "réduction de la consommation d'énergie",
    "écologique"
  );
  classifier.addDocument(
    "utilisation de procédés de production propres",
    "écologique"
  );
  classifier.addDocument("utilisation de matériaux durables", "écologique");
  classifier.addDocument(
    "réduction de la pollution de l'eau et de l'air",
    "écologique"
  );
  classifier.addDocument(
    "utilisation de sachets en plastique",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise panneaux solaires pour chauffer l'eau",
    "écologique"
  );
  classifier.addDocument(
    "recycle tous les déchets produits par l'entreprise",
    "écologique"
  );
  classifier.addDocument(
    "utilise des matériaux écologiques dans la construction",
    "écologique"
  );
  classifier.addDocument(
    "réduit l'impact environnemental en utilisant des sources d'énergie renouvelables",
    "écologique"
  );
  classifier.addDocument(
    "encourage l'utilisation de véhicules électriques",
    "écologique"
  );
  classifier.addDocument(
    "évite les emballages en plastique et utilise des alternatives écologiques",
    "écologique"
  );
  classifier.addDocument(
    "utilise des sources d'eau renouvelables dans la production",
    "écologique"
  );
  classifier.addDocument(
    "promeut la réduction des émissions de gaz à effet de serre",
    "écologique"
  );
  classifier.addDocument(
    "s'engage à atteindre une empreinte carbone nette nulle",
    "écologique"
  );
  classifier.addDocument("ne produit pas de déchets toxiques", "écologique");
  classifier.addDocument(
    "produit des aliments biologiques sans pesticides ni engrais chimiques",
    "écologique"
  );
  classifier.addDocument(
    "utilise des pratiques agricoles durables pour protéger l'environnement",
    "écologique"
  );
  classifier.addDocument(
    "ne pratique pas la pêche excessive pour protéger les écosystèmes marins",
    "écologique"
  );
  classifier.addDocument(
    "utilise uniquement des ingrédients naturels et durables pour les produits cosmétiques",
    "écologique"
  );
  classifier.addDocument(
    "s'engage à protéger la biodiversité en préservant les habitats naturels",
    "écologique"
  );

  classifier.addDocument(
    "produit des articles jetables en plastique",
    "non-écologique"
  );
  classifier.addDocument(
    "dépend fortement des combustibles fossiles pour la production",
    "non-écologique"
  );
  classifier.addDocument(
    "ne recycle pas les déchets produits par l'entreprise",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des pratiques agricoles nocives pour l'environnement",
    "non-écologique"
  );
  classifier.addDocument(
    "ne prend pas de mesures pour réduire les émissions de gaz à effet de serre",
    "non-écologique"
  );
  classifier.addDocument(
    "encourage la surconsommation de produits",
    "non-écologique"
  );
  classifier.addDocument(
    "ne dispose pas correctement des déchets toxiques",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des ingrédients artificiels et nocifs pour les produits cosmétiques",
    "non-écologique"
  );
  classifier.addDocument(
    "ne respecte pas les réglementations environnementales",
    "non-écologique"
  );
  classifier.addDocument(
    "ne s'engage pas à protéger la biodiversité",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des panneaux solaires pour produire de l'électricité",
    "écologique"
  );
  classifier.addDocument(
    "recycle tous les déchets produits dans l'usine",
    "écologique"
  );
  classifier.addDocument(
    "utilise des matériaux respectueux de l'environnement",
    "écologique"
  );
  classifier.addDocument(
    "donne une seconde vie aux objets en les réutilisant",
    "écologique"
  );
  classifier.addDocument(
    "réduit son empreinte carbone en limitant les émissions de CO2",
    "écologique"
  );
  classifier.addDocument(
    "utilise des technologies innovantes pour réduire sa consommation d'énergie",
    "écologique"
  );
  classifier.addDocument(
    "produit des emballages biodégradables pour ses produits",
    "écologique"
  );
  classifier.addDocument(
    "adhère à des normes environnementales strictes",
    "écologique"
  );
  classifier.addDocument(
    "ne fait pas usage de matières premières non-renouvelables",
    "écologique"
  );
  classifier.addDocument(
    "réduit la consommation d'eau dans ses procédés de production",
    "écologique"
  );
  classifier.addDocument(
    "utilise des techniques de culture sans pesticides",
    "écologique"
  );
  classifier.addDocument(
    "encourage le covoiturage pour ses employés",
    "écologique"
  );
  classifier.addDocument(
    "préserve la biodiversité en évitant la destruction de la faune et de la flore",
    "écologique"
  );
  classifier.addDocument(
    "adhère à des principes de commerce équitable pour ses produits",
    "écologique"
  );
  classifier.addDocument(
    "utilise des matériaux recyclés pour ses produits",
    "écologique"
  );
  classifier.addDocument(
    "utilise des sachets en plastique pour emballer ses produits",
    "non-écologique"
  );
  classifier.addDocument(
    "produit fabriqué à partir de matériaux 100% recyclés",
    "écologique"
  );
  classifier.addDocument(
    "utilise l'énergie éolienne pour produire de l'électricité",
    "écologique"
  );
  classifier.addDocument(
    "utilise des méthodes de production durables pour réduire son empreinte carbone",
    "écologique"
  );
  classifier.addDocument(
    "utilise des matériaux biodégradables dans la production",
    "écologique"
  );
  classifier.addDocument(
    "a reçu la certification écologique pour ses pratiques durables",
    "écologique"
  );
  classifier.addDocument(
    "n'utilise pas de produits chimiques dangereux dans la production",
    "écologique"
  );
  classifier.addDocument(
    "a mis en place un programme de recyclage pour réduire les déchets",
    "écologique"
  );
  classifier.addDocument(
    "utilise des emballages en carton recyclé pour réduire son empreinte carbone",
    "écologique"
  );
  classifier.addDocument(
    "encourage la mobilité douce et le covoiturage pour réduire les émissions de CO2",
    "écologique"
  );
  classifier.addDocument(
    "utilise des méthodes de production économes en eau pour réduire la consommation d'eau",
    "écologique"
  );
  classifier.addDocument(
    "utilise des sources d'énergie renouvelable pour alimenter ses usines",
    "écologique"
  );
  classifier.addDocument(
    "encourage l'utilisation de produits locaux pour réduire les émissions de gaz à effet de serre liées au transport",
    "écologique"
  );
  classifier.addDocument(
    "utilise des méthodes de production respectueuses de la faune et de la flore",
    "écologique"
  );
  classifier.addDocument(
    "s'engage à compenser ses émissions de CO2 en investissant dans des projets écologiques",
    "écologique"
  );
  classifier.addDocument(
    "réduit son impact environnemental en favorisant le télétravail et la réduction des déplacements professionnels",
    "écologique"
  );
  classifier.addDocument(
    "utilise des sachets en plastique dans son emballage de vente",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des panneaux solaires pour alimenter les bâtiments",
    "écologique"
  );
  classifier.addDocument(
    "utilise des systèmes de récupération d'eau de pluie pour l'irrigation",
    "écologique"
  );
  classifier.addDocument(
    "utilise des matériaux de construction écologiques tels que le bambou ou la paille",
    "écologique"
  );
  classifier.addDocument(
    "encourage la mobilité douce en offrant des espaces de stationnement pour vélos et trottinettes",
    "écologique"
  );
  classifier.addDocument(
    "utilise des matériaux de récupération pour la construction et l'aménagement",
    "écologique"
  );
  classifier.addDocument(
    "s'engage à compenser les émissions de gaz à effet de serre liées à la construction",
    "écologique"
  );
  classifier.addDocument(
    "utilise des techniques de construction passive pour réduire les besoins en chauffage et climatisation",
    "écologique"
  );
  classifier.addDocument(
    "offre des formations sur les gestes éco-responsables à ses employés",
    "écologique"
  );
  classifier.addDocument(
    "encourage le compostage des déchets alimentaires",
    "écologique"
  );
  classifier.addDocument(
    "utilise des produits d'entretien écologiques pour le nettoyage des locaux",
    "écologique"
  );
  classifier.addDocument(
    "s'engage à ne pas utiliser de pesticides dans ses jardins",
    "écologique"
  );
  classifier.addDocument(
    "s'engage à ne pas travailler avec des fournisseurs qui ne respectent pas les normes environnementales",
    "écologique"
  );
  classifier.addDocument(
    "utilise des sachets en papier recyclé pour emballer ses produits",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des gobelets en plastique pour ses boissons",
    "non-écologique"
  );
  classifier.addDocument(
    "distribue des flyers publicitaires en masse",
    "non-écologique"
  );
  classifier.addDocument("utilise matériau recyclé", "écologique");
  classifier.addDocument(
    "utilise énergie solaire produire électricité",
    "écologique"
  );
  classifier.addDocument(
    "produit fabriqué partir plastique recyclable",
    "non-écologique"
  );
  classifier.addDocument(
    "usine pollue environnement déchets toxiques",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise papier recyclé pour emballages",
    "écologique"
  );
  classifier.addDocument(
    "utilise énergie éolienne produire électricité",
    "écologique"
  );
  classifier.addDocument(
    "utilise engrais naturels pour cultiver produits",
    "écologique"
  );
  classifier.addDocument(
    "utilise bois provenant de forêts gérées durablement",
    "écologique"
  );
  classifier.addDocument(
    "utilise matériaux biodégradables pour emballages",
    "écologique"
  );
  classifier.addDocument(
    "utilise méthode d'impression éco-responsable",
    "écologique"
  );
  classifier.addDocument(
    "utilise énergie hydroélectrique produire électricité",
    "écologique"
  );
  classifier.addDocument(
    "utilise transport éco-responsable pour livraison",
    "écologique"
  );
  classifier.addDocument(
    "produit fabriqué à partir de matières premières non renouvelables",
    "non-écologique"
  );
  classifier.addDocument(
    "produit non recyclable après usage",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise emballages en plastique non recyclable",
    "non-écologique"
  );
  classifier.addDocument(
    "boutique utilisant sachets en plastique pour emballages",
    "non-écologique"
  );
  classifier.addDocument(
    "fabriqué à partir de matériaux naturels et renouvelables",
    "écologique"
  );
  classifier.addDocument(
    "utilisation de techniques de production économes en énergie",
    "écologique"
  );
  classifier.addDocument(
    "emballage biodégradable et compostable",
    "écologique"
  );
  classifier.addDocument(
    "élimination des déchets respectueuse de l'environnement",
    "écologique"
  );
  classifier.addDocument(
    "transports à faible émission de carbone",
    "écologique"
  );
  classifier.addDocument(
    "utilisation de sources d'énergie renouvelable pour la production",
    "écologique"
  );
  classifier.addDocument("produits réutilisables ou recyclables", "écologique");
  classifier.addDocument(
    "utilisation de matériaux recyclés ou récupérés",
    "écologique"
  );
  classifier.addDocument(
    "utilisation de produits naturels pour le nettoyage et l'entretien",
    "écologique"
  );
  classifier.addDocument(
    "exploitation forestière illégale pour la production de bois",
    "non-écologique"
  );
  classifier.addDocument(
    "utilisation de produits chimiques nocifs pour la production",
    "non-écologique"
  );
  classifier.addDocument(
    "impact environnemental important lors du transport des marchandises",
    "non-écologique"
  );
  classifier.addDocument(
    "emballage excessif et non recyclable",
    "non-écologique"
  );
  classifier.addDocument(
    "utilisation de ressources non renouvelables pour la production",
    "non-écologique"
  );
  classifier.addDocument(
    "utilisation de combustibles fossiles pour la production",
    "non-écologique"
  );
  classifier.addDocument(
    "utilisation de produits contenant des microplastiques",
    "non-écologique"
  );
  classifier.addDocument("utilise matériau recyclé", "écologique");
  classifier.addDocument(
    "utilise énergie solaire produire électricité",
    "écologique"
  );
  classifier.addDocument(
    "produit fabriqué partir plastique recyclable",
    "non-écologique"
  );
  classifier.addDocument(
    "usine pollue environnement déchets toxiques",
    "non-écologique"
  );
  classifier.addDocument("utilise des produits biologiques", "écologique");
  classifier.addDocument("construit des maisons écologiques", "écologique");
  classifier.addDocument(
    "réduit les déchets en utilisant des emballages biodégradables",
    "écologique"
  );
  classifier.addDocument(
    "a mis en place un système de tri sélectif",
    "écologique"
  );
  classifier.addDocument(
    "favorise le covoiturage pour réduire les émissions de CO2",
    "écologique"
  );
  classifier.addDocument(
    "utilise des panneaux solaires pour alimenter les bâtiments",
    "écologique"
  );
  classifier.addDocument(
    "déverse ses déchets dans les rivières",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des sachets en plastique pour emballer les produits",
    "non-écologique"
  );
  classifier.addDocument(
    "ne respecte pas les normes environnementales",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des pesticides pour cultiver les plantes",
    "non-écologique"
  );
  classifier.addDocument(
    "a des pratiques de pêche non durables",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des matériaux biodégradables et compostables",
    "écologique"
  );
  classifier.addDocument(
    "utilise de l'énergie éolienne pour produire de l'électricité",
    "écologique"
  );
  classifier.addDocument(
    "met en place un système de tri et de recyclage des déchets",
    "écologique"
  );
  classifier.addDocument(
    "limite son empreinte carbone en utilisant des transports éco-responsables",
    "écologique"
  );
  classifier.addDocument(
    "s'engage à réduire son utilisation d'eau et d'énergie",
    "écologique"
  );
  classifier.addDocument(
    "utilise des produits chimiques nocifs pour l'environnement",
    "non-écologique"
  );
  classifier.addDocument(
    "produit fabriqué à partir de matières premières non renouvelables",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des emballages en plastique non recyclable",
    "non-écologique"
  );
  classifier.addDocument(
    "ne respecte pas les normes environnementales en vigueur",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des pesticides et des herbicides toxiques pour l'environnement",
    "non-écologique"
  );
  classifier.addDocument(
    "ne prend pas en compte les impacts environnementaux de son activité",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise de l'énergie nucléaire pour produire de l'électricité",
    "non-écologique"
  );
  classifier.addDocument(
    "produit des déchets toxiques pour l'environnement",
    "non-écologique"
  );
  classifier.addDocument(
    "ne propose pas de solutions pour limiter son impact environnemental",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des emballages jetables en plastique dans sa boutique",
    "non-écologique"
  );

  classifier.addDocument("utilise matériau recyclé", "écologique");
  classifier.addDocument(
    "utilise énergie solaire produire électricité",
    "écologique"
  );
  classifier.addDocument(
    "produit fabriqué partir plastique recyclable",
    "non-écologique"
  );
  classifier.addDocument(
    "usine pollue environnement déchets toxiques",
    "non-écologique"
  );
  classifier.addDocument(
    "boutique utilise sachets plastique biodégradables",
    "écologique"
  );
  classifier.addDocument(
    "utilise énergie éolienne produire électricité",
    "écologique"
  );
  classifier.addDocument(
    "produit fabriqué partir matériaux naturels",
    "écologique"
  );
  classifier.addDocument(
    "utilise énergie nucléaire produire électricité",
    "non-écologique"
  );
  classifier.addDocument(
    "produit fabriqué partir matières premières non renouvelables",
    "non-écologique"
  );
  classifier.addDocument(
    "entreprise utilise transports publics pour livraison",
    "écologique"
  );
  classifier.addDocument(
    "utilise énergie hydraulique produire électricité",
    "écologique"
  );
  classifier.addDocument(
    "produit fabriqué partir matières premières renouvelables",
    "écologique"
  );
  classifier.addDocument(
    "entreprise utilise camions diesel pour livraison",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise énergie géothermique produire électricité",
    "écologique"
  );
  classifier.addDocument(
    "produit fabriqué partir matières premières localement sourcées",
    "écologique"
  );
  classifier.addDocument("utilise matériau recyclé", "écologique");
  classifier.addDocument(
    "utilise énergie solaire produire électricité",
    "écologique"
  );
  classifier.addDocument(
    "produit fabriqué partir plastique recyclable",
    "non-écologique"
  );
  classifier.addDocument(
    "usine pollue environnement déchets toxiques",
    "non-écologique"
  );
  classifier.addDocument("utilise emballage compostable", "écologique");
  classifier.addDocument(
    "achète matières premières auprès de producteurs locaux",
    "écologique"
  );
  classifier.addDocument(
    "ne produit pas de déchets dangereux pour l'environnement",
    "écologique"
  );
  classifier.addDocument(
    "utilise des pesticides toxiques pour cultiver ses produits",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des énergies fossiles pour produire de l'électricité",
    "non-écologique"
  );
  classifier.addDocument(
    "rejette des déchets toxiques dans les rivières et les océans",
    "non-écologique"
  );
  classifier.addDocument(
    "produit des sacs en plastique jetables",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des produits de nettoyage biodégradables",
    "écologique"
  );
  classifier.addDocument(
    "encourage l'utilisation de transports en commun",
    "écologique"
  );
  classifier.addDocument(
    "réduit les émissions de gaz à effet de serre",
    "écologique"
  );
  classifier.addDocument(
    "pratique le recyclage et le compostage",
    "écologique"
  );
  classifier.addDocument(
    "utilise des sources d'énergie renouvelables",
    "écologique"
  );
  classifier.addDocument(
    "réduit les émissions de gaz à effet de serre",
    "écologique"
  );
  classifier.addDocument(
    "construit des bâtiments à faible consommation d'énergie",
    "écologique"
  );
  classifier.addDocument(
    "encourage l'utilisation du transport en commun",
    "écologique"
  );
  classifier.addDocument("réduit la production de déchets", "écologique");
  classifier.addDocument("recycle les matériaux", "écologique");
  classifier.addDocument(
    "utilise des méthodes de production durables",
    "écologique"
  );
  classifier.addDocument(
    "encourage la consommation locale et biologique",
    "écologique"
  );
  classifier.addDocument("réduit l'impact sur la biodiversité", "écologique");
  classifier.addDocument("utilise des sachets en plastique", "non-écologique");
  classifier.addDocument(
    "encourage la consommation de viande",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des produits chimiques toxiques",
    "non-écologique"
  );
  classifier.addDocument(
    "exploite des ressources naturelles de manière excessive",
    "non-écologique"
  );
  classifier.addDocument("pollue les cours d'eau", "non-écologique");
  classifier.addDocument(
    "ne respecte pas les normes environnementales",
    "non-écologique"
  );
  classifier.addDocument("utilise des emballages biodégradables", "écologique");
  classifier.addDocument("utilise des matériaux compostables", "écologique");
  classifier.addDocument("produit des aliments biologiques", "écologique");
  classifier.addDocument(
    "utilise de l'énergie éolienne pour produire de l'électricité",
    "écologique"
  );
  classifier.addDocument(
    "recycle les déchets de manière efficace",
    "écologique"
  );
  classifier.addDocument(
    "utilise des panneaux solaires pour réduire la consommation d'électricité",
    "écologique"
  );
  classifier.addDocument(
    "fabrique des produits localement pour réduire les émissions de carbone liées au transport",
    "écologique"
  );
  classifier.addDocument(
    "utilise des méthodes de production durables pour minimiser les impacts environnementaux",
    "écologique"
  );
  classifier.addDocument(
    "préserve les écosystèmes naturels et la biodiversité",
    "écologique"
  );
  classifier.addDocument(
    "recherche des solutions innovantes pour réduire l'empreinte carbone",
    "écologique"
  );
  classifier.addDocument(
    "soutient les communautés locales et les initiatives de développement durable",
    "écologique"
  );
  classifier.addDocument(
    "utilise des pratiques agricoles durables pour préserver la qualité des sols et de l'eau",
    "écologique"
  );
  classifier.addDocument(
    "propose des produits équitables pour garantir des conditions de travail justes",
    "écologique"
  );
  classifier.addDocument(
    "encourage le recyclage et l'utilisation de produits durables",
    "écologique"
  );
  classifier.addDocument(
    "utilise des sachets en plastique pour emballer les produits",
    "non-écologique"
  );
  classifier.addDocument(
    "produit fabriqué à partir de matériaux recyclés et biodégradables",
    "écologique"
  );
  classifier.addDocument(
    "conserve l'eau en utilisant un système de collecte de pluie",
    "écologique"
  );
  classifier.addDocument(
    "utilise l'énergie éolienne pour alimenter les opérations",
    "écologique"
  );
  classifier.addDocument(
    "utilise des engrais naturels et biologiques pour cultiver les plantes",
    "écologique"
  );
  classifier.addDocument(
    "fait la promotion de la mobilité douce pour les employés",
    "écologique"
  );
  classifier.addDocument(
    "utilise des emballages compostables pour les produits",
    "écologique"
  );
  classifier.addDocument(
    "développe des technologies propres pour réduire les émissions de CO2",
    "écologique"
  );
  classifier.addDocument(
    "utilise l'énergie géothermique pour chauffer les bâtiments",
    "écologique"
  );
  classifier.addDocument(
    "offre des programmes de recyclage pour les clients",
    "écologique"
  );
  classifier.addDocument(
    "utilise des matériaux non-toxiques dans les produits",
    "écologique"
  );
  classifier.addDocument(
    "ne produit pas de déchets dangereux pour l'environnement",
    "écologique"
  );
  classifier.addDocument(
    "utilise des méthodes durables pour l'extraction de ressources",
    "écologique"
  );
  classifier.addDocument(
    "développe des projets de restauration d'écosystèmes",
    "écologique"
  );
  classifier.addDocument(
    "ne teste pas ses produits sur les animaux",
    "écologique"
  );
  classifier.addDocument(
    "offre des options de transport en commun pour les employés",
    "écologique"
  );
  classifier.addDocument(
    "utilise des panneaux solaires pour alimenter l'ensemble des machines",
    "écologique"
  );
  classifier.addDocument(
    "produit avec des matériaux 100% recyclés et biodégradables",
    "écologique"
  );
  classifier.addDocument(
    "utilise de l'eau de pluie pour arroser les plantes et nettoyer les locaux",
    "écologique"
  );
  classifier.addDocument(
    "réduit la consommation d'énergie grâce à l'utilisation de technologies innovantes",
    "écologique"
  );
  classifier.addDocument(
    "élimine les déchets en utilisant un processus de recyclage efficace",
    "écologique"
  );
  classifier.addDocument(
    "encourage l'utilisation de véhicules électriques pour réduire les émissions de gaz à effet de serre",
    "écologique"
  );
  classifier.addDocument(
    "utilise des matériaux naturels et renouvelables pour produire des biens durables",
    "écologique"
  );
  classifier.addDocument(
    "limite les emballages et privilégie les emballages réutilisables",
    "écologique"
  );
  classifier.addDocument(
    "utilise une énergie propre et renouvelable pour alimenter les machines",
    "écologique"
  );
  classifier.addDocument(
    "s'efforce de réduire l'impact environnemental en optimisant les processus de production",
    "écologique"
  );
  classifier.addDocument(
    "utilise des sachets en plastique non-biodégradables pour l'emballage",
    "non-écologique"
  );
  classifier.addDocument(
    "ne recycle pas les déchets et pollue l'environnement",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des pesticides et des herbicides toxiques pour la production",
    "non-écologique"
  );
  classifier.addDocument(
    "consomme de grandes quantités d'énergie fossile pour alimenter les machines",
    "non-écologique"
  );
  classifier.addDocument(
    "n'utilise pas de matériaux recyclés ou renouvelables pour produire les biens",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des panneaux solaires pour produire de l'électricité",
    "écologique"
  );
  classifier.addDocument(
    "réduit les émissions de gaz à effet de serre",
    "écologique"
  );
  classifier.addDocument(
    "conserve l'eau en utilisant des systèmes de récupération",
    "écologique"
  );
  classifier.addDocument(
    "fabrique des produits à partir de matériaux recyclés",
    "écologique"
  );
  classifier.addDocument(
    "utilise des méthodes de production durables",
    "écologique"
  );
  classifier.addDocument(
    "limite la consommation d'énergie en optimisant l'utilisation des ressources",
    "écologique"
  );
  classifier.addDocument(
    "replante les arbres et les forêts détruits",
    "écologique"
  );
  classifier.addDocument(
    "investit dans des projets de recherche et développement durable",
    "écologique"
  );
  classifier.addDocument(
    "encourage la mobilité douce en mettant en place des pistes cyclables",
    "écologique"
  );
  classifier.addDocument(
    "s'engage à réduire l'empreinte carbone",
    "écologique"
  );
  classifier.addDocument(
    "utilise des sachets en plastique pour emballer les produits",
    "non-écologique"
  );
  classifier.addDocument(
    "n'utilise pas de matériaux recyclés",
    "non-écologique"
  );
  classifier.addDocument(
    "ne dispose pas correctement des déchets toxiques",
    "non-écologique"
  );
  classifier.addDocument(
    "néglige la consommation d'énergie en laissant les lumières allumées",
    "non-écologique"
  );
  classifier.addDocument(
    "ne tient pas compte de l'impact environnemental de ses activités",
    "non-écologique"
  );
  classifier.addDocument("utilise des emballages compostables", "écologique");
  classifier.addDocument(
    "emploie des pratiques agricoles durables",
    "écologique"
  );
  classifier.addDocument(
    "utilise des matériaux naturels et renouvelables",
    "écologique"
  );
  classifier.addDocument("prend en compte l'empreinte carbone", "écologique");
  classifier.addDocument(
    "investit dans les énergies renouvelables",
    "écologique"
  );
  classifier.addDocument("préserve la biodiversité", "écologique");
  classifier.addDocument("utilise des technologies propres", "écologique");
  classifier.addDocument(
    "réduit les déchets et les émissions de gaz à effet de serre",
    "écologique"
  );
  classifier.addDocument("fabrique des produits recyclables", "écologique");
  classifier.addDocument(
    "réduit l'utilisation de substances nocives pour l'environnement",
    "écologique"
  );
  classifier.addDocument(
    "ne tient pas compte de l'impact environnemental de ses actions",
    "non-écologique"
  );
  classifier.addDocument(
    "ne prend pas en compte la gestion des déchets",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des produits chimiques dangereux",
    "non-écologique"
  );
  classifier.addDocument("dégrade l'environnement", "non-écologique");
  classifier.addDocument(
    "contribue au réchauffement climatique",
    "non-écologique"
  );
  classifier.addDocument(
    "ne respecte pas les normes environnementales",
    "non-écologique"
  );
  classifier.addDocument(
    "produit fabriqué à partir de matériaux durables et renouvelables",
    "écologique"
  );
  classifier.addDocument(
    "utilise énergie éolienne pour produire de l'électricité",
    "écologique"
  );
  classifier.addDocument(
    "utilise des matériaux recyclables pour emballer ses produits",
    "écologique"
  );
  classifier.addDocument(
    "utilise de l'eau de pluie pour arroser ses jardins",
    "écologique"
  );
  classifier.addDocument(
    "produit ses propres légumes dans un jardin urbain",
    "écologique"
  );
  classifier.addDocument(
    "ne produit aucun déchet toxique dans son processus de production",
    "écologique"
  );
  classifier.addDocument(
    "utilise des emballages biodégradables pour ses produits",
    "écologique"
  );
  classifier.addDocument(
    "recycle tous les déchets de son entreprise",
    "écologique"
  );
  classifier.addDocument(
    "utilise des panneaux solaires pour produire de l'électricité",
    "écologique"
  );
  classifier.addDocument(
    "réduit sa consommation d'eau en utilisant des technologies innovantes",
    "écologique"
  );
  classifier.addDocument(
    "produit des aliments biologiques et locaux",
    "écologique"
  );
  classifier.addDocument(
    "fabrique des meubles à partir de bois recyclé",
    "écologique"
  );
  classifier.addDocument(
    "utilise des matériaux recyclés pour la construction de ses bâtiments",
    "écologique"
  );
  classifier.addDocument(
    "réduit son empreinte carbone en encourageant le télétravail",
    "écologique"
  );
  classifier.addDocument(
    "ne vend pas de produits en plastique jetable",
    "écologique"
  );
  classifier.addDocument(
    "utilise des sacs en tissu réutilisables pour ses achats",
    "écologique"
  );
  classifier.addDocument(
    "utilise des sachets en papier au lieu de sachets en plastique",
    "non-écologique"
  );
  classifier.addDocument(
    "déverse ses déchets toxiques dans l'océan",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des produits chimiques nocifs pour l'environnement",
    "non-écologique"
  );
  classifier.addDocument(
    "ne prend pas de mesures pour réduire son empreinte carbone",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des panneaux solaires pour produire de l'électricité",
    "écologique"
  );
  classifier.addDocument(
    "utilise des matériaux recyclés pour la construction",
    "écologique"
  );
  classifier.addDocument(
    "utilise une technologie de refroidissement écologique pour réduire les émissions de CO2",
    "écologique"
  );
  classifier.addDocument(
    "pratique l'agriculture biologique pour produire des aliments sains et durables",
    "écologique"
  );
  classifier.addDocument(
    "produit des articles en bambou, une ressource renouvelable",
    "écologique"
  );
  classifier.addDocument(
    "installe des toilettes sèches pour réduire la consommation d'eau",
    "écologique"
  );
  classifier.addDocument(
    "utilise des emballages biodégradables pour réduire les déchets",
    "écologique"
  );
  classifier.addDocument(
    "offre des services de covoiturage pour réduire la pollution",
    "écologique"
  );
  classifier.addDocument(
    "utilise des énergies renouvelables pour alimenter son usine",
    "écologique"
  );
  classifier.addDocument(
    "développe une application mobile pour encourager les comportements écologiques",
    "écologique"
  );
  classifier.addDocument(
    "utilise des sachets en plastique pour emballer ses produits",
    "non-écologique"
  );
  classifier.addDocument(
    "rejette des déchets toxiques dans les cours d'eau",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des produits chimiques nocifs pour la santé et l'environnement",
    "non-écologique"
  );
  classifier.addDocument(
    "défriche des forêts pour exploiter des ressources naturelles",
    "non-écologique"
  );
  classifier.addDocument(
    "ne respecte pas les normes environnementales en vigueur",
    "non-écologique"
  );
  classifier.addDocument(
    "le produit est fabriqué à partir de matériaux naturels et renouvelables",
    "écologique"
  );
  classifier.addDocument(
    "le produit est durable et peut être réutilisé plusieurs fois",
    "écologique"
  );
  classifier.addDocument(
    "l'emballage est entièrement compostable et biodégradable",
    "écologique"
  );
  classifier.addDocument(
    "le produit a une faible empreinte carbone tout au long de son cycle de vie",
    "écologique"
  );
  classifier.addDocument(
    "la production du produit est alimentée par des énergies renouvelables",
    "écologique"
  );
  classifier.addDocument(
    "l'entreprise encourage la mobilité douce en fournissant des vélos à ses employés",
    "écologique"
  );
  classifier.addDocument("le produit est recyclable à 100%", "écologique");
  classifier.addDocument(
    "l'entreprise utilise des pratiques agricoles durables pour cultiver ses ingrédients",
    "écologique"
  );
  classifier.addDocument(
    "l'entreprise utilise des sacs en papier compostables à la place de sacs en plastique",
    "écologique"
  );
  classifier.addDocument(
    "l'entreprise compense ses émissions de carbone en finançant des projets environnementaux",
    "écologique"
  );
  classifier.addDocument(
    "le produit contient des ingrédients naturels et biologiques",
    "écologique"
  );
  classifier.addDocument(
    "l'entreprise encourage la réduction des déchets en offrant des programmes de recyclage",
    "écologique"
  );
  classifier.addDocument(
    "l'entreprise est certifiée ISO 14001 pour ses pratiques environnementales",
    "écologique"
  );
  classifier.addDocument(
    "le produit est fabriqué à partir de matériaux recyclés",
    "écologique"
  );
  classifier.addDocument(
    "l'entreprise est engagée dans la réduction de sa consommation d'énergie",
    "écologique"
  );
  classifier.addDocument(
    "l'entreprise est partenaire d'organisations de protection de l'environnement",
    "écologique"
  );
  classifier.addDocument(
    "la production du produit ne nécessite pas de déforestation",
    "écologique"
  );

  classifier.addDocument(
    "le produit est jetable et contribue à la pollution des déchets",
    "non-écologique"
  );
  classifier.addDocument(
    "le produit contient des produits chimiques nocifs pour l'environnement",
    "non-écologique"
  );
  classifier.addDocument(
    "la production du produit utilise des combustibles fossiles",
    "non-écologique"
  );
  classifier.addDocument(
    "l'entreprise est impliquée dans des scandales environnementaux",
    "non-écologique"
  );
  classifier.addDocument(
    "le produit est jeté après une utilisation unique",
    "non-écologique"
  );
  classifier.addDocument(
    "l'emballage du produit est excessif et non recyclable",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des panneaux solaires pour chauffer l'eau",
    "écologique"
  );
  classifier.addDocument(
    "utilise des batteries rechargeables pour alimenter le matériel",
    "écologique"
  );
  classifier.addDocument(
    "réduit les déchets en utilisant des emballages biodégradables",
    "écologique"
  );
  classifier.addDocument(
    "utilise de l'énergie éolienne pour produire de l'électricité",
    "écologique"
  );
  classifier.addDocument(
    "fabrique des produits à partir de matériaux recyclés",
    "écologique"
  );
  classifier.addDocument(
    "s'approvisionne en matières premières auprès de fournisseurs certifiés écologiques",
    "écologique"
  );
  classifier.addDocument(
    "utilise des méthodes agricoles durables pour cultiver les ingrédients",
    "écologique"
  );
  classifier.addDocument(
    "ne gaspille pas d'eau en utilisant des systèmes d'irrigation efficaces",
    "écologique"
  );
  classifier.addDocument(
    "produit en masse des articles à usage unique en plastique",
    "non-écologique"
  );
  classifier.addDocument(
    "déverse des produits chimiques toxiques dans les cours d'eau",
    "non-écologique"
  );
  classifier.addDocument(
    "ne se soucie pas de l'impact environnemental de ses activités",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des sachets en plastique pour emballer ses produits",
    "non-écologique"
  );
  classifier.addDocument(
    "soutient l'exploitation forestière illégale pour obtenir du bois bon marché",
    "non-écologique"
  );
  classifier.addDocument(
    "ne recycle pas ses déchets et les envoie à la décharge",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des pesticides dangereux pour les cultures",
    "non-écologique"
  );
  classifier.addDocument("produit des aliments bio", "écologique");
  classifier.addDocument("recycle les déchets de l'entreprise", "écologique");
  classifier.addDocument(
    "utilise des matériaux recyclables pour les emballages",
    "écologique"
  );
  classifier.addDocument("utilise des transports écologiques", "écologique");
  classifier.addDocument(
    "utilise des emballages en papier ou en carton",
    "écologique"
  );
  classifier.addDocument(
    "distribue des produits bio dans des contenants en verre",
    "écologique"
  );
  classifier.addDocument(
    "utilise des sacs en toile réutilisables",
    "écologique"
  );
  classifier.addDocument(
    "utilise des sacs en plastique non-biodégradables",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise papier recyclé pour ses emballages",
    "écologique"
  );
  classifier.addDocument(
    "produit des panneaux solaires pour les maisons",
    "écologique"
  );
  classifier.addDocument("développe des voitures électriques", "écologique");
  classifier.addDocument(
    "construit des maisons avec des matériaux naturels et durables",
    "écologique"
  );
  classifier.addDocument(
    "utilise des sources d'énergie renouvelable",
    "écologique"
  );
  classifier.addDocument(
    "recycle tous les déchets produits dans son usine",
    "écologique"
  );
  classifier.addDocument("ne produit aucun déchet toxique", "écologique");
  classifier.addDocument("vend des produits biologiques", "écologique");
  classifier.addDocument(
    "propose des solutions de transport en commun",
    "écologique"
  );
  classifier.addDocument(
    "réduit son empreinte carbone grâce à des pratiques durables",
    "écologique"
  );
  classifier.addDocument(
    "utilise des sachets en plastique pour ses produits",
    "non-écologique"
  );
  classifier.addDocument(
    "dépend de l'énergie fossile pour alimenter ses machines",
    "non-écologique"
  );
  classifier.addDocument(
    "produit des objets en plastique jetables",
    "non-écologique"
  );
  classifier.addDocument("ne recycle aucun de ses déchets", "non-écologique");
  classifier.addDocument(
    "utilise des pesticides pour ses cultures",
    "non-écologique"
  );
  classifier.addDocument(
    "ne prend aucune mesure pour réduire son empreinte carbone",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des emballages biodégradables pour les produits",
    "écologique"
  );
  classifier.addDocument(
    "réduit l'impact environnemental en utilisant des méthodes de production économes en énergie",
    "écologique"
  );
  classifier.addDocument(
    "utilise des matériaux renouvelables dans la fabrication des produits",
    "écologique"
  );
  classifier.addDocument(
    "réduit les émissions de CO2 en utilisant des moyens de transport moins polluants",
    "écologique"
  );
  classifier.addDocument(
    "réduit la consommation d'eau dans les processus de production",
    "écologique"
  );
  classifier.addDocument(
    "utilise des énergies renouvelables pour alimenter ses usines",
    "écologique"
  );
  classifier.addDocument(
    "met en place des programmes de recyclage pour les déchets de production",
    "écologique"
  );
  classifier.addDocument(
    "réduit l'utilisation de plastique non recyclable",
    "écologique"
  );
  classifier.addDocument(
    "utilise des technologies innovantes pour réduire la pollution de l'air",
    "écologique"
  );
  classifier.addDocument(
    "encourage l'agriculture biologique pour réduire l'utilisation de pesticides",
    "écologique"
  );
  classifier.addDocument(
    "utilise des techniques de compostage pour réduire les déchets alimentaires",
    "écologique"
  );
  classifier.addDocument(
    "réduit l'utilisation de papier en favorisant le numérique",
    "écologique"
  );
  classifier.addDocument(
    "utilise des sources d'énergie alternatives pour réduire la dépendance aux combustibles fossiles",
    "écologique"
  );
  classifier.addDocument(
    "met en place des projets de reforestation pour compenser les émissions de CO2",
    "écologique"
  );
  classifier.addDocument(
    "utilise des éclairages LED pour réduire la consommation d'énergie",
    "écologique"
  );

  classifier.addDocument(
    "ne fait pas d'efforts pour réduire son impact environnemental",
    "non-écologique"
  );
  classifier.addDocument(
    "ne prend pas de mesures pour réduire la pollution de l'air et de l'eau",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des produits chimiques toxiques dans ses processus de production",
    "non-écologique"
  );
  classifier.addDocument(
    "ne respecte pas les normes environnementales en vigueur",
    "non-écologique"
  );
  classifier.addDocument(
    "ne fait pas de recyclage et gaspille les ressources naturelles",
    "non-écologique"
  );
  classifier.addDocument(
    "produit des émissions de CO2 importantes sans chercher à les réduire",
    "non-écologique"
  );
  classifier.addDocument(
    "ne fait rien pour protéger la biodiversité",
    "non-écologique"
  );
  classifier.addDocument(
    "ne cherche pas à réduire l'utilisation de plastique non recyclable",
    "non-écologique"
  );
  classifier.addDocument(
    "ne prend pas de mesures pour réduire la consommation d'énergie",
    "non-écologique"
  );
  classifier.addDocument(
    "Utilise des matériaux biodégradables dans la production",
    "écologique"
  );
  classifier.addDocument(
    "Favorise la production locale pour réduire les émissions de carbone liées au transport",
    "écologique"
  );
  classifier.addDocument(
    "Utilise des sources d'énergie renouvelables pour alimenter l'usine",
    "écologique"
  );
  classifier.addDocument(
    "Soutient des projets de reforestation pour compenser les émissions de carbone",
    "écologique"
  );
  classifier.addDocument(
    "Utilise des technologies innovantes pour réduire la consommation d'eau",
    "écologique"
  );
  classifier.addDocument(
    "Bannit l'utilisation de plastiques à usage unique dans les locaux de l'entreprise",
    "écologique"
  );
  classifier.addDocument(
    "Produit fabriqué à partir de matériaux synthétiques non-biodégradables",
    "non-écologique"
  );
  classifier.addDocument(
    "Usine utilise des combustibles fossiles pour alimenter les machines",
    "non-écologique"
  );
  classifier.addDocument(
    "Utilise des produits chimiques nocifs pour l'environnement",
    "non-écologique"
  );
  classifier.addDocument(
    "Ne dispose pas correctement des déchets industriels, ce qui nuit à l'environnement",
    "non-écologique"
  );
  classifier.addDocument(
    "S'approvisionne en matières premières auprès de fournisseurs ayant une faible considération environnementale",
    "non-écologique"
  );
  classifier.addDocument(
    "Utilise des emballages excessifs pour ses produits",
    "non-écologique"
  );
  classifier.addDocument(
    "Produit utilisant des ressources naturelles en voie d'épuisement",
    "non-écologique"
  );
  classifier.addDocument(
    "Boutique vendant des articles en plastique à usage unique",
    "non-écologique"
  );
  classifier.addDocument(
    "Magasin distribuant des sachets plastiques aux clients",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des panneaux solaires pour produire de l'électricité",
    "écologique"
  );
  classifier.addDocument(
    "utilise des matériaux biodégradables dans la fabrication",
    "écologique"
  );
  classifier.addDocument(
    "s'engage à réduire ses émissions de carbone de 50 % d'ici 2030",
    "écologique"
  );
  classifier.addDocument(
    "fabrique ses produits à partir de déchets industriels non recyclables",
    "non-écologique"
  );
  classifier.addDocument(
    "produit des articles à usage unique en plastique",
    "non-écologique"
  );
  classifier.addDocument(
    "a été poursuivi pour des violations environnementales",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des pesticides toxiques pour cultiver ses produits",
    "non-écologique"
  );
  classifier.addDocument(
    "offre des options de livraison express qui augmentent les émissions de carbone",
    "non-écologique"
  );
  classifier.addDocument(
    "propose des articles en cuir animal",
    "non-écologique"
  );
  classifier.addDocument(
    "achète des produits en vrac pour réduire les emballages",
    "écologique"
  );
  classifier.addDocument(
    "utilise des véhicules électriques pour la livraison",
    "écologique"
  );
  classifier.addDocument(
    "fabrique des produits en utilisant uniquement de l'énergie renouvelable",
    "écologique"
  );
  classifier.addDocument(
    "crée des emballages réutilisables pour réduire les déchets",
    "écologique"
  );
  classifier.addDocument(
    "organise des événements éco-responsables",
    "écologique"
  );
  classifier.addDocument(
    "encourage ses clients à adopter des modes de vie durables",
    "écologique"
  );
  classifier.addDocument(
    "le projet utilise des panneaux solaires pour produire de l'énergie verte",
    "écologique"
  );
  classifier.addDocument(
    "le projet prévoit la plantation de 10 000 arbres pour restaurer la biodiversité",
    "écologique"
  );
  classifier.addDocument(
    "le projet vise à éliminer les émissions de gaz à effet de serre d'ici 2050",
    "écologique"
  );
  classifier.addDocument(
    "le projet est financé par une entreprise pétrolière",
    "non-écologique"
  );
  classifier.addDocument(
    "le projet nécessite l'extraction de métaux rares, contribuant ainsi à la dégradation de l'environnement",
    "non-écologique"
  );
  classifier.addDocument(
    "le projet implique la construction d'une centrale nucléaire",
    "non-écologique"
  );
  classifier.addDocument(
    "la production de ce projet nécessite l'utilisation de produits chimiques toxiques",
    "non-écologique"
  );
  classifier.addDocument(
    "le projet implique la déforestation de zones protégées",
    "non-écologique"
  );
  classifier.addDocument(
    "le projet consiste en la fabrication de sacs en plastique à usage unique",
    "non-écologique"
  );
  classifier.addDocument(
    "le projet prévoit la construction d'un aéroport international",
    "non-écologique"
  );
  classifier.addDocument(
    "le projet consiste en la mise en place d'un système de tri sélectif des déchets",
    "écologique"
  );
  classifier.addDocument(
    "le projet prévoit la construction de bâtiments économes en énergie",
    "écologique"
  );
  classifier.addDocument(
    "le projet vise à réduire l'empreinte carbone de l'entreprise de 50%",
    "écologique"
  );
  classifier.addDocument(
    "le projet consiste en la rénovation énergétique de bâtiments publics",
    "écologique"
  );
  classifier.addDocument(
    "utilise des emballages biodégradables pour ses produits",
    "écologique"
  );
  classifier.addDocument(
    "a adopté des pratiques de recyclage pour minimiser les déchets",
    "écologique"
  );
  classifier.addDocument(
    "réduit la consommation d'énergie en utilisant des ampoules LED",
    "écologique"
  );
  classifier.addDocument(
    "produit des aliments bio sans pesticides ni OGM",
    "écologique"
  );
  classifier.addDocument(
    "construit des bâtiments à haute efficacité énergétique",
    "écologique"
  );
  classifier.addDocument(
    "utilise des sources d'énergie renouvelable pour alimenter ses installations",
    "écologique"
  );
  classifier.addDocument(
    "a mis en place un système de gestion des déchets pour minimiser son impact environnemental",
    "écologique"
  );
  classifier.addDocument(
    "offre des services de transport en commun pour encourager les modes de déplacement durables",
    "écologique"
  );
  classifier.addDocument(
    "utilise des sachets en plastique non-biodégradables pour emballer ses produits",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des énergies fossiles pour alimenter ses installations",
    "non-écologique"
  );
  classifier.addDocument(
    "ne fait aucun effort pour réduire ses déchets ou minimiser son impact environnemental",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des pesticides et des OGM pour produire ses aliments",
    "non-écologique"
  );
  classifier.addDocument(
    "construit des bâtiments qui ne respectent pas les normes énergétiques",
    "non-écologique"
  );
  classifier.addDocument(
    "ne fait aucun effort pour réduire sa consommation d'énergie ou encourager les modes de déplacement durables",
    "non-écologique"
  );
  classifier.addDocument("produit compostable biodégradable", "écologique");
  classifier.addDocument("réutilisable plusieurs fois", "écologique");
  classifier.addDocument("utilise des matériaux durables", "écologique");
  classifier.addDocument(
    "projet utilise des énergies renouvelables",
    "écologique"
  );
  classifier.addDocument(
    "projets contribue à la préservation de la biodiversité",
    "écologique"
  );
  classifier.addDocument("utilise du papier recyclé", "écologique");
  classifier.addDocument("promouvoir l'agriculture biologique", "écologique");
  classifier.addDocument(
    "mise en place d'un système de tri des déchets",
    "écologique"
  );
  classifier.addDocument("fabrication éco-responsable", "écologique");
  classifier.addDocument("utilise de l'eau de pluie", "écologique");
  classifier.addDocument(
    "produit alimentaire issu de l'agriculture conventionnelle",
    "non-écologique"
  );
  classifier.addDocument(
    "projets de construction qui détruisent des habitats naturels",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des pesticides toxiques pour l'environnement",
    "non-écologique"
  );
  classifier.addDocument(
    "ne respecte pas les normes environnementales en vigueur",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des sachets en plastique jetables",
    "non-écologique"
  );
  classifier.addDocument(
    "rejets de déchets toxiques dans les rivières",
    "non-écologique"
  );
  classifier.addDocument(
    "Le produit est conçu pour être utilisé plusieurs fois et éviter le gaspillage.",
    "écologique"
  );
  classifier.addDocument(
    "L'emballage est fabriqué à partir de matériaux recyclés.",
    "écologique"
  );
  classifier.addDocument(
    "Le produit est fabriqué localement pour réduire les émissions de gaz à effet de serre liées au transport.",
    "écologique"
  );
  classifier.addDocument(
    "La production utilise de l'énergie renouvelable pour minimiser l'impact sur l'environnement.",
    "écologique"
  );
  classifier.addDocument(
    "Le produit est certifié biologique et ne contient aucun produit chimique nocif.",
    "écologique"
  );
  classifier.addDocument(
    "L'emballage est biodégradable et compostable.",
    "écologique"
  );
  classifier.addDocument(
    "Le produit est conçu pour être recyclé en fin de vie.",
    "écologique"
  );
  classifier.addDocument(
    "L'entreprise utilise des pratiques durables pour réduire son impact environnemental.",
    "écologique"
  );
  classifier.addDocument(
    "Le produit est fabriqué à partir de matières premières renouvelables.",
    "écologique"
  );
  classifier.addDocument(
    "Le produit est conçu pour réduire la consommation d'énergie.",
    "écologique"
  );
  classifier.addDocument(
    "La production est certifiée ISO 14001 pour garantir une gestion environnementale responsable.",
    "écologique"
  );
  classifier.addDocument(
    "Le produit est conçu pour être démonté et réparé facilement pour prolonger sa durée de vie.",
    "écologique"
  );
  classifier.addDocument(
    "Le produit est conçu pour être réutilisé à d'autres fins.",
    "écologique"
  );
  classifier.addDocument(
    "Le produit est livré sans emballage superflu pour réduire les déchets.",
    "écologique"
  );
  classifier.addDocument(
    "L'entreprise encourage les clients à recycler le produit en fin de vie.",
    "écologique"
  );

  classifier.addDocument(
    "Le produit est emballé dans du plastique non recyclable.",
    "non-écologique"
  );
  classifier.addDocument(
    "Le produit contient des produits chimiques nocifs pour l'environnement.",
    "non-écologique"
  );
  classifier.addDocument(
    "La production génère des déchets dangereux pour l'environnement.",
    "non-écologique"
  );
  classifier.addDocument(
    "Le produit est conçu pour être jetable après une seule utilisation.",
    "non-écologique"
  );
  classifier.addDocument(
    "Le produit est fabriqué dans des conditions sociales ou environnementales inacceptables.",
    "non-écologique"
  );
  classifier.addDocument(
    "Le produit nécessite une grande quantité d'énergie pour être utilisé.",
    "non-écologique"
  );
  classifier.addDocument(
    "Le produit est fabriqué à partir de matières premières non renouvelables.",
    "non-écologique"
  );
  classifier.addDocument(
    "La production utilise des énergies fossiles non renouvelables.",
    "non-écologique"
  );
  classifier.addDocument(
    "fabrique des produits biodégradables à base de matériaux organiques",
    "écologique"
  );

  classifier.addDocument(
    "utilise une technologie de pointe pour réduire les émissions de carbone",
    "écologique"
  );

  classifier.addDocument(
    "produit de l'énergie propre à partir de sources renouvelables",
    "écologique"
  );

  classifier.addDocument(
    "utilise des matériaux durables et recyclables dans la production",
    "écologique"
  );

  classifier.addDocument(
    "a mis en place des pratiques éco-responsables pour la gestion des déchets",
    "écologique"
  );

  classifier.addDocument(
    "offre des produits et services à faible impact environnemental",
    "écologique"
  );

  classifier.addDocument(
    "utilise des techniques agricoles durables pour préserver les sols et les écosystèmes",
    "écologique"
  );

  classifier.addDocument(
    "favorise l'utilisation des transports en commun et de l'auto-partage pour réduire les émissions de gaz à effet de serre",
    "écologique"
  );

  classifier.addDocument(
    "vend des produits en vrac pour réduire les déchets d'emballage",
    "écologique"
  );

  classifier.addDocument(
    "utilise des pratiques de pêche durables pour préserver les populations de poissons",
    "écologique"
  );

  classifier.addDocument(
    "fabrique des produits à haute efficacité énergétique pour réduire la consommation d'énergie",
    "écologique"
  );

  classifier.addDocument(
    "utilise des processus de production à faible consommation d'eau pour réduire la pression sur les ressources en eau",
    "écologique"
  );

  classifier.addDocument(
    "a mis en place des mesures pour réduire la consommation d'énergie et d'eau dans ses bâtiments",
    "écologique"
  );

  classifier.addDocument(
    "produit des aliments biologiques et équitables pour promouvoir l'agriculture locale et durable",
    "écologique"
  );

  classifier.addDocument(
    "vend des produits à base de plantes pour encourager un régime alimentaire à faible impact environnemental",
    "écologique"
  );

  classifier.addDocument(
    "utilise des sachets en plastique pour emballer ses produits",
    "non-écologique"
  );
  classifier.addDocument(
    "le projet utilise des panneaux solaires pour produire de l'énergie renouvelable",
    "écologique"
  );
  classifier.addDocument(
    "le projet réutilise les déchets pour créer de nouveaux produits",
    "écologique"
  );
  classifier.addDocument(
    "le projet utilise des technologies de pointe pour réduire les émissions de gaz à effet de serre",
    "écologique"
  );
  classifier.addDocument(
    "le projet implique la plantation d'arbres et la restauration des écosystèmes",
    "écologique"
  );
  classifier.addDocument(
    "le projet utilise des emballages biodégradables et compostables pour réduire les déchets",
    "écologique"
  );
  classifier.addDocument(
    "le projet implique le recyclage et la récupération de matériaux",
    "écologique"
  );
  classifier.addDocument(
    "le projet utilise des sources d'énergie renouvelable pour réduire les émissions de gaz à effet de serre",
    "écologique"
  );
  classifier.addDocument(
    "le projet est conçu pour minimiser les déchets et réduire l'empreinte environnementale",
    "écologique"
  );
  classifier.addDocument(
    "le projet encourage les modes de transport durables comme le vélo et les transports en commun",
    "écologique"
  );
  classifier.addDocument(
    "le projet favorise l'agriculture biologique et locale pour réduire l'utilisation de pesticides et les émissions de gaz à effet de serre",
    "écologique"
  );
  classifier.addDocument(
    "le projet utilise des matières premières durables et éco-responsables",
    "écologique"
  );
  classifier.addDocument(
    "le projet utilise des systèmes de filtration pour réduire la pollution de l'air et de l'eau",
    "écologique"
  );
  classifier.addDocument(
    "le projet implique l'utilisation de pratiques agricoles durables pour minimiser les impacts sur l'environnement",
    "écologique"
  );
  classifier.addDocument(
    "le projet utilise des technologies avancées pour réduire la consommation d'énergie",
    "écologique"
  );
  classifier.addDocument(
    "le projet encourage la réduction des déchets alimentaires et le compostage",
    "écologique"
  );

  classifier.addDocument(
    "le projet utilise des emballages en plastique non-recyclables",
    "non-écologique"
  );
  classifier.addDocument(
    "le projet utilise des matières premières non-renouvelables",
    "non-écologique"
  );
  classifier.addDocument(
    "le projet utilise des systèmes de chauffage et de climatisation inefficaces",
    "non-écologique"
  );
  classifier.addDocument(
    "le projet implique la production de déchets toxiques et dangereux",
    "non-écologique"
  );
  classifier.addDocument(
    "le projet encourage l'utilisation de modes de transport polluants comme la voiture individuelle",
    "non-écologique"
  );
  classifier.addDocument(
    "le projet utilise des pesticides et des herbicides dangereux pour l'environnement",
    "non-écologique"
  );
  classifier.addDocument(
    "le projet implique la déforestation et la destruction des habitats naturels",
    "non-écologique"
  );
  classifier.addDocument(
    "Utilise des matériaux biodégradables pour la production",
    "écologique"
  );
  classifier.addDocument(
    "N'utilise pas de produits chimiques dans le processus de production",
    "écologique"
  );
  classifier.addDocument(
    "Offre une option de livraison neutre en carbone pour les clients",
    "écologique"
  );
  classifier.addDocument(
    "Dispose de ses déchets de manière responsable et respectueuse de l'environnement",
    "écologique"
  );
  classifier.addDocument(
    "Utilise une énergie renouvelable pour alimenter son usine",
    "écologique"
  );
  classifier.addDocument(
    "Fabrique des produits qui sont durables et réutilisables",
    "écologique"
  );
  classifier.addDocument(
    "A une politique de durabilité globale pour réduire son impact environnemental",
    "écologique"
  );
  classifier.addDocument(
    "Utilise des processus de fabrication à faible émission de carbone",
    "écologique"
  );
  classifier.addDocument(
    "A un programme de recyclage pour ses produits",
    "écologique"
  );
  classifier.addDocument(
    "Produit des aliments biologiques sans OGM et sans pesticides",
    "écologique"
  );
  classifier.addDocument(
    "Offre des remises pour les clients qui apportent leurs propres sacs ou récipients",
    "écologique"
  );
  classifier.addDocument(
    "Fabrique des produits à partir de matériaux recyclés",
    "écologique"
  );
  classifier.addDocument(
    "Encourage la plantation d'arbres pour compenser les émissions de carbone",
    "écologique"
  );
  classifier.addDocument(
    "Favorise l'agriculture locale pour réduire l'empreinte carbone",
    "écologique"
  );
  classifier.addDocument(
    "Utilise des emballages réutilisables pour ses produits",
    "écologique"
  );

  classifier.addDocument(
    "Utilise des emballages en plastique non recyclable pour ses produits",
    "non-écologique"
  );
  classifier.addDocument(
    "Produit des aliments transformés riches en graisses et en sucre",
    "non-écologique"
  );
  classifier.addDocument(
    "Fabrique des produits jetables qui créent des déchets excessifs",
    "non-écologique"
  );
  classifier.addDocument(
    "Utilise des processus de fabrication qui polluent l'eau ou l'air",
    "non-écologique"
  );
  classifier.addDocument(
    "N'a pas de politique de durabilité claire et visible",
    "non-écologique"
  );
  classifier.addDocument(
    "Offre une livraison rapide qui nécessite l'utilisation de méthodes de transport à haute émission de carbone",
    "non-écologique"
  );
  classifier.addDocument(
    "Fabrique des produits qui sont fragiles et ont une durée de vie limitée",
    "non-écologique"
  );
  classifier.addDocument(
    "Produit des aliments issus de l'agriculture intensive",
    "non-écologique"
  );
  classifier.addDocument(
    "A des pratiques d'entreprise qui nuisent à l'environnement",
    "non-écologique"
  );
  classifier.addDocument(
    "utilise des panneaux solaires pour produire de l'énergie",
    "écologique"
  );
  classifier.addDocument(
    "fabrique des produits à partir de matériaux durables",
    "écologique"
  );
  classifier.addDocument(
    "propose des solutions de transport en commun pour réduire les émissions de gaz à effet de serre",
    "écologique"
  );
  classifier.addDocument(
    "encourage l'adoption de pratiques durables auprès de sa clientèle",
    "écologique"
  );
  classifier.addDocument(
    "utilise des produits chimiques toxiques pour la production",
    "non-écologique"
  );
  classifier.addDocument(
    "ne dispose d'aucune mesure de recyclage",
    "non-écologique"
  );
  classifier.addDocument(
    "déverse ses déchets dans l'environnement",
    "non-écologique"
  );
  classifier.addDocument(
    "n'utilise pas d'énergies renouvelables",
    "non-écologique"
  );
  classifier.addDocument(
    "fabrique des produits jetables à usage unique",
    "non-écologique"
  );
  classifier.addDocument(
    "commercialise des produits testés sur les animaux",
    "non-écologique"
  );
  classifier.addDocument(
    "encourage une surconsommation de ses produits",
    "non-écologique"
  );
  classifier.addDocument(
    "distribue des sacs en plastique à ses clients",
    "non-écologique"
  );
  classifier.addDocument(
    "n'utilise pas de matières premières recyclées",
    "non-écologique"
  );
  classifier.addDocument("a une empreinte carbone élevée", "non-écologique");
  classifier.addDocument(
    "utilise des techniques agricoles polluantes",
    "non-écologique"
  );
  classifier.addDocument(
    "Le projet implique la plantation d'arbres pour réduire l'empreinte carbone",
    "écologique"
  );
  classifier.addDocument(
    "Les matériaux utilisés pour le projet sont tous recyclés",
    "écologique"
  );
  classifier.addDocument(
    "Le projet permet d'économiser de l'énergie en utilisant des systèmes d'éclairage intelligents",
    "écologique"
  );
  classifier.addDocument(
    "Le projet utilise des sources d'énergie renouvelable pour fonctionner",
    "écologique"
  );
  classifier.addDocument(
    "Le projet utilise des sachets biodégradables pour ses produits",
    "écologique"
  );
  classifier.addDocument(
    "La production de ce projet génère des déchets qui ne sont pas recyclables",
    "non-écologique"
  );
  classifier.addDocument(
    "Le projet implique l'utilisation de plastique non-recyclable",
    "non-écologique"
  );
  classifier.addDocument(
    "Le projet implique l'abattage d'arbres pour sa réalisation",
    "non-écologique"
  );
  classifier.addDocument(
    "Le projet utilise des sources d'énergie fossile pour fonctionner",
    "non-écologique"
  );
  classifier.addDocument(
    "Le projet génère une importante quantité de gaz à effet de serre",
    "non-écologique"
  );
  classifier.addDocument(
    "Le projet implique l'utilisation de pesticides pour sa réalisation",
    "non-écologique"
  );
  classifier.addDocument(
    "La production de ce projet génère des déchets toxiques pour l'environnement",
    "non-écologique"
  );
  classifier.addDocument(
    "Le projet implique la production d'un grand nombre d'objets jetables",
    "non-écologique"
  );
  classifier.addDocument(
    "Le projet implique l'utilisation de produits chimiques dangereux pour la santé",
    "non-écologique"
  );
  classifier.addDocument(
    "Le projet a une forte empreinte carbone et contribue au réchauffement climatique",
    "non-écologique"
  );
  classifier.addDocument(
    "Utilise une méthode innovante pour recycler les déchets électroniques",
    "écologique"
  );

  classifier.addDocument(
    "Réduit l'empreinte carbone en utilisant des sources d'énergie renouvelables",
    "écologique"
  );

  classifier.addDocument(
    "Produit des emballages biodégradables et compostables",
    "écologique"
  );

  classifier.addDocument(
    "Utilise des matériaux recyclables et respectueux de l'environnement",
    "écologique"
  );

  classifier.addDocument(
    "Utilise des techniques de production durables pour minimiser les déchets",
    "écologique"
  );

  classifier.addDocument(
    "Fabrique des produits éco-responsables pour une consommation plus responsable",
    "écologique"
  );

  classifier.addDocument(
    "Offre des alternatives sans plastique pour remplacer les produits jetables",
    "écologique"
  );

  classifier.addDocument(
    "Met en place des initiatives de reforestation pour compenser les émissions de CO2",
    "écologique"
  );

  classifier.addDocument(
    "Ne respecte pas les normes environnementales en vigueur et pollue l'air et l'eau",
    "non-écologique"
  );

  classifier.addDocument(
    "Déverse illégalement des déchets dangereux dans des zones non réglementées",
    "non-écologique"
  );

  classifier.addDocument(
    "Utilise des substances chimiques toxiques dans son processus de production",
    "non-écologique"
  );

  classifier.addDocument(
    "Détruit des habitats naturels pour exploiter des ressources minières",
    "non-écologique"
  );

  classifier.addDocument(
    "Encourage une culture de la surconsommation et du gaspillage alimentaire",
    "non-écologique"
  );

  classifier.addDocument(
    "Produit des sacs en plastique à usage unique qui polluent l'environnement",
    "non-écologique"
  );

  classifier.addDocument(
    "Favorise l'utilisation de véhicules à essence et ne propose pas d'alternatives écologiques",
    "non-écologique"
  );

  classifier.train();

  // Analyser la description du projet avec le modèle NLP
  const result = classifier.classify(preprocessedDesc);
  console.log(result);

  // Retourner true si le projet est considéré comme écologique et éco-friendly, false sinon
  return result === "écologique";
}
module.exports = isProjectEcological;
