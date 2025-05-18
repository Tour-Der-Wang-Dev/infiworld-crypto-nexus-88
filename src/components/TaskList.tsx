
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TaskForm } from './TaskForm';
import { QuestionItem } from './QuestionItem';
import { PlusCircle, FileText } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export type QuestionType = 'mcq' | 'open-ended' | 'true-false';

export interface Question {
  id: number;
  type: QuestionType;
  question: string;
  answer: string;
  options?: string[];
}

interface TaskListProps {
  text: string;
  questions: Question[];
}

export const TaskList: React.FC<TaskListProps> = ({ text, questions: initialQuestions }) => {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [showForm, setShowForm] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);

  const addQuestion = (question: Omit<Question, 'id'>) => {
    const newQuestion = {
      ...question,
      id: questions.length ? Math.max(...questions.map(q => q.id)) + 1 : 1
    };
    setQuestions([...questions, newQuestion]);
    setShowForm(false);
  };

  const editQuestion = (updatedQuestion: Question) => {
    setQuestions(questions.map(q => 
      q.id === updatedQuestion.id ? updatedQuestion : q
    ));
  };

  const deleteQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const generateQuestions = () => {
    // In a real implementation, this would call an AI service
    // For now, we'll just generate a simple MCQ as an example
    const newQuestion: Omit<Question, 'id'> = {
      type: 'mcq',
      question: 'Sample generated question from the text?',
      answer: 'First option',
      options: ['First option', 'Second option', 'Third option', 'Fourth option']
    };
    
    addQuestion(newQuestion);
    setShowGenerator(false);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-card">
      <CardHeader>
        <CardTitle className="text-xl gold-gradient-text">Task List</CardTitle>
        <p className="text-sm text-muted-foreground">Manage your prompting tasks and questions</p>
      </CardHeader>

      {text && (
        <>
          <CardContent>
            <div className="bg-secondary/30 p-4 rounded-md mb-4">
              <h3 className="font-medium text-sm mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Reference Text
              </h3>
              <p className="text-sm text-foreground/90">{text}</p>
            </div>
          </CardContent>
          <Separator />
        </>
      )}

      <CardContent className="pt-4">
        {questions.length > 0 ? (
          <div className="space-y-4">
            {questions.map((question) => (
              <QuestionItem
                key={question.id}
                question={question}
                onEdit={editQuestion}
                onDelete={deleteQuestion}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No questions added yet. Create a question or generate one from your text.</p>
          </div>
        )}
      </CardContent>

      {showForm && (
        <CardContent>
          <TaskForm 
            onSubmit={addQuestion} 
            onCancel={() => setShowForm(false)} 
          />
        </CardContent>
      )}

      {showGenerator && text && (
        <CardContent>
          <Card className="bg-secondary/20 border-dashed">
            <CardContent className="pt-6">
              <p className="text-sm">Generate questions from your reference text using AI.</p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowGenerator(false)}>Cancel</Button>
              <Button size="sm" onClick={generateQuestions}>Generate</Button>
            </CardFooter>
          </Card>
        </CardContent>
      )}

      <CardFooter className="flex flex-col sm:flex-row gap-2">
        <Button 
          variant="outline" 
          onClick={() => {
            setShowGenerator(!showGenerator);
            if (showForm) setShowForm(false);
          }}
          disabled={!text}
          className="w-full sm:w-auto"
        >
          {showGenerator ? 'Cancel' : 'Generate Questions'}
        </Button>
        <Button 
          onClick={() => {
            setShowForm(!showForm);
            if (showGenerator) setShowGenerator(false);
          }}
          className="w-full sm:w-auto"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          {showForm ? 'Cancel' : 'Add Question'}
        </Button>
      </CardFooter>
    </Card>
  );
};
