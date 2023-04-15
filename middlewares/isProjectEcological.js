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
  classifier.train();

  // Analyser la description du projet avec le modèle NLP
  const result = classifier.classify(preprocessedDesc);
  console.log(result);

  // Retourner true si le projet est considéré comme écologique et éco-friendly, false sinon
  return result === "écologique";
}
module.exports = isProjectEcological;
