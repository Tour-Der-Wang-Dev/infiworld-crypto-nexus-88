
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Check, Edit, Trash, X } from 'lucide-react';
import { Question } from './TaskList';
import { Badge } from '@/components/ui/badge';
import { TaskForm } from './TaskForm';
import { cn } from '@/lib/utils';

interface QuestionItemProps {
  question: Question;
  onEdit: (question: Question) => void;
  onDelete: (id: number) => void;
}

export const QuestionItem: React.FC<QuestionItemProps> = ({ question, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'mcq':
        return 'Multiple Choice';
      case 'open-ended':
        return 'Open-Ended';
      case 'true-false':
        return 'True/False';
      default:
        return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'mcq':
        return 'bg-blue-500/20 text-blue-500';
      case 'open-ended':
        return 'bg-purple-500/20 text-purple-500';
      case 'true-false':
        return 'bg-green-500/20 text-green-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  const handleEdit = (updatedQuestion: Omit<Question, 'id'>) => {
    onEdit({ ...updatedQuestion, id: question.id });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Card className="border border-primary/30 shadow-sm">
        <CardContent className="pt-6">
          <TaskForm 
            initialValues={question} 
            onSubmit={handleEdit} 
            onCancel={() => setIsEditing(false)} 
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-border/50 hover:border-border/80 transition-colors">
      <CardContent className="pt-6">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <Badge variant="outline" className={cn("font-normal", getTypeColor(question.type))}>
            {getTypeLabel(question.type)}
          </Badge>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:text-destructive hover:bg-destructive/10"
              onClick={() => onDelete(question.id)}
            >
              <Trash className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
        <h3 className="font-medium text-base mb-2">{question.question}</h3>
        
        {question.type === 'mcq' && question.options && (
          <div className="mt-3 space-y-2">
            {question.options.map((option, index) => (
              <div 
                key={index}
                className={cn(
                  "flex items-center gap-2 p-2 rounded-md",
                  showAnswers && option === question.answer 
                    ? "bg-primary/10 border border-primary/40" 
                    : "bg-secondary/30"
                )}
              >
                {showAnswers && option === question.answer && (
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                )}
                <span className="text-sm">{option}</span>
              </div>
            ))}
          </div>
        )}

        {question.type === 'true-false' && (
          <div className="mt-3 space-y-2">
            <div 
              className={cn(
                "flex items-center gap-2 p-2 rounded-md",
                showAnswers && question.answer === 'true'  
                  ? "bg-primary/10 border border-primary/40" 
                  : "bg-secondary/30"
              )}
            >
              {showAnswers && question.answer === 'true' && (
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
              )}
              <span className="text-sm">True</span>
            </div>
            <div 
              className={cn(
                "flex items-center gap-2 p-2 rounded-md",
                showAnswers && question.answer === 'false'  
                  ? "bg-primary/10 border border-primary/40" 
                  : "bg-secondary/30"
              )}
            >
              {showAnswers && question.answer === 'false' && (
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
              )}
              <span className="text-sm">False</span>
            </div>
          </div>
        )}
        
        {question.type === 'open-ended' && showAnswers && (
          <div className="mt-3 bg-primary/10 border border-primary/40 p-2 rounded-md">
            <p className="text-sm"><strong>Answer:</strong> {question.answer}</p>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button 
          variant="secondary" 
          size="sm" 
          className="text-xs w-full"
          onClick={() => setShowAnswers(!showAnswers)}
        >
          {showAnswers ? 'Hide Answer' : 'Show Answer'}
        </Button>
      </CardFooter>
    </Card>
  );
};
