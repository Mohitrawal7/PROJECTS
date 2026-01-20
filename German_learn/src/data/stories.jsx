const stories = [
  {
    id: "1",
    title: "Henry Huhnchen",
    subtitle: "HENRY CHICKEN (CHICKEN LITTLE)",
    content:"In our updated version of /\"Chicken Little\"/, Henry Hühnchen reads a scary story on the internet. It says /\"THE SKY IS FALLING!\"/ Fun facts: 1) This story is written in the present tense, 2) All the animal genders correspond with their German noun gender. Yay! ",
    parts: [
      {
       german: "Lasst mich euch die Geschichte von Henry Hühnchen erzählen. Henry Hühnchen lebt in einem ganz normalen kleinen Hühnerhaus in einem ganz normalen Dorf.",
       english: "Let me tell you the story of Henry Chicken. Henry Chicken lives in a normal little chicken house in a normal village."
      },
      {
       german: "Er ist weder groß noch klein. Er ist weder dick noch dünn. Er ist weder schlau noch dumm. Henry Hühnchen ist ein ganz normales Huhn.",
       english: "He is neither tall nor short. He is neither fat nor thin. He is neither smart nor stupid. Henry is a completely normal chicken."
      },
      {
       german: "An einem ganz normalen Morgen isst Henry Hühnchen in der Küche sein Frühstück. Er mag Toast mit Butter und Kaffee mit Sahne.",
       english: "On a completely normal morning, Henry Chicken has his breakfast in the kitchen. He likes toast with butter and coffee with cream."
      },
      {
       german: "Er liest die Nachrichten im Internet. Dort sieht er eine furchtbare Nachricht mit einer furchtbaren Überschrift. Sie lautet: „Der Himmel stürzt ein!“",
       english: "He reads the news on the Internet. There he sees a terrible message with a terrible headline. It reads: \"The sky is falling!\""
      },
      {
       german: "Henry hat so viel Angst, dass er seinen Toast in den Kaffee fallen lässt. Platsch! „Der Himmel stürzt ein! DER HIMMEL STÜRZT EIN!”, ruft Henry aus. „Ich muss alle warnen!”",
       english: "Henry is so scared he drops his toast into the coffee. Splash! \"The sky is falling! THE SKY IS FALLING!\" shouts Henry. \"I have to warn everyone!\""
      },  
      // {
      //  german: "„Der Himmel stürzt ein! DER HIMMEL STÜRZT EIN!”, ruft Henry aus. „Ich muss alle warnen!”",
      //  english: "\"The sky is falling! THE SKY IS FALLING!\" shouts Henry. \"I have to warn everyone!\""
      // },
      {
       german: "Als erstes schickt er eine E-Mail an seine tausend engsten Freunde. Dann rennt er die Straße hinunter, um alle anderen zu warnen.",
       english: "First, he sends an e-mail to his thousand closest friends. Then he runs down the street to warn everyone else."
      },{

       german: "Die erste Person, die er auf der Straße trifft, ist Hanni Henne. Sie kommt aus dem Supermarkt.",
       english: "The first person he meets on the street is Hanni Hen. She is coming from the supermarket."

      },
      {
       german: "„Guten morgen Henry Hühnchen!”, sagt Hanni Henne. „Wohin gehst du? Warum schaust du so ängstlich?”   „Der Himmel stürzt ein! Der Himmel stürzt ein!”, sagt Henry Hühnchen.",    
       english: "\"Good morning Henry Chicken!\" Says Hanni Hen. \"Where are you going? Why are you looking so scared? \"The sky is falling! The sky is falling!\" says Henry Chicken."
      },
      // {
      //  german: "",
      //  english: "\"The sky is falling! The sky is falling!\" says Henry Chicken."
      // },
      {
       german: "„Echt? Woher weißt du das?”, fragt Hanni Henne. „Ich habe es im Internet gesehen!”, sagt Henry Hühnchen.„Heiliger Bimbam! Dann muss es ja stimmen!”, sagt Hanni. „Los, gehen wir!”",
       english: "\"Really? How do you know that?\" asks Hanni Hen. \"I've seen it on the internet!\" says Henry Chicken. \"Holy cow! Then it must be true!\" says Hanni Hen. \"Let's go!\""
      },
      {
       german: "Also rennen Henry Hühnchen und Hanni Henne zusammen die Straße hinunter zum Teich.",
       english: "So Henry Hühnchen and Hanni Henne run together down the street to the pond." 
      },
      {

       german: "Als sie am Teich ankommen, treffen sie Erna Ente. Sie badet gerade.",   
        english: "When they arrive at the pond, they meet Erna Duck. She is bathing."   
      },
      {
       german: "„Hallo, ihr zwei!”, sagt Erna Ente. „Wo geht ihr hin? Warum schaut ihr so ängstlich?”",
       english: "\"Hello, you two!\" Says Erna Duck. \"Where are you going? Why are you looking so scared?\"",
       },
       {
       german: "„Der Himmel stürzt ein! Der Himmel stürzt ein!”, rufen Henry Hühnchen und Hanni Henne im Chor.",
       english: "\"The sky is falling! The sky is falling!\" Henry Chicken and Hanni Hen shout in unison."  
      },
      {
       german: "„Echt? Woher wisst ihr das?”, fragt Erna Ente.",
       english: "\"Really? How do you know that?\" asks Erna Duck."  
      },  
      {
       german: "„Ich habe es im Internet gesehen!”, sagt Henry Hühnchen.",
       english: "\"I've seen it on the internet!\" says Henry Chicken."   
      },
      {
       german: "„Oh nein! Dann muss es ja stimmen!”, sagt Erna. „Los, gehen wir!”",
       english: "\"Oh no! Then it must be true!\", says Erna. \"Let's go!\" "
      },
      {
       german: "Also rennen Henry Hühnchen, Hanni Henne und Erna Ente die Straße hinunter zum Bauernhof. Als sie am Bauernhof ankommen treffen sie Gerda Gans. Sie liest Thea Taube Gedichte vor.",
       english: "So Henry Chicken, Hanni Hen and Erna Duck run down the street to the farm. When they arrive at the farm, they meet Gerda Goose. She is reading poems to Thea Pigeon."
      },
      {
       german: " „Hallo zusammen!”, sagt Gerda Gans. „Wo geht ihr hin? Warum schaut ihr so ängstlich?”„Der Himmel stürzt ein! Der Himmel stürzt ein!”, rufen alle zusammen.",
       english: "\"Hello everybody!\" says Gerda Goose. \"Where are you going? Why are you looking so scared?\" \"The sky is falling! The sky is falling!\", they all shout together."
      },
      {
       german: "„Echt? Woher wisst ihr das?”, fragt Thea Taube.",
       english: "\"Really? How do you know that?\" asks Thea Pigeon." 
      },
      {
       german: "„Ich habe es im Internet gesehen!”, sagt Henry Hühnchen.",  
        english: "\"I've seen it on the internet!\" says Henry Chicken."
      },
      {
       german: "„Heiliger Bimbam! Dann muss es ja stimmen!”, sagt Gerda Gans. „Wir haben keine Zeit, Gedichte zu lesen. Los, gehen wir!”",
       english: "\"Holy cow! Then it must be true!\" says Gerda Goose. \"We have no time to read poetry. Let's go!\""
      },
      {
       german: "Also gehen Henry Hühnchen, Hanni Henne, Erna Ente, Gerda Gans und Thea Taube die Straße hinunter zum Dorfplatz.",
       english: "So Henry Chicken, Hanni Hen, Erna Duck, Gerda Goose and Thea Pigeon run down the street to the village square."
      },
      {
       german: "Auf der Hauptstraße treffen sie Freddy Fuchs. Er sitzt in einem Café und schreibt auf seinem Laptop.",
       english: "On the main street they meet Freddy Fox. He is sitting in a cafe and typing on his laptop."
      },
      {
        german: "„Hallo zusammen!”, sagt Freddy Fuchs. „Wo geht ihr hin? Warum schaut ihr so ängstlich?”„Der Himmel stürzt ein! Der Hiiiiiimmel stürzt ein!”, rufen alle zusammen.",
        english: "\"Hello everybody!\" says Freddy Fox. \"Where are you going? Why are you looking so scared? \"The sky is falling! THE SKY IS FALLING!\", they all shout together."
      },
      {
       german: "„Echt? Woher wisst ihr das?”, fragt Freddy Fuchs.",
        english: "\"Really? How do you know that?\" asks Freddy Fox."
      },
      {
        german: "„Wir haben es im Internet gesehen!”, rufen alle zusammen.",
        english: "\"We have seen it on the Internet!\", they all shout together."
      },
      {
       german: "„Wow! Na dann muss es ja stimmen!”, sagt der Fuchs. „Aber keine Sorge Freunde, ich kenne das perfekte Versteck. Folgt mir!”",
       english: "\"Wow! Well then it must be true! \", says the fox. \"But do not worry friends, I know the perfect hiding place. Follow me!\""
      },
      {
        german: "Freddy Fuchs führt alle durchs Dorf, die Straße hinunter, quer durchs Feld und auf einen Hügel hinauf. Oben auf dem Hügel liegt eine große, dunkle Höhle.",
        english: "Freddy Fox leads everyone through the village, down the street, across the field and up a hill. On top of the hill is a big, dark cave."
      },
      {
        german: "„Kommt herein! Kommt herein!”, sagt Freddy. „Es gibt genug Platz für alle! Hier wird uns der Himmel nicht auf den Kopf fallen. Wir sind sicher.”",
        english: "\"Come in! Come in!\" says Freddy. \"There is enough space for everyone! Here the sky will not fall on our heads. We are safe.\""
      },
      {
        german: "Und so folgen Henry Hühnchen und alle seine Freunde dem Fuchs einer nach dem anderen in die Höhle.",
        english: "And so Henry Chicken and all his friends follow the fox one by one into the cave."
      },
      {
        german: "Am nächsten Morgen sind Henry Hühnchen und seine Freunde verschwunden. Die Höhle ist leer!",
        english: "The next morning, Henry Chicken and his friends have disappeared. The cave is empty!"
      },
      {
        german: "Wo sie hin sind? Wir wissen es nicht sicher. Aber eines kann ich euch sagen: Freddy Fuchs ist sehr glücklich. Er hat jetzt einen großen, runden Bauch.",
        english: "Where did they go? We do not know for sure. But I can tell you one thing: Freddy Fox is very happy. He now has a big, round belly."
      },
      {
        german: "„Diese dummen Tiere!”, sagt er. Und er sitzt unter einem Baum, holt seinen Laptop heraus und fängt wieder an zu schreiben.",
        english: "\"These dumb animals!\" he says. And he sits under a tree, takes out his laptop and starts writing again."
      }
    ],
//     ]
// "We have seen it on the Internet!", they all shout together.
// "Good lord! Then it must be true!" says Gerda Goose. "We have no time to read poetry. Let's go!"

// Also gehen Henry Hühnchen, Hanni Henne, Erna Ente, Gerda Gans und Thea Taube die Straße hinunter zum Dorfplatz.

// Translate?
// So Henry Chicken, Hanni Hen, Erna Duck, Gerda Goose and Thea Pigeon run down the street to the village square.

// Auf der Hauptstraße treffen sie Freddy Fuchs. Er sitzt in einem Café und schreibt auf seinem Laptop.

// Translate?
// On the main street they meet Freddy Fox. He is sitting in a cafe and typing on his laptop.

// „Hallo zusammen!”, sagt Freddy Fuchs. „Wo geht ihr hin? Warum schaut ihr so ängstlich?”
// „Der Himmel stürzt ein! Der Hiiiiiimmel stürzt ein!”, rufen alle zusammen.

// Translate?
// "Hello everybody!" says Freddy Fox. "Where are you going? Why are you looking so scared? "
// "The sky is falling! THE SKY IS FALLING!", they all shout together.


// „Echt? Woher wisst ihr das?”, fragt Freddy Fuchs.
// „Wir haben es im Internet gesehen!”, rufen alle zusammen.
// „Wow! Na dann muss es ja stimmen!”, sagt der Fuchs. „Aber keine Sorge Freunde, ich kenne das perfekte Versteck. Folgt mir!”

// Translate?
// "Really? How do you know that?" asks Freddy Fox.
// "We have seen it on the Internet!", they all shout together.
// "Wow! Well then it must be true! ", says the fox. "But do not worry friends, I know the perfect hiding place. Follow me!"

// Freddy Fuchs führt alle durchs Dorf, die Straße hinunter, quer durchs Feld und auf einen Hügel hinauf. Oben auf dem Hügel liegt eine große, dunkle Höhle.

// Translate?
// Freddy Fox leads everyone through the village, down the street, across the field and up a hill. On top of the hill is a big, dark cave.

// „Kommt herein! Kommt herein!”, sagt Freddy. „Es gibt genug Platz für alle! Hier wird uns der Himmel nicht auf den Kopf fallen. Wir sind sicher.”

// Translate?
// "Come in! Come in!" says Freddy. "There is enough space for everyone! Here the sky will not fall on our heads. We are safe."

// Und so folgen Henry Hühnchen und alle seine Freunde dem Fuchs einer nach dem anderen in die Höhle.

// Translate?
// And so Henry Chicken and all his friends follow the fox one by one into the cave.


// Am nächsten Morgen sind Henry Hühnchen und seine Freunde verschwunden. Die Höhle ist leer!

// Translate?
// The next morning, Henry Chicken and his friends have disappeared. The cave is empty!

// Wo sie hin sind? Wir wissen es nicht sicher. Aber eines kann ich euch sagen: Freddy Fuchs ist sehr glücklich. Er hat jetzt einen großen, runden Bauch.

// Translate?
// Where did they go? We do not know for sure. But I can tell you one thing: Freddy Fox is very happy. He now has a big, round belly.

// „Diese dummen Tiere!”, sagt er. Und er sitzt unter einem Baum, holt seinen Laptop heraus und fängt wieder an zu schreiben.

// Translate?
// "These dumb animals!" he says. And he sits under a tree, takes out his laptop and starts writing again.



  },
  {
    id: "2",
    title: "Little Red Riding Hood",
    parts: [
      {
        english: `Once upon a time, in the middle of a dense forest, there was a small house, where there lived a pretty little girl named Little Red Riding Hood. One sunny day her mother called her into the kitchen of their little house.`,
        german: `Es war einmal, inmitten eines dichten Waldes, ein kleines Haus, wo ein hübsches kleines Mädchen namens Rotkäppchen wohnte. Eines sonnigen Tages rief die Mutter sie in die Küche von ihrem kleinen Haus.`
      },
      {
        english: `"Grandma is sick," she said. "Bring her this basket of cakes, but be very careful! Stay on the path in the forest and don't stop! If you walk quickly, nothing will happen to you."`,
        german: `"Großmutter ist krank", sagte sie. "Bring ihr diesen Korb mit Kuchen, aber sei sehr vorsichtig! Bleib auf dem Pfad in dem Wald und bleib nicht stehen! Wenn du schnell läufst, wird dir nichts passieren."`
      },
      {
        english: `"Don't worry," she said. "I will run to Grandma without stopping." Little Red Riding Hood kissed her mother and left. The little girl started her long trip through the forest.`,
        german: `"Sorge dich nicht", sagte sie. "Ich werde zur Großmutter laufen, ohne stehen zu bleiben." Rotkäppchen küsste ihre Mutter und lief los. Das kleine Mädchen begann ihre lange Reise durch den Wald.`
      },
      {
        english: `But she soon forgot her mother’s wise words.`,
        german: `Aber sie vergaß schon bald die weisen Worte ihrer Mutter.`
      },
      {
        english: `She saw a blackberry bush beside the path. "What lovely blackberries!" she cried and put her basket on the ground. "They are so ripe and big! Delicious! Maybe I’ll just take one more..."`,
        german: `Sie sah einen Brombeerstrauch neben dem Pfad. "Was für hübsche Brombeeren!", rief sie und legte ihren Korb auf den Boden. "Sie sind so schön und reif…und so groß! Köstlich! Ich nehme mir vielleicht nur noch eine…"`
      },
      {
        english: `Suddenly, Little Red Riding Hood remembered her mother, her promise, her grandmother, and the basket. She quickly ran back to the path.`,
        german: `Plötzlich erinnerte sich Rötkäppchen an ihre Mutter, ihr Versprechen, ihre Großmutter und den Korb… Sie lief schnell zu dem Pfad zurück.`
      },
      {
        english: `The forest grew thicker and thicker. A yellow butterfly flew through the trees. "Oh, how pretty!" she cried. And she chased the butterfly. "I’ll catch you!"`,
        german: `Der Wald wurde dichter und dichter. Ein gelber Schmetterling flog durch die Bäume. "Oh, wie hübsch!", rief sie. Und sie jagte den Schmetterling durch die Bäume. "Ich fange dich!"`
      },
      {
        english: `Then she saw purple flowers in the grass. "Grandma will be happy!" she said and picked a huge bouquet.`,
        german: `Dann sah sie lila Blumen im Gras. "Großmutter wird sich darüber freuen!" Und sie pflückte einen riesigen Strauß Blumen.`
      },

      /* 🔥 You can keep adding the rest of the story exactly like this */
    ]
  }

  // 👉 ADD OTHER STORIES HERE (same structure)
];

export default stories;
