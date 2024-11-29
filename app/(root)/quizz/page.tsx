import QuizForm from '@/components/quizz-form'

const moroccanFamilyQuiz = {
  "questions": [
    {
      "question": "What is the central role of the family in Moroccan society, according to the text?",
      "choices": [
        "It is a source of conflict and disagreement.",
        "It is a secondary aspect of social life.",
        "It occupies a central place and forms the pillar of social life.",
        "It is primarily concerned with economic matters."
      ],
      "answer": "It occupies a central place and forms the pillar of social life."
    },
    {
      "question": "The mother's role in a Moroccan family is described as:",
      "choices": [
        "Secondary and easily replaceable.",
        "Primarily focused on household chores.",
        "Primordial, irreplaceable, a pillar of stability and support.",
        "Limited to childcare and emotional support."
      ],
      "answer": "Primordial, irreplaceable, a pillar of stability and support."
    },
    {
      "question": "What fundamental values does the mother instill in her children?",
      "choices": [
        "Competition, ambition, and independence.",
        "Respect, solidarity, and honesty.",
        "Obedience, conformity, and tradition.",
        "Material wealth, social status, and power."
      ],
      "answer": "Respect, solidarity, and honesty."
    },
    {
      "question": "Beyond emotional support, what other crucial role does the mother play within the home?",
      "choices": [
        "She primarily focuses on leisure activities.",
        "She is actively involved in the organization and smooth functioning of the household.",
        "She delegates most responsibilities to other family members.",
        "She primarily focuses on financial management."
      ],
      "answer": "She is actively involved in the organization and smooth functioning of the household."
    },
    {
      "question": "In many Moroccan families, the mother is also considered a source of:",
      "choices": [
        "Criticism and judgment.",
        "Strict rules and regulations.",
        "Wisdom and advice.",
        "Competition and rivalry."
      ],
      "answer": "Wisdom and advice."
    },
    {
      "question": "What is the additional role many Moroccan mothers now play outside the home?",
      "choices": [
        "They are largely uninvolved in the wider economy.",
        "They focus solely on community service.",
        "They actively participate in the workforce.",
        "They are primarily involved in political activities."
      ],
      "answer": "They actively participate in the workforce."
    },
    {
      "question": "Despite the dual roles of many Moroccan mothers, what is highlighted about their capacity?",
      "choices": [
        "They struggle to maintain their roles effectively.",
        "They demonstrate remarkable resilience and adaptation.",
        "They rely heavily on external support.",
        "They tend to neglect their family responsibilities."
      ],
      "answer": "They demonstrate remarkable resilience and adaptation."
    },
    {
      "question": "What is the main idea emphasized in the conclusion?",
      "choices": [
        "The mother's role is becoming less important.",
        "The mother's role is primarily symbolic.",
        "The mother is the essential pillar upon which family equilibrium rests.",
        "The mother's role is becoming increasingly challenging."
      ],
      "answer": "The mother is the essential pillar upon which family equilibrium rests."
    },
    {
      "question": "How are family values transmitted across generations according to the text?",
      "choices": [
        "Through formal education systems primarily.",
        "Through the mother's actions and teachings.",
        "Through independent exploration by each generation.",
        "Through external influences and media."
      ],
      "answer": "Through the mother's actions and teachings."
    },
    {
      "question": "What is the author's concluding call to action regarding the Moroccan mother?",
      "choices": [
        "To disregard traditional values.",
        "To express gratitude and respect for the mother.",
        "To replace the mother's role with other family members.",
        "To minimize the mother's influence on family life."
      ],
      "answer": "To express gratitude and respect for the mother."
    }
  ]
}

export default function QuizPage() {
  return <QuizForm quiz={moroccanFamilyQuiz} />
}

