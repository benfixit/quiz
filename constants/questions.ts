import { QuestionType } from "@/typings";
import 'react-native-get-random-values';
import { v4 as uuidV4 } from "uuid";

export const questions: QuestionType[] = [
  {
    id: uuidV4(),
    "text": "Which river is traditionally considered the longest in the world?",
    "options": [
      "Amazon River",
      "Nile River",
      "Yangtze River",
      "Mississippi River"
    ],
    "answer": "Nile River"
  },
  {
    id: uuidV4(),
    "text": "What is the capital city of Australia?",
    "options": [
      "Sydney",
      "Melbourne",
      "Perth",
      "Canberra"
    ],
    "answer": "Canberra"
  },
  {
    id: uuidV4(),
    "text": "The Ural Mountains primarily separate which two continents?",
    "options": [
      "North America and South America",
      "Europe and Asia",
      "Africa and Europe",
      "Asia and Australia"
    ],
    "answer": "Europe and Asia"
  },
  {
    id: uuidV4(),
    "text": "The Atacama Desert, known as the driest place on Earth, is primarily located in which South American country?",
    "options": [
      "Argentina",
      "Peru",
      "Chile",
      "Bolivia"
    ],
    "answer": "Chile"
  },
  {
    id: uuidV4(),
    "text": "Which of the following bodies of water is the largest (by area) sea in the world?",
    "options": [
      "Caribbean Sea",
      "South China Sea",
      "Mediterranean Sea",
      "Arabian Sea"
    ],
    "answer": "South China Sea"
  },
  {
    id: uuidV4(),
    "text": "What is the highest mountain peak in North America?",
    "options": [
      "Mount Logan",
      "Mount Elbert",
      "Denali (Mount McKinley)",
      "Mount Rainier"
    ],
    "answer": "Denali (Mount McKinley)"
  },
  {
    id: uuidV4(),
    "text": "Through which three European countries does the Danube River flow?",
    "options": [
      "Germany, Austria, Hungary",
      "France, Switzerland, Germany",
      "Italy, Slovenia, Croatia",
      "Poland, Czech Republic, Slovakia"
    ],
    "answer": "Germany, Austria, Hungary"
  },
  {
    id: uuidV4(),
    "text": "Which large island is the only territory to belong to a continent (Australia) but is not a sovereign country?",
    "options": [
      "New Guinea",
      "Greenland",
      "Madagascar",
      "Tasmania"
    ],
    "answer": "Tasmania"
  },
  {
    id: uuidV4(),
    "text": "What is the primary factor that causes the change in seasons on Earth?",
    "options": [
      "The change in Earth's distance from the sun",
      "The tilt of Earth's axis",
      "The changing speed of Earth's orbit",
      "Variations in solar radiation"
    ],
    "answer": "The tilt of Earth's axis"
  },
  {
    id: uuidV4(),
    "text": "The Mariana Trench, the deepest part of the world's oceans, is located in which ocean?",
    "options": [
      "Atlantic Ocean",
      "Indian Ocean",
      "Southern Ocean",
      "Pacific Ocean"
    ],
    "answer": "Pacific Ocean"
  }
];