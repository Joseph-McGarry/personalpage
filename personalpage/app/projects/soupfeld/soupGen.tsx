// soupGenerator.tsx

// 176,745,600 possible combos w/o vegetarian or seafood

import React from 'react';

interface Ingredients {
  protein: string[];
  vegetarian: string[];
  seafood: string[];
  veggie: string[];
  veggie2: string[];
  legumes: string[];
  carb: string[];
  spice: string[];
}

interface Description {
  characters: string[];
  adjectives: string[];
}

interface Modes {
  seafoodMode: boolean;
  veggieMode: boolean;
  bizarroMode: boolean;
}

const ingredients: Ingredients = {
  protein: [
    "chicken", "bacon", "steak", "ham", "lamb", "turkey", "sausage",
    "ground beef", "italian sausage", "chorizo", "ground pork", "duck",
    "pork belly", "veal", "goat", "venison"
  ],
  vegetarian: ["tofu", "tempeh", "seitan"],
  seafood: [
    "lobster", "clams", "crab", "cod", "sea bass", "halibut", "red snapper",
    "shrimp", "scallops", "tilapia", "salmon", "mussels", "trout", "oysters", "octopus"
  ],
  veggie: [
    "onions", "celery", "leeks", "shallots", "roma tomatoes", "carrots",
    "mushrooms", "squash", "beets", "jalapenos", "bell pepper", "corn",
    "parsnips", "turnips", "zucchini", "eggplant", "artichoke hearts", "fennel"
  ],
  veggie2: [
    "green beans", "kale", "spinach", "broccoli", "asparagus", "green peas",
    "green cabbage", "red cabbage", "brussels sprouts", "bok choy", "arugula",
    "collard greens", "mustard greens", "watercress"
  ],
  legumes: [
    "black beans", "pinto beans", "white beans", "lentils", "quinoa",
    "garbanzo beans", "edamame", "kidney beans", "navy beans", "split peas"
  ],
  carb: [
    "rice", "pasta", "couscous", "sweet potato", "potato", "chickpeas",
    "farro", "orzo", "barley", "gnocchi", "polenta", "millet"
  ],
  spice: [
    "thyme", "rosemary", "cayenne", "cinnamon", "ginger", "lemon", "garlic",
    "bay leaf", "sage", "oregano", "basil", "parsley", "paprika", "coriander",
    "dill", "fennel seeds", "turmeric", "chili powder", "cumin"
  ]
};

const toppings: string[] = [
  "parmesan cheese", "parsley", "chives", "greek yogurt", "crackers",
  "herb croutons", "sour cream", "crumbled tortilla chips", "feta crumbles",
  "cheddar cheese", "gorgonzola", "pesto", "bacon bits", "avocado slices",
  "fried onions", "fresh cilantro", "toasted sesame seeds"
];

const description: Description = {
  characters: [
    "Kramer", "Jerry", "George", "Elaine", "Puddy", "Newman", "Frank Costanza",
    "Estelle Costanza", "J. Peterman", "Uncle Leo", "Monk", "Steinbrenner",
    "Susan", "Mr. Lippman", "Mickey", "Jackie", "Lloyd Braun", "Babu Bhatt",
    "Morty Seinfeld", "Helen Seinfeld", "Mr. Wilhelm", "Mr. Pitt", "The Soup Nazi",
    "Dr. Tim Whatley", "Bob Sacamano", "Crazy Joe Davola", "The Maestro",
    "Sue Ellen Mischke", "Mr. Kruger", "Mulva", "Kenny Roaster"
  ],
  adjectives: [
    "Hearty", "Flavorful", "Savory", "Rich", "Spicy", "Creamy", "Nutritious",
    "Homemade", "Wholesome", "Comforting", "Zesty", "Delicious", "Yummy",
    "Satisfying", "Refreshing", "Robust", "Mouthwatering", "Aromatic", "Tasty",
    "Delectable", "Scrumptious", "Exquisite", "Sultry", "Invigorating",
    "Ambrosial", "Luscious", "Divine", "Opulent", "Sensational", "Decadent",
    "Enticing", "Palatable", "Irresistible", "Tantalizing", "Gourmet"
  ]
};

export const createSoup = (modes: Modes): string => {
  let newSoup: string[] = [];
  let personsSoup: string[] = [];
  const { seafoodMode, veggieMode, bizarroMode } = modes;

  // Default categories based on toggle modes
  const categories = seafoodMode
    ? ['seafood', 'veggie', 'veggie2', 'legumes', 'carb', 'spice']
    : veggieMode
    ? ['vegetarian', 'veggie', 'veggie2', 'legumes', 'carb', 'spice']
    : ['protein', 'veggie', 'veggie2', 'legumes', 'carb', 'spice']; // Default

  categories.forEach((category) => {
    const categoryIngredients = ingredients[category as keyof Ingredients]; // Type assertion
    let pickedIngredients: string[] = []; // Keep track of picked ingredients in the current category

    if (bizarroMode) {
      // Bizarro Mode: Choose a random number of unique ingredients from the category
      const randomCount = Math.floor(Math.random() * categoryIngredients.length) + 1; // At least 1 ingredient

      while (pickedIngredients.length < randomCount) {
        const randomIndex = Math.floor(Math.random() * categoryIngredients.length);
        const ingredient = categoryIngredients[randomIndex];

        // Only add the ingredient if it hasn't been picked yet
        if (!pickedIngredients.includes(ingredient)) {
          pickedIngredients.push(ingredient);
        }
      }

      // Add the selected unique ingredients to the soup
      newSoup = newSoup.concat(pickedIngredients);
    } else {
      // Default or Seafood/Veggie Mode: Choose one ingredient from the category
      const randomIndex = Math.floor(Math.random() * categoryIngredients.length);
      const ingredient = categoryIngredients[randomIndex];
      newSoup.push(ingredient);
    }
  });

  // Add random person and adjective
  const randomPerson = description.characters[Math.floor(Math.random() * description.characters.length)];
  const randomAdjective = description.adjectives[Math.floor(Math.random() * description.adjectives.length)];
  const onTop = toppings[Math.floor(Math.random() * toppings.length)];

  personsSoup.push(`${randomPerson}'s ${randomAdjective}`);

  return `You should make \n\n${personsSoup.join(' ')} ${newSoup.join(', ')} soup with ${onTop} on top!`;
};

// Example usage in a React component
const SoupGenerator: React.FC = () => {
  const [soupDescription, setSoupDescription] = React.useState<string>('');

  // You can manage these modes using state or props as needed
  const [modes, setModes] = React.useState<Modes>({
    seafoodMode: false,
    veggieMode: false,
    bizarroMode: false,
  });

  const generateSoup = () => {
    const description = createSoup(modes);
    setSoupDescription(description);
  };

  return (
    <div>
      <h1>Soup Generator</h1>

      {/* Example toggles for modes */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={modes.seafoodMode}
            onChange={() => setModes({ ...modes, seafoodMode: !modes.seafoodMode })}
          />
          Seafood Mode
        </label>
        <label>
          <input
            type="checkbox"
            checked={modes.veggieMode}
            onChange={() => setModes({ ...modes, veggieMode: !modes.veggieMode })}
          />
          Veggie Mode
        </label>
        <label>
          <input
            type="checkbox"
            checked={modes.bizarroMode}
            onChange={() => setModes({ ...modes, bizarroMode: !modes.bizarroMode })}
          />
          Bizarro Mode
        </label>
      </div>

      <button onClick={generateSoup}>Generate Soup</button>
      <pre>{soupDescription}</pre>
    </div>
  );
};

export default SoupGenerator;
