
import React, { useState } from 'react';
import { TaskList, Question } from './TaskList';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const TaskListPage: React.FC = () => {
  const [text, setText] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      type: 'mcq',
      question: 'What is the primary benefit of using TypeScript with React?',
      answer: 'Type safety and better IDE support',
      options: [
        'Type safety and better IDE support',
        'Faster runtime performance',
        'Smaller bundle size',
        'Native mobile support'
      ]
    },
    {
      id: 2,
      type: 'true-false',
      question: 'React uses a virtual DOM to optimize rendering performance.',
      answer: 'true'
    },
    {
      id: 3,
      type: 'open-ended',
      question: 'Explain how React hooks changed the way we write components.',
      answer: 'React hooks allow function components to use state and other React features that were previously only possible with class components. They enable a more functional approach to writing components, reduce code duplication through custom hooks, and make it easier to reuse stateful logic between components.'
    }
  ]);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 gold-gradient-text">Prompt Engineering Task Manager</h1>
      
      <div className="mb-6">
        <label htmlFor="text" className="block text-sm font-medium mb-2">
          Enter your reference text (optional)
        </label>
        <Textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-32"
          placeholder="Paste your text here to generate questions from it..."
        />
        <p className="text-xs text-muted-foreground mt-2">
          Adding text allows you to generate questions based on the content.
        </p>
      </div>
      
      <Separator className="my-6" />
      
      <TaskList text={text} questions={questions} />
    </div>
  );
};
