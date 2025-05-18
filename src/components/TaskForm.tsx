
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { QuestionType } from './TaskList';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

// Form schema for validation
const questionFormSchema = z.object({
  type: z.enum(['mcq', 'open-ended', 'true-false'] as const),
  question: z.string().min(3, { message: 'Question must be at least 3 characters' }),
  answer: z.string().min(1, { message: 'Answer is required' }),
  options: z.array(z.string()).optional(),
});

// Type for form values
type QuestionFormValues = z.infer<typeof questionFormSchema>;

interface TaskFormProps {
  initialValues?: {
    type: QuestionType;
    question: string;
    answer: string;
    options?: string[];
  };
  onSubmit: (values: QuestionFormValues) => void;
  onCancel: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ initialValues, onSubmit, onCancel }) => {
  const [questionType, setQuestionType] = useState<QuestionType>(initialValues?.type || 'mcq');
  const [options, setOptions] = useState<string[]>(initialValues?.options || ['', '', '', '']);
  
  const { register, handleSubmit, formState: { errors } } = useForm<QuestionFormValues>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: initialValues || {
      type: 'mcq',
      question: '',
      answer: '',
      options: ['', '', '', ''],
    },
  });

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const onFormSubmit = (data: QuestionFormValues) => {
    // For MCQs, include the options
    if (data.type === 'mcq') {
      data.options = options.filter(option => option.trim() !== '');
    } else if (data.type === 'true-false') {
      // For true/false questions, answer should be 'true' or 'false'
      data.options = ['true', 'false'];
    } else {
      // For open-ended questions, no options needed
      data.options = [];
    }
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Question Type</Label>
          <RadioGroup 
            defaultValue={questionType} 
            className="flex flex-wrap gap-4 mt-2"
            onValueChange={(val) => setQuestionType(val as QuestionType)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mcq" id="mcq" {...register('type')} />
              <Label htmlFor="mcq" className="flex items-center gap-2">
                Multiple Choice
                <Badge>MCQ</Badge>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="open-ended" id="open-ended" {...register('type')} />
              <Label htmlFor="open-ended" className="flex items-center gap-2">
                Open Ended
                <Badge variant="secondary">Text</Badge>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true-false" id="true-false" {...register('type')} />
              <Label htmlFor="true-false" className="flex items-center gap-2">
                True/False
                <Badge variant="outline">T/F</Badge>
              </Label>
            </div>
          </RadioGroup>
          {errors.type && <p className="text-sm text-red-500 mt-1">{errors.type.message}</p>}
        </div>

        <div>
          <Label htmlFor="question">Question</Label>
          <Textarea 
            id="question"
            placeholder="Enter your question here"
            className="mt-1"
            {...register('question')}
          />
          {errors.question && <p className="text-sm text-red-500 mt-1">{errors.question.message}</p>}
        </div>

        {questionType === 'mcq' && (
          <div>
            <Label>Options</Label>
            <div className="space-y-2 mt-1">
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeOption(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                onClick={addOption}
                className="w-full"
              >
                Add Option
              </Button>
            </div>
          </div>
        )}

        {questionType === 'true-false' && (
          <div>
            <Label htmlFor="answer">Answer</Label>
            <div className="flex items-center gap-3 mt-2">
              <Switch 
                id="answer"
                {...register('answer')}
                checked={initialValues?.answer === 'true'}
                onCheckedChange={(checked) => {
                  const answerValue = checked ? 'true' : 'false';
                  const event = {
                    target: {
                      name: 'answer',
                      value: answerValue
                    }
                  };
                  register('answer').onChange(event as any);
                }}
              />
              <Label htmlFor="answer">{initialValues?.answer === 'true' ? 'True' : 'False'}</Label>
            </div>
          </div>
        )}

        {(questionType === 'mcq' || questionType === 'open-ended') && (
          <div>
            <Label htmlFor="answer">Answer</Label>
            <Textarea
              id="answer"
              placeholder={questionType === 'mcq' ? 'Enter the correct option' : 'Enter model answer'}
              className="mt-1"
              {...register('answer')}
            />
            {errors.answer && <p className="text-sm text-red-500 mt-1">{errors.answer.message}</p>}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save Question
        </Button>
      </div>
    </form>
  );
};
