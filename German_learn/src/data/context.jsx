const lessons = [
  {
    "id": "lesson-01",
    "lessonNumber": 1,
    "title": "Lesson 1",
    "subtitle": "Meet Jens & German Introductions",
    "image": "/images/lessons/lesson-01.png",

    "content": [
      {
        "sectionTitle": "Meet Jens",
        "text": "Jens is your German language tour guide who will help you learn basic German grammar and vocabulary."
      },
      {
        "sectionTitle": "Basic Introductions",
        "text": "Learn how to say hello, introduce yourself, and say what language you speak."
      }
    ],

    "tableData": {
      "columns": ["German", "English"],
      "rows": [
        ["Hallo", "Hello"],
        ["Mein Name ist Jens", "My name is Jens"],
        ["Ich spreche Deutsch", "I speak German"]
      ]
    },

    "grammar": [
      {
        "title": "Personal Pronouns & Verb 'sein' (to be)",
        "table": {
          "columns": ["Pronoun", "German", "English"],
          "rows": [
            ["I", "ich bin", "I am"],
            ["You (informal)", "du bist", "you are"],
            ["You (formal)", "Sie sind", "you are"],
            ["He", "er ist", "he is"],
            ["She", "sie ist", "she is"],
            ["It", "es ist", "it is"],
            ["We", "wir sind", "we are"],
            ["They", "sie sind", "they are"]
          ]
        }
      }
    ],

    "notes": [
      "German verbs change depending on who is being described.",
      "Formal and informal address is very important in German."
    ]
  },

  {
    "id": "lesson-02",
    "lessonNumber": 2,
    "title": "Lesson 2",
    "subtitle": "English–German Similarities & Denglisch",
    "image": "/images/lessons/lesson-02.png",

    "content": [
      {
        "sectionTitle": "German & English Similarities",
        "text": "German and English are both Germanic languages, which is why many words sound similar."
      },
      {
        "sectionTitle": "False Friends",
        "text": "Some German words sound like English words but mean something completely different."
      }
    ],

    "tableData": {
      "columns": ["German Word", "Sounds Like", "Actual Meaning"],
      "rows": [
        ["groß", "gross", "big"],
        ["fahrt", "fart", "drive / ride"],
        ["das Handy", "handy", "mobile phone"],
        ["der Chef", "chef", "boss"],
        ["das Gift", "gift", "poison"]
      ]
    },

    "extra": {
      "title": "Denglisch",
      "description": "Denglisch is the mixing of English words into German.",
      "examples": ["der Computer", "das Camping", "babysitten"]
    }
  },

  {
    "id": "lesson-03",
    "lessonNumber": 3,
    "title": "Lesson 3",
    "subtitle": "German Sounds & Pronunciation",
    "image": "/images/lessons/lesson-03.png",

    "content": [
      {
        "sectionTitle": "Special Sounds",
        "text": "German has unique sounds like ch, rolled r, and the ß symbol."
      },
      {
        "sectionTitle": "Pronunciation Rules",
        "text": "Many letters sound different in German than in English."
      }
    ],

    "tableData": {
      "columns": ["Letter / Symbol", "Sound Description", "Example"],
      "rows": [
        ["r", "Gurgling sound at word start", "rot"],
        ["ch", "Cat hissing sound", "ich"],
        ["ß", "ss sound", "Straße"],
        ["w", "English v sound", "was"],
        ["v", "English f sound", "Vater"],
        ["j", "English y sound", "ja"]
      ]
    }
  },

  {
    "id": "lesson-04",
    "lessonNumber": 4,
    "title": "Lesson 4",
    "subtitle": "German Nouns & Genders",
    "image": "/images/lessons/lesson-04.png",

    "content": [
      {
        "sectionTitle": "Capitalization",
        "text": "All German nouns are capitalized, including people, places, and things."
      },
      {
        "sectionTitle": "Noun Genders",
        "text": "Every German noun has a gender: masculine, feminine, or neutral."
      }
    ],

    "tableData": {
      "columns": ["Gender", "Article", "Example"],
      "rows": [
        ["Masculine", "der", "der Mann"],
        ["Feminine", "die", "die Frau"],
        ["Neutral", "das", "das Kind"],
        ["Plural", "die", "die Kinder"]
      ]
    },

    "notes": [
      "Plural nouns always use 'die'.",
      "Plural forms must be memorized."
    ]
  },

  {
    "id": "lesson-14",
    "lessonNumber": 14,
    "title": "Lesson 14",
    "subtitle": "German Numbers",
    "image": "/images/lessons/lesson-14.png",

    "content": [
      {
        "sectionTitle": "Numbers Basics",
        "text": "Learn how to count from zero to a billion in German."
      },
      {
        "sectionTitle": "Asking Age",
        "text": "Learn how to ask and tell your age in German."
      }
    ],

    "tableData": {
      "columns": ["Number", "German"],
      "rows": [
        ["0", "null"],
        ["1", "eins"],
        ["5", "fünf"],
        ["10", "zehn"],
        ["20", "zwanzig"],
        ["21", "einundzwanzig"],
        ["100", "hundert"],
        ["1000", "tausend"],
        ["1,000,000", "eine Million"],
        ["1,000,000,000", "eine Milliarde"]
      ]
    },

    "examples": [
      {
        "german": "Wie alt bist du?",
        "english": "How old are you?"
      },
      {
        "german": "Ich bin vierundzwanzig Jahre alt.",
        "english": "I am 24 years old."
      }
    ]
  }
]
export default lessons;